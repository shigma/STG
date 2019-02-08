const { math, random } = require('web-stg')

module.exports.reference = {
  origin: {
    state: {
      x: 100,
      y: 200,
      radius: 16,
    },
    methods: {
      transfer() {
        this.prev = this.$coord
        this.next = {
          x: random.transfer(this.x, 60, 140, 40, 80),
          y: random.transfer(this.y, 80, 320, 60, 120),
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
      const scale = (1 - math.cos(math.PI * rest)) / 2
      this.x = this.prev.x + (this.next.x - this.prev.x) * scale
      this.y = this.prev.y + (this.next.y - this.prev.y) * scale
    },
    display() {
      this.fillCircle()
    },
  }
}
