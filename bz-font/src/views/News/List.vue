<template>
  <Title :title="{label:'专利情报',subTitle:'NEWS'}">
    <Spin fix v-if="loading"></Spin>  
    <div class="content">
      <div class="top">
        <div class="latest" @click="go2Detail(latest.id)">
          <span :style="`background-image:url(${latest.cover})`"></span>
          <div class="info">
            <h2>{{getDate(latest.createTime,'mmdd','-')}}</h2>
            <h1>{{latest.title}}</h1>
            <p class="article" v-html="latest.content.replace(/style/ig,'data-style')"></p>
          </div>
        </div>
        <div class="qr-code">
          <img :src="wechatQrCode" alt="小程序二维码" />
          <h1>免费订阅</h1>
          <h1>专利情报早知道</h1>
          <p>一手专利情报定时更新</p>
        </div>
      </div>
      <ul>
        <li v-for="(item,index) in list" @click="go2Detail(item.id)" v-if="index">
          <span :style="`background-image:url(${item.cover})`"></span>
          <div class="info">
            <div>
              <h1>{{item.title}}</h1>
              <p class="article" v-html="item.content.replace(/style/ig,'data-style')"></p>
            </div>
            <div>
              <span>{{getDate(item.createTime,'mmdd','-')}}</span>
            </div>
          </div>
        </li>
      </ul>
      <Button v-if="!allLoaded" class="more-btn" @click.native="loadMore">点击加载更多</button>
    </div>
    <Page :total="total" :current="page" size="small" @on-change="onPageChange"></Page>
  </Title>
</template>
    <script>
