const { random, math } = require('@stg/utils')

module.exports = {
  title: '污秽的纯化',
  mounted() {
    this.setInterval(80, () => {
      const angle = random.real()
      this.emit(10, 'blue', 120, 68, angle)
      this.emit(20, 'red', 80, 60, angle)
    })
  },
  methods: {
    emit(count, color, distance, timeout, angle) {
      this.emitBullets(count, (index) => ({
        display: 'small',
        origin: 'player',
        state: {
          color,
          fieldBorder: 40 + distance,
          theta: angle + index / count * 2
        },
        mutate(tick) {
          if (tick <= timeout) {
            this.rho = 40 + distance * math.sin(tick / timeout)
          } else {
            this.rho -= (tick - timeout) / 16
          }
          this.polarLocate()
          if (tick === timeout) {
            const coord = this.setOrigin(this.$player.$coord)
            this.rho = coord.rho
            this.theta = coord.theta
          }
        },
      }))
    },
  },
}