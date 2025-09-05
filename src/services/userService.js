// api组件 --- 承载数据请求功能
// store组件 --- 承载数据响应式功能
// service组件 --- 业务逻辑层 --- 协调API与Store的中间层

// 导入store工具函数
import { userStoreFn } from '@/utils/_store'

// 导入用户登录、用户信息获取、用户登出三个数据请求api
import { reqUserLogin, reqUserInfo, reqUserLogout } from '@/api/user'

// 登录时后台验证操作 + token数据存储
export const loginService = async (formValue) => {
  const res = await reqUserLogin(formValue)

  // 进行数据存储操作 --- 向仓库存入token
  userStoreFn().setToken(res.data.data)

  return Promise.resolve('欢迎回来')
}

// 用户登出 + 本地存储token、pinia仓库中用户信息删除
export const logoutService = async () => {
  await reqUserLogout()

  // 进行数据删除操作 --- 从仓库中删除token、userInfo
  userStoreFn().setToken('') // 删除token
  userStoreFn().setUserInfo({}) // 删除用户信息

  return Promise.resolve('退出登录成功!')
}

// 获取用户信息userInfo + 存储用户信息
export const getUserInfoService = async () => {
  const res = await reqUserInfo()
  console.log(res)
  // console.log(res.data.data)
  // 进行数据存储操作
  userStoreFn().setUserInfo(res.data.data)

  return Promise.resolve(res.data.data)
}
