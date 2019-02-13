const { Coordinate } = require('@stg/core')
const { random, math } = require('@stg/utils')
const { th12 } = require('@stg/touhou')

module.exports = {
  title: '雨夜怪谈',
  before(stg) {
    return stg.use(th12.tatara_kogasa, 'stgenm/tatara_kogasa.png')
  },
  reference: {
    enemy: {
      state: {
        x: 240,
        y: 240,
        spin: -0.5,
        color: '#00bfff5f',
      },
      display() {
        this.fillCircle(this.getGradient('transparent', 0))
        this.drawTemplate('tatara_kogasa')
      },
      mutate(tick) {
        this.radius = 240 - Math.abs((tick / 2) % 480 - 240)
      },
    },
  },
  mounted() {
    this.setInterval(4, () => {
      const theta = random.real(2)
      const face = random.real(-1, 1) / 12 + 0.5
      const enemy = this.$refs.enemy
      const origin = enemy.$coord.resolve(Coordinate.polar(enemy.radius, theta))
      this.emitBullets(6, (index) => ({
        display: 'rice',
        origin,
        state: {
          color: 'cyan',
          rho: 0,
          face: face + index / 3,
        },
        mutate(tick) {
          this.rho += tick / 48
          this.polarLocate(this.rho, this.face)
        },
      }))
    })
  },
}