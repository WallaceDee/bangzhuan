<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>基础设置</BreadcrumbItem>
      <BreadcrumbItem>地域管理</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Button type="primary" @click="openCreatePopup">新建地域</Button>
    <Divider />
    <Table :columns="columns" :data="data" :loading="loading" stripe></Table>
    <Divider />
    <Page :current="page" :total="total" show-total @on-change="onPageChange" />
    <Drawer :title="drawerTitle" v-model="drawerVisible" width="720">
      <Form :model="form" :label-width="120" ref="form" :rules="rules">
        <FormItem prop="realmName" label="地域选择">
          <Cascader v-model="form.codes" :data="province" :load-data="loadCity" @on-visible-change="onCascaderShow"></Cascader>
        </FormItem>
      </Form>
      <div class="drawer-footer">
        <Button style="margin-right: 8px" @click="drawerVisible=false">取消</Button>
        <Button type="primary" @click="doSumbit">提交</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import {
  getConfiguredCity,
  getProvince,
  getCity,
  setCityEnable,
  serCityDisable
} from '@/api/wechat/'
export default {
  name: 'Users',
  data() {
    return {
      province: [],
      editMode: false,
      total: 0,
      page: 1,
      form: {
        codes: []
      },
      rules: {},
      drawerVisible: false,
      loading: false,
      data: [],
      columns: [
        {
          title: '地域',
          key: 'name',
          align: 'center',
          minWidth: 150
        },
        {
          title: '操作',
          align: 'center',
          width: 250,
          render: (h, params) => {
            return [
              h(
                'Poptip',
                {
                  props: {
                    placement: 'bottom',
                    transfer: true,
                    confirm: true,
                    title: `您确认要删除这个地域吗？`
                  },
                  on: {
                    'on-ok': () => {
                      this.serCityDisable(params.row)
                    }
                  }
                },
                [
                  h(
                    'Button',
                    {
                      props: {
                        size: 'small'
                      }
                    },
                    '删除'
                  )
                ]
              )
            ]
          }
        }
      ]
    }
  },
  computed: {
    drawerTitle() {
      return (this.editMode ? '编辑' : '新建') + '地域'
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    formatter(a) {
      console.log(a)
    },
    loadCity(item, callback) {
      console.log(item)
      item.loading = true
      getCity({
        code: item.value
      }).then((res) => {
        if (res.code === 80200) {
          res.data.map((item) => {
            item.label = item.name
            item.value = item.code
          })
          item.children = res.data
        }
        item.loading = false
        callback()
      })
    },
    loadProvince() {
      getProvince().then((res) => {
        if (res.code === 80200) {
          this.province = res.data
          this.province.map((item) => {
            item.label = item.name
            item.value = item.code
            item.loading = false
            item.children = []
          })
        }
      })
    },
    onCascaderShow() {
      this.loadProvince()
    },
    getData(current) {
      this.loading = true
      getConfiguredCity({
        current: current || this.page,
        size: 10
      }).then((res) => {
        if (res.code === 80200) {
          this.loading = false
          this.data = res.data.records
          this.total = res.data.total
        }
      })
    },
    doSumbit() {
      let code=this.form.codes[this.form.codes.length-1]
      setCityEnable({
        code
      }).then(res => {
         this.getData()
         this.drawerVisible=false
          this.$Notice[res.code === 80200?'success':'error']({
            title: '提示',
            desc: res.msg
          })
      })
    },
    serCityDisable(item) {
      serCityDisable({
        code: item.code
      }).then((res) => {
          this.getData()
          this.$Notice[res.code === 80200?'success':'error']({
            title: '提示',
            desc: res.msg
          })
      })
    },
    onPageChange(page) {
      this.page = page
      this.getData()
    },
    openCreatePopup() {
      this.editMode = false
      this.drawerVisible = true
      this.$refs.form.resetFields()
    },
    openUpdatePopup(data) {
      this.editMode = true
      this.drawerVisible = true
      this.form = data
    }
  }
}
</script>
<style lang="less">
</style>