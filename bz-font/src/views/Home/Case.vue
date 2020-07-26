<template>
    <Block :value="blockInfo">
      <div class="case">
        <div class="main">
          <div class="info">
            <h1>{{current.title}}</h1>
            <h2>{{current.subTitle}}</h2>
            <p>{{current.content}}</p>
          </div>
          <div class="swiper-container case-swiper">
            <div class="swiper-wrapper">
              <div
                :key="item.id"
                class="swiper-slide"
                v-for="item in list"
                v-lazy:background-image="item.cover"
              ></div>
            </div>
            <div class="case-pagination">
              <span>{{formatZero(activeIndex+1,2)}}</span>
              / {{formatZero(list.length,2)}}
            </div>
          </div>
          <div class="swiper-pagination"></div>
          <div class="arrow-wrapper">
            <Arrow class="prev" type="left"></Arrow>
            <Arrow class="next"></Arrow>
          </div>
        </div>
        <div class="thumbnail">
          <ul>
            <li @click="slideTo(index)" :key="'thumbnail'+item.id" v-for="(item,index) in list" :class="{'active':activeIndex===index}">
              <span v-lazy:background-image="item.cover"></span>
              <em></em>
            </li>
          </ul>
        </div>
      </div>
    </Block>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import { getCasesList } from '../../api/'
export default {
  name: 'Case',
  data() {
    return {
      swiper:null,
      activeIndex: 0,
      list: [],
      blockInfo: {
        subTitle: 'CUSTOMER CASES',
        label: '用户案例',
        description: '基于企业市场策略的专利解决方案',
        backgroundColor:'#f8f8f8'
      }
    }
  },
  computed: {
    current() {
      if (this.list.length) {
        return this.list[this.activeIndex]
      } else {
        return {}
      }
    }
  },
  methods: {
    slideTo(index){
      this.swiper.slideTo(index)
    },
    formatZero(num, len) {
      if (String(num).length > len) return num
      return (Array(len).join(0) + num).slice(-len)
    },
    getCasesList() {
      getCasesList().then(res => {
        if (res.status) {
          this.list = res.data
          this.init()
        }
      })
    },
    init() {
      this.$nextTick(() => {
       this.swiper= new Swiper('.case-swiper', {
          pagination: {
            el: '.swiper-pagination'
          },
          navigation: {
            nextEl: '.next',
            prevEl: '.prev'
          },
          on: {
            slideChange: () => {
              this.activeIndex = this.swiper.activeIndex
            }
          }
        })
      })
    }
  },
  mounted() {
    this.getCasesList()
  }
}
</script>
<style lang="less">
.case {

  .main {
    position: relative;
    .case-swiper {
      .swiper-slide {
        background-position: center;
        background-size: cover;
      }
      .case-pagination {
        background-color: #fff;
        height: 30px;
        line-height: 30px;
        width: 80px;
        text-align: center;
        color: #c0c0c0;
        position: absolute;
        z-index: 999;
        bottom: 0;
        right: 0;
               border-top-left-radius: 3px;
        > span {
          color: @mainColor;
          font-size: 16px;
        }
      }
    }

    .info {
      h1 {
        position: relative;
        color: @mainColor;
        font-size: 24px;
        font-weight: normal;
        padding-top: 10px;
        margin-top: 50px;
        &::before {
          position: absolute;
          top: 0;
          content: "";
          display: block;
          width: 40px;
          height: 2px;
          background-color: @mainColor;
        }
      }
      h2 {
        color: #858585;
        font-weight: normal;
        font-size: 18px;
        margin-bottom: 10px;
        margin-top: 5px;
      }
      p {
        font-size: 16px;
        color: #858585;
        line-height: 26px;
        letter-spacing: 1px;
      }
    }
  }
  .thumbnail{
    ul{
      list-style: none;
    }
    li {
      position: relative;
      span{
        display: block;
        background-size: cover;
        background-position: center;
      }
      &.active{
        em{
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
        background-image: linear-gradient(45deg, #0099ff, #07cbd4);
        opacity: .6;
        }
      }
    }
  }
}
@media screen and (min-width: 641px) {
  .case {
    .main {
      width: 1100px;
      margin-right: auto;
      margin-left: auto;
      overflow: auto;
      position: relative;
      margin-bottom: 20px;
      .swiper-pagination {
        position: absolute;
        right: 0;
        width: 8px;
        line-height: 12px;
        .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
        }
        .swiper-pagination-bullet-active {
          width: 8px;
          height: 8px;
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.2);
        }
      }
      .arrow-wrapper {
        position: absolute;
        left: 550px;
        bottom: 0;
        > span {
          float: left;
          margin-right: 10px;
        }
      }
      .case-swiper {
        width: 450px;
        height: 360px;
        float: right;
        .swiper-slide {
          background-position: center;
          background-size: cover;
          border-radius: 3px;
        }
        .case-pagination {
          background-color: #fff;
          height: 30px;
          line-height: 30px;
          width: 80px;
          text-align: center;
          color: #c0c0c0;
          position: absolute;
          z-index: 999;
          bottom: 0;
          right: 0;
          > span {
            color: @mainColor;
            font-size: 16px;
          }
        }
      }

      .info {
        float: right;
        width: 600px;
        padding-left: 60px;
        h1 {
          position: relative;
          color: @mainColor;
          font-size: 24px;
          font-weight: normal;
          padding-top: 10px;
          margin-top: 50px;
          &::before {
            position: absolute;
            top: 0;
            content: "";
            display: block;
            width: 40px;
            height: 2px;
            background-color: @mainColor;
          }
        }
        h2 {
          color: #858585;
          font-weight: normal;
          font-size: 18px;
          margin-bottom: 10px;
          margin-top: 5px;
        }
        p {
          margin-right: 100px;
          font-size: 16px;
          color: #858585;
          line-height: 26px;
          max-height: 186px;
          letter-spacing: 1px;
          overflow: auto;
        }
      }
    }
      .thumbnail{
    margin-top: 50px;
    padding-bottom: 30px;
    ul{
      width: 1100px;
      margin-right: auto;
      margin-left: auto;
      overflow: auto;
      display: flex;
      justify-content: center;
    }
    li {
      cursor: pointer;
      margin-right: 20px;
         width: 120px;
        height: 120px;
      span{
        width: 120px;
        height: 120px;

      }
    }
  }
  }
}
@media screen and (max-width: 640px) {
  .case {
    .main {
      .case-swiper {
        .swiper-slide {
          width: 100%;
          height: 0;
          padding-bottom: 55%;
        }
      }
      .info {
        padding: 0 40px;
        h1{
          font-size: 18px;
          &::before{
            width: 24px;
          }
        }
        h2{
          font-size: 16px;
        }
        p{
          font-size: 14px;
          line-height: 22px;
          margin-bottom: 20px;
        }
      }
      .arrow-wrapper,
      .swiper-pagination {
        display: none;
      }

    }
    .thumbnail{
      width: 100%;
    margin-top: 15px;
    padding-bottom: 15px;
    ul{
      overflow: auto;
      display: flex;
      justify-content: center;
    }
    li {
      cursor: pointer;
      margin-right: 10px;
         width: 60px;
        height: 60px;
      span{
        width: 60px;
        height: 60px;
      }
    }
  }
  }
}
</style>