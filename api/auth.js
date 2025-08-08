import request from '@/utils/request'

/**
 * 用户注册
 * @param {Object} data - 注册信息
 * @param {string} data.username - 用户名
 * @param {string} data.email - 邮箱
 * @param {string} data.password - 密码
 */
export const register = (data) => {
  return request({
    url: '/register',
    method: 'POST',
    data
  })
}

/**
 * 用户登录
 * @param {Object} data - 登录信息
 * @param {string} data.email - 邮箱
 * @param {string} data.password - 密码
 */
export const login = (data) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

/**
 * 获取当前用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/user',
    method: 'GET'
  })
}

/**
 * 更新用户信息
 * @param {Object} data - 用户信息
 * @param {string} [data.username] - 用户名
 * @param {string} [data.avatar] - 头像URL
 */
export const updateUserInfo = (data) => {
  return request({
    url: '/user',
    method: 'PUT',
    data
  })
}

/**
 * 上传用户头像
 * @param {FormData} formData - 包含头像文件的FormData
 */
export const uploadAvatar = (formData) => {
  return request({
    url: '/user/avatar',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
    