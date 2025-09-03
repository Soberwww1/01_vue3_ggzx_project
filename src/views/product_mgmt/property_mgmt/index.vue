<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// 导入pinia仓库工具函数 + 导入获取一级分类项、获取平台属性api
import { categoryFn } from '@/utils/_store'
import { reqGetPropertyList, reqAddProperty, reqDelProperty } from '@/api/product/property'

// 控制 属性框 & 修改、增加属性框 展示开关
const isShow = ref(true)
// loading加载开关
const loading = ref(false)

// 属性卡片标题
const title = ref('添加平台属性')
// 属性卡片表格数据
const tableData = ref([])

// 默认对象
const defaultObj = ref({
  // id: 0, // 修改的属性ID
  attrName: '', // 修改的属性名 || 增加的属性名
  attrValueList: [], // 修改的属性值列表 || 增加的属性值列表
  /*
      {
        id: , // 修改的属性名的某个属性值Id
        attrId: , // 该属性值属于哪个属性的 属性ID
        valueName: // 修改的属性值名 || 增加的属性值名
      },
    */
  categoryId: '', // 该属性是哪个三级分类下的 三级分类ID
  categoryLevel: 3, // 几级分类下的属性 --- 三级分类下的属性（固定了）
})
// 修改 or 增加 属性对象
const propertyObj = ref({})
propertyObj.value = { ...defaultObj.value }
// 模板引用数组 --- 为实现el-input组件暴露的fouse方法，且使每个el-input对象互不影响
const inputArr = ref([])

// 进行数据获取 --- 三级分类选择之后获取对应属性数据
const getPropertyList = async () => {
  const { c1Id, c2Id, c3Id } = categoryFn()
  // 三级分类必须得有，才能进行数据请求，否则return
  if (!c3Id) {
    tableData.value = []
    return
  }
  try {
    loading.value = true
    const res = await reqGetPropertyList(c1Id, c2Id, c3Id)
    tableData.value = res.data.data
  } catch (error) {
    ElMessage.warning(error)
  }
  loading.value = false
}
// 使用watch监听仓库中 c3Id数值
// 当监听到子组件property-category的onsubmit事件，说明三个选择框都被选择了 --- 进行属性展示
watch(
  () => categoryFn().c3Id,
  () => {
    getPropertyList()
  },
)

