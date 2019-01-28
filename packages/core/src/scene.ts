import Looping, { LoopingOptions, LoopingStatus } from './looping'
import Barrage, { BarrageOptions } from './barrage'
import Player, { PlayerOptions } from './player'

export interface TextStyle {
  fontSize?: number
  fontColor?: string
  fontFamily?: string
}

export interface TextOptions extends TextStyle {
  x?: number
  y?: number
  textAlign?: CanvasTextAlign
  textBaseline?: CanvasTextBaseline
}

interface FrameRateStyle extends TextStyle {
  refreshInterval?: number
  format?(stat: LoopingStatus): string
}

export interface SceneOptions {
  title?: string
  player?: PlayerOptions
  barrage?: BarrageOptions
  looping?: LoopingOptions
  titleStyle?: TextOptions
  frameRateStyle?: FrameRateStyle
}

export default class Scene extends Looping {
  public readonly context: CanvasRenderingContext2D

  public barrage: Barrage
  public player: Player
  public title: string

  private frameRateStyle: FrameRateStyle & TextOptions
  private titleStyle: TextOptions
  private _currentFrameRateText: string
  private _lastModifyFrameRate: number

  constructor(public readonly canvas: HTMLCanvasElement, options: SceneOptions = {}) {
    super(options.looping)
    this.title = options.title || ''
    this.context = canvas.getContext('2d')
    this.setTitleStyle(options.titleStyle)
    this.setFrameRateStyle(options.frameRateStyle)
    this.setPlayer(options.player)
    this.setBarrage(options.barrage)
  }

  setFrameRateStyle(options?: FrameRateStyle) {
    if (!options) {
      this.frameRateStyle = null
      return
    }
    const fontSize = options.fontSize || 16
    this.frameRateStyle = {
      fontSize,
      textAlign: 'right',
      textBaseline: 'bottom',
      fontColor: 'white',
      x: this.canvas.width - fontSize / 4,
      y: this.canvas.height - fontSize / 4,
      fontFamily: 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial',
      refreshInterval: 50,
      format({ tickRate, dropRate }) {
        return `Tick Rate: ${tickRate.toFixed(1)}, Drop Rate: ${Math.floor(dropRate * 100)}%`
      },
      ...options,
    }
  }

  setTitleStyle(options: TextStyle = {}) {
    const fontSize = options.fontSize || 16
    this.titleStyle = {
      fontSize,
      fontColor: 'white',
      x: this.canvas.width - fontSize,
      y: fontSize,
      textAlign: 'right',
      textBaseline: 'top',
      fontFamily: 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial',
      ...options,
    }
  }

  setPlayer(options: PlayerOptions) {
    if (!options) return
    this.removePlayer()
    this.player = new Player(options).initialize(this.context)
    if (this.barrage) this.barrage.$refs.player = this.player
  }

  removePlayer() {
    if (this.player) this.player.destory()
    if (this.barrage) delete this.barrage.$refs.player
  }

  setBarrage(barrage: BarrageOptions) {
    if (!barrage) return
    this.barrage = new Barrage(barrage).initialize(this.context)
    if (this.player) this.barrage.$refs.player = this.player
  }

  clear() {
    this.pause()
    this.removePlayer()
    this.barrage = null
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  update() {
    if (this.barrage) this.barrage.update()
    if (this.player) this.player.update()
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (this.barrage) this.barrage.render()
    if (this.player) this.player.render()
    this.showTitle()
    this.showFrameRate()
  }

  showText(text: string, options: TextOptions) {
    this.context.textAlign = options.textAlign
    this.context.textBaseline = options.textBaseline
    this.context.fillStyle = options.fontColor
    this.context.font = `${options.fontSize || 16}px ${options.fontFamily}`
    this.context.fillText(text, options.x, options.y)
  }

  private showTitle() {
    const option = this.title && this.titleStyle
    if (!option) return
    this.showText(this.title, option)
  }

  private showFrameRate() {
    const option = this.frameRateStyle
    if (!option) return

    let text: string
    const time = performance.now()
    if (time - this._lastModifyFrameRate < option.refreshInterval) {
      text = this._currentFrameRateText
    } else {
      const stat = this.getStatus()
      if (!stat) return
      text = this._currentFrameRateText = option.format(stat)
      this._lastModifyFrameRate = time
    }

    this.showText(text, option)
  }
}
