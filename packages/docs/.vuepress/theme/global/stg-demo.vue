<template>
  <div class="stg-demo" :style="style">
    <div class="code" ref="code"><slot/></div>
    <div class="field" ref="field" @click="toggle"/>
  </div>
</template>

<script>

export default {
  props: {
    autoRun: Boolean,
    showStat: Boolean,
  },

  data: () => ({
    width: null,
    active: false,
  }),

  computed: {
    style() {
      if (!this.width) return {}
      return {
        width: this.width + 'px',
        height: this.width / 12 * 7 + 'px',
      }
    },
  },

  async mounted() {
    this.layout()
    addEventListener('resize', () => this.layout())
    if (!this.$slots || !this.$slots.default) return
    const code = this.$slots.default[0].elm.innerText
    const stg = await import('web-stg')
    this.field = new stg.Field(this.$refs.field, {
      background: '#282c34',
      frameRateStyle: this.showStat ? {} : undefined,
    })
    this.field.addEventListener('pause', () => this.active = false)
    this.field.addEventListener('resume', () => this.active = true)
    this.load(code)
  },

  methods: {
    layout() {
      this.$nextTick(() => {
        const parentWidth = this.$el.parentElement
          ? this.$el.parentElement.offsetWidth
          : Infinity
        this.width = Math.min(parentWidth, (innerHeight - 100) / 7 * 12)
      })
    },
    toggle() {
      if (!this.field) return
      this.field.toggle()
    },
    load(code) {
      try {
        const exports = {}
        const module = { exports }
        const require = () => stg
        const args = '(exports,module,require)'
        // pretend that I realized a module system
        eval(`(${args}=>{${code}})${args}`)
        this.field.setBarrage(module.exports)
        if (this.autoRun) this.field.toggle()
      } catch (error) {
        console.error(error)
        console.log('An error encounted in: \n' + code)
      }
    },
  }
}

</script>

<style lang="stylus" scoped>

.stg-demo
  display flex
  flex-direction row
  border-radius 0.4em
  overflow hidden
  max-width 100%
  margin 0.85rem auto

.code, .field
  display inline-block
  width 50%
  margin 0
  padding 0

.code > div
  height 100%
  border-radius 0
  &::before
    display none
  pre
    margin 0
    height calc(100% - 2.5em)

.field
  cursor pointer
  background $codeBgColor

</style>

