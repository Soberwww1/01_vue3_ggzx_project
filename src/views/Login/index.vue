<script setup>
import { ref } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'

// 导入pinia仓库 --- 存储用户名 & 用户密码 & Token
import { useUserStore } from '@/stores/index'
// 导入路由组件
import { useRouter } from 'vue-router'
// 导入自己封装API --- 验证登录
import { userLoginService } from '@/api/user'
// 导入自己封装判断时间函数
import getTimeService from '@/utils/time'
import { ElNotification } from 'element-plus'

// 创建pinia --- userStore实例
const userStore = useUserStore()
// 创建路由实例
const router = useRouter()
// 建立表单数据
const defauteForm = ref({
  username: '',
  password: '',
})
const userInfoForm = ref({})
userInfoForm.value = { ...defauteForm.value }
// 建立模板引用
const formRef = ref(null)
// 建立检验规则
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
// 进行验证
// 提交表单
const onSubmit = async () => {
  // 进行预验证 --- 检验已经写的规则
  await formRef.value.validate()
  // 开始加载
  loading.value = true
  // 提交后台验证
  const res = await userLoginService(userInfoForm.value)
  // console.log(res)
  // console.log(res.data.data)
  // 这是我的理解写的，这一段其实我也不理解那些不写判断的 --- 因为老师没写判断
  if (res.data.code === 200) {
    // 存储 Token
    userStore.setToken(res.data.data)
    // 提示 --- 登陆成功
    // const tempTime = getTimeService()
    ElNotification.success({
      title: `Hi,${getTimeService()}好啊`,
      dangerouslyUseHTMLString: true,
      message: '欢迎回来',
    })
    // 路由跳转
    router.replace('/')
  }
  // 清空userInfoForm
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
  background: url(@/assets/images/background.jpg) no-repeat center / cover;
  .el-form {
    padding: 15px 15px 10px;
    margin-top: 30vh;
    background: url(@/assets/images/login_form.png) no-repeat center / cover;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(41, 48, 170, 0.5));
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    width: 80%;
    border-radius: 30px;
    .el-form-item {
      // background-color: blueviolet;
      padding: 10px 15px;
      h1 {
        height: 50px;
        font-size: 40px;
        font-weight: bolder;
        background: linear-gradient(300deg, aqua, #39c5bb, blue, blueviolet, #ff65a3);
      }
      h2 {
        font-size: 26px;
        font-weight: bolder;
        margin-top: -25px;
        background: linear-gradient(162deg, aqua, #39c5bb, blue, blueviolet, #ff65a3);
      }

      h1,
      h2 {
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .el-input {
        height: 35px;
        border-radius: 10px;
        font-size: 16px;
        background-color: transparent;
      }
      .el-button {
        color: white;
        font-size: 20px;
        width: 100%;
        padding: 5px 20px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 20px;
        background-color: transparent;
      }
      .el-button:hover {
        background-color: rgba(62, 57, 212, 0.486);
        color: rgb(255, 0, 255);
        font-weight: bolder;
        background: linear-gradient(350deg, aqua, #39c5bb, blue, blueviolet, #ff65a3);
        box-shadow: 0 10px 32px 0 rgba(212, 206, 206, 0.615);
        border: 0;
      }
      :deep(.el-input) {
        --el-input-text-color: white;
        --el-input-border: #1e2230;
        --el-input-hover-border: rgba(255, 255, 255, 0.18);
        // 未输入时input边框的颜色
        --el-input-border-color: rgba(255, 255, 255, 0.18);
        // input框边框角度
        --el-input-border-radius: 30px;
        // input背景颜色
        --el-input-bg-color: transparent;
        // input中icon颜色
        --el-input-icon-color: white;
        // input中placeholder颜色
        --el-input-placeholder-color: white;
        // 输入时input边框的颜色
        --el-input-focus-border-color: white;
        --el-input-width: 100%;
      }
    }
  }
}
</style>
