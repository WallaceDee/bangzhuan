<template>
  <div class="basic">
    <Title :title="title" style="min-height:600px">
      <Spin fix v-if="loading"></Spin>
      <div
        :id="`item-${index}`"
        class="basic-item"
        v-for="(item,index) in list"
        :key="item.id"
        :style="`background-color:${item.backgroundColor}`"
      >
        <div class="content" :class="{'bg-visible':item.content}" :style="`background-image:url(${item.cover})`">
          <div :class="{'content-only':item.content}">
            <h1>{{item.title}}</h1>
            <p v-if="item.content">{{item.content}}</p>
            <ul v-else>
              <li
                v-for="sub in item.subItems"
                :key="sub.index"
                :class="{'gray':isWhiteBg(item.backgroundColor)}"
              >
                <span :style="`background-image:url(${sub.icon})`"></span>
                <h2>{{sub.title}}</h2>
                <p>{{sub.description}}</p>
              </li>
            </ul>
            <img v-if="!item.content" :src="item.cover" alt="">
          </div>
        </div>
      </div>
    </Title>
  </div>
</template>
<script>
import { getProductList } from '../../api/'
export default {
  name: 'Basic',
  data() {
    return {
      loading:false,
      list: []
    }
  },
  watch: {
    '$route.query.activeId'(val) {
        this.scrollIntoView(`item-${val}`)
    }
  },
  computed: {
    type() {
      return this.$route.params.type
    },
    title() {
      if (this.$store.state.productMenu.length) {
        return this.$store.state.productMenu[this.type - 1]
      } else {
        return {}
      }
    }
  },
  methods: {
     scrollIntoView(id) {
      if(document.getElementById(id)){
        document.getElementById(id).scrollIntoView()
      }
    },
    isWhiteBg(color) {
      return (
        color.toLowerCase() === '#fff' || color.toLowerCase() === '#ffffff'
      )
    },
    getData() {
      this.loading=true
      getProductList({
        type: this.type,
        rows: 99
      }).then(res => {
        if (res.status) {
          this.loading=false
          this.list = res.data.rows
          this.$nextTick(() => {
           if (this.$route.query.activeId!==undefined) {
              this.scrollIntoView(`item-${this.$route.query.activeId}`)
            }else{
              document.scrollingElement.scrollTop = 0
            }
          })
        }
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
<style lang="less" scoped>
.basic-item {

  position: relative;
  .content {
    h1,
    ul li h2 {
      color: #202020;
    }
    ul {
      list-style: none;
    }
    li {
      background-color: #fff;
      &.gray {
        background-color: #f8f8f8;
      }
    }
  }
}
@media screen and (min-width: 641px) {
  .basic-item {
      min-width: 1180px;
    overflow: hidden;
    .content {
      position: relative;
      height: 500px;
      width: 1180px;
      margin-right: auto;
      margin-left: auto;
      background-size: 40%;
      background-repeat: no-repeat;
      background-position: right center;
      > div.content-only {
        width: 45%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        > p {
          color: #858585;
          padding-left: 50px;
          line-height: 36px;
        }
      }
      h1 {
        font-size: 22px;
        padding-left: 50px;
        line-height: 120px;
      }
      >div>img{
        display: none;
      }
      ul {
        display: flex;
        padding: 0 20px;
        li {
          position: relative;
          border-radius: 3px;
          width: 18%;
          margin-right: 2%;
          min-height: 250px;
          padding: 15px 0;
          span {
            position: relative;
            display: block;
            width: 100%;
            height: 25px;
            background-position: 95%;
            background-repeat: no-repeat;
            background-size: auto 100%;
            &:after {
              content: "";
              position: absolute;
              right: 0;
              display: block;
              width: 2px;
              height: 25px;
              background-color: #0ccada;
            }
          }
          p {
            padding: 0 25px;
            letter-spacing: 1px;
          }
          h2 {
            padding: 0 25px;
            margin-top: 8px;
            margin-bottom: 8px;
            font-size: 16px;
          }
        }
      }
    }
  }
  .basic-item:nth-child(odd) .content {
    background-position: left center;
    > div:not(.content-only) {
      transform: translateX(35%);
    }
    > div.content-only {
      left: 50%;
    }
  }
}
@media screen and (max-width: 640px) {
  .basic-item {
    width: 100%;
    min-width: auto;
    .content {
         background-size: 50%;
      background-repeat: no-repeat;
       background-position: 115% 85%;
      min-height: 250px;
      overflow: auto;
      padding-bottom: 20px;
      h1 {
        font-size: 16px;

        padding-left: 20px;
        line-height: 70px;
      }
      &:not(.bg-visible){
        background-image: initial!important;
      }
      >div>img{
        display: block;
        float:right;
            width: 50%;
            margin-top: -35px;
          }
        ul {
          margin-left: 15px;
          margin-right: 15px;
        li {
          border-radius: 3px;
          width: 100%;
          padding: 10px 0;
          margin-bottom: 15px;
          span {
            position: relative;
           margin-bottom: -30px;
            display: block;
            width: 100%;
            height: 25px;
            background-position: 95%;
            background-repeat: no-repeat;
            background-size: auto 100%;
            &:after {
              content: "";
              position: absolute;
              right: 0;
              display: block;
              width: 2px;
              height: 25px;
              background-color: #0ccada;
            }
          }
          p {
            padding: 0 15px;
            letter-spacing: 1px;
            color: #858585;
          }
          h2 {
                  font-weight: 500;
            padding: 0 15px;
            margin-top: 8px;
            margin-bottom: 8px;
            font-size: 16px;
          }
        }
      }
      .content-only{
        p{
          width: 60%;
          padding: 0 20px;
             color: #858585;
        }
      }
    }
  }
  .basic-item:nth-child(odd) .content {
    background-position: -15% 85%;
    >div:not(.content-only){
      margin-top: 60%;
      >img{
      margin-top: 10%;
        display: block;
        position: absolute;
        top: 0;
      }
      >h1{    width: 50%;
    position: absolute;
    right: 0;
    top: 20%;}

    }
    .content-only{
      >h1{
        width: 60%;
         float: right;
      }
      >p{
        float: right;
      }
    }
  }
}
</style>