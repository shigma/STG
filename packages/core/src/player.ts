import CanvasPoint, { PointOptions } from './point'

type BoolInt = 0 | 1

interface KeyState extends Record<string, BoolInt> {
  ArrowUp: BoolInt
  ArrowDown: BoolInt
  ArrowLeft: BoolInt
  ArrowRight: BoolInt
  Shift: BoolInt
}

export interface PlayerOptions extends PointOptions {}

export default class Player extends CanvasPoint {
  /** @public judge radius */
  public judgeR: number
  /** @public life count */
  public lifeCount: number
  /** @public bomb count */
  public bombCount: number
  /** @public moving velocity */
  public velocity: number
  /** @public whether the point is player */
  public isPlayer = true
  /** @public keyboard state */
  public keyState: KeyState = {
    ArrowUp: 0,
    ArrowDown: 0,
    ArrowLeft: 0,
    ArrowRight: 0,
    Shift: 0,
  }

  constructor(options: PlayerOptions) {
    super(options)
  }

  _mounted() {
    this.x = this.$context.canvas.width / 2
    this.y = this.$context.canvas.height / 8 * 7
    this._display()
    this.setTask(() => this._mutate())
  }

  private _mutate() {
    const speed = this.velocity / Math.sqrt(
      (this.keyState.ArrowDown ^ this.keyState.ArrowUp) +
      (this.keyState.ArrowLeft ^ this.keyState.ArrowRight) || 1
    ) / (this.keyState.Shift ? 3 : 1)

    this.x += speed * this.keyState.ArrowRight
    this.x -= speed * this.keyState.ArrowLeft
    this.y += speed * this.keyState.ArrowDown
    this.y -= speed * this.keyState.ArrowUp
    
    if (this.x < 0) this.x = 0
    if (this.y < 0) this.y = 0
    if (this.x > this.$context.canvas.width) this.x = this.$context.canvas.width
    if (this.y > this.$context.canvas.height) this.y = this.$context.canvas.height

    this._display()
  }

  private _display() {
    const gradient = this.getGradient('white', this.radius / 2)
    this.fillCircle(gradient)
  }
}
