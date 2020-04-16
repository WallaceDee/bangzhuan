<template>
    <Block :value="blockInfo">
      <div class="news">
        <div class="latest" @click="go2Detail(latest.id)">
          <div class="inner">
            <h4>{{getDate(latest.createTime,'mmdd','-')}}</h4>
            <h3>{{latest.title}}</h3>
            <p class="article" v-html="latest.content.replace(/<.*?>/g,'')"></p>
            <span :style="`background-image:url(${latest.cover})`"></span>
            <em class="more">→ MORE</em>
          </div>
        </div>
        <div class="list">
          <ul>
            <li @click="go2Detail(item.id)" v-for="(item,index) in list" v-if="index" :key="item.id">
              <h3>
                {{item.title}}
                <span>{{getDate(item.createTime,'mmdd','-')}}</span>
              </h3>
              <p class="article" v-html="item.content.replace(/<.*?>/g,'')"></p>
            </li>
          </ul>
        </div>
      </div>
    </Block>
</template>
<script>
import { getNewsList } from '../../api/'
import { getDate } from '../../libs/tools'
export default {
  name: 'News',
  data() {
    return {
      blockInfo: {
        subTitle: 'PATENT INFORMATION',
        label: '专利情报',
        description: '从权威专利数据获取竞争、市场情报'
      },
      list: []
    }
  },
  watch: {},
  computed: {
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
        go2Detail(id) {
      this.$router.push({
        name: 'NewsDetail',
        params: {
          id
        }
      })
    },
    getDate,
    getNewsList() {
      getNewsList({
        page: 1,
        rows: 4
      }).then(res => {
        if (res.status) {
          this.list = res.data.rows
        }
      })
    }
  },
  mounted() {
    this.getNewsList()
  }
}
</script>
<style lang="less" scoped>
.news {
  .latest {
    .inner {
      overflow: hidden;
      > p {
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        position: relative;
        ::before {
          display: block;
          position: absolute;
          top: 5px;
          left: 0;
          content: "";
          width: 1px;
          background-color: #c9c9c9;
          height: 30px;
        }
      }
      > span {
        display: block;
        width: 100%;
        background-size: cover;
        background-position: center;
      }
      em.more {
        font-size: 14px;
        font-style: normal;
        display: inline-block;
        width: 100%;
        text-align: right;
        line-height: 40px;
        color: #858585;
      }
    }
  }
  .list {
    li {
      position: relative;
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
        background-color: #e7e7e7;
      }
      > p {
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        position: relative;
        &:after {
          content: "→";
          position: absolute;
          right: 20px;
          bottom: 40px;
          transition: right 0.5s;
        }
      }
      > h3 {
        margin-bottom: 10px;
        > span {
          font-weight: normal;
          float: right;
        }
      }
      &:hover {
        > h3 {
          color: @mainColor;
        }
        > p:after {
          color: @mainColor;
          right: 0;
        }
      }
    }
  }
}

@media screen and (min-width: 641px) {
  .news {
    width: 1180px;
    margin-left: auto;
    margin-right: auto;
    overflow: auto;
    z-index: 1;
    margin-bottom: 50px;
    .latest {
      transition: all 0.5s;
      cursor: pointer;
      float: left;
      width: 45%;
      background-image: url(../../assets/images/news_bg.png);
      height: 405px;
      background-position: top left;
      background-repeat: no-repeat;
      .inner {
        position: relative;
        z-index: 2;
        background-color: #f8f8f8;
        margin-top: 25px;
        margin-left: 25px;
        height: calc(~"100% - 25px");
        width: calc(~"100% - 25px");
        transition: all 0.5s;
        padding: 50px 40px 10px 40px;
        > span {
          transition: all 0.5s;
          height: 150px;
          margin-top: 10px;
        }
        h4 {
          font-size: 20px;
        }
        h3 {
          margin-top: 10px;
          margin-bottom: 10px;
        }
        p {
          height: 44px;
          position: relative;
          padding-left: 20px;

        }
      }
      &:hover {
        background-position: 5px 5px;
        .inner {
          margin-top: 20px;
          margin-left: 20px;
          h3,
          h4,
          em {
            color: @mainColor;
          }
          > span {
            background-position: 55% 55%;
          }
        }
      }
    }
    .list {
      margin-top: 25px;
      float: left;
      width: 55%;
      padding-left: 50px;
      li {
        cursor: pointer;
        min-height: 120px;
        position: relative;
        padding: 25px 20px;
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
          background-color: #e7e7e7;
        }
        > p {
          padding-right: 100px;
                   overflow: hidden;
                   height: 44px;
          &:after {
            content: "→";
            position: absolute;
            right: 20px;
            bottom: 20px;
            transition: right 0.5s;
          }
        }
        > h3 {
          margin-bottom: 10px;
          > span {
            font-weight: normal;
            float: right;
          }
        }
        &:hover {
          > h3 {
            color: @mainColor;
          }
          > p:after {
            color: @mainColor;
            right: 0;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .news {
    .latest {
      transition: all 0.5s;
      .inner {
        position: relative;
        background-color: #f8f8f8;
        padding: 20px 30px 10px 30px;
        > span {
          transition: all 0.5s;
          height: 150px;
          margin-top: 10px;
        }
        h4 {
          font-size: 14px;
          font-weight: normal;
          color: #858585;
        }
        h3 {
          margin-top: 10px;
          margin-bottom: 10px;
        }
        p {
          height: 44px;
          position: relative;
          padding-left: 20px;
          &::before {
            content: "";
            width: 1px;
            height: 100%;
          }
        }
      }
    }
    .list {
      padding: 0 20px;
      ul {
        padding-left: 15px;
        margin-bottom: 30px;
      }
      li {
        padding: 15px 15px 15px 0;
        > p {
          height: 44px;
          padding-right: 50px;
          &:after {
            bottom: 10px;
          }
        }
        h3 {
          span {
            font-size: 14px;
          }
        }
        &:last-child:after{
            display: none;
        }
      }
    }
  }
}
</style>