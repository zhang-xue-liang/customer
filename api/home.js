let { request } =  require('../utils/http');

export const companyInfo = () => {
  return request('GET','/home/company/info',{})
}

export const isBindMobile = () => {
  return request('GET','/sale_user/checkBind',{})
}

export const bindMobile = (data) => {
  //return request('POST','/sale_user/bind_phone?encryptedData='+data.encryptedData + '&iv='+data.iv+'&openId='+ data.openId,{})
  return request('POST','/sale_user/bind_phone',data)
}