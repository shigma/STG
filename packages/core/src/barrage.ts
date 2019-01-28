import Player from './player'
import Bullet, { BulletOptions } from './bullet'
import CanvasPoint, { PointOptions } from './point'
import Updater, { MountHook, TaskHook } from './updater'

type MaybeFunction<T> = T | (() => T)

export interface BarrageOptions<T extends Barrage = Barrage> {
  state?: MaybeFunction<Record<string, any>>
  reference?: Record<string, CanvasPoint | PointOptions>
  mounted?: MountHook<T & Record<string, any>>
  mutate?: TaskHook<T & Record<string, any>>
  methods?: Record<string, (this: T & Record<string, any>, ...args: any[]) => any>
}

export type BulletEmitter = ((this: Barrage, index: number) => BulletOptions) | BulletOptions

export interface BarrageReferences extends Record<string, CanvasPoint> {
  player?: Player
  src?: CanvasPoint
  base?: CanvasPoint
}

export default class Barrage extends Updater {
  /** @static max bullet count */
  static maxBulletCount = 4096

  /** @private store the last created point index */
  private _pointCounter = 0
  /** @protected mounted hook */
  protected _mountedHook: MountHook<this & any>
  /** @protected mutate hook */
  protected _mutateHook: TaskHook<this & any>
  /** @protected reference points */
  protected _references: Record<string, CanvasPoint | PointOptions>

  /** @public bullets in the barrage */
  public $bullets: Bullet[]
  /** @public reference coordinates */
  public $refs: BarrageReferences

  constructor(options: BarrageOptions = {}) {
    super()
    this.$refs = {}
    this.$bullets = []
    this._mutateHook = options.mutate
    this._mountedHook = options.mounted
    this._references = options.reference || {}
    Object.assign(this, options.methods)
    const state = typeof options.state === 'function'
      ? options.state.call(this)
      : options.state
    Object.assign(this, state)
  }

  _mounted() {
    this.$refs = {}
    if (this._mountedHook) this._mountedHook()
    if (this._mutateHook) this.setTask(this._mutateHook)
    for (const key of Object.keys(this._references)) {
      this.setRefPoint(key, this._references[key])
    }
    this.setTask(() => {
      for (const key in this.$refs) {
        const ref = this.$refs[key]
        if (ref.$parent === this) ref.update()
      }
      this.$bullets.forEach(bullet => bullet.update())
      if (this.$bullets.length > Barrage.maxBulletCount) {
        throw new Error(`The amount of bullets ${this.$bullets.length} is beyond the limit!`)
      }
    })
  }

  render() {
    for (const key in this.$refs) {
      const ref = this.$refs[key]
      if (ref.$parent === this) ref.render()
    }
    this.$bullets.forEach(bullet => bullet.render())
  }

  /**
   * set a reference point
   * @returns reference key
   */
  setRefPoint(reference: PointOptions): number
  setRefPoint(key: string, reference: PointOptions): string
  setRefPoint(...args: any[]): number | string {
    const options: PointOptions = args[args.length - 1]
    const key = args.length > 1 ? args[0] : ++ this._pointCounter
    this.$refs[key] = new CanvasPoint(options).initialize(this.$context, this)
    return key
  }

  /**
   * remove a reference point
   * @returns whether the provided key is found
   */
  removeRefPoint(key: string | number): boolean {
    return delete this.$refs[key]
  }

  /** emit bullets from the barrage */
  emitBullets(end: number, bullet: BulletEmitter): void
  emitBullets(start: number, end: number, bullet: BulletEmitter): void
  emitBullets(start: number, end: number, step: number, bullet: BulletEmitter): void
  emitBullets(...args: [number, any, any?, any?]): void {
    const start: number = args.length > 2 ? args[0] : 0
    const end: number = args.length > 1 ? args.length > 2 ? args[1] : args[0] : 1
    const step: number = args.length > 3 ? args[2] : 1
    const emitter: BulletEmitter = args[args.length - 1]
    for (let i = start; i < end; i += step) {
      const options = typeof emitter === 'function' ? emitter.call(this, i) : emitter
      const bullet = new Bullet(options)
      bullet.$id = ++ this._pointCounter
      for (const key in this.$refs) {
        bullet.$refs[key] = this.$refs[key].$coord
      }
      bullet.initialize(this.$context, this)
      const index = this.$bullets.findIndex(({ layer }) => layer > bullet.layer)
      if (index < 0) {
        this.$bullets.push(bullet)
      } else {
        this.$bullets.splice(index, 0, bullet)
      }
    }
  }
}
