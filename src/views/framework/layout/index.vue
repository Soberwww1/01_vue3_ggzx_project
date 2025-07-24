<script setup>
// 导入layout组件 --- logo & menu
import layoutLogo from '@/views/framework/layout/components/layout_logo.vue'
import layoutMenu from '@/views/framework/layout/components/layout_menu.vue'

// 导入路由 --- 以便依据路由渲染左侧导航栏
import { useRouteStore } from '@/stores/index'

import setting from '@/setting'
import { ref } from 'vue'

// 将路由仓库实例化
const routeStore = useRouteStore()

// 依据setting中logo的样式动态调整
const scrollbarHeight = ref('')
scrollbarHeight.value = setting.logoHidden
  ? 'calc(100vh - var(--base-menu-logo-height, 100px))'
  : '100vh'

const handleOpen = () => {}
const handleClose = () => {}
</script>

<template>
  <div class="layout-container">
    <el-container>
      <!-- 左侧菜单导航 -->
      <el-aside>
        <!-- 导入自定义组件 -->
        <layoutLogo v-if="setting.logoHidden"></layoutLogo>
        <!-- 导航scroll -->
        <el-scrollbar :style="{ height: scrollbarHeight }">
          <!--
              在这里放入el-menu组件 却将el-menu-item & el-sub-menu封装成组件是因为这里使用了“嵌套路由”
              我们在这里使用嵌套路由的思路是 --- 先传入一个menulist列表给layoutMenu组件并循环这个数组中元素，
              加入数组中元素还是一个数组，那么就会在el-sub-menu中继续家伙家伙导入layoutMenu，
              并且将每次v-for遍历的元素item的item.children作为新的遍历数组传给新的layoutMenu组件
              -->
          <el-menu
            class="el-menu-vertical-demo"
            background-color="transparent"
            text-color="var(--el-color-primary-light-9)"
            active-text-color="rgb(120, 219, 176)"
            @open="handleOpen"
            @close="handleClose"
          >
            <!-- 使用自己二次封装的menu组件，并且将用户路由数据导入，不同要求渲染不同导航 -->
            <layoutMenu :menulist="routeStore.route"></layoutMenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <!-- 头部导航 -->
        <el-header style="background-color: red">header</el-header>
        <!-- 身体main -->
        <el-main style="background-color: green">
          <!-- 在这里插入二级路由 --- routerview -->
          <router-view></router-view>
        </el-main>
        <!-- 底部 -->
        <el-footer style="background-color: skyblue">footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.layout-container {
  //   background-color: skyblue;
  width: 100%;
  height: 100vh;
  // 左侧首页导航菜单
  .el-aside {
    height: 100vh;
    // 使用全局变量调整左侧导航菜单的宽度 --- 更加自定义 & 复用
    width: @base-menu-width;
    background: linear-gradient(104deg, aqua, #39c5bb, blue, blueviolet, #ff65a3);
    // 导航滚动条
    .el-scrollbar {
      border-radius: 20px 20px 0 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(41, 48, 170, 0.5));
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      .el-menu {
        width: 100%;
        border: 0;
      }
    }
  }
}
</style>
