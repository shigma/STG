const { random } = require('web-stg')

module.exports = {
  title: '弹幕地狱',
  mounted() {
    this.setEmitter(30, 15, 0.35, 0.65, 0.3, 0.4, 3, 'red')
    this.setEmitter(50, 10, 0.25, 0.45, 0.3, 0.4, 2, 'magenta')
    this.setEmitter(50, 10, 0.55, 0.75, 0.3, 0.4, 2, 'magenta')
    this.setEmitter(90, 45, 0.25, 0.45, 0.3, 0.4, 3.25, 'blue')
    this.setEmitter(90, 45, 0.55, 0.75, 0.3, 0.4, 3.25, 'blue')
    this.setEmitter(8, 27, 0.5, 0.5, 0.35, 0.35, 5, 'blue', true)
  },
  methods: {
    setEmitter(interval, count, xStart, xEnd, yStart, yEnd, speed, color, ellipse = false) {
      this.setInterval(interval, () => {
        const origin = {
          x: random.real(xStart, xEnd) * 480,
          y: random.real(yStart, yEnd) * 560,
          face: ellipse ? 0 : random.real(0, 1),
        }
        this.emitBullets(count, (index) => ({
          origin,
          layer: ellipse ? 0 : 1,
          display: ellipse ? 'ellipse' : 'small',
          state: {
            color,
            rho: 40,
            face: index / count * 2,
          },
          mutate() {
            this.rho += speed
            this.polarLocate(this.rho, this.face)
          },
        }))
      })
    },
  },
}
