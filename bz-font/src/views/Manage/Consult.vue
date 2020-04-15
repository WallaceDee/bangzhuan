<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>资源管理</BreadcrumbItem>
      <BreadcrumbItem>解决方案管理</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Form inline>
      <FormItem label="客户名字">
        <Input v-model="searchForm.name" size="small" style="width:100px"></Input>
      </FormItem>
      <FormItem label="电话">
        <Input v-model="searchForm.phone" size="small" style="width:100px"></Input>
      </FormItem>
      <FormItem label="咨询内容">
        <Input v-model="searchForm.content" size="small" style="width:100px"></Input>
      </FormItem>
      <FormItem label="备注">
        <Input v-model="searchForm.remark" size="small" style="width:100px"></Input>
      </FormItem>
      <FormItem label="状态">
        <Select v-model="searchForm.status" style="width:100px" size="small">
          <Option
            v-for="item in statusSelectList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </FormItem>
      <span style="display:inline-block;margin-top:38px;margin-right:50px;">
        <Button size="small" type="primary" @click="handleSearch">搜索</Button>
        <Button size="small" @click="handleSearch(true)" style="margin-left: 8px">重置</Button>
      </span>
      <FormItem label="订阅邮件">
           <Switch :value="$store.state.isSubscribe" @on-change="onSubscribeChange"  :true-value="1" :false-value="0"/>
      </FormItem>
    </Form>
    <Divider />
    <Table :columns="columns" :data="data" stripe :loading="loading"></Table>
    <Divider />
    <Page :current="page" :total="total" show-total @on-change="onPageChange" />
    <Modal v-model="popupVisible" @on-ok="onModalOk">
      <RadioGroup v-model="current.status" style="margin-bottom:10px;">
        <Radio :label="0">
          <span>未处理</span>
        </Radio>
        <Radio :label="1">
          <span>待沟通</span>
        </Radio>
        <Radio :label="2">
          <span>已处理</span>
        </Radio>
      </RadioGroup>
      <Input type="textarea" v-model="current.remark" placeholder="请输入备注"></Input>
    </Modal>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools.js'
import {
  getConsultList,
  setConsultRemarkAndStatus,
  deleteConsult,
  setSubscribeStatus
} from '@/api/manage/'
const statusMapping = new Map([
  [0, '未处理'],
  [1, '待沟通'],
  [2, '已处理']
])
let statusSelectList = []
statusMapping.forEach((item, index) => {
  statusSelectList.push({
    value: index,
    label: item
  })
})
export default {
  name: 'Consult',
  data() {
    return {
      loading:false,
      statusSelectList,
      current: {},
      popupVisible: false,
      remark: '',
      searchForm: {
        status: '',
        name: '',
        phone: '',
        content: '',
        remark: ''
      },
      searchRule: {
        status: '',
        name: '',
        phone: '',
        content: '',
        remark: ''
      },
      columns: [
        { fixed :'left',
          type: 'index',
          width: 80,
          align: 'center',
          title: '序号'
        },
        {
             fixed :'left',
          title: '客户名字',
          align: 'center',
          width: 120,
          key: 'name'
        },
        {
             fixed :'left',
          title: '电话',
          width: 135,
          align: 'center',
          key: 'phone'
        },
        {
              fixed :'left',
          title: '咨询内容',
          key: 'content',
          minWidth:150
        },
        {
          title: '咨询时间',
          key: 'createTime',
          align: 'center',
          width: 170,
          render: function(h, params) {
            return h('span', getDate(params.row.createTime, 'yyyymmddhhmmss'))
          }
        },
        {
          title: '状态',
          key: 'status',
          width: 100,
          render: function(h, params) {
            return h(
              'span',
              params.row.status === 2
                ? '已处理'
                : params.row.status === 1
                ? '待沟通'
                : '未处理'
            )
          }
        },
        {
          title: '备注',
          key: 'remark',
          minWidth:100
        },
        {
          title: '最后操作时间',
          key: 'updateTime',
          align: 'center',
          width: 170,
          render: function(h, params) {
            return h('span', getDate(params.row.updateTime, 'yyyymmddhhmmss'))
          }
        },
        {
          title: '最后操作人',
          align: 'center',
          width: 150,
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
          title: '操作',
          align: 'center',
          width:180,
          fixed :'right',
          render: (h, params) => {
            return [
              h(
                'Button',
                {
                  props: {
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.openRemarkModal(params.row)
                    }
                  }
                },
                '标记处理'
              ),
              h(
                'Poptip',
                {
                  props: {
                    placement: 'bottom',
                    transfer: true,
                    confirm: true,
                    title: `您确认要删除吗？`
                  },
                  on: {
                    'on-ok': () => {
                      this.delete(params.row.id)
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
      ],
      data: [],
      total: 0,
      page: 1
    }
  },
  mounted() {
    if(this.$route.query.phone&&this.$route.query.name){
      this.searchForm.name=this.$route.query.name
      this.searchForm.phone=this.$route.query.phone
      this.handleSearch()
    }else{
    this.getData()
    }
  },
  methods: {
    onSubscribeChange(status){
      setSubscribeStatus({isSubscribe:status}).then(res => {
        if(res.status){
          this.$Notice.success({
            title: '提示',
            desc: res.data.message
          })
        }
      })
    },
    handleSearch(isRest) {
      if (isRest === true) {
        this.searchForm = this.searchRule = {
          status: '',
          name: '',
          phone: '',
          content: '',
          remark: ''
        }
      } else {
        this.searchRule = JSON.parse(JSON.stringify(this.searchForm))
      }
      this.getData()
    },
    onPageChange(page) {
      this.page = page
      this.getData()
    },
    delete(id) {
      deleteConsult({
        id
      }).then(res => {
        if (res.status) {
          this.$Notice.success({
            title: '提示',
            desc: res.data.message
          })
          this.getData()
        }
      })
    },
    onModalOk() {
      setConsultRemarkAndStatus(this.current).then(res => {
        if (res.status) {
          this.$Notice.success({
            title: '提示',
            desc: res.data.message
          })
          this.getData()
        }
      })
    },
    openRemarkModal(consul) {
      this.current = JSON.parse(JSON.stringify(consul))
      this.popupVisible = true
    },
    getData() {
      this.loading=true
      getConsultList({
        page: this.page,
        ...this.searchRule
      }).then(res => {
        if (res.status) {
          this.loading=false
          this.data = res.data.rows
          this.total = res.data.total
        }
      })
    }
  }
}
</script>