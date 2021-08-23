import { list, }  from '../../api/repair'
import { defaultImg, } from "../../utils/config"
import {error} from "../../utils/toast";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    searchText:'',
    defaultImg:defaultImg,
    data: [
      {'pic': 'http://jftg.oss-cn-shanghai.aliyuncs.com/img202002131642378862.jpg',
      'name': '螺丝刀',
      'no': '98562',
      'sku': '配件类别一',
      'dty': '16',
      'unit': '个',
      'price': '30.00'
    }
    ],
    total:-1,
    loading:false,
    noMore:false,
    page:1,
  },
  inputSearch(e){
    this.data.searchText = e.detail.value
  },
  doSearch(){
    this.data.page = 1
    this.getList();
  },
  async getList(){
    try{
      if(this.data.loading) return
      this.setData({loading:true,})
      const data = await list(this.data.searchText,this.data.page);
      console.log('data',data)
      if(data.code === 0){
        this.data.total = data.data.total
        if(this.data.page === 1){
          // 刷新
          this.setData({
            listData:data.data.records,
            loading: false,
            noMore: data.data.records === data.data.total
          })
        }else{
          //翻页
          let temp = [...this.data.listData,...data.data.records]
          this.setData({
            listData:temp,
            loading: false,
            noMore: temp.length === data.data.total
          })
        }
      } else{
        error(data.msg)
        this.setData({loading:true,})
      }
    }catch (e) { console.log(e);this.setData({loading:true,}) }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList();
  },
  onReachBottom(){
    console.log('onReachBottom')
    if(this.data.total !== this.data.listData.length){
      this.data.page ++
      this.getList();
    }
  }
})
