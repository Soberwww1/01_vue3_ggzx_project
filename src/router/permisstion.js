// 路由鉴权 --- 鉴权： 项目中路由能不能被访问权限的设置（该路由可以在什么条件下被访问、什么条件下不可访问）
// 导入路由组件、store工具函数
import router from '@/router/index'
import { userStoreFn } from '@/utils/_store'
import { getUserInfoService, logoutService } from '@/services/userService'
import { ElMessage } from 'element-plus'

// 路由全局前置守卫 ---
router.beforeEach(async (to) => {
  /*
    1、当用户登录并在本地存储token后，从一个路由跳到另一个路由时，用户信息因为是实时获取的，可能存在userInfo没有请求到，但是页面就渲染的情况，所以需要确保数据先请求到 -> 再进行页面渲染
    2、当用户登录，但是本地token其实是“用户”😁伪造的，或者token过期了，那么之后数据请求操作基本上都会失败，所以以下判断也会起到双重验证与预警功能。
  */
  if (userStoreFn().token) {
    // 有Token，证明你已经登录，此时你再想去登录页 --- 拦截跳转到首页
    if (to.path === '/login') {
      return '/'
    } else {
      // 不去首页，正常浏览访问 --- 但是得等数据请求完毕，获得数据后才能进行路由跳转
      if (userStoreFn().userInfo.name) {
        // 此时有Token，有用户信息，但如果刷新了
        return true
      } else {
        // 没有正常获取数据 --- 说明可能是用户刷新 、首次登录 、用户伪造Token（token是假数据）
        try {
          await getUserInfoService(router)
          /*
           *上面三种情况刚好也是路由表需要重载注册的时候，所以此时获取路由信息进行重载注册
           *获取路由信息并进行注册我将其放入 getUserInfoService(router)函数中，与获取用户基本信息一起实现了
           *下面代码作用：...to 保留了目标路由的所有信息（path、query、params等）
           *replace: true 表示替换当前历史记录，而不是添加新记录
           *这样返回会触发一次新的导航，确保在动态路由注册完成后再次尝试访问目标路由
           */
          return { ...to, replace: true }
        } catch (error) {
          // 出现错误 --- 说明本地token经过更改或者其他不知名错误，清空所有用户信息，重新登陆
          ElMessage.warning(error)
          // 进行数据删除操作 --- 从仓库中删除token、userInfo
          await logoutService()
          return '/login'
        }
      }
    }
  } else {
    // 没有Token，但此时要跳转登录页，说明用户要登录，允许用户登录
    if (to.path === '/login') {
      return
    } else {
      // 当没有检测到用户Token 并且 用户此时也不要去登录页时 --- 拦截到登录页
      return '/login'
    }
  }
})

// 路由全局后置守卫 ---
router.afterEach(() => {})
