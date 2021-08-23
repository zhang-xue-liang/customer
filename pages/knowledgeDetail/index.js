const WXAPI = require('apifm-wxapi')
const { imgBaseUrl } = require('../../utils/config')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    view:{},
    attach: [],
    loading: false,
    filePath: '',
    show: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const eventChannel = this.getOpenerEventChannel()
    let that = this
    eventChannel.on('detail', function(data) {
      console.log(data.data)
      that.setData({
        view:data.data,
        attach: JSON.parse(data.data.attach)
      })
    })
  },
  onShow(){
    this.setData({
      loading: false,
      show: false
    })
  },
  onClose(){
    console.log('bbbbbbbbbbbbbbbbbbbbbbbb')
    this.setData({
      show: false  
    })
  },
  // 下载附件
  downlod(e){
    console.log(e)
    var that = this
    this.setData({
      loading: true  
    })
    wx.downloadFile({
      url: imgBaseUrl+ e.currentTarget.dataset.url,
      success: function (res) {
        that.setData({
          loading: false,
          filePath: res.tempFilePath,
          show: true
        }) 
      }
    })
  },
  openFile(){
    var that = this
    this.onClose()
    wx.openDocument({   
      filePath: this.data.filePath,   
      success: function (res) {
        that.onClose()
      }
    })
  }

})