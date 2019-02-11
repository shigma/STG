import memorize from './memorize'
import config from './config'

type MathExtension = typeof Math & {
  twoPI: number
  halfPI: number
  sec(x: number): number
  csc(x: number): number
  cot(x: number): number
  ge(x: number, y: number): boolean
  le(x: number, y: number): boolean
  gt(x: number, y: number): boolean
  lt(x: number, y: number): boolean
  eq(x: number, y: number): boolean
  neq(x: number, y: number): boolean
}

const math = {} as MathExtension

// constants
Object.defineProperty(math, 'twoPI', { value: Math.PI * 2 })
Object.defineProperty(math, 'halfPI', { value: Math.PI / 2 })

// some trigonometric functions
Object.defineProperty(math, 'csc', { value: (x: number) => 1 / math.sin(x) })
Object.defineProperty(math, 'sec', { value: (x: number) => 1 / math.cos(x) })
Object.defineProperty(math, 'cot', { value: (x: number) => 1 / math.tan(x) })

// arithmetic comparison
Object.defineProperty(math, 'ge', { value: (x: number, y: number) => x >= y - config.minValue })
Object.defineProperty(math, 'le', { value: (x: number, y: number) => y >= x - config.minValue })
Object.defineProperty(math, 'gt', { value: (x: number, y: number) => x > y + config.minValue })
Object.defineProperty(math, 'lt', { value: (x: number, y: number) => y > x + config.minValue })
Object.defineProperty(math, 'eq', { value: (x: number, y: number) => Math.abs(x - y) <= config.minValue })
Object.defineProperty(math, 'neq', { value: (x: number, y: number) => Math.abs(x - y) > config.minValue })
Object.defineProperty(math, 'sign', {
  value(x: number) {
    if (x > config.minValue) return 1
    if (x < -config.minValue) return -1
    return 0
  }
})

const specialMethods = ['sin', 'cos', 'tan', 'sign']
const cachedMethods = [
  'sqrt', 'cbrt', 'exp',
  'log', 'log2', 'log10',
  'asin', 'acos', 'atan',
  'sinh', 'cosh', 'tanh',
  'asinh', 'acosh', 'atanh',
]

Object.getOwnPropertyNames(Math).forEach((key: keyof Math) => {
  if (specialMethods.includes(key)) return
  Object.defineProperty(math, key, {
    value: cachedMethods.includes(key)
      ? memorize(Math[key] as (...args: any[]) => any)
      : Math[key]
  })
})

// periodic functions have their special normalizer
const periodize = (period: number) => ([arg]: [number]) => (arg % period).toFixed(6)

Object.defineProperty(math, 'sin', {
  value: memorize(Math.sin, periodize(math.twoPI)),
})
Object.defineProperty(math, 'cos', {
  value: memorize(Math.cos, periodize(math.twoPI)),
})
Object.defineProperty(math, 'tan', {
  value: memorize(Math.tan, periodize(math.PI)),
})

export default math
