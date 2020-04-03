<template>
  <div>
    <BzHeader :productMenu="productMenu"></BzHeader>
    <router-view />
    <BzFooter :value="setting" :productMenu="productMenu"></BzFooter>
  </div>
</template>
<script>
import { getSetting, getProductMenu } from "../api/";
export default {
  name: "Index",
  data() {
    return {
      setting: {},
      productMenu: []
    };
  },
  methods: {
    getProductMenu() {
      getProductMenu().then(res => {
        if (res.status) {
          this.productMenu = res.data;
          this.$store.commit("setProductMenu", this.productMenu);
        }
      });
    },
    getSetting() {
      getSetting().then(res => {
        if (res.status) {
          this.setting = res.data;
        }
      });
    }
  },
  mounted() {
    this.getSetting();
    this.getProductMenu();
  }
};
</script>
<style lang="less" scoped>
</style>