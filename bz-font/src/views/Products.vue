<template>
  <div class="products">
   <div class="banner"></div>
   <Solution v-if="type==1"></Solution>
   <Basic v-if="type==2"></Basic>
   <Oversea v-if="type==3"></Oversea>
  </div>
</template>
<script>
import Oversea from './Products/Oversea'
import Solution from './Products/Solution'
import Basic from './Products/Basic'
export default {
  name:'Products',
  components:{
    Basic,
    Solution,
    Oversea
  },
  computed:{
    type(){
        return this.$route.params.type
    }
  }
}
</script>
<style lang="less" scoped>
.products{
  .banner{
    width: 100%;
    background-size: cover;
    background-position: center;
    background-image: url(../assets/images/products_bg.jpg);
  }
}

@media screen and (min-width: 641px) {
.products{
  .banner{

    min-width: 1180px;
    height: 500px;
  }
}
}
@media screen and (max-width: 640px) {
.products{
  .banner{
    height: 200px;
  }
}
}
</style>