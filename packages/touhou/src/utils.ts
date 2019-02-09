import { BulletAssetMap, ImageTransform, EmitterAsset, PositionArray } from '@stg/core'
import { color } from '@stg/utils'

const schemes = {
  4: color.scheme4,
  8: color.scheme8,
  16: color.scheme16,
} as Record<string, string[]>

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

export function defineEmitterAssetV2(
  interval?: number,
  transform?: ImageTransform,
): EmitterAsset {
  const positions = [[], [], []] as PositionArray[][]
  for (let col = 0; col < 8; col += 1) {
    for (let row = 0; row < 3; row += 1) {
      const left = col * 32
      const top = row * 48
      positions[row].push([left, top, left + 32, top + 48])
    }
  }
  return {
    interval,
    transform,
    static: positions[0],
    leftward: positions[1],
    rightward: positions[2],
  }
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
    transform?: ImageTransform,
  ) => {
    const assets = {} as BulletAssetMap
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
