<template>
  <div>
    <div class="wrapper-header">
      <img src="../../assets/images/logo.svg" alt="logo" height="20px" style="flex-shrink:0;"/>
      <div style="width:90%;color:#fff;padding-left:20px;font-size:15px;">专利创新推送中心</div>
      <div style="width:150px;flex-shrink:0;">
        <Dropdown trigger="click" @on-click="onDropdownClick" style="float: right;">
          <div class="dropdown-btn">
            <!-- <span class="avatar" :style="`background-image:url(${$store.state.avatar})`"></span> -->
            {{$store.state.nickname}}
          </div>
          <DropdownMenu slot="list">
            <!-- <DropdownItem name="UserInfo">设置</DropdownItem> -->
            <DropdownItem name="exit">退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="wrapper-container">
      <Row style="height:100%;">
        <Col span="7" :sm="6" :md="5" :lg="4" :xl="3" style="height:100%;overflow:auto;">
          <Menu width="auto" :active-name="activeName" @on-select="onSelect" style="height:100%;">
            <MenuGroup title="基础设置">
              <MenuItem name="Index">
                <Icon type="ios-people" />用户列表
              </MenuItem>
              <MenuItem name="Realm">
                <Icon type="ios-apps" />领域
              </MenuItem>
              <MenuItem name="Area">
                <Icon type="md-pin" />地域
              </MenuItem>
              <MenuItem name="Article">
                <Icon type="ios-paper" />发布文章
              </MenuItem>
              <MenuItem name="Banner">
                <Icon type="md-images" />轮播图
              </MenuItem>
            </MenuGroup>
          </Menu>
        </Col>
        <Col
          span="17"
          :sm="18"
          :md="19"
          :lg="20"
          :xl="21"
          style="height:100%;overflow:auto;padding:10px;"
        >
          <router-view />
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
// import { getUserInfo } from '../../api/manage/'
export default {
  name: 'Workbench',
  data() {
    return {}
  },
  methods: {
    onDropdownClick(name) {
      if (name === 'exit') {
        localStorage.removeItem('token')
        this.$router.push({
          name: 'Login'
        })
      } else {
        this.$router.push({
          name
        })
      }
    },
    // getUserInfo() {
    //   getUserInfo().then(res => {
    //     if (res.status) {
    //       this.$store.commit('setUserInfo', res.data)
    //     }
    //   })
    // },
    onSelect(name) {
      this.$router.push({
        name
      })
    }
  },
  computed: {
    activeName() {
      if (this.$route.name === 'Images') {
        return this.$route.path.replace('/Workbench/', '')
      } else {
        return this.$route.name
      }
    }
  },
  mounted() {
    // this.getUserInfo()
    this.$store.commit(
      'setUserInfo',
      JSON.parse(localStorage.getItem('userInfo'))
    )
  }
}
</script>
<style lang="less" >
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
.tips {
  font-size: 12px;
  color: #bdbdbd;
}
.ivu-breadcrumb {
  margin-top: 10px;
}
table {
  .ivu-btn-small,
  .ivu-poptip {
    margin-right: 5px;
    margin-bottom: 2px;
    &:last-child {
      // margin-right: 0;
    }
  }
}
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
  background-color: rgba(0, 175, 183, 0.2);
  border-color: transparent;
  border-width: 1.5px;
  background-clip: padding-box;
}
*::-webkit-scrollbar-thumb:hover {
  height: 13px !important;
  width: 13px !important;
  background: rgba(0, 175, 183, 0.5);
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
.dropdown-btn {
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > span {
    margin-right: 10px;
  }
  &:hover {
    color: @mainColor;
    > span {
      border-color: @mainColor;
    }
  }
}
.wrapper-header {
  position: fixed;
  height: 65px;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 1000;
  background-color: #202020;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  > div:last-child {
  }
  .avatar {
    display: inline-block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid #fff;
    background-size: cover;
    background-position: center;
  }
}
.wrapper-container {
  height: calc(~"100vh - 65px");
  overflow: auto;
  background: #fff;
  margin: 65px auto 0 auto;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
}
.ivu-menu {
  i.ivu-icon {
    font-size: 20px;
  }
}
</style>