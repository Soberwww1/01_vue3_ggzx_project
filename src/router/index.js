import { createRouter, createWebHistory } from 'vue-router'
// 导入路由配置
import { constantRoute } from '@/router/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoute,

  // 路由滚动设置 --- 一个路由到一个新路由页面显示位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition // 返回之前保存的位置（前进/后退）
    } else if (to.hash) {
      // 如果有 hash 锚点，则滚动到指定元素
      return { el: to.hash, behavior: 'smooth' }
    } else {
      // 默认情况下滚动到页面顶部
      return { top: 0 }
    }
  },
})

// 添加路由缓存 --- 防止重复导航报错
/*
 *当用户在同一个导航上重复点击时，会产生NavigationDuplicated 错误
 *所以该方法就是重写了router.push方法。让其保持控制台清洁，并且不影响其他类型错误的正常处理
 */
const routerPush = router.push
router.push = function push(location) {
  return routerPush.call(this, location).catch((err) => {
    if (err.name !== 'NavigationDuplicated') {
      throw err
    }
  })
}

export default router
