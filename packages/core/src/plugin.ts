import * as stg from '.'

export type STG = typeof stg

export type Wrapped<T, S extends any[] = []> = T | ((...args: S) => T)

export type PluginFunction<T = any> = (stg: STG, options?: T) => any

export type Plugin<T = any> = PluginFunction<T> | {
  install: PluginFunction<T>
}

const installedPlugin = new Set<PluginFunction>()

export function use<T>(plugin: Plugin<T>, options?: T, once = true) {
  let install: PluginFunction
  if (typeof plugin === 'function') {
    install = plugin
  } else if (plugin && typeof plugin.install === 'function') {
    install = plugin.install
  } else {
    throw new TypeError(`Not a valid plugin. A plugin should be a function or an object with an "install" method.`)
  }
  if (installedPlugin.has(install)) return
  const result = install(stg, options)
  if (once) installedPlugin.add(install)
  return result
}
