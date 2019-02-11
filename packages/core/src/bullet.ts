import config from './config'
import builtin from './template'
import Barrage from './barrage'
import { math } from '@stg/utils'
import { BulletFieldHook } from './builtin/field'
import { BulletJudgeHook } from './builtin/judge'
import Coordinate, { Point } from './coordinate'
import CanvasPoint, { PointOptions } from './point'

type JudgeType = 'square' | 'ortho' | 'tangent' | BulletJudgeHook
type FieldType = 'viewport' | 'distant' | 'timing' | BulletFieldHook

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

export interface BulletOptions extends PointOptions<Bullet>, BulletPoint {}

export interface BulletReferences {
  [key: string]: Coordinate
  player?: Coordinate
  origin?: Coordinate
  source?: Coordinate
}

interface BulletGrazing {
  birth?: number
  active: boolean
  end?: boolean
}

export default class Bullet extends CanvasPoint implements Point, BulletPoint {
  public layer: number
  public judgeType: JudgeType
  public fieldType: FieldType

  public rho?: number
  public theta?: number

  /** attribute from field:timing */
  public lifeSpan?: number
  /** attribute from field:viewport */
  public fieldBorder?: number
  /** @public is grazed by player */
  public grazing?: BulletGrazing

  /** @public buller id */
  public $id: number
  /** @public reference points */
  public $refs: BulletReferences
  /** @public origin point */
  public $origin: Point
  /** @public parent field */
  public $parent: Barrage

  constructor(options: BulletOptions = {}) {
    super(options)
    this.$refs = {}
    this.grazing = { active: false }

    // set bullet layer
    this.layer = options.layer === undefined ? 0 : options.layer

    // set judge hook and field hook
    this.judgeType = options.judgeType === undefined ? 'ortho' : options.judgeType
    this.fieldType = options.fieldType === undefined ? 'viewport' : options.fieldType
    this.setTask((tick) => {
      const judge = builtin.judges.resolve(this.judgeType)
      if (judge && this.$player) {
        if (judge.call(this, this.$player)) {
          this.hitPlayer()
        } else {
          if (this.grazing.end) return
          if (judge.call(this, this.$player, this.$player.grazeRadius)) {
            this.grazing.active = true
            if (!this.grazing.birth) {
              this.grazing.birth = tick
              this.$player.grazeCount += 1
            } else if (tick - this.grazing.birth > config.grazeTimeout) {
              this.grazing.end = true
              this.$player.grazeCount += config.grazeBonus
            }
          } else {
            this.grazing.active = false
            this.grazing.birth = null
          }
        }
      }

      const field = builtin.fields.resolve(this.fieldType)
      if (field && field.call(this, tick)) {
        this.destroy()
      }
    })

    // set origin point
    const origin = options.origin || 'origin'
    this._mountedHook.unshift(() => {
      this.$origin = this._resolvePoint(origin)
    })
  }

  render() {
    if (!this.$context || typeof this._displayHook !== 'function') return
    let filter = ''
    if (this.grazing.active) filter += config.grazeFilter
    this.$context.filter = filter || 'none'
    this._displayHook.call(this, this.$displayTick)
    this.$context.filter = 'none'
  }

  setOrigin(point: string | Point) {
    point = this._resolvePoint(point)
    const coord = Coordinate.from(point).locate(this.$coord)
    this.x = coord.x
    this.y = coord.y
    this.face = coord.face
    this.$origin = point
    return coord
  }

  private _resolvePoint(point: string | Point) {
    if (typeof point !== 'string') {
      return point
    } else if (!this.$refs[point]) {
      if (config.showWarning) {
        console.warn(`Warning: reference point ${point} is not found.`)
      }
      return { x: 0, y: 0, face: 0 }
    } else {
      return this.$refs[point]
    }
  }

  get $coord(): Coordinate {
    if (!this._coordinate || this.$tick !== this._coordinate.$birth) {
      this._coordinate = Coordinate.from(this.$origin).resolve(this)
      this._coordinate.$birth = this.$tick
    }
    return this._coordinate
  }

  polarLocate(rho = this.rho, theta = this.theta) {
    this.x = rho * math.cos(config.angleUnit * theta)
    this.y = rho * math.sin(config.angleUnit * theta)
  }

  hitPlayer() {
    this.$player.lifeCount -= 1
    this.$player.deathCount += 1
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
