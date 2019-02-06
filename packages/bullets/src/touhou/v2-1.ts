import { BulletAssetMap } from '@stg/core'
import { bullet16x16p, bullet16x8p } from './utils'

export default {
  ...bullet16x16p('scale', 2.4, 0, 16, [1, 0, 3]),
  ...bullet16x16p('ring', 4, 0, 32),
  ...bullet16x16p('small', 4, 0, 48),
  ...bullet16x16p('rice', 2.4, 0, 64),
  ...bullet16x16p('chain', 2.4, 0, 80),
  ...bullet16x16p('needle', 2.4, 0, 96),
  ...bullet16x16p('shell', 2.8, 0, 112),
  ...bullet16x16p('bullet', 2.4, 0, 128),
  ...bullet16x16p('bacillus', 2.4, 0, 144),
  ...bullet16x16p('star', 4, 0, 160),
  ...bullet16x16p('unknown1', 4, 0, 176),
  ...bullet16x8p('grape', 2.4, 0, 192),
  ...bullet16x8p('grain', 2.4, 64, 192),
  ...bullet16x8p('point', 2.4, 0, 240),
} as BulletAssetMap
