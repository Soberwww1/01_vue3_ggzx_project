<script setup>
import breadCrumb from '@/views/framework/layout/components/tobbar/breadcrumb/index.vue'
import tobbarRight from '@/views/framework/layout/components/tobbar/setting/index.vue'

// 自命名 --- 梳理结构时更清晰
defineOptions({
  name: 'layoutTobbar',
})
</script>
<template>
  <div class="tobbar-container">
    <!-- 左侧面包屑 -->
    <breadCrumb></breadCrumb>
    <!-- 右边用户设置 -->
    <tobbarRight></tobbarRight>
  </div>
</template>

<style lang="less" scoped>
.tobbar-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
