import { BulletOptions } from '@stg/core'

export default {
  mutate() {
    const { x, y } = this.$coord
    const { width, height } = this.$context.canvas
    if (y < 0 || y > height || x < 0 || x > width) {
      this.destroy()
    }
  }
} as BulletOptions
