<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>基础设置</BreadcrumbItem>
      <BreadcrumbItem>网站配置</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Form :model="form" :label-width="100">
      <FormItem label="公司名称">
        <Input v-model="form.name" placeholder="请输入公司名称..."></Input>
      </FormItem>
      <FormItem label="Copyright">
        <Input v-model="form.copyright" placeholder="请输入公司copyright信息..."></Input>
      </FormItem>
      <FormItem label="服务时间">
        <Input v-model="form.serviceHours" placeholder="请输入服务时间t信息..."></Input>
      </FormItem>
      <FormItem label="联系电话">
        <Input v-model="form.tel" placeholder="请输入公司copyright信息..."></Input>
      </FormItem>
      <FormItem label="联系地址"></FormItem>
      <FormItem
        v-for="(item, index) in form.addressItems"
        :key="'addressItems'+item.index"
        :label="`地址${index+1}`"
        :prop="'addressItems.'+index + '.value'"
        :rules="{required: true, message: `地址${index+1}不能为空`, trigger: 'blur'}"
      >
        <Row>
          <Col span="18">
            <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
          </Col>
          <Col span="4" offset="1">
            <Button @click="removeAddress(index)">删除</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="12">
            <Button type="dashed" long @click="addAddress" icon="md-add">添加地址</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="小程序二维码">
        <Upload
          ref="upload"
          :show-upload-list="false"
          :format="['jpg','jpeg','png','svg']"
          :max-size="2048"
          type="drag"
          action="api/ue?action=uploadimage&path=upload/qrCode"
          :on-success="(res, file)=>{
            handleSuccess(res, file,'wechatMiniProgramQrCode')
          }"
          style="display: inline-block;width:120px;"
        >
          <div style="width: 120px;height:120px;line-height: 120px;">
            <img
              v-if="form.wechatMiniProgramQrCode"
              :src="form.wechatMiniProgramQrCode"
              alt="小程序二维码"
              style="width:120px;"
            />
            <Icon v-else type="ios-camera" size="20"></Icon>
          </div>
        </Upload>
      </FormItem>
      <FormItem label="微信二维码">
        <Upload
          ref="upload"
          :show-upload-list="false"
          :format="['jpg','jpeg','png','svg']"
          :max-size="2048"
          type="drag"
          action="api/ue?action=uploadimage&path=upload/qrCode"
          :on-success="(res, file)=>{
            handleSuccess(res, file,'wechatQrCode')
          }"
          style="display: inline-block;width:120px;"
        >
          <div style="width: 120px;height:120px;line-height: 120px;">
            <img v-if="form.wechatQrCode" :src="form.wechatQrCode" alt="微信二维码" style="width:120px;" />
            <Icon v-else type="ios-camera" size="20"></Icon>
          </div>
        </Upload>
      </FormItem>
      <FormItem label="友情链接"></FormItem>
      <FormItem
        v-for="(item, index) in form.linkItems"
        :key="'linkItems'+item.index"
        :label="`链接${index+1}`"
        :prop="'linkItems.'+index + '.value'"
        :rules="{required: true, message: `链接名${index+1}不能为空`, trigger: 'blur'}"
      >
        <Row>
          <Col span="4">
            <Input type="text" v-model="item.value" placeholder="输入链接名称..."></Input>
          </Col>
          <Col span="14" offset="1">
            <Input v-model="item.url">
              <Select v-model="item.protocol" slot="prepend" style="width: 80px">
                <Option value="http://">http://</Option>
                <Option value="https://">https://</Option>
              </Select>
              <Select v-model="item.last" slot="append" style="width: 70px">
                <Option value=".com">.com</Option>
                <Option value=".com.cn">.com.cn</Option>
                <Option value="?">&nbsp;</Option>
              </Select>
            </Input>
          </Col>
          <Col span="4" offset="1">
            <Button @click="removeLink(index)">删除</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="12">
            <Button type="dashed" long @click="addLink" icon="md-add">添加链接</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="认识帮专">
        <Input v-model="form.description" placeholder="请输入介绍..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
      </FormItem>
      <FormItem
        v-for="(item, index) in form.dataItems"
        :key="'dataItems'+item.index"
        :label="`数据${index+1}`"
        :prop="'dataItems.'+index + '.value'"
        :rules="{required: true, message: `地址${index+1}不能为空`, trigger: 'blur'}"
      >
        <Row>
          <Col span="3">
          <InputNumber  :min="1" v-model="item.number"></InputNumber>
          </Col>
           <Col span="2" offset="1">
            <Input type="text" v-model="item.unit" placeholder="单位"></Input>
            </Col>
             <Col span="12" offset="1">
              <Input type="text" v-model="item.description" placeholder="描述"></Input>
          </Col>
          <Col span="4" offset="1">
            <Button @click="removeData(index)">删除</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="12">
            <Button type="dashed" long @click="addData" icon="md-add">添加数据</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">修改</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { getSetting, updateSetting } from '@/api/manage/'
export default {
  name: 'Setting',
  data() {
    return {
      form: {
        description:'',
        name: '',
        copyright: '',
        tel: '',
        linkItems: [],
        addressItems: [],
        dataItems:[]
      }
    }
  },
  methods: {
    getData() {
      getSetting().then(res => {
        if (res.status) {
          let temp = JSON.parse(
            JSON.stringify(Object.assign(this.form, res.data))
          )
          this.form = temp
          this.$set(this.form, 'addressItems', JSON.parse(temp.address || []))
            this.$set(this.form, 'dataItems', JSON.parse(temp.data || []))
          this.$set(
            this.form,
            'linkItems',
            JSON.parse(temp.relatedLinks || [])
          )
        }
      })
    },
    handleSuccess(res, file, type) {
      this.$set(this.form, type, res.url)
    },
    addLink() {
      this.form.linkItems.push({
        protocol: 'http://',
        last: '.com',
        value: '',
        index: this.form.linkItems.length
      })
    },
    addAddress() {
      this.form.addressItems.push({
        value: '',
        index: this.form.addressItems.length
      })
    },
        addData() {
      this.form.dataItems.push({
        value: '',
        index: this.form.dataItems.length
      })
    },
    removeData(index) {
      this.form.dataItems.splice(index, 1)
    },
    removeLink(index) {
      this.form.linkItems.splice(index, 1)
    },
    removeAddress(index) {
      this.form.addressItems.splice(index, 1)
    },
    handleSubmit() {
      let param = Object.assign({}, this.form)
      param.address = JSON.stringify(param.addressItems)
      delete param.addressItems
      param.relatedLinks = JSON.stringify(param.linkItems)
      delete param.linkItems
        param.data = JSON.stringify(param.dataItems)
      delete param.dataItems
      updateSetting(param).then(res => {
        if (res.status) {
          this.$Notice.success({
            title: '提示',
            desc: res.data.message
          })
        }
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>