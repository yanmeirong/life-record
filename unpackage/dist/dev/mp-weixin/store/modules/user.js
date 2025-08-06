"use strict";
const common_vendor = require("../../common/vendor.js");
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
};
const mutations = {
  SET_USER_INFO(state2, userInfo) {
    state2.userInfo = userInfo;
    state2.isLogin = !!userInfo;
  },
  UPDATE_USER_STATS(state2, stats) {
    state2.userStats = { ...state2.userStats, ...stats };
  },
  LOGOUT(state2) {
    state2.userInfo = null;
    state2.isLogin = false;
  }
};
const actions = {
  setUserInfo({ commit }, userInfo) {
    commit("SET_USER_INFO", userInfo);
    common_vendor.wx$1.setStorageSync("userInfo", userInfo);
  },
  logout({ commit }) {
    commit("LOGOUT");
    common_vendor.wx$1.removeStorageSync("userInfo");
  },
  async getUserInfo({ commit }) {
    try {
      const userInfo = common_vendor.wx$1.getStorageSync("userInfo");
      if (userInfo) {
        commit("SET_USER_INFO", userInfo);
      }
    } catch (error) {
      common_vendor.index.__f__("error", "at store/modules/user.js:48", "获取用户信息失败:", error);
    }
  }
};
const user = {
  namespaced: true,
  state,
  mutations,
  actions
};
exports.user = user;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/store/modules/user.js.map
