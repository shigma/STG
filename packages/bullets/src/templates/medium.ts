import { BulletOptions } from '@stg/core'

export default {
  state: {
    radius: 12,
    judgeRadius: 8.5,
    innerRadius: 8.5,
    innerColor: 'white',
    color: 'blue',
  },
  display() {
    this.fillCircle(this.getGradient(this.innerColor, this.innerRadius, this.color))
  },
} as BulletOptions
