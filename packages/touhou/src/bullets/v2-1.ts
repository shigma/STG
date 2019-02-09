import { color } from '@stg/utils'
import { BulletAssetMap } from '@stg/core'
import { bullet16x16p, bullet16x8p, bullet8x32p } from '../utils'

const fogBullets = bullet8x32p('fog', 0, 0, 208)

for (const key in color.fallback) {
  fogBullets[`fog?color=${key}`] = fogBullets[`fog?color=${color.fallback[key]}`]
}

export default {
  ...bullet16x16p('scaly', 2.4, 0, 16, 'fog', true, { yOffset: 3 }),
  ...bullet16x16p('ring', 4, 0, 32, 'fog'),
  ...bullet16x16p('small', 4, 0, 48, 'fog'),
  ...bullet16x16p('rice', 2.4, 0, 64, 'fog', true),
  ...bullet16x16p('chain', 2.4, 0, 80, 'fog', true),
  ...bullet16x16p('needle', 2.4, 0, 96, 'fog', true),
  ...bullet16x16p('shell', 2.8, 0, 112, 'fog', true),
  ...bullet16x16p('bullet', 2.4, 0, 128, 'fog', true),
  ...bullet16x16p('bacillus', 2.4, 0, 144, 'fog', true),
  ...bullet16x16p('star', 4, 0, 160, 'fog', true),
  ...bullet16x16p('explode', 4, 0, 176),
  ...bullet16x8p('grape', 2.4, 0, 192),
  ...bullet16x8p('grain', 2.4, 64, 192, null, true),
  ...bullet16x8p('point', 2.4, 0, 240),
  ...fogBullets,
} as BulletAssetMap
