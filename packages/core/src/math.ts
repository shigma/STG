import memorize from './cache'

export default Object.assign({}, Math, {
  twoPi: Math.PI * 2,
  halfPi: Math.PI / 2,

  sqrt: memorize(Math.sqrt),
  cbrt: memorize(Math.cbrt),

  exp: memorize(Math.exp),
  log: memorize(Math.log),
  log2: memorize(Math.log2),
  log10: memorize(Math.log10),

  sin: memorize(Math.sin),
  cos: memorize(Math.cos),
  tan: memorize(Math.tan),
  sinh: memorize(Math.sinh),
  cosh: memorize(Math.cosh),
  tanh: memorize(Math.tanh),

  asin: memorize(Math.asin),
  acos: memorize(Math.acos),
  atan: memorize(Math.atan),
  atan2: memorize(Math.atan2),
  asinh: memorize(Math.asinh),
  acosh: memorize(Math.acosh),
  atanh: memorize(Math.atanh),
})
