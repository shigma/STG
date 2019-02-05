import Bullet from '../bullet'

export type BulletField = (this: Bullet, tick: number) => boolean

export default {
  distant() {
    const { width, height } = this.$context.canvas
    return this.x ** 2 + this.y ** 2 > width ** 2 + height ** 2
  },
  timing(tick) {
    return tick > (this['lifeSpan'] || 12000)
  },
  viewport() {
    const { x, y } = this.$coord
    const { width, height } = this.$context.canvas
    const border = this['fieldBorder'] || 10
    return y < -border || y > height + border || x < -border || x > width + border
  },
} as Record<string, BulletField> 
