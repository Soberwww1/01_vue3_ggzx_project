<script setup>
import { ref } from 'vue'
// 导入数据请求API：获取角色数据 + 新增角色数据 + 更新角色数据
import { reqGetRoleList, reqDelRole } from '@/api/permiss/role'
import { ElMessage, ElMessageBox } from 'element-plus'
import drawerEdit from '@/views/permiss_mgmt/role_mgmt/drawerEdit/index.vue'
import dialogEdit from '@/views/permiss_mgmt/role_mgmt/dialogEdit/index.vue'

// 获取搜索框数据
const searchInput = ref('')

// 用户表格实例
const tableRef = ref(null)
// 用户数据表格
const tableData = ref([])

// 分页器数据
// 当前页数
const currentPage = ref(1)
// 每页多少条数
const pageSize = ref(5)
// 规定每页多少条数 的数组
const pageSizes = ref([1, 2, 3, 5, 10, 20, 40])
// 总共多少数据
const total = ref(0)

// 弹出Dialog实例
const dialogRef = ref(null)

// 右侧抽屉实例
const drawerRef = ref(null)
// 控制抽屉弹框开关
const isDrawer = ref(false)
// 传递给抽屉标题
const drawerTitle = ref('')

// 获取用户数据
const getRoleList = async (page = 1) => {
  // 收集当前页码
  currentPage.value = page
  try {
    const res = await reqGetRoleList({
      page,
      limit: pageSize.value,
      roleName: searchInput.value,
    })
    // console.log(res)
    const { records } = res.data.data
    // 赋值给tableData用户数据
    tableData.value = records
    total.value = res.data.data.total
  } catch {
    ElMessage.error('数据获取失败')
  }
}

// 搜索框搜索
const handleSearch = async () => {
  getRoleList()
}
// 点击重置按钮进行页面刷新
const handleFreshPage = () => {
  location.reload()
}

// 主体表格按钮
// 添加职位
const handelAdd = () => {
  dialogRef.value.dialogExponseFn({})
}
// 编辑职位
const handleEdit = (row) => {
  dialogRef.value.dialogExponseFn(row)
}
// 删除职位
const handleDel = (row) => {
  ElMessageBox.confirm('您确认删除该职位吗？', '温馨提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        await reqDelRole(Number(row.id))
        ElMessage.success('删除成功')
        getRoleList()
      } catch {
        ElMessage.error('删除失败')
      }
    })
    .catch(() => {})
}
// 分配职位权限
const handleAssign = (row) => {
  isDrawer.value = true
  drawerTitle.value = '分配权限'

  drawerRef.value.drawerExponseFn(row)
}

// 分页框按钮
const handleSizeChange = (value) => {
  pageSize.value = value
  // 当当前页面的品牌显示数更改后，回到第一页
  currentPage.value = 1
  getRoleList()
}

// 接受子组件消息
// 接受弹框返回数据
const dialogChange = (val) => {
  if (val.flag) {
    getRoleList()
  }
}
// 接受抽屉返回数据 --- 控制抽屉遮罩打开 or 关闭
const drawerChange = (obj) => {
  // 关闭遮罩
  isDrawer.value = obj.flag
  // 判断主页面是否需要刷新
  if (obj.isUpdate) {
    if (obj.updateFlag === 0) {
      currentPage.value = 1
    }
    getRoleList()
  }
}

// 页面渲染后进行数据请求 --- 获取数据
getRoleList()
</script>

<template>
  <div class="role-container">
    <!-- 用户名搜索简单卡片 -->
    <el-card>
      <el-form class="head-card" :inline="true">
        <el-form-item label="职位名称：">
          <el-input placeholder="角色名称" v-model="searchInput" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" :disabled="searchInput ? false : true">
            搜索
          </el-button>
          <el-button @click="handleFreshPage">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 展示用户数据主体卡片 -->
    <CustomCard>
      <!-- 主体标题 -->
      <template #head-button>
        <el-button type="primary" icon="Plus" @click="handelAdd">添加职位</el-button>
      </template>
      <!-- 主体 数据表格 + 分页器 -->
      <template #content>
        <!-- 数据表格 -->
        <el-table ref="tableRef" :data="tableData" border>
          <el-table-column type="index" label="#" align="center" />
          <el-table-column label="id" prop="id" align="center" />
          <el-table-column
            label="角色名称"
            show-overflow-tooltip
            prop="roleName"
            min-width="100"
            align="center"
          />
          <el-table-column
            label="创建时间"
            show-overflow-tooltip
            prop="createTime"
            min-width="100"
            align="center"
          />
          <el-table-column
            label="更新时间"
            show-overflow-tooltip
            prop="updateTime"
            min-width="100"
            align="center"
          />
          <el-table-column label="操作" fixed="right" min-width="270" align="center">
            <template #default="{ row }">
              <el-button size="small" type="success" icon="User" @click="handleAssign(row)">
                分配权限
              </el-button>
              <el-button size="small" type="warning" icon="Edit" @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button size="small" type="danger" icon="Delete" @click="handleDel(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
          <!-- 无数据 -->
          <template #empty>
            <el-empty description="找不到数据" />
          </template>
        </el-table>
        <!-- 分页器 -->
        <div class="demo-pagination-block">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="pageSizes"
            :background="true"
            layout="prev, pager, next, jumper, -> , sizes, total"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="getRoleList"
          />
        </div>
      </template>
    </CustomCard>

    <!-- 弹出的Diloag -->
    <dialogEdit ref="dialogRef" @dialogChange="dialogChange" />
    <!-- 弹出的抽屉遮罩 -->
    <drawerEdit
      ref="drawerRef"
      :isDrawer="isDrawer"
      :drawerTitle="drawerTitle"
      @drawerChange="drawerChange"
    />
  </div>
</template>

<style lang="less" scoped>
.role-container {
  width: 100%;
  height: 80%;
  .el-card {
    margin-bottom: 20px;
    .head-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .custom-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .el-table {
    height: 90%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  // 表格样式
  .el-table {
    flex: 1;
    overflow: hidden;
    :deep(.el-table__body-wrapper) {
      overflow-y: auto;
    }
  }

  // 分页框样式
  .el-pagination {
    margin-top: 20px;
    justify-content: center;
    padding: 0;
  }
}
</style>
