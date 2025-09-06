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

  .el-sub-menu span,
  .el-menu-item span {
    font-size: 15px;
    font-weight: 500;
    font-family: 'Inter', 'Segoe UI', sans-serif;
    letter-spacing: 0.5px;
  }

  .el-menu-item {
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    margin: 6px 0;
    border-radius: 12px;
    border: 1px solid transparent;
    transition: all 0.3s ease;
    position: relative;
    background: @cyber-bg-glass;

    &:hover {
      border-color: @cyber-border;
      box-shadow: 0 8px 25px @cyber-shadow;
      transform: translateX(8px);
      background: linear-gradient(135deg, rgba(255, 0, 255, 0.2), rgba(59, 130, 246, 0.1));
    }

    &.is-active {
      border-color: @cyber-border-active;
      box-shadow: 0 8px 30px @cyber-shadow-active;
      background: linear-gradient(135deg, rgba(255, 0, 255, 0.3), rgba(139, 92, 246, 0.2));

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: linear-gradient(180deg, @cyber-primary, @cyber-blue);
        border-radius: 0 2px 2px 0;
        box-shadow: 0 0 10px @cyber-shadow;
      }
    }
  }

  .el-sub-menu {
    .el-sub-menu__title {
      border-radius: 12px;
      border: 1px solid transparent;
      transition: all 0.3s ease;
      background: @cyber-bg-glass;
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);

      &:hover {
        border-color: @cyber-border;
        box-shadow: 0 8px 25px @cyber-shadow;
        transform: translateX(8px);
        background: linear-gradient(135deg, rgba(255, 0, 255, 0.2), rgba(59, 130, 246, 0.1));
      }
    }
  }

  .el-icon {
    margin-right: 12px;
    font-size: 18px;
    filter: drop-shadow(0 0 8px @cyber-shadow);
    transition: all 0.3s ease;
  }

  .el-menu-item:hover .el-icon,
  .el-sub-menu:hover .el-icon {
    filter: drop-shadow(0 0 12px @cyber-shadow-active);
    transform: scale(1.1);
  }
}

// 额外导航标签
.foldmenu {
  .el-menu-item {
    background: rgba(0, 255, 255, 0.1);
    color: @cyber-text-primary;
    border-color: @cyber-border;
  }
}
</style>
