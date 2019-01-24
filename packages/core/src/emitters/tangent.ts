import { BulletOptions } from '../bullet'

export default {
  mutate() {
    const player = this.$parent.$refs.player
    const judgeDist = player.judgeR + this.judgeR
    if (this.$coord.dist2(player) < judgeDist ** 2) {
      this.hitPlayer()
    }
  }
} as BulletOptions
