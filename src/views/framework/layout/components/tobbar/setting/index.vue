<script setup>
// 自命名 --- 梳理结构时更清晰
defineOptions({
  name: 'tobbarRight',
})
</script>
<template>
  <div class="setting-container">
    <!-- 按钮 -->
    <el-button size="small" icon="Refresh" circle></el-button>
    <el-button size="small" icon="FullScreen" circle></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <!-- 下拉框 -->
    <el-dropdown>
      <div class="dropdown-avatar">
        <img src="@/assets/images/default.png" style="width: 25px; height: 25px" />
        <span class="el-dropdown-link">{{ 'admin' }}</span>
        <el-icon class="el-icon--right"><ArrowDownBold /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="less" scoped>
// 总体样式
.setting-container {
  // 下拉框
  .el-dropdown {
    width: 100px;
    // 头像区
    .dropdown-avatar {
      display: flex;
      align-items: center;
      cursor: pointer;
      display: flex;
      img {
        margin: 0 5px;
      }
      .el-icon--right {
        margin-top: 2px;
      }
    }
  }
}
</style>
