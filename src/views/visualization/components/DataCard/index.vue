<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [Number, String],
    required: true,
  },
  unit: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '📊',
  },
  trend: {
    type: String,
    default: 'up', // up, down, stable
    validator: (value) => ['up', 'down', 'stable'].includes(value),
  },
  trendValue: {
    type: Number,
    default: 0,
  },
})

const animatedValue = ref(0)
const isAnimating = ref(false)

// 格式化数值显示
const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    if (props.value >= 1000000) {
      return (props.value / 1000000).toFixed(1) + 'M'
    } else if (props.value >= 1000) {
      return (props.value / 1000).toFixed(1) + 'K'
    }
    return props.value.toLocaleString()
  }
  return props.value
})

// 趋势图标
const trendIcon = computed(() => {
  switch (props.trend) {
    case 'up':
      return '↗'
    case 'down':
      return '↘'
    case 'stable':
      return '→'
    default:
      return '→'
  }
})

// 趋势颜色
const trendColor = computed(() => {
  switch (props.trend) {
    case 'up':
      return '#00ff00'
    case 'down':
      return '#ff4444'
    case 'stable':
      return '#ffff00'
    default:
      return '#00ffff'
  }
})

// 数值动画
const animateValue = () => {
  if (isAnimating.value) return
  isAnimating.value = true

  const targetValue = typeof props.value === 'number' ? props.value : 0
  const duration = 2000
  const startTime = Date.now()

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 使用缓动函数
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    animatedValue.value = Math.floor(targetValue * easeOutQuart)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      isAnimating.value = false
    }
  }

  animate()
}

// 监听数值变化
watch(
  () => props.value,
  () => {
    animateValue()
  },
  { immediate: true },
)
</script>

<template>
  <div class="data-card">
    <div class="card-border"></div>
    <div class="card-content">
      <div class="card-header">
        <div class="card-icon">{{ icon }}</div>
        <div class="card-title">{{ title }}</div>
      </div>

      <div class="card-body">
        <div class="value-display">
          <span class="value-number">{{ formattedValue }}</span>
          <span class="value-unit">{{ unit }}</span>
        </div>

        <div class="trend-info" :style="{ color: trendColor }">
          <span class="trend-icon">{{ trendIcon }}</span>
          <span class="trend-value">{{ trendValue }}%</span>
        </div>
      </div>

      <div class="card-footer">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{
              width: `${Math.min(trendValue * 5, 100)}%`,
              backgroundColor: trendColor,
            }"
          ></div>
        </div>
      </div>
    </div>

    <!-- 装饰性元素 -->
    <div class="card-decoration">
      <div class="corner corner-tl"></div>
      <div class="corner corner-tr"></div>
      <div class="corner corner-bl"></div>
      <div class="corner corner-br"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.data-card {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(26, 26, 46, 0.8) 50%,
    rgba(22, 33, 62, 0.9) 100%
  );
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 25px;
  backdrop-filter: blur(15px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  // 动态边框效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    padding: 2px;
    background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ff00, #00ffff);
    background-size: 300% 300%;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    animation: border-flow 3s ease-in-out infinite;
    opacity: 0.7;
  }

  // 内部光效
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      rgba(0, 255, 255, 0.1) 60deg,
      transparent 120deg,
      rgba(255, 0, 255, 0.1) 180deg,
      transparent 240deg,
      rgba(0, 255, 255, 0.1) 300deg,
      transparent 360deg
    );
    animation: rotate-light 8s linear infinite;
    opacity: 0.3;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(0, 255, 255, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);

    &::before {
      opacity: 1;
      animation-duration: 1s;
    }

    &::after {
      opacity: 0.6;
    }
  }

  .card-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid transparent;
    border-radius: 8px;
    background: linear-gradient(45deg, #00ffff, #ff00ff, #00ffff) border-box;
    mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    animation: border-glow 3s linear infinite;
  }

  .card-content {
    position: relative;
    z-index: 3;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0, 255, 255, 0.2);

    .card-icon {
      font-size: 2rem;
      filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8));
      animation: icon-pulse 2s ease-in-out infinite;
      background: linear-gradient(45deg, #00ffff, #ff00ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .card-title {
      font-size: 1rem;
      color: #00ffff;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #00ffff, #ff00ff);
        animation: title-underline 2s ease-in-out infinite;
      }
    }
  }

  .card-body {
    margin-bottom: 20px;

    .value-display {
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 15px;

      .value-number {
        font-size: 2.5rem;
        font-weight: 900;
        background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
        font-family: 'Courier New', monospace;
        animation: number-glow 3s ease-in-out infinite;
        position: relative;

        &::before {
          content: attr(data-value);
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(45deg, #00ffff, #ff00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: blur(1px);
          opacity: 0.5;
          z-index: -1;
        }
      }

      .value-unit {
        font-size: 1rem;
        color: #888;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }

    .trend-info {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      font-weight: bold;
      padding: 8px 12px;
      background: rgba(0, 255, 255, 0.1);
      border-radius: 20px;
      border: 1px solid rgba(0, 255, 255, 0.3);

      .trend-icon {
        font-size: 1.2rem;
        animation: trend-bounce 1s ease-in-out infinite;
      }
    }
  }

  .card-footer {
    .progress-bar {
      height: 4px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 2px;
      overflow: hidden;
      position: relative;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(0, 255, 255, 0.2) 50%,
          transparent 100%
        );
        animation: progress-shine 2s ease-in-out infinite;
      }

      .progress-fill {
        height: 100%;
        transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 2px;
        position: relative;
        overflow: hidden;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: progress-flow 1.5s ease-in-out infinite;
        }
      }
    }
  }

  .card-decoration {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;

    .corner {
      position: absolute;
      width: 10px;
      height: 10px;
      border: 1px solid #00ffff;

      &.corner-tl {
        top: 5px;
        left: 5px;
        border-right: none;
        border-bottom: none;
      }

      &.corner-tr {
        top: 5px;
        right: 5px;
        border-left: none;
        border-bottom: none;
      }

      &.corner-bl {
        bottom: 5px;
        left: 5px;
        border-right: none;
        border-top: none;
      }

      &.corner-br {
        bottom: 5px;
        right: 5px;
        border-left: none;
        border-top: none;
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

@keyframes rotate-light {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes icon-pulse {
  0%,
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8));
  }
  50% {
    transform: scale(1.1);
    filter: drop-shadow(0 0 20px rgba(0, 255, 255, 1));
  }
}

@keyframes title-underline {
  0% {
    width: 0;
  }
  50% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}

@keyframes number-glow {
  0%,
  100% {
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
  }
  50% {
    text-shadow:
      0 0 30px rgba(0, 255, 255, 1),
      0 0 40px rgba(255, 0, 255, 0.5);
  }
}

@keyframes trend-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@keyframes progress-shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes progress-flow {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .data-card {
    padding: 15px;

    .card-body .value-display .value-number {
      font-size: 1.5rem;
    }
  }
}
</style>
