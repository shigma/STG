import Looping, { LoopingOptions } from './looping'
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

export interface SceneOptions extends LoopingOptions {
  title?: string
  player?: PlayerOptions
  barrage?: BarrageOptions
  titleStyle?: TextOptions
}

export default class Scene extends Looping {
  public readonly context: CanvasRenderingContext2D

  public barrage: Barrage
  public player: Player
  public title: string
  private titleStyle: TextOptions

  constructor(public readonly canvas: HTMLCanvasElement, options: SceneOptions = {}) {
    super(options)
    this.title = options.title || ''
    this.context = canvas.getContext('2d')
    this.setTitleStyle(options.titleStyle)
    this.setPlayer(options.player)
    this.setBarrage(options.barrage)
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
    this.pause()
    this.clearScreen()
    this.barrage = new Barrage(barrage).initialize(this.context)
    if (this.player) this.barrage.$refs.player = this.player
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  clear() {
    this.pause()
    this.removePlayer()
    this.clearScreen()
    this.barrage = null
  }

  update() {
    if (this.barrage) this.barrage.update()
    if (this.player) this.player.update()
  }

  render() {
    this.clearScreen()
    if (this.barrage) this.barrage.render()
    if (this.player) this.player.render()
    this.showTitle()
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
}
