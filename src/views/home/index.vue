<script setup>
// 导入store工具函数
import { userStoreFn } from '@/utils/_store'
import getTimeService from '@/utils/time'
import defaultAvatar from '@/assets/images/default.png'
</script>

<template>
  <div>
    <el-card>
      <div class="box">
        <img :src="userStoreFn().userInfo.avatar || defaultAvatar" class="avatar" />
        <div class="bottom">
          <h3 class="title">{{ getTimeService() }}好{{ userStoreFn().userInfo.name }}</h3>
          <p class="subtitle">硅谷甄选运营平台</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .bottom {
    margin-left: 20px;
    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 20px;
    }
    .subtitle {
      font-style: italic;
      color: skyblue;
    }
  }
}
</style>
