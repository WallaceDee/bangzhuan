// import ViewUI from 'view-design'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components/'
import VueLazyload from 'vue-lazyload'

Vue.use(components)
// Vue.use(ViewUI)
Vue.config.productionTip = false
Vue.use(VueLazyload)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
