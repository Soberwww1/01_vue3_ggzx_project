<script setup>
import { useRouter } from 'vue-router'
defineOptions({
  name: 'layoutMenu',
})
defineProps({
  menulist: {
    type: Array,
  },
})

// 创建路由实例
const router = useRouter()
// 实现导航路由跳转
const handleSkip = (path) => {
  console.log(path)
  router.push(path)
}
</script>

<template>
  <!--
    在这里放入el-menu组件 却将el-menu-item & el-sub-menu封装成组件是因为这里使用了“嵌套路由”
    我们在这里使用嵌套路由的思路是 --- 先传入一个menulist列表给layoutMenu组件并循环这个数组中元素，
    加入数组中元素还是一个数组，那么就会在el-sub-menu中继续家伙家伙导入layoutMenu，
    并且将每次v-for遍历的元素item的item.children作为新的遍历数组传给新的layoutMenu组件
    -->
  <div class="menu" v-for="item in menulist" :key="item.path">
    <!-- 单级 -->
    <el-menu-item
      @click="handleSkip(item.path)"
      :index="item.path"
      v-if="!item.children && item.meta.show"
    >
      <span v-if="!item.children && item.meta.show">
        <el-icon :size="20"><component :is="item.meta.icon" /></el-icon>
        {{ item.meta.title }}
      </span>
    </el-menu-item>
    <el-menu-item
      @click="handleSkip(item.path)"
      :index="item.path"
      v-if="item.children && item.children.length === 1 && item.children[0].meta.show"
    >
      <span v-if="item.children && item.children.length === 1 && item.children[0].meta.show">
        <el-icon :size="20"><component :is="item.children[0].meta.icon" /></el-icon>
        {{ item.children[0].meta.title }}
      </span>
    </el-menu-item>
    <!-- 多级 -->
    <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
      <template #title>
        <span>
          <el-icon :size="20"><component :is="item.meta.icon" /></el-icon>
          {{ item.meta.title }}
        </span>
      </template>
      <el-menu-item-group>
        <layoutMenu :menulist="item.children"></layoutMenu>
      </el-menu-item-group>
    </el-sub-menu>
  </div>
</template>

<style lang="less" scoped>
.menu {
  --el-menu-bg-color: transparent;
  border-radius: 30px;
  .el-sub-menu span {
    font-size: 20px;
    font-weight: bold;
    margin-left: 20px;
  }
  .el-sub-menu .el-menu-item {
    margin-bottom: 5px;
  }
  .el-menu-item {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    // margin-bottom: 10px;
    margin-top: 20px;
    border-radius: 30px;
  }
  .el-menu-item span {
    margin: 0 auto;
    font-size: 20px;
    font-weight: bold;
    // background-color: ;
  }
}
</style>
