<template>
  <Block :value="blockInfo">
    <ul class="solution-title-list">
      <li
        @click="slideTo(index)"
        v-for="(item,index) in list"
        :class="{'active':activeIndex===index}"
        :key="item.id"
      >{{item.label}}</li>
    </ul>
    <div class="swiper-container solution-swiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item,index) in list"
          :key="item.id"
           @click="go2Product(index)"
        >
          <span class="cover swiper-no-swiping" :style="`background-image:url(${item.cover})`"></span>
          <em class="swiper-no-swiping"></em>
          <transition name="fade">
            <div class="info swiper-no-swiping">
              <img v-lazy="item.icon" alt />
              <h1>{{item.label}}</h1>
              <p>{{item.description}}</p>
              <em class="bg swiper-no-swiping" :style="`background-image:url(${item.icon})`"></em>
              <div class="solution-pagination">
                <span>{{formatZero(index+1,2)}}</span>
                <div class="swiper-pagination"></div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <ul class="solution-list">
      <li v-for="(item,index) in list" :key="item.id" @click="go2Product(index)">
        <span class="cover" v-lazy:background-image="item.cover"></span>
        <div class="info" :style="`height:${height}px`">
          <img v-lazy="item.icon" alt />
          <h1>{{item.label}}</h1>
          <p>{{item.description}}</p>
          <em class="bg" v-lazy:background-image="item.icon"></em>
        </div>
      </li>
    </ul>
  </Block>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: 'Solution',
  data() {
    return {
      swiper: null,
      activeIndex: 0
    }
  },
  computed: {
    height() {
      return this.$store.state.width / 2
    },
    blockInfo() {
      return this.$store.state.productMenu[0]
    },
    list() {
      if (this.$store.state.productMenu.length) {
        return this.$store.state.productMenu[0].children
      } else {
        return []
      }
    }
  },
  watch: {
    list(val) {
      this.init()
    }
  },
  methods: {
    go2Product(index) {
      this.$router.push({
        name: 'Products',
        params: {
          type: '1'
        },
        query: {
          activeId: index
        }
      })
    },
    slideTo(index) {
      this.swiper.slideToLoop(index)
      setTimeout(() => {
        this.swiper.autoplay.start()
      }, 3000)
    },
    formatZero(num, len) {
      if (String(num).length > len) return num
      return (Array(len).join(0) + num).slice(-len)
    },
    init() {
      this.$nextTick(() => {
        let solutionSwiper
        this.swiper = solutionSwiper = new Swiper('.solution-swiper', {
          centeredSlides: true,
          preventInteractionOnTransition: true,
          noSwiping: true,
           autoplay:true,//等同于以下设置
          loop: true,
          slidesPerView: 3,
          pagination: {
            el: '.solution-swiper .swiper-pagination'
          },
          on: {
            // init: function() {
              // setTimeout(() => {
              //   this.slideTo(1)
              // }, 0)
            // },
            slideChange: () => {
              if(solutionSwiper){
              this.activeIndex = solutionSwiper.realIndex
              }
            }
          }
        })
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="less" >
.solution-title-list {
  position: relative;
  list-style: none;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  padding-top: 20px;
  &:before {
    content: "";
    position: absolute;
    display: block;
    height: 1px;
    width: 80%;
    left: 10%;
    top: 0;
    background-color: #c9c9c9;
  }
  li {
    color: #858585;
    cursor: pointer;
    font-size: 16px;
    list-style: none;
    margin-right: 10px;
    line-height: 30px;
    &.active {
      color: @mainColor;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
.swiper-container.solution-swiper {
  width: 100%;
  margin: 12px 0;

  .swiper-slide {
    cursor: pointer;
    > .cover {
      position: relative;
      transition: all 0.5s;
      z-index: 2;
      display: block;
      width: 65%;
      height: 0;
      padding-bottom: 60%;
      flex-shrink: 0;
      background-position: center;
      background-size: cover;
    }
    > div {
      transition: all 0.5s;
      background-color: #f8f8f8;
      position: absolute;
      top: 0;
      left: 0;
      width: 91%;
      height: 100%;
      overflow: hidden;
      opacity: 0;
      padding: 10px 20px 0 20px;
      background-repeat: no-repeat;
     &:after {
        content: "→MORE";
        display: block;
        font-size: 12px;
        margin-top: 5px;
      }
      img {
        height: 40%;
      }
      h1 {
        color: #212121;
        font-size: 16px;
        // margin-top: 2px;
        margin-bottom: 5px;
      }
      > p{
        height: 66px;
           overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        position: relative;

      }
      > p,
      h1 {
        position: relative;
        z-index: 1;
      }
      em.bg {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 0;
        opacity: 0.2;
        background-repeat: no-repeat;
        background-position: 120% 150%;
        background-size: 60%;
      }
    }
  }
  .swiper-slide-next {
    .cover {
      position: absolute;
      right: 0;
    }
  }
  .swiper-slide-active,
  .swiper-slide-duplicate-active {
    z-index: 99;
    transform: translateX(-28%);
    > em {
      display: block;
      position: absolute;
      width: 65%;
      height: 0;
      padding-bottom: 60%;
      top: 0;
      left: 0;
      z-index: 2;
      background-image: linear-gradient(45deg, #0099ff, #07cbd4);
      opacity: 0.5;
    }
    > div {
      opacity: 1;
      left: 65%;
    }
  }
  .solution-pagination {
    position: absolute;
    right: 20px;
    top: 30px;
    width: 5px;
    > span {
      position: relative;
      display: inline-block;
      transform: rotate(90deg);
      margin-left: -5px;
      color: #c9c9c9;
      &:before {
        position: absolute;
        content: "";
        display: block;
        width: 12px;
        height: 1px;
        left: -18px;
        top: 9px;
        background-color: #c9c9c9;
      }
    }
    .swiper-pagination {
      position: relative;
      line-height: 5px;
      .swiper-pagination-bullet {
        width: 3px;
        border-radius: 50%;
        height: 3px;
      }
      .swiper-pagination-bullet-active {
        opacity: 1;
        background-color: #fff;
        width: 5px;
        height: 5px;
        border: 1px solid rgba(0, 0, 0, 0.2);
      }
    }
  }
}

@media screen and (min-width: 641px) {
  .solution-list {
    display: none;
  }
}
@media screen and (max-width: 640px) {
  .solution-title-list,
  .solution-swiper {
    display: none;
  }
  .solution-list {
    min-height: 100vh;
    li {
      overflow: auto;
      position: relative;
      margin-bottom: 10px;
      &:nth-child(odd) {
        > .cover,
        > div {
          float: left;
        }
      }
      &:nth-child(even) {
        > .cover,
        > div {
          float: right;
        }
      }
      > .cover {
        position: relative;
        display: block;
        width: 50%;
        height: 0;
        padding-bottom: 50%;
        flex-shrink: 0;
        background-position: center;
        background-size: cover;
      }
      > div {
        position: relative;
        overflow: hidden;
        background-color: #f8f8f8;
        top: 0;
        left: 0;
        width: 50%;
        background-repeat: no-repeat;
        padding: 5px 15px;
        &:after {
          content: "→MORE";
          display: block;
          font-size: 12px;
          margin-top: 5px;
        }
        img {
          height: 35%;
        }
        h1 {
          white-space: nowrap;
          color: #212121;
          font-size: 14px;
          // margin-top: 3px;
          margin-bottom: 3px;
        }
        > p {
          font-size: 12px;
         height: 40%;
         overflow: auto;
        }
        > p,
        h1 {
          position: relative;
          z-index: 1;
        }
        em.bg {
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 0;
          opacity: 0.2;
          background-repeat: no-repeat;
          background-position: 200% 120%;
          background-size: 70%;
        }
      }
    }
  }
}
</style>