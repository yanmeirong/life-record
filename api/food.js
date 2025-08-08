import request from '@/utils/request'

/**
 * 创建美食打卡
 * @param {FormData} formData - 美食打卡信息
 * 包含: title, description, restaurant_name, location, latitude, longitude, images
 */
export const createFoodCheckin = (formData) => {
  return request({
    url: '/food-checkins',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 获取美食打卡列表
 */
export const getFoodCheckins = () => {
  return request({
    url: '/food-checkins',
    method: 'GET'
  })
}

/**
 * 获取单个美食打卡详情
 * @param {number} id - 打卡ID
 */
export const getFoodCheckinDetail = (id) => {
  return request({
    url: `/food-checkins/${id}`,
    method: 'GET'
  })
}

/**
 * 更新美食打卡
 * @param {number} id - 打卡ID
 * @param {FormData} formData - 要更新的信息
 */
export const updateFoodCheckin = (id, formData) => {
  return request({
    url: `/food-checkins/${id}`,
    method: 'PUT',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 删除美食打卡
 * @param {number} id - 打卡ID
 */
export const deleteFoodCheckin = (id) => {
  return request({
    url: `/food-checkins/${id}`,
    method: 'DELETE'
  })
}

/**
 * 给美食打卡点赞
 * @param {number} id - 打卡ID
 */
export const likeFoodCheckin = (id) => {
  return request({
    url: `/food-checkins/${id}/like`,
    method: 'POST'
  })
}

/**
 * 评论美食打卡
 * @param {number} id - 打卡ID
 * @param {Object} data - 评论信息
 * @param {string} data.content - 评论内容
 */
export const commentFoodCheckin = (id, data) => {
  return request({
    url: `/food-checkins/${id}/comments`,
    method: 'POST',
    data
  })
}
    