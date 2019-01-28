<template>
  <div class="playground">
    <Content class="custom"/>
  </div>
</template>

<script>

export default {
  async mounted() {
  }
}

</script>

<style lang="stylus" scoped>

.playground
  padding $navbarHeight 2rem 0
  margin 0px auto
  align-items center
  overflow hidden
  display flex
  height calc(100vh - 3.6rem)
  > .content
    width 100%

</style>
