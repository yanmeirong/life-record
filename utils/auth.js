export const login = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: (res) => {
        if (res.code) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          resolve(res.code)
        } else {
          reject(new Error('登录失败：' + res.errMsg))
        }
      },
      fail: reject
    })
  })
}

export const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    uni.getUserProfile({
      desc: '用于完善用户资料',
      success: resolve,
      fail: reject
    })
  })
}

export const checkAuth = () => {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          resolve(true)
        } else {
          resolve(false)
        }
      },
      fail: reject
    })
  })
}
