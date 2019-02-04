import { Bullet } from '@stg/core'
import * as builtin from '@stg/bullets'

Bullet.install(builtin)

export * from '@stg/core'
export * from '@stg/utils'
export { version } from '../package.json'
