import { BulletOptions } from '@stg/core'

export default {
  mutate() {
    const player = this.$parent.$refs.player
    if (this.$coord.dist2(player) < player.judgeR ** 2 + this.judgeR ** 2) {
      this.hitPlayer()
    }
  }
} as BulletOptions
