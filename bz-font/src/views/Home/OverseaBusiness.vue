<template>
  <div>
    <Block :value="blockInfo">
      <div class="oversea-business">
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
import { getImages } from '../../api/'
export default {
  name: 'OverseaBusiness',
  data() {
    return {
      col: 8,
      list: []
    }
  },
  watch: {
    '$store.state.width'(val) {
      if (val > 640) {
        this.col = 8
      } else {
        this.col = 4
      }
    }
  },
  computed: {
    span() {
      return 24 / this.col
    },
    blockInfo() {
      return this.$store.state.productMenu[2]
    }
  },
  methods: {
    getImages() {
      getImages({
        path: '/images/flag'
      }).then(res => {
        this.list = res.list
      })
    }
  },
  mounted() {
    this.getImages()
    if (document.body.clientWidth > 640) {
      this.col = 8
    } else {
      this.col = 4
    }
  }
}
</script>
<style lang="less" scoped>
.oversea-business {
}

span {
  display: block;
  margin-right: auto;
  margin-left: auto;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  background-size: cover;
  background-position: center;
}
@media screen and (min-width: 641px) {
  .oversea-business {
    padding-top: 40px;
    overflow: auto;
    background-image: url(../../assets/images/oversea_business_bg.png);
    background-size: cover;
    height: 400px;
    background-position: center bottom;
    .ivu-row {
      width: 1180px;
      margin: 0 auto;
    }
  }

  span {
    width: 95px;
    height: 50px;

    margin-bottom: 20px;
  }
}
@media screen and (max-width: 640px) {
  .oversea-business {
    margin-bottom: 30px;
    .ivu-row {
      padding: 0 20px;
    }
    span {
      width: 70%;
      height: 0;
      padding-bottom: 37%;
      margin-bottom: 20px;
    }
  }
}
</style>