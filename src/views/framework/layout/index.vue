<script setup>
// 导入layout组件 --- logo & menu
import layoutLogo from '@/views/framework/layout/components/logo/index.vue'
import layoutMenu from '@/views/framework/layout/components/menu/index.vue'
import layoutMain from '@/views/framework/layout/components/main/index.vue'
import layoutTobbar from '@/views/framework/layout/components/tobbar/index.vue'

// 导入仓库路由数据 --- 以便依据路由渲染左侧导航栏
import { useRoutesStore, useLayOutSettingStore } from '@/stores/index'
// 导入路由
import { useRoute } from 'vue-router'

import setting from '@/setting'
import { ref } from 'vue'

// 将路由仓库实例化
const routesStore = useRoutesStore()
const layoutSettingStore = useLayOutSettingStore()
// 将路由实例化
const route = useRoute()

// 依据setting中logo的样式动态调整左侧scrollbar滑动框的高度
const scrollbarHeight = ref('')
scrollbarHeight.value = setting.logoHidden
  ? 'calc(100vh - var(--base-menu-logo-height, 100px))'
  : '100vh'

// 设置菜单导航折叠开关 --- isCollapse
// const isCollapse = ref(true)
// 在页面渲染之后找到当前页面的route
const index = ref('')
index.value = route.path
const handleOpen = () => {}
const handleClose = () => {}
</script>

<template>
  <div class="layout-container">
    <el-container>
      <!-- 左侧菜单导航 -->
      <el-aside :class="{ fold: layoutSettingStore.isCollopse }">
        <!-- 导入自定义组件 -->
        <layoutLogo v-if="setting.logoHidden" />
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
            :collapse="layoutSettingStore.isCollopse"
            :default-active="index"
            @open="handleOpen"
            @close="handleClose"
          >
            <!-- 使用自己二次封装的menu组件，并且将用户路由数据导入，不同要求渲染不同导航 -->
            <layoutMenu :menulist="routesStore.routes" />
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <!-- 头部导航 -->
        <el-header>
          <!-- 头部 --- TobBar -->
          <layoutTobbar></layoutTobbar>
        </el-header>
        <!-- 身体main -->
        <el-main style="background-color: pink">
          <!-- 在这里插入自行封装的Main组件（说白了里面还是router-view） -->
          <layoutMain></layoutMain>
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
    transition: all 0.3s ease;
    // 导航滚动条
    .el-scrollbar {
      // border-radius: 20px 20px 0 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(41, 48, 170, 0.5));
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      .el-menu {
        width: 100%;
        border: 0;
      }
    }
  }
  & .fold {
    // 基本的左侧导航栏 打开 or 关闭
    width: @base-menu-min-width;
    // 增加点渐变
    transition: all 0.3s ease;
  }
}
</style>
