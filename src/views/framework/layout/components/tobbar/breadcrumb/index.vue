<script setup>
import { ref } from 'vue'
import { useLayOutSettingStore } from '@/stores'
// 自命名 --- 梳理结构时更清晰
defineOptions({
  name: 'breadCrumb',
})
// 创建仓库实例
const layoutSettingStore = useLayOutSettingStore()
// 通过点击fold or Expand 控制左侧导航栏开关
const collapseFlag = ref('Expand')
const handleFold = () => {
  layoutSettingStore.setIsCollpase(!layoutSettingStore.isCollopse)
  console.log(layoutSettingStore.isCollopse)
  collapseFlag.value = layoutSettingStore.isCollopse ? 'Fold' : 'Expand'
}
</script>
<template>
  <div class="breadcrumb-container">
    <!-- 开启 or 关闭 左侧导航栏开关 -->
    <el-icon :size="20"><component :is="collapseFlag" @click="handleFold" /></el-icon>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item>
        <el-icon><Lock /></el-icon>
        <span>权限管理</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <el-icon><User /></el-icon>
        <span>用户管理</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="less" scoped>
.breadcrumb-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  .el-breadcrumb {
    margin-left: 10px;
    .el-breadcrumb__item {
      font-weight: bold;
    }
  }
}
</style>
