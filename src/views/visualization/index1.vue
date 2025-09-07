<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import DataCard from './components/DataCard/index.vue'
import ChartCard from './components/echartCard/index.vue'
import AdvancedChart from './components/AdvancedChart/index.vue'
import RealTimeFlow from './components/RealTimeFlow/index.vue'
import BackgroundDecorations from './components/BackgroundDecorations/index.vue'
import ImageDecorations from './components/ImageDecorations/index.vue'

// 响应式数据
const screenWidth = ref(window.innerWidth)
const screenHeight = ref(window.innerHeight)

// 模拟数据
const totalData = ref({
  users: 125680,
  orders: 89456,
  revenue: 2567890,
  growth: 12.5,
})

const chartData = ref({
  sales: [
    { name: '1月', value: 120 },
    { name: '2月', value: 200 },
    { name: '3月', value: 150 },
    { name: '4月', value: 80 },
    { name: '5月', value: 70 },
    { name: '6月', value: 110 },
  ],
  users: [
    { name: '移动端', value: 45 },
    { name: 'PC端', value: 35 },
    { name: '平板', value: 20 },
  ],
  radar: [
    { name: '性能', value: 85 },
    { name: '安全', value: 92 },
    { name: '可用性', value: 78 },
    { name: '用户体验', value: 88 },
    { name: '功能完整性', value: 95 },
  ],
  gauge: [{ name: '系统负载', value: 75 }],
  funnel: [
    { name: '访问量', value: 100 },
    { name: '注册用户', value: 60 },
    { name: '活跃用户', value: 40 },
    { name: '付费用户', value: 20 },
    { name: 'VIP用户', value: 8 },
  ],
})

