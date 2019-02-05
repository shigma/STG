import { BulletTemplate } from '@stg/core'

export default {
  applied() {
    this.radius = 6
    this.innerRadius = 4
    this.judgeRadius = 4
    this.color = this.color || 'blue'
    this.innerColor = this.innerColor || 'white'
  },
  display() {
    this.fillCircle(this.getGradient(this.innerColor, this.innerRadius))
  },
} as BulletTemplate
