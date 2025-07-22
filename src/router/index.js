import { createRouter, createWebHistory } from 'vue-router'
// 导入路由配置
import { constantRoute } from '@/router/routes'
// 导入pinia仓库 --- 判断用户是否登录（具有Token）
import { useUserStore } from '@/stores/modules/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoute,
  // 路由滚动设置
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

// 路由导航守卫
router.beforeEach((to) => {
  const userStore = useUserStore()
  // 当没有检测到用户Token 并且 用户此时也不要去登录页时 --- 拦截到登录页
  if (!userStore.token && to.path !== '/login') {
    return '/login'
  }
})
export default router
