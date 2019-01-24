function isMergeable(source: any): boolean {
  if (!source || typeof source !== 'object') return false
  const stringForm = Object.prototype.toString.call(source)
	return stringForm !== '[object RegExp]' && stringForm !== '[object Date]'
}

export function clone<S extends object>(source: S): S {
  if (Array.isArray(source)) {
    return merge<[], S>([], source)
  } else {
    return merge<{}, S>({}, source)
  }
}

function mergeObject<T, S>(target: Partial<T>, source: Partial<S>): S & T {
	const destination = {} as S & T
	if (isMergeable(target)) {
		Object.keys(target).forEach((key) => {
			destination[key] = clone(target[key])
		})
	}
	Object.keys(source).forEach((key) => {
		if (!isMergeable(source[key]) || !target[key]) {
			destination[key] = clone(source[key])
		} else {
			destination[key] = merge(target[key], source[key])
		}
	})
	return destination
}

function mergeArray<S extends object>(target: S[], source: S[]): S[] {
	return target.concat(source).map(clone)
}

export default function merge<T, S>(target: Partial<T>, source: Partial<S>): S & T {
	const sourceIsArray = Array.isArray(source)
	const targetIsArray = Array.isArray(target)

	if (sourceIsArray !== targetIsArray) {
		return clone(source) as S & T
	} else if (sourceIsArray) {
		return mergeArray(target as any, source as any) as any
	} else {
		return mergeObject(target, source)
	}
}
