import * as stg from '@stg/core'
import * as touhou from '@stg/touhou'

stg.use(touhou)

export * from '@stg/core'
export * from '@stg/utils'
export { touhou }
export { version } from '../package.json'
