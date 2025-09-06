<script setup>
// 导入路由组件
import { useRouter } from 'vue-router'
import { layoutSettingStoreFn } from '@/utils/_store'

import { ElMessage } from 'element-plus'

// 自命名 --- 梳理结构时更清晰
defineOptions({
  name: 'layoutMenu',
})
defineProps({
  menulist: {
    type: Array,
  },
})

// 创建路由实例
const router = useRouter()
// 实现导航路由跳转
const handleSkip = async (path) => {
  // router.push(path)
  try {
    await router.push(path)
  } catch {
    // console.error('路由跳转失败:', error)
    ElMessage.error('页面不存在')
  }
}
</script>

<template>
  <!--
    在这里放入el-menu组件 却将el-menu-item & el-sub-menu封装成组件是因为这里使用了“嵌套路由”
    我们在这里使用嵌套路由的思路是 --- 先传入一个menulist列表给layoutMenu组件并循环这个数组中元素，
    加入数组中元素还是一个数组，那么就会在el-sub-menu中继续家伙家伙导入layoutMenu，
    并且将每次v-for遍历的元素item的item.children作为新的遍历数组传给新的layoutMenu组件
  -->
  <div class="menu" v-for="item in menulist" :key="item.path">
    <!-- 单级 -->
    <el-menu-item
      @click="handleSkip(item.path)"
      :index="item.path"
      v-if="!item.children && item.meta.show"
    >
      <el-icon :size="20"><component :is="item.meta.icon" /></el-icon>
      <span v-if="!item.children && item.meta.show">
        {{ item.meta.title }}
      </span>
    </el-menu-item>
    <el-menu-item
      @click="handleSkip(item.path)"
      :index="item.path"
      v-if="item.children && item.children.length === 1 && item.children[0].meta.show"
    >
      <el-icon :size="20"><component :is="item.children[0].meta.icon" /></el-icon>
      <span v-if="item.children && item.children.length === 1 && item.children[0].meta.show">
        {{ item.children[0].meta.title }}
      </span>
    </el-menu-item>
    <!-- 多级 -->
    <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
      <template #title>
        <el-icon :size="20"><component :is="item.meta.icon" /></el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <el-menu-item-group :class="{ foldmenu: layoutSettingStoreFn().isCollopse }">
        <!-- 路由迭代 -->
        <layoutMenu :menulist="item.children"></layoutMenu>
      </el-menu-item-group>
    </el-sub-menu>
  </div>
</template>

<style lang="less" scoped>
.menu {
  --el-menu-bg-color: transparent;
  border-radius: 30px;
  .el-sub-menu span,
  .el-menu-item span {
    font-size: 20px;
    font-weight: bold;
  }
  .el-menu-item {
    backdrop-filter: blur(100px);
    -webkit-backdrop-filter: blur(100px);
    margin: 15px 0;
    border-radius: 30px;
  }
  .el-icon {
    margin-right: 10px;
  }
}

// 额外导航标签
.foldmenu {
  .el-menu-item {
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }
}
</style>
