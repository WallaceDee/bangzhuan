<template>
  <div class="basic">
    <Title :title="title" style="min-height:600px">
      <Spin fix v-if="loading"></Spin>
      <div :id="`item-${index}`" class="solution-item" v-for="(item,index) in list" :key="item.id">
        <div class="content">
          <div>
            <img :src="item.icon" alt />
            <h1>{{item.title}}</h1>
            <p>{{item.content}}</p>
            <div class="bg" :style="`background-image:url(${item.icon})`"></div>
          </div>
          <div :style="`background-image:url(${item.cover})`">
            <div v-for="sub in item.subItems">
              <span class="icon">
                <i :style="`background-image:url(${sub.icon})`"></i>
              </span>
              <span>{{sub.description}}</span>
              <span class="icon">
                <i :style="`background-image:url(${sub.icon})`"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Title>
  </div>
</template>
<script>
import { getProductList } from '../../api/'
export default {
  name: 'Solution',
  data() {
    return {
      list: [],
      loading: false
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
    getData() {
      this.loading = true
      getProductList({
        type: this.type,
        rows: 99
      }).then(res => {
        if (res.status) {
          this.loading = false
          this.list = res.data.rows
          this.$nextTick(() => {
            if (this.$route.query.activeId !== undefined) {
              this.scrollIntoView(`item-${this.$route.query.activeId}`)
            } else {
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
.solution-item {
  .content {
    // background-repeat: no-repeat;
    > div:first-child {
      position: relative;
      background-repeat: no-repeat;
      background-color: #f8f8f8;
      > img {
        width: 20%;
      }
      > h1 {
        color: #202020;
      }
      > p {
        color: #858585;
      }

      .bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        right: 0;
        background-repeat: no-repeat;
        z-index: 0;
        opacity: 0.15;
      }
    }
    > div:last-child {
      background-size: cover;
      background-position: center;
      > div {
        > span:nth-child(2) {
          display: inline-block;
          background-color: #fff;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
        > span.icon {
          &:first-child {
            display: none;
          }
          display: inline-block;
          text-align: center;
          background-image: linear-gradient(30deg, #0099ff, #07cbd4);
          i {
            display: inline-block;
            background-repeat: no-repeat;
            background-size: contain;
            vertical-align: middle;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 641px) {
  .solution-item {
    min-width: 1180px;
    margin-bottom: 50px;
    overflow: hidden;
    .content {
      float: left;
      width: 80%;
      > div:first-child {
        background-color: #f8f8f8;
        width: 40%;
        float: right;
        height: 0;
        padding-bottom: 28%;
        > img {
          margin-left: 20px;
          margin-top: 20px;
        }
        > h1 {
          margin-top: 10px;
          padding-left: 20px;
          font-size: 18px;
        }
        > p {
          line-height: 24px;
          padding: 8px 20px 0 20px;
          line-height: 20px;
        }
        .bg {
          background-size: 50%;
          background-position: 110% 105%;
        }
      }
      > div:last-child {
              transition: .2s all;
        width: 60%;
        float: right;
        height: 0;
        padding-bottom: 28%;
        > div {
          text-align: right;
          line-height: 40px;
          margin-bottom: 5%;
          &:first-child {
            margin-top: 7%;
          }
          > span:nth-child(2) {
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
          }
          > span.icon {
            &:first-child {
              display: none;
            }
            height: 40px;
            width: 80px;
            i {
              width: 24px;
              height: 24px;
            }
          }
        }
      }
      &:hover{
        >div:last-child{
          background-size: 125%;
        }
      }
    }
  }
  .solution-item:nth-child(odd) {
    .content {
      float: right;
      > div:first-child {
        float: left;
      }
      > div:last-child {
        float: left;
        > div {
          text-align: left;
          overflow: auto;
          > span:nth-child(2) {
            border-radius: 0 3px 3px 0;
          }
          > span.icon {
            &:first-child {
              display: inline-block;
            }
            &:last-child {
              display: none;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .solution-item {
    .content {
      > div:last-child {
        > div:first-child {
          margin-top: 8%;
        }
      }
      > div:first-child {
        img {
          margin-top: 20px;
          margin-left: 20px;
        }
        h1 {
          padding-left: 20px;
          margin-top: 20px;
        }
        p {
          line-height: 20px;
          padding: 5px 20px 0 20px;
        }
      }
    }
  }
}
@media screen and (min-width: 1440px) {
  .solution-item {
    .content {
      > div:last-child {
        > div:first-child {
          margin-top: 10%;
        }
      }
      > div:first-child {
        img {
          margin-top: 30px;
          margin-left: 30px;
        }
        h1 {
          padding-left: 30px;
          margin-top: 15px;
        }
        p {
          line-height: 24px;
          padding: 15px 30px 0 30px;
          font-size: 16px;
        }
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .solution-item {
    .content {
      // background-repeat: no-repeat;
      > div:first-child {
        padding: 20px;
        font-size: 14px;
        h1 {
          font-size: 16px;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        p {
          letter-spacing: 1px;
        }
        img {
          width: 15%;
        }
        .bg {
          background-size: 40%;
          background-position: 110% 105%;
        }
      }
      > div:last-child {
        padding: 30px 0;
        > div {
          line-height: 40px;
          margin-bottom: 15px;
          > span:nth-child(2) {
            display: inline-block;
            font-size: 12px;
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            vertical-align: bottom;
            max-width: calc(~"100% - 55px");
            white-space: nowrap;
            overflow: auto;
          }
          > span.icon {
            &:first-child {
              display: inline-block;
            }
            &:last-child {
              display: none;
            }
            height: 40px;
            width: 55px;
            i {
              width: 24px;
              height: 24px;
            }
          }
        }
      }
    }
  }
}
</style>