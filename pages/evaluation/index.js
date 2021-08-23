import { satisfactionServiceOrder, satisfactionGdOrder }  from '../../api/service'
import {error} from "../../utils/toast";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: 5,
    satisfactionDesc: '',
    type: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      type: options.type,
      id: options.id
    })
  },
  // 提交
  async confim(){
    const datas = {
      id: this.data.id,
      satisfaction: this.data.value,
      satisfactionDesc: this.data.satisfactionDesc
    }
    try{
      if(this.data.type === '1'){
        var data = await satisfactionServiceOrder(datas)
      } else {
        var data = await satisfactionGdOrder(datas)
      }
      console.log('data',data)
      if(data.code === 0){
        this.goBack()
      }else{
        error(data.msg)
      }
    }catch (e){ error(e.toString()) }
  },
  // 返回上一页
  goBack(){
    var pages = getCurrentPages()
    var beforePage = pages[pages.length - 2]
    beforePage.onLoad()
    wx.navigateBack({
      delta: 1
    })
  }
})