interface LoopingEvents {
  onPause?(this: Looping): void
  onResume?(this: Looping): void
  onStats?(this: Looping, stats?: LoopingStats): void
  onError?(this: Looping, error?: Error): void
}

interface LoopingConfig {
  /** amount of ticks used to calculate the frame rate */
  tickStorage?: number
  /** maximum tick interpolation at one frame */
  maxInterpolation?: number
  /** interval for event `stats` to trigger */
  statsInterval?: number
}

export interface LoopingOptions extends LoopingEvents, LoopingConfig {
  /** minimun length of a tick */
  tickRate?: number
  /** number of skipped frames after rendering */
  skipFrame?: number
}

export interface LoopingStats {
  /** average number of ticks in a second */
  tickRate: number
  /** average number of frames in a second */
  frameRate: number
  /** the proportion of dropped frames */
  dropRate: number
}

interface LoopingProperties extends LoopingConfig {
  options: LoopingOptions
  /** current frame id */
  frameId: number
  /** frame count */
  frameCount: number
  /** the time when last tick started */
  lastFrame: number
  /** total stop time */
  totalStop: number
  /** last stop time */
  lastStop: number
  /** recent tick lengths */
  recentData: {
    ticks: number,
    time: number,
  }[]
  /** total updating time */
  timeLine: number
  /** total updating time */
  tickLength: number
  /** reciprocal of proportion of skipped frames */
  skipRate: number
  /** preservation time for samples */
  sampleTime: number
  /** time for last modifying stats */
  lastModifyStats: number
}

function noopFunction() {}

export default class Looping implements LoopingEvents {
  /** @private looping properties */
  private __loop__: LoopingProperties

  // looping hooks
  public update?(): void
  public render?(): void
  public onPause?(this: Looping): void
  public onResume?(this: Looping): void
  public onStats?(this: Looping, stats?: LoopingStats): void
  public onError?(this: Looping, error?: Error): void

  constructor(options: LoopingOptions = {}) {
    this.initialize(options)
  }

  /** initialize */
  public initialize(options: LoopingOptions = {}) {
    // use old options as fallback
    if ('__loop__' in this) {
      options = Object.assign(this.__loop__.options, options)
    }
    // initiate `__loop__` properties
    const value = {
      options,
      frameId: null,
      frameCount: 0,
      lastFrame: null,
      totalStop: 0,
      lastStop: null,
      recentData: [],
      timeLine: null,
      lastModifyStats: 0,
      skipRate: 1 + (options.skipFrame || 0),
      tickLength: 1000 / (options.tickRate || 60),
      tickStorage: options.tickStorage || 60,
      statsInterval: options.statsInterval || Infinity,
      maxInterpolation: options.maxInterpolation || 5,
    } as LoopingProperties
    value.sampleTime = value.tickLength * value.tickStorage
    Object.defineProperty(this, '__loop__', { value })
    // set event hooks
    this.onPause = options.onPause || noopFunction
    this.onResume = options.onResume || noopFunction
    this.onStats = options.onStats || noopFunction
    this.onError = options.onError || noopFunction
    return this
  }

  /** pause */
  public pause() {
    if (!this.__loop__.frameId) return
    this.__loop__.lastStop = performance.now()
    cancelAnimationFrame(this.__loop__.frameId)
    this.__loop__.frameId = null
    this.onPause()
  }

  /** resume */
  public resume() {
    if (this.__loop__.frameId) return
    if (this.__loop__.lastStop) {
      const stopTime = performance.now() - this.__loop__.lastStop
      this.__loop__.totalStop += stopTime
      if (this.__loop__.lastFrame) this.__loop__.lastFrame += stopTime
    }
    this.__loop__.frameId = requestAnimationFrame(t => this._render(t))
    this.onResume()
  }

  /** change status between pause and resume */
  public toggle() {
    if (this.__loop__.frameId !== null) {
      this.pause()
    } else {
      this.resume()
    }
  }

  /** get current status */
  public getStatus(): LoopingStats {
    const { recentData } = this.__loop__
    if (!recentData.length) return null
    let time = 0, ticks = 0, drops = 0
    for (const data of recentData) {
      time += data.time
      ticks += data.ticks
      drops += Number(data.ticks !== 1)
    }
    return {
      tickRate: 1000 / time * ticks,
      frameRate: 1000 / time * recentData.length,
      dropRate: drops / recentData.length,
    }
  }

  private _render(timestamp: number) {
    const loop = this.__loop__

    // calculate tick numbers
    const lifeTime = timestamp - loop.totalStop
    let ticks = (lifeTime - loop.timeLine) / loop.tickLength
    if (ticks < 1) {
      ticks = Math.round(ticks)
    } else {
      ticks = Math.floor(ticks)
    }
    if (ticks > loop.maxInterpolation) {
      ticks = loop.maxInterpolation
      loop.timeLine = timestamp - loop.totalStop
    } else {
      loop.timeLine += ticks * loop.tickLength
    }

    // record current frame data
    const time = timestamp - (loop.lastFrame || 0)
    if (loop.lastFrame) {
      loop.recentData.unshift({ time, ticks })
      loop.recentData = loop.recentData.slice(0, loop.tickStorage)
    }
    loop.lastFrame = timestamp

    // perform the current frame
    try {
      for (let index = 0; index < ticks; index += 1) {
        this.update()
      }
      if (ticks) {
        if (loop.frameCount % loop.skipRate === 0) {
          this.render()
        }
        loop.frameCount += 1
      }
    } catch (error) {
      console.error(error)
      this.onError(error)
      this.pause()
      return
    }

    // request the next frame
    loop.frameId = requestAnimationFrame(t => this._render(t))
    
    // check if stats need to update
    const currentTime = performance.now()
    if (currentTime - loop.lastModifyStats < loop.statsInterval) return
    loop.lastModifyStats = currentTime
    const stats = this.getStatus()
    if (stats) this.onStats(stats)
  }
}
