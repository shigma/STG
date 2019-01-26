/** ±1 (plus minus one) */
export function pm1() {
  return Math.floor(Math.random() * 2) * 2 - 1 as 1 | -1
}

/**
 * random real
 * @param start start number
 * @param end end number
 * @returns a random real in the interval [start, end)
 */
export function real(end: number): number
export function real(start: number, end: number): number
export function real(...args: [number, number?]): number {
  const start = args.length > 1 ? args[0] : 0
  const end = args[args.length - 1]
  return Math.random() * (end - start) + start
}

/**
 * random integer
 * @param start start number
 * @param end end number
 * @returns a random integer in the interval [start, end)
 */
export function int(end: number): number
export function int(start: number, end: number): number
export function int(...args: [number, number?]): number {
  return Math.floor(real(...args))
}

/**
 * get random index by chance
 * @param weight weight for every index
 * @returns the selected index
 */
export function choose(...weight: number[]) {
  let total = Math.random() * weight.reduce((prev, curr) => prev + curr, 0)
  for (let index = 0; index < weight.length; index += 1) {
    total -= weight[index]
    if (total < 0) return index
  }
}

/**
 * random transfer
 * @param init initial position
 * @param start start number
 * @param end end number
 * @param min minimum transfer distance
 * @param max maximum transfer distance
 */
export function transfer(init: number, start: number, end: number, min: number, max: number): number {
  return init < start + min
    ? init + real(min, max)
    : init > end - min
    ? init - real(min, max)
    : init < start + max
    ? choose(init - start - min, max - min)
      ? init + real(min, max)
      : init - real(min, init - start - min)
    : init > end - max
    ? choose(end - init - min, max - min)
      ? init - real(min, max)
      : init + real(min, end - init - min)
    : init + real(min, max) * pm1()
}
