import { BulletOptions } from '@stg/core'

export default {
  mutate() {
    const player = this.$parent.$refs.player
    const judgeDist = player.judgeR + this.judgeR
    const location = this.$coord.locate(player.x, player.y)
    if (Math.abs(location.x) < judgeDist || Math.abs(location.y) < judgeDist) {
      this.hitPlayer()
    }
  }
} as BulletOptions
