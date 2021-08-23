const WXAPI = require('apifm-wxapi')
const AUTH = require('../../utils/auth')
const TOOLS = require('../../utils/tools.js') // TOOLS.showTabBarBadge();
const { list } = require('../../api/knowledge')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: "0",
    listData:[],
  },
  toView(e){
    let index = e.currentTarget.dataset.index
    console.log(index);
    let that = this
    wx.navigateTo({
      url: '/pages/knowledgeDetail/index',
      success(res){
        res.eventChannel.emit('detail', { data: that.data.listData[index] })
      }
    })
  },
  async getlist(){
    try {
      const data = await list();
      console.log('data',data);
      if(data.code === 0){
        this.setData({
          listData:data.data.records
        })
      }
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getlist();
  },
  onChange(e) {
    console.log(e)
    this.setData({active: e.currentTarget.dataset.idx})
  }
})