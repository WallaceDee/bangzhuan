<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>基础设置</BreadcrumbItem>
      <BreadcrumbItem>用户管理</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Button type="primary" @click="openModal">新建用户</Button>
    <Divider />
    <Table :row-class-name="rowClassName" :columns="columns" :data="data" :loading="loading" stripe></Table>
    <Modal title="新建用户" v-model="modalVisible" @on-ok="onModalOkClick">
      <Form :model="form" :rules="rules" ref="form">
        <FormItem prop="username" label="用户名">
          <Input v-model="form.username"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { userList, getUserAvailable, createUser } from '@/api/manage/'
export default {
  name: 'Users',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'))
      }
      getUserAvailable({
        username: value
      }).then(res => {
        if (res.status && !res.data.exist) {
          return callback()
        } else {
          return callback(new Error('该用户已存在'))
        }
      })
    }
    return {
      form: {
        username: ''
      },
      modalVisible: false,
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }]
      },
      loading: false,
      columns: [
        {
          title: '帐号',
          key: 'username',
          align: 'center',
          width: 150
        },
        {
          title: '头像/名字',
          width: 150,
          align: 'center',
          render: function(h, params) {
            return h(
              'div',
              {
                style: {
                  lineHeight: '30px',
                  display: 'flex'
                }
              },
              [
                h('span', {
                  class: ['avatar'],
                  style: {
                    display: 'inline-block',
                    width: '30px',
                    height: '30px',
                    backgroundSize: 'cover',
                    borderRadius: '50px',
                    backgroundImage: `url(${params.row.avatar})`
                  }
                }),
                params.row.nickname
              ]
            )
          }
        },
        {
          title: '职位',
          key: 'job',
          align: 'center',
          width: 150
        },
        {
          title: '邮箱',
          key: 'email',
          align: 'center',
          minWidth: 160
        },
        {
          title: '是否订阅',
          align: 'center',
          width: 150,
          render: function(h, params) {
            return h('span', params.row.isSubscribe ? '是' : '否')
          }
        }
      ],
      data: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    onModalOkClick() {
      createUser(this.form)
    },
    openModal() {
      this.modalVisible = true
    },
    rowClassName(row, index) {
      if (row.isSubscribe === 1) {
        return 'demo-table-info-row'
      }
      return ''
    },
    getData() {
      this.loading = true
      userList().then(res => {
        if (res.status) {
          this.loading = false
          this.data = res.data.rows
        }
      })
    }
  }
}
</script>
<style lang="less">
.ivu-table .demo-table-info-row td {
  background-color: @mainColor;
}
</style>