<script setup>
import { ref } from 'vue'
// 进行数据请求
import { reqGetAllRolePermission, reqDelPermission } from '@/api/permiss/menu'
import { ElMessage, ElMessageBox } from 'element-plus'
// 导入弹框组件
import dialogEdit from './dialogEdit/index.vue'

// 菜单表格数据
const tableData = ref([])
// 控制“添加菜单” or “编辑菜单”
// isEdit为0就是添加菜单
// isEdit是1就是编辑菜单
const isEdit = ref(0)

// 弹出Dialog实例
const dialogRef = ref(null)

// 首屏加载函数 --- 渲染页面数据
const getPermissionList = async () => {
  try {
    const res = await reqGetAllRolePermission()
    // console.log(res)
    tableData.value = res.data.data
  } catch (error) {
    ElMessage.error(error)
  }
}

// 添加菜单
const handleAdd = (row) => {
  isEdit.value = 0
  dialogRef.value.dialogExponseFn(row, isEdit.value)
}
// 编辑菜单
const handleEdit = (row) => {
  isEdit.value = 1
  dialogRef.value.dialogExponseFn(row, isEdit.value)
}
// 删除菜单
const handleDel = (row) => {
  ElMessageBox.confirm('您确认删除该菜单权限吗？', '温馨提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        await reqDelPermission(Number(row.id))
        ElMessage.success('删除成功')
        getPermissionList()
      } catch {
        ElMessage.error('删除失败')
      }
    })
    .catch(() => {})
}

// 接受弹框返回数据
const dialogChange = (val) => {
  if (val.flag) {
    getPermissionList()
  }
}

getPermissionList()
</script>

<template>
  <div class="menu-container">
    <CustomCard>
      <!-- 添加菜单 -->
      <!-- <template #head-button>
      </template> -->

      <!-- 菜单数据主体 -->
      <template #content>
        <el-table :data="tableData" row-key="id" border>
          <el-table-column
            label="名称"
            show-overflow-tooltip
            prop="name"
            min-width="100"
            align="center"
          />
          <el-table-column label="权限值" show-overflow-tooltip prop="code" align="center" />
          <el-table-column
            label="修改时间"
            show-overflow-tooltip
            prop="updateTime"
            align="center"
          />
          <el-table-column label="操作" min-width="230" align="center">
            <template #default="{ row }">
              <el-button
                size="small"
                type="primary"
                icon="Plus"
                :disabled="row.level === 4 ? true : false"
                @click="handleAdd(row)"
              >
                {{ row.level === 3 ? '添加功能' : '添加菜单' }}
              </el-button>
              <el-button
                size="small"
                type="warning"
                icon="Edit"
                :disabled="row.level === 1 ? true : false"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
              <el-button
                size="small"
                type="danger"
                icon="Delete"
                :disabled="row.level === 1 ? true : false"
                @click="handleDel(row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </CustomCard>

    <!-- 弹出的Diloag -->
    <dialogEdit ref="dialogRef" @dialogChange="dialogChange" />
  </div>
</template>

<style lang="less" scoped>
.menu-container {
  width: 100%;
  height: 80%;
  box-sizing: border-box;

  .el-card {
    margin-bottom: 20px;
    .head-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  // 卡片样式
  .custom-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
  }

  // 表格样式
  .el-table {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1;
    overflow: hidden;

    // 表头样式
    :deep(.el-table__header-wrapper) {
      th {
        background-color: #f5f7fa;
        color: #606266;
        font-weight: 600;
        height: 50px;
      }
    }

    :deep(.el-table__body-wrapper) {
      overflow-y: auto;
    }
  }

  // 自定义滚动条样式
  :deep(*::-webkit-scrollbar) {
    width: 6px;
    height: 6px;
  }

  :deep(*::-webkit-scrollbar-thumb) {
    background: #dcdfe6;
    border-radius: 3px;
  }

  :deep(*::-webkit-scrollbar-track) {
    background: #f5f7fa;
  }
}
</style>
