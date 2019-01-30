import { BulletOptions } from '@stg/core'

export default {
  state: {
    radiusX: 14,
    radiusY: 7,
    judgeRadius: 7,
    color: 'blue',
    innerColor: 'white',
  },
  display() {
    this.fillEllipse()
  },
} as BulletOptions
