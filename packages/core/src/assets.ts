import config from './config'
import { resolve } from 'url'

interface AssetWrapper<T> {
  state?: 1 | 2
  promise: Promise<T>
  value?: T
  error?: any
}

abstract class AssetManager<T> {
  private _map = {} as Record<string, string>
  private _data = {} as Record<string, AssetWrapper<T>>
  protected _resolve?(response: Response): Promise<T>

  private async _load(source: string) {
    if (!(source in this._data)) {
      const promise = fetch(resolve(config.publicPath, source)).then(this._resolve)
      this._data[source] = { promise }
    }
    const wrapper = this._data[source]
    if (wrapper.state === 1) {
      return wrapper.value
    } else if (wrapper.state === 2) {
      return
    }
    try {
      const value = await wrapper.promise
      wrapper.state = 1
      return wrapper.value = value
    } catch (error) {
      wrapper.error = error
      wrapper.state = 2
    }
  }

  async load(source: string): Promise<T>
  async load(options?: ImageOptions): Promise<T[]>
  async load(arg: any = {}): Promise<any> {
    if (typeof arg === 'string') {
      return this._load(arg)
    } else {
      Object.assign(this._map, arg)
      return Promise.all(Object.keys(arg).map(key => this._load(arg[key])))
    }
  }

  private _get(key: string) {
    if (!(key in this._map)) {
      throw new Error(`Asset ${key} has not been registered.`)
    }
    return this._data[this._map[key]]
  }

  get(...keys: string[]): T[] {
    return keys.map((key) => {
      const data = this._get(key)
      if (data.state !== 1) {
        throw new Error(`Asset ${key} has not been loaded.`)
      }
      return data.value
    })
  }

  async check(...keys: string[]): Promise<void> {
    await Promise.all(keys.map((key) => {
      return this._get(key).promise
    }))
  }
}

export type ImageOptions = Record<string, string>

export class ImageManager extends AssetManager<ImageBitmap> {
  protected async _resolve(response: Response) {
    const blob = await response.blob()
    return await createImageBitmap(blob)
  }
}

export interface AssetOptions {
  images?: ImageOptions
}

export const images = new ImageManager()

export async function loadImages(source: string): Promise<ImageBitmap>
export async function loadImages(options?: ImageOptions): Promise<ImageBitmap[]>
export async function loadImages(arg?: any): Promise<any> {
  return images.load(arg)
}

export default new class Assets {
  public images = images

  async load(options: AssetOptions = {}) {
    return Promise.all([
      this.images.load(options.images),
    ])
  }
}
