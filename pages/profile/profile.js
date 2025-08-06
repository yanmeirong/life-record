// 可在此添加页面级别的生命周期函数或工具方法
Page({
  onLoad() {
    console.log('生活记录页面加载完成')
  },
  onPullDownRefresh() {
    // 下拉刷新逻辑
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  }
})