let { get } =  require('../utils/http');

export const list = () => {
  return get('/sale_knowledge/page',{
    'size':100,
  })
}