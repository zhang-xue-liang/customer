const { uploadUrl, imgBaseUrl, } = require('../../utils/config')
const { imageUtil } = require('../../utils/image')
import { error, success, } from "../../utils/toast"
import { apply } from '../../api/service'


Page({
  /**
   * 页面的初始数据
   */
  data: {
    contentText: '选择服务内容',
    addressText: '选择所在地区',
    productInfo:{},
    upTip: '上传图片/视频',
    showPo: false,
    video: '',
    isUP: true,
    uploadImgList: [],
    form:{
      type:1,
      eventDesc:'',
      pictures:[],
      picture:'', //pictures合并后
      clientName:'',
      clientMobile:'',
      address:'',
      provinceId:0,
      provinceName:'',
      cityId:0,
      cityName:'',
      areaId:0,
      areaName:''
    },
    range:{
      types:['安装服务','维修服务']
    },
    loading:false,
  },
  close(){
    this.setData({
      showPo: false
    })
  },
  doUpload(){
    if(this.data.upTip === '上传图片/视频'){
      this.setData({
        showPo: true
      })
    } else if(this.data.upTip === '上传图片'){
      this.doUpPic()
    } else if(this.data.upTip === '上传视频'){
      this.doUpVideo()
    }
  },
  upFile(file, type){
    let that = this
    let header = {}
    const token = wx.getStorageSync('token')
    header.Authorization = 'Bearer ' + token
    header['TENANT-ID'] = 1
    wx.uploadFile({
      url: uploadUrl,
      filePath: file,
      header:header,
      name: 'file',
      success (res){
        if(type === 1){
          const data = res.data
          const imgTemp =  JSON.parse(data).data
          that.setData({
            uploadImgList: that.data.uploadImgList.concat(imgBaseUrl + imgTemp.url)
          })
          if(that.data.uploadImgList.length === 5){
            that.setData({
              isUP: false
            })
          }
        } else {
          const data = res.data
          const imgTemp =  JSON.parse(data).data
          that.setData({
            video: imgBaseUrl + imgTemp.url,
            isUP: false
          })
        }
      },
      fail: function(error){
        
      }
    })
  },
  doUpPic(){
    this.setData({
      upTip: '上传图片',
      showPo: false
    })
    let that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const tempFilePaths = res.tempFilePaths
        console.log('tempFilePaths',tempFilePaths);
        that.upFile(tempFilePaths[0],1)
      }
    })
  },
  delImg(e){
    this.data.uploadImgList.splice(e.currentTarget.dataset.id,1)
    this.setData({
      uploadImgList: this.data.uploadImgList
    })
    if(this.data.uploadImgList.length < 5){
      this.setData({
        isUP: true
      })
    }
    if(this.data.uploadImgList.length ===0){
      this.setData({
        isUP: true,
        upTip: '上传图片/视频',
      })
    }
  },
  delVi(){
    this.setData({
      isUP: true,
      video: '',
      upTip: '上传图片/视频',
    })
  },
  doUpVideo(){
    this.setData({
      upTip: '上传视频',
      showPo: false
    })
    let that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      // maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
      camera: 'back',//默认拉起的是前置或者后置摄像头，默认back
      compressed: true,//是否压缩所选择的视频文件
      success: function(res){
        console.log('success',res)
        if(res.size > 30*1024*1024) {
          error('上传的视频过大')
        } else {
          that.upFile(res.tempFilePath)
        }
      },
      fail: function(err) {
        console.log('err',err)
      },
      complete: function(res) {
        console.log(res)
      }
    })
  },
  changeType(e){
    console.log(e.detail.value);
    this.setData({
      'form.type': e.detail.value
    })
  },
  inputDesc(e){
    this.data.form.eventDesc = e.detail.value
  },
  inputName(e){
    this.data.form.clientName = e.detail.value
  },
  inputPhone(e){
    this.data.form.clientMobile = e.detail.value
  },
  inputAddress(e){
    this.data.form.address = e.detail.value
  },
  async submit(){
    let temp = ''
    this.data.form.pictures.forEach(el=>{
      temp += el + ','
    })
    temp = temp.substr(0,temp.length - 1)
    this.data.form.picture = temp

    console.log(this.data.form)
    console.log(this.data.productInfo)
    this.data.form.picture = this.data.uploadImgList.join(',')
    this.data.form.video = this.data.video
    if(this.vail(this.data.form)){
      try{
        if(this.data.loading) return
        this.data.loading = true
        const data = await apply(this.data.productInfo,this.data.form)
        this.data.loading = false
        console.log('data',data)
        if(data.code === 0){
          success('提交成功',() => {
            wx.reLaunch({
              url:'/pages/repairSchedule/index'
            })
          })
        }else{
          error(data.msg)
        }
      }catch (e) { error(e.toString());this.data.loading = false }
    }
  },
  vail(form){
    if(!form.eventDesc){
      error('请填写情况说明')
      return false
    }
    if(!form.clientName){
      error('请填写客户名称')
      return false
    }
    if(!form.clientMobile){
      error('请填写联系方式')
      return false
    }
    if(!form.provinceId || !form.cityId || !form.areaId){
      error('请选择所在地区')
      return false
    }
    if(!form.address){
      error('请填写详细地址')
      return false
    }
    return true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const eventChannel = this.getOpenerEventChannel()
    let that = this
    eventChannel.on('productInfo', function(data) {
      console.log('data',data.data)
      that.setData({
        productInfo:data.data
      })
    })
  },
  // 展示选择地址弹出层
  showArea() {
    this.selectComponent('#areaPop').showArea()
  },
  // area组件传递得地区信息 type: Array
  areadata(e) {
    console.log(e.detail.data)
    if(e.detail.data.length === 3){
      let text = '';
      let temp = e.detail.data
      temp.forEach(el=>{
        text += el.name
      })
      this.setData({
        addressText:text
      })
      this.data.form.provinceId = temp[0].code
      this.data.form.provinceName = temp[0].name
      this.data.form.cityId = temp[1].code
      this.data.form.cityName = temp[1].name
      this.data.form.areaId = temp[2].code
      this.data.form.areaName = temp[2].name
    }else{
      error("请选择正确地址")
    }
    if (e.detail.data.length){
      this.setData({
        addressText: ''
      })
      let tex = ''
      let key = 0
      e.detail.data.forEach(item => {
        if (item) {
          tex = tex+ item.name + ' '
        }
        key++
      })
      if (key === e.detail.data.length) {
        console.log(key,e.detail.data.length,tex)
        this.setData({
          addressText: tex
        })
      }
    }
  },
})
