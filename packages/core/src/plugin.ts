import * as STG from '.'

export type STG = typeof STG

export type PluginFunction<T = any> = (stg: STG, options?: T) => any

export type Plugin<T = any> = PluginFunction<T> | {
  install: PluginFunction<T>
}

export function use<T>(plugin: Plugin<T>, options?: T) {
  if (typeof plugin === 'function') {
    return plugin(STG, options)
  } else if (typeof plugin.install === 'function') {
    return plugin.install(STG, options)
  } else {
    throw new Error(`Not a valid plugin.`)
  }
}
