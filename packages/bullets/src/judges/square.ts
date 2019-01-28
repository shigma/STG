import { BulletOptions } from '@stg/core'

export default {
  mutate() {
    const player = this.$parent.$refs.player
    if (!player) return
    const judgeDist = player.judgeRadius + this.judgeRadius
    const location = this.$coord.locate(player.x, player.y)
    if (Math.abs(location.x) < judgeDist || Math.abs(location.y) < judgeDist) {
      this.hitPlayer()
    }
  }
} as BulletOptions
