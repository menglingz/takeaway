const state = {
  user: {
    username: '17686611652',
    password: '123456'
  },
  username: '',
  isLogin: false
}

const getters = {
  getUserName(state) {
    if (!state.isLogin) {
      state.username = sessionStorage.getItem('username')
    }
    return sessionStorage.getItem('username')
  },
  isLogin(state) {
    if (!state.isLogin) {
      state.isLogin = sessionStorage.getItem('isLogin')
    }
    return sessionStorage.getItem('isLogin')
  }
}

export default {
  state,
  getters
}
