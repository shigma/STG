import { BulletOptions } from '@stg/core'

export default {
  state: {
    radius: 14,
    judgeRadius: 8.5,
    innerRadius: 9,
    color: 'blue',
    innerColor: 'white',
  },
  display() {
    this.fillCircle(this.getGradient(this.innerColor, this.innerRadius))
  },
} as BulletOptions
