<template>
  <div class="stg-demo" :style="style">
    <div class="code">
      <pre class="language-js"><code>{{ data }}</code></pre>
    </div>
    <div class="field" ref="field" @click="toggle"/>
  </div>
</template>

<script>

import 'prismjs'

export default {
  props: ['data'],

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
    await import('web-stg')
    this.field = new stg.Field(this.$refs.field, {
      background: '#282c34',
      frameRate: false,
    })
    this.field.setPlayer({
      state: {
        velocity: 4.5,
        color: 'red',
        radius: 4,
      },
    })
    this.field.addEventListener('pause', () => this.active = false)
    this.field.addEventListener('resume', () => this.active = true)
    this.load()
  },

  methods: {
    layout() {
      this.$nextTick(() => {
        this.width = Math.min(this.$el.parentElement.offsetWidth, 960, (innerHeight - 100) / 7 * 12)
      })
    },
    toggle() {
      if (!this.field) return
      this.field.toggle()
    },
    load() {
      try {
        const exports = {}
        const module = { exports }
        eval(`((exports,module)=>{${this.data}})(exports,module)`)
        this.field.setBarrage(module.exports)
        this.field.toggle()
      } catch (error) {
        console.error(error)
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
  margin 0.85rem auto

.code, .field
  display inline-block
  width 50%
  margin 0
  padding 0

.code pre
  margin 0
  height: calc(100% - 2.5em)
  border-radius 0

.field
  cursor pointer

</style>
