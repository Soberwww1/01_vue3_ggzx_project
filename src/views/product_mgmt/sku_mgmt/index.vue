<script setup>
import { ref, onMounted, markRaw } from 'vue'
import { useRouter } from 'vue-router'
// 导入数据请求API
import { reqGetSkuList, reqOnSaleSku, reqCancelSaleSku, reqDelSku } from '@/api/product/sku'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import DrawerEdit from './components/drawerEdit/index.vue'

const router = useRouter()

// SKU表格展示数据
const SKUtableData = ref([])

// 分页器数据
// 当前页数
const currentPage = ref(1)
// 每页多少条数
const pageSize = ref(3)
// 规定每页多少条数 的数组
const pageSizes = ref([1, 2, 3, 5, 10, 20, 40])
// 总共多少数据
const total = ref(0)

// 抽屉遮罩模板引用
const drawerEditRef = ref(null)

// 获取数据
const getSKUList = async () => {
  try {
    const res = await reqGetSkuList({ page: currentPage.value, limit: pageSize.value })
    // console.log(res)
    const { records } = res.data.data
    total.value = res.data.data.total
    SKUtableData.value = records
  } catch {
    ElMessage.error('SKU数据获取失败')
  }
}

// 表格中操作栏各操作
// 上、下架 该SKU
const updateSale = async (row) => {
  // console.log(id, isSale)
  // 当 isSale 值是0，代表该SKU商品目前为“下架”，但点击了，要改为“上架”
  try {
    if (row.isSale === 0) {
      await reqOnSaleSku(row.id)
      // 上架成功需要提示
      ElMessage.success('商品上架成功')
    } else {
      // 不为0就是1了， 此时要改为“下架”
      await reqCancelSaleSku(row.id)
      ElMessage('商品下架成功')
    }
  } catch {
    ElMessage.error(row.isSale === 0 ? '商品上架失败' : '商品下架失败')
  }
  // 更改上、下架后 重新拉取数据
  getSKUList()
}
// 编辑该SKU
const editSale = () => {
  ElMessage.success('该功能仍开发中，敬请期待...')
}
// 展示该SKU --- 展示该SKU详情
const toShowSale = (row) => {
  drawerEditRef.value.drawerEditExponseFn(row)
}
// 删除该SKU
const delSale = (row) => {
  ElMessageBox.confirm(`您确认删除${row.skuName}吗？`, '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    icon: markRaw(Delete),
  })
    .then(async () => {
      await reqDelSku(row.id)
      // 删除后重新拉取后台数据，并返回第一页
      getSKUList()
      currentPage.value = 1
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}

// 分页器操作
// 操控每页显示多少条数
const handleSizeChange = (value) => {
  pageSize.value = value
  // 当当前页面的品牌显示数更改后，回到第一页
  currentPage.value = 1
  getSKUList()
}
// 操控当前页
const handleCurrentChange = (value) => {
  currentPage.value = value
  getSKUList()
}

onMounted(() => {
  getSKUList()
})
</script>

<template>
  <div class="spu-container">
    <!-- 静态 --- 外围使用自定义组件Card -->
    <CustomCard>
      <!-- 卡片顶端标题 -->
      <template #head-button>
        <el-button @click="router.push('/product/spu')" type="primary" icon="Plus">
          添加SKU
        </el-button>
      </template>
      <!-- 卡片主体 --- SKU数据表格 + 分页器 -->
      <template #content>
        <!-- SKU数据表格 -->
        <el-table :data="SKUtableData" border>
          <el-table-column label="序号" align="center" type="index" />
          <el-table-column label="名称" prop="skuName" show-overflow-tooltip align="center" />
          <el-table-column label="描述" prop="skuDesc" show-overflow-tooltip align="center" />
          <el-table-column label="默认图片" min-width="200" align="center">
            <template #default="{ row }">
              <el-image style="width: 100px; height: 100px" :src="row.skuDefaultImg" fit="fill" />
            </template>
          </el-table-column>
          <el-table-column label="重量(g)" prop="weight" align="center" />
          <el-table-column label="价格(元)" prop="price" align="center" />
          <el-table-column fixed="right" label="操作" min-width="250" align="center">
            <template #default="{ row }">
              <el-button
                @click="updateSale(row)"
                size="small"
                :type="row.isSale === 0 ? 'success' : 'info'"
                :icon="row.isSale === 0 ? 'Top' : 'Bottom'"
              />
              <el-button @click="editSale" size="small" type="primary" icon="Edit" />
              <el-button @click="toShowSale(row)" size="small" type="warning" icon="InfoFilled" />
              <el-button @click="delSale(row)" size="small" type="danger" icon="Delete" />
            </template>
          </el-table-column>
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
            @current-change="handleCurrentChange"
          />
        </div>
      </template>
    </CustomCard>

    <!-- 右侧抽屉 -->
    <drawerEdit ref="drawerEditRef"></drawerEdit>
  </div>
</template>

<style lang="less" scoped>
.spu-container {
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
