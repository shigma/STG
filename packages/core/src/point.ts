import { math } from '@stg/utils'
import config from './config'
import Coordinate, { Point } from './coordinate'
import Barrage, { BulletEmitter } from './barrage'
import Updater, { TaskHook, MountHook } from './updater'

type MaybeArray<T> = T | T[]
type MaybeFunction<T> = T | (() => T)

export interface PointOptions<T extends CanvasPoint = CanvasPoint> {
  show?: boolean
  state?: MaybeFunction<Record<string, any>>
  mounted?: MaybeArray<MountHook<T & Record<string, any>>>
  mutate?: MaybeArray<TaskHook<T & Record<string, any>>>
  display?: MountHook<T & Record<string, any>>
  methods?: Record<string, (this: T & Record<string, any>, ...args: any[]) => any>
}

/** a general point in the canvas */
export default class CanvasPoint extends Updater {
  /** @protected point position */
  protected _point: Point = { x: 0, y: 0, face: 0 }
  /** @protected current coordinate */
  protected _coordinate?: Coordinate
  /** @protected mounted hook */
  protected _mountedHook: MountHook<this>[]
  /** @protected mutate hook */
  protected _mutateHook: TaskHook<this>[]
  /** @protected display hook */
  protected _displayHook: MountHook<this>

  /** @public the radius of the point */
  public radius?: number
  /** @public the color of the point */
  public color?: any
  /** @public whether the point is shown */
  public show?: boolean
  /** @public parent barrage */
  public $parent: Barrage

  constructor(options: PointOptions = {}) {
    super()
    this.show = options.show !== false
    this._displayHook = options.display
    this._initHooks('_mountedHook', options.mounted)
    this._initHooks('_mutateHook', options.mutate)
    Object.assign(this, options.methods)
    const state = typeof options.state === 'function'
      ? options.state.call(this)
      : options.state
    Object.assign(this, state)
  }

  public get x() {
    return this._point.x
  }

  public get y() {
    return this._point.y
  }

  public get face() {
    return this._point.face
  }

  public set x(value) {
    this._point.x = value
    this._coordinate = null
  }

  public set y(value) {
    this._point.y = value
    this._coordinate = null
  }

  public set face(value) {
    this._point.face = value
    this._coordinate = null
  }

  private _initHooks(key: string, source: any) {
    if (Array.isArray(source)) {
      this[key] = source
    } else if (source) {
      this[key] = [source]
    } else {
      this[key] = []
    }
  }

  _mounted() {
    this._mountedHook.forEach(hook => hook.call(this))
    this._mutateHook.forEach(hook => this.setTask(hook))
  }

  render() {
    if (!this._displayHook) return
    if (!this.$context || this.show === false) return
    this._displayHook.call(this)
  }

  get $coord(): Coordinate {
    if (!this._coordinate || this.$tick !== this._coordinate.$birth) {
      this._coordinate = new Coordinate(this.x, this.y, this.face)
      this._coordinate.$birth = this.$tick
    }
    return this._coordinate
  }

  movePolar(rho = this.rho, theta = this.theta): void {
    this.x += rho * math.cos(config.angleUnit * theta)
    this.y += rho * math.sin(config.angleUnit * theta)
  }

  /** emit bullets from the barrage */
  emitBullets(end: number, bullet: BulletEmitter): void
  emitBullets(start: number, end: number, bullet: BulletEmitter): void
  emitBullets(start: number, end: number, step: number, bullet: BulletEmitter): void
  emitBullets(...args: [number, any, any?, any?]): void {
    // set temporary source
    this.$parent.$refs.src = this
    this.$parent.emitBullets(...args)
    delete this.$parent.$refs.src
  }

  fillCircle(fill = this.color, radius = this.radius): void {
    const { x, y } = this.$coord
    this.$context.beginPath()
    this.$context.arc(x, y, radius, 0, math.twoPI)
    this.$context.closePath()
    this.$context.fillStyle = fill.output ? fill.output() : fill
    this.$context.fill()
  }

  fillEllipse(
    stroke = this.color,
    fill = this.innerColor,
    radiusX = this.radiusX,
    radiusY = this.radiusY,
    rotation = this.face,
  ): void {
    const { x, y } = this.$coord
    this.$context.beginPath()
    this.$context.strokeStyle = stroke
    this.$context.lineWidth = 2
    this.$context.ellipse(x, y, radiusX, radiusY, rotation * config.angleUnit, 0, math.twoPI)
    this.$context.closePath()
    this.$context.stroke()
    this.$context.fillStyle = fill.output ? fill.output() : fill
    this.$context.fill()
  }

  getGradient(c1: any, r1: number, c2 = this.color, r2 = this.radius): CanvasGradient {
    const { x, y } = this.$coord
    const gradient = this.$context.createRadialGradient(x, y, r1, x, y, r2)
    gradient.addColorStop(0, c1.output ? c1.output() : c1)
    gradient.addColorStop(1, c2.output ? c2.output() : c2)
    return gradient
  }

  bezierCurve(...coords: number[]) {
    if (coords.length % 6 === 2) {
      const point = this.$coord.resolve(coords[0], coords[1])
      this.$context.moveTo(point.x, point.y)
    }
    for (let i = 0; i < coords.length; i += 6) {
      const point1 = this.$coord.resolve(coords[i], coords[i + 1])
      const point2 = this.$coord.resolve(coords[i + 2], coords[i + 3])
      const point3 = this.$coord.resolve(coords[i + 4], coords[i + 5])
      this.$context.bezierCurveTo(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y)
    }
  }

  quadraticCurve(...coords: number[]) {
    if (coords.length % 4 === 2) {
      const point = this.$coord.resolve(coords[0], coords[1])
      this.$context.moveTo(point.x, point.y)
    }
    for (let i = 0; i < coords.length; i += 4) {
      const point1 = this.$coord.resolve(coords[i], coords[i + 1])
      const point2 = this.$coord.resolve(coords[i + 2], coords[i + 3])
      this.$context.quadraticCurveTo(point1.x, point1.y, point2.x, point2.y)
    }
  }

  protected toJSON() {
    const result: Partial<this> = {}
    for (const key in this) {
      if (typeof key === 'string' && key[0] !== '$' && key[0] !== '_' || key === '$tick') {
        result[key] = this[key]
      }
    }
    return result
  }
}
