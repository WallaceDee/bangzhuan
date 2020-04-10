<template>
  <div class="overseas">
    <Title :title="title" style="min-height:600px">
        <Spin fix v-if="loading"></Spin>
      <div class="banner-content">
        <img src="../../assets/images/map.jpg" alt />
      </div>
      <div :id="`item-${index}`" class="oversea-item" v-for="(item,index) in list" :key="item.id">
        <div class="content">
          <div class="m-cover" :style="`background-image:url(${item.cover});`">
            <h1>
              <span>
                <b>{{item.description[0]}}</b>
                {{item.description.substr(1)}}-
              </span>
              {{item.title}}
            </h1>
            <h2>
              <b>{{item.description[0]}}</b>
              {{item.description.substr(1)}}
            </h2>
          </div>
          <div>{{item.content}}</div>
          <div class="cover" :style="`background-image:url(${item.cover});`"></div>
        </div>
      </div>
    </Title>
  </div>
</template>
<script>
import { getProductList } from "../../api/";
export default {
  name: "Oversea",
  data() {
    return {
      loading:false,
      list: []
    };
  },
  watch: {
    "$route.query.activeId"(val) {
      if (val) {
        this.scrollIntoView(`item-${val}`);
      }
    }
  },
  computed: {
    type() {
      return this.$route.params.type;
    },
    title() {
      if (this.$store.state.productMenu.length) {
        return this.$store.state.productMenu[this.type - 1];
      } else {
        return {};
      }
    }
  },
  methods: {
    scrollIntoView(id) {
      document.getElementById(id).scrollIntoView();
    },
    getData() {
      this.loading=true
      getProductList({
        type: this.type,
        rows: 99
      }).then(res => {
        if (res.status) {
           this.loading=false
          this.list = res.data.rows;
          this.$nextTick(() => {
            if (this.$route.query.activeId) {
              this.scrollIntoView(`item-${this.$route.query.activeId}`);
            }
          });
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.oversea-item {
  padding-top: 40px 0;
  h1 {
    color: #202020;
  }
  h2 {
    b {
      color: #202020;
    }
    .content {
      > div:nth-child(1) {
        line-height: 30px;
      }
    }
  }
}
@media screen and (min-width: 641px) {
  .overseas {
    .banner-content {
      width: 1180px;
      margin-right: auto;
      margin-left: auto;
      padding: 0 50px;
      img {
        width: 100%;
      }
    }
  }
  .oversea-item {
    padding: 30px 0;
    &:nth-child(odd) {
      background-color: #fff;
    }
    &:nth-child(even) {
      background-color: #f8f8f8;
    }

    .content {
      width: 1180px;
      margin-right: auto;
      margin-left: auto;
      padding: 0 50px;
      display: flex;
      > div:first-child {
        background-image: initial !important;
        flex-shrink: 0;
        width: 25%;
        font-size: 12px;
        color: #000;
        h1 > span {
          display: none;
        }
        h2 {
          b {
            color: #000;
          }
          font-size: 26px;
          font-weight: normal;
          color: #d1d1d1;
        }
      }
      > div:nth-child(2) {
        color: #858585;
        line-height: 30px;
        letter-spacing: 1px;
      }
      > div.cover {
        flex-shrink: 0;
        width: 320px;
        height: 200px;
        margin-left: 50px;
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .overseas {
    .banner-content {
             margin-bottom: 20px;
      img {
        width: 100%;
      }
    }
  }
  .oversea-item {
    margin-bottom: 20px;
    > div:first-child {
      h2 {
        display: none;
      }
    }
    .content {
      .m-cover {
        background-size: cover;
        background-position: center;
        height: 0;
        padding-bottom: 40%;
        position: relative;
        h1 {
          width: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          color: #fff;
          position: absolute;
          bottom: 0;
          font-size: 16px;
          font-weight: 500;
          height: 35px;line-height: 35px;
          padding-left: 20px;
        }
        
      }
            > div:nth-child(2) {
              padding:  20px;
        color: #858585;
        line-height: 26px;
        letter-spacing: 1px;
      }
      > div.cover {
        display: none;
      }
    }
  }
}
</style>