// 监听窗口大小变化
const handleResize = () => {
  screenWidth.value = window.innerWidth
  screenHeight.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  // 模拟数据更新
  setInterval(() => {
    totalData.value.users += Math.floor(Math.random() * 100)
    totalData.value.orders += Math.floor(Math.random() * 50)
    totalData.value.revenue += Math.floor(Math.random() * 10000)
  }, 5000)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="visual-container">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="grid-overlay"></div>
      <div class="scan-lines"></div>
    </div>

    <!-- 动态背景装饰 -->
    <BackgroundDecorations />

    <!-- 图片装饰 -->
    <ImageDecorations />

    <!-- 头部标题 -->
    <header class="header">
      <div class="header-content">
        <h1 class="main-title">
          <span class="title-text">硅谷甄选</span>
          <span class="title-subtitle">数据监控中心</span>
        </h1>
        <div class="header-info">
          <div class="time-display">{{ new Date().toLocaleString() }}</div>
          <div class="status-indicator">
            <span class="status-dot"></span>
            <span>系统正常</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="content">
      <!-- 数据统计卡片区域 -->
      <section class="stats-section">
        <DataCard
          title="总用户数"
          :value="totalData.users"
          unit="人"
          icon="👥"
          trend="up"
          :trend-value="8.2"
        />
        <DataCard
          title="订单总数"
          :value="totalData.orders"
          unit="单"
          icon="📦"
          trend="up"
          :trend-value="15.6"
        />
        <DataCard
          title="总收入"
          :value="totalData.revenue"
          unit="元"
          icon="💰"
          trend="up"
          :trend-value="22.3"
        />
        <DataCard
          title="增长率"
          :value="totalData.growth"
          unit="%"
          icon="📈"
          trend="up"
          :trend-value="3.1"
        />
      </section>

      <!-- 图表区域 -->
      <section class="charts-section">
        <div class="chart-row">
          <ChartCard title="销售趋势" type="line" :data="chartData.sales" class="chart-large" />
          <ChartCard title="用户分布" type="pie" :data="chartData.users" class="chart-small" />
        </div>
        <div class="chart-row">
          <AdvancedChart
            title="系统性能雷达"
            type="radar"
            :data="chartData.radar"
            class="chart-medium"
          />
          <AdvancedChart
            title="系统负载"
            type="gauge"
            :data="chartData.gauge"
            class="chart-small"
          />
        </div>
        <div class="chart-row">
          <AdvancedChart
            title="用户转化漏斗"
            type="funnel"
            :data="chartData.funnel"
            class="chart-medium"
          />
          <RealTimeFlow class="flow-widget" />
        </div>
      </section>
    </main>
  </div>
</template>

<style lang="less" scoped>
.visual-container {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: #00ffff;
  font-family: 'Courier New', monospace;
  overflow-x: auto;

  // 背景装饰
  .bg-decoration {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;

    .grid-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image:
        linear-gradient(rgba(0, 255, 255, 0.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 255, 0.15) 1px, transparent 1px),
        linear-gradient(rgba(255, 0, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 0, 255, 0.05) 1px, transparent 1px);
      background-size:
        50px 50px,
        50px 50px,
        200px 200px,
        200px 200px;
      animation:
        grid-move 20s linear infinite,
        grid-move-reverse 30s linear infinite;
    }

    .scan-lines {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background:
        linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%),
        linear-gradient(0deg, transparent 0%, rgba(255, 0, 255, 0.05) 50%, transparent 100%);
      background-size:
        100% 2px,
        2px 100%;
      animation:
        scan-horizontal 3s linear infinite,
        scan-vertical 4s linear infinite;
    }

    // 添加更多科技感元素
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background:
        radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(255, 255, 0, 0.05) 0%, transparent 50%);
      animation: pulse-glow 8s ease-in-out infinite;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: conic-gradient(
        from 0deg at 50% 50%,
        transparent 0deg,
        rgba(0, 255, 255, 0.1) 90deg,
        transparent 180deg,
        rgba(255, 0, 255, 0.1) 270deg,
        transparent 360deg
      );
      animation: rotate-glow 20s linear infinite;
      opacity: 0.3;
    }
  }

  // 头部样式
  .header {
    position: relative;
    z-index: 10;
    padding: 20px 40px;
    border-bottom: 2px solid #00ffff;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1400px;
      margin: 0 auto;
    }

    .main-title {
      margin: 0;

      .title-text {
        display: block;
        font-size: 2.5rem;
        font-weight: bold;
        text-shadow: 0 0 20px #00ffff;
        animation: glow 2s ease-in-out infinite alternate;
      }

      .title-subtitle {
        display: block;
        font-size: 1rem;
        color: #888;
        margin-top: 5px;
      }
    }

    .header-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;

      .time-display {
        font-size: 1.2rem;
        color: #00ffff;
        text-shadow: 0 0 10px #00ffff;
      }

      .status-indicator {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;

        .status-dot {
          width: 8px;
          height: 8px;
          background: #00ff00;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
        }
      }
    }
  }

  // 主要内容区域
  .content {
    position: relative;
    z-index: 10;
    padding: 30px 40px;
    max-width: 1400px;
    margin: 0 auto;

    // 数据统计区域
    .stats-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    // 图表区域
    .charts-section {
      .chart-row {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 20px;
        margin-bottom: 20px;

        &:last-child {
          grid-template-columns: 1fr 1fr;
        }
      }
    }
  }
}

// 动画效果
@keyframes glow {
  from {
    text-shadow: 0 0 20px #00ffff;
  }
  to {
    text-shadow:
      0 0 30px #00ffff,
      0 0 40px #00ffff;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

@keyframes grid-move-reverse {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50px, -50px);
  }
}

@keyframes scan-horizontal {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100vw);
  }
}

@keyframes scan-vertical {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100vh);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

@keyframes rotate-glow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .visual-container {
    .content {
      .charts-section .chart-row {
        grid-template-columns: 1fr;
      }
    }
  }
}

@media (max-width: 768px) {
  .visual-container {
    .header {
      padding: 15px 20px;

      .header-content {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }

      .main-title .title-text {
        font-size: 2rem;
      }
    }

    .content {
      padding: 20px;

      .stats-section {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
