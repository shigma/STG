import { defineEmitterAssetV2 } from '../utils'
import { ImageOptions, STG } from '@stg/core'
import { checkAssets } from '../utils'
import v2_1 from '../bullets/v2-1'
import v2_2 from '../bullets/v2-2'
import v2_3 from '../bullets/v2-3'

export interface Th15Assets extends Record<string, string> {
  bullet1: string
  bullet2: string
  bullet3: string
  hakurei_reimu?: string
  kochiya_sanae?: string
  kirisame_marisa?: string
  reisen_udongein_inaba?: string
}

export default async function install(stg: STG, options: Th15Assets) {
  checkAssets(['bullet1', 'bullet2', 'bullet3'], options)
  const assets = {} as ImageOptions
  for (const key in options) {
    assets[`th15:${key}`] = options[key]
  }
  await stg.images.load(assets)
  stg.buildBullet('th15:bullet1', v2_1)
  stg.buildBullet('th15:bullet2', v2_2)
  stg.buildBullet('th15:bullet3', v2_3)
  stg.buildEmitter('th15:hakurei_reimu', {
    hakurei_reimu: defineEmitterAssetV2(),
  })
}
