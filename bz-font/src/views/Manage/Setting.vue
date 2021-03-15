<template>
  <div>
    <Spin v-if="loading" fix></Spin>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>基础设置</BreadcrumbItem>
      <BreadcrumbItem>网站配置</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Form :model="form" :label-width="100" ref="form" :rules="rules">
      <FormItem label="网站名称">
        <Input v-model="form.name" placeholder="请输入公司名称..." readonly></Input>
      </FormItem>
      <FormItem label="Copyright" prop="copyright">
        <Input v-model="form.copyright" placeholder="请输入公司copyright信息..."></Input>
      </FormItem>
      <FormItem label="服务时间" prop="serviceHours">
        <Input v-model="form.serviceHours" placeholder="请输入服务时间t信息..."></Input>
      </FormItem>
      <FormItem label="联系电话" prop="tel">
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
          :action="`${$config.baseUrl}/ue?action=uploadimage&path=upload/qrCode`"
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
          :action="`${$config.baseUrl}/ue?action=uploadimage&path=upload/qrCode`"
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
        :prop="'linkItems.'+index + '.url'"
        :rules="{required: true, message: `链接${index+1}不能为空`, trigger: 'blur'}"
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
      <FormItem label="认识帮专" prop="description">
        <Input
          v-model="form.description"
          placeholder="请输入介绍..."
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
        ></Input>
      </FormItem>
      <FormItem
        v-for="(item, index) in form.dataItems"
        :key="'dataItems'+item.index"
        :label="`数据${index+1}`"
        :prop="'dataItems.'+index + '.description'"
        :rules="{required: true, message: `数据${index+1}不能为空`, trigger: 'blur'}"
      >
        <Row>
          <Col span="3">
            <InputNumber :min="1" v-model="item.number"></InputNumber>
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
      <FormItem label="Title/Description/Keywords" :label-width="200">
        <Switch v-model="tdkSwitch" @on-change="(status)=>{tdkSwitch=status}" />
      </FormItem>
      <FormItem
        v-for="(item, index) in form.headElementItems"
        :key="'headElements'+item.index"
        :label="`TDK${index+1}`"
        :prop="'headElements.'+index + '.path'"
        :rules="{required: true, message: `path${index+1}不能为空`, trigger: 'blur'}"
      >
        <Row>
          <Col span="2">
            <Input type="text" v-model="item.path" placeholder="path" :disabled="!tdkSwitch"></Input>
          </Col>
          <Col span="3" offset="1">
              <Input type="text" v-model="item.title" placeholder="输入title" :disabled="!tdkSwitch"></Input>
          </Col>
             <Col span="6" offset="1">
              <Input type="textarea" v-model="item.description" placeholder="输入description" :disabled="!tdkSwitch"></Input>
          </Col>
          <Col span="6" offset="1">
              <Input type="textarea" v-model="item.keywords" placeholder="输入keywords" :disabled="!tdkSwitch"></Input>
          </Col>
        <Col span="24"  v-if="item.path==='index'" style="margin-bottom:10px;margin-top:10px;">
              <Input type="textarea" v-model="item.script" placeholder="输入script"  :autosize="{minRows: 2,maxRows: 10}" :disabled="!tdkSwitch"></Input>
          </Col>
          <Col span="20"  v-if="item.path==='index'">
              <Input type="textarea" v-model="item.externalsScript" placeholder="输入script src回车分割" :disabled="!tdkSwitch"></Input>
          </Col>
          <Col span="3" offset="1" v-if="tdkSwitch">
            <Button @click="removeHeadElement(index)">删除</Button>
          </Col>
        </Row>
         </FormItem>
        <FormItem v-if="tdkSwitch">
        <Alert type="warning" show-icon>修改Title/Description/Keywords必须发布代码才能生效，点击发布后需要等待1~2分钟，期间会导致官网短暂时间访问不了。如果发布失败，请联系开发人员。</Alert>
        <Row>
          <Col span="12">
            <Button type="dashed" long @click="addTDK" icon="md-add">Title/Description/Keywords</Button>
          </Col> <Col span="11" offset="1">
           <Button @click="saveTdkAndProd" :loading="loading" type="warning">发布</Button>   </Col> 
        </Row>
      </FormItem>

      <FormItem label="上传SiteMap.xml/Robot.txt"></FormItem>
        <FormItem>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :format="['xml','txt']"
          :max-size="2048"
          type="drag"
          :action="`${$config.baseUrl}/ue?action=uploadfile&norename=1&path=../ssr/dist`"
          style="display: inline-block;width:220px;"
          :on-success="(res, file)=>{
                handleSRSuccess(res, file, type)
              }"
        >
          上传SiteMap.xml/Robot.txt
        </Upload> <Divider type="vertical" />
          <a target="_blank" href="https://www.bangzhuanwang.com/Robot.txt">查看当前Robot.txt</a> <Divider type="vertical" />
          <a target="_blank" href="https://www.bangzhuanwang.com/SiteMap.xml">查看当前SiteMap.xml</a>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">修改</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { getSetting, updateSetting,saveTdkAndProd } from '@/api/manage/'
