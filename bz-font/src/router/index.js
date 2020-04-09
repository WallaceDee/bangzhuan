import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/',
    children:[ {
      path: '/',
      name: 'Home',
      component: () =>
        import('../views/Home.vue')
    },{
      path: 'products/:type',
      name: 'Products',
      component: () =>
        import('../views/Products.vue')
    },{
      path: 'news',
      name: 'News',
      redirect:'news/list',
      component: () =>
      import('../views/News.vue'),
      children:[ {
        path:'list',
        name: 'NewsList',
        component: () =>
        import('../views/News/List.vue')
      },{
        path:'detail/:id',
        name: 'NewsDetail',
        component: () =>
        import('../views/News/Detail.vue')
      }]
    },{
      path: 'aboutus',
      name: 'AboutUs',
      component: () =>
        import('../views/AboutUs.vue')
    },{
      path: '/consult',
      name: 'Consult',
      meta:{
        hideNav:true,
        hideFooter:true
      },
      component: () =>
        import('../views/Consult.vue')
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
