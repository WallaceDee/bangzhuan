<template>
  <div class="footer" v-show="visible" v-lazy:background-image="require('../../assets/images/footer_bg.jpg')">
    <div class="contact-us">
      <div class="content">
        <div class="form-wrapper">
          <h1>CONTACT US</h1>
          <h2>立即咨询</h2>
          <p>成功提交后，客服会在2小时内与您取得联系。</p>
          <Form ref="form" :model="form" :rules="formRule" @on-validate="onValidate">
            <FormItem prop="name">
              <input type="text" :maxlength="11" v-model="form.name" />
              <label>
                <span title="请输入您的姓名" data-filled-title="姓名"></span>
              </label>
            </FormItem>
            <FormItem prop="phone">
              <span class="input-wrapper">
                <input type="text" v-model="form.phone" maxlength="11" />
                <label>
                  <span title="请输入您的手机号码" data-filled-title="手机号码"></span>
                </label>
              </span>
            </FormItem>
            <FormItem prop="content">
              <span class="input-wrapper">
                <input type="text" v-model="form.content" />
                <label>
                  <span title="请输入您的要咨询的内容" data-filled-title="内容"></span>
                </label>
              </span>
            </FormItem>
            <Button :loading="loading" class="submit-btn" @click="getConsult">
                   <span v-if="!loading">确认提交</span>
                   <span v-else>提交中...</span></Button>
          </Form>
        </div>
        <div class="info">
          <div class="tel">
            <img v-lazy="require('../../assets/images/icon_tel.svg')" width="32px" alt />
            <h1>{{value.tel}}</h1>
          </div>
          <p class="service-time">{{value.serviceHours}}</p>
          <div class="address">
            <div>
              <img v-lazy="require('../../assets/images/icon_location.svg')" width="32px" alt />
            </div>
            <ul>
              <li v-for="item in value.address" :key="item.index">{{item.value}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="sitemap">
      <div class="content">
        <div class="site-list">
          <h1>SITEMAP</h1>
          <div>
            <div v-for="item in sitemap" :key="item.label" :title="item.label">
              <h2 :class="{'underline':item.children}">
                <a @click="onTitleClick(item)" href="javascript:void 0">{{item.label}}</a>
              </h2>
              <ul v-if="item.children">
                <li v-for="(site,index) in item.children" :key="site.label">
                  <a
                    :title="site.label"
                    @click.stop="onSubItmeClick(site,index)"
                    href="javascript:void 0"
                  >{{site.label}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="qr-code">
          <div>
            <img v-lazy="value.wechatQrCode" alt="帮专网公众号" />
            <p>帮专网公众号</p>
          </div>
          <div>
            <img v-lazy="value.wechatMiniProgramQrCode" alt="帮专网小程序" />
            <p>帮专网小程序</p>
          </div>
        </div>
      </div>
    </div>
    <div class="related-links" v-if="value.relatedLinks.length">
      <div class="content">
        <p>
          友情链接:
          <template v-for="(item,index) in value.relatedLinks">
            <Divider :key="`d${item.index}`" v-if="index" type="vertical" />
            <a
              :title="item.value"
              target="_blank"
              :key="`a${item.index}`"
              :href="item.protocol+item.url+item.last"
            >{{item.value}}</a>
          </template>
        </p>
      </div>
    </div>
    <div class="copyright" v-html="value.copyright"></div>
  </div>
</template>
<script>
import { getConsult,getNewsList } from '../../api/'
export default {
  name: 'BzFooter',
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    productMenu: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading:false,
      hasModalOpen: false,
      form: {
        name: '',
        phone: '',
        content: ''
      },
      formRule: {
        name: { required: true, message: '请输入您的姓名', trigger: 'blur' },
        phone: {
          required: true,
          message: '请输入您的手机号码',
          trigger: 'blur'
        },
        content: {
          required: true,
          message: '请输入您的要咨询的内容',
          trigger: 'blur'
        }
      },
      defaultSitemap: [
        {
          label: '专利情报',
          name: 'News'
        },
        {
          label: '关于我们',
          name: 'AboutUs',
          children: [
            {
              name: 'AboutUs',
              label: '公司简介',
              activeId: 0
            },
           {
              name: 'AboutUs',
              label: '帮专荣誉',
              activeId:1
            },
            {
              name: 'AboutUs',
              label: '团队介绍',
              activeId: 2
            }
          ]
        }
      ]
    }
  },
  // watch:{
  //   list(val){
  //     this.$set(this.defaultSitemap,0,val)
  //     this.sitemap=this.productMenu.concat(this.defaultSitemap)
  // }
  // },
  computed: {
    visible() {
      return (this.$store.state.width > 640 || this.$route.name === 'Home')&&!this.$route.meta.hideFooter
    },
    sitemap() {
      this.$set(this.defaultSitemap[0],'children',this.$store.state.newsList)
      return this.productMenu.concat(this.defaultSitemap)
    }
  },
  methods: {
  getNewsList() {
      getNewsList({
        page: 1,
        rows: 6
      }).then(res => {
        if (res.status) {
          res.data.rows.map(item => {
            item.label=item.title
            item.name='NewsList'
          })
          this.list = res.data.rows
          this.$store.commit('setNewsList', this.list)
        }
      })
    },
    onValidate(prop, status, error) {
      if (!status && !this.hasModalOpen) {
        this.hasModalOpen = true
        this.$Modal.warning({
          title: '提示',
          content: error,
          onOk: () => {
            this.hasModalOpen = false
          }
        })
      }
    },
    getConsult() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading=true
          this.form.city=(returnCitySN||{}).cname
          getConsult(this.form).then(res => {
            if (res.status) {
               this.loading=false
                 this.$refs.form.resetFields()
                 document.querySelectorAll('.filled').forEach(item => {
                  item.classList.remove('filled')
                  })
              this.$Modal.success({
                title: '提交成功',
                content: '客服会在2小时内与您取得联系。'
              })
            }
          })
        }
      })
    },
    onTitleClick(item) {
      if (item.name) {
        this.$router.push({
          name: item.name
        })
      } else {
        this.$router.push({
          name: 'Products',
          params: {
            type: item.type
          }
        })
      }
    },
    onSubItmeClick(item, index) {
      if (item.name) {
        this.$router.push({
          name: item.name,
          query: {
            activeId: item.activeId||index
          }
        })
      } else {
        this.$router.push({
          name: 'Products',
          params: {
            type: item.type
          },
          query: {
            activeId: index
          }
        })
      }
    }
  },
  mounted() {
    let cityInfo=document.createElement('script')
    cityInfo.src='http://pv.sohu.com/cityjson?ie=utf-8'
    cityInfo.onload=function () {
      console.log(returnCitySN)
    }
    cityInfo.id='cityInfo'
    document.body.appendChild(cityInfo)
    this.getNewsList()
    this.$nextTick(() => {
      document.querySelectorAll('.footer input').forEach(function(inputEl) {
        if (inputEl.value !== '') {
          inputEl.parentNode.parentNode.classList.add('filled')
          inputEl.parentNode.classList.add('filled')
        }
        inputEl.addEventListener('focus', event => {
          event.target.parentNode.parentNode.classList.add('filled')
          event.target.parentNode.classList.add('filled')
        })
        inputEl.addEventListener('blur', event => {
          if (event.target.value === '') {
            event.target.parentNode.parentNode.classList.remove('filled')
            event.target.parentNode.classList.remove('filled')
          }
        })
      })
    })
  }
}
</script>
<style lang="less" >
.footer{
  .copyright {
     a {
      color: #fff;
    }
  }}
