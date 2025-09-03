import request from '@/utils/request'

// 获取用户页数据
export const reqGetUserList = ({ page, limit, username }) => {
  return request.get(`/admin/acl/user/${page}/${limit}`, {
    params: {
      username,
    },
  })
}

// 新增用户
export const reqAddUser = (obj) => {
  return request.post('/admin/acl/user/save', obj)
}
// 更新用户
export const reqUpdateUser = (obj) => {
  return request.put('/admin/acl/user/update', obj)
}
// 删除单个用户
export const reqDelUser = (userId) => {
  return request.delete(`/admin/acl/user/remove/` + userId)
}
// 批量删除用户
export const reqDelUserList = (IdArr) => {
  return request.delete('/admin/acl/user/batchRemove', {
    data: IdArr,
  })
}

// 获取特定ID下用户的角色
export const reqGetUserRoles = (adminId) => request.get(`/admin/acl/user/toAssign/${adminId}`)

// 给特定ID下用户分配角色
export const reqAssignUserRoles = (obj) => {
  return request.post('/admin/acl/user/doAssignRole', obj)
}
