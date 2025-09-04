<script setup>
import { ref, defineExpose } from 'vue'
import { reqAddRole, reqUpdateRole } from '@/api/permiss/role'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['dialogChange'])
// 标题flag --- 控制“添加职位” or “修改职位”
// 添加职位： true
// 修改职位： false
const titleFlag = ref(true)

// 弹框显示开关
const isScene = ref(false)
// 进项“添加角色” & “更新角色” 数据请求 的数据
const paramsobj = ref({
  roleName: '',
  remark: '',
})

// 确认按钮
const handleComfirm = async () => {
  isScene.value = false
  try {
    if (paramsobj.value.id) {
      const { remark, roleName, id: role_id } = paramsobj.value
      await reqUpdateRole({ remark, roleName, role_id })
    } else {
      await reqAddRole(paramsobj.value)
    }
    // 进行提示
    ElMessage.success(paramsobj.value.id ? '修改成功' : '添加成功')
    // 关闭遮罩
    isScene.value = false
    // 向父组件发送更新成功消息
    emit('dialogChange', { flag: true })
  } catch {
    ElMessage.error(paramsobj.value.id ? '修改失败' : '添加失败')
  }
}

// 对外暴露的函数
const dialogExponseFn = (row) => {
  // console.log(row)
  // 打开弹框
  isScene.value = true
  titleFlag.value = row.id ? false : true
  paramsobj.value = JSON.parse(JSON.stringify(row))
}

defineExpose({
  dialogExponseFn,
})
</script>

<template>
  <el-dialog v-model="isScene" :title="titleFlag ? '添加职位' : '修改职位'" width="500">
    <el-form :model="form">
      <el-form-item label="职位名称:">
        <el-input v-model="paramsobj.roleName" autocomplete="off" placeholder="请你输入职位名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isScene = false">取消</el-button>
        <el-button type="primary" @click="handleComfirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.el-dialog {
  font-weight: normal;
}
</style>
