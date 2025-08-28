import request from '@/utils/request'

// 获取当前SPU的销售属性
export const reqGetSkuSaleAttrList = (id) => {
  return request.get(`/admin/product/spuSaleAttrList/${id}`)
}

// 获取当前SPU的照片列表
export const reqGetSkuImgList = (id) => {
  return request.get(`/admin/product/spuImageList/${id}`)
}

// 给特定SPU新增SKU属性
export const reqSaveSkuInfo = (obj) => {
  return request.post('/admin/product/saveSkuInfo', obj)
}

// 访问一个SPU中所有的SKU商品
export const reqGetSkuList = (id) => {
  return request.get(`/admin/product/findBySpuId/${id}`)
}
