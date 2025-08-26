<script setup>
import { ref } from 'vue'
import { userStoreFn } from '@/utils/_store'
import { ElMessage } from 'element-plus'

// 导入api --- 添加品牌 & 更新品牌
import { reqAddTrademarkList, reqUpdateTrademarkList } from '@/api/product/brand/index'
defineProps({
  title: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['onSucess', 'onClose'])

// 控制Dialog对话框是否展示
const isShow = ref(false)
// 表单数据：品牌名 + 显示图片
const form = ref({
  tmName: '',
  logoUrl: '',
})
// 添加验证表单数据 --- 当表单信息没有更改，但是点击确定时，拒绝发送数据请求
const originForm = ref({})
// 模板导入 --- form表单校验
const formRef = ref(null)
// 校验规则
const rules = {
  tmName: [
    { required: true, message: '请输入品牌名', trigger: ['change'] },
    { min: 2, message: '品牌名称位数大于等于两位', trigger: ['change'] },
  ],
  logoUrl: [{ required: true, message: 'LOGO图片务必上传', trigger: ['change'] }],
}
//
const headers = { Token: userStoreFn().token }

// 上传文件之前的钩子函数 --- 用于文件的检测
const beforeAvatarUpload = (rawFile) => {
  // console.log(rawFile)
  // console.log(import.meta.env.VITE_SERVE)
  if (
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/gif' &&
    rawFile.type !== 'image/jpg' &&
    rawFile.type !== 'image/webp'
  ) {
    ElMessage.warning('上传文件需要为: png、jpg、gif、webp')
    return false
  } else if (rawFile.size / 1024 / 1024 > 3) {
    ElMessage.warning('图片大小不可超过 3MB!')
    return false
  }
  return true
}
// 文件上传成功后返回函数
const handleAvatarSuccess = (response) => {
  if (response.code === 200) {
    // const tempPath = response.data.replace(new RegExp(`^${import.meta.env.VITE_APP_BASE_API}`), '')
    // form.value.logoUrl = `${import.meta.env.VITE_SERVE}` + `${tempPath}`
    /*
      上述代码是我之前将成功上传后的图片路径更改的代码，因为从后台数据库中获取的图片数据不是完整数据
      而是类似于：'/api/static/img/sph/20241217/oppo4.jpeg' 这中形式，然后发现
      http://localhost:5173/api/static/img/sph/20250811/3-300x300.jpg
      http://127.0.0.1:10086/static/img/sph/20250801/3-300x300.jpg
      都可以访问，那我还何必更改图片路径呢
    */
    form.value.logoUrl = response.data
    // console.log(response.data)
    return
  }
  ElMessage.warning(response.message)
}

// 取消上传
const onCancel = () => {
  form.value = {}
  // 关闭遮罩
  isShow.value = false
}
// 确定上传图片
const onComfirm = async () => {
  // 进行预验证 --- 检验已经写的规则
  await formRef.value.validate()
  try {
    // 判断form表单中是否有id --- 如果是更新品牌就有id；如果是新增就没有id
    if (form.value.id) {
      // 继续判断 --- 假如用户什么都没改就点确定，就不必发送请求，也不必提醒用户更改成功
      if (
        originForm.value.tmName === form.value.tmName &&
        originForm.value.logoUrl === form.value.logoUrl
      ) {
        ElMessage.warning('数据未发生变化，请修改后提交!')
        return
      }
      // 没有进入到上面的判断 --- 就是更改了 --- 需要进行数据请求
      await reqUpdateTrademarkList(form.value)
    } else {
      // 没有品牌ID --- 说明是新增品牌 --- 进行增加品牌数据请求
      await reqAddTrademarkList(form.value)
    }
    isShow.value = false
    // 如果是修改品牌 --- 就传递当前品牌的id；不是就发送空
    emit('onSucess', form.value?.id)
  } catch (error) {
    ElMessage.error(error)
  }
}

// 对外暴露一些方法
const exposeFn = (obj) => {
  // 先打开遮罩再说
  isShow.value = true
  // 判断obj是否有值 --- 并且防止出现undefined、null等扰乱，使用obj.id判断
  if (obj.id) {
    // 有id就是更新品牌操作
    // 将得到的数据赋值给form.value --- 就是完成了回显
    form.value = { ...obj }
    // 将数据也给originForm一份 --- 以便进行数据修改判断
    originForm.value = { ...obj }
  } else {
    // 没有就是添加品牌操作
    // console.log(obj)
    form.value = obj
  }
}
defineExpose({
  exposeFn,
})
</script>

<template>
  <!-- 关闭Dialog 对话框后的回调 -->
  <el-dialog v-model="isShow" :title="title" @close="emit('onClose', '添加品牌')" width="500">
    <!-- 表单 -->
    <el-form :model="form" ref="formRef" :rules="rules">
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input v-model="form.tmName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.logoUrl"
            :src="form.logoUrl"
            style="width: 200px; height: 200px"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onComfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.dialog-footer {
  padding: 20px 0 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  :deep(.el-button) {
    margin-left: 0; // 覆盖默认的左边距
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1.5px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
