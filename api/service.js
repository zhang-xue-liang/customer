const  { get,post, } = require('../utils/http')

export const searchBySerialNo = (serialNo) => {
    return get('/sale_service/getProductBySerialNo/'+serialNo);
}

export const searchByPhone = (phone) => {
    return get('/sale_service/getOrderByMobile/'+phone);
}

export const apply = (form,info) => {
    let data = {
        'saleServiceApplyProductDTO':form,
        'saleServiceApplyServiceDTO':info,
    }
    return post('/sale_service/apply',data)
}


export const workOrders = (status = -1,comment=-1,page=1,size=10) => {
    return get('/order/work/list',{
        status,comment,page,size
    });
}

export const workOrder = (id) => {
    return get('/order/work/view/'+id)
}

export const serviceOrders = (status = -1,comment=-1,page=1,size=10) => {
    return get('/order/service/list',{
        status,comment,page,size
    });
}

export const serviceOrder = (id) => {
    return get('/order/service/view/'+id)
}

export const cancelServiceOrder = (id) => {
    return post('/order/service/cancel/'+id)
}

export const satisfactionServiceOrder = (userSatisfactionDTO ) => {
    let data = {
        'userSatisfactionDTO ':userSatisfactionDTO ,
    }
    return post('/order/service/satisfaction', data)
}

export const satisfactionGdOrder = (userSatisfactionDTO ) => {
    let data = {
        'userSatisfactionDTO ':userSatisfactionDTO ,
    }
    return post('/order/work/satisfaction', data)
}
export const openVoice = (id) => {
    return post('/order/work/invoice/'+id)
}