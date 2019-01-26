export interface LoopingOptions {
  /** minimun length of a tick */
  tickLength?: number
  /** amount of ticks used to calculate the frame rate */
  tickStorage?: number
}

export default class Looping extends EventTarget {
  /** @private current frame id */
  private _frameId: number = null
  /** @private the time when last tick started */
  private _lastFrame: number = null
  /** @private total stop time */
  private _totalStop: number = 0
  /** @private last stop time */
  private _lastStop: number = null
  /** @private recent tick lengths */
  private _recentFrames: number[] = []

  /** @readonly looping options */
  protected readonly _options: LoopingOptions = {
    tickLength: 10,
    tickStorage: 60,
  }

  constructor(options: LoopingOptions = {}) {
    super()
    Object.assign(this._options, options)
  }

  /** things to do in a updating cycle */
  public update(timestamp: number, render: boolean) {}

  /** pause */
  public pause() {
    if (!this._frameId) return
    this._lastStop = performance.now()
    cancelAnimationFrame(this._frameId)
    this._frameId = null
    this.dispatchEvent(new CustomEvent('pause'))
  }

  /** resume */
  public resume() {
    if (this._frameId) return
    if (this._lastStop) {
      const stopTime = performance.now() - this._lastStop
      this._totalStop += stopTime
      if (this._lastFrame) this._lastFrame += stopTime
    }
    this._frameId = requestAnimationFrame(t => this._render(t))
    this.dispatchEvent(new CustomEvent('resume'))
  }

  /** change status between pause and resume */
  public toggle() {
    if (this._frameId !== null) {
      this.pause()
    } else {
      this.resume()
    }
  }

  public getFrameRate() {
    if (!this._recentFrames.length) return null
    const totalTime = this._recentFrames.reduce((prev, curr) => prev + curr, 0)
    return 1000 / totalTime * this._recentFrames.length
  }

  private _render(timestamp: number) {
    // record timestamp
    const frameTime = timestamp - (this._lastFrame || 0)
    if (this._lastFrame) {
      this._recentFrames.unshift(frameTime)
      this._recentFrames = this._recentFrames.slice(0, this._options.tickStorage)
    }
    this._lastFrame = timestamp

    // perform the current frame
    if (frameTime > this._options.tickLength) {
      try {
        this.update(timestamp - this._totalStop, true)
      } catch (error) {
        console.error(error)
        this._frameId = null
        this.dispatchEvent(new CustomEvent('error', {
          detail: error,
        }))
        return
      }
    }

    // request the next frame
    this._frameId = requestAnimationFrame(t => this._render(t))
    this.dispatchEvent(new CustomEvent('update'))
  }
}
