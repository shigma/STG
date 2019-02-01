import Scene, { SceneOptions } from './scene'

export interface FieldOptions extends SceneOptions {
  useWorker?: boolean
  background?: string
  height?: number
  width?: number
}

export default class Field extends Scene {
  public readonly element: HTMLElement

  constructor(element: HTMLElement, options: FieldOptions = {}) {
    const canvas = element.appendChild(document.createElement('canvas'))
    canvas.height = options.height || 560
    canvas.width = options.width || 480
    super(canvas, options)

    this.element = element
    element.classList.add('stg-field')
    element.style.background = options.background
  }
}
