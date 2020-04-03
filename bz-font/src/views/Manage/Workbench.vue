<template>
  <div>
    <div class="wrapper-header"></div>
    <div class="wrapper-container">
      <Row>
        <Col span="4">
          <Menu width="auto" :active-name="activeName" @on-select="onSelect">
            <MenuGroup title="基础设置">
              <MenuItem name="Setting">
                <Icon type="md-document" />网站配置
              </MenuItem>
              <MenuItem name="Users">
                <Icon type="md-chatbubbles" />用户管理
              </MenuItem>
              <MenuItem name="Banner">
                <Icon type="md-chatbubbles" />轮播图管理
              </MenuItem>
            </MenuGroup>
            <MenuGroup title="资源管理">
              <MenuItem name="Consult">
                <Icon type="md-document" />解决方案管理
              </MenuItem>
              <MenuItem name="Cases">
                <Icon type="md-chatbubbles" />用户案例
              </MenuItem>
              <MenuItem name="News">
                <Icon type="md-chatbubbles" />专利情报
              </MenuItem>
              <MenuItem name="Team">
                <Icon type="md-chatbubbles" />团队管理
              </MenuItem>
              <MenuItem name="Product">
                <Icon type="md-chatbubbles" />产品与服务管理
              </MenuItem>
            </MenuGroup>
          </Menu>
        </Col>
        <Col span="20" style="padding:10px;">
          <router-view />
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  name: "Workbench",
  data() {
    return {};
  },
  methods: {
    onSelect(name) {
      this.$router.push({
        name
      });
    }
  },
  computed: {
    activeName() {
      return this.$route.name;
    }
  }
};
</script>
<style lang="less" >
*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
*::-webkit-scrollbar-button {
  display: none;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: transparent;
}
*::-webkit-scrollbar-thumb {
  border-radius: 0;
  border-style: dashed;
  background-color: rgba(117, 96, 145, 0.2);
  border-color: transparent;
  border-width: 1.5px;
  background-clip: padding-box;
}
*::-webkit-scrollbar-thumb:hover {
  height: 13px !important;
  width: 13px !important;
  background: rgba(117, 96, 145, 0.5);
}
*::-webkit-scrollbar-corner {
  display: none;
}
*::-webkit-resizer {
  display: none;
}
.image-wrapper {
  background-color: #eee;
}
.ivu-drawer-body {
  padding: 0;
  > form {
    height: calc(100% - 53px);
    overflow: auto;
    padding: 15px;
  }
}
</style>
<style lang="less" scoped>
.wrapper-header {
  position: fixed;
  height: 65px;
  line-height: 65px;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 1000;
  background-color: #000;
}
.wrapper-container {
  height: calc(~"100vh - 95px");
  overflow: auto;
  background: #fff;
  margin: 80px auto 15px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
}
</style>