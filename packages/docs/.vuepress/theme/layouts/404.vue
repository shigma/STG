<template>
  <div class="theme-container">
    <div class="content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
      <router-link to="/">回到主页</router-link>
    </div>
  </div>
</template>

<script>

const msgs = [
  `魔理沙偷走了重要的东西。`,
  `因为谈论了 17 岁少女的年龄，此页面已被隙间。`,
  `此页面纯属虚构，包含的内容已遁入幻想。`,
  `大师兄，你的宝塔怎么又丢了……`,
  `没有相关结果。您要找的是不是：蕾米莉亚的威严？`,
  `谜之音：这个页面的小碎骨有些多呢（`
]

export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>

<style src="../styles/theme.styl" lang="stylus"></style>
