import Bullet from '../bullet'
import CanvasPoint from '../point'

export type BulletJudgeHook = (this: Bullet, target: CanvasPoint, radius: number) => boolean

export default {
  ortho(target, targetRadius = target.judgeRadius) {
    return this.$coord.dist2(target) < targetRadius ** 2 + this.judgeRadius ** 2
  },
  square(target, targetRadius = target.judgeRadius) {
    const judgeDist = targetRadius + this.judgeRadius
    const location = this.$coord.locate(target.x, target.y)
    return Math.abs(location.x) < judgeDist || Math.abs(location.y) < judgeDist
  },
  viewport(target, targetRadius = target.judgeRadius) {
    const judgeDist = targetRadius + this.judgeRadius
    return this.$coord.dist2(target) < judgeDist ** 2
  },
} as Record<string, BulletJudgeHook> 
