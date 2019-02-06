import * as STG from '@stg/core'

import flaming from './templates/flaming'
import large from './templates/large'
import medium from './templates/medium'
import small from './templates/small'
import ellipse from './templates/ellipse'

import v2_1 from './touhou/v2-1'
import v2_2 from './touhou/v2-2'
import v2_3 from './touhou/v2-3'

export { colorSeries } from './touhou/utils'

export const touhou = {
  v2_1,
  v2_2,
  v2_3,
}

export default function install(stg: typeof STG) {
  stg.defineTemplate({
    flaming,
    large,
    medium,
    small,
    ellipse,
  })
}
