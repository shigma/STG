import { PointTemplate } from '@stg/core'

export default {
  applied() {
    this.radius = 20
    this.innerRadius = 14
    this.judgeRadius = 8.5
    this.color = this.color || 'blue'
    this.innerColor = this.innerColor || 'white'
  },
  display() {
    this.fillCircle(this.getGradient(this.innerColor, this.innerRadius))
  },
} as PointTemplate
