<script setup>
import { ref, defineExpose } from 'vue'
import { reqAddPermission, reqUpdatePermission } from '@/api/permiss/menu'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['dialogChange'])
// 标题flag --- 控制“添加职位” or “修改职位”
// 添加菜单： true
// 修改菜单： false
const title = ref('')

// 弹框显示开关
const isScene = ref(false)

// form表单实例对象
const formRef = ref(null)
// 默认数据
const defaultObj = {
  code: '', // 权限值
  level: 0, // 添加菜单时：父亲层级；编辑菜单时：自己层级
  name: '', // 菜单名
  pid: 0, // 添加菜单时：父亲菜单ID；编辑菜单时：自己ID
}
// 进项“添加角色” & “更新角色” 数据请求 的数据
const paramsobj = ref({})
// 进行表单验证的规则
const rules = {
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
}

// 确认按钮
const handleComfirm = async () => {
  // 关闭遮罩
  isScene.value = false
  try {
    //
    if (paramsobj.value.isEdit === 1) {
      await reqUpdatePermission(paramsobj.value)
    } else {
      await reqAddPermission(paramsobj.value)
    }
    // 进行提示
    ElMessage.success(paramsobj.value.isEdit === 1 ? '修改成功' : '添加成功')
    // 向父组件发送更新成功消息
    emit('dialogChange', { flag: true })
  } catch {
    ElMessage.error(paramsobj.value.isEdit === 1 ? '修改失败' : '添加失败')
  }
}

// 对外暴露的函数
const dialogExponseFn = (row, isEdit) => {
  // 打开弹框
  isScene.value = true
  if (isEdit === 0) {
    // 如果value为0 --- 就是添加菜单
    title.value = '添加菜单'

    // 更改传参数据 --- 添加菜单
    paramsobj.value = JSON.parse(JSON.stringify(defaultObj))
    paramsobj.value.pid = row.id
    paramsobj.value.level = row.level + 1

    // 增加添加菜单标志
    paramsobj.value.isEdit = 0
  }
  if (isEdit === 1) {
    // 如果value为1 --- 就是编辑菜单
    title.value = '修改菜单'

    // 更改菜单数据 --- 编辑菜单
    paramsobj.value = JSON.parse(JSON.stringify(row))

    // 增加编辑菜单标志
    paramsobj.value.isEdit = 1
  }
}

defineExpose({
  dialogExponseFn,
})
</script>

<template>
  <el-dialog v-model="isScene" :title="title" width="500">
    <el-form :model="paramsobj" ref="formRef" :rules="rules">
      <el-form-item label="职位名称:" label-width="90px" prop="name">
        <el-input v-model="paramsobj.name" autocomplete="off" placeholder="请你输入菜单名称" />
      </el-form-item>
      <el-form-item label="权限值:" label-width="90px" prop="code">
        <el-input v-model="paramsobj.code" autocomplete="off" placeholder="请你输入权限值" />
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
