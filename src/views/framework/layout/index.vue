<script setup>
// 导入路由
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// 导入layout组件 --- 左侧栏上部分图标组件：logo & 左侧栏下部分菜单导航栏组件：menu & 右上顶栏组件：tibbar & 右下主体二级路由组件：main
import layoutLogo from '@/views/framework/layout/components/logo/index.vue'
import layoutMenu from '@/views/framework/layout/components/menu/index.vue'
import layoutTobbar from '@/views/framework/layout/components/tobbar/index.vue'
import layoutMain from '@/views/framework/layout/components/main/index.vue'

// 导入工具函数（返回各个仓库实例对象函数）、左侧栏主题设置（setting.js）
import { layoutSettingStoreFn, routeStoreFn } from '@/utils/_store'
import setting from '@/setting'

// 将路由实例化
const route = useRoute()

// 依据setting中logo的样式动态调整左侧scrollbar滑动框的高度
const scrollbarHeight = ref('')
scrollbarHeight.value = setting.logoHidden
  ? 'calc(100vh - var(--base-menu-logo-height, 100px))'
  : '100vh'

// 在页面渲染之后找到当前页面的route
const index = ref('')
index.value = route.path
const handleOpen = () => {}
const handleClose = () => {}
</script>

<template>
  <el-container>
    <!-- 左侧菜单导航 -->
    <el-aside :class="{ fold: layoutSettingStoreFn().isCollopse }">
      <!-- 左侧栏上部logo -->
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
          :collapse="layoutSettingStoreFn().isCollopse"
          :default-active="index"
          @open="handleOpen"
          @close="handleClose"
        >
          <!-- 使用自己二次封装的menu组件，并且将用户路由数据导入，不同要求渲染不同导航 -->
          <layoutMenu :menulist="routeStoreFn().routes" />
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <!-- 右侧主体架子内容 -->
    <el-container class="right-container">
      <!-- 头部导航 --- TobBar -->
      <el-header>
        <layoutTobbar></layoutTobbar>
      </el-header>
      <!-- 架子主体 --- main二级路由跳转页面 -->
      <!-- <el-main style="background-color: pink"> -->
      <el-main>
        <!-- 在这里插入自行封装的Main组件（说白了里面还是router-view） -->
        <layoutMain></layoutMain>
      </el-main>
      <!-- 底部 -->
      <el-footer style="background-color: skyblue">footer</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.el-container,
.right-container {
  width: 100%;
  height: 100vh;
}
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
</style>
