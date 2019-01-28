/** hook function for interval tasks of an updater */
export type IntervalHook<T extends Updater> = (this: T, tick: number, wave: number) => void
/** hook function for general tasks of an updater */
export type TaskHook<T extends Updater> = (this: T, tick: number) => void
/** hook function for mounting tasks of an updater */
export type MountHook<T extends Updater> = (this: T) => void

interface UpdaterProperties {
  /** store all scheduled hooks */
  tasks: {
    callback: TaskHook<Updater>
    preserve: boolean
    id: number
  }[]
  /** current task index */
  currentTask: number
  /** a list for tasks to remove */
  tasksToRemove: Set<number>
  /** store the last task index */
  taskIndex: 0
}

/** general updating object */
export default class Updater {
  /** @static maximum number of scheduled tasks */
  static scheduleLimit = 256

  /** @private updater properties */
  private __updater__: UpdaterProperties
  /** @private mounted hook */
  public _mounted?(): void

  /** @public rendering context */
  public $context: CanvasRenderingContext2D
  /** @public the current tick number */
  public $tick = 0
  /** @public parrent node */
  public $parent: Updater

  // inherit from state, methods and so on
  [K: string]: any

  constructor() {
    Object.defineProperty(this, '__updater__', {
      value: {
        tasks: [],
        currentTask: null,
        tasksToRemove: new Set<number>(),
        taskIndex: 0,
      }
    })
  }

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
    const updater = this.__updater__

    // remove all the finished tasks
    updater.tasks = updater.tasks.filter(task => {
      return !updater.tasksToRemove.has(task.id)
    })
    
    // store all the tasks to prevent modification from task callbacks
    const tasks = updater.tasks

    // clear the set of tasks to remove
    updater.tasksToRemove.clear()

    // execute all the tasks in sequence
    tasks.forEach((hook) => {
      updater.currentTask = hook.id
      hook.callback.call(this, this.$tick)
      if (!hook.preserve) {
        // if not preserved, remove the task after executed
        updater.tasksToRemove.add(hook.id)
      }
    })

    // check the amount of scheduled tasks for performance
    if (updater.tasks.length > Updater.scheduleLimit) {
      throw new Error(`The amount of scheduled tasks (${updater.tasks.length}) is beyond the limit!`)
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
    const id = ++ this.__updater__.taskIndex
    this.__updater__.tasks.splice(index, 0, { callback, preserve, id })
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
  removeTask(id = this.__updater__.currentTask) {
    if (!id) return
    this.__updater__.tasksToRemove.add(id)
  }
}
