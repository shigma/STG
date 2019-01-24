const electron = require('electron')
const Vue = require('vue/dist/vue.common')
const stg = require('@stg/core')

Vue.config.productionTip = false

const path = require('path')

window.thp = null

new Vue({
  el: '#app',

  data() {
    return {
      filename: '',
      active: null,
    }
  },

  computed: {
    title() {
      if (this.filename) {
        return path.basename(this.filename).slice(0, -4)
      } else {
        return '未载入弹幕'
      }
    }
  },

  mounted() {
    window.thp = new stg.Field(this.$refs.canvas)
    window.thp.setPlayer({
      state: {
        hp: 1000,
        velocity: 4.5,
        color: 'red',
        radius: 4,
      }
    })
    window.thp.addEventListener('pause', () => this.active = false)
    window.thp.addEventListener('resume', () => this.active = true)
  },

  methods: {
    toggle() {
      if (!this.filename) return
      window.thp.toggle()
    },
    loadFile() {
      electron.remote.dialog.showOpenDialog(null, {
        title: 'Load Barrage',
        properties: ['openFile'],
        filters: [
          { name: 'Barrage', extensions: ['brg', 'js', 'ts'] }
        ]
      }, (filepaths) => {
        if (filepaths) this.parseFile(filepaths[0])
      })
    },
    parseFile(filepath) {
      if (!filepath) return
      window.thp.resetBarrage()
      try {
        delete require.cache[require.resolve(filepath)]
        window.thp.setBarrage(require(filepath))
        this.filename = filepath
      } catch (error) {
        this.filename = ''
        console.error(error)
      }
    },
  },

  template: `<div class="main">
    <canvas ref="canvas" width="480" height="560"/>
    <div class="right" align="center" ref="div">
      <button @click="toggle" :class="{ disabled: !filename }">
        <div>{{ active ? 'Pause' : active === null ? 'Start' : 'Resume' }}</div>
      </button>
      <button @click="loadFile">
        <div>Load</div>
      </button>
      <button @click="parseFile(filename)" :class="{ disabled: !filename }">
        <div>Reload</div>
      </button>
      <p>{{ title }}</p>
      <!-- <p>帧率: {{ frameRate }}</p>
      <p v-if="error">Error</p> -->
    </div>
  </div>`
})
