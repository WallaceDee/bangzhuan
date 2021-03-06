<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>轮播图管理</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Button type="primary" @click="openCreate">添加轮播图</Button>
    <Divider />
    <Table :columns="columns" :data="data" stripe :loading="loading"></Table>
    <Drawer :title="drawerTitle" v-model="drawerVisible" width="720">
      <Form :model="form" :label-width="120" ref="form" :rules="rule">
        <FormItem label="Banner图片" prop="img">
          <!-- :action="`${$config.baseUrl}/tool/chuangwei/file/upload`" -->
          <Upload
            :headers="uploadHeaders"
            ref="upload"
            :show-upload-list="false"
            :format="['jpg','jpeg','png','svg']"
            :max-size="2048"
            type="drag"
            action="https://manage.bangzhuanwang.com/api/tool/chuangwei/file/upload"
            :on-success="handleSuccess"
            style="display: inline-block;width:345px;"
          >
            <div style="width: 345px;height:100px;line-height: 100px;">
              <img v-if="form.img" :src="form.img" alt="轮播图片" style="width:345px;" />
              <template v-else>
                <Icon type="ios-image" size="20"></Icon>(size:640px*185px)
              </template>
            </div>
          </Upload>
        </FormItem>

        <FormItem label="类型">
          <Select v-model="form.type" @on-change="form.articleId='';selectRemoteMethod();">
            <Option v-for="item in types" :value="item.type" :key="item.type">{{ item.title }}</Option>
          </Select>
        </FormItem>
      <template v-if="form.type">
        <FormItem label="链接" v-if="form.type===3">
             <Input
            v-model="form.url"
            placeholder="请输入备注..."
          ></Input>
        </FormItem>
        <FormItem label="文章/案件" v-else >
                <!--   :remote-method="selectRemoteMethod" -->
            <Select
            @on-change="onSelectChange"
            :label-in-value="true"
              v-model="form.articleId"
                filterable
                remote
                :loading="selectLoading">
                <Option v-for="(option, index) in articleList" :value="option.id" :key="index">{{option.title}}</Option>
            </Select>
        </FormItem>
        </template>
        <FormItem label="备注">
          <Input
            v-model="form.remark"
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
        <Modal cancel-text="关闭" v-model="article.visible" fullscreen  scrollable :title="article.title">
        <div v-html="article.content"></div>
    </Modal>
  </div>
