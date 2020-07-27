<template>
  <div>
    <Banner></Banner>
    <Solution ></Solution>
    <BasicProducts></BasicProducts>
    <OverseaBusiness></OverseaBusiness>
    <Case></Case>
    <Partners></Partners>
    <News></News>
  </div>
</template>
<script>
import Banner from './Home/Banner'
import Solution from './Home/Solution'
import BasicProducts from './Home/BasicProducts'
import OverseaBusiness from './Home/OverseaBusiness'
import Case from './Home/Case'
import Partners from './Home/Partners'
import News from './Home/News'
export default {
  name: 'Home',
  components:{
    Banner,
    Solution,
    BasicProducts,
    OverseaBusiness,
    Partners,
    Case,
    News
  },
  data() {
    return {
    }
  },
  mounted() {

  }
}
</script>