.ivu-modal-body {
  .ivu-btn-primary {
    background-color: @mainColor;
    border-color: @mainColor;
  }
}
</style>
<style lang="less"  scoped>
a {
  color: #fff;
}
.footer .related-links a:hover,
.footer .site-list a:hover {
  color: @mainColor;
}

.footer {
  color: #fff;
  width: 100%;
  min-width: 1180px;
  // background-image: url(../../assets/images/footer_bg.jpg);
  background-size: cover;
  background-position: top center;
  overflow: auto;
  .contact-us .content {
    .info {
      .tel {
        display: flex;
        height: 42px;
        align-items: center;
        img {
          margin-right: 20px;
        }
      }
      .service-time {
        padding-left: 53px;
      }
      .address {
        margin-top: 20px;
        display: flex;
        img {
          margin-right: 20px;
        }
        ul,
        li {
          list-style: none;
          margin-bottom: 15px;
        }
      }
    }
  }
  .sitemap {
    .qr-code {
      display: flex;
      justify-content: space-between;
      p {
        text-align: center;
      }
    }
  }
  .related-links {
    margin-top: 50px;
    margin-bottom: 50px;
    a {
      color: #fff;
    }
  }

  .copyright {
    width: 100%;
    line-height: 40px;
    text-align: center;
     a {
      color: #fff;
    }
  }
}
.ivu-form-item {
  overflow: hidden;
  margin-bottom: 0;
  vertical-align: initial;
  zoom: initial;
}
@keyframes lineAnimation {
  50% {
    opacity: 0;
    transform: translate3d(20px, 0, 0);
  }

  51% {
    opacity: 0;
    transform: translate3d(-20px, -20px, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
}
.ivu-form-item-content {
  overflow: hidden;
  input {
    color: #fff;
    position: relative;
    display: block;
    padding: 0.8em;
    border: none;
    border-radius: 0;
    -webkit-appearance: none;
    outline: none;
    margin-top: 5px;
    width: 100%;
    background: transparent !important;
    font-size: 14px;
    height: 52px !important;
  }

  .ivu-input {
    height: initial;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    &:hover,
    &:focus {
      -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
      -webkit-text-fill-color: #595f6e !important;
      box-shadow: none !important;
      outline: none !important;
    }
  }

  &.filled label:after {
    transform: translate3d(0, 0, 0);
  }

  &.filled label > span:before {
    animation: lineAnimation 0.3s forwards;
  }

  &.filled label > span:before {
    content: attr(data-filled-title);
  }
}

label {
  display: inline-block;
  color: #fff;
  font-size: 70.25%;
  user-select: none;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 0.25em;
  width: 100%;
  height: calc(100% - 5px);
  text-align: left;
  pointer-events: none;

  > span:before {
    display: block;
    padding: 0.8em 0;
    width: 100%;
    position: absolute;
    content: attr(title);
    font-size: 13px;
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 10px);
    border-bottom: 1px solid #e7e7e7;
  }

  &:after {
    margin-top: 1px;
    border-bottom: 2px solid @mainColor;
    transform: translate3d(-100%, 0, 0);
    transition: transform 0.3s;
  }
}
@media screen and (min-width: 641px) {
  .footer {
    .content {
      position: relative;
      width: 1180px;
      padding-left: 50px;
      padding-right: 50px;
      margin-left: auto;
      margin-right: auto;
    }
    .contact-us {
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    }
    .contact-us .content {
      display: flex;
      margin-top: 60px;
      margin-bottom: 50px;
      .info {
        width: 50%;
        margin-top: 140px;
      }
      .form-wrapper {
        h1 {
          font-size: 40px;
          font-weight: normal;
          letter-spacing: 2px;
        }
        h2 {
          font-size: 32px;
          margin-bottom: 5px;
          position: relative;
        }
        width: 50%;
        form {
          width: 350px;
        }
        .submit-btn {
          background-color: @mainColor;
          color: #fff;
          border: none;
          padding: 5px 15px;
          margin-top: 10px;
        }
      }
    }
    .sitemap {
      margin-top: 50px;
      .content {
        display: flex;
      }
      .site-list {
        width: 70%;
        h1 {
          letter-spacing: 2px;
          font-size: 36px;
          font-weight: normal;
          margin-bottom: 15px;
        }
        h2 {
          font-size: 14px;
          margin-bottom: 8px;
          &.underline::after {
            content: "";
            display: block;
            height: 1px;
            width: 16px;
            background-color: #fff;
            margin-top: 8px;
          }
        }
        ul,
        li {
          list-style: none;
          line-height: 30px;
        }
        li a{
          display: block;
          max-width: 130px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        font-size: 14px;
        > div {
          display: flex;
          > div {
            margin-right: 40px;
          }
        }
      }
      .qr-code {
        margin-top: 40px;
        width: 30%;
        img {
          width: 150px;
          height: 150px;
          border-radius: 3px;
        }
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .footer {
    min-width: auto;
    .content {
    }
    .contact-us {
      margin-top: 50px;
      .content {
        h2 {
          margin-bottom: 5px;
        }
        .info {
          margin-top: 40px;
          padding-left: 30px;
          padding-right: 30px;
          .service-time {
            padding-left: 30px;
          }
          .tel {
            height: 30px;
            align-items: center;
          }
          .tel img,
          .address img {
            width: 20px;
            margin-right: 10px;
          }
          .tel h1 {
            font-size: 18px;
          }
          .address {
            font-size: 12px;
          }
        }
        .form-wrapper {
          padding-left: 30px;
          padding-right: 30px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          .submit-btn {
            width: 100%;
            background-color: @mainColor;
            color: #fff;
            border: none;
            padding-top: 7px;
            padding-bottom: 7px;
            border-radius: 3px;
            margin-top: 15px;
            margin-bottom: 40px;
          }
        }
      }
    }
    .sitemap {
      .site-list {
        display: none;
      }
      .qr-code {
        padding-left: 50px;
        padding-right: 50px;
        margin-top: 20px;
        justify-content: space-around;
        img {
          border-radius: 3px;
          width: 100px;
          height: 100px;
        }
      }
    }
    .related-links {
      font-size: 12px;
      padding-left: 30px;
      padding-right: 30px;
    }
  }
}
</style>