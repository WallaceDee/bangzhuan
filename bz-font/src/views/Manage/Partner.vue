<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>资源管理</BreadcrumbItem>
      <BreadcrumbItem>合作伙伴</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Card>
      <p slot="title">未展示</p>
      <Upload
        slot="extra"
        ref="upload"
        :show-upload-list="false"
        :format="['jpg','jpeg','png','svg']"
        :max-size="2048"
        :action="`${$config.baseUrl}/ue?action=uploadimage&path=upload/logo`"
        :on-success="(res, file)=>{
            handleSuccess(res, file)
          }"
      >
        <Button size="small">
          <Icon type="md-cloud-upload"></Icon>上传
        </Button>
      </Upload>
      <Spin fix v-if="loading"></Spin>
      <draggable
        class="list-group"
        :list="pool"
        group="people"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div :key="img.url" class="list-group-item" v-for="(img, index) in pool">
            <img :src="img.url" :alt="`图片${index}`" />
            <span @click.stop="doDelete(img.url,index)">
              <Icon type="md-close-circle" />
            </span>
          </div>
        </transition-group>
      </draggable>
    </Card>
    <Divider />
    <Card>
      <p slot="title">已展示</p>
      <Button @click.native="doSubmit" size="small" slot="extra">
        <Icon type="md-checkmark"></Icon>确定
      </Button>
      <Spin fix v-if="loading"></Spin>
      <draggable
        class="list-group"
        :list="result"
        group="people"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <img
            class="list-group-item"
            v-for="(img, index) in result"
            :src="img.url"
            :key="img.url"
            :alt="`图片${index}`"
          />
        </transition-group>
      </draggable>
    </Card>
    <Divider />
  </div>
</template>
<script>
import draggable from "vuedraggable";
import {
  getImages,
  setImagesSortList,
  getImagesSortList,
  deleteFile
} from "../../api/manage/";
export default {
  name: "Partner",
  components: {
    draggable
  },
  data() {
    return {
      drag: false,
      all: [],
      result: [],
      pool: [],
      loading:false
    };
  },
  computed: {
    resultStr() {
      let temp = [];
      this.result.map(item => {
        temp.push(item.url);
      });
      return temp.join(",");
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    handleSuccess(res, file) {
      this.pool.push({
        url: res.url
      });
    },
    doDelete(path, index) {
      this.loading=true
      deleteFile({
        path
      }).then(res => {
        if (res.status) {
          this.loading=false
          this.pool.splice(index, 1);
        }
      });
    },
    getAllImages() {
        this.loading=true
      getImages({
        path: "/upload/logo"
      }).then(res => {
        this.all = res.list;
        this.getSelectedImages();
      });
    },
    getSelectedImages() {
      getImagesSortList({
        name: "partner"
      }).then(res => {
        if (res.status) {
          this.loading=false
          this.result = res.data;
          this.pool = this.all.filter(item => {
            let temp = true;
            res.data.map(i => {
              if (i.url === item.url) {
                temp = false;
              }
            });
            return temp;
          });
        }
      });
    },
    doSubmit() {
       this.loading=true
      setImagesSortList({
        images: this.resultStr,
        name: "partner"
      }).then(res => {
        if (res.status) {
           this.loading=false
          this.$Notice.success({
            title: "提示",
            desc: res.data.message
          });
        }
      });
    }
  },
  mounted() {
    this.getAllImages();
  }
};
</script>
<style lang="less">
.list-group {
  height: 200px;
  border: 1px dashed #dcdee2;
  background-color: #eee;

  > span {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
  }
}
.list-group-item {
  width: 16.66666666%;
  background: #333333;
  position: relative;
  > img {
    display: block;
    width: 100%;
  }
  > span {
    position: absolute;
    top: 0;
    right: 0;
    color: #cc0001;
    i {
      font-size: 20px;
    }
  }
}
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>