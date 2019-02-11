import { UtilsConfig } from '@stg/utils'
import { _config } from '@stg/utils'

interface ImageUpdate extends Record<string, number> {
  static: number
  leftward: number
  rightward: number
  spell: number
  bullet: number
  fogEffect: number
}

export interface Configurations extends UtilsConfig {
  angleUnit: number
  defaultColor: string
  publicPath: string
  showWarning: boolean
  scheduleLimit: number
  maxBulletCount: number
  grazeTimeout: number
  grazeBonus: number
  grazeFilter: string
  imageUpdate?: ImageUpdate
}

export default {
  ..._config,
  angleUnit: Math.PI,
  defaultColor: 'blue',
  publicPath: '/',
  showWarning: true,
  scheduleLimit: 256,
  maxBulletCount: 4096,
  grazeTimeout: 20,
  grazeBonus: 5,
  grazeFilter: 'sepia(0.7) saturate(4)',
  imageUpdate: {
    static: 6,
    leftward: 3,
    rightward: 3,
    fogEffect: 3,
    spell: 4,
    bullet: 3,
  },
} as Configurations 