// 点击“添加平台属性”按钮
// 打开 修改&增加 属性面板 + 清除上一次操作的数据遗留 + 给提交对象赋值三级分类ID
const handleAdd = () => {
  propertyObj.value = JSON.parse(JSON.stringify(defaultObj.value))
  isShow.value = false
  // 此时已经将三级分类都选择完毕 --- 三级分类的ID已经确定
  propertyObj.value.categoryId = categoryFn().c3Id
}
// 点击编辑按钮 --- 打开 修改&增加属性面板
const handleEdit = (row) => {
  // 打开编辑属性框
  isShow.value = false
  // console.log(row)
  // 将获取的数据本地化并进行编辑 --- 注意：这里存在坑：深浅拷贝
  // 假如这里只是简单的将row对象赋值给property.value，因为row对象中存在引用对象 --- 那么在赋值的时候会将引用对象的地址赋值给property.value中，
  // 从而导致 ---> property.value 与 row 两者中关于属性值这个复杂数据对象（数组）都是指向同一个数组，那么在修改属性时，失手将一些属性值修改了，就算不经过数据请求，返回到属性展示框时，对应的属性也会改变
  // 从而出现数据的安全问题 --- 所以这里选择进行深拷贝---> 使用JSON.parse(JSON.stringify(row))
  // propertyObj.value = row
  propertyObj.value = JSON.parse(JSON.stringify(row))
  // Object.assign(propertyObj.value, JSON.parse(JSON.stringify(row)))
}
// 点击删除按钮 --- 删除该属性
const handleDelete = async (row) => {
  try {
    // 进行点击删除确认键 or 删除取消键操作
    await ElMessageBox.confirm('您确定要删除该属性吗？', '温馨提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })

    // 确认删除操作 --- 进行数据请求
    await reqDelProperty(row.id)
    ElMessage.success('删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error)
    }
  }
  // 删除之后重新拉取数据
  getPropertyList()
}
// 添加属性值按钮 --- 点击给属性添加新的属性值 & 聚焦新属性值
const AddPropertyValue = () => {
  // 创建新属性值 --- 给属性值列表添加 新的对象元素，对象元素包括“属性值名称”、“编辑模式/展示模式开关”
  propertyObj.value.attrValueList.push({
    valueName: '',
    flag: true,
  })
  // 给新添加的对象元素中的输入框“聚焦”
  // 因为新添加的元素肯定是最后一个元素，所以直接获取数组最后一个元素 --- 使用nextTick等待DOM异步更新后进行聚焦
  const length = propertyObj.value.attrValueList.length
  nextTick(() => {
    inputArr.value[length - 1].focus()
  })
}

// 属性值输入框失焦后操作 --- 进入展示模式
const toBlur = (row, index) => {
  // 如果输入框内没有输入 --- 阻止用户展示div，并提示
  if (row.valueName.trim() === '') {
    ElMessage.error('请输入属性值名称')
    propertyObj.value.attrValueList.pop(index)
    return
  }
  // 输入框中有输入，但是输入值重复 --- 阻止用户展示div，并提示
  const tempIndex = propertyObj.value.attrValueList.findIndex((item) => {
    return item.valueName === row.valueName
  })
  if (tempIndex !== index) {
    ElMessage.error('不可输入重复属性值')
    propertyObj.value.attrValueList.pop(index)
    return
  }
  // 进入展示模式
  row.flag = false
}
// 点击div盒子 --- 进入编辑模式
const toEdit = (row, index) => {
  row.flag = true
  // 使用nextTick等待DOM异步更新后结果
  nextTick(() => {
    inputArr.value[index].focus()
  })
}
// 属性值删除按钮
const toDel = (index) => {
  propertyObj.value.attrValueList.splice(index, 1)
}
// 保存按钮 --- 进行数据请求
const Save = async () => {
  await reqAddProperty(propertyObj.value)
  // 返回平台属性展示框
  isShow.value = true
  // 重新拉取后台数据
  getPropertyList()
}
// 取消按钮
const Cancel = () => {
  isShow.value = true
}

// 在组建被销毁时 --- 对应仓库中的数据应该被清空
onBeforeUnmount(() => {
  // 重置category仓库各个属性 --- 因为我没有选择使用选项式API，选择使用组合式API --- 所以在组件销毁时想使用$reset()方法被阻止了（只有选项式API才可使用）
  // 所以我选择使用自己定义的reset()方法重置category仓库各个属性
  categoryFn().reset()
})
</script>

<template>
  <div class="property-container">
    <!-- 分类卡片 -->
    <CustomCategory class="property-category" :show="isShow" />

    <!-- 属性卡片 --- 主体 -->
    <CustomCard class="property-card">
      <!-- 属性值展示框 -->
      <!-- 头部标题 -->
      <template #head-button>
        <!-- 通过isShow开关控制属性框 与 属性修改增加框 展示隐藏 -->
        <!-- 属性展示框 --- 标题 -->
        <el-button
          v-if="isShow"
          :disabled="categoryFn().c3Id ? false : true"
          type="primary"
          icon="Plus"
          @click="handleAdd"
        >
          {{ title }}
        </el-button>

        <!-- 属性修改增加框 --- 标题 -->
        <el-form :mode="propertyObj" v-else>
          <el-form-item label="属性名称:" style="width: 35%">
            <el-input v-model="propertyObj.attrName" placeholder="请您输入属性名" />
          </el-form-item>
        </el-form>
      </template>

      <!-- 表格部分 -->
      <template #content>
        <!-- 通过isShow开关控制属性框 与 属性修改增加框 展示隐藏 -->
        <!-- 属性展示框 --- 主体表格 -->
        <el-table
          v-if="isShow"
          :data="tableData"
          :border="true"
          v-loading="loading"
          show-overflow-tooltip
          class="card-table"
        >
          <el-table-column type="index" align="center" label="序号" width="110" />
          <el-table-column align="center" label="属性名称" width="200" prop="attrName" />
          <el-table-column align="center" label="属性值名称">
            <template #default="{ row }">
              <el-tag
                style="margin: 0 5px"
                type="primary"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <!-- 操作属性编辑 & 删除 -->
            <template #default="{ row }">
              <el-button type="primary" plain size="small" icon="Edit" @click="handleEdit(row)" />
              <el-button
                type="danger"
                plain
                size="small"
                icon="Delete"
                @click="handleDelete(row)"
              />
            </template>
          </el-table-column>
          <!-- 无数据 -->
          <template #empty>
            <el-empty description="找不到数据" />
          </template>
        </el-table>

        <!-- 属性值修改增加框 --- 主体表单 + 表格 -->
        <el-form v-else class="card-form">
          <el-form-item>
            <!-- 根据需要 添加/修改的 属性名输入框里是否有值 --- 来控制 “添加属性值”按钮 -->
            <el-button
              :disabled="propertyObj.attrName ? false : true"
              @click="AddPropertyValue"
              type="primary"
              icon="Plus"
            >
              添加属性值
            </el-button>
            <el-button @click="Cancel">取消</el-button>
          </el-form-item>
          <el-form-item>
            <el-table :data="propertyObj.attrValueList" :border="true">
              <el-table-column type="index" align="center" label="序号" width="110" />
              <el-table-column align="center" label="属性值名称">
                <template #default="{ row, $index }">
                  <!-- 这里使用 ref模板引用的 “函数模板引用” -->
                  <el-input
                    :ref="
                      (el) => {
                        inputArr[$index] = el
                      }
                    "
                    @blur="toBlur(row, $index)"
                    v-show="row.flag"
                    v-model="row.valueName"
                    size="small"
                    placeholder="请您输入属性值名称"
                  />
                  <div @click="toEdit(row, $index)" v-show="!row.flag">{{ row.valueName }}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="110">
                <template #default="{ $index }">
                  <!-- 气泡删除框 -->
                  <el-popconfirm title="您确认删除该属性值吗" @confirm="toDel($index)">
                    <template #reference>
                      <el-button type="danger" icon="Delete" />
                    </template>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item>
            <el-button
              :disabled="propertyObj.attrValueList.length > 0 ? false : true"
              type="primary"
              @click="Save"
            >
              保存
            </el-button>
            <el-button @click="Cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </CustomCard>
  </div>
</template>

<style lang="less" scoped>
.property-container {
  width: 100%;
  height: 100%;
  // background-color: tomato;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .property-category {
    margin-bottom: 50px;
  }

  // 属性卡片
  .property-card {
    height: 100%;
    display: flex;
    flex-direction: column;

    .card-table,
    .card-form {
      height: 90%;
      display: flex;
      flex-direction: column;
      position: relative;
      flex: 1;

      // 修改这里，添加滚动条样式
      overflow-y: auto;

      // 添加内边距，防止内容贴边
      padding: 10px;

      // 美化滚动条样式（可选）
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: #dcdfe6;
        border-radius: 3px;
      }
      &::-webkit-scrollbar-track {
        background: #f5f7fa;
      }
    }

    .card-table {
      :deep(.el-table__body-wrapper) {
        overflow-y: auto;
      }
    }
  }
}
</style>
