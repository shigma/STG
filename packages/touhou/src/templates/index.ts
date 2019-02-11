import { STG } from '@stg/core'
import flaming from './flaming'
import large from './large'
import medium from './medium'
import small from './small'
import ellipse from './ellipse'

export default function install(stg: STG) {
  stg.defineTemplate({
    flaming,
    large,
    medium,
    small,
    ellipse,
  })
}
