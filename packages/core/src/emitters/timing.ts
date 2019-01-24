import { BulletOptions } from '../bullet'

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
