<template>
  <div class="login">
    <Card :bordered="false">
      <p slot="title">登录</p>
      <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80">
        <FormItem label="Username" prop="username">
          <Input v-model="form.username" placeholder="Enter your username" maxlength="11"></Input>
        </FormItem>
        <FormItem label="Password" prop="password">
          <Input type="password" v-model="form.password" placeholder="Enter your Password"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="login('formCustom')">Login</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import { JSEncrypt } from 'jsencrypt'
import md5 from 'js-md5'
import { login } from '@/api/wechat/'
const pk='MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCQOB61ZM4d0VvsCFDWc/NhdQJVIqzM6gbslouqKpe+7gnf87BgcmmMgLz4Cvw4wOY+ZuLYRUPdZNVPwC3JJUkjMGZdiqYJ7+SEOGPBBoR10UMcY8RRK1u7LGXwsINxkTWu6rdN21X+u+53n5FRdGbOMubmZyGHoZOltB4wsNi5DwIDAQAB'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      ruleValidate: {}
    }
  },
  methods: {
    login() {
       let jsencrypt = new JSEncrypt()
        jsencrypt.setPublicKey(pk)
        let m5 = md5(this.form.password + 'chuangwei878987')
        let password = jsencrypt.encrypt(m5)
       console.log(password)
      login({
        phoneNumber: this.form.username,
        password
      }).then(res => {
        if (res.code===80200) {
          localStorage.setItem('token', 'Bearer '+res.data['access_token'])
           localStorage.setItem('userInfo', JSON.stringify(res.data['loginInfo']))
          this.$router.replace({
            name: 'Workbench'
          })
        } else {
          this.$Notice.error({
            title: '错误',
            desc: res.data.message
          })
        }
      })
    }
  }
}
</script>
<style lang="less" >
.login {
  background: #eee;
  height: 100%;
  overflow: hidden;
  .ivu-card {
    width: 500px;
    margin: 200px auto;
  }
}
</style>
