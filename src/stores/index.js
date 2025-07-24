import { createPinia } from 'pinia'
// 持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

export * from '@/stores/modules/user'
export * from '@/stores/modules/route'
