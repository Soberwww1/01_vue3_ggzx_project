<script setup>
import { ref, defineExpose, computed, nextTick } from 'vue'
import { userStoreFn } from '@/utils/_store'

// 获取全部品牌API
import { reqGetTrademarkAllList } from '@/api/product/brand/index'
// 获取所有销售属性选择框列表 + 新增SPU属性 + 更新SPU属性 API
import { reqAllTradeMark, reqSaveSPUInfo, reqUpdateSPUInfo } from '@/api/product/spu/index'
// 获取当前SPU 照片墙 + 销售属性
import { reqGetSkuImgList, reqGetSkuSaleAttrList } from '@/api/product/sku/index'
import { ElMessage } from 'element-plus'

// 使用组件通信给父组件传递消息 --- 控制编辑spu属性页面 ---> 展示spu属性页面
const emit = defineEmits(['changeScene'])
// 传输图片所需用户Token
const headers = { Token: userStoreFn().token }

// 控制照片墙弹框展示
const dialogVisible = ref(false)
// 照片墙弹框中显示的图片url
const dialogImageUrl = ref('')

// SPU品牌选择器数据
const brandOptions = ref([])
// SPU销售属性选择器数据
const saleOptions = ref([])

// 获取新添加的销售属性 --- spu销售属性选择框获取的数据（销售属性名 + 销售属性ID）
const saleAttrIdAndValueName = ref('')

// 编辑SPU表单数据
// 模板引用 --- 表单ref
const formRef = ref(null)
// 默认表单数据
const defaultForm = {
  spuName: '', // 对应的SPU名
  description: '', // 对应的SPU属性描述
  category3Id: 0, // 对应的三级分类ID
  id: 0, // 对应的哪个SPU
  tmId: '', // 该SPU所对应的品牌名ID
  spuImageList: [], // 该SPU对应的照片墙数据
  spuSaleAttrList: [], // 该SPU对应的销售属性数据
}
const formSpu = ref({})
formSpu.value = { ...defaultForm }
// 表单检验
const rules = ref({
  spuName: [
    { required: true, message: '请输入SPU名称', trigger: 'blur' }, // 非空检验
  ],
  tmId: [
    { required: true, message: '请选择SPU品牌', trigger: 'blur' }, // 非空检验
  ],
  spuImageList: [
    { required: true, message: '请至少上传一张SPU照片', trigger: 'blur' }, // 非空检验
  ],
})

// 照片墙数据列表 --- 图片url列表
const spuImageList = ref([])
// 对应ID的SPU销售属性列表
const spuSaleAttrList = ref([])

// 使用动态ref --- 当input输入框被创建后控制input输入框聚焦
const inputArr = ref([])

// 获取所有SPU品牌列表,不管是添加SPU属性还是编辑spu属性都需要获取
const getAllBrand = async () => {
  const res = await reqGetTrademarkAllList()
  // console.log(res)
  brandOptions.value = res.data.data
}
// 获取所有SPU销售属性选择框数据
const getAllSaleAttr = async () => {
  const res = await reqAllTradeMark()
  // console.log(res.data.data)
  saleOptions.value = res.data.data
}

// 获取当前SPU照片列表
const getSPUImgList = async (id) => {
  const res = await reqGetSkuImgList(id)
  spuImageList.value = res.data.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
}

// 照片墙数据方法
// 图片上传前检测
const beforeAvatarUpload = (rawFile) => {
  if (
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/gif' &&
    rawFile.type !== 'image/jpg' &&
    rawFile.type !== 'image/webp'
  ) {
    ElMessage.warning('上传文件需要为: png、jpg、gif、webp')
    return false
  } else if (rawFile.size / 1024 / 1024 > 3) {
    ElMessage.warning('图片大小不可超过 3MB!')
    return false
  }
  return true
}
// 弹出弹框 ---> 查看照片
const handlePictureCardPreview = (rawFile) => {
  // console.log(rawFile)
  dialogVisible.value = true
  dialogImageUrl.value = rawFile.url
}

// 获取当前ID的SPU销售属性
const getSPUSaleList = async (id) => {
  const res = await reqGetSkuSaleAttrList(id)
  // console.log(res.data.data)
  spuSaleAttrList.value = res.data.data
}

// 筛选未选择的销售属性作为展示
const unSelectSaleAttr = computed(() => {
  return saleOptions.value.filter((item1) => {
    return spuSaleAttrList.value.every((item) => {
      return item.saleAttrName !== item1.name
    })
  })
})
// 新增SPU销售属性
const addSaleAttr = () => {
  // 使用数组解构 ---> 获取销售属性的name & id
  const [saleAttrName, baseSaleAttrId] = saleAttrIdAndValueName.value.split(':')
  spuSaleAttrList.value.push({
    baseSaleAttrId: Number(baseSaleAttrId), // 这里的销售属性ID必须转化为NUmber形式 --- 奶奶滴，劳资排错找了大半天（感受到TS的好了😭😭😭）
    saleAttrName,
    spuSaleAttrValueList: [],
  })
  // 清空销售属性选择器显示数据
  saleAttrIdAndValueName.value = ''
}

// input框输入完毕 --- 进行tag标签展示
const handleInputConfirm = (row) => {
  // 空值不能输入、 重复值不能输入
  if (!row.saleAttrValue || row.saleAttrValue.trim() === '') {
    ElMessage.error('输入不能为空')
    return
  }
  const repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName === row.saleAttrValue.trim()
  })
  if (repeat) {
    ElMessage.error('不能输入重复值')
    row.saleAttrValue = ''
    return
  }
  const { saleAttrValue: saleAttrValueName, baseSaleAttrId } = row
  row.spuSaleAttrValueList.push({
    saleAttrValueName,
    baseSaleAttrId: Number(baseSaleAttrId),
  })
  // 清空暂时的属性值并变回添加按钮
  row.flag = false
  row.saleAttrValue = ''
}
// 点击添加tag按钮 --- 展示为input输入框并聚焦
const showInput = (row, index) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[index].focus()
  })
}

