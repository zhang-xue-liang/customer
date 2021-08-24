import { workOrders, serviceOrders, }  from '../../api/service'
import {error} from "../../utils/toast";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: 1,//1工单 2服务
    show: false,
    loading:false,
    noMore:false,
    status:-1,
    comment:-1,
    page:1,
    listData:[],
    total:-1,
  },
  changeStatus(e){
    this.setData({
      status: parseInt(e.currentTarget.dataset.status)
    })
  },
  changeComment(e){
    this.setData({
      comment: parseInt(e.currentTarget.dataset.status)
    })
  },
  reset(){
    this.setData({
      status: -1,
      comment: -1,
    })
  },
  filter(){
    this.data.page = 1
    this.setData({show:false})
    this.getlist()
  },
  toView(e){
    if(this.data.type === 1){
      wx.navigateTo({
        url:'/pages/workOrderDetail/index?id='+e.currentTarget.dataset.id
      })
    }else{
      wx.navigateTo({
        url:'/pages/servicerOrderDetail/index?id='+e.currentTarget.dataset.id
      })
    }

  },
  getlist(){
    if(this.data.type === 1){
      this.getWorkList()
    }else{
      this.getServiceList();
    }
  },
  async getServiceList(){
    try{
      if(this.data.loading) return
      this.setData({loading: true})
      const data = await serviceOrders(this.data.status,this.data.comment,this.data.page);
      console.log('data',data)
      if(data.code === 0){
        data.data.records.forEach(el=>{
          el.grade = Math.floor(el.satisfaction)
        })

        if(this.data.page === 1){
          //刷新
          this.setData({
            total:data.data.total,
            listData:data.data.records,
            loading: false,
            noMore: data.data.total === data.data.records.length
          })
        }else{
          //翻页
          let temp = [...this.data.listData,...data.data.records]
          this.setData({
            total:data.data.total,
            listData:temp,
            loading: false,
            noMore: temp.length === data.data.total
          })
        }
      }else{
        error(data.msg)
        this.setData({loading: false})
      }
    }catch (e) { console.log(e);this.setData({loading: false}) }
  },
  async getWorkList(){
    try{
      if(this.data.loading) return
      this.setData({loading: true})
      const data = await workOrders(this.data.status,this.data.comment,this.data.page);
      console.log('data',data)
      if(data.code === 0){
        data.data.records.forEach(el=>{
          el.grade = Math.floor(el.satisfaction)
        })

        if(this.data.page === 1){
          //刷新
          this.setData({
            total:data.data.total,
            listData:data.data.records,
            loading: false,
            noMore: data.data.total === data.data.records.length
          })
        }else{
          //翻页
          let temp = [...this.data.listData,...data.data.records]
          this.setData({
            total:data.data.total,
            listData:temp,
            loading: false,
            noMore: temp.length === data.data.total
          })
        }
      }else{
        error(data.msg)
        this.setData({loading: false})
      }
    }catch (e) { console.log(e);this.setData({loading: false}) }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getlist()
  },
  changeTab(e) {
    this.setData({
      type: parseInt(e.currentTarget.dataset.idx),
      status: -1,
      comment: -1,
      page: 1,
      listData: [],
      total: -1
    })
    this.getlist()
  },
  showPop() {
    this.setData({show: true})
  },
  onClose() {
    this.setData({show: false})
  },
  onReachBottom(){
    console.log('onReachBottom')
    if(this.data.total !== this.data.listData.length){
      this.data.page ++
      this.getlist();
    }
  }
})
