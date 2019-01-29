module.exports = {
  title: '波与粒',
  mounted() {
    this.setInterval(8, (tick) => {
      this.emitBullets(7, (index) => ({
        extends: 'small',
        origin: {
          x: 240,
          y: 280,
          face: tick / 100,
        },
        state: {
          rho: 32,
          theta: index / 3.5,
        },
        mutate(tick) {
          this.rho += 2 + tick / 40
          this.polarLocate(this.rho, this.theta)
        }
      }))
    })
  }
}
