import * as math from './math'
import Builtin from './builtin'
import deepmerge from 'deepmerge'
import Coordinate, { Point } from './coordinate'
import CanvasPoint, { PointOptions } from './point'

type StringMap<T = any> = Record<string, T>
type BulletTemplate = string | BulletOptions | (string | BulletOptions)[]
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
  extends?: BulletTemplate
}

export interface BulletReferences extends StringMap<Coordinate> {
  player?: Coordinate
  base?: Coordinate
  src?: Coordinate
}

function resolveTemplate(template: BulletTemplate): BulletOptions {
  if (Array.isArray(template)) {
    return deepmerge.all(template.map(resolveTemplate))
  } else if (typeof template === 'string') {
    if (template in Builtin.Templates) {
      return resolveTemplate(Builtin.Templates[template])
    } else {
      throw new Error(`Template ${template} was not registered.`)
    }
  } else if (template.extends) {
    return deepmerge(resolveTemplate(template.extends), template)
  } else {
    return template
  }
}

export default class Bullet extends CanvasPoint implements BulletPoint {
  public layer: number
  public relPoint: string
  public judgeType: JudgeType
  public fieldType: FieldType

  /** @public judge radius */
  public judgeR?: number
  /** @public buller id */
  public $id: number
  /** @public reference points */
  public $refs: BulletReferences

  constructor(options: BulletOptions = {}) {
    const template = resolveTemplate(options)
    super(template)
    this.$refs = {}
    this.layer = template.layer === undefined ? 0 : template.layer
    this.relPoint = template.relPoint === undefined ? 'base' : template.relPoint
    if (template.judgeType === undefined) this.judgeType = 'ortho'
    if (template.fieldType === undefined) this.fieldType = 'viewport'
  }

  get $coord(): Coordinate {
    if (!this._coordinate || this.$timestamp !== this._coordinate.$birth) {
      const rel: Point = this.$refs[this.relPoint] || { x: 0, y: 0, face: 0 }
      this._coordinate = new Coordinate(this.x + rel.x, this.y + rel.y, this.face + rel.face)
      this._coordinate.$birth = this.$timestamp
    }
    return this._coordinate
  }

  _mutate(time: number, delta: number) {
    this._mutateHook.forEach(hook => hook.call(this, time, delta))
    if (this.judgeType in Builtin.Judges) {
      Builtin.Judges[this.judgeType].mutate.call(this)
    }
    if (this.fieldType in Builtin.Fields) {
      Builtin.Fields[this.fieldType].mutate.call(this)
    }
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
    this.$parent.setImmediate(function() {
      const index = this.$bullets.findIndex(bullet => bullet.$id === $id)
      if (index >= 0) this.$bullets.splice(index, 1)
    })
  }
}
