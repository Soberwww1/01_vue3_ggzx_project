<script setup></script>

<template>
  <el-card>
    <!-- 卡片头部 -->
    <template #header>
      <div class="card-header">
        <slot name="head-button"></slot>
      </div>
    </template>
    <!-- 卡片主体部分 --- 封装为插槽对外暴露 -->
    <slot name="content"></slot>
  </el-card>
</template>

<style lang="less" scoped>
.el-card {
  height: 100%;
  display: flex;
  flex-direction: column;

  :deep(.el-card__body) {
    flex: 1;
    padding: 10px;
    overflow: hidden;
  }

  .card-content {
    height: 100%;
  }
}
</style>
