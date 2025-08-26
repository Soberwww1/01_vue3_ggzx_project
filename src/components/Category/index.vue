<script setup>
import { onMounted } from 'vue'
import { categoryFn } from '@/utils/_store'
import { reqGetCategory1, reqGetCategory2, reqGetCategory3 } from '@/api/product/property'
import { ElMessage } from 'element-plus'

// 获取父组件传递的信息 --- 当父组件添加平台属性 or 修改平台属性 时已经选择了的1、2、3级分类不可改变
defineProps({
  show: {
    type: Boolean,
  },
})

// 属性页渲染就获取一级分类数据
const getCategory1 = async () => {
  const res = await reqGetCategory1()
  categoryFn().c1list = res.data.data
}

// 当各个选择框发生值更改 --- ...
const handleCategory1 = async () => {
  // 将后两个选择器清空
  categoryFn().setCategoryId('c2Id', '')
  categoryFn().setCategoryId('c3Id', '')

  const res = await reqGetCategory2(categoryFn().c1Id)
  categoryFn().c2list = res.data.data
}
const handleCategory2 = async () => {
  // 将最后的选择器清空
  categoryFn().setCategoryId('c3Id', '')

  const res = await reqGetCategory3(categoryFn().c2Id)
  categoryFn().c3list = res.data.data
}

// 属性页进行渲染后进行数据请求
onMounted(() => {
  try {
    getCategory1()
  } catch (error) {
    ElMessage.warning(error)
  }
})
</script>

<template>
  <el-card>
    <el-form :inline="true">
      <!-- 一级选择器 -->
      <el-form-item label="一级分类:">
        <el-select
          :disabled="!show"
          v-model="categoryFn().c1Id"
          @change="handleCategory1"
          placeholder="请选择"
          style="width: 240px"
        >
          <el-option
            v-for="item in categoryFn().c1list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <!-- 二级选择器 -->
      <el-form-item label="二级分类:">
        <el-select
          :disabled="!show"
          v-model="categoryFn().c2Id"
          @change="handleCategory2"
          placeholder="请选择"
          style="width: 240px"
        >
          <el-option
            v-for="item in categoryFn().c2list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <!-- 三级选择器 -->
      <el-form-item label="三级分类:">
        <el-select
          :disabled="!show"
          v-model="categoryFn().c3Id"
          placeholder="请选择"
          style="width: 240px"
        >
          <el-option
            v-for="item in categoryFn().c3list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="less" scoped>
.el-card {
  width: 100%;
  height: 25%;
  display: flex;

  :deep(.el-card__body) {
    width: 100%;
    overflow: auto; // 添加垂直滚动
  }

  .el-form {
    // background-color: tomato;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
  }
}
</style>
