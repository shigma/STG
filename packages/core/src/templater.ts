import deepmerge from 'deepmerge'

export type Extension<T extends Extensible<T>> = string | string[] | T | T[]

export interface Extensible<T> extends Record<string, any> {
	extends?: Extension<T>
}

export interface MergeOptions {
	hookProperties?: string[]
}

export default class Templater<T extends Extensible<T>> {
	private templates: Record<string, T> = {}
	private options: MergeOptions = {}

	constructor(options: MergeOptions = {}) {
		Object.assign(this.options, options)
	}

	install(templates: Record<string, T>): void
  install(name: string, options: T): void
  install(...args: any) {
    if (typeof args[0] === 'string') {
      this.templates[args[0]] = args[1]
    } else if (typeof args[0] === 'object') {
      Object.assign(this.templates, args[0])
    }
	}
	
	resolve(template: Extension<T>): T {
    if (Array.isArray(template)) {
      return deepmerge.all<T>((<any>template).map((t: string | T) => this.resolve(t)))
    } else if (typeof template === 'string') {
      if (template in this.templates) {
        return this.resolve(this.templates[template])
      } else {
        throw new Error(`Template ${template} was not registered.`)
      }
    } else {
			if (template.extends) {
				template = deepmerge<T>(this.resolve(template.extends), template)
				delete template.extends
			}
			for (const key of this.options.hookProperties) {
				if (template[key] !== undefined && !Array.isArray(template[key])) {
					template[key] = [template[key]]
				}
			}
      return template
    }
  }
}
