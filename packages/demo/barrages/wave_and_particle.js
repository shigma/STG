module.exports = {
  title: '波与粒',
  mounted() {
    this.setInterval(6, (tick) => {
      this.emitBullets(7, (index) => ({
        blur: 'small',
        display: 'rice',
        origin: {
          x: 240,
          y: 280,
          face: tick ** 2 / 50,
        },
        state: {
          rho: 32,
          color: 'purple',
          face: index / 3.5,
        },
        mutate(tick) {
          this.rho += 2 + tick / 40
          this.polarLocate(this.rho, this.face)
        },
      }))
    })
  }
}