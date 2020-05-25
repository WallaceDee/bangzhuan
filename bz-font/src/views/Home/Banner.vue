<template>
  <div class="content banner">
    <div class="swiper-container banner-wrapper">
      <div class="swiper-wrapper">
        <div
          v-for="item in list"
          :key="item.id"
          class="swiper-slide"
          :style="`background-image:url(${item.url})`"
        ></div>
      </div>
      <div class="swiper-pagination" v-if="list.length>1"></div>
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>-->
    </div>
    <button class="get-consult-btn" @click="go2Consult">获取解决方案</button>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import { getBannerList } from '@/api/'
export default {
  name: 'Banner',
  data() {
    return {
      list: []
    }
  },
  methods: {
    go2Consult() {
      this.$router.push({
        name: 'Consult'
      })
    },
    init() {
      new Swiper('.banner-wrapper', {
        loop: true,
        effect: 'fade',
        autoplay: {
          delay: 5000 //1秒切换一次
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        }
        // ,navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // }
      })
    }
  },
  mounted() {
    getBannerList().then(res => {
      if (res.status) {
        if (res.status) {
          this.list = res.data
          setTimeout(() => {
            this.init()
          }, 0)
        }
      }
    })
  }
}
</script>

<style lang="less">
.banner {
  .banner-wrapper {
    --swiper-pagination-color: #ffffff; /* 两种都可以 */
    .swiper-slide {
      background-size: cover;
      background-position: center;
    }
    .swiper-pagination {
      bottom: 110px;
    }
    .swiper-pagination-bullet {
      background: #ffffff;
      opacity: 0.5;
    }
    .swiper-pagination-bullet-active {
      width: 50px;
      border-radius: 8px;
      opacity: 1;
    }
  }
  button {
    transition: all 0.2s;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    position: absolute;
    z-index: 2;
    color: #fff;
    left: 50%;
    transform: translateX(-50%);
    bottom: 180px;
    font-size: 20px;
    padding: 10px 40px;
    outline: none;
    cursor: pointer;
    &:hover {
      background-color: @mainColor;
    }
  }
}
@media screen and (min-width: 641px) {
  .banner{
      height: 100vh;
  }
  .banner.content {
    position: relative;
    min-width: 1180px;
    .swiper-slide {
      height: 100vh;
    }
  }
}
@media screen and (max-width: 640px) {
   .banner{    height: 70vh;}
  .banner.content {
    position: relative;
    width: 100%;
    min-width: auto;
    .swiper-slide {
      height: 70vh;
    }
    .swiper-pagination-bullet {
      width: 5px;
      height: 5px;
    }
    .swiper-pagination-bullet-active {
      width: 25px;
      border-radius: 5px;
      opacity: 1;
    }
    .swiper-pagination {
      bottom: 50px;
    }
    button {
      font-size: 14px;
      padding: 5px 30px;
      bottom: 110px;
    }
  }
}
</style>