const { math } = require('web-stg')

module.exports = {
  title: '波与粒',
  mounted() {
    this.setInterval(3, (tick) => {
      this.emitBullets(9, (index) => ({
        display: 'rice',
        origin: {
          x: 240,
          y: 280,
          face: math.sin(tick / 30),
        },
        state: {
          rho: 16,
          color: 'purple',
          face: index / 4.5,
        },
        mutate(tick) {
          this.rho += 2 + tick / 40
          this.polarLocate(this.rho, this.face)
        },
      }))
    })
  }
}