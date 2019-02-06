import * as STG from '.'

export type PluginFunction = (stg: typeof STG) => void

export type STGPlugin = PluginFunction | {
  install: PluginFunction
}

export function use(plugin: STGPlugin) {
  if (typeof plugin === 'function') {
    plugin(STG)
  } else if (typeof plugin.install === 'function') {
    plugin.install(STG)
  } else {
    throw new Error(`Not a valid plugin.`)
  }
}
