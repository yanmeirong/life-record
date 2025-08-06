/**
 * 本地存储工具类
 */
export const Storage = {
  /**
   * 保存数据到本地存储
   * @param {string} key - 存储键名
   * @param {any} value - 存储值
   * @param {number} expires - 过期时间（秒），可选
   */
  set(key, value, expires) {
    const data = {
      value,
      expires: expires? Date.now() + expires * 1000 : null
    }
    wx.setStorageSync(key, data)
  },
  
  /**
   * 从本地存储获取数据
   * @param {string} key - 存储键名
   * @returns {any} 存储值（过期则返回null）
   */
  get(key) {
    try {
      const data = wx.getStorageSync(key)
      if (!data) return null
      
      // 检查是否过期
      if (data.expires && Date.now() > data.expires) {
        this.remove(key)
        return null
      }
      
      return data.value
    } catch (error) {
      console.error('获取存储失败:', error)
      return null
    }
  },
  
  /**
   * 从本地存储删除数据
   * @param {string} key - 存储键名
   */
  remove(key) {
    wx.removeStorageSync(key)
  },
  
  /**
   * 清空所有本地存储
   */
  clear() {
    wx.clearStorageSync()
  },
  
  /**
   * 检查本地存储是否存在指定键
   * @param {string} key - 存储键名
   * @returns {boolean} 是否存在
   */
  has(key) {
    return !!wx.getStorageSync(key)
  }
}

export default Storage