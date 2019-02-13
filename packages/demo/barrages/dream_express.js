const { math, random } = require('@stg/utils')
const { th15 } = require('@stg/touhou')

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
  before(stg) {
    return stg.use(th15.doremy_sweet, 'stgenm/doremy_sweet.png')
  },
  reference: {
    origin: {
      display: 'doremy_sweet',
      state: {
        x: 240,
        y: 160,
        spin: -0.5,
      },
      mounted() {
        this.setInterval(48, Infinity, 0, (tick, wave) => {
          this.face = this.$player.$coord.locate(this).theta + 1
          this.emitBullets(32, (index) => ({
            display: 'medium',
            state: {
              rho: 4,
              color: 'red',
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
          if (wave % 3) return
          this.prev = this.$coord
          this.next = {
            x: random.transfer(this.x, 100, 380, 80, 120),
            y: random.real(80, 160),
          }
          this.setInterval(4, 15, () => {
            this.emitBullets(9, (index) => ({
              layer: 1,
              origin: this.prev,
              display: 'scaly',
              state: {
                x: 0,
                y: 16 * (index - 4),
                color: scheme[index],
                speed: 5 - math.abs(index - 4) / 4,
              },
              mutate(tick) {
                this.x += this.speed * (1 + tick / 32)
              },
            }))
          })
        })
      },
      mutate(tick) {
        const rest = (tick % 144 - 72) / 72
        if (rest < 0) return
        const scale = (1 - math.cos(Math.PI * rest)) / 2
        this.x = this.prev.x * (1 - rest) + this.y
        this.x = this.prev.x + (this.next.x - this.prev.x) * scale
        this.y = this.prev.y + (this.next.y - this.prev.y) * scale
      },
    }
  },
}
