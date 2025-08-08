import request from '@/utils/request'

/**
 * 创建生活记录
 * @param {Object} data - 生活记录信息
 * @param {string} data.content - 记录内容
 * @param {boolean} [data.is_private=false] - 是否私密
 */
export const createLifeRecord = (data) => {
  return request({
    url: '/life-records',
    method: 'POST',
    data
  })
}

/**
 * 获取生活记录列表
 */
export const getLifeRecords = () => {
  return request({
    url: '/life-records',
    method: 'GET'
  })
}
export const getPublicPosts = (id) => {
  return request({
    url: `/life/posts`,
    method: 'GET'
  })
}
/**
 * 获取单个生活记录详情
 * @param {number} id - 记录ID
 */
export const getLifeRecordDetail = (id) => {
  return request({
    url: `/life-records/${id}`,
    method: 'GET'
  })
}

/**
 * 更新生活记录
 * @param {number} id - 记录ID
 * @param {Object} data - 要更新的信息
 * @param {string} [data.content] - 记录内容
 * @param {boolean} [data.is_private] - 是否私密
 */
export const updateLifeRecord = (id, data) => {
  return request({
    url: `/life-records/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除生活记录
 * @param {number} id - 记录ID
 */
export const deleteLifeRecord = (id) => {
  return request({
    url: `/life-records/${id}`,
    method: 'DELETE'
  })
}

/**
 * 创建日程安排
 * @param {Object} data - 日程信息
 * @param {string} data.title - 日程标题
 * @param {string} [data.description] - 日程描述
 * @param {string} data.start_time - 开始时间(ISO格式)
 * @param {string} [data.end_time] - 结束时间(ISO格式)
 */
export const createSchedule = (data) => {
  return request({
    url: '/schedules',
    method: 'POST',
    data
  })
}

/**
 * 获取日程列表
 * @param {string} [date] - 日期(ISO格式)，获取指定日期的日程
 */
export const getSchedules = (date) => {
  return request({
    url: '/schedules',
    method: 'GET',
    params: date ? { date } : {}
  })
}

/**
 * 更新日程安排
 * @param {number} id - 日程ID
 * @param {Object} data - 要更新的信息
 */
export const updateSchedule = (id, data) => {
  return request({
    url: `/schedules/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除日程安排
 * @param {number} id - 日程ID
 */
export const deleteSchedule = (id) => {
  return request({
    url: `/schedules/${id}`,
    method: 'DELETE'
  })
}
