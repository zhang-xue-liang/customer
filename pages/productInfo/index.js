const WXAPI = require('apifm-wxapi')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },
  apply(){
    let that = this
    wx.navigateTo({
      url: '/pages/repair/index',
      success(res){
        res.eventChannel.emit('productInfo',{ data:that.data.detail })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const eventChannel = this.getOpenerEventChannel()
    let that = this
    eventChannel.on('productInfo', function(data) {
      console.log(data.data)
      that.setData({
        detail:data.data
      })
    })
  },
})