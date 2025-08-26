import request from '@/utils/request'

// 获取当前SPU的销售属性
export const reqGetSkuSaleAttrList = (id) => {
  return request.get(`/admin/product/spuSaleAttrList/${id}`)
}

// 获取当前SPU的照片列表
export const reqGetSkuImgList = (id) => {
  return request.get(`/admin/product/spuImageList/${id}`)
}
