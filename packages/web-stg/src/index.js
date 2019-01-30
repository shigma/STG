import '@stg/core/dist/index.min.css'
import { Bullet } from '@stg/core'
import * as builtin from '@stg/bullets'

Bullet.install(builtin)

export * from '@stg/core'
export * from '@stg/utils'
export const version = '0.2.1'
