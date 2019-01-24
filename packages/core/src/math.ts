import memorize from './cache'

export const twoPi = Math.PI * 2
export const halfPi = Math.PI / 2

export const sqrt = memorize(Math.sqrt)
export const cbrt = memorize(Math.cbrt)

export const exp = memorize(Math.exp)
export const log = memorize(Math.log)
export const log2 = memorize(Math.log2)
export const log10 = memorize(Math.log10)

export const sin = memorize(Math.sin)
export const cos = memorize(Math.cos)
export const tan = memorize(Math.tan)
export const sinh = memorize(Math.sinh)
export const cosh = memorize(Math.cosh)
export const tanh = memorize(Math.tanh)

export const asin = memorize(Math.asin)
export const acos = memorize(Math.acos)
export const atan = memorize(Math.atan)
export const atan2 = memorize(Math.atan2)
export const asinh = memorize(Math.asinh)
export const acosh = memorize(Math.acosh)
export const atanh = memorize(Math.atanh)