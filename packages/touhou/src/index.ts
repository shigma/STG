import { STG } from '@stg/core'

import flaming from './templates/flaming'
import large from './templates/large'
import medium from './templates/medium'
import small from './templates/small'
import ellipse from './templates/ellipse'

export function install(stg: STG) {
  stg.defineTemplate({
    flaming,
    large,
    medium,
    small,
    ellipse,
  })
}

import th15 from './touhou/th15'

export {
  th15,
}
