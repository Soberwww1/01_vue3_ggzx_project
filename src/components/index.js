// 导入各个Components组件
import SvgIcon from '@/components/SvgIcon/index.vue'
import Card from '@/components/Card/index.vue'
import Dialog from '@/components/Dialog/index.vue'
// 导入全局icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//  定义一个对象整合要注册的全局组件
const allGlobalCompoents = {
  SvgIcon,
  Card,
  Dialog,
}

// 自定义全局注册插件 --- 对外暴露一个对象 --- 对象中引入所有Components组件 ---
export default {
  install(app) {
    // 自定义组件添加特定前缀 --- Custom
    const CUSTOM_PREFIX = 'Custom'
    // 开始注册
    Object.keys(allGlobalCompoents).forEach((item) => {
      app.component(`${CUSTOM_PREFIX + item}`, allGlobalCompoents[item])
    })
    // 逐个导入icon
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
