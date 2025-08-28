<script setup>
import { ref, defineExpose } from 'vue'
import { categoryFn } from '@/utils/_store'
// 导入数据请求 --- 获取平台属性
import { reqGetPropertyList } from '@/api/product/property'
// 对应SPU的销售属性（sku是属于spu的）
import { reqGetSkuSaleAttrList, reqGetSkuImgList, reqSaveSkuInfo } from '@/api/product/sku'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['changeScene'])

// 表格模板引用
const tableRef = ref(null)

// 默认数据
const defaultForm = {
  // 通过v-model获取
  skuName: '', // SKU名字
  price: null, // SKU价格
  weight: null, // SKU重量
  skuDesc: '', // SKU描述
  // 通过父组件传递的row数据提取
  category3Id: 0, // 三级分类ID
  spuId: '', // 已有的SPUID
  tmId: '', // SPU品牌ID
  // 通过数据请求 + 用户选择获取
  skuAttrValueList: [], // SKU平台属性
  skuSaleAttrValueList: [], // SKU销售属性
  skuDefaultImg: '', // 售卖SKU图片地址
}
// SKU请求数据
const formSku = ref({})
formSku.value = { ...defaultForm }
// 平台属性
const skuAttrList = ref([])
// 销售属性
const skuSaleAttrList = ref([])
// 照片数据
const skuImageList = ref([])

// 获取平台属性
const getSKUPropertyList = async () => {
  const { c1Id, c2Id, c3Id } = categoryFn()
  try {
    const res = await reqGetPropertyList(c1Id, c2Id, c3Id)
    skuAttrList.value = res.data.data
  } catch (error) {
    ElMessage.error(error)
  }
}
// 获取销售属性
const getSKUSaleList = async (id) => {
  const res = await reqGetSkuSaleAttrList(id)
  // console.log(res.data.data)
  skuSaleAttrList.value = res.data.data
}
// 获取图片
const getSKUImgList = async (id) => {
  const res = await reqGetSkuImgList(id)
  // console.log(res)
  skuImageList.value = res.data.data
}

// 设置默认按钮
const handeler = (row) => {
  // 点击的时候，全部的复选框不勾选
  tableRef.value?.clearSelection()
  // 勾选选中的行
  tableRef.value?.toggleRowSelection(row, true)
  // 收集图片地址
  formSku.value.skuDefaultImg = row.imgUrl
}

// 提交SKU数据，进行数据请求
// 保存按钮
const handelSave = async () => {
  // 在提交前，必须将formSku.value 整理成服务器可以识别的对象
  // 修正平台属性
  formSku.value.skuAttrList = skuAttrList.value.reduce((accumulator, currentValue) => {
    if (currentValue.AttrIdANDAttrValueID) {
      const [valueId, attrId] = currentValue.AttrIdANDAttrValueID.split(':')
      accumulator.push({
        valueId,
        attrId,
      })
    }
    return accumulator
  }, [])
  // 修正销售属性
  formSku.value.skuSaleAttrList = skuSaleAttrList.value.reduce((accumulator, currentValue) => {
    if (currentValue.SaleAttrIdANDSaleAttrValueID) {
      const [saleAttrId, saleAttrValueId] = currentValue.SaleAttrIdANDSaleAttrValueID.split(':')
      accumulator.push({
        saleAttrId,
        saleAttrValueId,
      })
    }
    return accumulator
  }, [])
  try {
    await reqSaveSkuInfo(formSku.value)
    // 提示“添加成功” + 返回“展示Spu”页面
    ElMessage.success('SKU添加成功')
    emit('changeScene', { flag: 0 })
  } catch {
    ElMessage.error('SKU添加失败')
  }
}

// 暴露给父组件的函数
const SKUExposeFn = (row) => {
  // 当添加新的SKU按钮时，清空上一次的SKU数据
  formSku.value = JSON.parse(JSON.stringify(defaultForm))
  // console.log(row)
  // 将父组件传来的category3Id、spuID、tmId赋值给formSku提交数据中
  formSku.value.category3Id = row.category3Id
  formSku.value.spuId = row.id
  formSku.value.tmId = row.tmId
  // 获取平台属性
  getSKUPropertyList(row.id)
  // 获取销售属性
  getSKUSaleList(row.id)
  // 获取SKU图片墙
  getSKUImgList(row.id)
}

defineExpose({
  SKUExposeFn,
})
</script>

<template>
  <el-form label-width="100">
    <el-form-item label="SKU名称：">
      <el-input v-model="formSku.skuName" placeholder="SKU名称" />
    </el-form-item>
    <el-form-item label="价格(元)：">
      <el-input-number
        v-model="formSku.price"
        :min="0"
        :precision="2"
        :step="1"
        controls-position="right"
        placeholder="价格（元）"
      >
        <template #suffix>
          <span>￥</span>
        </template>
      </el-input-number>
    </el-form-item>
    <el-form-item label="重量(克)：">
      <el-input-number
        v-model="formSku.weight"
        :min="0"
        :precision="2"
        :step="1"
        controls-position="right"
        placeholder="重量（克）"
      >
        <template #suffix>
          <span>g</span>
        </template>
      </el-input-number>
    </el-form-item>
    <el-form-item label="SKU描述：">
      <el-input v-model="formSku.skuDesc" type="textarea" placeholder="SKU描述" />
    </el-form-item>
    <el-form-item label="平台属性：">
      <template #default>
        <el-form :inline="true">
          <!-- 根据获取的数据不同 --- 动态进行渲染表单选项 -->
          <el-form-item
            v-for="item in skuAttrList"
            :key="item.id"
            :label="`${item.attrName}:`"
            label-width="80"
          >
            <el-select
              v-model="item.AttrIdANDAttrValueID"
              placeholder="请选择"
              style="width: 240px; margin-bottom: 10px"
            >
              <el-option
                v-for="item in item.attrValueList"
                :key="item.id"
                :label="item.valueName"
                :value="`${item.id}:${item.attrId}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </el-form-item>
    <el-form-item label="销售属性：">
      <template #default>
        <el-form :inline="true">
          <!-- 根据获取的数据不同 --- 动态进行渲染表单选项 -->
          <el-form-item
            v-for="item in skuSaleAttrList"
            :key="item.id"
            :label="`${item.saleAttrName}:`"
          >
            <el-select
              v-model="item.SaleAttrIdANDSaleAttrValueID"
              placeholder="请选择"
              style="width: 240px; margin-bottom: 10px"
            >
              <el-option
                v-for="item in item.spuSaleAttrValueList"
                :key="item.id"
                :label="item.saleAttrValueName"
                :value="`${item.baseSaleAttrId}:${item.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </el-form-item>
    <el-form-item label="图片名称：">
      <el-table :data="skuImageList" ref="tableRef" border>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="图片" align="center">
          <template #default="{ row }">
            <el-image style="width: 100px; height: 100px" :src="row.imgUrl" fit="fill" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName" align="center" />
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button @click="handeler(row)" size="default" type="warning">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button @click="handelSave" type="primary">保存</el-button>
      <el-button @click="emit('changeScene', { flag: 0 })">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="less" scoped>
.el-form {
  .el-form-item {
    .el-input,
    .el-input-number {
      width: 50%;
    }
  }
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
