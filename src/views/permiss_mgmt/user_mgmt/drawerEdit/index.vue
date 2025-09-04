<script setup>
import { ref, defineExpose } from 'vue'
// 导入数据请求API：获取用户数据 + 新增用户数据 + 更新用户数据 + 获取用户角色数据 + 分配用户角色
import { reqAddUser, reqUpdateUser, reqGetUserRoles, reqAssignUserRoles } from '@/api/permiss/user'
import { ElMessage } from 'element-plus'
defineProps({
  isDrawer: {
    type: Boolean,
  },
  drawerTitle: {
    type: String,
  },
})
const emit = defineEmits(['drawerChange'])

// 控制添加角色 、编辑角色、 分配角色 三个抽屉的开关
// 添加角色 --- 0
// 编辑角色 --- 1
// 分配角色 --- 2
const isScene = ref(0)

// 收集表单框数据
const paramsobj = ref({
  name: '',
  password: '',
  username: '',
})
// 表单框实例对象
const formRef = ref(null)
// 表单校验规则
const validatorUsername = (rule, value, callback) => {
  // 用户名字｜昵称，长度至少五位
  if (value.trim().length < 5) {
    callback(new Error('用户姓名至少5位'))
  } else {
    callback() // 就算校验成功，也需要callback🤮🤮🤮
  }
}
const validatorName = (rule, value, callback) => {
  // 用户名字｜昵称，长度至少五位
  if (value.trim().length < 5) {
    callback(new Error('用户昵称至少5位'))
  } else {
    callback() // 就算校验成功，也需要callback🤮🤮🤮
  }
}
const validatorPassword = (rule, value, callback) => {
  // 用户密码，长度至少五位
  if (value.trim().length < 6) {
    callback(new Error('用户密码至少6位'))
  } else {
    callback() // 就算校验成功，也需要callback🤮🤮🤮
  }
}
const rules = ref({
  username: [
    { required: true, message: '请输入用户姓名', trigger: 'blur' },
    { validator: validatorUsername, trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { validator: validatorName, trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    { validator: validatorPassword, trigger: 'blur' },
  ],
})

// 控制多选框
// 全选 | 反选 开关
const checkAll = ref(true)
const isIndeterminate = ref(true)

// 所有职位列表
const allRoles = ref([])
// 对应ID所担任职位的列表
const checkedRoles = ref([])
// 全选按钮改变事件
const handleCheckAllChange = (val) => {
  checkedRoles.value = val ? allRoles.value : []
  isIndeterminate.value = false
}
// 单个按钮改变事件
const handleCheckedRoleChange = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRoles.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRoles.value.length
}

// 确认按钮
const confirmClick = async () => {
  try {
    // form 表单校验
    await formRef.value.validate()

    // 判断是什么操作 --- 添加角色 or 编辑角色 or 分配角色
    if (isScene.value === 0) {
      // 添加角色
      await reqAddUser(paramsobj.value)
      // const res = await reqAddUser(paramsobj.value)
      // console.log(res)
      ElMessage.success('添加角色成功')
    } else if (isScene.value === 1 && paramsobj.value.id) {
      // 编辑角色
      await reqUpdateUser(paramsobj.value)
      // const res = await reqUpdateUser(paramsobj.value)
      // console.log(res)
      ElMessage.success('编辑角色成功')
    } else if (isScene.value === 2 && paramsobj.value.id) {
      // 分配角色
      // 按照对应API文档要求整理规范的数据格式进行数据请求
      const roleIdList = checkedRoles.value.map((item) => item.id)
      const obj = {
        userId: paramsobj.value.id,
        roleIdList,
      }
      await reqAssignUserRoles(obj)
      ElMessage.success('角色分配成功')
    }

    // 关闭遮罩
    emit('drawerChange', { flag: false, isUpdate: true, updateFlag: isScene.value })
  } catch {
    switch (isScene.value) {
      case 0:
        ElMessage.error('添加角色失败')
        break
      case 1:
        ElMessage.error('编辑角色失败')
        break
      case 2:
        ElMessage.error('分配用户角色失败')
        break
    }
  }
}
// 取消按钮
const cancelClick = () => {
  // 关闭遮罩
  emit('drawerChange', { flag: false, isUpdate: false })
}

// 还是需要向外暴露一个方法
const drawerExponseFn = async (row, scene) => {
  // console.log(row)
  isScene.value = scene

  // 将传递过来的信息赋值给信息收集框 --- 并且预防vue的响应式的副作用（未发送请求就更改了模板数据）
  paramsobj.value = JSON.parse(JSON.stringify(row))

  // 进行判断 --- 判断是否进行分配角色操作
  // 如果尽心角色分配操作 --- 获取所有角色 + 对应ID所对应的角色
  if (scene === 2) {
    try {
      const {
        data: {
          data: { allRolesList, assignRoles },
        },
      } = await reqGetUserRoles(row.id)
      allRoles.value = allRolesList
      checkedRoles.value = assignRoles
    } catch (error) {
      ElMessage.error(error)
    }
  }
}

defineExpose({
  drawerExponseFn,
})
</script>

<template>
  <el-drawer :model-value="isDrawer" @update:model-value="emit('drawerChange', false)" size="40%">
    <template #header>
      <h4>{{ drawerTitle }}</h4>
    </template>
    <template #default>
      <el-form ref="formRef" :model="paramsobj" :rules="rules" label-width="auto">
        <!-- 用户姓名添加用户、修改用户、分配用户都需要 -->
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="paramsobj.username" :disabled="isScene === 2 ? true : false" />
        </el-form-item>
        <el-form-item v-show="isScene === 1 || isScene === 0" label="用户昵称" prop="name">
          <el-input v-model="paramsobj.name"></el-input>
        </el-form-item>
        <el-form-item v-show="isScene === 0" label="用户密码" prop="password">
          <el-input v-model="paramsobj.password"></el-input>
        </el-form-item>
        <!-- 多选角色列表 -->
        <el-form-item v-show="isScene === 2" label="角色列表">
          <div class="role-list">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <!-- 角色列表 --- 各个职位 -->
            <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRoleChange">
              <el-checkbox
                v-for="item in allRoles"
                :key="item.id"
                :label="item.roleName"
                :value="item"
              />
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style lang="less" scoped>
.role-list {
  width: 100%;
}
</style>
