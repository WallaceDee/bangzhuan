<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>设置</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Form :model="form" :label-width="100" ref="form" :rules="rules">
      <FormItem label="昵称">
        <Input v-model="form.nickname" placeholder="请输入昵称..." style="width:200px;"></Input>
      </FormItem>
      <FormItem label="头像">
        <Upload
          ref="upload"
          :show-upload-list="false"
          :format="['jpg','jpeg','png','svg']"
          :max-size="2048"
          type="drag"
          :action="`${$config.baseUrl}/ue?action=uploadimage&path=upload/avatar`"
          :on-success="(res, file)=>{
            handleSuccess(res, file)
          }"
          style="display: inline-block;width:120px;"
        >
          <div style="width: 120px;height:120px;line-height: 120px;">
            <img v-if="form.avatar" :src="form.avatar" alt="头像" style="width:120px;" />
            <Icon v-else type="ios-camera" size="20"></Icon>
          </div>
        </Upload>
      </FormItem>
      <FormItem label="邮箱">
        <AutoComplete
          v-model="form.email"
          @on-search="handleSearch"
          placeholder="请输入邮箱"
          style="width:200px"
        >
          <Option v-for="item in emailList" :value="item" :key="item">{{ item }}</Option>
        </AutoComplete>
      </FormItem>
      <FormItem label="性别">
        <RadioGroup v-model="form.gender">
          <Radio :label="0">
            <span>女</span>
          </Radio>
          <Radio :label="1">
            <span>男</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="modalVisible=true">修改密码</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">修改</Button>
      </FormItem>
    </Form>
    <Modal title="修改密码" v-model="modalVisible">
      <p slot="footer"></p>
      <Form :model="passwordForm" :rules="passwordRules" ref="passwordForm">
        <FormItem prop="password" label="当前密码">
          <Input v-model="passwordForm.password" type="password"></Input>
        </FormItem>
        <FormItem prop="newPassword" label="新密码">
          <Input v-model="passwordForm.newPassword" type="password"></Input>
        </FormItem>
        <FormItem prop="newPasswordCheck" label="确认密码">
          <Input v-model="passwordForm.newPasswordCheck" type="password"></Input>
        </FormItem>
        <FormItem>
          <Button @click.native="onModalOkClick">修改</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { updateUserInfo, updatePassword } from '../../api/manage/'
import md5 from 'js-md5'
export default {
  name: 'UserInfo',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('长度必须大于等于6位'))
      } else {
        if (this.passwordForm.newPasswordCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.passwordForm.validateField('newPasswordCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: true,
      passwordRules: {
        password: [
          { required: true, message: '请输入当前用户密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        newPasswordCheck: [
          { required: true, message: '请再输入新密码', trigger: 'blur' },
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      },
      passwordForm: {
        password: '',
        newPassword: '',
        newPasswordCheck: ''
      },
      modalVisible: false,
      emailList: [],
      rules: {},
      form: {
        avatar: '',
        nickname: '',
        gender: -1,
        email: ''
      }
    }
  },
  watch: {
    '$store.state.userInfo'(val) {
      let temp = JSON.parse(JSON.stringify(val))
      this.form = temp
    }
  },
  methods: {
    onModalOkClick() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          updatePassword({
            old: md5('bz' + this.passwordForm.password),
            new: md5('bz' + this.passwordForm.newPassword)
          }).then(res => {
            this.modalVisible = false
            if (res.status) {
              this.$Notice.success({
                title: '提示',
                desc: res.data.message
              })
            }
          })
        }
      })
    },
    handleSubmit() {
      updateUserInfo(this.form).then(res => {
        if (res.status) {
          this.$Notice.success({
            title: '提示',
            desc: res.data.message
          })
          this.$store.commit('setUserInfo', res.data.userInfo)
        }
      })
    },
    handleSearch(value) {
      this.emailList =
        !value || value.indexOf('@') >= 0
          ? []
          : [
              value + '@bzwip.com',
              value + '@qq.com',
              value + '@sina.com',
              value + '@163.com'
            ]
    },
    handleSuccess(res, file) {
      this.$set(this.form, 'avatar', res.url)
    }
  },
  mounted() {
    let temp = JSON.parse(JSON.stringify(this.$store.state.userInfo))
    this.form = temp
  }
}
</script>