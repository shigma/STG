import { BulletOptions } from '@stg/core'

export default {
  mutate() {
    const player = this.$parent.$refs.player
    if (!player) return
    if (this.$coord.dist2(player) < player.judgeRadius ** 2 + this.judgeRadius ** 2) {
      this.hitPlayer()
    }
  }
} as BulletOptions
