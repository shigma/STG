module.exports = {
  mounted() {
    this.setInterval(3, (tick) => {
      this.emitBullets(8, (index) => ({
        display: 'scaly',
        origin: 'center',
        state: {
          rho: 12,
          face: tick / 20 + index / 4,
        },
        mutate(tick) {
          this.rho += 3 + tick / 60
          this.polarLocate()
        },
      }))
    })
  }
}