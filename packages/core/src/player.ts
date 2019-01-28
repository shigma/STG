import { TaskHook, MountHook } from './updater'
import { Point } from './coordinate'
import CanvasPoint from './point'

type BoolInt = 0 | 1
type ControlMode = 'keyboard' | 'mouse'
type Listener = [
  EventTarget,
  string,
  (this: Player, event: Event) => any,
  boolean | AddEventListenerOptions
]

interface KeyState extends Record<string, BoolInt> {
  ArrowUp: BoolInt
  ArrowDown: BoolInt
  ArrowLeft: BoolInt
  ArrowRight: BoolInt
  Shift: BoolInt
}

export interface PlayerOptions {
  control: ControlMode
  state?: PlayerState
  mounted?: MountHook<Player>
  mutate?: TaskHook<Player>
}

interface PlayerState {
  /** judge radius */
  judgeRadius?: number
  /** life count */
  lifeCount?: number
  /** bomb count */
  bombCount?: number
  /** high speed */
  highSpeed?: number
  /** low speed */
  lowSpeed?: number

  [key: string]: any
}

export default class Player extends CanvasPoint implements PlayerState {
  public judgeRadius: number
  public lifeCount: number
  public bombCount: number
  public highSpeed: number
  public lowSpeed: number

  /** @public the control of the player */
  public readonly control: ControlMode

  /** @private listeners */
  private _listeners: Listener[]
  /** @private mouse position */
  private _mouseState: Point
  /** @private keyboard state */
  private _keyState: KeyState

  constructor(options: PlayerOptions) {
    options = Object.assign({}, options, {
      lifeCount: 8,
      judgeRadius: 2.5,
      bombCount: 0,
      highSpeed: 5,
      lowSpeed: 2,
    })
    super(options)
    this._listeners = []
    this.control = options.control === undefined ? 'keyboard' : options.control
  }

  _mounted() {
    this.x = this.$context.canvas.width / 2
    this.y = this.$context.canvas.height / 8 * 7
    this._mountedHook.forEach(hook => hook.call(this))
    this.render()
    this.setTask(this._mutate)

    if (this.control === 'mouse') {
      this._mouseState = { x: 0, y: 0 }
      this._listen(this.$context.canvas, 'mousemove', (event: MouseEvent) => {
        this._mouseState.x = event.clientX / this.$context.canvas.offsetWidth * this.$context.canvas.width
        this._mouseState.y = event.clientY / this.$context.canvas.offsetHeight * this.$context.canvas.height
        event.preventDefault()
        event.stopPropagation()
      })
    } else if (this.control === 'keyboard') {
      this._keyState = {
        ArrowUp: 0,
        ArrowDown: 0,
        ArrowLeft: 0,
        ArrowRight: 0,
        Shift: 0,
      }
      this._listen(window, 'keydown', (event: KeyboardEvent) => {
        if (!(event.key in this._keyState)) return
        this._keyState[event.key] = 1
        event.preventDefault()
        event.stopPropagation()
      })
      this._listen(window, 'keyup', (event: KeyboardEvent) => {
        if (!(event.key in this._keyState)) return
        this._keyState[event.key] = 0
        event.preventDefault()
        event.stopPropagation()
      })
    }
  }

  private _listen(
    target: EventTarget,
    type: string,
    listener: (event: Event) => any,
    options?: boolean | AddEventListenerOptions,
  ) {
    target.addEventListener(type, listener, options)
    this._listeners.push([target, type, listener, options])
  }

  private _mutate(tick: number) {
    this._mutateHook.forEach(hook => hook.call(this, tick))

    if (this.control === 'mouse') {
      this.x = this._mouseState.x
      this.y = this._mouseState.y
    } else if (this.control === 'keyboard') {
      const v = (this._keyState.Shift ? this.lowSpeed : this.highSpeed) / Math.sqrt(
        (this._keyState.ArrowDown ^ this._keyState.ArrowUp) +
        (this._keyState.ArrowLeft ^ this._keyState.ArrowRight) || 1
      )
      this.x += v * this._keyState.ArrowRight
      this.x -= v * this._keyState.ArrowLeft
      this.y += v * this._keyState.ArrowDown
      this.y -= v * this._keyState.ArrowUp
      
      if (this.x < 0) this.x = 0
      if (this.y < 0) this.y = 0
      if (this.x > this.$context.canvas.width) this.x = this.$context.canvas.width
      if (this.y > this.$context.canvas.height) this.y = this.$context.canvas.height
    }
  }

  render() {
    const gradient = this.getGradient('white', this.radius / 2)
    this.fillCircle(gradient)
  }

  destory() {
    this._listeners.forEach(([target, type, listener, options]) => {
      target.removeEventListener(type, listener, options)
    })
  }
}
