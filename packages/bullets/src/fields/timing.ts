import { BulletOptions } from '@stg/core'

export default {
  state: {
    lifeSpan: 120000,
  },
  mutate() {
    if (this.$timestamp > this.lifeSpan) {
      this.destroy()
    }
  },
} as BulletOptions
