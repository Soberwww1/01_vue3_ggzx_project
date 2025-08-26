<script setup>
import { ref } from 'vue'
import { reqGetTrademarkList, reqDeleteTrademarkList } from '@/api/product/brand'
import { ElMessage, ElMessageBox } from 'element-plus'

const title = ref('添加品牌')
const loading = ref(false)
// 表格数据
const tableData = ref([])

// 请求参数
const parmasobj = ref({
  page: 1, // 当前页码数
  limit: 5, // 当前页需要的数据条数
})
// 每页显示条目个数数组
const pageSizes = ref([1, 2, 5, 10, 15])
// 条目总数
const total = ref(0)

// 模板引用 --- dialog对话框
const DialogRef = ref(null)

// 调用获取数据api并二次封装
const getProductList = async (obj) => {
  loading.value = true
  try {
    const res = await reqGetTrademarkList(obj)
    tableData.value = res.data.data.records
    // console.log(res.data.data.records)
    total.value = res.data.data.total
  } catch (error) {
    ElMessage.warning(error)
  }
  loading.value = false
}
// 分页框事件
// 操控每页显示多少条数
const handleSizeChange = (value) => {
  parmasobj.value.limit = value
  // 当当前页面的品牌显示数更改后，回到第一页
  parmasobj.value.page = 1
  getProductList(parmasobj.value)
}
// 操控当前页
const handleCurrentChange = (value) => {
  parmasobj.value.page = value
  getProductList(parmasobj.value)
}

// 品牌操作 --- 添加品牌 & 更新品牌 & 删除品牌
const handleAdd = () => {
  // 添加品牌
  DialogRef.value.exposeFn({})
}
const handleEdit = (obj) => {
  // 更新品牌
  title.value = '修改品牌'
  DialogRef.value.exposeFn(obj)
}
const handleDelete = async (obj) => {
  // 删除品牌
  await ElMessageBox.confirm('您确定该品牌删除吗?', '温馨提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
  try {
    await reqDeleteTrademarkList(obj.id)
    ElMessage.success('删除成功')
  } catch (error) {
    ElMessage.error(error)
  }
  // 删完了重新请求获取数据渲染
  getProductList(parmasobj.value)
}
// 获取子元素消息 --- 更新品牌 or 添加品牌成功后的回调
const handleSucess = (id) => {
  // 在子组件中单项数据传输给父组件 --- 不管修改还是新增都传递id，有id就是在修改；
  // 无id就是在新增；这是增加完毕就需要跳转到最新添加的品牌那里
  if (!id) {
    parmasobj.value.page = Math.ceil(total.value / parmasobj.value.limit)
  }
  getProductList(parmasobj.value)
  ElMessage.success(`${title.value}成功`)
}
// 获取子元素信息 --- 当关闭Dialog时就发送信息
const handleClose = (value) => {
  title.value = value
}

// 页面渲染时就直接请求数据
getProductList(parmasobj.value)
</script>

<template>
  <div class="brand-container">
    <CustomCard class="custom-card">
      <!-- 头部标题 -->
      <template #head-button>
        <el-button type="primary" icon="Plus" @click="handleAdd">{{ title }}</el-button>
      </template>

      <!-- 身体 -->
      <template #content>
        <!-- 主体表格 -->
        <el-table :data="tableData" :border="true" v-loading="loading">
          <!-- 序号 -->
          <el-table-column align="center" type="index" label="序号" width="110" />
          <!-- 品牌名称 -->
          <el-table-column align="center" label="品牌名称" prop="tmName" />
          <!-- 品牌LOGO -->
          <el-table-column align="center" label="品牌LOGO">
            <template #default="obj">
              <img :src="obj.row.logoUrl" style="width: 50px; height: 50px" alt="" />
            </template>
          </el-table-column>
          <!-- 品牌操作 -->
          <el-table-column align="center" label="品牌操作">
            <template #default="scopObj">
              <el-button
                type="primary"
                plain
                size="small"
                icon="Edit"
                @click="handleEdit(scopObj.row)"
              />
              <el-button
                type="danger"
                plain
                size="small"
                icon="Delete"
                @click="handleDelete(scopObj.row)"
              />
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
            v-model:current-page="parmasobj.page"
            v-model:page-size="parmasobj.limit"
            :page-sizes="pageSizes"
            :background="true"
            layout="prev, pager, next, jumper, -> , sizes, total"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </template>
    </CustomCard>

    <!-- Dialog弹出库 -->
    <CustomDialog
      :title="title"
      ref="DialogRef"
      @onSucess="handleSucess"
      @onClose="handleClose"
    ></CustomDialog>
  </div>
</template>

<style lang="less" scoped>
.brand-container {
  width: 100%;
  height: 100%;
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
</style>
