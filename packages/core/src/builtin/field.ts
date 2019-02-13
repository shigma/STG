import { TaskHook } from '../updater'
import Bullet from '../bullet'

export type BulletFieldHook = TaskHook<Bullet, boolean>

export default {
  distant() {
    const { width, height } = this.$context.canvas
    const dist2 = this.$coord.dist2(this.$barrage.$refs.center)
    return dist2 > (this.fieldRadius ** 2 || width ** 2 + height ** 2)
  },
  timing(tick) {
    return tick > (this.lifeSpan || 12000)
  },
  viewport() {
    const { x, y } = this.$coord
    const { width, height } = this.$context.canvas
    const border = this.fieldBorder || 10
    return y < -border || y > height + border || x < -border || x > width + border
  },
} as Record<string, BulletFieldHook> 
