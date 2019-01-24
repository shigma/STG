import { BulletOptions } from '../bullet'

export default {
  state: {
    radius: 6,
    judgeR: 4,
    innerR: 4,
    color: 'white',
    bdColor: 'blue',
  },
  display() {
    this.fillCircle(this.getGradient(this.color, this.innerR, this.bdColor))
  },
} as BulletOptions
