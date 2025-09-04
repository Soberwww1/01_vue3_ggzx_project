<script setup>
import { ref, defineExpose } from 'vue'
// 获取不同职位权限API + 更改不同职位权限API
import { reqGetRolePermission, reqUpdateRolePermission } from '@/api/permiss/menu'
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

// 数控组件实例
const treeRef = ref(null)
//
const paramobj = ref({
  roleId: null,
})

// 控制数控组件显示
const defaultProps = {
  children: 'children',
  label: 'name',
}
// 数控组件显示来源的数据
const menuArr = ref([])
// 默认勾选的按钮
const selectedArr = ref([])

// 确认按钮
const confirmClick = async () => {
  // 获取当前被选择的节点数组（注意：这里半选，全选的ID全部都得带😓😓😓）
  // 选中节点的ID
  // let checkedKeys = treeRef.value.getCheckedKeys()
  // // 半选的id
  // let halfCheckedKeys = treeRef.value.getHalfCheckedKeys()
  // let permissionId = checkedKeys.concat(halfCheckedKeys)

  // 这里的API文档有问题，如果使用url拼接的方式传参，需要array:Number
  // 如果选择params查询参数的方式就需要传递字符串
  let checkedKeys = treeRef.value?.getCheckedKeys()
  let permissionId = checkedKeys.join()
  // console.log(permissionId)
  try {
    await reqUpdateRolePermission({
      roleId: paramobj.value.roleId,
      permissionId,
    })
    ElMessage.success('权限分配成功')
    // 关闭遮罩
    emit('drawerChange', { flag: false, isUpdate: true })
  } catch {
    ElMessage.error('权限分配失败')
  }
}
// 取消按钮
const cancelClick = () => {
  // 关闭遮罩
  emit('drawerChange', { flag: false, isUpdate: false })
}

// 抽取所有底层"select"属性为 true的id
// 为了获取类似于数组包对象，对象再包数组这种复杂类型数据中最底层的select属性，特此设立工具函数
const filterBySelected = (arr) => {
  let selectedIds = []

  const traverse = (nodes) => {
    nodes.forEach((node) => {
      // 如果有子节点且不为空，继续递归
      if (node.children && node.children.length > 0) {
        traverse(node.children)
      }
      // 如果是叶子节点且select为true，收集id
      else if (node.select) {
        selectedIds.push(node.id)
      }
    })
  }

  traverse(arr)
  return selectedIds
}

// 暴露到外面的方法
const drawerExponseFn = async (row) => {
  // console.log(row)
  // 将特定职位ID存储本地
  paramobj.value.roleId = Number(row.id)
  try {
    const res = await reqGetRolePermission(row.id)
    // 获取所有节点
    menuArr.value = res.data.data
    // 获取所有选中的节点id
    selectedArr.value = filterBySelected(menuArr.value)
    // 更新树的默认选中项
    treeRef.value.setCheckedKeys(selectedArr.value)
  } catch (error) {
    ElMessage.error(error)
  }
}

// 暴露出方法
defineExpose({
  drawerExponseFn,
})
</script>

<template>
  <el-drawer :model-value="isDrawer" @update:model-value="emit('drawerChange', false)" size="40%">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <!-- 角色树 -->
      <el-tree
        ref="treeRef"
        :data="menuArr"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="selectedArr"
        :props="defaultProps"
        highlight-current
        check-on-click-node
      />
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
.el-tree {
  background-color: transparent;
  padding: 10px;

  :deep(.el-tree-node) {
    // 节点样式
    .el-tree-node__content {
      height: 40px;
      border-radius: 4px;
      margin: 4px 0;

      &:hover {
        background-color: #f5f7fa;
      }
    }

    // 选中状态样式
    &.is-current > .el-tree-node__content {
      background-color: #ecf5ff;
      color: #409eff;
    }

    // 复选框样式
    .el-checkbox {
      margin-right: 8px;
    }
  }

  // 展开图标样式
  :deep(.el-tree-node__expand-icon) {
    font-size: 16px;
    color: #909399;

    &.expanded {
      transform: rotate(90deg);
    }
  }

  // 树节点文本样式
  :deep(.el-tree-node__label) {
    font-size: 14px;
    color: #606266;
  }
}
</style>
