const WXAPI = require('apifm-wxapi')
const TOOLS = require('../../utils/tools.js')
const { searchBySerialNo } = require('../../api/service')
const APP = getApp()

Page({
  data: {
    item:{}
  },
  toApply(e){
    console.log(e)
    var that = this
    searchBySerialNo(e.currentTarget.dataset.obj.serial_no).then(response => {
      wx.navigateTo({
        url:'/pages/repair/index',
        success(res) {
          res.eventChannel.emit('productInfo',{ data:response.data })
        }
      })
    })
  },
  onLoad: function(e) {
    const eventChannel = this.getOpenerEventChannel()
    let that = this
    eventChannel.on('orderInfo', function(data) {
      console.log(data.data)
      that.setData({
        item:data.data
      })
    })
  }
})