</template>
<script>
import {
  getArticleList,
  getBannerList,
  createBanner,
  updateBanner,
  deleteBanner,
  setBannerEnable,
  getArticleInfo
} from '@/api/wechat/'
import { getDate } from '@/libs/tools.js'
export default {
  name: 'Banner',
  data() {
    return {
      article:{
        visible:false,
        title:'',
        content:''
      },
      uploadHeaders:{
        Authorization:localStorage.getItem('token')
      },
      articleList:[],
      selectLoading:false,
      types: [
           {
          type: 0,
          title: '无链接'
        },
        {
          type: 1,
          title: '领域/地域'
        },
        {
          type:2,
          title: '案件'
        },
        {
          type: 3,
          title: '外链'
        }

      ],
      loading: false,
      form: {
        url: '',
        img: '',
        remark: '',
        enable: 1,
        type: 0,
        articleId:''
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
          render: function (h, params) {
            return h('img', {
              style: {
                display: 'block',
                padding: '10px'
              },
              domProps: {
                height: 90,
                src: params.row.img
              }
            })
          }
        },
                {
          title: '链接类型',
          align: 'center',
          key: 'type',
          minWidth: 100,
            render: function (h, params) {
            return h('span', params.row.type===1?'领域/地域':params.row.type===2?'案件':params.row.type===3?'外链':'无连接')
          }
        },
        {
          title: '备注',
          align: 'center',
          key: 'remark',
          minWidth: 200
        },

        {
          title: '跳转链接',
          align: 'center',
          key: 'url',
          minWidth: 100,
          render:  (h, params) => {
            if(params.row.type===3){
            return h(
              'a',
              {
                domProps: {
                  target:'_blank',
                  height: 90,
                  href: params.row.url
                }
              },
              '点击跳转'
            )
            }else if(params.row.type===0){
              return ''
            }else{
              return h(
              'a',
              {
                on: {
                  click:() => {
                    this.previewArticle(params.row.articleId)
                  }
                }
              }, '查看文章'
            )
            }
          }
        },
        {
          title: '状态',
          align: 'center',
          key: 'enable',
          width: 100,
          render: function (h, params) {
            return h('span', params.row.enable ? '启用' : '禁用')
          }
        },
        {
          title: '创建时间',
          align: 'center',
          width: 170,
          key: 'updateTime',
          render: function (h, params) {
            return h('span', getDate(params.row.createTime, 'yyyymmddhhmmss'))
          }
        },
        {
          title: '修改时间',
          align: 'center',
          width: 170,
          key: 'updateTime',
          render: function (h, params) {
            return h('span', getDate(params.row.updateTime, 'yyyymmddhhmmss'))
          }
        },
        {
          title: '操作',
          align: 'center',
          width: 250,
          fixed: 'right',
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
    previewArticle(id){
      getArticleInfo({
        id
      }).then(res => {
        if(res.code===80200){
          let {title,content}=res.data
          this.article={
            title,
            content,
            visible:true
          }
        }
      })
    },
    onSelectChange(option){
      // console.log(option)
      // this.form.action=option.label
    },
    selectRemoteMethod(query){
        this.selectLoading=true
        getArticleList({
          type:this.form.type,
          size:999
          }).then(res => {
        if(res.code===80200){
          this.selectLoading=false
          this.articleList=res.data.records
        }else{
          this.articleList=[]
        }
      })
    },
    set2Top({id}) {
      updateBanner({
        id,
        index:0
      }).then((res) => {
        if (res.code===80200) {
          this.$Notice.success({
            title: '提示',
            desc: res.msg
          })
          this.getData()
        }
      })
    },
    openCreate() {
      this.popupMode = 0
      this.$refs.form.resetFields()
      this.form={
        url: '',
        img: '',
        remark: '',
        enable: 1,
        type: 0,
        articleId:''
      }
      this.selectRemoteMethod()
      this.handelDrawerVisible(true)
    },
    openUpdatePopup(banner) {
      this.popupMode = 1
      this.form = JSON.parse(JSON.stringify(banner))
      this.selectRemoteMethod()
      this.handelDrawerVisible(true)
    },
    setBannerEnable(params) {
      params.enable = !params.enable ? 1 : 0
      setBannerEnable(params).then(res => {
        this.$Notice[res.code === 80200 ? 'success' : 'error']({
                title: '提示',
                desc: res.msg
              })
      })
    },
    deleteBanner(data) {
      deleteBanner(data).then((res) => {
        if (res.code === 80200) {
          this.getData()
          this.$Notice.success({
            title: '提示',
            desc: res.msg
          })
        }
      })
    },
    doSumbit() {
      this.$refs.form.validate((valid) => {
      if (valid) {
      console.log(this.form)
      if(this.form.id){
        // this.form.action=
        updateBanner(this.form).then(res => {
          if(res.code===80200){
              this.handelDrawerVisible(false)
              this.getData()
              this.$Notice.success({
                title: '提示',
                desc: res.msg
              })
          }
        })
      }else{
          createBanner(this.form).then(res => {
          if(res.code===80200){
              this.handelDrawerVisible(false)
              this.getData()
              this.$Notice.success({
                title: '提示',
                desc: res.msg
              })
          }
        })
      }
        }
        })
    },
    handleSuccess(res, file) {
      if(res.code===80200){
         this.$set(this.form, 'img', res.data)
      }
    },
    handelDrawerVisible(status) {
      this.drawerVisible = status
    },
    getData() {
      this.loading = true
      getBannerList({
        size: 99,
        enable:1
      }).then((res) => {
        if (res.code === 80200) {
          this.loading = false
          this.data = res.data.records
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