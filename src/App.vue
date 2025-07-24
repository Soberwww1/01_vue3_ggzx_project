<script setup>
// import { constantRoute } from '@/router/routes';
// console.log([...constantRoute]);
// import { useRouteStore } from './stores';
// import layoutMenu from './views/Layout/components/layoutMenu.vue';

// const routeStore = useRouteStore()
// const arr = ['1yi', '2er', '3san', '4si']
</script>

<template>
  <!-- 一个可以被复用的公共后台管理系统模板 --- 内核组件化、复用性 -->
  <router-view></router-view>
  <!-- <div class="test-container">
    <layoutMenu :menulist="routeStore.route"></layoutMenu>
    <el-menu>
      导航1
      <div>
        <el-menu-item index="1">
          <span>1</span>
        </el-menu-item>
      </div>
      导航2
      <div>
        <el-menu-item index="2">
          <span>2</span>
        </el-menu-item>
      </div>
      导航3
      <div>
        <el-menu-item index="3">
          <span>3</span>
        </el-menu-item>
      </div>
      <div v-for="item in arr" :key="item">
        <el-menu-item :index="item">
          <span>{{ item }}</span>
        </el-menu-item>
      </div>
    </el-menu>
   </div> -->
</template>

<style lang="less" scoped>
.test-container {
  width: 400px;
  height: 800px;
  margin: 100px auto;
  background-color: pink;
  padding: 10px 20px;
}
</style>
