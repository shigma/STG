import * as stg from '@stg/core'
import { color } from '@stg/utils'
import bullets from './bullets'

const schemes = {
  4: color.scheme4,
  8: color.scheme8,
  16: color.scheme16,
} as Record<string, string[]>

export function generateTouhouPlugin(dataset: stg.EmitterAssetMap) {
  const plugin = {} as Record<string, stg.PluginFunction>

  for (const key in dataset) {
    plugin[key] = async (stg: stg.STG, source: string) => {
      const image = await stg.loadImages(source)
      stg.buildEmitter(image, { [key]: dataset[key] })
    }
  }
  
  plugin.install = async (stg: stg.STG, options: stg.ImageOptions) => {
    await Promise.all(Object.keys(dataset).map(async (key) => {
      if (!options[key]) return
      stg.use(plugin[key], options[key])
    }).concat([stg.use(bullets, options)]))
  }

  return plugin
}

export function checkAssets(checklist: string[], options: Record<string, string>) {
  if (!options) {
    throw new Error(`Image assets are required for the plugin.`)
  }
  checklist.forEach((key) => {
    if (!(key in options)) {
      throw new Error(`Asset ${key} is required for the plugin.`)
    }
  })
}

type EmitterData = [number, number, ...number[]]
interface EmitterDataMap extends Record<string, EmitterData> {
  static?: EmitterData
  leftward?: EmitterData
  rightward?: EmitterData
  spell?: EmitterData
}

export function prefix<T>(prefix: string, source: Record<string, T>) {
  const result = {} as Record<string, T>
  for (const key in source) {
    result[prefix + key] = source[key]
  }
  return result
}

export const playerAsset = defineEmitterAsset(32, 48, {
  static: [0, 0, 8],
  leftward: [0, 48, 8],
  rightward: [0, 96, 8],
})

export function defineEmitterAsset(
  width: number,
  height: number,
  mappings: EmitterDataMap,
) {
  const asset: stg.EmitterAsset = {}
  Object.keys(mappings).forEach((key) => {
    const [xStart, yStart, ...rows] = mappings[key]
    asset[key] = { data: [] }
    rows.forEach((cols, row) => {
      const top = yStart + row * height
      for (let col = 0; col < cols; col += 1) {
        const left = xStart + col * width
        asset[key].data.push([left, top, left + width, top + height])
      }
    })
  })
  return asset
}

function defineBullet(size: 8 | 16 | 32 | 64, sum: number = 256 / size, row: number = 1) {
  const length = sum / row
  return (
    name: string,
    judgeRadius: number,
    xStart: number,
    yStart: number,
    fogEffect?: string,
    spinning?: boolean,
    transform?: stg.ImageTransform,
  ) => {
    const assets = {} as stg.BulletAssetMap
    schemes[sum].forEach((color, index) => {
      const left = xStart + index * size
      const top = yStart + (Math.floor(index / length) * size)
      assets[`${name}?color=${color}`] = {
        judgeRadius,
        transform,
        spinning,
        fogEffect,
        position: [ left, top, left + size, top + size ],
      }
    })
    return assets
  }
}

export const bullet8x32p = defineBullet(32)
export const bullet4x64p = defineBullet(64)
export const bullet16x16p = defineBullet(16)
export const bullet16x8p = defineBullet(8, 16, 2)
