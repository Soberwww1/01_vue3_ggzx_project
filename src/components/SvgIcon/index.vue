<script setup>
// 使用defineProps编译器宏接受props
defineProps({
  // 前缀 --- 使用svg图必须加上这个前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  iconName: {
    type: String,
  },
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
  },
  height: {
    type: String,
  },
  backgroundColor: {
    default: 'pink',
  },
})
</script>

<template>
  <svg :style="{ width, height, backgroundColor }">
    <use :href="prefix + iconName" :fill="color"></use>
  </svg>
</template>

<style lang="less" scoped>
svg {
  min-width: 50px;
  min-height: 50px;
}
</style>
