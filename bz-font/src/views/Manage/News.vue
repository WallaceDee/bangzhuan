<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>资源管理</BreadcrumbItem>
      <BreadcrumbItem>专利情报管理</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Button type="primary" @click="openCreateDrawer">创建专利情报</Button>
    <Divider />
    <Form inline>
      <FormItem label="标题">
        <Input v-model="searchForm.title" size="small" style="width:100px"></Input>
      </FormItem>
      <FormItem label="内容">
        <Input v-model="searchForm.content" size="small" style="width:100px"></Input>
      </FormItem>
      <FormItem label="作者">
        <Input v-model="searchForm.author" size="small" style="width:100px"></Input>
      </FormItem>
      <span style="display:inline-block;margin-top:38px;">
        <Button size="small" type="primary" @click="handleSearch">搜索</Button>
        <Button size="small" @click="handleSearch(true)" style="margin-left: 8px">重置</Button>
      </span>
    </Form>
    <Divider />
    <Table :columns="columns" :data="data" stripe :loading="loading"></Table>
    <Divider />
    <Page :current="page" :total="total" show-total @on-change="onPageChange" />
    <Drawer :title="drawerTitle" v-model="drawerVisible" width="100%">
      <Form :model="form" :label-width="120" ref="form" :rules="rules">
        <FormItem label="标题" prop="title">
          <Input v-model="form.title" placeholder="请输入标题..."></Input>
        </FormItem>
        <FormItem label="封面图片">
          <Upload
            ref="upload"
            :show-upload-list="false"
            :format="['jpg','jpeg','png','svg']"
            :max-size="2048"
            type="drag"
            :action="`${$config.baseUrl}/ue?action=uploadimage&path=upload/banner`"
            :on-success="handleSuccess"
            style="display: inline-block;width:192px;"
          >
            <div style="width: 192px;height:90px;line-height: 90px;">
              <img v-if="form.cover" :src="form.cover" alt="封面图片" style="width:192px;" />
              <template v-else>
                <Icon type="ios-image" size="20"></Icon>(size:1920px*900px)
              </template>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="内容" prop="content">
          <script id="editor" type="text/plain"></script>
          <Input v-show="0" v-model="form.content"></Input>
        </FormItem>
      </Form>
      <div class="drawer-footer">
        <Button style="margin-right: 8px" @click="handelDrawerVisible(false)">取消</Button>
        <Button type="primary" @click="doSumbit">提交</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools.js'
import { getNewsList, deleteNews, publicNews } from '@/api/manage/'
import '@/libs/UE/ueditor.config.js'
import '@/libs/UE/ueditor.all.js'
import '@/libs/UE/lang/zh-cn/zh-cn.js'
import '@/libs/UE/ueditor.parse.js'
export default {
  name: 'News',
  data() {
    return {
      loading:false,
      ueditor: null,
      popupMode: 0,
      drawerVisible: false,
      form: {
        title: '',
        cover: '',
        content: ''
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      searchForm: {
        title: '',
        content: '',
        author: ''
      },
      searchRule: {
        title: '',
        content: '',
        author: ''
      },
      columns: [
        {
          type: 'index',
          width: 80,
          align: 'center',
          title: '序号'
        },
        {
          title: '封面',
          width: 129,
          align: 'center',
          key: 'cover',
          render: function(h, params) {
            return h('img', {
              style: {
                display: 'block',
                padding: '10px'
              },
              domProps: {
                height: 86,
                src: params.row.cover
              }
            })
          }
        },
        {
          title: '标题',
          align: 'center',
          minWidth: 120,
          key: 'title'
        },
        // {
        //   title: "内容",
        //   width: 135,
        //     align: 'center',
        //   key: "content"
        // },
        {
          title: '作者',
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
                    backgroundImage: `url(${params.row.authorAvatar})`
                  }
                }),
                params.row.author
              ]
            )
          }
        },
        {
          title: '发布时间',
          key: 'createTime',
          align: 'center',
          width: 170,
          render: function(h, params) {
            return h('span', getDate(params.row.createTime, 'yyyymmddhhmmss'))
          }
        },
        {
          title: '修改时间',
          key: 'updateTime',
          align: 'center',
          width: 170,
          render: function(h, params) {
            return h('span', getDate(params.row.updateTime, 'yyyymmddhhmmss'))
          }
        },
        {
          title: '最后修改人',
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
                    backgroundImage: `url(${params.row.updatorAvatar})`
                  }
                }),
                params.row.updator
              ]
            )
          }
        },
        {
          title: '操作',
          align: 'center',
          width:150,
          fixed:'right',
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
                      this.openUpdateDrawer(params.row)
                    }
                  }
                },
                '编辑'
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
  computed: {
    drawerTitle() {
      return `${this.popupMode ? '编辑' : '添加'}专利情报`
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    openUpdateDrawer(news) {
      this.popupMode = 1
      this.form = JSON.parse(JSON.stringify(news))
      this.handelDrawerVisible(true)
      setTimeout(() => {
        this.ueditor.setContent(this.form.content)
      }, 500)
    },
    openCreateDrawer() {
      this.popupMode = 0
      this.form = {
        title: '',
        cover: '',
        content: ''
      }
      this.$refs.form.resetFields()
      this.handelDrawerVisible(true)
    },
    handelDrawerVisible(status) {
      if (status && !this.ueditor) {
        setTimeout(() => {
          this.ueditor = UE.getEditor('editor', {}) // 初始化UE
        }, 0)
      }

      this.drawerVisible = status
    },
    doSumbit() {
      this.$set(this.form, 'content', this.ueditor.getContent())
      this.$refs.form.validate(valid => {
        if (valid) {
          publicNews(this.form).then(res => {
            if (res.status) {
              this.handelDrawerVisible(false)
              this.getData()
              this.$Notice.success({
                title: '提示',
                desc: res.data.message
              })
            }
          })
        }
      })
    },
    handleSuccess(res, file) {
      this.$set(this.form, 'cover', res.url)
    },
    handleSearch(isRest) {
      if (isRest === true) {
        this.searchForm = this.searchRule = {
          title: '',
          content: '',
          author: ''
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
      deleteNews({
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
    getData() {
      this.loading=true
      getNewsList({
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
<style>
.drawer-footer {
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>