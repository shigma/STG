import { BulletOptions } from '@stg/core'

export default {
  mutate() {
    const player = this.$parent.$refs.player
    if (!player) return
    const judgeDist = player.judgeRadius + this.judgeRadius
    if (this.$coord.dist2(player) < judgeDist ** 2) {
      this.hitPlayer()
    }
  }
} as BulletOptions
