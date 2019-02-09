import { TaskHook } from '../updater'
import Bullet from '../bullet'

export type BulletBlurHook = TaskHook<Bullet, number>

export default {
  default(tick) {
    if (tick >= 8) return 0
    return 4 - tick / 2
  },
} as Record<string, BulletBlurHook> 
