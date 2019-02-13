const { random, math } = require('@stg/utils')
const { th11 } = require('@stg/touhou')
const sunBullet = require('../bullets/sun')

module.exports = {
  title: '千兆耀斑',
  async before(stg) {
    stg.use(sunBullet)
    await stg.use(th11.reiuji_utsuho, 'stgenm/reiuji_utsuho.png')
  },
  reference: {
    enemy: {
      display: 'reiuji_utsuho',
      state: {
        x: 240,
        y: 160,
        spin: -0.5,
      },
      methods: {
        updateFacing() {
          this.$action = 'spell'
          this.setTimeout(10, () => this.$action = null)
          this.prev = this.$coord
          this.next = {
            x: random.transfer(this.x, 100, 380, 80, 120),
            y: random.real(80, 160),
          }
        },
      },
      mounted() {
        this.updateFacing()
        this.setInterval(144, this.updateFacing)
      },
      mutate(tick) {
        const rest = (tick % 144 - 72) / 72
        if (rest < 0) return
        const scale = (1 - math.cos(Math.PI * rest)) / 2
        this.x = this.prev.x * (1 - rest) + this.y
        this.x = this.prev.x + (this.next.x - this.prev.x) * scale
        this.y = this.prev.y + (this.next.y - this.prev.y) * scale
      },
    },
  },
  mounted() {
    this.setInterval(15, () => {
      const origin = {
        x: random.real(0, 480),
        y: random.real(0, 140),
      }
      this.emitBullets({
        origin,
        layer: 1,
        display: 'sun',
        state: {
          radius: 120,
        },
        mutate(tick) {
          this.radius -= 0.5
          this.judgeRadius = this.radius * 0.9
          this.y += 2 + tick / 120
          if (!this.radius) this.destroy()
        },
      })
      const face = random.real(2)
      this.emitBullets(20, (index) => ({
        origin,
        display: 'ring',
        state: {
          rho: 0,
          color: 'blue',
          theta: face + index / 10,
        },
        mutate(tick) {
          this.rho += 2 + tick / 120
          this.polarLocate()
        },
      }))
    })
  },
}