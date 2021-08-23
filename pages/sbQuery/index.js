const { searchBySerialNo, searchByPhone, } = require('../../api/service')
const { error } = require('../../utils/toast')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: '手机号查询',
    place: '点击输入序列号（在智能锁电池盖内部）',
    inputValue:'15067820638',
    loading: false,
  },
  bindinput(e){
    this.data.inputValue = e.detail.value
  },
  /**
   * 扫描二维啊
   */
  scanCode(){
    let that = this
    wx.scanCode({
      onlyFromCamera: true,
      success (res) {
        console.log('扫一扫数据',res.result)
        that.setData({
          inputValue: res.result
        })
      },
      fail(res) {
        error('无法识别序列号')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  changeType(){
    if (this.data.type === '手机号查询'){
      this.setData({
        type: '序列号查询',
        place: '点击输入手机号'
      })
    } else {
      this.setData({
        type: '手机号查询',
        place: '点击输入序列号（在智能锁电池盖内部）'
      })
    }
  },
  async search(e){
    if(this.data.type === '手机号查询'){
      //序列号查询
      // console.log(this.data.inputValue)
      if(this.data.inputValue === ''){
        error('请输入序列号');
        return
      }
      try{
        if(this.data.loading) return;
        this.data.loading = true
        const data = await searchBySerialNo(this.data.inputValue);
        this.data.loading = false
        console.log('data',data)
        if(data.code === 0){
          this.data.loading = false
          wx.navigateTo({
            url: '/pages/productInfo/index',
            success(res){
              res.eventChannel.emit("productInfo",{ data: data.data })
            }
          })
        }else{
          this.data.loading = false
          error(data.msg)
        }
      }catch (e) { error(e.toString());this.data.loading = false }
    }else{
      //手机号查询
      // console.log(this.data.inputValue)
      if(this.data.inputValue === ''){
        error('请输入手机号');
        return
      }
      try{
        const data = await searchByPhone(this.data.inputValue);
        console.log('data',data)
        if(data.code === 0){
          this.data.loading = false
          wx.navigateTo({
            url:'/pages/orderList/index',
            success(res) {
              res.eventChannel.emit("orderList",{ data: data.data })
            }
          })
        }else{
          this.data.loading = false
          error(data.msg)
        }
      }catch (e) { error(e.toString()) }
    }
  }
})
