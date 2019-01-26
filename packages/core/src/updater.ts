type TaskHook<T extends Updater> = (this: T, time: number, delta: number) => void
type IntervalHook<T extends Updater> = (this: T, time: number, delta: number, wave: number) => void
export type UpdateHook<T extends Updater> = (this: T, time: number, delta: number) => void
export type MountedHook<T extends Updater> = (this: T) => void

interface TaskWrapper<T extends Updater> {
  callback: TaskHook<T>
  preserve: boolean
  id: number
}

/** general updating object */
export default class Updater {
  /** @static maximum number of scheduled tasks */
  static scheduleLimit = 256

  /** @private store all scheduled hooks */
  private _tasks: TaskWrapper<this>[] = []
  /** @private current task id */
  private _currentTaskId: number
  /** @private a list for tasks to remove */
  private _tasksToRemove = new Set<number>()
  /** @private store the last task index */
  private _taskCounter = 0
  /** @private mounted hook */
  public _mounted?(): void

  /** @public rendering context */
  public $context: CanvasRenderingContext2D
  /** @public the timestamp when the instance was created */
  public $birth: number
  /** @public the current tick count */
  public $tickCount = 0
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
    if (this._mounted) this._mounted()
    return this
  }

  /** perform an update cycle */
  update(time: number): void {
    // set its birth time during the first update cycle
    if (typeof this.$birth !== 'number') this.$birth = time
    time -= this.$birth

    // update timestamp and tick count
    this.$tickCount += 1
    this.$timestamp = time
    this.$deltaTime = time - this.$timeline

    // scheduled tasks
    // `setImmediate`, `setTimeout` and `setInterval` will be executed here
    /** store the current scheduled tasks to prevent modification from scheduled hooks */
    const tasks = this._tasks.filter(({ id }) => !this._tasksToRemove.has(id))

    this._tasks = []
    this._tasksToRemove.clear()

    // execute all the tasks
    tasks.forEach((hook) => {
      this._currentTaskId = hook.id
      hook.callback.call(this, time, this.$deltaTime)
      if (!hook.preserve) this._tasksToRemove.add(hook.id)
    })

    // push back previous sceduled tasks
    this._tasks.unshift(...tasks)

    // update timeline
    this.$timeline = time

    // check the amount of scheduled tasks for performance
    if (this._tasks.length > Updater.scheduleLimit) {
      throw new Error(`Error: The amount of scheduled tasks (${this._tasks.length}) is beyond the limit!`)
    }
  }

  /**
   * set a scheduled task
   * @param callback the task callback
   * @param index the position where the task will be inserted (default: `Infinity`)
   * @param preserve whether the task will be preserved after executed (default: `true`)
   * @returns a number which indicates the task id
   **/
  setTask(callback: TaskHook<this>, index = Infinity, preserve = true) {
    const id = ++ this._taskCounter
    this._tasks.splice(index, 0, { callback, preserve, id })
    return id
  }

  /**
   * set a scheduled task
   * @returns a number which indicates the task id
   **/
  setImmediate(callback: TaskHook<this>) {
    return this.setTask(callback, 0, false)
  }

  /**
   * set a timeout task
   * @returns a number which indicates the task id
   **/
  setTimeout(timeout: number, callback: TaskHook<this>) {
    timeout += this.$timestamp
    return this.setTask(() => {
      if (this.$timeline < timeout && this.$timestamp >= timeout) {
        callback.call(this, this.$timestamp, this.$deltaTime)
        this.removeTask()
      }
    }, 0)
  }

  /**
   * set an interval task
   * @returns a number which indicates the task id
   */
  setInterval(interval: number, callback: IntervalHook<this>): number
  setInterval(interval: number, times: number, callback: IntervalHook<this>): number
  setInterval(interval: number, times: number, start: number, callback: IntervalHook<this>): number
  setInterval(interval: number, ...args: [any, any?, any?]) {
    const times: number = args.length > 1 ? args[0] : Infinity
    const start: number = args.length > 2 ? args[1] : 0
    const callback: IntervalHook<this> = args[args.length - 1]
    const birth = this.$timestamp + start
    return this.setTask(() => {
      const timestampAge = Math.floor((this.$timestamp - birth) / interval)
      const timelineAge = Math.floor((this.$timeline - birth) / interval)
      if (timestampAge > timelineAge) {
        if (timestampAge >= times) return this.removeTask()
        callback.call(this, this.$timestamp, this.$deltaTime)
      }
    }, 0)
  }

  /** remove the current task */
  removeTask(): void
  /** remove a scheduled task */
  removeTask(id: number): void
  removeTask(id = this._currentTaskId) {
    this._tasksToRemove.add(id)
  }
}
