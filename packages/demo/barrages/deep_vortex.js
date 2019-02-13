const { th12 } = require('@stg/touhou')
const { random, math } = require('@stg/utils')

module.exports = {
  title: '深海漩涡',
  before(stg) {
    return stg.use(th12.murasa_minamitsu, 'stgenm/murasa_minamitsu.png')
  },
  reference: {
    enemy: {
      display: 'murasa_minamitsu',
      state: {
        x: 240,
        y: 160,
        spin: -0.5,
      },
      mounted() {
        this.setInterval(144, Infinity, 0, (tick, _wave) => {
          this.prev = this.$coord
          this.next = {
            x: random.transfer(this.x, 100, 380, 80, 120),
            y: random.real(80, 160),
          }
          const origin = this.$player.$coord.orient(this).rotate(1)
          this.setInterval(2, 30, (tick, wave) => {
            this.emitBullets(16, (index) => ({
              origin,
              display: 'drop',
              fieldType: 'distant',
              state: {
                fieldRadius: 1000,
                rho: 60 + wave * 20 + random.real(-1, 1) * 10,
                startTick: random.real(0, 12),
                theta: index / 8 + random.real(-1, 1) / 30,
                color: _wave % 2 ? 'blue' : 'cyan',
              },
              mounted() {
                this.polarLocate()
              },
              mutate(tick) {
                if (tick < this.startTick) return
                this.x += (tick - this.startTick) / 40
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
    },
  },
}