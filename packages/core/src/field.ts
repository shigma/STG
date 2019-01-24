import Barrage, { BarrageOptions } from './barrage'
import Player, { PlayerOptions } from './player'

interface FieldOptions {
  showFrameRate?: boolean
}

export default class Field extends EventTarget {
  static MIN_FRAME = 10

  private _frameId: number = null
  private _frameTime: number = 0
  private _frameCount: number = 0
  private _stopTime: number = 0
  private _lastTime: number = null

  public showFrameRate: boolean
  public canvas: HTMLCanvasElement
  public context: CanvasRenderingContext2D
  public barrage: Barrage
  public player: Player
  public error: Error
  public bgColor = 'black'

  constructor(canvas: HTMLCanvasElement, options: FieldOptions = {}) {
    super()
    this.showFrameRate = options.showFrameRate
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.context.fillStyle = this.bgColor
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    window.addEventListener('keydown', (event) => {
      if (!this.player) return
      this.player.keyState[event.key] = 1
    })
    window.addEventListener('keyup', (event) => {
      if (!this.player) return
      this.player.keyState[event.key] = 0
    })
  }

  setPlayer(options: PlayerOptions) {
    this.player = new Player(options).initialize(this.context)
  }

  setBarrage(options: BarrageOptions) {
    this.barrage = new Barrage(options).initialize(this.context)
    this.barrage.$refs.player = this.player
  }

  resetBarrage() {
    this.barrage = null
    this.error = null
    if (this._frameId !== null) this.pause()
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.player.initialize(this.context)
  }

  pause() {
    this._lastTime = performance.now()
    cancelAnimationFrame(this._frameId)
    this._frameId = null
    this.dispatchEvent(new CustomEvent('pause'))
  }

  resume() {
    this._stopTime += performance.now() - this._lastTime
    this._frameId = requestAnimationFrame(this.update)
    this.dispatchEvent(new CustomEvent('resume'))
  }

  update(timestamp: number) {
    if (timestamp - this._frameTime > Field.MIN_FRAME) {
      this.context.fillStyle = this.bgColor
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
      try {
        this.barrage.update(timestamp - this._stopTime)
        this.player.update(timestamp - this._stopTime)
      } catch (error) {
        console.error(error)
        this.error = error
      }
      this.context.strokeStyle = 'green'
      this.context.strokeText(String(this.frameRate), 0, 0)
      this._frameCount += 1
      this._frameTime = timestamp
    }
    if (!this.error) {
      this._frameId = requestAnimationFrame(timestamp => this.update(timestamp))
    } else {
      this._frameId = null
      this.dispatchEvent(new CustomEvent('stop'))
    }
  }

  toggle() {
    if (this._frameId !== null) {
      this.pause()
    } else {
      this._stopTime += performance.now() - this._lastTime
      this._frameId = requestAnimationFrame(timestamp => this.update(timestamp))
    }
  }

  get frameRate() {
    if (this._frameCount) {
      return Math.round(1000 / (this._frameTime - this._stopTime) * this._frameCount)
    } else {
      return Math.round(1000 / Field.MIN_FRAME)
    }
  }
}
