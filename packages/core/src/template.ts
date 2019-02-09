import config from './config'
import { parse } from 'querystring'
import builtinFields from './builtin/field'
import builtinJudges from './builtin/judge'
import { MountHook, TaskHook } from './updater'
import CanvasPoint, { Emitter, ImageTransform } from './point'

class TemplateManager<T> {
  private _data: Record<string, T> = {}

  constructor(init: Record<string, T> = {}) {
    this.define(init)
  }

  define(options: Record<string, T>): void
  define(key: string, value: T): void
  define(...args: [any, any?]) {
    if (typeof args[0] === 'string') {
      this._data[args[0]] = args[1]
    } else {
      Object.assign(this._data, args[0])
    }
  }

  resolve(hook: string | T) {
    if (typeof hook !== 'string') return hook
    const result = this._data[hook]
    if (!result) throw new Error(`Template ${hook} was not found.`)
    return result
  }
}

export interface PointTemplate {
  applied?: MountHook<CanvasPoint & Record<string, any>>
  display?: TaskHook<CanvasPoint & Record<string, any>>
}

export interface PointTemplateWrapper extends PointTemplate {
  weight: number
  query: string
  test(target: Record<string, any>): boolean
}

export type PositionArray = [number, number, number, number]

export interface PositionObject {
  interval?: number
  data: PositionArray[]
}

export interface BulletAsset {
  judgeRadius: number
  spinning?: boolean
  fogEffect?: string
  transform?: ImageTransform
  position: PositionArray | PositionObject
}

export type BulletAssetMap = Record<string, BulletAsset>

export interface EmitterAsset {
  transform?: ImageTransform
  interval?: number
  static: PositionArray[]
  leftward: PositionArray[]
  rightward: PositionArray[]
}

export type EmitterAssetMap = Record<string, EmitterAsset>

export class DisplayManager {
  private _data: Record<string, PointTemplateWrapper[]> = {}

  define(options: Record<string, PointTemplate>): void
  define(key: string, value: PointTemplate): void
  define(...args: [any, any?]) {
    if (typeof args[0] !== 'string') {
      for (const key in args[0]) {
        this.define(key, args[0][key])
      }
      return
    }
    const match = /^([\w_$]+)(?:\?(.+))?$/.exec(args[0])
    if (!match) throw new Error(`Invalid form: "${args[0]}".`)
    const name = match[1]
    const query = args[0]
    const attrs = parse(match[2])
    const weight = Object.keys(attrs).length
    this._data[name] = this._data[name] || []
    let index = 0, insert = null
    for (; index < this._data[name].length; index += 1) {
      const template = this._data[name][index]
      if (template.query === query) break
      if (template.weight <= weight) {
        if (insert === null) insert = index
        if (template.weight < weight) break
      }
    }
    if (this._data[name][index] && this._data[name][index].query === query) {
      Object.assign(this._data[name][index], args[1])
    } else {
      this._data[name].splice(insert === null ? Infinity : insert, 0, {
        query,
        weight,
        ...args[1],
        test(target) {
          for (const key in attrs) {
            if (target[key] != attrs[key]) return false
          }
          return true
        },
      })
    }
  }

  resolve(key: string | PointTemplate, source: CanvasPoint): PointTemplate {
    if (typeof key !== 'string') return key
    const wrapper = (this._data[key] || []).find(wrapper => wrapper.test(source))
    if (!wrapper) throw new Error(`A template matching ${key} was not found.`)
    return wrapper
  }

  buildEmitter(id: string, map: EmitterAssetMap) {
    for (const key in map) {
      let {
        leftward,
        rightward,
        static: static$,
        transform = {},
        interval = config.imageUpdateInterval,
      } = map[key]

      this.define(key, {
        display(this: Emitter) {
          const data = this.$direction === 0 ? static$
            : this.$direction === 1 ? rightward
            : leftward
          let index = Math.floor(this.$directionTick / interval)
          if (this.$direction) {
            if (index >= data.length) index = data.length - 1
          } else {
            index %= data.length
          }
          const [ xStart, yStart, xEnd, yEnd ] = data[index]
          this.drawImage(id, transform, { xStart, yStart, xEnd, yEnd })
        },
      })
    }
  }

  buildBullet(id: string, map: BulletAssetMap) {
    for (const key in map) {
      let {
        position,
        judgeRadius,
        spinning,
        fogEffect,
        transform = {},
      } = map[key]
      if (Array.isArray(position)) {
        position = { data: [position] }
      }

      const { interval = 1, data } = position
      transform.rotate = spinning ? undefined : 0

      this.define(key, {
        applied() {
          if (typeof judgeRadius === 'number') this.judgeRadius = judgeRadius
        },
        display(tick = 0) {
          if (fogEffect && tick <= config.fogEffectTimeout) {
            this.drawTemplate(fogEffect)
          } else {
            const index = Math.floor(tick / interval) % data.length
            const [ xStart, yStart, xEnd, yEnd ] = data[index]
            this.drawImage(id, transform, { xStart, yStart, xEnd, yEnd })
          }
        },
      })
    }
  }
}

const fields = new TemplateManager(builtinFields)
const judges = new TemplateManager(builtinJudges)
const display = new DisplayManager()

export default { fields, judges, display }

export function buildBullet(id: string, map: BulletAssetMap) {
  display.buildBullet(id, map)
}

export function buildEmitter(id: string, map: EmitterAssetMap) {
  display.buildEmitter(id, map)
}

export function defineTemplate(options: Record<string, PointTemplate>): void
export function defineTemplate(key: string, value: PointTemplate): void
export function defineTemplate(...args: [any, any?]) {
  display.define(...args)
}
