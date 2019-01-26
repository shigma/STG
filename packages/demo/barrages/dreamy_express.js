const { Barrage, math: { sin, cos } } = require('@stg/core')
const { Random } = require('@stg/utils')

module.exports = new Barrage({
  reference: {
    base: {
      state: {
        x: 240,
        y: 160,
        radius: 20,
        color: 'yellow'
      },
      methods: {
        transfer() {
          this.prev = this.$coord
          this.next = {
            x: Random.transfer(this.x, 100, 380, 80, 120),
            y: Random.real(80, 160),
          }
        },
      },
      mounted() {
        this.transfer()
        this.setInterval(144, this.transfer)
      },
      mutate(tick) {
        const rest = (tick % 144 - 72) / 72
        if (rest < 0) return
        const scale = (1 - cos(Math.PI * rest)) / 2
        this.x = this.prev.x * (1 - rest) + this.y
        this.x = this.prev.x + (this.next.x - this.prev.x) * scale
        this.y = this.prev.y + (this.next.y - this.prev.y) * scale
      },
      display() {
        this.fillCircle()
      },
    }
  },
  mounted() {
    this.setInterval(48, () => {
      this.emitBullets(32, (index) => ({
        extends: 'medium',
        state: {
          rho: 0,
          color: 'maroon',
        },
        mounted() {
          const theta = Math.PI * index / 16
          const phi = this.$refs.player.locate(this.$coord).thetaRadian
          this.vx = 5 * sin(theta) * cos(phi) - 6 * cos(theta) * sin(phi)
          this.vy = 5 * sin(theta) * sin(phi) + 6 * cos(theta) * cos(phi)
        },
        mutate(tick) {
          this.rho += 1 + tick / 300
          this.x = this.rho * this.vx
          this.y = this.rho * this.vy
        },
      }))
    })
  },
})
