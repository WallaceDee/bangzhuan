<template>
  <div class="about-us">
    <div class="banner"></div>
    <Title id="item-0" :title="{label:'认识帮专',subTitle:'OUR COMPANY'}">
      <Spin fix v-if="loading"></Spin>
      <div class="content">
        <p class="description" v-for="p in description.split('\n')">{{p}}</p>
        <ul class="data">
          <li v-for="item in data" :style="`width:${data.length>5?25:100/data.length}%`">
            <h1>
              {{item.number}}
              <em>{{item.unit}}</em>
            </h1>
            <p>{{item.description}}</p>
          </li>
        </ul>
      </div>
    </Title>
    <Title id="item-1" :title="{label:'帮专荣誉',subTitle:'OUR HORNOR'}" >
      <!-- <Spin fix v-if="loading"></Spin> -->
      <div class="content certificate">
        <ul class="preview-list" v-show="!zoomStatus">
          <li v-for="(item,index) in certificates" @click="onPreviewItemClick(index)">
            <div class="surface" v-lazy:background-image="item.url"></div>
            <div class="mask"></div>
          </li>
        </ul>
          <div class="swiper-container certificate-swiper" :class="{'show':zoomStatus}">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in certificates" :key="item.id" @click="onSwiperItemClick">
              <div v-lazy:background-image="item.url"></div>
            </div>
          </div>
        </div>
          <Arrow v-show="zoomStatus" class="prev" type="left" :size="28"></Arrow>
          <Arrow v-show="zoomStatus" class="next" :size="28"></Arrow>
      </div>
    </Title>
    <Title id="item-2" :title="{label:'专业团队',subTitle:'OUR TEAM'}">
      <Spin fix v-if="loading"></Spin>
      <div class="content team">
        <div class="member" v-for="item in mainMember">
          <div class="description" v-lazy:background-image="item.photo">
            <span class="avatar" v-lazy:background-image="item.photo"></span>
            <h1>{{item.name}}</h1>
            <h2 v-for="title in item.title.split(',')">{{title}}</h2>
            <p>
              <span>{{item.years}}</span>年从业年限
            </p>
          </div>
          <div class="main-info">
            <template v-if="item.education">
              <h2>教育背景</h2>
              <h4 v-for="edu in item.education.split(',')">{{edu}}</h4>
            </template>
            <template v-if="item.experience">
              <h2>工作经历</h2>
              <p v-for="p in item.experience.split('\n')">{{p}}</p>
            </template>
            <template v-if="item.customer">
              <h2>服务客户</h2>
              <div class="customer-wrapper">
                <span
                  class="customer"
                  v-for="img in item.customer.split(',')"
                  v-lazy:background-image="img"
                ></span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </Title>
    <div class="other-member">
      <div class="content">
        <div class="swiper-container member-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in otherMember" :key="item.id">
              <em v-if="activeIndex===index"></em>
              <span @click="activeIndex=index" v-lazy:background-image="item.photo"></span>
              <h1>{{item.name}}</h1>
              <h2 v-for="title in item.title.split(',')" :key="title">{{title}}</h2>
            </div>
          </div>
          <Arrow class="prev" type="left" :size="40"></Arrow>
          <Arrow class="next" :size="40"></Arrow>
        </div>
      </div>
    </div>
    <div class="current-info">
      <transition name="fade">
        <div v-if="current.education">
          <h2>教育背景</h2>
          <div>
            <h4 v-for="edu in current.education.split(',')" :key="edu">{{edu}}</h4>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="current.experience">
          <div>
            <h2>工作经历</h2>
            <p>
              <span>{{current.years}}</span>年从业年限
            </p>
          </div>
          <div>{{current.experience}}</div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="current.customer">
          <h2>服务客户</h2>
          <div>
            <span
              class="customer"
              v-for="(img,index) in current.customer.split(',')"
              v-lazy:background-image="img"
              :key="index"
            ></span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import { getTeamList,getImagesSortList } from '../api/'
