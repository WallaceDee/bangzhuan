<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>用户列表</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <!-- <Table  :columns="columns" :data="data" :loading="loading" stripe></Table> -->
    <Row>
      <Spin fix  v-if="loading"></Spin>
      <Col span="16">
        <Avatar
          @click.native="onAvatarClick(item.openId)"
          v-for="item in  data"
          :src="item.headImg"
          size="large"
          :key="item.id"
          style="margin:5px;"
        >{{item.nickname}}</Avatar>
      </Col>
      <Col span="8" v-show="detail">
        <Card style="width:100%" v-if="detail">
          <Spin fix  v-if="detailLoading"></Spin>
          <div style="text-align:center">
            <Avatar  :src="detail.headImg" :size="80">{{detail.nickname}}</Avatar>
            <h3  style="margin:10px 0;">{{detail.nickname}}<Divider type="vertical" />{{detail.sex===1?'男':detail===2?'女':'未知'}}</h3>
            <p style="margin:10px 0;" v-show="detail.companyName||detail.jobName">{{detail.companyName}}<Divider type="vertical" />{{detail.jobName}}</p>
            <div>
              <Tag color="primary">{{detail.realmName||'未设置领域'}}</Tag>
              <Tag color="success" v-for="c in detail.ownedCities" :key="c.code">{{c.name}}</Tag>
              <Tag color="gold" v-for="r in detail.ownedRealms" :key="r.id">{{r.realmName}}</Tag>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    <Divider />
    <Page :current="page" :total="total" show-total @on-change="onPageChange" :page-size="size" />
  </div>
</template>
<script>
import { getUserList, getUserInfo } from '@/api/wechat/'
export default {
  name: 'Index',
  data() {
    return {
      data: [],
      total: 0,
      size: 100,
      page: 1,
      loading: false,
      detailLoading:false,
      detail: null
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    onAvatarClick(openId) {
      this.detailLoading = true
      getUserInfo({
        openId
      }).then((res) => {
        if (res.code === 80200) {
          this.detailLoading = false
          this.detail = res.data
        }
      })
    },
    getData() {
      this.loading = true
      getUserList({
        current: this.page,
        size: this.size
      }).then((res) => {
        if (res.code === 80200) {
          this.loading = false
          this.data = res.data.records
          this.total = res.data.total
        }
      })
    },
    onPageChange(page) {
      this.page = page
      this.getData()
    }
  }
}
</script>