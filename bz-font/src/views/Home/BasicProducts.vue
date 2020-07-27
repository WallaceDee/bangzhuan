<template>
    <Block :value="blockInfo">
      <div class="basic-products" v-lazy:background-image="$store.state.width>640?require('../../assets/images/basic_products_bg.png'):require('../../assets/images/basic_products_bg_m.png')">
        <ul>
          <li v-for="(item,index) in list" :key="item.id" @click="go2Product(index)">
            <span v-lazy:background-image="item.icon"></span>
            <h3>{{item.label}}</h3>
            <pre>{{item.description}}</pre>
            <div class="bg" v-lazy:background-image="item.icon"></div>
          </li>
        </ul>
      </div>
    </Block>
</template>
<script>
export default {
  name: 'BasicProducts',
  data() {
    return {}
  },
  computed: {
    blockInfo() {
      return this.$store.state.productMenu[1]
    },
    list() {
      if (this.$store.state.productMenu.length) {
        return this.$store.state.productMenu[1].children
      } else {
        return []
      }
    }
  },
  methods:{
    go2Product(index){
      this.$router.push({
        name:'Products',
        params:{
          type:'2'
        },
        query:{
          activeId:index
        }
      })
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.basic-products {
  background-size: cover;
  overflow: auto;
  ul,
  li {
    list-style: none;
  }

  li {
    cursor: pointer;
    border-radius:3px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    background-color: #fff;
    text-align: center;
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
    span {
      display: block;
      margin-left: auto;
      margin-right: auto;
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
    h3 {
      color: #212121;
      margin-top: 10px;
      white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    }
    pre {
      font-size: 16px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      line-height: 30px;
    }
  }
}

@media screen and (min-width: 641px) {
  .basic-products {
    // background-image: url(../../assets/images/basic_products_bg.png);
    background-position: right;
    height: 650px;
    ul {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        height: 280px;
        width: 200px;
        margin-right: 30px;
        .bg {
          background-size: 120%;
          background-position: 70px 90px;
        }
        > span {
          margin-top: 30px;
          display: block;
          height: 70px;
          width: 70px;
        }
        &:last-child {
          margin-right: 0;
        }
        transition: transform 0.5s;
        &:nth-child(odd) {
          transform: translateY(-25%);
        }
        &:nth-child(even) {
          transform: translateY(25%);
        }
        &:nth-child(even):hover {
          transform: translateY(calc(~"25% - 20px"));
        }
        &:nth-child(odd):hover {
          transform: translateY(calc(~"-25% + 20px"));
        }
      }
    }
  }
}

@media screen and (max-width: 640px) {
  .basic-products {
    // background-image: url(../../assets/images/basic_products_bg_m.png);
    background-position: bottom;
    ul {
      width: 370px;
      overflow: auto;
      margin: 30px auto;
      li {
        width: 170px;
        height: 200px;
        float: left;
        margin-bottom: 20px;
        &:nth-child(odd) {
          margin-right: 30px;
        }
        .bg {
          background-size: 100%;
          background-position: 90px 65px;
        }
        > span {
          margin-top: 15px;

          height: 60px;
          width: 60px;
        }
        > h3 {
          font-size: 15px;
          margin-top: 5px;
        }
        > pre {
          font-size: 14px;
          line-height: 20px;
          margin: 10px 0;
        }
      }
    }
  }
}
@media screen and (max-width: 440px) {
  .basic-products {
    ul {
      width: 330px;
      li {
        width: 150px;

      }
    }
  }
}
</style>