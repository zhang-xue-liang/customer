const WXAPI = require('apifm-wxapi')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    show: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      'userInfo.avatar': wx.getStorageSync('avatar')
    })
  },
  logOut(){
    this.setData({
      show: true
    })
  },
  onClose(){
    this.setData({
      show: false
    })
  },
  confim(){
    wx.removeStorageSync('token')
    wx.reLaunch({
      url: '/pages/login/index'
    })
    this.onClose()
  }
})