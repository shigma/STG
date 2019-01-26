import { BulletOptions } from '@stg/core'

export default {
  state: {
    radius: 6,
    judgeRadius: 4,
    innerR: 4,
    color: 'white',
    bdColor: 'blue',
  },
  display() {
    this.fillCircle(this.getGradient(this.color, this.innerR, this.bdColor))
  },
} as BulletOptions
