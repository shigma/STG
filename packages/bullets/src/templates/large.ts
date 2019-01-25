import { BulletOptions } from '@stg/core'

export default {
  state: {
    radius: 20,
    judgeR: 14,
    innerR: 8.5,
    color: 'white',
    bdColor: 'blue',
  },
  display() {
    this.fillCircle(this.getGradient(this.color, this.innerR, this.bdColor))
  },
} as BulletOptions
