import { BulletOptions } from '@stg/core'

export default {
  state: {
    lifeSpan: 12000,
  },
  mutate(tick) {
    if (tick > this.lifeSpan) {
      this.destroy()
    }
  },
} as BulletOptions
