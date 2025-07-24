// 将各级路由导入pinia仓库 --- 以便后续依据使用者的路由动态生成菜单导航
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 导入路由
import { constantRoute } from '@/router/routes'

export const useRoutesStore = defineStore(
  'routes',
  () => {
    // 设置路由 --- 为了菜单导航做准备
    const routes = ref([...constantRoute])
    return {
      routes,
    }
  },
  {
    persist: true,
  },
)
