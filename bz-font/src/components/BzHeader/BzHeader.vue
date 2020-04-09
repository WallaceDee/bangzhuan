<template>
  <div class="header" :style="`background-color:rgba(0,0,0,${scrollTop/100});${navsVisible?'':'border-bottom:none;'}`" >
    <div class="content">
      <div class="logo-wrapper">
        <a href="/">
          <img class="logo" src="../../assets/images/logo.svg" alt />
          <img src="../../assets/images/slogan.png" alt />
        </a>
      </div>
      <div class="nav" v-show="!collapsed" v-if="navsVisible">
        <div id="slider"></div>
        <ul>
          <li
            :class="{'active':currentIndex[0]===index}"
            @click="onClick(index)"
            @mouseenter="onMouseenter(index)"
            @mouseleave="onMouseleave"
            v-for="(item,index) in navs"
            :key="item.subLabel"
          >
            <h1>{{item.label}}</h1>
            <p>{{item.subLabel}}</p>
            <transition name="fade">
              <ul class="sub-list" v-if="item.children" v-show="lastIndex===index&&over">
                <li
                  :class="{'active':currentIndex[1]===index1}"
                  v-for="(subNav,index1) in item.children"
                  :key="subNav.label"
                  @click.stop="onSubTitleClick(`${index}-${index1}`)"
                >
                  <h2>{{subNav.label}}</h2>
                  <ul>
                    <li
                      :class="{'active':currentIndex[1]===index1&&currentIndex[2]===index2}"
                      @click.stop="onSubMenuClick(`${index}-${index1}-${index2}`)"
                      v-for="(subItem,index2) in subNav.children"
                      :key="subItem.label"
                    >{{subItem.label}}</li>
                  </ul>
                </li>
              </ul>
            </transition>
          </li>
        </ul>
      </div>
      <button @click="handelNavCollapse" class="navbar-toggler" :class="{'collapsed':collapsed}">
        <span class="togler-icon-inner">
          <span class="line-1"></span>
          <span class="line-2"></span>
          <span class="line-3"></span>
        </span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BzHeader',
  props: {
    productMenu: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      scrollTop: 0,
      currentName: '0',
      collapsed: true,
      lastIndex: 0,
      over: false,
      navs: [
        {
          label: '首页',
          subLabel: 'HOME',
          name: 'Home'
        },
        {
          label: '产品与服务',
          subLabel: 'PRODUCTS',
          name: 'Products',
          children: []
        },
        {
          label: '专利情报',
          subLabel: 'NEWS',
          name: 'NewsList'
        },
        {
          label: '关于我们',
          subLabel: 'ABOUT US',
          name: 'AboutUs'
        }
      ]
    }
  },
  watch: {
    productMenu(val) {
      this.navs[1].children = val
    },
    lastIndex(val) {
      let lis = document.querySelectorAll('.nav>ul>li')
          if(val!==-1&&lis.length>val){
          slider.style.left = lis[val].offsetLeft + 'px'
          slider.style.width = lis[val].offsetWidth + 'px'
      }
    }
  },
  computed: {
    navsVisible(){
      return !this.$route.meta.hideNav||this.$store.state.width<640
    },
    nameList() {
      let list = []
      this.navs.map(item => {
        list.push(item.name)
      })
      return list
    },
    currentIndex() {
      let temp = this.currentName.split('-')
      let index = []
      temp.map(item => {
        index.push(item * 1)
      })
      return index
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.body.onscroll = () => {
        this.scrollTop = window.pageYOffset
      }
      let current
      if (this.$route.name === 'NewsDetail') {
        current = 2
      } else {
        current = this.nameList.indexOf(this.$route.name)
      }
      this.lastIndex = current
      let nameList = [current.toString()]
      if (this.$route.params.type !== undefined) {
        nameList.push(this.$route.params.type * 1 - 1)
      }
      if (this.$route.query.activeId !== undefined) {
        nameList.push(this.$route.query.activeId)
      }
      this.currentName = nameList.join('-')
    })
  },
  methods: {
    onSubTitleClick(name) {
      this.over = false
      this.currentName = name
      this.collapsed = true
      this.$router.push({
        name: 'Products',
        params: {
          type: name.split('-')[1] * 1 + 1
        }
      })
    },
    onSubMenuClick(name) {
      this.over = false
      this.currentName = name
      this.collapsed = true
      this.$router.push({
        name: 'Products',
        params: {
          type: name.split('-')[1] * 1 + 1
        },
        query: {
          activeId: name.split('-')[2]
        }
      })
    },
    onClick(index) {
      this.currentName = index.toString()
      if (this.navs[index].children && this.navs[index].children.length) {
      } else {
        this.collapsed = true
      }
      if (index !== 1) {
        this.$router.push({
          name: this.navs[index].name
        })
      } else {
        this.$router.push({
          name: this.navs[index].name,
          params: {
            type: 1
          }
        })
      }
    },
    onMouseleave() {
      let lis = document.querySelectorAll('.nav>ul>li')
      slider.style.left = lis[this.currentIndex[0]].offsetLeft + 'px'
      slider.style.width = lis[this.currentIndex[0]].offsetWidth + 'px'
      this.lastIndex = this.currentIndex[0]
      this.over = false
    },
    onMouseenter(index) {
      this.lastIndex = index
      this.over = true
    },
    handelNavCollapse() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>
<style lang="less" scoped>
@media screen and (min-width: 641px) {
  .header {
    position: absolute;
    z-index: 999999;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 1180px;
    height: 100px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    .content {
      position: relative;
      height: 100px;
      width: 1180px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 50px;
      padding-right: 50px;
      .logo-wrapper {
        height: 100px;
        display: table-cell;
        vertical-align: middle;
        width: 320px;
        .logo {
          height: 35px;
          margin-right: 10px;
        }
      }
    }
    .nav {
      display: block !important;
      position: absolute;
      right: 50px;
      top: 0;
      #slider {
        position: absolute;
        width: 106px;
        height: 99px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.5s;
      }
      > ul {
        position: relative;
        z-index: 2;
        height: 100px;
        display: table-cell;
        vertical-align: middle;
        > li {
          position: relative;
          cursor: pointer;
          color: #fff;
          text-align: center;
          float: left;
          padding-right: 30px;
          padding-left: 30px;
          padding-top: 25px;
          height: 99px;
          &.active {
            // background-color: rgba(0, 0, 0, .5);
            > h1,
            > p {
              color: @mainColor;
            }
          }
          h1 {
            font-weight: normal;
            font-size: 18px;
            letter-spacing: 2px;
            margin-bottom: 2px;
          }
          p {
            letter-spacing: 1px;
          }
        }
      }
      ul,
      li {
        list-style: none;
      }
      .sub-list {
        position: absolute;
        width: 540px;
        display: flex;
        justify-content: space-between;
        left: 80px;
        top: 100px;
        transform: translateX(-50%);
        > li {
          text-align: left;
          float: left;

          h2 {
            padding-top: 10px;
            font-weight: normal;
            font-size: 17px;
            border-bottom: 1px solid #fff;
            line-height: 40px;
            padding-left: 15px;
          }
          &.active h2 {
            border-bottom-color: @mainColor;
          }
          > ul {
            background-color: rgba(255, 255, 255, 0.08);

            padding-top: 5px;
            padding-bottom: 10px;
            > li {
              font-size: 16px;
              line-height: 32px;
              padding-left: 15px;
              padding-right: 15px;
              &:hover,
              &.active {
                background-color: @mainColor;
              }
            }
          }
        }
      }
    }
    .navbar-toggler {
      display: none;
    }
  }
}
@media screen and (max-width: 640px) {
  .header {
    position: fixed;
    width: 100%;
    min-width: auto;
    z-index: 99999;

    &:after {
      position: absolute;
      z-index: 15;
      top: auto;
      right: auto;
      bottom: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 1px;
      content: "";
      transform-origin: 50% 0;
      background-color: rgba(255, 255, 255, 0.5);
    }
    .content {
      width: 100%;
      height: 50px;
      display: flex;

      align-items: center;
      justify-content: space-between;
    }
    .nav {
      position: absolute;
      height: calc(~"100vh - 50px");
      overflow: auto;
      width: 100%;
      top: 50px;
      #slider {
        display: none;
      }
      ul,
      li {
        list-style: none;
        color: #fff;
      }
      > ul {
        width: 100%;
        background-color: #000;
        > li {
          // display: flex;
          overflow: auto;
          padding-left: 40px;
          align-items: center;
          > h1 {
            float: left;
            height: 60px;
            line-height: 60px;
            font-size: 18px;
            font-weight: normal;
            margin-right: 15px;
          }
          > p {
            float: left;

            height: 60px;
            line-height: 60px;
            font-size: 16px;
          }
          .sub-list {
            clear: both;

            h2 {
              line-height: 40px;
              padding-left: 10px;
              font-size: 15px;
              color: rgba(255, 255, 255, 0.5);
              font-weight: normal;
            }
            ul > li {
              line-height: 40px;
              font-size: 15px;
              padding-left: 30px;
              color: rgba(255, 255, 255, 0.5);
            }
          }
        }
      }
    }
    .logo-wrapper {
      height: 22px;
      padding-left: 20px;
      a {
        display: inline-block;
        height: 22px;
        vertical-align: middle;
      }
      .logo {
        height: 22px;
      }
      img:last-child {
        height: 22px;
        margin-left: 10px;
      }
    }
    .navbar-toggler {
      float: right;
      margin-right: 10px;
      outline: none;
      background: transparent;
      border: none;
      .togler-icon-inner > span {
        display: block;
        background: #fff;
        height: 2px;
        margin: 5px;
        width: 24px;
        border-radius: 2px;
        -webkit-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        transition: all 0.3s ease;
      }

      .togler-icon-inner > span:nth-child(2) {
        width: 14px !important;
        margin-right: auto;
      }

      .togler-icon-inner > span:last-child {
        margin-bottom: 0;
      }
      &:not(.collapsed) {
        .togler-icon-inner > span:nth-child(1) {
          transform: rotate(-45deg) translate(-5px, 7px);
        }

        .togler-icon-inner > span:nth-child(3) {
          transform: rotate(45deg) translate(-3px, -5px);
        }

        .togler-icon-inner > span:nth-child(2) {
          opacity: 0;
        }
      }
    }
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    .header:after {
      transform: scaleY(0.5);
    }
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 3) {
    .header:after {
      transform: scaleY(0.33);
    }
  }
}
</style>