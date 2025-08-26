<script setup>
import { ref } from 'vue'

// 表格数据
const tableData = ref([{}, {}])
</script>

<template>
  <el-form label-width="100">
    <el-form-item label="SKU名称：">
      <el-input placeholder="SKU名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)：">
      <el-input placeholder="价格（元）"></el-input>
    </el-form-item>
    <el-form-item label="重量(克)：">
      <el-input placeholder="重量（克）"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述：">
      <el-input placeholder="SKU描述"></el-input>
    </el-form-item>
    <el-form-item label="平台属性：">
      <template #default>
        <el-form>
          <el-form-item label="手机一级">
            <el-select
              v-model="value"
              :options="options"
              placeholder="Select"
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="电池容量">
            <el-select
              v-model="value"
              :options="options"
              placeholder="Select"
              style="width: 240px"
            />
          </el-form-item>
        </el-form>
      </template>
    </el-form-item>
    <el-form-item label="销售属性：">
      <template #default>
        <el-form>
          <el-form-item label="颜色：">
            <el-select
              v-model="value"
              :options="options"
              placeholder="Select"
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="版本：">
            <el-select
              v-model="value"
              :options="options"
              placeholder="Select"
              style="width: 240px"
            />
          </el-form-item>
        </el-form>
      </template>
    </el-form-item>
    <el-form-item>
      <el-table :data="tableData" border>
        <el-table-column type="selection" :selectable="selectable" width="55" />
        <el-table-column label="图片">
          <template #default>
            <img src="" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="名称"></el-table-column>
        <el-table-column label="操作">
          <template #default>
            <el-button type="warning">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="less" scoped></style>
