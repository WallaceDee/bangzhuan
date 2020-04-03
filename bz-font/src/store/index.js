Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productMenu:[],
    width:document.body.clientWidth
  },
  mutations: {
    setProductMenu(state, payload) {
      state.productMenu=payload
    },
    setWidth(state,payload){
      state.width=payload
    }
  },
  actions: {},
  modules: {}
})
