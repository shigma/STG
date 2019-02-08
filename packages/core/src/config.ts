export interface Configurations {
  angleUnit: number
  defaultColor: string
  publicPath: string
  showWarning: boolean
  grazeRadius: number
}

export default {
  angleUnit: Math.PI,
  defaultColor: 'blue',
  publicPath: '',
  showWarning: true,
  grazeRadius: 20,
} as Configurations
