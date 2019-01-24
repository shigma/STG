import { BulletOptions } from '../bullet'

export default {
  state: {
    fieldSize: 1e3,
  },
  mutate() {
    if (this.$refs.src.dist2(this.$coord) > this.fieldSize ** 2) {
      this.destroy()
    }
  },
} as BulletOptions
