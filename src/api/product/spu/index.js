import request from '@/utils/request'

// 获取所有销售属性列表
export const reqAllTradeMark = () => {
  return request.get('/admin/product/baseSaleAttrList')
}

// 删除SPU接口
export const reqDelSPUInfo = (spuId) => {
  return request.delete(`/admin/product/deleteSpu/${spuId}`)
}

// 新增SPU接口
export const reqSaveSPUInfo = (obj) => {
  return request.post('/admin/product/saveSpuInfo', obj)
}

// 更新SPU接口
export const reqUpdateSPUInfo = (obj) => {
  return request.post('/admin/product/updateSpuInfo', obj)
}

// 获取SPU分页列表
export const reqGetSPUList = ({ page, limit, category3Id }) => {
  return request.get(`/admin/product/${page}/${limit}`, {
    params: {
      category3Id,
    },
  })
}
