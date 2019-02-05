import config from './config'
import { math } from '@stg/utils'
import { TaskHook, MountHook } from './updater'
import assets, { checkImages } from './assets'
import Coordinate, { Point } from './coordinate'
import CanvasPoint, { PointOptions } from './point'
import builtinFields, { BulletField } from './builtin/fields'
import builtinJudges, { BulletJudge } from './builtin/judges'

type JudgeType = 'square' | 'ortho' | 'tangent' | BulletJudge
type FieldType = 'viewport' | 'distant' | 'timing' | BulletField

interface BulletPoint {
  /** judge type (default: `ortho`) */
  judgeType?: JudgeType
  /** field type (default: `viewport`) */
  fieldType?: FieldType
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

export type BulletAsset = {
  xStart: number
  yStart: number
  xEnd: number
  yEnd: number
  judgeRadius: number
  scale?: number
  xOffset?: number
  yOffset?: number
} | [number, number, number, number, number, number?, number?, number?]

export default class Bullet extends CanvasPoint<string> implements BulletPoint {
  /** built-in templates */
  static templates: Record<string, BulletTemplate> = {}
  /** built-in fields */
  static fields = builtinFields
  /** built-in judges */
  static judges = builtinJudges

  /** install new bullet templates */
  static install(templates: Record<string, BulletTemplate>): void
  static install(name: string, options: BulletTemplate): void
  static install(...args: [any, any?]) {
    if (typeof args[0] === 'string') {
      this.templates[args[0]] = args[1]
    } else {
      Object.assign(this.templates, args[0])
    }
  }

  /** build bullet templates from image assets */
  static buildFromImages(id: string, map: Record<string, BulletAsset>) {
    checkImages(id)
    for (const name in map) {
      let options = map[name]
      if (Array.isArray(options)) {
        const [ xStart, yStart, xEnd, yEnd, judgeRadius, scale, xOffset, yOffset ] = options
        options = { xStart, yStart, xEnd, yEnd, judgeRadius, scale, xOffset, yOffset }
      }
      const {
        xStart,
        yStart,
        xEnd,
        yEnd,
        judgeRadius,
        scale = 1,
        xOffset = (xEnd - xStart) / 2,
        yOffset = (yEnd - yStart) / 2,
      } = options
      this.templates[name] = {
        applied() {
          this.judgeRadius = judgeRadius
        },
        display() {
          this.drawImage(id, scale, xStart, yStart, xEnd, yEnd, xOffset, yOffset)
        }
      }
    }
  }

  public layer: number
  public judgeType: JudgeType
  public fieldType: FieldType

  /** @public buller id */
  public $id: number
  /** @public reference points */
  public $refs: BulletReferences
  /** @public origin point */
  public $origin: Point

  constructor(options: BulletOptions = {}) {
    // temporarily store the display
    const display = options.display
    delete options.display

    super(options)
    this.$refs = {}

    // set bullet layer
    this.layer = options.layer === undefined ? 0 : options.layer

    // set judge hook and field hook
    this.judgeType = options.judgeType === undefined ? 'ortho' : options.judgeType
    this.fieldType = options.fieldType === undefined ? 'viewport' : options.fieldType
    this.setTask((tick) => {
      const judge = this._resolveHook(this.judgeType, Bullet.judges)
      const player = this.$parent.$refs.player
      if (judge && player && judge.call(this, player)) {
        this.hitPlayer()
      }

      const field = this._resolveHook(this.fieldType, Bullet.fields)
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

  set display(value: string | TaskHook<this>) {
    if (typeof value === 'string') {
      const template = Bullet.templates[value]
      if (!template) throw new Error(`Template ${value} was not registered.`)
      if (template.applied) template.applied.call(this)
      this._displayHook = template.display
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
      this._coordinate = new Coordinate(
        this.x + this.$origin.x,
        this.y + this.$origin.y,
        this.face + this.$origin.face,
      )
      this._coordinate.$birth = this.$tick
    }
    return this._coordinate
  }

  polarLocate(rho = this['rho'], theta = this['theta']) {
    theta += this.$origin.face
    this.x = rho * math.cos(config.angleUnit * theta)
    this.y = rho * math.sin(config.angleUnit * theta)
  }

  hitPlayer() {
    this.$parent.$refs.player.lifeCount -= 1
    this.destroy()
  }

  destroy() {
    const $id = this.$id
    this.$parent.setTimeout(0, function() {
      const index = this.$bullets.findIndex(bullet => bullet.$id === $id)
      if (index >= 0) this.$bullets.splice(index, 1)
    })
  }
}
