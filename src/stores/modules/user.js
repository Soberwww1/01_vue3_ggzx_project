import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户token
    const token = ref('')

    // 定义存储用户Token方法
    const setToken = (newToken) => {
      token.value = newToken
    }

    // 用户基本信息
    const userInfo = ref({})

    // 更新用户信息
    const setUserInfo = (newUserInfo) => {
      userInfo.value = { ...newUserInfo }
    }

    return {
      token,
      setToken,
      userInfo,
      setUserInfo,
    }
  },
  {
    // 配置本地持久化
    persist: true,
  },
)
