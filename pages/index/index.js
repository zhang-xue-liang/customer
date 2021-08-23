const WXAPI = require('apifm-wxapi')
const TOOLS = require('../../utils/tools.js')
const APP = getApp()
const { companyInfo, isBindMobile, bindMobile } = require('../../api/home')
const { checkHasLogined } = require('../../utils/auth')
const { imgBaseUrl } = require('../../utils/config')

Page({
  data: {
    lunboData: [],
    isBind: false,
    tabList: [
      {id:1,
       name: '发起服务',
       pic: '../../images/fqfw.png'
      },
      {id:2,
        name: '报修商城',
        pic: '../../images/bxsc.png'
       },
       {id:3,
        name: '我的进度',
        pic: '../../images/wdjd.png'
       },
       {id:4,
        name: '知识库',
        pic: '../../images/zsk.png'
       }
    ],
    companyInfo:{
      email:'暂无信息',
      tel:'暂无信息',
      fullAddress:'暂无信息'
    }
  },
  //去往分页
  async toPage(e){
    try {
      let isLogin = await checkHasLogined()
      if(isLogin){
        console.log('继续操作',e.currentTarget.dataset.id );
        switch(Number(e.currentTarget.dataset.id)){
          case 4:
            wx.navigateTo({
              url: '/pages/knowledge/index',
            })
            break;
          case 1:
            wx.navigateTo({
                url:'/pages/sbQuery/index'
            })
            break;
          case 2:
            wx.navigateTo({
              url:'/pages/repairShop/index'
            })
            break;
          case 3:
              wx.navigateTo({
                url:'/pages/repairSchedule/index'
              })
              break;
          default:
            break;
        }
      }else{
        wx.navigateTo({
          url: '/pages/login/index',
        })
        console.log('登录');
      }
    } catch (error) {
      console.log(error);
    }
  },
  getPhoneNumbers(e){
    console.log(e)
    const openId = wx.getStorageSync('openId')
    const data = {
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      openId: openId
    }
    bindMobile(data).then(res => {
      console.log(res)
      if(res.code === 0){
        wx.navigateTo({
            url:'/pages/sbQuery/index'
        })
      } else {
        error(res.msg)
      }
    })
  },
  getPhoneNumber(e){
    console.log(e)
    const openId = wx.getStorageSync('openId')
    const data = {
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      openId: openId
    }
    bindMobile(data).then(res => {
      console.log(res)
      if(res.code === 0){
        wx.navigateTo({
          url:'/pages/repairSchedule/index'
        })
      } else {
        error(res.msg)
      }
    })
  },
  toSet(){
    wx.navigateTo({
      url: '/pages/accountSet/index',
    })
  },
  onShow: function () {
    console.log("onshow");
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onLoad: async function(e) {
    try {
      const data = await companyInfo()
      const datas = await isBindMobile()
      if(datas.code === 0){
        this.setData({
          isBind: datas.data
        })
      }
      //console.log('datas',datas);
      // console.log('data',data);
      if(data.code === 0){
        var list = []
        list.push({
          id: 1,
          imgurl: imgBaseUrl + data.data.picture
        })
        this.setData({
          companyInfo:data.data,
          lunboData: list
        })
      }
    } catch (error) {
      console.log(error);
    }
    
  },
  // // 判断是否绑定手机号
  // isBind(){
  //   try {
  //     const data = await isBindMobile()
  //     console.log('data',data);
  //     if(data.code === 0){
       
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // 联系客服
  callKF(){
    
  }
})
