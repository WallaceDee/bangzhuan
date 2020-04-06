Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    description:'',
    data:[],
    productMenu:[],
    setting:{},
    width:document.body.clientWidth,
    wechatQrCode:''
  },
  mutations: {
    setProductMenu(state, payload) {
      state.productMenu=payload
    },
    setWidth(state,payload){
      state.width=payload
    },
    setSetting(state,payload){
      state.setting=payload
      state.data=payload.data
      state.description=payload.description
      state.wechatQrCode=payload.wechatQrCode
    }
  },
  actions: {},
  modules: {}
})
