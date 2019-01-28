<template>
  <div
    class="stg-demo"
    :style="style"
    :class="{ 'multi-file': multiFile }">
    <div class="left">
      <div class="toolbar">
        <div class="tab" @click="switchTab(0)">浏览</div>
        <div class="tab" @click="switchTab(1)">代码</div>
        <div class="tab" @click="switchTab(2)">设置</div>
      </div>
      <div class="code"><slot/></div>
    </div>
    <div class="demo" ref="field" @click="toggle"/>
  </div>
</template>

<script>

const aspectRatio = 7 / 4

export default {
  props: {
    autoRun: Boolean,
    showStat: Boolean,
    multiFile: Boolean,
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
        height: this.width / aspectRatio + 'px',
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
        this.width = Math.min(parentWidth, (innerHeight - 100) * aspectRatio)
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
    switchTab(index) {},
  }
}

</script>

<style lang="stylus" scoped>

$border = 1px solid darken($codeBgColor, 20%)

.stg-demo
  display flex
  flex-direction row
  border-radius 0.4em
  overflow hidden
  max-width 100%
  background $codeBgColor
  margin 0.85rem auto

.left, .demo
  display inline-block
  width 50%
  margin 0
  padding 0

.left
  box-sizing border-box
  border-right $border

.toolbar
  height 10%
  color white
  display flex
  font-size 1.1em
  user-select none
  border-bottom $border

.tab
  height 100%
  width 33.33%
  display flex
  cursor pointer
  transition background 0.3s ease
  flex-direction row
  justify-content center
  align-items center
  &:hover
    background lighten($codeBgColor, 10%)

.code
  height 90%
  > div
    height 100%
    border-radius 0
    &::before
      display none
    pre
      margin 0
      height calc(100% - 2.5em)

.stg-field
  cursor pointer

</style>

