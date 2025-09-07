<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const dataFlow = ref([])
const isActive = ref(true)

// 模拟实时数据流
const generateRandomData = () => {
  const types = ['用户登录', '订单创建', '支付完成', '商品浏览', '系统警告']
  const statuses = ['success', 'warning', 'error', 'info']

  return {
    id: Date.now() + Math.random(),
    type: types[Math.floor(Math.random() * types.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    time: new Date().toLocaleTimeString(),
    value: Math.floor(Math.random() * 1000) + 1,
  }
}

// 添加新数据
const addData = () => {
  if (!isActive.value) return

  const newData = generateRandomData()
  dataFlow.value.unshift(newData)

  // 保持最多20条数据
  if (dataFlow.value.length > 20) {
    dataFlow.value = dataFlow.value.slice(0, 20)
  }
}

// 状态颜色映射
const getStatusColor = (status) => {
  const colors = {
    success: '#00ff00',
    warning: '#ffff00',
    error: '#ff4444',
    info: '#00ffff',
  }
  return colors[status] || '#888'
}

// 状态图标映射
const getStatusIcon = (status) => {
  const icons = {
    success: '✓',
    warning: '⚠',
    error: '✗',
    info: 'ℹ',
  }
  return icons[status] || '•'
}

let intervalId = null

onMounted(() => {
  // 初始化一些数据
  for (let i = 0; i < 10; i++) {
    addData()
  }

  // 定时添加新数据
  intervalId = setInterval(addData, 2000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="realtime-flow">
    <div class="flow-header">
      <h3 class="flow-title">实时数据流</h3>
      <div class="flow-controls">
        <div class="status-indicator" :class="{ active: isActive }">
          <span class="status-dot"></span>
          <span>{{ isActive ? '运行中' : '已暂停' }}</span>
        </div>
      </div>
    </div>

    <div class="flow-content">
      <div class="flow-list">
        <div
          v-for="item in dataFlow"
          :key="item.id"
          class="flow-item"
          :style="{ '--status-color': getStatusColor(item.status) }"
        >
          <div class="item-header">
            <div class="item-status">
              <span class="status-icon">{{ getStatusIcon(item.status) }}</span>
              <span class="status-text">{{ item.type }}</span>
            </div>
            <div class="item-time">{{ item.time }}</div>
          </div>

          <div class="item-body">
            <div class="item-value">{{ item.value }}</div>
            <div class="item-progress">
              <div
                class="progress-bar"
                :style="{
                  width: `${(item.value / 1000) * 100}%`,
                  backgroundColor: getStatusColor(item.status),
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 装饰性元素 -->
    <div class="flow-decoration">
      <div class="scan-line"></div>
      <div class="grid-overlay"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.realtime-flow {
  position: relative;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  overflow: hidden;
  height: 400px;
  display: flex;
  flex-direction: column;

  .flow-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid rgba(0, 255, 255, 0.2);

    .flow-title {
      margin: 0;
      font-size: 1.1rem;
      color: #00ffff;
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
      font-weight: bold;
    }

    .flow-controls {
      .status-indicator {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.8rem;
        color: #888;

        &.active {
          color: #00ff00;

          .status-dot {
            background: #00ff00;
            animation: pulse 1.5s ease-in-out infinite;
          }
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: #888;
          border-radius: 50%;
        }
      }
    }
  }

  .flow-content {
    flex: 1;
    overflow: hidden;

    .flow-list {
      height: 100%;
      overflow-y: auto;
      padding: 10px 0;

      // 自定义滚动条
      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.3);
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(0, 255, 255, 0.5);
        border-radius: 2px;
      }

      .flow-item {
        margin: 8px 20px;
        padding: 12px;
        background: rgba(0, 255, 255, 0.05);
        border: 1px solid rgba(0, 255, 255, 0.1);
        border-radius: 6px;
        transition: all 0.3s ease;
        animation: slideIn 0.5s ease-out;

        &:hover {
          border-color: var(--status-color);
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;

          .item-status {
            display: flex;
            align-items: center;
            gap: 8px;

            .status-icon {
              color: var(--status-color);
              font-weight: bold;
              text-shadow: 0 0 5px var(--status-color);
            }

            .status-text {
              font-size: 0.9rem;
              color: #fff;
            }
          }

          .item-time {
            font-size: 0.7rem;
            color: #888;
            font-family: 'Courier New', monospace;
          }
        }

        .item-body {
          .item-value {
            font-size: 1.2rem;
            font-weight: bold;
            color: var(--status-color);
            text-shadow: 0 0 5px var(--status-color);
            margin-bottom: 5px;
          }

          .item-progress {
            height: 2px;
            background: rgba(0, 255, 255, 0.1);
            border-radius: 1px;
            overflow: hidden;

            .progress-bar {
              height: 100%;
              transition: width 0.5s ease;
              border-radius: 1px;
              box-shadow: 0 0 3px currentColor;
            }
          }
        }
      }
    }
  }

  .flow-decoration {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 0;

    .scan-line {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, #00ffff, transparent);
      animation: scan 3s linear infinite;
    }

    .grid-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image:
        linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 20px 20px;
      opacity: 0.3;
    }
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(400px);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .realtime-flow {
    height: 300px;

    .flow-header {
      padding: 10px 15px;

      .flow-title {
        font-size: 1rem;
      }
    }

    .flow-content .flow-list .flow-item {
      margin: 6px 15px;
      padding: 10px;

      .item-header .item-status .status-text {
        font-size: 0.8rem;
      }

      .item-body .item-value {
        font-size: 1rem;
      }
    }
  }
}
</style>
