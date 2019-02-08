const { math, random } = require('web-stg')

const scheme = [
  'purple',
  'magenta',
  'blue',
  'cyan',
  'green',
  'yellowgreen',
  'yellow',
  'orange',
  'red',
]

module.exports = {
  title: '梦幻快车',
  reference: {
    origin: {
      state: {
        x: 240,
        y: 160,
        radius: 20,
        color: 'yellow',
      },
      methods: {
        updateFacing(tick, wave = 0) {
          this.face = this.$parent.$refs.player.$coord.locate(this).theta + 1
          if (wave) {
            this.emitBullets(32, (index) => ({
              display: 'medium',
              state: {
                rho: 4,
                color: 'maroon',
              },
              mounted() {
                const theta = math.PI * index / 16
                this.vx = 5 * math.cos(theta)
                this.vy = 6 * math.sin(theta)
              },
              mutate(tick) {
                this.rho += 1 + tick / 300
                this.x = this.rho * this.vx
                this.y = this.rho * this.vy
              },
            }))
          }
          if (wave % 3) return
          this.prev = this.$coord
          this.next = {
            x: random.transfer(this.x, 100, 380, 80, 120),
            y: random.real(80, 160),
          }
          this.setInterval(4, 10, () => {
            this.emitBullets(9, (index) => ({
              layer: 1,
              display: 'scaly',
              state: {
                x: 0,
                y: 16 * (index - 4),
                color: scheme[index],
                speed: 8 - math.abs(index - 4) / 2,
              },
              mutate(tick) {
                this.x = this.speed * tick
              },
            }))
          })
        },
      },
      mounted() {
        this.updateFacing()
        this.setInterval(48, this.updateFacing)
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
}
