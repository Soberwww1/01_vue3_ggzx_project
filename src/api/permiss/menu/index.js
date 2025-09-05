import request from '@/utils/request'

// 获取特定ID职位的权限
export const reqGetRolePermission = (roleId) =>
  request.get(`/admin/acl/permission/toAssign/${roleId}`)

// 更新特定ID职位的权限
export const reqUpdateRolePermission = ({ roleId, permissionId }) => {
  // 这里有个小坑点，使用post请求时查询参数的位置为第三个参数位（与get请求不一样，get请求中params查询参数放在第二个参数位置）
  // 当然，两个请求方法都可以使用url拼接的方式进行传输
  // return request.post('/admin/acl/permission/doAssign?'+`roleId=${roleId}&permissionId=${permissionId}`)
  return request.post('/admin/acl/permission/doAssign', null, {
    params: {
      roleId,
      permissionId,
    },
  })
}

// 获取当前菜单列表（所有菜单）
export const reqGetAllRolePermission = () => request.get('/admin/acl/permission')

// 新增菜单接口
export const reqAddPermission = (obj) => request.post('/admin/acl/permission/save', obj)

// 更新菜单接口
export const reqUpdatePermission = (obj) => request.put('/admin/acl/permission/update', obj)

// 删除菜单接口
export const reqDelPermission = (id) => request.delete(`/admin/acl/permission/remove/${id}`)
