<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 导入pinia仓库工具函数 + 导入数据请求API
import { categoryFn } from '@/utils/_store'
import { reqGetSPUList, reqDelSPUInfo } from '@/api/product/spu'

// 导入两个组件 --- 添加or修改SPU / 添加SKU
import SkuForm from './SkuForm.vue'
import SpuForm from './SpuForm.vue'

// 控制三级分类框展示分类
const isShow = ref(true)
// 属性卡片标题
const title = ref('添加SPU')
// 控制SPU表格加载loading
const loading = ref(false)

// 控制已有SPU属性卡片 --- scene === 0
// 添加or修改SPU属性卡片 --- scene === 1
// 添加SKU属性卡片 --- scene === 2
const scene = ref(0)

// 请求参数
const parmasobj = ref({
  page: 1, // 当前页码数
  limit: 5, // 当前页面所需数据条数
  category3Id: '', // 该SPU数据所需三级分类ID
})

// 分页框需要数据 --- 总页数、每页显示条目个数数组
const total = ref(0)
const pageSizes = ref([1, 2, 5, 10, 15])

//  测试表格数据
const tableData = ref([])

// 获取两个组件SpuForm & SkuForm 的对外暴露函数，并传递数据
const SpuFormRef = ref(null)
const SkuFormRef = ref(null)

// 获取三级分类对应的SPU表格数据 + 分页器数据
const getSPUList = async () => {
  // 一定得有c3Id才能获取数据
  if (!categoryFn().c3Id) {
    tableData.value = []
    return
  }
  try {
    loading.value = true
    parmasobj.value.category3Id = categoryFn().c3Id
    const res = await reqGetSPUList(parmasobj.value)
    // console.log(res)
    total.value = res.data.data.total
    tableData.value = res.data.data.records
  } catch (error) {
    ElMessage.error(error)
  }
  loading.value = false
}

// 监听仓库中c3Id是否发生变化
watch(
  () => categoryFn().c3Id,
  () => {
    getSPUList()
  },
)

// 分页器操作方法
// 操控当前页数 --- 页数跳转
const handleCurrentChange = (value) => {
  parmasobj.value.page = value

  getSPUList()
}
// 控制每页显示多少条数
const handleSizeChange = (value) => {
  parmasobj.value.limit = value
  parmasobj.value.page = 1

  // 重新拉取后台数据渲染
  getSPUList()
}

// 添加SPU按钮 --- 展示“添加SPU”属性框
const addSpu = () => {
  scene.value = 1
  isShow.value = false
  SpuFormRef.value.exposeFn({
    // 因为新增SPU也要在对应的C3ID中添加，如果不在父组件中带给子组件，默认C3ID就是0（我自己默认写的0）
    category3Id: categoryFn().c3Id,
  })
}
// 修改SPU按钮 --- 展示“添加SPU”属性框，但是有数据、
const updateSpu = (row) => {
  scene.value = 1
  isShow.value = false
  // 传递给SpuForm组件数据
  SpuFormRef.value.exposeFn(row)
  // console.log(row)
}
// 删除SPU按钮
const deleteSpu = (row) => {
  // console.log(row)
  ElMessageBox.confirm('您确认删除吗？', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await reqDelSPUInfo(row.id)
      // 删除后重新拉取后台数据
      parmasobj.value.page = 1
      getSPUList()
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}

// 由组件SpuForm传递过来的数据
// 组件SpuForm可以传递两个值 0：代表回到SPU属性展示页；2：代表跳转到SkuForm组件 --- 即SKU属性值编辑页，
const changeScene = (item) => {
  scene.value = item.flag
  // 获取SPU子组件传回的数据，判断是添加SPU 还是 修改SPU
  if (item.updateORadd === 'add') {
    parmasobj.value.page = 1
  }
  // 更新数据
  getSPUList()
  // 解禁三级分类的分类
  isShow.value = true
}
// 当组件销毁后清空仓库数据
onBeforeUnmount(() => {
  categoryFn().reset()
})
</script>

<template>
  <div class="spu-container">
    <!-- 分类框 -->
    <CustomCategory class="spu-category" :show="isShow" />

    <!-- 主体卡片 -->
    <CustomCard class="spu-card">
      <!-- 卡片标题 -->
      <template #head-button>
        <el-button
          v-show="scene === 0"
          :disabled="categoryFn().c3Id ? false : true"
          @click="addSpu"
          type="primary"
          icon="Plus"
        >
          {{ title }}
        </el-button>
      </template>

      <!-- 卡片主体信息表格 -->
      <template #content>
        <!-- 已有的SPU属性展示区 -->
        <el-table v-show="scene === 0" :data="tableData" v-loading="loading" border>
          <el-table-column align="center" type="index" label="序号" width="80" />
          <el-table-column align="center" label="SPU名称" prop="spuName" width="110" />
          <el-table-column align="center" label="SPU描述" prop="description" />
          <el-table-column align="center" label="操作">
            <template #default="{ row, $index }">
              <!-- 添加sku属性按钮 -->
              <el-button size="small" type="primary" icon="Plus" />
              <!-- 编辑spu属性按钮 -->
              <el-button @click="updateSpu(row, $index)" size="small" type="warning" icon="Edit" />
              <el-button size="small" type="success" icon="Position" />
              <el-button @click="deleteSpu(row, $index)" size="small" type="danger" icon="Delete" />
            </template>
          </el-table-column>
          <!-- 无数据 -->
          <template #empty>
            <el-empty description="找不到数据" />
          </template>
        </el-table>
        <!-- 分页器 -->
        <div class="demo-pagination-block" v-show="tableData.length > 0 && scene === 0">
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

        <!-- 新增 or 修改 SPU属性展示区 -->
        <SpuForm v-show="scene === 1" ref="SpuFormRef" @changeScene="changeScene" />

        <!-- 新增SKU属性展示区 -->
        <SkuForm v-show="scene === 2" ref="SkuFormRef" />
      </template>
    </CustomCard>
  </div>
</template>

<style lang="less" scoped>
.spu-container {
  width: 100%;
  height: 100%;
  // background-color: tomato;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .spu-category {
    margin-bottom: 50px;
  }

  // 主体卡片
  .spu-card {
    width: 100%;
    // height: 100%;
    display: flex;
    flex-direction: column;
  }
  :deep(.el-card__body) {
    width: 100%;
    overflow: auto; // 添加垂直滚动
  }

  .el-table {
    height: 90%;
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1;

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
