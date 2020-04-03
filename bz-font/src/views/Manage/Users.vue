<template>
  <div>
        <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>基础设置</BreadcrumbItem>
        <BreadcrumbItem>用户管理</BreadcrumbItem>
    </Breadcrumb>
      <Divider />
    <Table :columns="columns" :data="data"></Table>
  </div>
</template>
<script>
import { userList } from '@/api/manage/'
export default {
  name: "Users",
  data() {
    return {
      columns: [
                {
          title: "名字",
          key: "username"
        },
        {
          title: "名字",
          key: "nickname"
        },
        {
          title: "职位",
          key: "job"
        }
      ],
      data: []
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      userList().then(res=>{
        if(res.status){
          this.data=res.data.rows
        }
      })
    }
  }
}
</script>