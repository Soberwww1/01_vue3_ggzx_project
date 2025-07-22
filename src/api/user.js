import request from '@/utils/request'

// 用户登录
export const userLoginService = (loginObj) => {
  return request.post('/admin/acl/index/login', { ...loginObj })
}
