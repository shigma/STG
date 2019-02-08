import config from './config'
import builtin from './template'
import Barrage from './barrage'
import { math } from '@stg/utils'
import { BulletJudge } from './builtin/judge'
import { TaskHook, MountHook } from './updater'
import Coordinate, { Point } from './coordinate'
import CanvasPoint, { PointOptions } from './point'

type BlurType = 'small' | TaskHook<Bullet, number>
type JudgeType = 'square' | 'ortho' | 'tangent' | BulletJudge
type FieldType = 'viewport' | 'distant' | 'timing' | TaskHook<Bullet, boolean>

interface BulletPoint {
  /** judge type (default: `ortho`) */
  judgeType?: JudgeType
  /** field type (default: `viewport`) */
  fieldType?: FieldType
  /** blur function */
  blur?: BlurType
  /** origin point */
  origin?: string | Point
  /** display layer */
  layer?: number
}

export interface BulletTemplate {
  applied?: MountHook<Bullet & Record<string, any>>
  display?: TaskHook<Bullet & Record<string, any>>
}

export interface BulletOptions extends PointOptions<string, Bullet>, BulletPoint {}

export interface BulletReferences {
  [key: string]: Coordinate
  player?: Coordinate
  origin?: Coordinate
  source?: Coordinate
}

export default class Bullet extends CanvasPoint<string> implements BulletPoint {
  public layer: number
  public judgeType: JudgeType
  public fieldType: FieldType
  public blur?: TaskHook<Bullet, number>

  /** @public grazing */
  public grazing?: boolean

  /** @public buller id */
  public $id: number
  /** @public reference points */
  public $refs: BulletReferences
  /** @public origin point */
  public $origin: Point
  /** @public parent field */
  public $parent: Barrage

  constructor(options: BulletOptions = {}) {
    // temporarily store the display
    const display = options.display
    delete options.display

    super(options)
    this.$refs = {}

    // set bullet layer
    this.layer = options.layer === undefined ? 0 : options.layer
    this.blur = typeof options.blur === 'string' ? builtin.blurs[options.blur] : options.blur

    // set judge hook and field hook
    this.judgeType = options.judgeType === undefined ? 'ortho' : options.judgeType
    this.fieldType = options.fieldType === undefined ? 'viewport' : options.fieldType
    this.setTask((tick) => {
      const judge = this._resolveHook(this.judgeType, builtin.judges)
      const player = this.$barrage.$refs.player
      if (judge && player) {
        if (judge.call(this, player)) {
          this.hitPlayer()
        } else {
          this.grazing = judge.call(this, player, config.grazeRadius)
        }
      }

      const field = this._resolveHook(this.fieldType, builtin.fields)
      if (field && field.call(this, tick)) {
        this.destroy()
      }
    })

    // set originprivate point
    const origin = options.origin || 'origin'
    if (typeof origin !== 'string') {
      this.$origin = origin
    } else {
      this._mountedHook.unshift(() => {
        if (!this.$refs[origin]) {
          if (config.showWarning) {
            console.warn(`Warning: reference point ${origin} is not found.`)
          }
          this.$origin = { x: 0, y: 0, face: 0 }
        } else {
          this.$origin = this.$refs[origin]
        }
      })
    }

    // set initial display
    this.display = display
  }

  render() {
    if (!this.$context || typeof this._displayHook !== 'function') return
    let filter = ''
    if (typeof this.blur === 'function') {
      const blur = this.blur(this.$tick)
      if (blur > 0) filter += `blur(${blur}px)`
    }
    if (this.grazing) filter += 'sepia(0.8) contrast(1.5) hue-rotate(-0.5rad)'
    this.$context.filter = filter || 'none'
    this._displayHook.call(this, this.$tick)
    this.$context.filter = 'none'
  }

  set display(value: string | TaskHook<this>) {
    if (typeof value === 'string') {
      const wrapper = (builtin.templates[value] || []).find(wrapper => wrapper.test(this))
      if (!wrapper) throw new Error(`A template matching ${value} was not found.`)
      if (wrapper.applied) wrapper.applied.call(this)
      this._displayHook = wrapper.display
    } else {
      this._displayHook = value
    }
  }

  get display() {
    return this._displayHook
  }

  private _resolveHook<T>(hook: string | T, target: Record<string, T>) {
    if (typeof hook !== 'string') return hook
    if (!(hook in target)) {
      throw new Error(`Plugin ${hook} was not found.`)
    } else {
      return target[hook]
    }
  }

  get $coord(): Coordinate {
    if (!this._coordinate || this.$tick !== this._coordinate.$birth) {
      this._coordinate = Coordinate.from(this.$origin).resolve(this)
      this._coordinate.$birth = this.$tick
    }
    return this._coordinate
  }

  polarLocate(rho = this['rho'], theta = this['theta']) {
    this.x = rho * math.cos(config.angleUnit * theta)
    this.y = rho * math.sin(config.angleUnit * theta)
  }

  hitPlayer() {
    this.$barrage.$refs.player.lifeCount -= 1
    this.destroy()
  }

  destroy() {
    const $id = this.$id
    this.$barrage.setTimeout(0, function() {
      const index = this.$bullets.findIndex(bullet => bullet.$id === $id)
      if (index >= 0) this.$bullets.splice(index, 1)
    })
  }
}

Object.assign(Bullet, builtin)
