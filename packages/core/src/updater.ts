type UpdateStatus = 'schedule' | 'mutation' | 'display'

type ScheduleHook<T extends Updater> = (this: T, ...args: any[]) => boolean | void
type TimeoutHook<T extends Updater> = (this: T, time: number, delta: number) => void
type IntervalHook<T extends Updater> = (this: T, time: number, delta: number, wave: number) => void
export type UpdateHook<T extends Updater> = (this: T, time: number, delta: number) => void
export type CreateHook<T extends Updater> = (this: T) => void

interface ScheduleWrapper<T extends Updater> {
  callback: ScheduleHook<T>
  finished?: boolean
  id: number
}

/** general updating object */
export default class Updater {
  /** @static maximum number of schedule tasks */
  static scheduleLimit = 256

  /** @private store all schedule hooks */
  private _schedules: ScheduleWrapper<this>[] = []
  /** @private store the last schedule index */
  private _taskCounter = 0
  /** @private created hook */
  public _created?(): void
  /** @private mutation hook */
  public _mutate?(time: number, delta: number): void
  /** @private display hook */
  public _display?(time: number, delta: number): void

  /** @public rendering context */
  public $context: CanvasRenderingContext2D
  /** @public current stage in a update cycle */
  public $status: UpdateStatus
  /** @public the time when the instance was created */
  public $birth: number
  /** @public the timestamp in the previous update cycle */
  public $timeline = -1
  /** @public the timestamp in the current update cycle */
  public $timestamp = 0
  /** @public the time difference between `$timestamp` and `$timeline` */
  public $deltaTime: number
  /** @public parrent node */
  public $parent: Updater

  /** inherit from state */
  [K: string]: any

  /** initialization */
  initialize(context?: CanvasRenderingContext2D, parent?: Updater): this {
    this.$context = context
    this.$parent = parent
    if (this._created) this._created()
    return this
  }

  /** perform an update cycle */
  update(time: number): void {
    // Step 1: update timestamp
    // set its birth time during the first update cycle
    if (typeof this.$birth !== 'number') this.$birth = time
    time -= this.$birth
    this.$timestamp = time
    this.$deltaTime = time - this.$timeline

    // Step 2: scheduled tasks
    // `setImmediate`, `setTimeout` and `setInterval` will be executed here
    this.$status = 'schedule'
    /** store the current scheduled tasks to prevent modification from schedule hooks */
    const scedules = this._schedules
    this._schedules = []
    scedules.forEach((hook) => {
      hook.finished = hook.finished || !hook.callback.call(this, time, this.$deltaTime)
    })
    // push back previous sceduled tasks
    this._schedules.unshift(...scedules.filter(({ finished }) => !finished))

    // Step 3: mutation
    this.$status = 'mutation'
    if (this._mutate) this._mutate(time, this.$deltaTime)

    // Step 4: display
    this.$status = 'display'
    if (this._display) this._display(time, this.$deltaTime)

    // Step 5: update timeline
    this.$timeline = time
    // check the amount of scheduled tasks for performance
    if (this._schedules.length > Updater.scheduleLimit) {
      throw new Error(`Error: The amount of scheduled tasks (${this._schedules.length}) is beyond the limit!`)
    }
  }

  /**
   * set a immediate hook
   * @returns a number which indicates the task id
   **/
  setImmediate(callback: TimeoutHook<this>) {
    const id = ++ this._taskCounter
    this._schedules.push({ callback, id })
    return id
  }

  /**
   * set a timeout hook
   * @returns a number which indicates the task id
   **/
  setTimeout(timeout: number, callback: TimeoutHook<this>) {
    timeout += this.$timestamp
    return this.setImmediate(() => {
      if (this.$timeline < timeout && this.$timestamp >= timeout) {
        callback.call(this, this.$timestamp, this.$deltaTime)
      } else {
        return true
      }
    })
  }

  /**
   * set an interval hook
   * @returns a number which indicates the interval id
   */
  setInterval(interval: number, callback: IntervalHook<this>): number
  setInterval(interval: number, times: number, callback: IntervalHook<this>): number
  setInterval(interval: number, times: number, start: number, callback: IntervalHook<this>): number
  setInterval(interval: number, ...args: [any, any?, any?]) {
    const times: number = args.length > 1 ? args[0] : Infinity
    const start: number = args.length > 2 ? args[1] : 0
    const callback: IntervalHook<this> = args[args.length - 1]
    const birth = this.$timestamp + start
    return this.setImmediate(() => {
      const timestampAge = Math.floor((this.$timestamp - birth) / interval)
      const timelineAge = Math.floor((this.$timeline - birth) / interval)
      if (timestampAge > timelineAge) {
        if (timestampAge >= times) return
        callback.call(this, this.$timestamp, this.$deltaTime)
      }
      return true
    })
  }

  /**
   * remove a schedule task
   * @returns whether the provided id is found
   */
  removeTask(id: number): boolean {
    const index = this._schedules.findIndex(item => item.id === id)
    if (index === -1) return false
    if (this.$status === 'schedule') {
      this._schedules[index].finished = true
    } else {
      this._schedules.splice(index, 1)
    }
    return true
  }
}
