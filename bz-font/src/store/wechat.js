Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    avatar: '',
    gender: 0,
    job: '',
    nickname: '',
    username: ''
  },
  mutations: {
    setUserInfo(state, payload) {
    state.userInfo = payload
    state.avatar=payload.avatar
    state.gender=payload.gender
    state.job=payload.job
    state.nickname=payload.nickName
    state.username=payload.username
  }},
  actions: {},
  modules: {

  }
})
