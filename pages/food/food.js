Page({
  onLoad() {
    console.log('美食打卡页面加载完成')
  },
  onPullDownRefresh() {
    // 下拉刷新逻辑
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  }
})