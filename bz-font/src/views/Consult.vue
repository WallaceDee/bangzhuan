<template>
  <div class="consult">
    <div class="content">
      <Card shadow :bordered="false" class="consult-card" :class="{'success':success}">
        <router-link slot="extra" to="/">返回首页></router-link>
        <p slot="title">获取解决方案</p>
          <Spin fix v-if="loading"></Spin>
        <div class="success-info">
          <img class="success-img" src="../assets/images/icon_success.svg" alt />
          <h1>提交成功</h1>
        </div>
        <Form ref="form" :model="form" :rules="formRule">
          <FormItem prop="name">
            <Input placeholder="请输入您的姓名" v-model="form.name"></Input>
          </FormItem>
          <FormItem prop="phone">
            <Input placeholder="请输入您的手机号码" v-model="form.phone" maxlength="11"></Input>
          </FormItem>
          <FormItem prop="content">
            <Input type="textarea" placeholder="请输入您的要咨询的内容" :rows="4" v-model="form.content"></Input>
          </FormItem>
          <FormItem>
            <Button @click.native="doSubmit" long type="primary" size="large">提交</Button>
          </FormItem>
        </Form>
        <p class="tips"></p>
        <div class="contact-info">
          <div>
            <img src="../assets/images/icon_tel.svg" width="24px" alt />
          </div>
          <div>
            <h1>{{$store.state.tel}}</h1>
            <p>{{$store.state.serviceHours}}</p>
          </div>
        </div>
      </Card>
    </div>
    <p class="copyright" v-html="$store.state.copyright"></p>
  </div>
</template>
<script>
import { getConsult } from "../api/";
export default {
  name: "Consult",
  data() {
    return {
      loading:false,
      success:false,
      form: {
        name: "",
        phone: "",
        content: ""
      },
      formRule: {
        name: { required: true, message: "请输入您的姓名", trigger: "blur" },
        phone: {
          required: true,
          message: "请输入您的手机号码",
          trigger: "blur"
        },
        content: {
          required: true,
          message: "请输入您的要咨询的内容",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    doSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading=true
          getConsult(this.form).then(res => {
            if(res.status){
              this.success=true
              this.loading=false
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.consult {
  width: 100%;
  height: 100vh;
  min-height: 600px;
  background-image: url(../assets/images/consult_bg.jpg);
  background-size: cover;
  background-position: center;
  .ivu-card-extra a {
    color: @mainColor;
  }
  .ivu-input.ivu-input-default {
    height: 40px;
  }
  textarea {
    resize: none;
  }
  .consult-card {
    .success-info {
      height: 296px;
      display: none;
      .success-img {
        display: block;
        width: 55%;
        margin-right: auto;
        margin-left: auto;
      }
      h1 {
        text-align: center;
        margin-top: 35px;
      }
    }

    &.success {
      .success-info {
        display: block;
      }
      form {
        display: none;
      }
      color: #fff;
      background-image: linear-gradient(45deg, #0099ff, #07cbd4);
      p,
      a,
      h1 {
        color: #fff;
      }
      .contact-info > div:first-child {
        background: transparent;
        border-color: #fff;
      }
          p.tips {
      &::after{
              color: #fff;
        content: "请耐心等待，客服会在2小时内与您取得联系。";
      }
    }
    }
    p.tips {
      color: #858585;
      &::after{
        content: "成功提交后，客服会在2小时内与您取得联系。";
      }
    }
    .contact-info {
      display: flex;
      margin-top: 40px;
      > div:first-child {
        flex-shrink: 0;
        width: 42px;
        height: 42px;
        background: #eaeaea;
        border-radius: 50%;
        border: 1px solid #eaeaea;
        margin-right: 10px;
        > img {
          display: block;
          margin-right: auto;
          margin-left: auto;
          margin-top: 9px;
        }
      }
      > div:last-child {
        color: #858585;
        h1 {
          letter-spacing: 1px;
          font-size: 20px;
          line-height: 24px;
        }
      }
    }
  }

  .ivu-card-body {
    padding-top: 30px;
    padding-right: 30px;
    padding-left: 30px;
    .ivu-form-item:last-child {
      margin-bottom: 10px;
    }
  }

  .copyright {
    width: 100%;
    position: absolute;
    bottom: 5px;
    text-align: center;
    color: #fff;
    a {
      color: #fff !important;
    }
  }
}
@media screen and (min-width: 641px) {
  .consult,
  .copyright {
    min-width: 1180px;
  }
  .consult {
    .content {
      position: relative;
      width: 1180px;
      margin-left: auto;
      margin-right: auto;
      height: 100vh;
    }
    .consult-card {
      width: 400px;
      height: 520px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateY(-50%) translateX(-50%);
      &.success {
        form {
          display: none;
        }
        color: #fff;
        background-image: linear-gradient(45deg, #0099ff, #07cbd4);
        p:after,
        a,
        h1 {
          color: #fff;
        }
        .contact-info > div:first-child {
          background: transparent;
          border-color: #fff;
        }
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .consult {
    min-width: auto;
  .copyright,.ivu-card-extra{
    display: none;
  }
    .content{
          height: 100vh;
      overflow: auto;
      .consult-card{
        height: calc(~"100% - 50px");
        margin-top: 50px;
        border-radius: 0;
      }
    }
  }
}
</style>