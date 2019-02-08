import { parse } from 'querystring'
import { checkImages } from './assets'
import { BulletTemplate } from './bullet'
import builtinBlurs from './builtin/blur'
import builtinFields from './builtin/field'
import builtinJudges from './builtin/judge'

export interface BulletTemplateWrapper extends BulletTemplate {
  weight: number
  query: string
  test(target: object): boolean
}

/** built-in templates */
const templates: Record<string, BulletTemplateWrapper[]> = {}
/** built-in fields */
const fields = builtinFields
/** built-in judges */
const judges = builtinJudges
/** built-in blur effects */
const blurs = builtinBlurs

export default {
  templates,
  fields,
  judges,
  blurs,
}

/** define new bullet templates */
export function defineTemplate(templates: Record<string, BulletTemplate>): void
export function defineTemplate(name: string, options: BulletTemplate): void
export function defineTemplate(...args: [any, any?]) {
  if (typeof args[0] === 'string') {
    const match = /^([\w_$]+)(?:\?(.+))?$/.exec(args[0])
    if (!match) throw new Error(`Invalid form: "${args[0]}".`)
    const name = match[1]
    const query = args[0]
    const attrs = parse(match[2])
    const weight = Object.keys(attrs).length
    templates[name] = templates[name] || []
    let index = 0, insert = null
    for (; index < templates[name].length; index += 1) {
      const template = templates[name][index]
      if (template.query === query) break
      if (template.weight <= weight) {
        if (insert === null) insert = index
        if (template.weight < weight) break
      }
    }
    if (templates[name][index] && templates[name][index].query === query) {
      Object.assign(templates[name][index], args[1])
    } else {
      templates[name].splice(insert === null ? Infinity : insert, 0, {
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
  } else {
    for (const key in args[0]) {
      defineTemplate(key, args[0][key])
    }
  }
}

export type TransformArray = [boolean, number?, number?, number?]
export type SelectorArray = [number, number, number, number]

export interface SelectorObject {
  interval?: number
  data: SelectorArray[]
}

export interface BulletAsset {
  judgeRadius: number
  transform?: TransformArray
  selector: SelectorArray | SelectorObject
}

export type BulletAssetMap = Record<string, BulletAsset>

/** build bullet templates from image assets */
export function buildFromImages(id: string, map: BulletAssetMap) {
  checkImages(id)
  for (const name in map) {
    let {
      selector,
      judgeRadius,
      transform: [rotSym = false, scale = 1, xOffset = 0, yOffset = 0] = [],
    } = map[name]
    if (Array.isArray(selector)) selector = { data: [selector] }
    const interval = selector.interval || 1
    const dataset = selector.data
    const rotate = rotSym ? undefined : 0

    defineTemplate(name, {
      applied() {
        this.judgeRadius = judgeRadius
      },
      display(tick) {
        const [ xStart, yStart, xEnd, yEnd ] = dataset[Math.floor(tick / interval) % dataset.length]
        this.drawImage(id, { rotate, scale, xOffset, yOffset }, { xStart, yStart, xEnd, yEnd })
      },
    })
  }
}
