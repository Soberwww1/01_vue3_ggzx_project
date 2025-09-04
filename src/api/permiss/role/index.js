import request from '@/utils/request'

// 获取全部角色
export const reqGetRoleList = ({ page, limit, roleName }) => {
  return request.get(`/admin/acl/role/${page}/${limit}`, {
    params: {
      roleName,
    },
  })
}

// 新增角色
export const reqAddRole = (obj) => request.post('/admin/acl/role/save', obj)
// 更新角色
export const reqUpdateRole = (obj) => request.put('/admin/acl/role/update', obj)
// 删除角色
export const reqDelRole = (id) => request.delete(`/admin/acl/role/remove/${id}`)
