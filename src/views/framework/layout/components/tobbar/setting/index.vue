<script setup>
// 导入路由组件、elementplus组件、默认头像
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import defaultAvatar from '@/assets/images/default.png'

// 导入store工具函数
import { userStoreFn } from '@/utils/_store'
// 导入用户登出逻辑逻辑操作函数 --- 封装了仓库数据的增删、数据请求api的应用
import { logoutService } from '@/services/userService'

// 自命名 --- 梳理结构时更清晰
defineOptions({
  name: 'tobbarRight',
})

// 实例化路由组件
const router = useRouter()

// 点击刷新按钮进行页面刷新
const handleFreshPage = () => {
  location.reload()
}

// 点击全屏按钮进行页面全屏
const handleFullScreen = () => {
  let full = document.fullscreenElement
  // 切换为全屏模式
  if (!full) {
    // 利用文档的根结点方法 requestFullscreen 实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 变为不是全屏模式，退出全屏模式
    document.exitFullscreen()
  }
}

// 用户登出操作
const handleLogOut = async () => {
  try {
    const res = await logoutService()
    // console.log(res)

    // 数据删除成功 --- 进行路由跳转，回到登录页
    router.push('/login')
    ElMessage.success(res)
  } catch (error) {
    ElMessage.warning(error)
  }
}
</script>
<template>
  <div class="setting-container">
    <!-- 按钮 -->
    <el-button @click="handleFreshPage" size="small" icon="Refresh" circle></el-button>
    <el-button @click="handleFullScreen" size="small" icon="FullScreen" circle></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <!-- 下拉框 -->
    <el-dropdown>
      <div class="dropdown-avatar">
        <img
          :src="userStoreFn().userInfo.avatar || defaultAvatar"
          style="width: 25px; height: 25px"
        />
        <span class="el-dropdown-link">{{ userStoreFn().userInfo.name }}</span>
        <!-- <span class="el-dropdown-link">{{ 'admin' }}</span> -->
        <el-icon class="el-icon--right"><ArrowDownBold /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="less" scoped>
// 总体样式
.setting-container {
  // 按钮
  .el-button {
    margin-right: 5px;
  }
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
        margin: 0 5px 0 10px;
      }
      .el-icon--right {
        margin-top: 2px;
      }
    }
  }
}
</style>
