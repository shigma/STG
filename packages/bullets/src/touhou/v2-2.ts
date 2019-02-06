import { BulletAssetMap } from '@stg/core'
import { bullet4x64p, bullet8x32p } from './utils'

export default {
  ...bullet8x32p('bigstar', 7, 0, 0),
  ...bullet8x32p('medium', 8.5, 0, 32),
  ...bullet8x32p('butterfly', 7, 0, 64),
  ...bullet8x32p('knife', 6, 0, 96),
  ...bullet8x32p('ellipse', 7, 0, 128),
  ...bullet8x32p('unknown2', 7, 0, 160),
  ...bullet4x64p('large', 14, 0, 192),
} as BulletAssetMap
