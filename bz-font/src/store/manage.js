Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    avatar: '',
    gender: 0,
    isSubscribe:0,
    job: '',
    nickname: '',
    username: ''
  },
  mutations: {
    setUserInfo(state, payload) {
    state.userInfo = payload
    state.isSubscribe=payload.isSubscribe
    state.avatar=payload.avatar
    state.gender=payload.gender
    state.job=payload.job
    state.nickname=payload.nickname
    state.username=payload.username
  }},
  actions: {},
  modules: {

  }
})
