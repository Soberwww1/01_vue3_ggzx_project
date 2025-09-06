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
      <el-main style="background-color: pink">
        <!-- <el-main> -->
        <!-- 在这里插入自行封装的Main组件（说白了里面还是router-view） -->
        <layoutMain></layoutMain>
      </el-main>
      <!-- 底部 -->
      <el-footer>后台管理系统😁😁😁 ©2025 Created by 吴腾宗</el-footer>
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
  background: linear-gradient(
    135deg,
    rgba(255, 0, 255, 0.1) 0%,
    rgba(59, 130, 246, 0.1) 30%,
    rgba(139, 92, 246, 0.1) 70%,
    rgba(255, 0, 255, 0.05) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 2px solid @cyber-border;
  transition: all 0.3s ease;
  position: relative;

  // 添加玻璃质感边框效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      @cyber-primary,
      @cyber-blue,
      @cyber-purple,
      @cyber-pink,
      @cyber-primary
    );
    background-size: 400% 400%;
    animation: border-flow 4s ease-in-out infinite;
    opacity: 0.2;
    z-index: -1;
    border-radius: 0 15px 15px 0;
  }

  // 导航滚动条
  .el-scrollbar {
    background: @cyber-bg-glass;
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border-radius: 0;

    .el-menu {
      width: 100%;
      border: 0;
      background: transparent;

      // 菜单项样式
      :deep(.el-menu-item) {
        color: @cyber-text-secondary;
        background: @cyber-bg-glass;
        border-radius: 12px;
        margin: 8px 15px;
        transition: all 0.3s ease;
        border: 1px solid transparent;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

        &:hover {
          color: @cyber-text-primary;
          background: linear-gradient(135deg, rgba(255, 0, 255, 0.2), rgba(59, 130, 246, 0.1));
          border-color: @cyber-border;
          box-shadow: 0 8px 25px @cyber-shadow;
          transform: translateX(5px);
        }

        &.is-active {
          color: @cyber-text-primary;
          background: linear-gradient(135deg, rgba(255, 0, 255, 0.3), rgba(139, 92, 246, 0.2));
          border-color: @cyber-border-active;
          box-shadow: 0 8px 30px @cyber-shadow-active;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(180deg, @cyber-primary, @cyber-blue);
            border-radius: 0 2px 2px 0;
          }
        }
      }

      // 子菜单样式
      :deep(.el-sub-menu) {
        .el-sub-menu__title {
          color: @cyber-text-secondary;
          background: @cyber-bg-glass;
          border-radius: 12px;
          margin: 8px 15px;
          transition: all 0.3s ease;
          border: 1px solid transparent;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);

          &:hover {
            color: @cyber-text-primary;
            background: linear-gradient(135deg, rgba(255, 0, 255, 0.2), rgba(59, 130, 246, 0.1));
            border-color: @cyber-border;
            box-shadow: 0 8px 25px @cyber-shadow;
            transform: translateX(5px);
          }
        }
      }
    }
  }
}

& .fold {
  // 基本的左侧导航栏 打开 or 关闭
  width: @base-menu-min-width;
  transition: all 0.3s ease;
}

// 主题头部分界线
.el-header {
  border-bottom: 2px solid @cyber-border;
  background: linear-gradient(
    135deg,
    rgba(255, 0, 255, 0.1) 0%,
    rgba(59, 130, 246, 0.1) 50%,
    rgba(139, 92, 246, 0.1) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, @cyber-primary, @cyber-blue, @cyber-purple, @cyber-pink);
    background-size: 300% 300%;
    animation: border-flow 3s ease-in-out infinite;
    opacity: 0.1;
    z-index: -1;
  }
}

// 主内容区域
.el-main {
  background: transparent !important;
  padding: 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 10% 20%, rgba(255, 0, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }
}

// 底部
.el-footer {
  background: linear-gradient(
    135deg,
    rgba(255, 0, 255, 0.1) 0%,
    rgba(59, 130, 246, 0.1) 50%,
    rgba(139, 92, 246, 0.1) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 2px solid @cyber-border;
  color: @cyber-text-secondary;
  text-align: center;
  line-height: 60px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
}

// 边框流动动画
@keyframes border-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
