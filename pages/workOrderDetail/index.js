import { workOrder, openVoice }  from '../../api/service'
import {error} from "../../utils/toast";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: '1',
    loading:false,
    view:{
    },
    id: '',
    length: '',
    showInvo: false,
    showInvoErr: false
  },
  async getView(id){
    try{
      this.setData({loading: true})
      const data = await workOrder(id);
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
  // 工单评价
  gdPJ(){
    wx.navigateTo({
      url:'/pages/evaluation/index?type=2&id=' + this.data.id
    })
  },
  // 申请开票
  async openInvoice(){
    if(this.data.view.price != 0){
      try{
        const data = await openVoice(this.data.id);
        console.log('data',data)
        if(data.code === 0){
          this.setData({
            showInvo: true
          })
          this.getView(this.data.id)
        }else{
          error(data.msg)
        }
      }catch (e){ error(e.toString()) }
    } else {
      this.setData({
        showInvoErr: true
      })
    }
  },
  onCloseInvo(){
    this.setData({
      showInvo: false
    })
  },
  onCloseInvoErr(){
    this.setData({
      showInvoErr: false
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
