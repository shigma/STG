import { BulletAssetMap, TransformArray } from '@stg/core'

export const colorSeries = {
  4: [
    'red', 'blue', 'green', 'yellow',
  ],
  8: [
    'black', 'red', 'magenta', 'blue', 'cyan', 'green', 'yellow', 'gray',
  ],
  16: [
    'black', 'maroon', 'red', 'purple', 'magenta', 'darkblue', 'blue', 'darkcyan',
    'cyan', 'darkgreen', 'green', 'yellowgreen', 'darkyellow', 'yellow', 'orange', 'gray',
  ],
}

export function defineBullet(size: 8 | 16 | 32 | 64, sum: number = 256 / size, row: number = 1) {
  const length = sum / row
  return (
    name: string,
    judgeRadius: number,
    xStart: number,
    yStart: number,
    transform?: TransformArray,
  ) => {
    const assets = {} as BulletAssetMap
    colorSeries[sum].forEach((color, index) => {
      const left = xStart + index * size
      const top = yStart + (Math.floor(index / length) * size)
      assets[`${name}?color=${color}`] = {
        judgeRadius,
        transform,
        selector: [ left, top, left + size, top + size ],
      }
    })
    return assets
  }
}

export const bullet8x32p = defineBullet(32)
export const bullet4x64p = defineBullet(64)
export const bullet16x16p = defineBullet(16)
export const bullet16x8p = defineBullet(8, 16, 2)
