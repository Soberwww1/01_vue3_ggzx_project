// 全局工具文件 --- 专门用来导出各个自定义pinia仓库

// 导入 pinia 仓库
import {
  useUserStore,
  useLayOutSettingStore,
  useRoutesStore,
  useCategoryStore,
} from '@/stores/index'

// 导出user的pinia仓库
export const userStoreFn = () => useUserStore()

// 导入layoutSetting的pinia仓库
export const layoutSettingStoreFn = () => useLayOutSettingStore()

// 导入route的pinia仓库
export const routeStoreFn = () => useRoutesStore()

// 导入category的pinia仓库
export const categoryFn = () => useCategoryStore()
