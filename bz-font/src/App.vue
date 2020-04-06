<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default{
  name:'App',
  mounted(){
    window.addEventListener('resize', () => {
        this.$store.commit('setWidth',document.body.clientWidth)
  })
  }
}
</script>
<style lang="less">
html{font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;}
#app,body,html{

}
</style>