export default {
  name: 'Setting',
  data() {
    return {
      tdkSwitch:false,
      rules: {
        copyright: [
          { required: true, message: `Copyright不能为空`, trigger: 'blur' }
        ],
        description: [
          { required: true, message: `认识帮专不能为空`, trigger: 'blur' }
        ],
        serviceHours: [
          { required: true, message: `服务时间不能为空`, trigger: 'blur' }
        ],
        tel: [{ required: true, message: `联系电话不能为空`, trigger: 'blur' }]
      },
      loading: false,
      form: {
        description: '',
        name: '',
        copyright: '',
        tel: '',
        linkItems: [],
        addressItems: [],
        dataItems: [],
        headElementItems:[]
      }
    }
  },
  methods: {
    saveTdkAndProd(){
        this.$refs.form.validate(valid => {
        if (valid) {
          this.loading=true
          let param = Object.assign({}, this.form)
          param.address = JSON.stringify(param.addressItems)
          delete param.addressItems
          param.relatedLinks = JSON.stringify(param.linkItems)
          delete param.linkItems
          param.data = JSON.stringify(param.dataItems)
          delete param.dataItems
          param.headElements = JSON.stringify(param.headElementItems)
          delete param.headElementItems
          saveTdkAndProd(param).then(res => {
            if (res.status) {
               this.loading=false
              this.$Notice.success({
                title: '提示',
                desc: res.data.message
              })
            }
          })
        }
      })

    },
    getData() {
      this.loading = true
      getSetting().then(res => {
        if (res.status) {
          this.loading = false
          let temp = JSON.parse(
            JSON.stringify(Object.assign(this.form, res.data))
          )
          this.form = temp
          this.$set(this.form, 'addressItems', temp.address)
          this.$set(this.form, 'dataItems', temp.data)
          this.$set(this.form, 'linkItems', temp.relatedLinks)
          this.$set(this.form, 'headElementItems', temp.headElements)
        }
      })
    },
    handleSRSuccess(res, file, type) {
      this.$Notice.success({
          title: '提示',
          desc: '上传成功！'
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
        number: 0,
        unit: '',
        description: '',
        index: this.form.dataItems.length
      })
    },
    addTDK(){
      this.form.headElementItems.push({
        path:'',
        title: '',
        description: '',
        keywords:'',
        script:'',
        index: this.form.headElementItems.length
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
    removeHeadElement(index) {
      this.form.headElementItems.splice(index, 1)
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let param = Object.assign({}, this.form)
          param.address = JSON.stringify(param.addressItems)
          delete param.addressItems
          param.relatedLinks = JSON.stringify(param.linkItems)
          delete param.linkItems
          param.data = JSON.stringify(param.dataItems)
          delete param.dataItems
          param.headElements = JSON.stringify(param.headElementItems)
          delete param.headElementItems
          updateSetting(param).then(res => {
            if (res.status) {
              this.$Notice.success({
                title: '提示',
                desc: res.data.message
              })
            }
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