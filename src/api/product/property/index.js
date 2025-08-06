import request from '@/utils/request'

// 属性页面商品分类接口
// 一级分类
export const reqGetCategory1 = () => {
  return request.get('/admin/product/getCategory1')
}

// 二级分类
export const reqGetCategory2 = (id) => {
  return request.get(`/admin/product/getCategory2/${id}`)
}

// 三级分类
export const reqGetCategory3 = (id) => {
  return request.get(`/admin/product/getCategory3/${id}`)
}

// 获取分类下已有的属性与属性值接口
export const reqGetPropertyList = (c1Id, c2Id, c3Id) => {
  return request.get(`/admin/product/attrInfoList/${c1Id}/${c2Id}/${c3Id}`)
}

// 添加 or 修改 已有的的属性请求
export const reqAddProperty = (propertyObj) => {
  return request.post('/admin/product/saveAttrInfo', propertyObj)
}

// 删除属性
export const reqDelProperty = (attrId) => {
  return request.delete(`/admin/product/deleteAttr/${attrId}`)
}
