import { BulletOptions } from '@stg/core'

export default {
  state: {
    radius: 10,
    judgeR: 8.5,
    innerR: 8.5,
    color: 'white',
    bdColor: 'blue',
  },
  display() {
    this.fillCircle(this.getGradient(this.color, this.innerR, this.bdColor))
  },
} as BulletOptions
