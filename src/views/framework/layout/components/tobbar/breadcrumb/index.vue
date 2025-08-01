<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { layoutSettingStoreFn } from '@/utils/_store'

// 自命名 --- 梳理结构时更清晰
defineOptions({
  name: 'breadCrumb',
})

// 实例化路由组件
// const router = useRouter()
const route = useRoute()

// 通过点击fold or Expand 控制左侧导航栏开关
const collapseFlag = ref('Expand')
const handleFold = () => {
  // 每点击一下就将pinia仓库中值 --- 取反，
  layoutSettingStoreFn().setIsCollpase(!layoutSettingStoreFn().isCollopse)
  collapseFlag.value = layoutSettingStoreFn().isCollopse ? 'Fold' : 'Expand'
}

// console.log(route.matched)
// const handlepath = (key) => {
//   console.log(key)
// }
</script>

<template>
  <div class="breadcrumb-container">
    <!-- 开启 or 关闭 左侧导航栏开关 -->
    <el-icon :size="20"><component :is="collapseFlag" @click="handleFold" /></el-icon>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <!-- 每个小的面包屑 -->
      <el-breadcrumb-item :to="item.path" v-for="item in route.matched" :key="item.path">
        <el-icon v-if="item.meta.icon" :size="20"><component :is="item.meta.icon" /></el-icon>
        <span>{{ item.meta.title }}</span>
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
      .el-breadcrumb__inner {
        span {
          margin-left: 5px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
