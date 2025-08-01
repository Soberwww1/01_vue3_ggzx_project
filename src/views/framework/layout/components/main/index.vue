<script setup>
// 自命名 --- 梳理结构时更清晰
defineOptions({
  name: 'layoutMain',
})
</script>

<template>
  <!-- 添加不同路由切换时的过渡效果 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="less" scoped>
// 切换不停路由页面时的过度动效
// 开始
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
// 显示
.fade-enter-active {
  transition: all 1s;
}
// 消失
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
