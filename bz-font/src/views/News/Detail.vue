<template>
  <Title :title="{label:'专利情报',subTitle:'NEWS'}">
    <div class="news-detail">
      <div class="content">
      <div class="left">
        <h1>{{getDate(data.createTime,'yyyymmdd','-')}}</h1>
        <p>来源：帮专网</p>
      </div>
      <div class="main">
        <h1>{{data.title}}</h1>
        <Divider/>
        <div v-html="data.content"></div>
      </div>
    </div>
    </div>
  </Title>
</template>
<script>
import { getNewsDetail } from '../../api/'
import { getDate } from '../../libs/tools'
export default{
  name:'NewsDetail',
  data(){
    return {
      data:{}
    }
  },
  computed:{
    id(){
      return this.$route.params.id
    }
  },
  methods:{
    getDate,
    getData(){
      getNewsDetail({
        id:this.id
      }).then(res => {
        if(res.status){
          this.data=res.data
        }
      })
    }
  },
  activated(){
    this.getData()
    document.scrollingElement.scrollTop = 0
  }
}
</script>
<style lang="less" scoped>
.news-detail{
  .content{
    min-height: 100vh;
  }
  .left{
    color: #858585;
  }
  .main{
    h1{
      color:#202020;
    }
  }
}
@media screen and (min-width: 641px) {
  .news-detail{
    .content{
      width: 1180px;
      margin-right: auto;
      margin-left: auto;
      overflow: auto;
      padding: 0 50px;
    }
  .left{
    float: left;
   width: 30%;
h1{
     font-size: 20px;
   font-weight: normal;
}
  }
  .main{
        float: left;
    width: 70%;
    min-height: 500px;
    h1{
      font-size: 20px;
    }
  }
}
}
@media screen and (max-width: 640px) {
.news-detail{
    .content{
      padding: 0 25px 20px 25px;
      .left{
        h1{
           font-size: 18px;
   font-weight: normal;
        }
      }
      .main{
        margin-top: 5px;
        h1{
          font-size: 20px;
          font-weight: 500;
        }
        .ivu-divider{
          margin: 10px 0;
        }
      }
    }}
}
</style>