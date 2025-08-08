import request from '@/utils/request'

/**
 * 设置今日心情
 * @param {Object} data - 心情信息
 * @param {string} data.mood - 心情类型 (happy, sad, calm, excited, tired)
 * @param {string} [data.notes] - 心情笔记
 */
export const setMood = (data) => {
  return request({
    url: '/mood',
    method: 'POST',
    data
  })
}

/**
 * 获取今日心情
 */
export const getTodayMood = () => {
  return request({
    url: '/mood/today',
    method: 'GET'
  })
}

/**
 * 获取心情记录历史
 * @param {Object} params - 查询参数
 * @param {string} [params.start_date] - 开始日期
 * @param {string} [params.end_date] - 结束日期
 */
export const getMoodHistory = (params) => {
  return request({
    url: '/mood/history',
    method: 'GET',
    params
  })
}

/**
 * 添加愿望清单项目
 * @param {Object} data - 愿望信息
 * @param {string} data.title - 愿望标题
 * @param {string} [data.description] - 愿望描述
 */
export const addWishlistItem = (data) => {
  return request({
    url: '/wishlist',
    method: 'POST',
    data
  })
}

/**
 * 获取愿望清单
 */
export const getWishlist = () => {
  return request({
    url: '/wishlist',
    method: 'GET'
  })
}

/**
 * 更新愿望清单项目
 * @param {number} id - 愿望ID
 * @param {Object} data - 要更新的信息
 * @param {string} [data.title] - 愿望标题
 * @param {string} [data.description] - 愿望描述
 * @param {boolean} [data.fulfilled] - 是否已实现
 */
export const updateWishlistItem = (id, data) => {
  return request({
    url: `/wishlist/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除愿望清单项目
 * @param {number} id - 愿望ID
 */
export const deleteWishlistItem = (id) => {
  return request({
    url: `/wishlist/${id}`,
    method: 'DELETE'
  })
}

/**
 * 添加健康数据
 * @param {Object} data - 健康数据
 * @param {string} data.data_type - 数据类型 (weight, steps, sleep, etc.)
 * @param {number} data.value - 数据值
 * @param {string} [data.unit] - 单位
 */
export const addHealthData = (data) => {
  return request({
    url: '/health-data',
    method: 'POST',
    data
  })
}

/**
 * 获取健康数据
 * @param {Object} params - 查询参数
 * @param {string} [params.data_type] - 数据类型
 * @param {string} [params.start_date] - 开始日期
 * @param {string} [params.end_date] - 结束日期
 */
export const getHealthData = (params) => {
  return request({
    url: '/health-data',
    method: 'GET',
    params
  })
}

/**
 * 删除健康数据
 * @param {number} id - 健康数据ID
 */
export const deleteHealthData = (id) => {
  return request({
    url: `/health-data/${id}`,
    method: 'DELETE'
  })
}
    