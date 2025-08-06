const baseURL = 'http://127.0.0.1:5000'  // 你的后端接口地址

class Request {
  constructor() {
    this.baseURL = baseURL
    this.timeout = 10000
  }

  // 获取本地存储的token
  getToken() {
    // 从本地存储中获取token（与登录时保存的键名一致）
    return uni.getStorageSync('token') || ''
  }

  request(options) {
    // 获取token
    const token = this.getToken()
    
    // 构建请求头，默认包含Content-Type和认证信息
    const headers = {
      'Content-Type': 'application/json',
      // 如果有token，添加到Authorization头（JWT标准格式）
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      // 允许外部传入的header覆盖默认值
      ...options.header
    }

    return new Promise((resolve, reject) => {
      uni.showLoading({
        title: '加载中...',
        mask: true
      })

      uni.request({
        url: this.baseURL + options.url,
        method: options.method || 'GET',
        data: options.data || {},
        header: headers,  // 使用构建好的请求头
        timeout: this.timeout,
        success: (res) => {
          uni.hideLoading()
          
          // 处理token过期的情况（后端返回401状态码）
          if (res.statusCode === 401) {
            // 清除无效的token
            uni.removeStorageSync('token')
            // 提示用户重新登录
            uni.showToast({
              title: '登录已过期，请重新登录',
              icon: 'none'
            })
            // 跳转到登录页
            setTimeout(() => {
              uni.navigateTo({ url: '/pages/login/login' })
            }, 1500)
            reject('token已过期')
            return
          }

          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
            uni.showToast({
              title: res.data?.message || '请求失败',
              icon: 'none'
            })
          }
        },
        fail: (error) => {
          uni.hideLoading()
          reject(error)
          uni.showToast({
            title: '网络异常，请检查连接',
            icon: 'none'
          })
        }
      })
    })
  }

  // 以下方法保持不变
  get(url, data, header) {
    return this.request({ url, method: 'GET', data, header })
  }

  post(url, data, header) {
    return this.request({ url, method: 'POST', data, header })
  }

  put(url, data, header) {
    return this.request({ url, method: 'PUT', data, header })
  }

  delete(url, data, header) {
    return this.request({ url, method: 'DELETE', data, header })
  }
}

export default new Request()