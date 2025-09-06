<script setup>
// 导入基础组件、路由组件、elementPlus图标
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Lock, User } from '@element-plus/icons-vue'
import { ElMessage, ElNotification } from 'element-plus'

// 导入工具函数 --- 用户登录逻辑逻辑操作函数（封装了仓库数据的增删、数据请求api的应用）、判断当前时间函数
import { loginService } from '@/services/userService'
import getTimeService from '@/utils/time'

// 创建路由实例
const router = useRouter()

// 建立默认表单数据（空数据）
const defauteForm = ref({
  username: '',
  password: '',
})
// 创建用户登录表单 + 建立模板引用 --- 为了进行表单规则验证
const userInfoForm = ref({})
userInfoForm.value = { ...defauteForm.value }
const formRef = ref(null)

// 建立表单检验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名称', trigger: 'change' },
    { min: 5, max: 10, message: '用户名长度需要在 5 到 10 之间', trigger: ['change', 'blur'] },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 5, max: 15, message: '密码长度需要在 5 到 15 之间', trigger: ['change', 'blur'] },
  ],
}

// 设置loading加载状态
const loading = ref(false)

// 开始验证 + 提交表单
const onSubmit = async () => {
  // 进行预验证 --- 检验已经写的规则
  await formRef.value.validate()
  // 开始加载
  loading.value = true

  try {
    const res = await loginService(userInfoForm.value)
    // console.log(res)
    // 路由跳转
    router.replace('/')
    // 提示 --- 登陆成功
    ElNotification.success({
      title: `Hi,${getTimeService()}好啊`,
      dangerouslyUseHTMLString: true,
      message: res,
    })
  } catch (error) {
    // console.log(error)
    ElMessage.error(error)
  }

  // 清空userInfoForm + 按钮加载效果停止
  userInfoForm.value = { ...defauteForm.value }
  loading.value = false
}
</script>

<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="4"></el-col>
      <el-col :span="11" :xs="20" class="">
        <!-- 登录表单 -->
        <el-form :model="userInfoForm" :rules="rules" ref="formRef">
          <!-- 表单标题 -->
          <el-form-item>
            <h1>Login Here</h1>
          </el-form-item>
          <!-- 欢迎语 -->
          <el-form-item>
            <h2>Welcome back!</h2>
          </el-form-item>
          <!-- 姓名 -->
          <el-form-item prop="username">
            <el-input
              v-model="userInfoForm.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="userInfoForm.password"
              :prefix-icon="Lock"
              show-password
              placeholder="请输入密码"
            />
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button :loading="loading" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    135deg,
    @cyber-bg-primary 0%,
    @cyber-bg-secondary 30%,
    @cyber-bg-tertiary 70%,
    #1e1b4b 100%
  );
  position: relative;
  overflow: hidden;

  // 添加明亮的动态背景效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
      linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
    background-size:
      50px 50px,
      50px 50px,
      200px 200px,
      200px 200px;
    animation: grid-move 20s linear infinite;
    opacity: 0.4;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 20% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
    animation: pulse-glow 8s ease-in-out infinite;
  }

  .el-form {
    padding: 40px;
    margin-top: 20vh;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 0, 255, 0.1) 30%,
      rgba(59, 130, 246, 0.1) 70%,
      rgba(139, 92, 246, 0.1) 100%
    );
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border: 2px solid @cyber-border;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 30px @cyber-shadow,
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    width: 420px;
    border-radius: 20px;
    position: relative;
    z-index: 10;

    // 添加玻璃质感边框效果
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(
        45deg,
        @cyber-primary,
        @cyber-blue,
        @cyber-purple,
        @cyber-pink,
        @cyber-primary
      );
      background-size: 400% 400%;
      border-radius: 20px;
      animation: border-flow 4s ease-in-out infinite;
      z-index: -1;
      opacity: 0.6;
    }
    .el-form-item {
      padding: 15px 0;

      h1 {
        height: 60px;
        font-size: 38px;
        font-weight: 800;
        font-family: 'Inter', 'Segoe UI', sans-serif;
        background: linear-gradient(45deg, @cyber-primary, @cyber-blue, @cyber-purple, @cyber-pink);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 0 30px @cyber-shadow;
        text-align: center;
        margin: 0;
        letter-spacing: 1px;
        text-transform: uppercase;
      }

      h2 {
        font-size: 16px;
        font-weight: 500;
        font-family: 'Inter', 'Segoe UI', sans-serif;
        color: @cyber-text-secondary;
        text-align: center;
        margin: -5px 0 25px 0;
        letter-spacing: 0.5px;
        opacity: 0.8;
      }

      .el-input {
        height: 45px;
        border-radius: 8px;
        font-size: 16px;
        background-color: transparent;
        margin: 10px 0;
      }

      .el-button {
        color: @cyber-text-primary;
        font-size: 16px;
        font-weight: 600;
        font-family: 'Inter', 'Segoe UI', sans-serif;
        width: 100%;
        height: 50px;
        padding: 0;
        border: 2px solid @cyber-border;
        border-radius: 12px;
        background: linear-gradient(135deg, rgba(255, 0, 255, 0.2), rgba(59, 130, 246, 0.1));
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        &:hover {
          border-color: @cyber-border-active;
          background: linear-gradient(135deg, rgba(255, 0, 255, 0.3), rgba(139, 92, 246, 0.2));
          box-shadow: 0 8px 25px @cyber-shadow-active;
          transform: translateY(-3px);

          &::before {
            left: 100%;
          }
        }

        &:active {
          transform: translateY(-1px);
        }
      }

      :deep(.el-input) {
        --el-input-text-color: @cyber-text-primary;
        --el-input-border: @cyber-border;
        --el-input-hover-border: @cyber-border-active;
        --el-input-border-color: @cyber-border;
        --el-input-border-radius: 12px;
        --el-input-bg-color: @cyber-bg-glass;
        --el-input-icon-color: @cyber-text-primary;
        --el-input-placeholder-color: @cyber-text-muted;
        --el-input-focus-border-color: @cyber-border-active;
        --el-input-width: 100%;

        .el-input__wrapper {
          background: @cyber-bg-glass;
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid @cyber-border;
          border-radius: 12px;
          transition: all 0.3s ease;

          &:hover {
            border-color: @cyber-border-active;
            box-shadow: 0 0 15px @cyber-shadow;
            background: linear-gradient(135deg, rgba(255, 0, 255, 0.1), rgba(59, 130, 246, 0.05));
          }

          &.is-focus {
            border-color: @cyber-border-active;
            box-shadow: 0 0 20px @cyber-shadow-active;
            background: linear-gradient(135deg, rgba(255, 0, 255, 0.15), rgba(139, 92, 246, 0.1));
          }
        }
      }
    }
  }
}

// 动画效果
@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

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
