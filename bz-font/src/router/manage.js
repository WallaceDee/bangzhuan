import Login from '../views/Manage/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Workbench/Index'
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Workbench',
    name: 'Workbench',
    redirect: '/Workbench/Index',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Manage/Workbench.vue'),
    children: [{
      path: 'Index',
      name: 'Index',
      meta: {
        title: '首页'
      },
      component: resolve => require(['@/views/Manage/Index'], resolve)
    }, {
      path: 'Setting',
      name: 'Setting',
      meta: {
        title: '网站配置'
      },
      component: resolve => require(['@/views/Manage/Setting'], resolve)
    },{
      path: 'Users',
      name: 'Users',
      meta: {
        title: '用户'
      },
      component: resolve => require(['@/views/Manage/Users'], resolve)
    },{
      path: 'Banner',
      name: 'Banner',
      meta: {
        title: '轮播图'
      },
      component: resolve => require(['@/views/Manage/Banner'], resolve)
    },{
      path: 'Consult',
      name: 'Consult',
      meta: {
        title: '解决方案'
      },
      component: resolve => require(['@/views/Manage/Consult'], resolve)
    },{
      path: 'Cases',
      name: 'Cases',
      meta: {
        title: '用户案例'
      },
      component: resolve => require(['@/views/Manage/Cases'], resolve)
    },{
      path: 'News',
      name: 'News',
      meta: {
        title: '专利情报'
      },
      component: resolve => require(['@/views/Manage/News'], resolve)
    },{
      path: 'Team',
      name: 'Team',
      meta: {
        title: '团队管理'
      },
      component: resolve => require(['@/views/Manage/Team'], resolve)
    },{
      path: 'Product',
      name: 'Product',
      meta: {
        title: '产品与服务'
      },
      component: resolve => require(['@/views/Manage/Product'], resolve)
    },{
      path: 'UserInfo',
      name: 'UserInfo',
      meta: {
        title: '用户信息'
      },
      component: resolve => require(['@/views/Manage/UserInfo'], resolve)
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
