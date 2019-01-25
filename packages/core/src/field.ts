import Looping, { LoopingOptions } from './looping'
import Barrage, { BarrageOptions } from './barrage'
import Player, { PlayerOptions } from './player'

export interface FieldOptions extends LoopingOptions {
  background?: string
  height?: number
  width?: number
  frameRate?: null | {
    padding?: number
    fontSize?: number
    fontColor?: string
    fontFamily?: string
    refreshInterval?: number
    format?(n: number): string
  }
}

export default class Field extends Looping {
  public readonly element: HTMLElement
  public readonly canvas: HTMLCanvasElement
  public readonly context: CanvasRenderingContext2D

  public barrage: Barrage
  public player: Player

  private _currentFrameRateCaption: string
  private _lastModifyFrameRateTime: number

  /** field options */
  protected readonly _options: FieldOptions = {
    // looping options
    tickLength: 10,
    tickStorage: 60,

    width: 480,
    height: 560,
    background: 'black',
    frameRate: {
      padding: 4,
      fontSize: 16,
      fontColor: 'white',
      fontFamily: 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial',
      refreshInterval: 50,
      format: n => n.toFixed(1),
    },
  }

  constructor(element: HTMLElement, options: FieldOptions = {}) {
    super(options)

    this.element = element
    element.classList.add('stg-field')
    element.style.background = this._options.background

    this.canvas = element.appendChild(document.createElement('canvas'))
    this.canvas.height = this._options.height
    this.canvas.width = this._options.width
    this.context = this.canvas.getContext('2d')

    addEventListener('keydown', (event) => {
      if (!this.player) return
      this.player.keyState[event.key] = 1
    })
    addEventListener('keyup', (event) => {
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
    this.pause()
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.player.initialize(this.context)
  }

  update(timestamp: number) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.barrage.update(timestamp)
    this.player.update(timestamp)
    this.updateFrameRate(timestamp)
  }

  private updateFrameRate(time: number) {
    const option = this._options.frameRate
    if (!option) return

    let caption: string
    if (time - this._lastModifyFrameRateTime < option.refreshInterval) {
      caption = this._currentFrameRateCaption
    } else {
      const frameRate = this.getFrameRate()
      if (!frameRate) return
      caption = this._currentFrameRateCaption = option.format(frameRate)
      this._lastModifyFrameRateTime = time
    }

    this.context.textAlign = 'right'
    this.context.textBaseline = 'bottom'
    this.context.fillStyle = option.fontColor
    this.context.font = `${option.fontSize}px ${option.fontFamily}`
    this.context.fillText(
      caption,
      this._options.width - option.padding,
      this._options.height - option.padding,
    )
  }
}
