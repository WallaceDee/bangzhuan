<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>基础设置</BreadcrumbItem>
      <BreadcrumbItem>轮播图管理</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Button type="primary" @click="openCreate">添加轮播图</Button>
    <Divider />
    <Table :columns="columns" :data="data" stripe :loading="loading"></Table>
    <Drawer :title="drawerTitle" v-model="drawerVisible" width="720">
      <Form :model="form" :label-width="120" ref="form" :rules="rule">
        <FormItem label="Banner图片" prop="url">
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
              <img v-if="form.url" :src="form.url" alt="轮播图片" style="width:192px;" />
              <template v-else>
                <Icon type="ios-image" size="20"></Icon>(size:1920px*900px)
              </template>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="备注">
          <Input
            v-model="form.description"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入备注..."
          ></Input>
        </FormItem>
        <FormItem label="是否启用">
          <Switch v-model="form.enable" :true-value="1" :false-value="0" />
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
import {
  getBannerList,
  publicBanner,
  deleteBanner,
  setBannerEnable,
  setBannerUpdateTime
} from '@/api/manage/'
import { getDate } from '@/libs/tools.js'
export default {
  name: 'Banner',
  data() {
    return {
      loading:false,
      form: {
        url: '',
        thumbnail: '',
        description: '',
        enable: 1
      },
      rule: {
        url: [{ required: true, message: '请上传图片', trigger: 'blur' }]
      },
      popupMode: 0,
      drawerVisible: false,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          title: '图片',
          width: 212,
          align: 'center',
          key: 'thumbnail',
          render: function(h, params) {
            return h('img', {
              style: {
                display: 'block',
                padding: '10px'
              },
              domProps: {
                height: 90,
                src: params.row.thumbnail
              }
            })
          }
        },
        {
          title: '描述',
          align: 'center',
          key: 'description',
           minWidth: 100
        },
        {
          title: '状态',
          align: 'center',
          key: 'enable',
          width: 100,
          render: function(h, params) {
            return h('span', params.row.enable ? '启用' : '禁用')
          }
        },
        {
          title: '创建时间',
          align: 'center',
          width: 170,
          key: 'updateTime',
          render: function(h, params) {
            return h('span', getDate(params.row.createTime, 'yyyymmddhhmmss'))
          }
        },
        {
          title: '修改时间',
          align: 'center',
          width: 170,
          key: 'updateTime',
          render: function(h, params) {
            return h('span', getDate(params.row.updateTime, 'yyyymmddhhmmss'))
          }
        },
        {
          title: '操作',
          align: 'center',
          width:250,
          render: (h, params) => {
            return [
              h(
                'Poptip',
                {
                  props: {
                    placement: 'bottom',
                    transfer: true,
                    confirm: true,
                    title: `您确认要${
                      params.row.enable === 0 ? '启用' : '禁用'
                    }这个轮播图吗？`
                  },
                  on: {
                    'on-ok': () => {
                      this.setBannerEnable(params.row)
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
                    params.row.enable === 0 ? '启用' : '禁用'
                  )
                ]
              ),
              h(
                'Poptip',
                {
                  props: {
                    placement: 'bottom',
                    transfer: true,
                    confirm: true,
                    title: `您确认要删除这个轮播图吗？`
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteBanner(params.row)
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
              ),
              h(
                'Button',
                {
                  props: {
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.openUpdatePopup(params.row)
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
                    title: `您确认要置顶这个轮播图吗？`
                  },
                  on: {
                    'on-ok': () => {
                      this.set2Top(params.row)
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
                    '置顶'
                  )
                ]
              )
            ]
          }
        }
      ],
      data: []
    }
  },
  computed: {
    drawerTitle() {
      return `${this.popupMode ? '编辑' : '添加'}轮播图`
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    set2Top(banner) {
      setBannerUpdateTime(banner).then(res => {
        if (res.status) {
          this.$Notice.success({
            title: '提示',
            desc: res.data.message
          })
          this.getData()
        }
      })
    },
    openCreate() {
      this.popupMode = 0
      this.form = {
        url: '',
        thumbnail: '',
        description: '',
        enable: 1
      }
      this.$refs.form.resetFields()
      this.handelDrawerVisible(true)
    },
    openUpdatePopup(banner) {
      this.popupMode = 1
      this.form = JSON.parse(JSON.stringify(banner))
      this.handelDrawerVisible(true)
    },
    setBannerEnable(params) {
      params.enable = !params.enable ? 1 : 0
      setBannerEnable(params)
    },
    deleteBanner(data) {
      deleteBanner(data).then(res => {
        if (res.status) {
          this.getData()
          this.$Notice.success({
            title: '提示',
            desc: res.data.message
          })
        }
      })
    },
    doSumbit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          publicBanner(this.form).then(res => {
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
      this.$set(this.form, 'url', res.url)
      this.$set(this.form, 'thumbnail', res.url)
    },
    handelDrawerVisible(status) {
      this.drawerVisible = status
    },
    getData() {
      this.loading=true
      getBannerList().then(res => {
        if (res.status) {
          this.loading=false
          this.data = res.data
        }
      })
    }
  }
}
</script>
<style>
.drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>