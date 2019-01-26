export interface LoopingOptions {
  /** minimun length of a tick */
  tickRate?: number
  /** amount of ticks used to calculate the frame rate */
  tickStorage?: number
  /** maximum tick interpolation at one frame */
  maxInterpolation?: number
}

export interface LoopingStatus {
  tickRate: number
  dropRate: number
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
  private _recentData: {
    ticks: number,
    time: number,
  }[] = []
  /** @private total updating time */
  private _timeLine: number = null
  /** @private total updating time */
  private _tickLength: number
  /** @private amount of ticks used to calculate the frame rate */
  private _tickStorage: number
  /** @private maximum tick interpolation at one frame */
  private _maxInterpolation: number

  constructor(options: LoopingOptions = {}) {
    super()
    this._tickStorage = options.tickStorage || 60
    this._maxInterpolation = options.maxInterpolation || 5
    this._tickLength = 1000 / (options.tickRate || 60)
  }

  public update() {}
  public render() {}

  /** pause */
  public pause(slient = false) {
    if (!this._frameId) return
    this._lastStop = performance.now()
    cancelAnimationFrame(this._frameId)
    this._frameId = null
    if (!slient) this.dispatchEvent(new CustomEvent('pause'))
  }

  /** resume */
  public resume(slient = false) {
    if (this._frameId) return
    if (this._lastStop) {
      const stopTime = performance.now() - this._lastStop
      this._totalStop += stopTime
      if (this._lastFrame) this._lastFrame += stopTime
    }
    this._frameId = requestAnimationFrame(t => this._render(t))
    if (!slient) this.dispatchEvent(new CustomEvent('resume'))
  }

  /** change status between pause and resume */
  public toggle(slient = false) {
    if (this._frameId !== null) {
      this.pause(slient)
    } else {
      this.resume(slient)
    }
  }

  public getStatus(): LoopingStatus {
    if (!this._recentData.length) return null
    let time = 0, ticks = 0
    this._recentData.forEach((data) => {
      time += data.time
      ticks += data.ticks
    })
    return {
      dropRate: Math.max(1 - this._tickLength / time * this._recentData.length, 0),
      tickRate: 1000 / time * ticks,
    }
  }

  private _render(timestamp: number) {
    // calculate tick numbers
    const lifeTime = timestamp - this._totalStop
    let ticks = Math.round((lifeTime - this._timeLine) / this._tickLength)
    if (ticks > this._maxInterpolation) {
      ticks = this._maxInterpolation
      this._timeLine = timestamp - this._totalStop
    } else {
      this._timeLine += ticks * this._tickLength
    }

    // record current frame data
    const time = timestamp - (this._lastFrame || 0)
    if (this._lastFrame) {
      this._recentData.unshift({ time, ticks })
      this._recentData = this._recentData.slice(0, this._tickStorage)
    }
    this._lastFrame = timestamp

    // perform the current frame
    try {
      for (let index = 0; index < ticks; index += 1) {
        this.update()
      }
      if (ticks) this.render()
    } catch (error) {
      console.error(error)
      this.pause(true)
      this.dispatchEvent(new CustomEvent('error', {
        detail: error,
      }))
      return
    }

    // request the next frame
    this._frameId = requestAnimationFrame(t => this._render(t))
    this.dispatchEvent(new CustomEvent('update'))
  }
}
