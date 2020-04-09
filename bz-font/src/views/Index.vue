<template>
  <div>
    <BzHeader :productMenu="productMenu"></BzHeader>
    <keep-alive>
    <router-view />
    </keep-alive>
    <BzFooter :value="setting" :productMenu="productMenu"></BzFooter>
  </div>
</template>
<script>
import { getSetting, getProductMenu } from '../api/'
export default {
  name: 'Index',
  data() {
    return {
      setting: {
        address:[],
        relatedLinks:[]
      },
      productMenu: []
    }
  },
  methods: {
    getProductMenu() {
      getProductMenu().then(res => {
        if (res.status) {
          this.productMenu = res.data
          this.$store.commit('setProductMenu', this.productMenu)
        }
      })
    },
    getSetting() {
      getSetting().then(res => {
        if (res.status) {
          this.setting = res.data
           this.$store.commit('setSetting', this.setting)
        }
      })
    }
  },
  mounted() {
    this.getSetting()
    this.getProductMenu()
  }
}
</script>
<style lang="less" scoped>
</style>