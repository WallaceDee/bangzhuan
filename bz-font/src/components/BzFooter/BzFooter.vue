<template>
  <div class="footer">
    <div class="contact-us">
      <div class="content">
        <div class="form-wrapper">
          <h1>CONTACT US</h1>
          <h2>立即咨询</h2>
          <p>成功提交后，客服会在2小时内与您取得联系。</p>
          <Form ref="form" :model="form" :rules="formRule">
            <FormItem>
              <Input type="text" :maxlength="11" v-model="form.username"></Input>
              <label>
                <span title="请输入您的姓名" data-filled-title="姓名"></span>
              </label>
            </FormItem>
            <FormItem>
              <span class="input-wrapper">
                <Input type="text" v-model="form.password"></Input>
                <label>
                  <span title="请输入您的手机号码" data-filled-title="手机号码"></span>
                </label>
              </span>
            </FormItem>
            <FormItem>
              <span class="input-wrapper">
                <Input type="text" v-model="form.password"></Input>
                <label>
                  <span title="请输入您的要咨询的内容" data-filled-title="内容"></span>
                </label>
              </span>
            </FormItem>
            <button class="submit-btn">确认提交</button>
          </Form>
        </div>
        <div class="info">
          <div class="tel">
            <img src="../../assets/images/icon_tel.svg" width="32px" alt />
            <h1>{{currentValue.tel}}</h1>
          </div>
          <p class="service-time">{{currentValue.serviceHours}}</p>
          <div class="address">
            <div>
              <img src="../../assets/images/icon_location.svg" width="32px" alt />
            </div>
            <ul>
              <li v-for="item in address" :key="item.index">{{item.value}}</li>
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
            <div v-for="item in sitemap" :key="item.label">
              <h2 :class="{'underline':item.children}"><a href="">{{item.label}}</a></h2>
              <ul v-if="item.children">
                <li v-for="site in item.children" :key="site.label">
                  <a href="">{{site.label}}</a>
                  </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="qr-code">
          <div>
            <img :src="currentValue.wechatQrCode" alt />
            <p>帮专网公众号</p>
          </div>
          <div>
            <img :src="currentValue.wechatMiniProgramQrCode" alt />
            <p>帮专网小程序</p>
          </div>
        </div>
      </div>
    </div>
    <div class="related-links" v-if="relatedLinks.length">
      <div class="content">
        <p>
          友情链接:
          <template v-for="(item,index) in relatedLinks">
            <Divider :key="`d${item.index}`" v-if="index" type="vertical" />
            <a
              target="_blank"
              :key="`a${item.index}`"
              :href="item.protocol+item.url+item.last"
            >{{item.value}}</a>
          </template>
        </p>
      </div>
    </div>
    <div class="copyright" v-html="currentValue.copyright"></div>
  </div>
</template>
<script>
export default {
  name: "BzFooter",
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
      currentValue: {},
      form: {},
      formRule: {},
      defaultSitemap: [
        {
          label: "专利情报",
          path: "News"
        },
        {
          label: "关于我们",
          path: "AboutUs",
          children: [
            {
              label: "公司简介"
            },
            {
              label: "团队介绍"
            }
          ]
        }
      ]
    };
  },
  watch: {
    currentValue(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.currentValue = val;
    }
  },
  computed: {
    relatedLinks() {
      if (this.currentValue.relatedLinks) {
        return JSON.parse(this.currentValue.relatedLinks);
      } else {
        return [];
      }
    },
    address() {
      if (this.currentValue.address) {
        return JSON.parse(this.currentValue.address);
      } else {
        return [];
      }
    },
    sitemap() {
      return this.productMenu.concat(this.defaultSitemap);
    }
  },
  mounted() {
    if (this.value) {
      this.currentValue = this.value;
    }
    this.$nextTick(() => {
      document.querySelectorAll(".footer input").forEach(function(inputEl) {
        if (inputEl.value !== "") {
          inputEl.parentNode.parentNode.classList.add("filled");
          inputEl.parentNode.classList.add("filled");
        }
        inputEl.addEventListener("focus", event => {
          event.target.parentNode.parentNode.classList.add("filled");
          event.target.parentNode.classList.add("filled");
        });
        inputEl.addEventListener("blur", event => {
          if (event.target.value === "") {
            event.target.parentNode.parentNode.classList.remove("filled");
            event.target.parentNode.classList.remove("filled");
          }
        });
      });
    });
  }
};
</script>

<style lang="less"  scoped>
a{
  color: #fff;
}
.footer .related-links a:hover,.footer .site-list a:hover{
  color: @mainColor;
}

.footer {
  color: #fff;
  width: 100%;
  min-width: 1180px;
  background-image: url(../../assets/images/footer_bg.jpg);
  overflow: auto;
  .contact-us .content {
    .info {
      .tel {
        display: flex;
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