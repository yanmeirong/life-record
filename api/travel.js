import request from '@/utils/request'

/**
 * 创建旅游打卡
 * @param {FormData} formData - 旅游打卡信息
 * 包含: title, description, location, latitude, longitude, images
 */
export const createTravelCheckin = (formData) => {
  return request({
    url: '/travel-checkins',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 获取旅游打卡列表
 */
export const getTravelCheckins = () => {
  return request({
    url: '/travel-checkins',
    method: 'GET'
  })
}

/**
 * 获取单个旅游打卡详情
 * @param {number} id - 打卡ID
 */
export const getTravelCheckinDetail = (id) => {
  return request({
    url: `/travel-checkins/${id}`,
    method: 'GET'
  })
}

/**
 * 更新旅游打卡
 * @param {number} id - 打卡ID
 * @param {FormData} formData - 要更新的信息
 */
export const updateTravelCheckin = (id, formData) => {
  return request({
    url: `/travel-checkins/${id}`,
    method: 'PUT',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 删除旅游打卡
 * @param {number} id - 打卡ID
 */
export const deleteTravelCheckin = (id) => {
  return request({
    url: `/travel-checkins/${id}`,
    method: 'DELETE'
  })
}

/**
 * 给旅游打卡点赞
 * @param {number} id - 打卡ID
 */
export const likeTravelCheckin = (id) => {
  return request({
    url: `/travel-checkins/${id}/like`,
    method: 'POST'
  })
}

/**
 * 评论旅游打卡
 * @param {number} id - 打卡ID
 * @param {Object} data - 评论信息
 * @param {string} data.content - 评论内容
 */
export const commentTravelCheckin = (id, data) => {
  return request({
    url: `/travel-checkins/${id}/comments`,
    method: 'POST',
    data
  })
}
    