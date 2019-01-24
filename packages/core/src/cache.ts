const CACHE_SIZE = 1024

interface CachedData<V> {
  index: number
  value: V
}

// Normalize function arguments
function normalize(args: any[]) {
  let index = args.length - 1
  let id = String(args[index])
  while (--index >= 0) {
    id += '\u0001' + args[index]
  }
  return id
}

export default function memorize<T extends (...args: any[]) => any>(func: T) {
  let base = 1
  let size = 0
  let index = 0
  const queue = {} as Record<number, string>
  const map = {} as Record<string, CachedData<ReturnType<T>>>

  function deleteIndex(index: number) {
    delete queue[index]
    if (index !== base) return
    while (!queue.hasOwnProperty(++base)) continue
  }

  return ((...args: any[]) => {
    const id = normalize(args.slice(0, func.length))
    const oldData = map[id]
    const newIndex = ++index
    queue[newIndex] = id
    if (oldData) {
      // Cached data is found
      deleteIndex(oldData.index)
      oldData.index = newIndex
      return oldData.value
    } else {
      // Store uncached data
      const value = func(...args)
      map[id] = { index: newIndex, value }
      size += 1
      if (size <= CACHE_SIZE) return value

      // Cache overflow, remove least recently used data
      delete map[queue[base]]
      size -= 1
      deleteIndex(base)
      return value
    }
  }) as T
}
