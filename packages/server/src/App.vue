<script>

import * as stg from '@stg/core'
import * as builtin from '@stg/bullets'

stg.Bullet.install(builtin)
window.define('@stg/core', stg)

export default {
  data() {
    return {
      filename: '',
      active: null,
    }
  },

  computed: {
    title() {
      if (this.filename) {
        return this.filename.slice(0, -3)
      } else {
        return '未载入弹幕'
      }
    },
  },

  mounted() {
    this.field = new stg.Field(this.$refs.canvas, {
      showFrameRate: true,
    })
    this.field.setPlayer({
      state: {
        hp: 1000,
        velocity: 4.5,
        color: 'red',
        radius: 4,
      },
    })
    this.field.addEventListener('pause', () => this.active = false)
    this.field.addEventListener('resume', () => this.active = true)
  },

  methods: {
    toggle() {
      if (!this.filename) return
      this.field.toggle()
    },
    loadFile() {
      const input = document.createElement('input')
      input.type = 'file'
      input.onchange = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = (event) => {
          this.filename = file.name
          const exports = {}
          const module = { exports }
          eval(`((exports,module)=>{${event.target.result}})(exports,module)`)
          this.field.setBarrage(module.exports)
        }
        reader.readAsText(file)
      }
      input.dispatchEvent(new MouseEvent('click'))
    },
  },
}

</script>

<template>
  <div id="app">
    <canvas ref="canvas" width="480" height="560"/>
    <div class="right" align="center" ref="div">
      <button @click="toggle" :class="{ disabled: !filename }">
        <div>{{ active ? 'Pause' : active === null ? 'Start' : 'Resume' }}</div>
      </button>
      <button @click="loadFile">
        <div>Load</div>
      </button>
      <p>{{ title }}</p>
      <!-- <p>帧率: {{ frameRate }}</p>
      <p v-if="error">Error</p> -->
    </div>
  </div>
</template>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  margin: 0;
  overflow: hidden;
}

canvas {
  left: 40px;
  width: 480px;
  top: 20px;
  height: 560px;
  position: absolute;
}

.right {
  left: 520px;
  width: 280px;
  top: 20px;
  height: 560px;
  position: absolute;
}

button {
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.5s ease;
  margin-top: 16px;
  display: table;
  border-radius: 8px;
  background-color: beige;
}

button:hover { background-color: burlywood }
button.disabled {
  background-color: lightgrey;
  cursor: default;
}

button > div {
  color: black;
  padding: 4px 12px;
  font-size: 20px;
}

</style>
