import Login from '../views/MiniProgram/Login.vue'

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
      import(/* webpackChunkName: "about" */ '../views/MiniProgram/Workbench.vue'),
    children: [{
      path: 'Index',
      name: 'Index',
      meta: {
        title: '首页'
      },
      component: resolve => require(['@/views/MiniProgram/Index'], resolve)
    },{
      path: 'Realm',
      name: 'Realm',
      meta: {
        title: '领域'
      },
      component: resolve => require(['@/views/MiniProgram/Realm'], resolve)
    },{
      path: 'Area',
      name: 'Area',
      meta: {
        title: '地域'
      },
      component: resolve => require(['@/views/MiniProgram/Area'], resolve)
    },{
      path: 'Article',
      name: 'Article',
      meta: {
        title: '文章发布'
      },
      component: resolve => require(['@/views/MiniProgram/Article'], resolve)
    },{
      path: 'Banner',
      name: 'Banner',
      meta: {
        title: '轮播图管理'
      },
      component: resolve => require(['@/views/MiniProgram/Banner'], resolve)
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
