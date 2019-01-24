/** a general point in Cartesian coordinate system */
export interface Point {
  /** x coordinate */
  x: number
  /** y coordinate */
  y: number
  /** polar radius */
  rho?: number
  /** polar angle (in the unit of π) */
  theta?: number
  /** point orientation (in the unit of π) */
  face?: number
}

/** a sub coordinate system in Cartesian coordinate system */
export default class Coordinate implements Point {
  public x: number
  public y: number
  public $birth?: number

  private _cos: number
  private _sin: number
  private _rho: number
  private _face: number
  private _theta: number
  
  constructor(x: number, y: number, face?: number) {
    this.x = x
    this.y = y
    this.face = face
  }

  get face(): number {
    return this._face
  }

  set face(value) {
    this._face = value || 0
    this._cos = Math.cos(Math.PI * value || 0)
    this._sin = Math.sin(Math.PI * value || 0)
  }

  get rho(): number {
    if (this._rho) return this._rho
    return this._rho = Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  get theta(): number {
    if (this._theta) return this._theta
    return this._theta = Math.atan2(this.y, this.x)
  }

  dist2(point: Point): number {
    return (this.x - point.x) ** 2 + (this.y - point.y) ** 2
  }

  resolve(x: number, y: number, face?: number): Coordinate {
    return new Coordinate(
      this.x + x * this._cos - y * this._sin,
      this.y + x * this._sin + y * this._cos,
      this.face + face,
    )
  }

  locate(x: number, y: number, face?: number): Coordinate {
    const dx = x - this.x, dy = y - this.y
    return new Coordinate(
      dx * this._cos + dy * this._sin,
      dy * this._cos - dx * this._sin,
      face - this.face,
    )
  }
}
