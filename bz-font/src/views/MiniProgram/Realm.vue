<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>基础设置</BreadcrumbItem>
      <BreadcrumbItem>领域管理</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Button type="primary" @click="openCreatePopup">新建领域</Button>
    <Divider />
    <Table  :columns="columns" :data="data" :loading="loading" stripe></Table>
    <Divider />
    <Page :current="page" :total="total" show-total @on-change="onPageChange" />
    <Drawer :title="drawerTitle" v-model="drawerVisible"  width="720">
     <Form :model="form" :label-width="120" ref="form" :rules="rules">
        <FormItem prop="realmName" label="领域名称">
          <Input v-model="form.realmName"></Input>
        </FormItem>
             <FormItem prop="realmCode" label="领域Code">
          <Input v-model="form.realmCode"></Input>
        </FormItem>
             <FormItem prop="realmExplain" label="备注">
          <Input v-model="form.realmExplain"></Input>
        </FormItem>
      </Form>
        <div class="drawer-footer">
        <Button style="margin-right: 8px" @click="drawerVisible=false">取消</Button>
        <Button type="primary" @click="doSumbit">提交</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import { getRealms,createRealms,updateRealm,deleteRealm,setRealmDisable } from '@/api/wechat/'
export default {
  name: 'Users',
  data() {
    return {
      editMode:false,
      total: 0,
      page: 1,
      form: {
        realmName: '',
        realmCode:'',
        realmExplain:''
      },
      rules:{},
      drawerVisible: false,
      loading: false,
      data: [],
       columns: [
        {
          title: '领域',
          key: 'realmName',
          align: 'center',
          minWidth: 150
        },
             {
          title: 'code',
          key: 'realmCode',
          align: 'center',
          minWidth: 150
        },
        {
          title: '备注',
          key: 'realmExplain',
          align: 'center',
          minWidth: 150
        },
                {
          title: '创建时间',
          key: 'createTime',
          align: 'center',
          minWidth: 210
        },
        {
          title: '状态',
          align: 'center',
          minWidth: 150,
          render: function(h, params) {
            return h('span', params.row.enable ? '启用' : '禁用')
          }
        },
          {
          title: '操作',
          align: 'center',
          width:250,
          fixed: 'right',
          render: (h, params) => {
            return [
              h(
                'Poptip',
                {
                  props: {
                    placement: 'bottom',
                    transfer: true,
                    confirm: true,
                    title: `您确认要${
                      params.row.enable === 0 ? '启用' : '禁用'
                    }这个领域吗？`
                  },
                  on: {
                    'on-ok': () => {
                      this.setRealmEnable(params.row)
                    }
                  }
                },
                [
                  h(
                    'Button',
                    {
                      props: {
                        size: 'small'
                      }
                    },
                    params.row.enable === 0 ? '启用' : '禁用'
                  )
                ]
              ),
              h(
                'Poptip',
                {
                  props: {
                    placement: 'bottom',
                    transfer: true,
                    confirm: true,
                    title: `您确认要删除这个领域吗？`
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteRealm(params.row)
                    }
                  }
                },
                [
                  h(
                    'Button',
                    {
                      props: {
                        size: 'small'
                      }
                    },
                    '删除'
                  )
                ]
              ),
              h(
                'Button',
                {
                  props: {
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.openUpdatePopup(params.row)
                    }
                  }
                },
                '编辑'
              )
            ]
          }
        }
       ]}
  },
  computed:{
    drawerTitle(){
      return (this.editMode?'编辑':'新建')+'领域'
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    setRealmEnable(item){
      const enable=Math.abs(item.enable-1)
      if(enable){
      updateRealm({
        id:item.id,
        enable:Math.abs(item.enable-1)
      }).then(res => {
        this.$Notice[res.code === 80200?'success':'error']({
            title: '提示',
            desc: res.msg
          })
          this.getData()
      })
      }else{
        setRealmDisable({
          ids:[item.id]
        }).then(res => {
        this.$Notice[res.code === 80200?'success':'error']({
            title: '提示',
            desc: res.msg
          })
            this.getData()
      })
      }
    },
    getData(current) {
      this.loading = true
      getRealms({
        current:current||this.page,
        size:10
      }).then(res => {
        if (res.code === 80200) {
          this.loading = false
          this.data = res.data.records
          this.total=res.data.total
        }
      })
    },
    doSumbit(){
      if(this.form.id){
        updateRealm(this.form).then(res => {
        if(res.code===80200){
          this.$Notice.success({
            title: '提示',
            desc: '编辑成功！'
          })
          this.getData()
        }else{
         this.$Notice.error({
            title: '提示',
            desc: res.msg
          })
        }
        this.drawerVisible=false
      })
      }else{
        createRealms(this.form).then(res => {
        if(res.code===80200){
          this.$Notice.success({
            title: '提示',
            desc: '新建成功！'
          })
          this.getData()
        }else{
         this.$Notice.error({
            title: '提示',
            desc: res.msg
          })
        }
        this.drawerVisible=false
      })
      }
    },
    deleteRealm(item){
      deleteRealm({
        ids:[item.id]
      }).then(res => {
        if(res.code===80200){
            this.$Notice.success({
            title: '提示',
            desc: '删除成功！'
          })
           this.getData()
        }else{
          this.$Notice.error({
            title: '提示',
            desc: res.msg
          })
        }
      })
    },
    onPageChange(page) {
      this.page = page
      this.getData()
    },
    openCreatePopup(){
      this.editMode=false
      this.drawerVisible=true
      this.$refs.form.resetFields()
    },
    openUpdatePopup(data){
      this.editMode=true
      this.drawerVisible=true
      this.form=data
    }
  }
}
</script>
<style lang="less">
</style>