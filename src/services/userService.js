// api组件 --- 承载数据请求功能
// store组件 --- 承载数据响应式功能
// service组件 --- 业务逻辑层 --- 协调API与Store的中间层

// 导入Lodash中深拷贝方法
import cloneDeep from 'lodash/cloneDeep'
// 导入store工具函数
import { userStoreFn, routeStoreFn } from '@/utils/_store'

// 导入异步路由 --- 进行判断那些需要展示那些不需要
import { asyncRoute, anyRoute } from '@/router/routes'

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

// 工具函数 --- 递归得到需要展示的异步路由
const filterAsyncRoute = (arr, route) => {
  return arr.filter((item) => {
    if (route.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, route)
      }
      return true
    }
  })
}

// 获取用户信息userInfo + 存储用户信息
export const getUserInfoService = async (router) => {
  // 获取用户信息 + 存储用户信息
  const res = await reqUserInfo()

  // 获取该用户对应权限下能访问的路由名
  const templateRoutes = res.data.data.routes
  /*
   * 这里使用递归查询符合权限的路由数据，
   * 但是因为使用了filter，item.children = filterAsyncRoute(item.children, route)
   * 将原数组 asyncRoute 数据更改了，所以应使用深拷贝避免该副作用
   * 并且我的异步路由数组数据很复杂，数组包对象，对象包数组...所以不能使用JSON.parse(JSON.stringify())
   */
  // const tempAsyncRoute = JSON.parse(JSON.stringify(asyncRoute))
  const asyncArr = filterAsyncRoute(cloneDeep(asyncRoute), templateRoutes)
  // console.log(asyncArr)

  // 需要添加的所有异步路由
  // const tempRoute = [...asyncArr, ...anyRoute]

  // 重新添加路由 --- 异步路由 + 任意路由
  asyncArr.forEach((route) => {
    router.addRoute(route)
  })
  router.addRoute(anyRoute)

  // 存储到 pinia
  routeStoreFn().setRoutes([...asyncArr, anyRoute])

  // 进行数据存储操作
  userStoreFn().setUserInfo(res.data.data)

  return Promise.resolve(res.data.data)
}
