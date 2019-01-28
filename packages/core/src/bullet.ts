import { math } from '@stg/utils'
import Templater, { Extension } from './templater'
import Coordinate, { Point } from './coordinate'
import CanvasPoint, { PointOptions } from './point'

type StringMap<T = any> = Record<string, T>
type JudgeType = 'square' | 'ortho' | 'tangent' | 'none'
type FieldType = 'viewport' | 'distant' | 'timing' | 'infinite'

interface BulletPoint {
  /** judge type (default: `ortho`) */
  judgeType?: JudgeType
  /** field type (default: `viewport`) */
  fieldType?: FieldType
  /** reletive point */
  relPoint?: string
  /** display layer */
  layer?: number
}

export interface BulletOptions extends PointOptions<Bullet>, BulletPoint {
  extends?: Extension<BulletOptions>
}

export interface BulletReferences extends StringMap<Coordinate> {
  player?: Coordinate
  base?: Coordinate
  src?: Coordinate
}

export default class Bullet extends CanvasPoint implements BulletPoint {
  /** built-in templates */
  static templates = new Templater<BulletOptions>({
    hookProperties: ['mutate', 'mounted'],
  })

  /** install new bullet templates */
  static install(templates: Record<string, BulletOptions>): void
  static install(name: string, options: BulletOptions): void
  static install(...args: [any, any?]) {
    this.templates.install(...args)
  }

  public layer: number
  public relPoint: string
  public judgeType: JudgeType
  public fieldType: FieldType

  /** @public judge radius */
  public judgeRadius?: number
  /** @public buller id */
  public $id: number
  /** @public reference points */
  public $refs: BulletReferences

  constructor(options: BulletOptions = {}) {
    const template = Bullet.templates.resolve(options)
    if (template.judgeType === undefined) {
      template.judgeType = 'ortho'
    } else if (template.judgeType === 'none') {
      template.judgeType = null
    }
    if (template.fieldType === undefined) {
      template.fieldType = 'viewport'
    } else if (template.fieldType === 'infinite') {
      template.fieldType = null
    }
    template.extends = [template.fieldType, template.judgeType]
    super(Bullet.templates.resolve(template))
    this.$refs = {}
    this.layer = template.layer === undefined ? 0 : template.layer
    this.relPoint = template.relPoint === undefined ? 'base' : template.relPoint
  }

  get $coord(): Coordinate {
    if (!this._coordinate || this.$tick !== this._coordinate.$birth) {
      const rel: Point = this.$refs[this.relPoint] || { x: 0, y: 0, face: 0 }
      this._coordinate = new Coordinate(this.x + rel.x, this.y + rel.y, this.face + rel.face)
      this._coordinate.$birth = this.$tick
    }
    return this._coordinate
  }

  polarLocate(rho = this.rho, theta = this.theta) {
    theta += ((this.$refs[this.relPoint] || { face: 0 }).face || 0)
    this.x = rho * math.cos(Math.PI * theta)
    this.y = rho * math.sin(Math.PI * theta)
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
