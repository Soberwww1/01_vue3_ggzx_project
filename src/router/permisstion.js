// 路由鉴权 --- 鉴权： 项目中路由能不能被访问权限的设置（该路由可以在什么条件下被访问、什么条件下不可访问）
// 导入路由组件、store工具函数
import router from '@/router/index'
import { userStoreFn } from '@/utils/_store'
import { getUserInfoService } from '@/services/userService'
import { ElMessage } from 'element-plus'

// 路由全局前置守卫 ---
router.beforeEach(async (to) => {
  // 当没有检测到用户Token 并且 用户此时也不要去登录页时 --- 拦截到登录页
  if (!userStoreFn().token && to.path !== '/login') {
    return '/login'
  }
  /*
      1、当用户登录并在本地存储token后，从一个路由跳到另一个路由时，用户信息因为是实时获取的，可能存在userInfo没有请求到，但是页面就渲染的情况，所以需要确保数据先请求到 -> 再进行页面渲染
      2、当用户登录，但是本地token其实是“用户”😁伪造的，或者token过期了，那么之后数据请求操作基本上都会失败，所以以下判断也会起到双重验证与预警功能。
    */
  if (!userStoreFn().userInfo.name && to.path !== '/login') {
    try {
      await getUserInfoService()
    } catch (error) {
      ElMessage.warning(error)
      // 进行数据删除操作 --- 从仓库中删除token、userInfo
      userStoreFn().setToken('') // 删除token
      userStoreFn().setUserInfo({}) // 删除用户信息
      return '/login'
    }
  }
})

// 路由全局后置守卫 ---
router.afterEach(() => {})

// 进度条插件 --- nprogress
