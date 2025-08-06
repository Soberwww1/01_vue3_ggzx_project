import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  // 创建一级分类项ID
  const c1Id = ref('')
  // 创建一级分类项列表
  const c1list = ref([])

  // 创建二级分类项ID
  const c2Id = ref('')
  // 创建一级分类项列表
  const c2list = ref([])

  // 创建三级分类项ID
  const c3Id = ref('')
  // 创建一级分类项列表
  const c3list = ref([])

  // 更改分类项ID值
  const setCategoryId = (type, id) => {
    switch (type) {
      case 'c1Id':
        c1Id.value = id
        break
      case 'c2Id':
        c2Id.value = id
        break
      case 'c3Id':
        c3Id.value = id
        break
      default:
        console.warn('Invalid category type')
    }
  }

  // 更改分类项列表
  const setCategoryList = (type, list) => {
    switch (type) {
      case 'c1list':
        c1list.value = list
        break
      case 'c2list':
        c2list.value = list
        break
      case 'c3list':
        c3list.value = list
        break
      default:
        console.warn('Invalid category type')
    }
  }
  // 重置全部属性
  const reset = () => {
    c1Id.value = ''
    c2Id.value = ''
    c3Id.value = ''
    c1list.value = []
    c2list.value = []
    c3list.value = []
  }

  return {
    c1Id,
    c2Id,
    c3Id,
    setCategoryId,
    c1list,
    c2list,
    c3list,
    setCategoryList,
    reset,
  }
})
