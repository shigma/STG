---
home: true
actionText: Get Started
actionLink: /guide/
---

### 只需寥寥数行代码, 便可实现生动的弹幕

%%% STG
module.exports = {
  reference: {
    base: {
      state: {
        x: 240,
        y: 280,
      },
      mutate(tick) {
        this.face = tick / 100
      },
    }
  },
  mounted() {
    this.setInterval(8, () => {
      this.emitBullets(7, (index) => ({
        extends: "small",
        state: {
          rho: 32,
          theta: index / 3.5,
        },
        mutate(tick) {
          this.rho += 2 + tick / 40
          this.polarLocate(this.rho, this.theta)
        }
      }))
    })
  }
}
%%%

::: slot footer
[MIT](https://mit-license.org/) Licensed | Copyright © 2019 [Shigma](https://github.com/Shigma) | Powered by [VuePress](https://vuepress.vuejs.org/)
:::
