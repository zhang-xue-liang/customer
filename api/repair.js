const  { get,post, } = require('../utils/http')

export const list = (name = '',page = 1,size = 10) => {
    return get('/spareParts/list',{
        page,
        size,
        name
    });

}
