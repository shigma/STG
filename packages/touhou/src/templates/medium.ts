import { PointTemplate } from '@stg/core'

export default {
  applied() {
    this.radius = 14
    this.innerRadius = 8.5
    this.judgeRadius = 9
    this.color = this.color || 'blue'
    this.innerColor = this.innerColor || 'white'
  },
  display() {
    this.fillCircle(this.getGradient(this.innerColor, this.innerRadius))
  },
} as PointTemplate
