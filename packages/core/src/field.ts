import Looping, { LoopingOptions, LoopingStatus } from './looping'
import Barrage, { BarrageOptions } from './barrage'
import Player, { PlayerOptions } from './player'

export interface FieldOptions {
  useWorker?: boolean
  background?: string
  height?: number
  width?: number
  looping?: LoopingOptions
  frameRate?: null | {
    padding?: number
    paddingX?: number
    paddingY?: number
    fontSize?: number
    fontColor?: string
    fontFamily?: string
    refreshInterval?: number
    format?(stat: LoopingStatus): string
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
  readonly _options: FieldOptions = {
    width: 480,
    height: 560,
    background: 'black',
    frameRate: {
      paddingX: 6,
      paddingY: 4,
      fontSize: 16,
      fontColor: 'white',
      fontFamily: 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial',
      refreshInterval: 50,
      format({ tickRate, dropRate }) {
        return `Tick Rate: ${tickRate.toFixed(1)}, Drop Rate: ${Math.floor(dropRate * 100)}%`
      },
    },
  }

  constructor(element: HTMLElement, options: FieldOptions = {}) {
    super(options.looping)
    const { frameRate } = options
    if (frameRate) {
      frameRate.paddingX = frameRate.paddingX || frameRate.padding
      frameRate.paddingY = frameRate.paddingY || frameRate.padding
    }
    Object.assign(this._options, options)

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

  setBarrage(barrage: BarrageOptions | Barrage) {
    if (!('__STG__' in barrage)) {
      barrage = new Barrage(barrage as BarrageOptions)
    }
    this.barrage = barrage.initialize(this.context)
    this.barrage.$refs.player = this.player
  }

  resetBarrage() {
    this.barrage = null
    this.pause()
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.player.initialize(this.context)
  }

  update() {
    this.barrage.update()
    this.player.update()
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.barrage.render()
    this.player.render()
    this.updateFrameRate()
  }

  private updateFrameRate() {
    const option = this._options.frameRate
    if (!option) return

    let caption: string
    const time = performance.now()
    if (time - this._lastModifyFrameRateTime < option.refreshInterval) {
      caption = this._currentFrameRateCaption
    } else {
      const stat = this.getStatus()
      if (!stat) return
      caption = this._currentFrameRateCaption = option.format(stat)
      this._lastModifyFrameRateTime = time
    }

    this.context.textAlign = 'right'
    this.context.textBaseline = 'bottom'
    this.context.fillStyle = option.fontColor
    this.context.font = `${option.fontSize}px ${option.fontFamily}`
    this.context.fillText(
      caption,
      this._options.width - option.paddingX,
      this._options.height - option.paddingY,
    )
  }
}
