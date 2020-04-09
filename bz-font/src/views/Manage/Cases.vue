<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>基础设置</BreadcrumbItem>
      <BreadcrumbItem>案例管理</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Button type="primary" @click="openCreatePopup">添加案例</Button>
    <Divider />
    <Table :columns="columns" :data="data" stripe :loading="loading"></Table>
    <Drawer :title="drawerTitle" v-model="popupVisible" width="720">
      <Form :model="form" :label-width="120" ref="form" :rules="rules">
        <FormItem label="案例封面" prop="cover">
          <Upload
            ref="upload"
            :show-upload-list="false"
            :format="['jpg','jpeg','png','svg']"
            :max-size="2048"
            type="drag"
            action="api/ue?action=uploadimage&path=upload/cases"
            :on-success="handleSuccess"
            style="display: inline-block;width:200px;"
          >
            <div style="width: 200px;height:134px;line-height: 134px;">
              <img v-if="form.cover" :src="form.cover" alt="案例图片" style="width:200px;" />
              <template v-else>
                <Icon type="ios-image" size="20"></Icon>(size:645px*430px)
              </template>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="标题" prop="title">
          <Input v-model="form.title" placeholder="请输入标题..."></Input>
        </FormItem>
        <FormItem label="小标题" prop="subTitle">
          <Input v-model="form.subTitle" placeholder="请输入小标题..."></Input>
        </FormItem>
        <FormItem label="内容" prop="content">
          <Input
            v-model="form.content"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入内容..."
          ></Input>
        </FormItem>
        <FormItem label="是否启用" prop="enable">
          <Switch v-model="form.enable" :true-value="1" :false-value="0" />
        </FormItem>
      </Form>
      <div class="drawer-footer">
        <Button style="margin-right: 8px" @click="handelPopupVisible(false)">取消</Button>
        <Button type="primary" @click="doSumbit">提交</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import {
  getCasesList,
  publicCases,
  deleteCases,
  setCasesEnable,
  setCasesUpdateTime
} from "@/api/manage/";
import { getDate } from "@/libs/tools.js";
export default {
  name: "Cases",
  data() {
    return {
      loading:true,
      form: {
        cover: "",
        title: "",
        subTitle: "",
        content: "",
        enable: 1
      },
      rules: {
        cover: [{ required: true, message: "请上传图片", trigger: "blur" }],
        title: [{ required: true, message: "请上输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      popupMode: 0,
      popupVisible: false,
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "图片",
          width: 150,
          align: "center",
          render: function(h, params) {
            return h("img", {
              style: {
                display: "block",
                padding: "10px"
              },
              domProps: {
                height: 90,
                src: params.row.cover
              }
            });
          }
        },
        {
          title: "标题",
          align: "center",
          key: "title",
          minWidth: 150
        },
        {
          minWidth: 150,
          title: "小标题",
          align: "center",
          key: "subTitle"
        },
        {
          title: "状态",
          align: "center",
          key: "enable",
          width: 100,
          render: function(h, params) {
            return h("span", params.row.enable ? "启用" : "禁用");
          }
        },
        {
          title: "创建时间",
          align: "center",
          width: 170,
          key: "updateTime",
          render: function(h, params) {
            return h("span", getDate(params.row.createTime, "yyyymmddhhmmss"));
          }
        },
        {
          title: "修改时间",
          align: "center",
          width: 170,
          key: "updateTime",
          render: function(h, params) {
            return h("span", getDate(params.row.updateTime, "yyyymmddhhmmss"));
          }
        },
        {
          title: "操作",
          align: "center",
          width: 250,
          fixed:'right',
          render: (h, params) => {
            return [
              h(
                "Poptip",
                {
                  props: {
                    placement: "bottom",
                    transfer: true,
                    confirm: true,
                    title: `您确认要${
                      params.row.enable === 0 ? "启用" : "禁用"
                    }这个案例吗？`
                  },
                  on: {
                    "on-ok": () => {
                      this.setCasesEnable(params.row);
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        size: "small"
                      }
                    },
                    params.row.enable === 0 ? "启用" : "禁用"
                  )
                ]
              ),
              h(
                "Poptip",
                {
                  props: {
                    placement: "bottom",
                    transfer: true,
                    confirm: true,
                    title: `您确认要删除这个案例吗？`
                  },
                  on: {
                    "on-ok": () => {
                      this.deleteCases(params.row);
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        size: "small"
                      }
                    },
                    "删除"
                  )
                ]
              ),
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.openUpdatePopup(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Poptip",
                {
                  props: {
                    placement: "bottom",
                    transfer: true,
                    confirm: true,
                    title: `您确认要置顶这个案例吗？`
                  },
                  on: {
                    "on-ok": () => {
                      this.set2Top(params.row);
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        size: "small"
                      }
                    },
                    "置顶"
                  )
                ]
              )
            ];
          }
        }
      ],
      data: []
    };
  },
  computed: {
    drawerTitle() {
      return `${this.popupMode ? "编辑" : "添加"}案例`;
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    set2Top(banner) {
      setCasesUpdateTime(banner).then(res => {
        if (res.status) {
          this.$Notice.success({
            title: "提示",
            desc: res.data.message
          });
          this.getData();
        }
      });
    },
    openCreatePopup() {
      this.popupMode = 0;
      this.form = {
        cover: "",
        title: "",
        subTitle: "",
        content: "",
        enable: 1
      };
      this.$refs.form.resetFields();
      this.handelPopupVisible(true);
    },
    openUpdatePopup(banner) {
      this.popupMode = 1;
      this.form = JSON.parse(JSON.stringify(banner));
      this.handelPopupVisible(true);
    },
    setCasesEnable(params) {
      params.enable = !params.enable ? 1 : 0;
      setCasesEnable(params);
    },
    deleteCases(data) {
      deleteCases(data).then(res => {
        if (res.status) {
          this.$Notice.success({
            title: "提示",
            desc: res.data.message
          });
        }
      });
    },
    doSumbit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          publicCases(this.form).then(res => {
            if (res.status) {
              this.handelPopupVisible(false);
              this.getData();
              this.$Notice.success({
                title: "提示",
                desc: res.data.message
              });
            }
          });
        }
      });
    },
    handleSuccess(res, file) {
      this.$set(this.form, "cover", res.url);
    },
    handelPopupVisible(status) {
      this.popupVisible = status;
    },
    getData() {
      this.loading=true
      getCasesList().then(res => {
        if (res.status) {
           this.loading=false
          this.data = res.data;
        }
      });
    }
  }
};
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