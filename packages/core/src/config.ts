export interface Configurations {
  angleUnit: number
  defaultColor: string
  publicPath: string
  showWarning: boolean
  scheduleLimit: number
  maxBulletCount: number
  grazeFilter: string
  fogEffectTimeout: number
  imageUpdateInterval: number
}

export default {
  angleUnit: Math.PI,
  defaultColor: 'blue',
  publicPath: '/',
  showWarning: true,
  scheduleLimit: 256,
  maxBulletCount: 4096,
  grazeFilter: 'sepia(0.6) saturate(4)',
  fogEffectTimeout: 3,
  imageUpdateInterval: 4,
} as Configurations
