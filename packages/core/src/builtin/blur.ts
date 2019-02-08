import { TaskHook } from '../updater'
import Bullet from '../bullet'

export default {
  small(tick) {
    if (tick >= 4) return 0
    return 4 - tick
  },
} as Record<string, TaskHook<Bullet, number>> 
