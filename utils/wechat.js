/**
 * 微信小程序API工具类（兼容Vue组件）
 * 封装常用的微信原生API，便于项目中统一调用
 */

/**
 * 显示操作菜单
 * @param {Object} options - 配置项
 * @param {Array} options.itemList - 菜单选项列表
 * @param {Function} options.success - 成功回调
 * @param {Function} options.fail - 失败回调
 * @param {Function} options.complete - 完成回调
 */
export const showActionSheet = (options) => {
  return new Promise((resolve, reject) => {
    wx.showActionSheet({
      itemList: options.itemList || [],
      itemColor: options.itemColor || '#000000',
      success: (res) => {
        options.success && options.success(res)
        resolve(res)
      },
      fail: (err) => {
        options.fail && options.fail(err)
        reject(err)
      },
      complete: options.complete
    })
  })
}

/**
 * 分享给微信好友
 * @param {Object} options - 分享配置
 * @param {String} options.title - 分享标题
 * @param {String} options.path - 分享路径
 * @param {String} options.imageUrl - 分享图片
 * @param {Function} options.success - 成功回调
 * @param {Function} options.fail - 失败回调
 */
export const shareAppMessage = (options) => {
  return new Promise((resolve, reject) => {
    // 直接调用分享API，无需setData（Vue组件中通过页面的onShareAppMessage返回配置）
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage']
    })
    
    // 在页面组件中需单独实现onShareAppMessage方法返回分享配置
    resolve()
  })
}

/**
 * 分享到朋友圈
 * @param {Object} options - 分享配置
 * @param {String} options.title - 分享标题
 * @param {String} options.query - 分享路径参数
 * @param {String} options.imageUrl - 分享图片
 * @param {Function} options.success - 成功回调
 * @param {Function} options.fail - 失败回调
 */
export const shareToTimeline = (options) => {
  return new Promise((resolve, reject) => {
    // 开启朋友圈分享权限
    wx.updateShareMenu({
      withShareTicket: true,
      isTimelineShare: true,
      success: () => {
        // 调用朋友圈分享API
        wx.shareTimeline({
          title: options.title,
          query: options.query || '',
          imageUrl: options.imageUrl || '',
          success: (res) => {
            options.success && options.success(res)
            resolve(res)
          },
          fail: (err) => {
            options.fail && options.fail(err)
            reject(err)
          }
        })
      },
      fail: (err) => {
        options.fail && options.fail(err)
        reject(err)
      }
    })
  })
}

/**
 * 保存图片到相册
 * @param {Object} options - 配置项
 * @param {String} options.url - 图片地址
 * @param {Function} options.success - 成功回调
 * @param {Function} options.fail - 失败回调
 */
export const saveImageToPhotosAlbum = (options) => {
  return new Promise((resolve, reject) => {
    // 先下载图片
    wx.downloadFile({
      url: options.url,
      success: (res) => {
        if (res.statusCode === 200) {
          // 保存图片到相册
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: (saveRes) => {
              options.success && options.success(saveRes)
              resolve(saveRes)
            },
            fail: (err) => {
              // 如果是因为权限问题失败，引导用户开启权限
              if (err.errMsg.indexOf('deny') > -1) {
                wx.showModal({
                  title: '提示',
                  content: '需要获取相册权限才能保存图片，请在设置中开启',
                  success: (modalRes) => {
                    if (modalRes.confirm) {
                      wx.openSetting()
                    }
                  }
                })
              }
              options.fail && options.fail(err)
              reject(err)
            }
          })
        } else {
          const error = new Error('图片下载失败')
          options.fail && options.fail(error)
          reject(error)
        }
      },
      fail: (err) => {
        options.fail && options.fail(err)
        reject(err)
      }
    })
  })
}
