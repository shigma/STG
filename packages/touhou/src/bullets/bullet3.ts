import { BulletAssetMap } from '@stg/core'
import { bullet16x16p, bullet8x32p } from '../utils'

export default {
  ...bullet8x32p('heart', 10, 0, 0, 'fog', true),
  ...bullet8x32p('arrow', 4, 0, 32, 'fog', true, { yOffset: -3 }),
  ...bullet8x32p('unknown3', 4, 0, 64),
  ...bullet8x32p('unknown4', 7, 0, 224),
  ...bullet16x16p('drop', 2.4, 0, 192, 'fog', true, { yOffset: -4 }),
} as BulletAssetMap
