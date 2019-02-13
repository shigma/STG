const { math } = require('@stg/utils')

module.exports = function(stg) {
  stg.defineTemplate('sun', {
    display(tick) {
      const radius = (tick <= 10 ? math.sin(tick / 20 * math.PI) : 1) * this.radius
      const outerR = radius * 1.4
      const innerR = radius * 0.4
      this.fillCircle(this.getGradient('#f000', outerR, '#f009', radius), outerR)
      this.fillCircle(this.getGradient('#fffb', innerR, '#fff7', radius), radius)
    },
  })
}
