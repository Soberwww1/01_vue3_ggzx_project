<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <!-- 一个可以被复用的公共后台管理系统模板 --- 内核组件化、复用性 -->
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="less" scoped />
