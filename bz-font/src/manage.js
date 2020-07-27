import App from './App.vue'
import router from './router/manage.js'
import store from './store/manage.js'
import components from './components/manage'
import config from './config/'
Vue.prototype.$config = config
Vue.use(components)

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (token || to.name === 'Login') {
    next()
  } else {
    next({
      name: 'Login'
    })
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
