/** hook function for interval tasks of an updater */
export type IntervalHook<T extends Updater> = (this: T, tick: number, wave: number) => void
/** hook function for general tasks of an updater */
export type TaskHook<T extends Updater> = (this: T, tick: number) => void
/** hook function for mounting tasks of an updater */
export type MountHook<T extends Updater> = (this: T) => void

interface TaskWrapper<T extends Updater> {
  callback: TaskHook<T>
  preserve: boolean
  id: number
}

/** general updating object */
export default class Updater {
  /** @static maximum number of scheduled tasks */
  static scheduleLimit = 256

  readonly __STG__ = true

  /** @private store all scheduled hooks */
  private _tasks: TaskWrapper<this>[] = []
  /** @private current task index */
  private _currentTask: number
  /** @private a list for tasks to remove */
  private _tasksToRemove = new Set<number>()
  /** @private store the last task index */
  private _taskIndex = 0
  /** @private mounted hook */
  public _mounted?(): void

  /** @public rendering context */
  public $context: CanvasRenderingContext2D
  /** @public the tick number when the instance was created */
  public $birth: number
  /** @public the current tick number */
  public $tick = 0
  /** @public parrent node */
  public $parent: Updater

  // inherit from state, methods and so on
  [K: string]: any

  /** initialize */
  initialize(context?: CanvasRenderingContext2D, parent?: Updater): this {
    this.$context = context
    this.$parent = parent
    if (this._mounted) this._mounted()
    return this
  }

  /** perform an update cycle */
  update(): void {
    // update tick number
    this.$tick += 1

    // remove all the finished tasks
    this._tasks = this._tasks.filter(task => !this._tasksToRemove.has(task.id))
    
    // store all the tasks to prevent modification from task callbacks
    const tasks = this._tasks

    // clear the set of tasks to remove
    this._tasksToRemove.clear()

    // execute all the tasks in sequence
    tasks.forEach((hook) => {
      this._currentTask = hook.id
      hook.callback.call(this, this.$tick)
      if (!hook.preserve) {
        // if not preserved, remove the task after executed
        this._tasksToRemove.add(hook.id)
      }
    })

    // check the amount of scheduled tasks for performance
    if (this._tasks.length > Updater.scheduleLimit) {
      throw new Error(`The amount of scheduled tasks (${this._tasks.length}) is beyond the limit!`)
    }
  }

  /**
   * set a scheduled task
   * @param callback the task callback
   * @param index the position where the task will be inserted (default: `Infinity`)
   * @param preserve whether the task will be preserved after executed (default: `true`)
   * @returns a number which indicates the task id
   */
  setTask(callback: TaskHook<this>, index = Infinity, preserve = true) {
    const id = ++ this._taskIndex
    this._tasks.splice(index, 0, { callback, preserve, id })
    return id
  }

  /**
   * set a timeout task
   * @param ticks the ticks to wait before the callback
   * @param callback the task callback
   * @returns a number which indicates the task id
   */
  setTimeout(ticks: number, callback: TaskHook<this>) {
    ticks += this.$tick
    return this.setTask(() => {
      if (this.$tick <= ticks) return
      callback.call(this, this.$tick)
      this.removeTask()
    }, 0)
  }

  /**
   * set an interval task
   * @param interval the ticks to wait during every interval
   * @param times the total times for callback to execute (default: `Infinity`)
   * @param offset the offset ticks before the first interval (default: `0`)
   * @param callback the task callback
   * @returns a number which indicates the task id
   */
  setInterval(interval: number, callback: IntervalHook<this>): number
  setInterval(interval: number, times: number, callback: IntervalHook<this>): number
  setInterval(interval: number, times: number, offset: number, callback: IntervalHook<this>): number
  setInterval(interval: number, ...args: [any, any?, any?]) {
    if (interval <= 0) throw new Error(`The interval ${interval} should be positive.`)
    const times: number = args.length > 1 ? args[0] : Infinity
    const offset: number = args.length > 2 ? args[1] : 0
    const callback: IntervalHook<this> = args[args.length - 1]
    const birth = this.$tick + offset
    return this.setTask((tick) => {
      tick -= birth
      const wave = Math.floor(tick / interval)
      const rest = wave * interval - tick
      if (wave > 0 && rest >= 0 && rest < interval) {
        callback.call(this, this.$tick)
        if (wave >= times) return this.removeTask()
      }
    }, 0)
  }

  /**
   * remove a scheduled task
   * @param id task id (default: current task id)
   */
  removeTask(id = this._currentTask) {
    this._tasksToRemove.add(id)
  }
}
