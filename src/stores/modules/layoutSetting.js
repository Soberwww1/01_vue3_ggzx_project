// layout设置setting组件仓库 --- 包括：控制左侧导航开关
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayOutSettingStore = defineStore(
  'layoutsetting',
  () => {
    // 设置左侧导航栏的开关状态
    const isCollopse = ref(false)

    // 定义更改方法
    const setIsCollpase = (value) => {
      isCollopse.value = value
    }
    return {
      isCollopse,
      setIsCollpase,
    }
  },
  {
    persist: true,
  },
)
