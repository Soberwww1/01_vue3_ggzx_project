import '@/styles/index.less'
import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores/index'
import router from './router/index'
// 导入SVG图标插件
import 'virtual:svg-icons-register'

// 导入自定义自动引入插件
import globalComponent from '@/components/index'

const app = createApp(App)
app.use(pinia)
app.use(router)
// 初始化自定义插件 --- globalComponent
app.use(globalComponent)

// 全局注册组件
app.mount('#app')
