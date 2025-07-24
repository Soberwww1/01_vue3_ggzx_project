<script setup>
import setting from '@/setting'
// 自命名 --- 梳理结构时更清晰
defineOptions({
  name: 'layoutLogo',
})
</script>

<template>
  <div class="logo-container">
    <Custom-SvgIcon
      :iconName="setting.logo"
      width="50px"
      heigh="50px"
      backgroundColor="transparent"
    ></Custom-SvgIcon>
    <h2>{{ setting.title }}</h2>
  </div>
</template>

<style lang="less" scoped>
.logo-container {
  padding: 10px 15px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgb(152, 141, 159);
  // border-radius: 0 0 15px 15px;
  box-shadow: 0 10px 50px 0 rgb(0, 0, 0);
  width: 100%;
  // 使用全局变量控制导航栏中logo高度
  height: var(--base-menu-logo-height);
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 20px;
    background: linear-gradient(176deg, aquamarine, blueviolet, magenta, greenyellow, yellow);
    font-weight: bolder;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    overflow: hidden;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
}
</style>
