// 将路由抽离出来
export const constantRoute = [
  // 首页架子路由
  { name: 'layout', path: '/', component: () => import('@/views/Layout/home.vue') },
  // 登录路由
  { name: 'login', path: '/login', component: () => import('@/views/Login/index.vue') },
  // 404路由
  { name: '404', path: '/404', component: () => import('@/views/NotFind/index.vue') },
  // 未匹配路由
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]