// 点击删除按钮
const handleDel = (index) => {
  // 控制销售属性数组删除对应销售属性元素
  spuSaleAttrList.value.splice(index, 1)
}

// 保存按钮 --- 进行数据请求，更新后台数据
const handelSave = async () => {
  // 将销售属性数据 & 照片墙数据 赋值给formSpu请求参数对象中
  formSpu.value.spuSaleAttrList = spuSaleAttrList.value
  formSpu.value.spuImageList = spuImageList.value.map((item) => {
    return {
      imgName: item.name,
      // 因为后端服务器传送图片的关系，本地上传的图片的正确地址在列表中的response.data路径中存放
      // 并且，想要拿到item.response.data的数据 --- 首先得确保有item.response对象
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  try {
    // 先进行预检验，如果没有填写完毕无法进行上传
    await formRef.value.validate()
    if (formSpu.value.id) {
      await reqUpdateSPUInfo(formSpu.value)
    } else {
      await reqSaveSPUInfo(formSpu.value)
    }

    ElMessage.success(formSpu.value.id ? '更新成功' : '添加成功')
    // 不经要进行数据请求，还要转换到scene为0的页面（spu展示页），对应的SPU展示页还要进行更新
    emit('changeScene', { flag: 0, updateORadd: formSpu.value.id ? 'update' : 'add' })
  } catch {
    ElMessage.error(formSpu.value.id ? '更新失败' : '添加失败')
    // console.log(error)
  }
}

// 对外暴露的方法
const SPUExponseFn = (obj) => {
  formSpu.value = obj
  // 获取所有SPU品牌选择框列表数据
  getAllBrand()
  // 获取所有SPU销售属性选择框列表数据
  getAllSaleAttr()
  // 判断获取的对象中有无ID，有ID就是编辑更新spu；没有ID就是添加新的spu
  if (obj.id) {
    // 获取对应ID的SPU照片墙
    getSPUImgList(obj.id)
    // 获取对应ID的SPU销售属性
    getSPUSaleList(obj.id)
  } else {
    // 进行重置工作
    spuImageList.value = []
    spuSaleAttrList.value = []
  }
  // 当进行销售属性选取但并未添加时存在BUG --- 新增SPU属性时会显示上一次未添加的销售属性，所以应该清除
  saleAttrIdAndValueName.value = ''
}

defineExpose({
  SPUExponseFn,
})
</script>

<template>
  <el-form ref="formRef" :model="formSpu" :rules="rules" class="spu-form" label-width="110px">
    <el-form-item label="SPU名称：" prop="spuName">
      <el-input v-model="formSpu.spuName" placeholder="请您输入SPU名称" />
    </el-form-item>
    <el-form-item label="SPU品牌：" prop="tmId">
      <el-select v-model="formSpu.tmId" placeholder="请您选择品牌" style="width: 240px">
        <el-option
          v-for="item in brandOptions"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述：">
      <el-input
        v-model="formSpu.description"
        :rows="4"
        type="textarea"
        placeholder="请您输入描述"
      />
    </el-form-item>
    <!-- 照片墙 -->
    <el-form-item label="SPU照片：" prop="spuImageList">
      <el-upload
        v-model:file-list="spuImageList"
        action="/api/admin/product/fileUpload"
        :headers="headers"
        list-type="picture-card"
        :before-upload="beforeAvatarUpload"
        :on-preview="handlePictureCardPreview"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <!-- 查看弹框 -->
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性：">
      <template #default>
        <!-- 销售属性选择器 -->
        <el-select
          v-model="saleAttrIdAndValueName"
          :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '无'"
          style="width: 240px"
        >
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.value"
            :label="item.name"
            :value="`${item.name}:${item.id}`"
          />
        </el-select>
        <!-- 添加销售属性 -->
        <el-button
          :disabled="saleAttrIdAndValueName ? false : true"
          style="margin-left: 10px"
          type="primary"
          size="default"
          icon="Plus"
          @click="addSaleAttr"
        >
          添加销售属性
        </el-button>
        <el-table :data="spuSaleAttrList" style="margin-top: 20px" border>
          <el-table-column type="index" label="序号" align="center" width="80" />
          <el-table-column prop="saleAttrName" label="属性" align="center" />
          <el-table-column label="属性值" align="center">
            <template #default="{ row, $index }">
              <el-tag
                v-for="(item, index) in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
                style="margin-right: 7px"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                v-show="row.flag"
                :ref="
                  (el) => {
                    inputArr[$index] = el
                  }
                "
                v-model="row.saleAttrValue"
                class="w-20"
                size="small"
                placeholder="请输入属性值"
                @blur="handleInputConfirm(row)"
              />
              <el-button
                v-show="row.flag !== true"
                class="button-new-tag"
                size="small"
                type="primary"
                icon="Plus"
                @click="showInput(row, $index)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template #default="{ $index }">
              <!-- 删除操作 -->
              <el-button @click="handleDel($index)" size="small" type="danger" icon="Delete" />
            </template>
          </el-table-column>
          <!-- 无数据 -->
        </el-table>
      </template>
    </el-form-item>
    <el-form-item>
      <!-- 保存 & 取消按钮 -->
      <el-button
        :disabled="spuSaleAttrList.length > 0 ? false : true"
        @click="handelSave"
        type="primary"
      >
        保存
      </el-button>
      <el-button @click="emit('changeScene', { flag: 0 })">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="less" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  background-color: rgb(250, 250, 250);
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
