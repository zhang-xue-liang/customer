const { baseUrl } = require('./config')



function request(method,url,data){

  let header = {
    'content-type': 'application/json',
  }
  const token = wx.getStorageSync('token')
  if(token){
    header.Authorization = 'Bearer ' + token
    header['TENANT-ID'] = 1
  }

  return new Promise(function(resolve,reject){
    wx.request({
      url: baseUrl + url,
      method: method,
      data: method === 'POST' ? JSON.stringify(data) : data,
      header:header,
      success(res){
        resolve(res.data);
      },
      fail(err){
        reject(err.data);
      }
    })
  })
}

function get(url,params = {}){
  let header = {
    'content-type': 'application/json',
  }
  const token = wx.getStorageSync('token')
  if(token){
    header.Authorization = 'Bearer ' + token
    header['TENANT-ID'] = 1
  }
  url += '?'
  for(let key in params){
    url += key + '=' + params[key] + '&'
  }
  url = url.slice(0,url.length - 1)

  return new Promise(function(resolve,reject){
    wx.request({
      url: baseUrl + url,
      method: 'GET',
      header:header,
      success(res){
        if(res.data.code === 1 && res.data.msg === '用户凭证已过期'){
          wx.navigateTo({
            url: '/pages/login/index',
          })
        }else{
          resolve(res.data);
        }
      },
      fail(err){
        reject(err.data);
      }
    })
  })

}

function post(url,data = {}){
  let header = {
    'content-type': 'application/json',
  }
  const token = wx.getStorageSync('token')
  if(token){
    header.Authorization = 'Bearer ' + token
    header['TENANT-ID'] = 1
  }


  return new Promise(function(resolve,reject){
    wx.request({
      url: baseUrl + url,
      method: 'POST',
      header:header,
      data: JSON.stringify(data),
      success(res){
        resolve(res.data);
      },
      fail(err){
        reject(err.data);
      }
    })
  })

}


module.exports = {
  request,
  post,
  get
}

