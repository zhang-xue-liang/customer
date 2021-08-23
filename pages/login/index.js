const { loginBaseUrl } = require('../../utils/config')
const { error } = require('../../utils/toast')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setStorage({
      key: 'access_token',
      data: '',
    })
  },
  // 一键登录
  login() {
    wx.getUserProfile({
      desc:"授权登录",
      success:(res)=>{
        let userInfo = res.rawData
        wx.login({
          success(res){
            // console.log(userInfo);
            // console.log(res.code);
            wx.request({
              url: loginBaseUrl + 'token/social',
              method:'POST',
              header:{
                'Authorization':'Basic cGlnOnBpZw==',
                'content-type':'application/x-www-form-urlencoded'
              },
              data:{
                'code':res.code,
                'userInfo':userInfo
              },
              success(res){
                const { data } = res
                if(data.access_token){
                  wx.setStorageSync('token', data.access_token)
                  wx.setStorageSync('avatar', data.user_info.avatar)
                  wx.setStorageSync('openId', data.user_info.username)
                  wx.navigateTo({
                    url: '/pages/index/index',
                  })
                }else{
                  error('登录失败');
                }
              },
              fail(err){
                error('登录失败')
              }
            })
          }
        })
      },
      fail(res){
        console.log(res);
      }
    })
  }
})