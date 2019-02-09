import memorize from './memorize'

type MathExtension = typeof Math & {
  twoPI: number
  halfPI: number
}

const math = {} as MathExtension
const cachedMethods = [
  'sqrt', 'cbrt', 'exp',
  'log', 'log2', 'log10',
  'sin', 'cos', 'tan',
  'asin', 'acos', 'atan',
  'sinh', 'cosh', 'tanh',
  'asinh', 'acosh', 'atanh',
]

Object.defineProperty(math, 'twoPI', { value: Math.PI * 2 })
Object.defineProperty(math, 'halfPI', { value: Math.PI / 2 })

Object.getOwnPropertyNames(Math).forEach((key: keyof Math) => {
  Object.defineProperty(math, key, {
    value: cachedMethods.includes(key)
      ? memorize(Math[key] as (...args: any[]) => any)
      : Math[key]
  })
})

export default math
