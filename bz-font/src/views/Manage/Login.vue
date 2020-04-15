<template>
  <div class="login">
    <Card :bordered="false">
      <p slot="title">登录</p>
      <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80">
        <FormItem label="Username" prop="username">
          <Input v-model="form.username" placeholder="Enter your username"></Input>
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
import md5 from 'js-md5'
import { login } from '@/api/manage/'
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
      let md5Password = md5('bz' + this.form.password)
      login({
        username: this.form.username,
        password: md5Password
      }).then(res => {
        if (res.status) {
          localStorage.setItem('token', res.data.token)
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
