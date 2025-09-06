<script setup>
import { ref, onMounted } from 'vue'

// 模拟数据
const stats = ref([
  { title: '总用户数', value: '125,680', icon: '👥', trend: '+8.2%', color: 'primary' },
  { title: '订单总数', value: '89,456', icon: '📦', trend: '+15.6%', color: 'secondary' },
  { title: '总收入', value: '¥2,567,890', icon: '💰', trend: '+22.3%', color: 'accent' },
  { title: '增长率', value: '12.5%', icon: '📈', trend: '+3.1%', color: 'success' },
])

const quickActions = ref([
  { title: '用户管理', icon: '👤', path: '/permiss/user' },
  { title: '角色管理', icon: '🎭', path: '/permiss/role' },
  { title: '菜单管理', icon: '📋', path: '/permiss/menu' },
  { title: '数据大屏', icon: '📊', path: '/visual' },
])

onMounted(() => {
  // 可以在这里添加数据获取逻辑
})
</script>

<template>
  <div class="home-container">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <h1 class="welcome-title">
        <span class="title-main">欢迎回来</span>
        <span class="title-sub">硅谷甄选管理后台</span>
      </h1>
      <p class="welcome-desc">实时监控系统状态，高效管理业务数据</p>
    </div>

    <!-- 数据统计卡片 -->
    <div class="stats-section">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="stat-card"
        :class="`stat-${stat.color}`"
      >
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-title">{{ stat.title }}</div>
          <div class="stat-trend">{{ stat.trend }}</div>
        </div>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="actions-section">
      <h2 class="section-title">快捷操作</h2>
      <div class="actions-grid">
        <div
          v-for="(action, index) in quickActions"
          :key="index"
          class="action-card"
          @click="$router.push(action.path)"
        >
          <div class="action-icon">{{ action.icon }}</div>
          <div class="action-title">{{ action.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(26, 26, 46, 0.9) 100%);
  border: 2px solid @cyber-border;
  border-radius: 15px;
  backdrop-filter: blur(15px);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(
      45deg,
      @cyber-primary,
      @cyber-secondary,
      @cyber-accent,
      @cyber-primary
    );
    background-size: 300% 300%;
    border-radius: 15px;
    animation: border-flow 3s ease-in-out infinite;
    z-index: -1;
    opacity: 0.7;
  }

  .welcome-title {
    margin: 0 0 15px 0;

    .title-main {
      display: block;
      font-size: 3rem;
      font-weight: 900;
      font-family: 'Courier New', monospace;
      background: linear-gradient(45deg, @cyber-primary, @cyber-secondary, @cyber-accent);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 30px @cyber-shadow;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .title-sub {
      display: block;
      font-size: 1.2rem;
      color: @cyber-text-muted;
      font-weight: 600;
      margin-top: 10px;
      letter-spacing: 1px;
    }
  }

  .welcome-desc {
    font-size: 1rem;
    color: @cyber-text-muted;
    margin: 0;
    font-family: 'Courier New', monospace;
  }
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;

  .stat-card {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(26, 26, 46, 0.9) 100%);
    border: 2px solid @cyber-border;
    border-radius: 12px;
    padding: 25px;
    backdrop-filter: blur(15px);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        45deg,
        @cyber-primary,
        @cyber-secondary,
        @cyber-accent,
        @cyber-primary
      );
      background-size: 300% 300%;
      animation: border-flow 3s ease-in-out infinite;
      opacity: 0.1;
      z-index: -1;
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px @cyber-shadow;
      border-color: @cyber-border-active;
    }

    &.stat-primary {
      border-color: @cyber-primary;
      &:hover {
        box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
      }
    }

    &.stat-secondary {
      border-color: @cyber-secondary;
      &:hover {
        box-shadow: 0 10px 30px rgba(255, 0, 255, 0.3);
      }
    }

    &.stat-accent {
      border-color: @cyber-accent;
      &:hover {
        box-shadow: 0 10px 30px rgba(255, 255, 0, 0.3);
      }
    }

    &.stat-success {
      border-color: @cyber-success;
      &:hover {
        box-shadow: 0 10px 30px rgba(0, 255, 0, 0.3);
      }
    }

    .stat-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      filter: drop-shadow(0 0 10px @cyber-shadow);
    }

    .stat-content {
      .stat-value {
        font-size: 2rem;
        font-weight: 900;
        color: @cyber-text-primary;
        font-family: 'Courier New', monospace;
        margin-bottom: 8px;
        text-shadow: 0 0 10px @cyber-shadow;
      }

      .stat-title {
        font-size: 1rem;
        color: @cyber-text-muted;
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .stat-trend {
        font-size: 0.9rem;
        color: @cyber-success;
        font-weight: 600;
        font-family: 'Courier New', monospace;
      }
    }
  }
}

.actions-section {
  .section-title {
    font-size: 1.5rem;
    color: @cyber-text-primary;
    margin-bottom: 20px;
    font-weight: 600;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;

    .action-card {
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(26, 26, 46, 0.9) 100%);
      border: 2px solid @cyber-border;
      border-radius: 12px;
      padding: 30px 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(15px);

      &:hover {
        transform: translateY(-5px);
        border-color: @cyber-border-active;
        box-shadow: 0 10px 30px @cyber-shadow;
        background: linear-gradient(
          135deg,
          rgba(0, 255, 255, 0.1) 0%,
          rgba(255, 0, 255, 0.05) 100%
        );
      }

      .action-icon {
        font-size: 3rem;
        margin-bottom: 15px;
        filter: drop-shadow(0 0 10px @cyber-shadow);
      }

      .action-title {
        font-size: 1.1rem;
        color: @cyber-text-primary;
        font-weight: 600;
        font-family: 'Courier New', monospace;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
}

@keyframes border-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .home-container {
    padding: 15px;
  }

  .welcome-section {
    padding: 30px 15px;

    .welcome-title .title-main {
      font-size: 2rem;
    }
  }

  .stats-section {
    grid-template-columns: 1fr;
  }

  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
