<template>
  <div>
    <Block :value="blockInfo">
      <div class="partners">
        <Row v-for="(row,rowIndex) in Math.ceil(list.length/col)">
          <Col
            :span="span"
            v-for="(item,index) in list"
            v-if="index>=rowIndex*col&&index<(rowIndex+1)*col"
          >
            <span :key="item.name" :style="`background-image:url(${item.url})`"></span>
          </Col>
        </Row>
      </div>
    </Block>
  </div>
</template>
<script>
import { getImagesSortList } from '../../api/'
export default {
  name: 'Partners',
  data() {
    return {
      blockInfo: {
        subTitle: 'INDUSTRY RECOGNITION',
        label: '业界肯定',
        description: '五年以上创新服务案例（排名不分先后）'
      },
      col: 6,
      list: []
    }
  },
  watch: {
    '$store.state.width'(val) {
      if (val > 640) {
        this.col = 6
      } else {
        this.col = 3
      }
    }
  },
  computed: {
    span() {
      return 24 / this.col
    }
  },
  methods: {
    getImages() {
      getImagesSortList({
        name: 'partner'
      }).then(res => {
        this.list = res.data
      })
    }
  },
  mounted() {
    this.getImages()
    if (document.body.clientWidth > 640) {
      this.col = 6
    } else {
      this.col = 3
    }
    window.addEventListener('resize', () => {
      this.width = document.body.clientWidth
    })
  }
}
</script>
<style lang="less" scoped>
.partners {
}

span {
  display: block;
  margin-right: auto;
  margin-left: auto;
  background-size: cover;
  background-position: center;
}
@media screen and (min-width: 641px) {
  .partners {
    padding-top: 40px;
    overflow: auto;
    height: 400px;
    .ivu-row {
      width: 1160px;
      margin: 0 auto;
    }
  }

  span {
width: 180px;
    height: 69px;
    margin-bottom: 45px;
  }
}
@media screen and (max-width: 640px) {
  .partners {
    margin-bottom: 30px;
    .ivu-row {
      padding: 0 20px;
    }
    span {
    width: 100%;
    height: 0;
    padding-bottom: 35%;
    margin-bottom: 20px;
    }
  }
}
</style>