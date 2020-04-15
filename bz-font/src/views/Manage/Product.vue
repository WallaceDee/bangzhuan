<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>资源管理</BreadcrumbItem>
      <BreadcrumbItem>产品与服务管理</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Button type="primary" @click="openCreateDrawer">创建产品/服务</Button>
    <Divider />

    <Form inline>
      <FormItem label="产品/服务">
        <Input v-model="searchForm.title" size="small" style="width:100px"></Input>
      </FormItem>
            <FormItem label="类型">
            <Select v-model="searchForm.type" style="width:100px" size="small" @on-open-change="onSelectOpen">
               <Option value="">全部</Option>
            <Option v-for="item in types" :value="item.type" :key="item.type">{{ item.title }}</Option>
          </Select>
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
        <FormItem label="产品/服务" prop="title">
          <Input v-model="form.title" placeholder="请输入产品/服务名称..."></Input>
        </FormItem>
        <FormItem label="类型" prop="type">
          <Select v-model="form.type" style="width:200px">
            <Option v-for="item in types" :value="item.type" :key="item.type">{{ item.title }}</Option>
          </Select>
        </FormItem>
         <FormItem label="描述" prop="description" v-if="form.type!==3">
          <Input type="textarea" v-model="form.description" placeholder="请输入产品/服务描述..."></Input>
        </FormItem>
        <FormItem label="小标题" prop="description" v-if="form.type===3">
          <Input v-model="form.description" placeholder="请输入小标题..."></Input>
        </FormItem>
        <FormItem label="图片">
          <Upload
            ref="upload"
            :on-exceeded-size="handleMaxSize"
            :on-format-error="handleFormatError"
            :show-upload-list="false"
            :format="['jpg','jpeg','png','svg']"
            :max-size="2048"
            type="drag"
            :action="`${$config.baseUrl}/ue?action=uploadimage&path=upload/product`"
            :on-success="handleSuccess"
            style="display: inline-block;width:200px;"
          >
            <div class="image-wrapper" style="width: 200px;height:200px;line-height: 200px;">
              <img v-if="form.cover" :src="form.cover" alt="照片" style="width:200px;" />
              <template v-else>
                <Icon type="ios-image" size="20"></Icon>(size:200px*200px)
              </template>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="图标 " v-if="form.type===1||form.type===2">
          <Upload
            ref="upload"
            :on-exceeded-size="handleMaxSize"
            :on-format-error="handleFormatError"
            :show-upload-list="false"
            :format="['jpg','jpeg','png','svg']"
            :max-size="2048"
            type="drag"
           :action="`${$config.baseUrl}/ue?action=uploadimage&path=upload/productIcon`"
            :on-success="handleBgIconSuccess"
            style="display: inline-block;width:100px;"
          >
            <div class="image-wrapper" style="width: 100px;height:100px;line-height: 100px;">
              <img v-if="form.icon" :src="form.icon" alt="图标" style="width:100px;" />
              <template v-else>
                <Icon type="ios-image" size="20"></Icon>(size:100px*100px)
              </template>
            </div>
          </Upload>
        </FormItem>

        <FormItem label="背景色" prop="backgroundColor" v-if="form.type===2">
          <ColorPicker v-model="form.backgroundColor" :colors="colors" />
        </FormItem>
        <FormItem label="样式" v-if="form.type===2">
          <RadioGroup v-model="subType">
            <Radio :label="0">样式1</Radio>
            <Radio :label="1">样式2</Radio>
          </RadioGroup>
        </FormItem>
        <template v-if="subType||form.type===1">
          <FormItem
            v-for="(item, index) in form.subItems"
            :key="'subItems'+item.index"
            :label="`小项${index+1}`"
            :prop="'subItems.'+index + '.description'"
            :rules="{required: true, message: `小项${index+1}不能为空`, trigger: 'blur'}"
          >
            <Row>
              <Col span="2" offset="1">
                <Upload
                  ref="upload"
                  :on-exceeded-size="handleMaxSize"
                  :on-format-error="handleFormatError"
                  :show-upload-list="false"
                  :format="['jpg','jpeg','png','svg']"
                  :max-size="2048"
                  type="drag"
                  :action="`${$config.baseUrl}/ue?action=uploadimage&path=upload/productIcon`"
                  :on-success="(res,file)=>{
              handleIconSuccess(res,file,index)
            }"
                  style="display: inline-block;width:50px;"
                >
                  <div class="image-wrapper" style="width: 50px;height:50px;line-height: 50px;">
                    <img v-if="item.icon" :src="item.icon" alt="图标" style="width:50px;" />
                    <template v-else>
                      <Icon type="ios-image" size="20"></Icon>(size:50px*50px)
                    </template>
                  </div>
                </Upload>
              </Col>
              <Col span="2" offset="1" v-if="form.type===2">
                <Input  v-model="item.title" placeholder="小标题"></Input>
              </Col>
              <Col span="12" offset="1">
                <Input type="textarea" v-model="item.description" placeholder="描述"></Input>
              </Col>
              <Col span="4" offset="1">
                <Button @click="removeData(index)">删除</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="12">
                <Button type="dashed" long @click="addData" icon="md-add">添加小项</Button>
              </Col>
            </Row>
          </FormItem>
        </template>
        <FormItem label="内容" v-if="!subType||form.type===3">
          <Input
            v-model="form.content"
            type="textarea"
            :autosize="{minRows: 5,maxRows: 10}"
            placeholder="请输入内容..."
          ></Input>
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
import {
  getProductTypeList,
  getProductList,
  deleteProduct,
  publicProduct,
  setProduct2Top
} from '@/api/manage/'
export default {
  name: 'Product',
  data() {
    return {
      loading:false,
      subType: 0,
      colors: ['#DEEEFD', '#F8F8F8', '#ffffff'],
      types: [],
      popupMode: 0,
      drawerVisible: false,
      form: {
        backgroundColor: '#ffffff',
        subItems: [],
        type: '',
        title: '',
        cover: '',
        description: '',
        content:'',
        icon:''
      },
      rule: {},
      searchForm: {
        title: '',
        type: ''
      },
      searchRule: {
        title: '',
        type: ''
      },
      columns: [
        {
          type: 'index',
          width: 80,
          align: 'center',
          title: '序号'
        },
        {
          title: '图片',
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
          title: '产品/服务',
          align: 'center',
          minWidth: 120,
          key: 'title'
        },
        {
          title: '类型',
          align: 'center',
          width: 120,
          key: 'typeTitle'
        },
        {
          title: '简介',
          minWidth: 135,
          align: 'center',
          key: 'description'
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
                      this.setProduct2Top(params.row.id)
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
      return `${this.popupMode ? '编辑' : '添加'}产品/服务`
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    onSelectOpen(status){
         if (status && !this.types.length) {
        getProductTypeList().then(res => {
          this.types = res.data
        })
      }
    },
    setProduct2Top(id){
      setProduct2Top({
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
    addData() {
      this.form.subItems.push({
        value: '',
        index: this.form.subItems.length
      })
    },
    removeData(index) {
      this.form.subItems.splice(index, 1)
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
      this.form =Object.assign({
        backgroundColor: '#ffffff',
        subItems: [],
        type: '',
        title: '',
        cover: '',
        description: '',
        content:'',
        icon:''
      }, JSON.parse(JSON.stringify(news)))
      this.subType=this.form.content===''?1:0
      this.handelDrawerVisible(true)
    },
    openCreateDrawer() {
      this.popupMode = 0
      this.form = {
        backgroundColor: '#ffffff',
        subItems: [],
        type: '',
        title: '',
        cover: '',
        description: '',
        content:'',
        icon:''
      }
      this.$refs.form.resetFields()
      this.handelDrawerVisible(true)
    },
    handelDrawerVisible(status) {
      if (status && !this.types.length) {
        getProductTypeList().then(res => {
          this.types = res.data
        })
      }
      this.drawerVisible = status
    },
    doSumbit() {
      let param = Object.assign({}, this.form)
      delete param.indexTime
      delete param.createTime
      // this.$refs.form.validate(valid => {
      //   if (valid) {
          publicProduct(param).then(res => {
            if (res.status) {
              this.handelDrawerVisible(false)
              this.getData()
              this.$Notice.success({
                title: '提示',
                desc: res.data.message
              })
            }
        //   })
        // }
      })
    },
    handleIconSuccess(res, file, index) {
      this.$set(this.form.subItems[index], 'icon', res.url)
    },
    handleSuccess(res, file) {
      this.$set(this.form, 'cover', res.url)
    },
    handleBgIconSuccess(res, file) {
      this.$set(this.form, 'icon', res.url)
    },
    handleSearch(isRest) {
      this.page=1
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
      deleteProduct({
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
      getProductList({
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
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
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