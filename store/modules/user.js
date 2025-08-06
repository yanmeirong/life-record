const state = {
  userInfo: null,
  isLogin: false,
  userStats: {
    posts: 0,
    likes: 0,
    followers: 0,
    following: 0,
    points: 0,
    level: 1
  }
}

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
    state.isLogin = !!userInfo
  },
  
  UPDATE_USER_STATS(state, stats) {
    state.userStats = { ...state.userStats, ...stats }
  },
  
  LOGOUT(state) {
    state.userInfo = null
    state.isLogin = false
  }
}

const actions = {
  setUserInfo({ commit }, userInfo) {
    commit('SET_USER_INFO', userInfo)
    wx.setStorageSync('userInfo', userInfo)
  },
  
  logout({ commit }) {
    commit('LOGOUT')
    wx.removeStorageSync('userInfo')
  },
  
  async getUserInfo({ commit }) {
    try {
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        commit('SET_USER_INFO', userInfo)
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}