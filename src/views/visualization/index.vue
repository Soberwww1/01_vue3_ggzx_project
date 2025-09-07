<script setup>
import { ref, onMounted } from 'vue'
import DataCard from './components/DataCard/index.vue'
import ChartCard from './components/echartCard/index.vue'
import AdvancedChart from './components/AdvancedChart/index.vue'
import RealTimeFlow from './components/RealTimeFlow/index.vue'
import BackgroundDecorations from './components/BackgroundDecorations/index.vue'
import ImageDecorations from './components/ImageDecorations/index.vue'

// 创建dom元素实例
const screen = ref(null)
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

// 创建缩放系数函数
const getScale = (w = 1920, h = 1080) => {
  // 求出视口与设计图的比例 --- 并找出最小的哪个为基准
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h

  return ww < wh ? ww : wh
}
// 当页面被注册渲染时 --- 将screenDOM元素缩放
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`

  // 模拟数据更新
  setInterval(() => {
    totalData.value.users += Math.floor(Math.random() * 100)
    totalData.value.orders += Math.floor(Math.random() * 50)
    totalData.value.revenue += Math.floor(Math.random() * 10000)
  }, 5000)
})

// 监听视口的变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}
</script>

<template>
  <div class="visual-container">
    <!-- 数据大屏展示区 -->
    <div class="visual-screen" ref="screen">
      <!-- 背景装饰 -->
      <div class="bg-decoration">
        <div class="grid-overlay"></div>
        <div class="scan-lines"></div>
      </div>

      <!-- 动态背景装饰 -->
      <BackgroundDecorations />

      <!-- 图片装饰 -->
      <ImageDecorations />

      <!-- 顶部 -->
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
      <!-- 主体 -->
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
              title="用户转化漏斗"
              type="funnel"
              :data="chartData.funnel"
              class="chart-medium"
            />
            <RealTimeFlow class="flow-widget" />
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
        </section>
      </main>
    </div>
  </div>
</template>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.visual-container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat center / cover;

  // 数据可视化大屏主体
  .visual-screen {
    width: 1920px;
    height: 1080px;

    font-family: 'Courier New', monospace;
    overflow-x: auto;

    // 增加内内容
    padding: 0 30px;

    // 先将数据可视区域拉到右下，此时可视区域左上角就是视口正中心，
    // 此时使用transform-origin设置该处为视口正中心
    position: fixed;
    left: 50%;
    top: 50%;
    // 更改可视化屏幕缩放中心点
    transform-origin: left top;

    // 使用弹性盒子
    display: flex;
    flex-direction: column;
    align-items: center;

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

    // 可视图标题
    .header {
      width: 100%;
      height: 15%;

      position: relative;
      z-index: 10;
      padding: 20px 40px;
      border-bottom: 2px solid #00ffff;
      backdrop-filter: blur(5px);

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1400px;
        margin: 0 auto;
      }

      .main-title {
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

    // 可视图内容
    .content {
      width: 100%;
      height: 85%;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      // 数据统计区
      .stats-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
      }

      // 图表区
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
}
</style>
