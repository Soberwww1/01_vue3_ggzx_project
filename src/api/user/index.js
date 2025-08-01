import request from '@/utils/request'

// 用户登录数据请求
export const reqUserLogin = (loginObj) => {
  return request.post('/admin/acl/index/login', { ...loginObj })
}

// 获取用户信息数据请求
export const reqUserInfo = () => {
  return request.get('/admin/acl/index/info')
}

// 退出登录数据请求
export const reqUserLogout = () => {
  return request.post('/admin/acl/index/logout')
}
