<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>资源管理</BreadcrumbItem>
      <BreadcrumbItem>文章发布</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Button type="primary" @click="openCreateDrawer">发布文章</Button>
    <Divider />
    <Form inline>
      <FormItem label="标题">
        <Input
          v-model="searchForm.title"
          size="small"
          style="width:100px"
        ></Input>
      </FormItem>

      <FormItem label="类型">
        <Select
          transfer
          v-model="searchForm.type"
          style="width:100px"
          size="small"
        >
          <Option value>全部</Option>
          <Option v-for="item in types" :value="item.type" :key="item.type">{{
            item.title
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="领域">
        <Select
          transfer
          v-model="searchForm.realmIdsStr"
          size="small"
          style="width:100px"
        >
          <Option v-for="item in realms" :value="item.id" :key="item.id">{{
            item.realmName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="地域">
        <Select
          transfer
          v-model="searchForm.cityCodesStr"
          size="small"
          style="width:100px"
        >
          <Option v-for="item in citys" :value="item.code" :key="item.code">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>

      <span style="display:inline-block;margin-top:38px;">
        <Button size="small" type="primary" @click="handleSearch">搜索</Button>
        <Button
          size="small"
          @click="handleSearch(true)"
          style="margin-left: 8px"
          >重置</Button
        >
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
            :headers="uploadHeaders"
            ref="upload"
            :show-upload-list="false"
            :format="['jpg', 'jpeg', 'png', 'svg']"
            :max-size="2048"
            type="drag"
            action="https://manage.bangzhuanwang.com/api/tool/chuangwei/file/upload"
            :on-success="handleSuccess"
            style="display: inline-block;width:192px;"
          >
            <div style="width: 192px;height:90px;line-height: 90px;">
              <img
                v-if="form.articleImg"
                :src="form.articleImg"
                alt="封面图片"
                style="width:192px;"
              />
              <template v-else>
                <Icon type="ios-image" size="20"></Icon>(size:640px*300px)
              </template>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="精准推送">
          <Switch v-model="form.precise" />
        </FormItem>
        <FormItem v-show="form.precise" label="指定用户">
          <Select
            placeholder="请输入用户昵称以搜索"
            transfer
            multiple
            filterable
            remote
            :remote-method="userRemoteMethod"
            :loading="userLoading"
            v-model="form.users"
          >
            <Option
              :label="item.nickname"
              v-for="item in userPool"
              :value="item.id"
              :key="item.id"
            >
              <Avatar :src="item.headImg">{{ item.nickname }}</Avatar>
              {{ item.nickname }}
            </Option>
          </Select>
        </FormItem>
        <template v-show="!form.precise">
          <FormItem label="类型" v-show="!form.precise">
            <Select transfer v-model="form.type">
              <Option
                v-for="item in types"
                :value="item.type"
                :key="item.type"
                >{{ item.title }}</Option
              >
            </Select>
          </FormItem>

          <FormItem label="领域" v-if="form.type === 1 && !form.precise">
            <!-- @on-open-change="onRealmSelectOpen" -->
            <Select transfer multiple v-model="form.realmIds">
              <Option v-for="item in realms" :value="item.id" :key="item.id">{{
                item.realmName
              }}</Option>
            </Select>
          </FormItem>
          <FormItem
            label="地域"
            v-if="form.type === 1 && !form.precise"
            v-show="!form.precise"
          >
            <!-- @on-open-change="onCitySelectOpen" -->
            <Select transfer multiple v-model="form.cityCodes">
              <Option
                v-for="item in citys"
                :value="item.code"
                :key="item.code"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </template>
        <FormItem label="内容" prop="content" class="html-editor">
          <script id="editor" type="text/plain"></script>
          <Input v-show="0" v-model="form.content"></Input>
        </FormItem>
      </Form>
      <div class="drawer-footer">
        <Button style="margin-right: 8px" @click="handelDrawerVisible(false)"
          >取消</Button
        >
        <Button type="primary" @click="doSumbit">提交</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools.js'
import {
  getArticleList,
  getArticleDetail,
  createArticle,
  updateArticle,
  getRealms,
  getEnableCitys,
  deleteArticle,
  getUserList,
  precisePush
} from '@/api/wechat/'
import '@/libs/UE/ueditor.config.js'
import '@/libs/UE/ueditor.all.js'
import '@/libs/UE/lang/zh-cn/zh-cn.js'
import '@/libs/UE/ueditor.parse.js'
const typeMapping = new Map([
  [1, '普通'],
  [2, '案件']
])

export default {
  name: 'Article',
  data() {
    return {
      currentSelection: [],
      poptipLoading: false,
      userLoading: false,
      userPool: [],
      uploadHeaders: {
        Authorization: localStorage.getItem('token')
      },
      citys: [],
      realms: [],
      types: [
        {
          type: 1,
          title: '普通'
        },
        {
          type: 2,
          title: '案件'
        }
      ],
      loading: false,
      ueditor: null,
      editMode: 0,
      drawerVisible: false,
      form: {
        title: '',
        type: 1,
        realmIds: [],
        cityCodes: [],
        articleImg: '',
        content: '',
        precise: false,
        users: []
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      searchForm: {
        title: '',
        type: '',
        realmIdsStr: '',
        cityCodesStr: ''
      },
      searchRule: {
        title: '',
        type: '',
        realmIdsStr: '',
        cityCodesStr: ''
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
          render: function(h, params) {
            return params.row.articleImg
              ? h('img', {
                  style: {
                    display: 'block',
                    padding: '10px'
                  },
                  domProps: {
                    height: 86,
                    src: params.row.articleImg
                  }
                })
              : h('span', '暂无封面')
          }
        },
        {
          title: '标题',
          align: 'center',
          minWidth: 120,
          key: 'title'
        },
        {
          title: '文章类型',
          width: 135,
          align: 'center',
          key: 'type',
          render: function(h, params) {
            return h('span', typeMapping.get(params.row.type))
          }
        },
        {
          title: '领域',
          align: 'center',
          minWidth: 120,
          key: 'realms',
          render: function(h, params) {
            let str = []
            params.row.realms.map((item) => {
              str.push(item.realmName)
            })
            return h('span', str.join('、'))
          }
        },
        {
          title: '地域',
          align: 'center',
          minWidth: 120,
          key: 'cities',
          render: function(h, params) {
            let str = []
            params.row.cities.map((item) => {
              str.push(item.cityName)
            })
            return h('span', str.join('、'))
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
          title: '操作',
          align: 'center',
          width: 200,
          fixed: 'right',
          render: (h, params) => {
            const create = this.$createElement
            return [
              create(
                'Poptip',
                {
                  ref: 'poptip' + params.row.id,
                  class: ['table-btn'],
                  props: {
                    transfer: true,
                    placement: 'bottom',
                    'popper-class': 'table-popper'
                  }
                },
                [
                  create(
                    'Button',
                    {
                      props: {
                        size: 'small'
                      }
                    },
                    '推送'
                  ),
                  create(
                    'div',
                    { slot: 'content', style: { width: '270px' } },
                    [
                      this.poptipLoading
                        ? h('Spin', {
                            props: {
                              fix: true
                            }
                          })
                        : '',
                      h(
                        'Select',
                        {
                          style: {
                            width: '270px'
                          },
                          props: {
                            placeholder: '请输入用户昵称以搜索',
                            multiple: true,
                            filterable: true,
                            remote: true,
                            'remote-method': this.userRemoteMethod,
                            loading: this.userLoading
                          },
                          on: {
                            'on-change': (options) => {
                              console.log(options)
                              this.currentSelection = options
                            }
                          }
                        },
                        this.userPool.map(function(item) {
                          return h(
                            'Option',
                            {
                              props: {
                                label: item.nickname,
                                value: item.id
                              }
                            },
                            [
                              h(
                                'Avatar',
                                {
                                  props: {
                                    src: item.headImg
                                  }
                                },
                                item.nickname
                              ),
                              h('span', ' ' + item.nickname)
                            ]
                          )
                        })
                      ),
                      h(
                        'div',
                        {
                          style: {
                            marginTop: '10px'
                          }
                        },
                        [
                          h(
                            'Button',
                            {
                              props: {
                                size: 'small',
                                type: 'primary',
                                disabled: !this.currentSelection.length
                              },
                              style: {
                                marginRight: '5px'
                              },
                              on: {
                                click: () => {
                                  this.$refs[
                                    `poptip${params.row.id}`
                                  ].$children[1].values = []
                                  this.$refs[
                                    `poptip${params.row.id}`
                                  ].handleClose()
                                  this.precisePush(
                                    params.row.id,
                                    this.currentSelection
                                  )
                                }
                              }
                            },
                            '推送'
                          ),
                          h(
                            'Button',
                            {
                              props: {
                                size: 'small'
                              },
                              on: {
                                click: () => {
                                  this.$refs[
                                    `poptip${params.row.id}`
                                  ].handleClose()
                                }
                              }
                            },
                            '取消'
                          )
                        ]
                      )
                    ]
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
      return `${this.editMode ? '编辑' : '发布'}文章/案件`
    }
  },
  mounted() {
    this.getData()
    this.onCitySelectOpen(true)
    this.onRealmSelectOpen(true)
  },
  methods: {
    userRemoteMethod(nickname) {
      this.userLoading = true
      getUserList({
        current: 1,
        size: 10,
        nickname
      }).then((res) => {
        if (res.code === 80200) {
          this.userPool = res.data.records
          this.userLoading = false
        }
      })
    },
    onCitySelectOpen(status) {
      if (status) {
        getEnableCitys({
          current: 1,
          size: 999
        }).then((res) => {
          if (res.code === 80200) {
            this.citys = res.data.records
          }
        })
      }
    },
    onRealmSelectOpen(status) {
      if (status) {
        getRealms({
          current: 1,
          size: 999
        }).then((res) => {
          if (res.code === 80200) {
            this.realms = res.data.records
          }
        })
      }
    },
    openUpdateDrawer(article) {
      this.editMode = 1
      getArticleDetail({ id: article.id }).then((res) => {
        this.form = JSON.parse(JSON.stringify(res.data))
        // cityCodesrealmIds
        // citiesrealms
        let cityCodes = []
        let realmIds = []
        res.data.cities.map((item) => {
          cityCodes.push(item.cityCode)
        })
        res.data.realms.map((item) => {
          realmIds.push(item.id)
        })
        this.$set(this.form, 'cityCodes', cityCodes)
        this.$set(this.form, 'realmIds', realmIds)
        this.handelDrawerVisible(true)
        setTimeout(() => {
          this.ueditor.setContent(this.form.content)
        }, 500)
      })
    },
    openCreateDrawer() {
      this.editMode = 0
      this.$refs.form.resetFields()
      //TODO:
      this.form = {
        title: '',
        type: 1,
        realmIds: [],
        cityCodes: [],
        articleImg: '',
        content: '',
        precise: false,
        users: []
      }
      this.handelDrawerVisible(true)
      if (this.ueditor) {
        this.ueditor.setContent('')
      } else {
        setTimeout(() => {
          this.ueditor = UE.getEditor('editor', {}) // 初始化UE
          this.ueditor.setContent(' ')
        }, 0)
      }
    },
    handelDrawerVisible(status) {
      if (status && !this.ueditor) {
        setTimeout(() => {
          this.ueditor = UE.getEditor('editor', {}) // 初始化UE
        }, 0)
      }
      this.drawerVisible = status
    },
    precisePush(articleId, loginIds) {
      precisePush({
        articleId,
        loginIds
      }).then((res) => {
        this.currentSelection = []
        this.drawerVisible = false
        if (res.code === 80500 && res.msg === '存在已推送的用户') {
          let users = []
          res.data.map((item) => {
            users.push(item.nickname)
          })
          this.$Notice['warning']({
            title: '提示',
            desc: '推送成功，以下人员已推送过，将不再推送：' + users.join('、'),
            duration: 0
          })
        } else {
          this.$Notice[res.code === 80200 ? 'success' : 'error']({
            title: '提示',
            desc: res.msg
          })
        }
        this.getData()
      })
    },
    doSumbit() {
      this.$set(this.form, 'content', this.ueditor.getContent())
      console.log(this.form)
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.brief = this.form.content
            .replace(/<.*?>|&nbsp;/g, '')
            .substr(0, 250)
          if (this.form.id) {
            updateArticle(this.form).then((res) => {
              if (res.code === 80200 && this.form.precise) {
                console.log(this.form.users)
                this.precisePush(this.form.id, this.form.users)
              } else {
                this.drawerVisible = false
                this.$Notice[res.code === 80200 ? 'success' : 'error']({
                  title: '提示',
                  desc: res.msg
                })
                this.getData()
              }
            })
          } else {
            createArticle(this.form).then((res) => {
              if (res.code === 80200 && this.form.precise) {
                console.log(this.form.users)
                this.precisePush(res.data, this.form.users)
              } else {
                this.drawerVisible = false
                this.$Notice[res.code === 80200 ? 'success' : 'error']({
                  title: '提示',
                  desc: res.msg
                })
                this.getData()
              }
            })
          }
        }
      })
    },
    handleSuccess(res, file) {
      this.$set(this.form, 'articleImg', res.data)
    },
    handleSearch(isRest) {
      if (isRest === true) {
        this.searchForm = this.searchRule = {
          title: '',
          content: '',
          type: ''
        }
      } else {
        this.page = 1
        this.searchRule = JSON.parse(JSON.stringify(this.searchForm))
      }
      this.getData()
    },
    onPageChange(page) {
      this.page = page
      this.getData()
    },
    delete(id) {
      deleteArticle({
        ids: [id]
      }).then((res) => {
        if (res.code === 80200) {
          this.$Notice.success({
            title: '提示',
            desc: res.msg
          })
          this.getData()
        }
      })
    },
    getData() {
      this.loading = true
      getArticleList({
        current: this.page,
        size: 10,
        ...this.searchRule
      }).then((res) => {
        if (res.code === 80200) {
          this.loading = false
          this.data = res.data.records
          this.total = res.data.total
        }
      })
    }
  }
}
</script>
<style lang="less">
.table-popper .ivu-poptip-inner,
.select-popper .ivu-poptip-inner {
  white-space: initial;
}
.table-popper .ivu-poptip-inner,
.select-popper .ivu-poptip-inner {
  position: relative;
}
.table-popper .ivu-spin-fix,
.select-popper .ivu-spin-fix {
  border-radius: 8px;
}
.html-editor {
  .ivu-form-item-content {
    line-height: initial;
  }
}
.drawer-footer {
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
