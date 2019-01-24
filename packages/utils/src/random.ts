/** ±1 (plus minus one) */
export function pm1() {
  return Math.floor(Math.random() * 2) * 2 - 1 as 1 | -1
}

/** random real */
export function real(end: number): number
export function real(start: number, end: number): number
export function real(...args: [number, number?]): number {
  const start = args.length > 1 ? args[0] : 0
  const end = args[args.length - 1]
  return Math.random() * (end - start) + start
}

/** random integer */
export function int(end: number): number
export function int(start: number, end: number): number
export function int(...args: [number, number?]): number {
  return Math.floor(real(...args))
}

export function xTransfer(x: number, maigin: number, min: number, max: number): number {
  if (x < maigin + max) {
    return x + real(min, max)
  } else if (x > 480 - maigin - max) {
    return x - real(min, max)
  } else {
    return x + real(min, max) * pm1()
  }
}

/** random id */
export function id() {
  return Math.floor(Math.random() * (1 << 24))
}
