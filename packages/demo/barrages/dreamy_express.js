const { math, random } = require('web-stg')

module.exports = {
  title: '梦幻快车',
  reference: {
    origin: {
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
            x: random.transfer(this.x, 100, 380, 80, 120),
            y: random.real(80, 160),
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
        const scale = (1 - math.cos(Math.PI * rest)) / 2
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
        display: 'medium',
        state: {
          rho: 0,
          color: 'maroon',
        },
        mounted() {
          const theta = Math.PI * index / 16
          const phi = this.$refs.player.locate(this.$coord).thetaRadian
          this.vx = 5 * math.sin(theta) * math.cos(phi) - 6 * math.cos(theta) * math.sin(phi)
          this.vy = 5 * math.sin(theta) * math.sin(phi) + 6 * math.cos(theta) * math.cos(phi)
        },
        mutate(tick) {
          this.rho += 1 + tick / 300
          this.x = this.rho * this.vx
          this.y = this.rho * this.vy
        },
      }))
    })
  },
}
