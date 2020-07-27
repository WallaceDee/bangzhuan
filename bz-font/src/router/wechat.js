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
      path: 'RealmAndArea',
      name: 'RealmAndArea',
      meta: {
        title: '领域地域'
      },
      component: resolve => require(['@/views/MiniProgram/RealmAndArea'], resolve)
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
