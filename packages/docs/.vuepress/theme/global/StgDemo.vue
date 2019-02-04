<template>
  <div
    class="stg-demo"
    :style="layoutStyle"
    :class="{ 'multi-file': multiFile }"
  >
    <div class="left">
      <div class="toolbar" v-if="multiFile">
        <div
          @click.stop="tabIndex = 0"
          :class="['tab', { active: tabIndex === 0 }]"
        >
          <i class="icon-folder"/>浏览
        </div>
        <div
          @click.stop="tabIndex = 1"
          :class="['tab', { active: tabIndex === 1 }]"
        >
          <i class="icon-source"/>代码
        </div>
        <div
          @click.stop="tabIndex = 2"
          :class="['tab', { active: tabIndex === 2 }]"
        >
          <i class="icon-settings"/>设置
        </div>
        <span class="underline" :style="{ left: (tabIndex * 2 + 1) / 6 * 100 + '%' }"/>
      </div>
      <div class="container">
        <transition
          name="container"
          :leave-to-class="'transform-to-' + (tabMovingToRight ? 'left' : 'right')"
          :enter-class="'transform-to-' + (tabMovingToRight ? 'right' : 'left')"
        >
          <div v-if="tabIndex === 0" class="explorer" key="0">
            <div
              v-for="(file, index) in files" :key="index"
              :class="['item', { active: fileIndex === index }]"
              @click.stop="fileIndex = index"
              v-text="file.exports.title"
            />
          </div>
          <div v-else-if="tabIndex === 1" class="code" ref="code" key="1">
            <slot/>
          </div>
          <div v-else class="settings" key="2">
            <h3>数据统计</h3>
            <div>逻辑帧率: {{ tickRate || '--' }}</div>
            <div>物理帧率: {{ frameRate || '--' }}</div>
            <div>处理落率: {{ dropRate || '--' }}</div>
          </div>
        </transition>
      </div>
    </div>
    <div class="right" ref="field" @click="toggle"/>
  </div>
</template>

<script>

import { getInnerText } from '../utils/vnode'
import * as stg from 'web-stg/dist/stg.common'
import 'web-stg/dist/stg.min.css'
import '../dist/icons.css'

export default {
  props: {
    width: {
      type: Number,
      default: 480,
    },
    height: {
      type: Number,
      default: 560,
    },
    autoRun: Boolean,
  },

  data: () => ({
    // layout
    layoutWidth: null,
    tabMovingToRight: 0,
    tabIndex: null,
    fileIndex: 0,

    // stats
    active: false,
    tickRate: null,
    frameRate: null,
    dropRate: null,
  }),

  computed: {
    aspectRatio() {
      return this.width * 2 / this.height
    },
    layoutStyle() {
      if (!this.layoutWidth) return {}
      return {
        width: this.layoutWidth + 'px',
        height: this.layoutWidth / this.aspectRatio + 'px',
      }
    },
  },

  watch: {
    fileIndex: 'setBarrage',
    async tabIndex(value, oldValue) {
      if (this.oldValue !== null) {
        this.tabMovingToRight = value > oldValue
      }
      if (this.tabIndex !== 1) return
      await this.$nextTick()
      ;[].forEach.call(this.$refs.code.childNodes, (node, index) => {
        if (this.fileIndex === index) {
          node.classList.remove('inactive')
        } else {
          node.classList.add('inactive')
        }
      })
    },
  },

  created() {
    this.tabIndex = 1
    this.multiFile = this.$slots.default.length > 1
    this.files = this.$slots.default.map((vnode) => {
      const code = getInnerText(vnode)
      const exports = {}
      const module = { code, exports }
      const require = () => stg
      try {
        // pretend that I realized a module system
        const args = '(exports,module,require)'
        eval(`(${args}=>{${code}})${args}`)
      } catch (error) {
        console.error(error)
        console.warn('An error encounted in: \n' + code)
      }
      return module
    })
  },

  async mounted() {
    this.layout()
    addEventListener('resize', () => this.layout())
    
    this.field = new stg.Field(this.$refs.field, {
      width: this.width,
      height: this.height,
      statsInterval: 50,
      onPause: () => this.active = false,
      onResume: () => this.active = true,
      onStats: (stats) => {
        this.tickRate = stats.tickRate.toFixed(1)
        this.frameRate = stats.frameRate.toFixed(1)
        this.dropRate = Math.floor(stats.dropRate * 100) + '%'
      },
    })

    // set a player if it is not an auto-run game
    if (!this.autoRun) this.field.setPlayer({})

    this.setBarrage()
  },

  methods: {
    async layout() {
      await this.$nextTick()
      const parentWidth = this.$el.parentElement
        ? this.$el.parentElement.offsetWidth
        : Infinity
      this.layoutWidth = Math.min(parentWidth, (innerHeight - 100) * this.aspectRatio)
    },
    setBarrage() {
      if (!this.field) return
      this.field.setBarrage(this.files[this.fileIndex].exports)
      if (this.autoRun) this.field.toggle()
    },
    toggle() {
      if (!this.field) return
      this.field.toggle()
    },
  }
}

</script>

<style lang="stylus">

$text = #dcdfe6
$textHover = #ebeef5
$active = lighten(#409eff, 20%)
$border = 1px solid darken($codeBgColor, 20%)

.inactive
  display none

.stg-demo
  display flex
  flex-direction row
  border-radius 0.4em
  overflow hidden
  max-width 100%
  background $codeBgColor
  margin 0.85rem auto

  .left, .right
    display inline-block
    width 50%
    margin 0
    padding 0

  .left
    box-sizing border-box
    border-right $border

.toolbar
  height 10%
  display flex
  position relative
  border-bottom $border

.underline
  position absolute
  background $active
  height 2px
  transition 0.3s ease
  top 50%
  transform translate(-50%, 1em)
  width 4.4rem
  z-index 100

.tab
  height 100%
  width 33.33%
  display flex
  flex-direction row
  justify-content center
  align-items center
  i
    margin-right: 0.4em;

.toolbar .tab, .explorer .item
  color $text
  cursor pointer
  user-select none
  transition 0.3s ease
  &:hover
    color $textHover
    background lighten($codeBgColor, 10%)
  &.active
    color $active

.container
  height 100%
  opacity 1
  position relative
  overflow hidden

  .multi-file &
    height 90%

  > div
    left 0
    right 0
    height 100%
    position absolute

  .explorer .item
    padding 0.4rem 1.2rem
    &:first-child
      margin-top 0.4rem
    &:last-child
      margin-bottom 0.4rem

  .code div
    height 100%
    border-radius 0
    &::before
      display none
    pre
      margin 0
      height calc(100% - 2.5em)

  .settings
    color $text
    user-select none
    padding 0 2em

.transform-to-left
  opacity 0
  transform translateX(-100%)

.transform-to-right
  opacity 0
  transform translateX(100%)

.container-enter-active, .container-leave-active
  transition 0.3s ease

.stg-field
  cursor pointer

</style>
