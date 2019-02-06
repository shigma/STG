import { use } from '@stg/core'
import bulletPlugin from '@stg/bullets'

use(bulletPlugin)

export * from '@stg/core'
export * from '@stg/utils'
export * from '@stg/bullets'
export { version } from '../package.json'
