import Bullet from '../bullet'
import CanvasPoint from '../point'

export type BulletJudge = (this: Bullet, target: CanvasPoint) => boolean

export default {
  ortho(target) {
    return this.$coord.dist2(target) < target.judgeRadius ** 2 + this.judgeRadius ** 2
  },
  square(target) {
    const judgeDist = target.judgeRadius + this.judgeRadius
    const location = this.$coord.locate(target.x, target.y)
    return Math.abs(location.x) < judgeDist || Math.abs(location.y) < judgeDist
  },
  viewport(target) {
    const judgeDist = target.judgeRadius + this.judgeRadius
    return this.$coord.dist2(target) < judgeDist ** 2
  },
} as Record<string, BulletJudge> 
