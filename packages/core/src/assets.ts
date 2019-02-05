import config from './config'
import { resolve } from 'url'

const assets = {
  images: {},
}

export default assets as AssetsResolved

export type ImagesOptions = Record<string, string>
export type ImagesResolved = Record<string, ImageBitmap>

export async function loadImages(source: ImagesOptions = {}) {
  const requests = [] as Promise<ImageBitmap>[]
  for (const key in source) {
    if (!(key in assets.images)) {
      assets.images[key] = fetch(resolve(config.publicPath, source[key]))
        .then(response => response.blob())
        .then(createImageBitmap)
        .then(image => assets.images[key] = image)
        .catch(() => delete assets.images[key])
    }
    requests.push(assets.images[key])
  }
  await Promise.all(requests)
  return assets.images as ImagesResolved
}

export function checkImages(...keys: string[]) {
  keys.forEach((key) => {
    const result = key in assets.images && typeof assets.images[key].then !== 'function'
    if (!result) throw new Error(`Asset ${key} has not been loaded.`)
  })
}

export interface AssetsOptions {
  images?: Record<string, string>
}

export interface AssetsResolved {
  images: ImagesResolved
}

export async function loadAssets(options: AssetsOptions = {}) {
  await Promise.all([
    loadImages(options.images),
  ])
  return assets as AssetsResolved
}