import { getNewsList } from '../../api/'
import { getDate } from '../../libs/tools'
export default {
  name: 'List',
  data() {
    return {
      loading:false,
      page: 1,
      pageSize: 10,
      list: [],
      total: 0,
      allLoaded:false
    }
  },
  computed: {
    wechatQrCode() {
      return this.$store.state.wechatQrCode
    },
    latest() {
      if (this.list.length) {
        return this.list[0]
      } else {
        return {
          content:''
        }
      }
    }
  },
  methods: {
    loadMore(){
      this.page++
      this.getData(1)
    },
    go2Detail(id) {
      this.$router.push({
        name: 'NewsDetail',
        params: {
          id
        }
      })
    },
    onPageChange(page) {
      this.page = page
      this.getData()
    },
    getDate,
    getData(type) {
      this.loading=true
      getNewsList({
        page: this.page,
        rows: this.pageSize
      }).then(res => {
        if (res.status) {
          this.loading=false
            if(!res.data.rows.length){
             this.allLoaded=true
           }else{
               this.total = res.data.total
                if(type){
                this.list = this.list.concat(res.data.rows)
                this.allLoaded=this.list.length>=this.total
                }else{
                  this.list = res.data.rows
                   document.getElementById('title').scrollIntoView()
                }
          }
        }
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
<style lang="less">
 .article {
   >*{
     font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
     background: transparent!important;}
    line-height: 22px;
    font-weight: normal !important;
    color: #858585 !important;
    font-size: 14px !important;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    b,span ,strong{
      color: #858585 !important;
      font-size: 14px !important;
      font-weight: normal!important;
    }
    img {
      display: none!important;
    }
  }
</style>
<style lang="less" scoped>
.content {
  overflow: auto;
  > ul {
    list-style: none;
    li {
      border-radius: 3px;
      background-color: #fff;
      > span {
        display: block;
        background-size: cover;
        background-position: center;
        float: left;
      }
      > .info {
        float: left;
        h1 {
          color: #202020;
                        white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
        }
        > div {
          float: left;
          p {
            overflow: hidden;
                text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    position: relative;
          }
          &:last-child {
            > span {
              display: block;
              text-align: right;
              color: #858585;
              &:after {
                display: block;
                content: "→";
              }
            }
          }
        }
      }
      &:nth-child(odd) {
        > .info,
        > span {
          float: right;
        }
        > .info {
          padding-left: 0;
          > div {
            float: right;
            h1 {
              text-align: right;

            }
            &:last-child {
              > span {
                text-align: left;
              }
            }
          }
        }
      }
    }
  }
  .latest {
    border-radius: 3px;
    .info {
      &::after {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: block;
        content: "→MORE";
        text-align: right;
        color: #858585;
      }
      h1{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p.article{
                        text-overflow: ellipsis;
    -webkit-line-clamp:8;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    position: relative;
      }
    }
  }
}
@media screen and (min-width: 641px) {
  .more-btn{
    display: none;
  }
  .ivu-page {
    position: absolute;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .content {
    width: 1180px;
    margin-left: auto;
    margin-right: auto;
    .top {
      display: flex;
      > * {
        background-color: #fff;
      }
      .latest {
        cursor: pointer;
        position: relative;
        width: 80%;
        margin-right: 40px;
        display: flex;
        padding: 20px;
        > span {
          display: block;
          height: 309px;
          width: 55%;
          background-position: center;
          background-size: cover;
        }
        .info {
          position: relative;
          width: 45%;
          margin-left: 40px;
          padding-top: 20px;
          &::after {
            position: absolute;
            bottom: 0;
            width: 100%;
            display: block;
            content: "→MORE";
            text-align: right;
            color: #858585;
          }
          h2 {
            color: #858585;
            font-weight: normal;
            font-size: 14px;
            margin-bottom: 10px;
          }
          h1 {
            color: #202020;
            font-size: 16px;
            margin-bottom: 10px;
          }
          p {
            position: relative;
            height: 195px;
            overflow: hidden;
            line-height: 24px;
          }
        }
        &:hover{
          box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
          h1{
            color: @mainColor;
          }
          .info::after{
           color: @mainColor;
          }
        }
      }
      .qr-code {
        border-radius: 3px;
        width: 290px;
        flex-shrink: 0;
        padding: 50px 60px 30px 60px;
        h1 {
          color: #202020;
          text-align: center;
          font-size: 16px;
        }
        img {
          display: block;
          width: 170px;
          height: 170px;
          margin-bottom: 20px;
        }
        p {
          color: #858585;
          text-align: center;
          margin-top: 10px;
        }
      }
    }
    > ul {
      list-style: none;
      margin-top: 40px;
      li {
        cursor: pointer;
        background-color: #fff;
        height: 200px;
        margin-bottom: 40px;
        padding: 15px 20px;
        > span {
          display: block;
          width: 260px;
          height: 170px;
          background-size: cover;
          background-position: center;
          float: left;
        }
        > .info {
          width: calc(~"100% - 260px");
          float: left;
          padding-left: 50px;
          padding-top: 30px;
          h1 {
            color: #202020;
            font-size: 16px;
            margin-bottom: 10px;
          }
          > div {
            float: left;
            width: 65%;
            p {
              height: 100px;
              overflow: hidden;
              line-height: 24px; 
            }
            &:last-child {
              width: 35%;
              > span {
                display: block;
                text-align: right;
                padding-left: 20px;
                padding-right: 20px;
                color: #858585;
                &:after {
                  transition: .5s all;
                  display: block;
                  content: "→";
                  line-height: 100px;
                  padding-right: 20px;
                }
              }
            }
          }
        }
        &:nth-child(odd) {
          > .info,
          > span {
            float: right;
          }
          > .info {
            padding-left: 0;
            padding-right: 50px;
            > div {
              float: right;
              h1 {
                text-align: right;
              }
              &:last-child {
                > span {
                  text-align: left;
                }
              }
            }
          }
        }
        &:hover{
          box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
          h1{
            color: @mainColor;
          }
           .info > div:last-child > span:after {
              color: @mainColor;
              padding-right: 0;
                     padding-left: 20px;
           }
        }
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .more-btn{
    margin: 15px auto;
    display: block;
  }
  .ivu-page {
      display: none;
    }
  .content {
    .qr-code {
      display: none;
    }
    > ul {
      li {
        padding: 20px 10px;
        height: 110px;
        margin-bottom: 15px;
        > span {
          width: 26%;
          height: 70px;
        }
        > .info {
          width: 74%;
          padding-left: 15px;
         > div {
          width: calc(~"100% - 70px");
          &:last-child {
            width:70px;
            font-size: 16px;
            span{
              display: block;
              width: 100%;
            }
            span:after{
                   display: block;
              content: "→MORE";
                  float: right;
    font-size: 12px;
    background-color: #c9c9c9;
    width: 50px;
    white-space: nowrap;
    color: #fff;
    margin-top: 24px;
    height: 16px;
    line-height: 16px;
            }
          }
        }
          h1 {
            font-size: 16px;
            font-weight: normal;
          }
          p.article {
            height: 44px;
                 -webkit-line-clamp: 2;
          }
        }
          &:nth-child(odd) {
        > .info {
           padding-right: 15px;
             > div:last-child span:after{
                float: left;
             }
        }
      }
      }
    }
    .latest {
      background-color: #fff;
      margin-bottom: 10px;
      padding-bottom: 10px;
      overflow: auto;
      > span {
        display: block;
        width: 100%;
        height: 0;
        padding-bottom: 66.66%;
        background-position: center;
        background-size: cover;
      }
      .info {
        position: relative;
        padding: 20px 30px 30px 30px;
        overflow: auto;

        &::after {
          font-size: 12px;
          right: 20px;
        }
        > h2 {
          color: #858585;
          font-weight: normal;
          font-size: 16px;
        }
        h1 {
          color: #202020;
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 5px;
        }
        p.article {
              -webkit-line-clamp:2;
          height: 50px;
          overflow: hidden;
          height: 44px;
        }
      }
    }
  }
}
</style>