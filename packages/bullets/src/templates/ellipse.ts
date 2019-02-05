import { BulletTemplate } from '@stg/core'

export default {
  applied() {
    this.radiusX = 14
    this.radiusY = 7
    this.judgeRadius = 7
    this.color = this.color || 'blue'
    this.innerColor = this.innerColor || 'white'
  },
  display() {
    this.fillEllipse()
  },
} as BulletTemplate
