import Updater, { TaskHook, MountHook } from './updater'
import Barrage, { BulletEmitter } from './barrage'
import Coordinate, { Point } from './coordinate'
import math from './math'

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
export default class CanvasPoint extends Updater implements Point {
  public x: number
  public y: number
  public face?: number
  public rho?: number
  public theta?: number
  public isPlayer?: boolean

  /** @protected current coordinate */
  protected _coordinate?: Coordinate

  /** @private mounted hook */
  private _mountedHook: MountHook<this>[]
  /** @private mutate hook */
  private _mutateHook: TaskHook<this>[]
  /** @private display hook */
  private _displayHook: MountHook<this>

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
    this.x = 0
    this.y = 0
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
    this.x += rho * math.cos(Math.PI * theta)
    this.y += rho * math.sin(Math.PI * theta)
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
    this.$context.arc(x, y, radius, 0, math.twoPi)
    this.$context.closePath()
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
}
