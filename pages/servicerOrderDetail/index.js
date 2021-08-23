import { serviceOrder, cancelServiceOrder }  from '../../api/service'
import {error} from "../../utils/toast";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: '1',
    loading:false,
    view:{},
    show:false,
    id: '',
    length: '',
    showCancel: false
  },
  async getView(id){
    try{
      this.setData({loading: true})
      const data = await serviceOrder(id);
      console.log('data',data)
      if(data.code === 0){
        data.data.logs.forEach(el=>{
          el.desc = el.content
          el.text = el.createTime
        })
        data.data.commentInfo.gradeInt =  Math.floor(data.data.commentInfo.grade)
        this.setData({
          view: data.data,
          loading: false,
          length: data.data.logs.length -1
        })
      }else{
        this.setData({loading: false})
        error(data.msg)
      }
    }catch (e){ error(e.toString()) }
  },
  // 看大图
  previewImage(e){
    console.log(e)
    var current=e.target.dataset.src
    wx.previewImage({
      current: this.data.view.incidentInfo.pictures.current, 
      urls: this.data.view.incidentInfo.pictures
    })
  },
  // 播放视频
  playVideo(){
    this.setData({
      show: true
    })
  },
  onClose(){
    this.setData({
      show: false
    })
  },
  // 取消服务
  cancelPop(){
    this.setData({
      showCancel: true
    })
  },
  onCancelClose(){
    this.setData({
      showCancel: false
    })
  },
  async cancelService(){
    try{
      const data = await cancelServiceOrder(this.data.id);
      console.log('data',data)
      if(data.code === 0){
        this.getView(this.data.id)
      }else{
        error(data.msg)
      }
    }catch (e){ error(e.toString()) }
    this.onCancelClose()
  },
  // 服务评价
  servicePJ(){
    wx.navigateTo({
      url:'/pages/evaluation/index?type=1&id=' + this.data.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getView(options.id)
    this.setData({
      id: options.id
    })
  },
  changeTab(e){
    this.setData({type: e.currentTarget.dataset.idx})
  }
})
