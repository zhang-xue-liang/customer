const WXAPI = require('apifm-wxapi')
const TOOLS = require('../../utils/tools.js')
const APP = getApp()

Page({
  data: {
    tab_data: [
      {name:'工单', id:1},
      {name:'产品', id:2},
      {name:'备件', id:3},
      {name:'回执', id:4},
      {name:'评价', id:5},
    ],
    activeId: 1,
    detail: {
      status: '1',
      planTime: '2021年4月28日 16:00',
      name: '陈骁',
      mobile: '1546875148',
      address: '浙江省 宁波市 高新区 迪信通大厦1号楼',
      schedule: [
        {txt: '【客服01】把工单指派给师傅【王鑫 】', time: '2021-04-27 15:26:28'}
      ],
      order: {
        no: 'GD202104265858',
        type: '维修',
        product: '电子锁',
        serviceType: '保内免费',
        serviceContent: '维修',
        situation: '指纹无法使用',
        creat: '创建人',
        creatTime: '2021-04-06 12:58:58',
        Installationer: '王鑫',
        masterPhone: '15487568542'
      }
    },
    listData:[],
  },
  toView(e){
    let data = this.data.listData[e.currentTarget.dataset.index]
    wx.navigateTo({
      url:'/pages/orderDetail/index',
      success(res) {
        res.eventChannel.emit("orderInfo",{ data: data })
      }
    })
  },
  onLoad: function(e) {
    const eventChannel = this.getOpenerEventChannel()
    let that = this
    eventChannel.on('orderList', function(data) {
      // console.log(data.data)
      that.setData({
        listData:data.data
      })
    })
  },
  // 展示侧边弹出层
  showScreening() {
    this.selectComponent('#screeningPop').showPop()
  },
  // 导航
  openLacation(e) {
    const latitude = 31.202088
    const longitude = 121.435233
    wx.openLocation({
      latitude,
      longitude,
      scale: 18
    })
  },
  // 联系客户
  call(e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone//仅为示例，并非真实的电话号码
    })
  },
  // 查看处理进度
  toPlan() {
    wx.navigateTo({
      url: '/pages/plan/index',
    })
  },
  // 切换类型
  changeStatus(e) {
    console.log(this)
    this.setData({ activeId: e.currentTarget.dataset.id})
    if (e.currentTarget.dataset.id === 4 && this.data.detail.status === '1') {
      wx.navigateTo({
        url: '/pages/receipt/index',
      })
    }
  }
})
