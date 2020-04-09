<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>资源管理</BreadcrumbItem>
      <BreadcrumbItem>团队管理</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Button type="primary" @click="openCreateDrawer">创建成员</Button>
    <Divider />
    <Form inline>
      <FormItem label="名字">
        <Input v-model="searchForm.name" size="small" style="width:100px"></Input>
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
    <Drawer :title="drawerTitle" v-model="drawerVisible" width="720">
      <Form :model="form" :label-width="120" ref="form" :rules="rule">
        <FormItem label="名字" prop="name">
          <Input v-model="form.name" placeholder="请输入名字..."></Input>
        </FormItem>
        <FormItem label="照片" prop="photo">
          <Upload
            ref="upload"
            :on-exceeded-size="handleMaxSize"
            :on-format-error="handleFormatError"
            :show-upload-list="false"
            :format="['jpg','jpeg','png','svg']"
            :max-size="2048"
            type="drag"
            action="api/ue?action=uploadimage&path=upload/team"
            :on-success="handleSuccess"
            style="display: inline-block;width:192px;"
          >
            <div style="width: 200px;height:133px;line-height: 133px;">
              <img v-if="form.photo" :src="form.photo" alt="照片" style="width:200px;" />
              <template v-else>
                <Icon type="ios-image" size="20"></Icon>(size:900px*600px)
              </template>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="称谓" prop="title">
          <Input v-model="form.title"></Input>
          <p>多个称谓用英文逗号 , 分隔</p>
        </FormItem>
        <FormItem label="教育背景" prop="education">
          <Input v-model="form.education"></Input>
          <p>多个教育背景用英文逗号 , 分隔</p>
        </FormItem>
        <FormItem label="从业年限" prop="years">
          <InputNumber :max="99" :min="0" v-model="form.years"></InputNumber>
        </FormItem>
        <FormItem label="工作经历" prop="experience">
          <Input
            v-model="form.experience"
            type="textarea"
            :autosize="{minRows: 5,maxRows: 10}"
            placeholder="请输入工作经历"
          ></Input>
        </FormItem>
        <FormItem label="服务客户">
          <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
              <img :src="item.url" />
              <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            ref="customerUpload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleCustomerSuccess"
            :format="['jpg','jpeg','png','svg']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            action="api/ue?action=uploadimage&path=upload/team"
            style="display: inline-block;width:120px;"
          >
            <div style="width: 120px;height:42.5px;line-height:15px;">
              <Icon type="ios-camera" size="20"></Icon>(size:240px*85px)
            </div>
          </Upload>
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
import { getTeamList, deleteTeam, publicTeam,setMember2Top } from '@/api/manage/'
export default {
  name: 'Team',
  data() {
    return {
      loading:false,
      uploadList: [],
      defaultList: [],
      popupMode: 0,
      drawerVisible: false,
      form: {
        name: '',
        title: '',
        photo: '',
        education: '',
        years: 0,
        experience: '',
        customer: ''
      },
      rule: {
        name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        title: [{ required: true, message: '请输入称谓', trigger: 'blur' }],
        education: [{ required: true, message: '请输入教育背景', trigger: 'blur' }],
        experience: [{ required: true, message: '请输入工作经历', trigger: 'blur' }]
      },
      searchForm: {
        name: ''
      },
      searchRule: {
        name: ''
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
          key: 'photo',
          render: function(h, params) {
            return h('img', {
              style: {
                display: 'block',
                padding: '10px'
              },
              domProps: {
                height: 86,
                src: params.row.photo
              }
            })
          }
        }, {
          title: '名字',
          align: 'center',
          width: 120,
          key: 'name'
        },
        {
          title: '称谓',
          align: 'center',
          minWidth: 120,
          key: 'title'
        },
        {
          title: '从业年限',
          width: 135,
            align: 'center',
          key: 'years'
        },
        {
          title: '教育背景',
          align: 'center',
          minWidth: 150,
         key: 'education'
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
          title: '操作',
          align: 'center',
          fixed:'right',
          width:200,
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
                      this.setMember2Top(params.row.id)
                    }
                  }
                },
                '置顶'
              ),
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
      return `${this.popupMode ? '编辑' : '添加'}成员`
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    setMember2Top(id){
      setMember2Top({
        id
      }).then(res=>{
        if (res.status) {
            this.$Notice.success({
            title: '提示',
            desc: res.data.message
          })
          this.getData()
        }
      })
    },
    handleRemove(file) {
      const fileList = this.$refs.customerUpload.fileList
      this.$refs.customerUpload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleCustomerSuccess(res, file) {
      file.url = file.response.url
      // this.uploadList.push(file)
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc:
          'File format of ' +
          file.name +
          ' is incorrect, please select jpg,png or svg.'
      })
    },
    openUpdateDrawer(news) {
      this.popupMode = 1
      this.form = JSON.parse(JSON.stringify(news))
      let defaultList = []
        if(this.form.customer){
                this.form.customer.split(',').map(item => {
                defaultList.push({
                  url: item,
                  name: item.substring(item.lastIndexOf('/') + 1)
                })
              })
        }
      this.defaultList = defaultList
      this.$nextTick(() => {
        this.uploadList = this.$refs.customerUpload.fileList
      })
      this.handelDrawerVisible(true)
    },
    openCreateDrawer() {
      this.popupMode = 0
      this.form = {
        name: '',
        title: '',
        photo: '',
        education: '',
        years: 0,
        experience: '',
        customer: ''
      }
      this.$refs.form.resetFields()
      this.defaultList = []
      this.uploadList = []
      this.handelDrawerVisible(true)
    },
    handelDrawerVisible(status) {
      this.drawerVisible = status
    },
    doSumbit() {
      let customer = []
      this.uploadList.map(item => {
        customer.push(item.url)
      })
      this.$set(this.form, 'customer', customer.join(','))
      this.$refs.form.validate(valid => {
        if (valid) {
          publicTeam(this.form).then(res => {
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
      this.$set(this.form, 'photo', res.url)
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
      deleteTeam({
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
      getTeamList({
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
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.demo-upload-list {
  display: inline-block;
  width: 120px;
  height: 42.5px;
  text-align: center;
  line-height: 42.5px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>