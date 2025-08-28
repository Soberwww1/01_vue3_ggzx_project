<script setup>
import { ref, defineExpose } from 'vue'
import { reqGetSkuInfo } from '@/api/product/sku'
import { ElMessage } from 'element-plus'
// 抽屉开关
const drawer = ref(false)

// 表单数据
const defaultForm = {
  skuName: '',
  skuDesc: '',
  price: null,
}
const form = ref({})
form.value = { ...defaultForm }
// SKU平台属性
const skuAttrValueList = ref([])
// SKU销售属性列表
const skuSaleAttrValueList = ref([])
// SKU照片轮播图数据
const skuImgList = ref([])

// 暴露出去一个方法
const drawerEditExponseFn = async (row) => {
  // 打开遮罩
  drawer.value = true
  try {
    // 进行数据获取
    const res = await reqGetSkuInfo(row.id)
    // console.log(res)
    form.value = res.data.data
    // 平台属性列表
    skuAttrValueList.value = res.data.data.skuAttrValueList
    // 销售属性列表
    skuSaleAttrValueList.value = res.data.data.skuSaleAttrValueList
    // 照片列表
    skuImgList.value = res.data.data.skuImageList
  } catch {
    ElMessage.error('数据请求失败')
  }
}

defineExpose({
  drawerEditExponseFn,
})
</script>

<template>
  <!-- 抽屉组件 -->
  <el-drawer size="50%" v-model="drawer">
    <template #header>
      <h2>查看商品详情</h2>
    </template>
    <template #default>
      <!-- 抽屉页中的表单 -->
      <el-form :model="form">
        <el-form-item label="名称：" label-width="100px">
          <div class="sku-Name">{{ form.skuName }}</div>
        </el-form-item>
        <el-form-item label="描述：" label-width="100px">
          <div class="sku-Desc">{{ form.skuDesc }}</div>
        </el-form-item>
        <el-form-item label="价格：" label-width="100px">
          <div class="sku-Price">{{ form.price }}元</div>
        </el-form-item>
        <el-form-item label="平台属性：" label-width="100px">
          <div class="sku-AttrList">
            <el-tag
              type="success"
              v-for="item in skuAttrValueList"
              :key="item.id"
              style="margin-right: 10px; margin-bottom: 10px"
            >
              {{ item.valueName }}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="销售属性：" label-width="100px">
          <div class="sku-SaleAttrList">
            <el-tag
              type="warning"
              v-for="item in skuSaleAttrValueList"
              :key="item.id"
              style="margin-right: 10px; margin-bottom: 10px"
            >
              {{ item.saleAttrName }}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="商品图片：" label-width="100px">
          <!-- 图片轮播效果 -->
          <div class="img-carousel">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in skuImgList" :key="item">
                <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>

<style lang="less" scoped>
.img-carousel {
  width: 100%;
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: skyblue;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