export default {
  name: 'AboutUs',
  data() {
    return {
      loading:false,
      activeIndex: 0,
      list: [],
      mainMember: [],
      certificates:[],
      zoomStatus:0,
      certificateSwiper:null
    }
  },
  watch: {
    '$route.query.activeId'(val) {
      this.scrollIntoView(`item-${val}`)
    },
    '$store.state.width'(val) {
      if (val > 640) {
        this.mainMember = this.list.filter(item => {
          return item.status
        })
      } else {
        this.mainMember = JSON.parse(JSON.stringify(this.list))
      }
    }
  },
  computed: {
    otherMember() {
      return this.list.filter(item => {
        return !item.status
      })
    },
    current() {
      if (this.otherMember.length) {
        return this.otherMember[this.activeIndex]
      } else {
        return {
          customer: ''
        }
      }
    },
    description() {
      return this.$store.state.description
    },
    data() {
      return this.$store.state.data
    }
  },
  methods: {
    onSwiperItemClick(){
       this.zoomStatus=0
    },
    onPreviewItemClick(index){
      this.zoomStatus=1
      this.certificateSwiper.slideTo(index)
    },
    getCertificatesImages() {
      getImagesSortList({
        name: 'certificate'
      }).then(res => {
        this.certificates = res.data
        this.$nextTick(() => {
       this.certificateSwiper=new Swiper('.certificate-swiper', {
            // loop:true,
            observer:true,
            navigation: {
              nextEl: '.certificate.content .next',
              prevEl: '.certificate.content .prev'
            }
          })
        })
      })
    },
    scrollIntoView(id) {
      document.getElementById(id).scrollIntoView()
    },
    getData() {
      this.loading=true
      getTeamList({
        page: 1,
        rows: 99
      }).then(res => {
        if (res.status) {
          this.loading=false
          this.list = res.data.rows
          if (this.$store.state.width > 640) {
            this.mainMember = this.list.filter(item => {
              return item.status
            })
          } else {
            this.mainMember = JSON.parse(JSON.stringify(this.list))
          }
          this.initSwiper()
        }
      })
    },
    initSwiper() {
      this.$nextTick(() => {
      new Swiper('.member-swiper', {
          navigation: {
            nextEl: '.member-swiper .next',
            prevEl: '.member-swiper .prev'
          },
          slidesPerView: 4
        })
      })
    }
  },
  mounted() {
    this.getData()
    this.getCertificatesImages()
    if (this.$route.query.activeId !== undefined) {
      this.scrollIntoView(`item-${this.$route.query.activeId}`)
    }
  }
}
</script>
<style lang="less" scoped>
.about-us {
   .certificate.content{
     position: relative;
          .arrow{
        position: absolute;
        z-index: 2;
        top: 50%;
        transform: translateY(-50%);
        &.left{
            transform: translateY(-50%) rotate(180deg);
        }
      }
  }
    .certificate-swiper{
      display: block;
      width: 100%;
      position: absolute;
      z-index: -99;
      opacity: 0;
      visibility: hidden;
      .swiper-slide>div{
       background-size: cover;
        background-position: center;
        width: 100%;
      }
      &.show{
      position: relative;
      z-index: 1;
      opacity: 1;
      visibility:visible;
      }
    }
  .banner {
    width: 100%;
    background-size: cover;
    background-position: center;
    background-image: url(../assets/images/aboutus_bg.jpg);
  }
  .description {
    color: #858585;
  }
  ul.data {
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    li {
      text-align: center;
      position: relative;
      &:after {
        position: absolute;
        z-index: 15;
        top: 15%;
        right: 0;
        bottom: auto;
        left: auto;
        display: block;
        width: 1px;
        height: 70%;
        content: "";
        -webkit-transform-origin: 50% 0;
        transform-origin: 50% 0;
        background-color: #e7e7e7;
      }
      &:last-child::after {
        display: none;
      }
      h1 {
        font-size: 36px;
        color: @mainColor;
        em {
          margin-left: 5px;
          font-size: 14px;
          font-weight: normal;
          font-style: normal;
          color: #858585;
        }
      }
      p {
        color: #858585;
      }
    }
  }
}
@media screen and (min-width: 641px) {
  .about-us {
    .preview-list{
      width: 100%;
      list-style: none;
      display: flex;
      flex-wrap: wrap ;
      height: 600px;
    overflow: auto;
        &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    &::-webkit-scrollbar-button {
        display: none;
    }
    &::-webkit-scrollbar-track {
        border-radius: 15px;
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 0;
        border-style: dashed;
        background-color: #b3b9b9;
        border-color: transparent;
        border-width: 1.5px;
        background-clip: padding-box;
    }
    &::-webkit-scrollbar-thumb:hover {
        height: 13px !important;
        width: 13px !important;
        background: rgba(117, 96, 145, 0.5);
    }
    &::-webkit-scrollbar-corner {
        display: none;
    }
      >li{
        width: calc(~"33.33% - 30px");
        position: relative;
        margin: 15px;
        cursor: pointer;
        .mask{
          display: none;
        }
        &:hover{
          .mask{
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    background-image: linear-gradient(45deg, #0099ff, #07cbd4);
    opacity: 0.6;
          }
        }
      }
      .surface{
        width: 100%;
        height: 0;
        padding-bottom: 65%;
        background-size: cover;
        border-radius: 3px;
      }
    }
    .certificate.content{
        padding-left: 300px;
      .arrow{
        &.prev.left{
           left: 250px;
           top:85%;
        }
       &.next.right{
           left:250px;
               top:92%;
        }
      }
    }
      .certificate-swiper{
      .swiper-slide>div{
        height: 600px;
      }
    }
    padding-bottom: 100px;
    overflow: auto;
    min-width: 1180px;
    .banner {
      min-width: 1180px;
      height: 500px;
    }
    .content {
      width: 1180px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 250px;
      min-height: 250px;
      > .description {
        color: #858585;
        padding: 0 50px;
        margin-bottom: 10px;
        line-height: 24px;
      }
      ul.data {
        margin-top: 50px;
        li{
          margin-bottom: 10px;
        }
      }
      .member {
        display: flex;
        margin-bottom: 100px;
        > .description {
          background-image: none !important;
          width: 25%;
          h1 {
            font-weight: 500;
            color: @mainColor;
            margin-top: 15px;
            margin-bottom: 10px;
          }
          > h2 {
            font-weight: 500;
            font-size: 18px;
          }
          > p {
            span {
              color: @mainColor;
              font-weight: bold;
              font-size: 46px;
              margin-right: 5px;
            }
          }
          > * {
            width: 200px;
            margin-left: auto;
            margin-right: auto;
          }
          .avatar {
            display: block;
            background-size: cover;
            background-position: center;
            height: 200px;
          }
        }
        .main-info {
          width: 75%;
          color: #858585;
          padding-left: 50px;

          .customer {
            display: block;
            width: 160px;
            height: 56.66px;
            background-size: cover;
            background-position: center;
            float: left;
          }
          > p {
            margin-bottom: 10px;
          }
          h4 {
            font-weight: normal;
            font-size: 16px;
          }
          h2 {
            color: #858585;
            position: relative;
            font-weight: 500;
            padding-top: 8px;
            margin-bottom: 10px;
            margin-top: 30px;
            &:first-child {
              margin-top: 0;
            }
            &::before {
              content: "";
              display: block;
              position: absolute;
              width: 30px;
              height: 2px;
              top: 0;
              left: 0;
              background-color: #c9c9c9;
            }
          }
        }
      }
    }

    .current-info {
      margin-right: auto;
      margin-left: auto;
      width: 1050px;
      p {
        font-size: 12px;
        > span {
          font-size: 30px;
          color: @mainColor;
          font-weight: bold;
          margin-right: 5px;
        }
      }
      h4 {
        font-weight: normal;
      }
      .customer {
        display: block;
        width: 160px;
        height: 56.66px;
        background-size: cover;
        background-position: center;
        float: left;
      }
      > div {
        display: flex;
        align-items: center;
        margin-top: 30px;
        > * {
          &:first-child {
            width: 10%;
            flex-shrink: 0;
          }
          margin-right: 50px;
        }
      }
      h2 {
        color: #858585;
        position: relative;
        font-weight: 500;
        padding-top: 8px;
        margin-bottom: 10px;
        margin-top: 30px;
        font-size: 18px;
        &:first-child {
          margin-top: 0;
        }
        &::before {
          content: "";
          display: block;
          position: absolute;
          width: 30px;
          height: 2px;
          top: 0;
          left: 0;
          background-color: #c9c9c9;
        }
      }
    }

    .other-member {
      background-color: #f8f8f8;
      overflow: auto;
      .content {
        margin-top: 50px;
        width: 1180px;
        // padding-right: 20px;
        padding-left: 0px;
        margin-left: auto;
        margin-right: auto;
        .member-swiper {
          position: relative;
          padding-right: 30px;
          padding-left: 30px;
          .next,
          .prev {
            position: absolute;
            z-index: 2;
            top: 40%;
          }
          .next {
            right: 0;
          }
          .left {
            left: 0;
          }
        }
        .swiper-slide {
          width: 25%;
          height: 340px;
          em {
            display: block;
            position: absolute;
            width: 200px;
            height: 200px;
            top: 0;
            margin-left: auto;
            margin-right: auto;
            z-index: 2;
            background-image: linear-gradient(45deg, #0099ff, #07cbd4);
            margin-left: 40px;
            opacity: 0.5;
          }
          h1 {
            font-weight: 500;
            color: @mainColor;
            font-size: 24px;
            line-height: 56px;
          }
          h2 {
            font-size: 16px;
            color: #858585;
            font-weight: normal;
            line-height: 26px;
          }
          > * {
            width: 200px;
            margin-left: auto;
            margin-right: auto;
          }
          > span {
            cursor: pointer;
            display: block;
            margin-left: auto;
            margin-right: auto;
            background-size: cover;
            background-position: center;
            width: 200px;
            height: 200px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .about-us {
    .preview-list{
      display: none;
    }
    .certificate{
       .arrow{
        position: absolute;
        z-index: 99;
        top: 50%;
        transform: translateY(-50%);
        &.left{
            transform: translateY(-50%) rotate(180deg);
        }
        &.prev.left{
           left: 15px;
        }
       &.next.right{
           right: 15px;
        }
      }
    }
    .certificate-swiper{
      position: relative;
      z-index: 1;
      opacity: 1;
      visibility:visible;
      .swiper-slide>div{
        height: 300px;
        width: 100%;
      }
    }
    .other-member,
    .current-info {
      display: none;
    }
    .banner {
      height: 160px;
    }
    .content {
      padding: 0 20px;
      min-height: 200px;
      &.certificate{
        padding: 0;
      }
      ul.data {
        margin-top: 50px;
        margin-bottom: 50px;
        li {
          width: 50% !important;
          &:nth-child(even):after {
            display: none;
          }
        }
      }
      &.team {
        padding: 0;
        .member {
          // margin-bottom: 50px;
          .description {
            height: 0;
            padding-bottom: 80%;
            padding-left: 30px;
            background-size: cover;
            overflow: hidden;
            .avatar {
              display: none;
            }
            h1 {
              color: @mainColor;
              font-size: 22px;
              font-weight: 500;
              margin-top: 36%;
              margin-bottom: 5px;
            }
            h2 {
              color: #fff;
              font-weight: normal;
              font-size: 14px;
              line-height: 26px;
            }
            p {
              color: #fff;
              span {
                color: @mainColor;
                font-weight: bold;
                font-size: 38px;
                margin-right: 5px;
              }
            }
          }
          .main-info {
            > h4:last-child,
            > p:last-child {
              margin-bottom: 50px;
            }
            padding: 0 20px;
            .customer-wrapper {
              overflow: auto;
              margin-bottom: 50px;
            }
            .customer {
              display: block;
              width: 25%;
              height: 0;
              padding-bottom: 10%;
              background-size: cover;
              background-position: center;
              float: left;
            }
            h4 {
              font-weight: normal;
            }
            h2 {
              font-size: 16px;
              position: relative;
              font-weight: 500;
              padding-top: 8px;
              margin-bottom: 10px;
              margin-top: 20px;
              // &:first-child {
              //   margin-top: 20px;
              // }
              &::before {
                content: "";
                display: block;
                position: absolute;
                width: 15px;
                height: 1px;
                top: 0;
                left: 0;
                background-color: #c9c9c9;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .about-us ul.data li:after {
    transform: scaleX(0.5);
  }
}

@media only screen and (-webkit-min-device-pixel-ratio: 3) {
  .about-us ul.data li:after {
    transform: scaleX(0.33);
  }
}
</style>