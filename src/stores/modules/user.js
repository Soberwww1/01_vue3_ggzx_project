import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户token
    const token = ref('')

    // 定义存储用户Token方法 --- 删除用户token时仅需setToken('')即可
    const setToken = (newToken) => {
      token.value = newToken
    }

    // 用户基本信息
    const userInfo = ref({})

    // 定义存储用户信息userInfo方法 --- 删除用户信息userInfo仅需setUserInfo({})即可
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
    // 配置本地持久化 --- 分开存储，用户信息属于高度隐私，仅存在pinia仓库（内存中）；token存于localStorage & pinia仓库中
    persist: {
      key: 'token', // 存储的键名
      storage: localStorage,
      serializer: {
        // 存储时只保留 token
        serialize: (state) => JSON.stringify({ token: state.token }),
        // 恢复时只读取 token
        deserialize: (str) => ({
          token: JSON.parse(str).token,
          userInfo: {}, // 强制清空 userInfo
        }),
      },
    },
  },
)
