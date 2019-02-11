import { STG, BulletAssetMap, ImageOptions } from '@stg/core'
import bullet1 from './bullet1'
import bullet2 from './bullet2'
import bullet3 from './bullet3'

const builtin = {
  bullet1,
  bullet2,
  bullet3,
} as Record<string, BulletAssetMap>

export default async function install(stg: STG, options: ImageOptions = {}) {
  return Promise.all(Object.keys(builtin).map(async (key) => {
    if (!options[key]) return
    const bullet = await stg.loadImages(options[key])
    stg.buildBullet(bullet, builtin[key])
  }))
}
