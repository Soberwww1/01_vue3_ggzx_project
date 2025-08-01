import request from '@/utils/request'

// 获取全部数据
export const reqGetTrademarkAllList = () => {
  return request.get('/admin/product/baseTrademark/getTrademarkList')
}

// 获取品牌分页列表
export const reqGetTrademarkList = ({ page, limit }) => {
  return request.get('/admin/product/baseTrademark/' + `${page}/${limit}`)
}

// 新增品牌接口
export const reqAddTrademarkList = (obj) => {
  return request.post('/admin/product/baseTrademark/save', obj)
}

// 更新品牌接口
export const reqUpdateTrademarkList = ({ id, logoUrl, tmName }) => {
  return request.put('/admin/product/baseTrademark/update', {
    id,
    logoUrl,
    tmName,
  })
}

// 删除品牌接口
export const reqDeleteTrademarkList = (id) => {
  return request.delete(`/admin/product/baseTrademark/remove/${id}`)
}

// 更新品牌时需要上传图片文件 --- 这里的操作是每次都上传到服务器，再回显图片（ps：之前的大事件是先回显，并本地存储，之后与表单数据一起上传服务器）
export const reqFileUpload = (obj) => {
  const { file } = obj
  return request.post('/admin/product/fileUpload', {
    file,
  })
}
