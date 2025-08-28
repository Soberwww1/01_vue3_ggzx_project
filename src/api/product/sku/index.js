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

// 访问一个SPU中所有的SKU商品（基于特定SpuId）
export const reqGetSkuListBySpuId = (id) => {
  return request.get(`/admin/product/findBySpuId/${id}`)
}

// 访问SKU分页列表 --- 获取所有的sku
export const reqGetSkuList = ({ page, limit }) => {
  return request.get(`/admin/product/list/${page}/${limit}`)
}

// 上架该SKU
export const reqOnSaleSku = (skuId) => request.get(`/admin/product/onSale/${skuId}`)
// 下架该SKU
export const reqCancelSaleSku = (skuId) => request.get(`/admin/product/cancelSale/${skuId}`)

// 删除该SKU
export const reqDelSku = (skuId) => request.delete(`/admin/product/deleteSku/${skuId}`)

// 获取特定SKU所有信息
export const reqGetSkuInfo = (skuId) => request.get(`/admin/product/getSkuInfo/${skuId}`)
