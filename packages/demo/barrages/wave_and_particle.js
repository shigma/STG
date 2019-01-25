const { math } = require('@stg/core')

module.exports = {
  reference: {
    base: {
      state: {
        x: 240,
        y: 280,
      }
    }
  },
  mounted() {
    this.setInterval(100, (time) => {
      this.emitBullets(8, (index) => ({
        extends: 'small',
        state: {
          rho: 32,
          outerR: 12,
          face: index / 4 + math.sin(time / 1000),
          color: 'white',
          glColor: 'violet'
        },
        mutate(time, delta) {
          this.rho += (1 + time / 1000) * delta / 16
          this.polarLocate(this.rho, this.face)
        }
      }))
    })
  }
}
