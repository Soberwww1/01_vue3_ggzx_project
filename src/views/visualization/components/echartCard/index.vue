<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'line',
    validator: (value) => ['line', 'bar', 'pie', 'area'].includes(value),
  },
  data: {
    type: Array,
    required: true,
  },
  height: {
    type: String,
    default: '300px',
  },
})

const chartRef = ref(null)
const chartInstance = ref(null)

// 赛博朋克主题配置
// const cyberpunkTheme = {
//   color: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff4444'],
//   backgroundColor: 'transparent',
//   textStyle: {
//     color: '#00ffff',
//     fontFamily: 'Courier New, monospace'
//   },
//   title: {
//     textStyle: {
//       color: '#00ffff',
//       fontSize: 14,
//       fontWeight: 'bold'
//     }
//   },
//   legend: {
//     textStyle: {
//       color: '#888'
//     }
//   },
//   grid: {
//     borderColor: 'rgba(0, 255, 255, 0.3)',
//     backgroundColor: 'transparent'
//   },
//   xAxis: {
//     axisLine: {
//       lineStyle: {
//         color: 'rgba(0, 255, 255, 0.5)'
//       }
//     },
//     axisLabel: {
//       color: '#888'
//     },
//     splitLine: {
//       lineStyle: {
//         color: 'rgba(0, 255, 255, 0.1)'
//       }
//     }
//   },
//   yAxis: {
//     axisLine: {
//       lineStyle: {
//         color: 'rgba(0, 255, 255, 0.5)'
//       }
//     },
//     axisLabel: {
//       color: '#888'
//     },
//     splitLine: {
//       lineStyle: {
//         color: 'rgba(0, 255, 255, 0.1)'
//       }
//     }
//   }
// }

// 根据图表类型生成配置
const getChartOption = () => {
  const baseOption = {
    title: {
      text: props.title,
      left: 'center',
      top: 10,
      textStyle: {
        color: '#00ffff',
        fontSize: 18,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 255, 255, 0.8)',
        textShadowBlur: 15,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      borderColor: '#00ffff',
      borderWidth: 2,
      borderRadius: 8,
      textStyle: {
        color: '#00ffff',
        fontSize: 12,
        fontFamily: 'Courier New, monospace',
      },
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#00ffff',
        },
        lineStyle: {
          color: '#00ffff',
          width: 2,
          type: 'dashed',
        },
      },
      extraCssText: `
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        backdrop-filter: blur(10px);
      `,
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '8%',
      top: '15%',
      containLabel: true,
      borderColor: 'rgba(0, 255, 255, 0.2)',
      borderWidth: 1,
    },
    animation: true,
    animationDuration: 2000,
    animationEasing: 'cubicOut',
    animationDelay: (idx) => idx * 100,
  }

  switch (props.type) {
    case 'line':
      return {
        ...baseOption,
        xAxis: {
          type: 'category',
          data: props.data.map((item) => item.name),
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.8)',
              width: 2,
            },
          },
          axisLabel: {
            color: '#00ffff',
            fontSize: 11,
            fontFamily: 'Courier New, monospace',
          },
          axisTick: {
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.6)',
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.8)',
              width: 2,
            },
          },
          axisLabel: {
            color: '#00ffff',
            fontSize: 11,
            fontFamily: 'Courier New, monospace',
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.2)',
              type: 'dashed',
            },
          },
        },
        series: [
          {
            data: props.data.map((item) => item.value),
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: '#00ffff' },
                  { offset: 0.5, color: '#ff00ff' },
                  { offset: 1, color: '#ffff00' },
                ],
              },
              width: 4,
              shadowColor: 'rgba(0, 255, 255, 0.8)',
              shadowBlur: 15,
              shadowOffsetY: 5,
            },
            itemStyle: {
              color: '#00ffff',
              borderColor: '#ffffff',
              borderWidth: 2,
              shadowColor: 'rgba(0, 255, 255, 0.8)',
              shadowBlur: 10,
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(0, 255, 255, 0.4)' },
                  { offset: 0.5, color: 'rgba(255, 0, 255, 0.2)' },
                  { offset: 1, color: 'rgba(0, 255, 255, 0.05)' },
                ],
              },
            },
            emphasis: {
              itemStyle: {
                shadowColor: 'rgba(0, 255, 255, 1)',
                shadowBlur: 20,
                scale: 1.5,
              },
            },
          },
        ],
      }

    case 'bar':
      return {
        ...baseOption,
        xAxis: {
          type: 'category',
          data: props.data.map((item) => item.name),
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.8)',
              width: 2,
            },
          },
          axisLabel: {
            color: '#00ffff',
            fontSize: 11,
            fontFamily: 'Courier New, monospace',
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.8)',
              width: 2,
            },
          },
          axisLabel: {
            color: '#00ffff',
            fontSize: 11,
            fontFamily: 'Courier New, monospace',
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.2)',
              type: 'dashed',
            },
          },
        },
        series: [
          {
            data: props.data.map((item) => item.value),
            type: 'bar',
            barWidth: '60%',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#00ffff' },
                  { offset: 0.3, color: '#ff00ff' },
                  { offset: 0.7, color: '#ffff00' },
                  { offset: 1, color: '#00ff00' },
                ],
              },
              borderColor: '#ffffff',
              borderWidth: 2,
              shadowColor: 'rgba(0, 255, 255, 0.8)',
              shadowBlur: 15,
              shadowOffsetY: 5,
              borderRadius: [4, 4, 0, 0],
            },
            emphasis: {
              itemStyle: {
                shadowColor: 'rgba(0, 255, 255, 1)',
                shadowBlur: 25,
                shadowOffsetY: 8,
              },
            },
            animationDelay: (idx) => idx * 100,
          },
        ],
      }

    case 'pie':
      return {
        ...baseOption,
        series: [
          {
            type: 'pie',
            radius: ['30%', '70%'],
            center: ['50%', '55%'],
            data: props.data.map((item, index) => ({
              ...item,
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff4444'][index % 5],
                    },
                    {
                      offset: 1,
                      color: ['#0080ff', '#ff0080', '#ff8000', '#008000', '#ff0000'][index % 5],
                    },
                  ],
                },
                borderColor: '#ffffff',
                borderWidth: 3,
                shadowColor: 'rgba(0, 255, 255, 0.8)',
                shadowBlur: 15,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
              },
            })),
            label: {
              color: '#00ffff',
              fontSize: 13,
              fontFamily: 'Courier New, monospace',
              fontWeight: 'bold',
              formatter: '{b}\n{c}%',
              textShadowColor: 'rgba(0, 0, 0, 0.8)',
              textShadowBlur: 5,
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(0, 255, 255, 0.8)',
                width: 2,
              },
              length: 15,
              length2: 10,
            },
            emphasis: {
              itemStyle: {
                shadowColor: 'rgba(0, 255, 255, 1)',
                shadowBlur: 25,
                scale: true,
                scaleSize: 10,
              },
              label: {
                fontSize: 15,
                fontWeight: 'bold',
              },
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: (idx) => idx * 200,
          },
        ],
      }

    case 'area':
      return {
        ...baseOption,
        xAxis: {
          type: 'category',
          data: props.data.map((item) => item.name),
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.8)',
              width: 2,
            },
          },
          axisLabel: {
            color: '#00ffff',
            fontSize: 11,
            fontFamily: 'Courier New, monospace',
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.8)',
              width: 2,
            },
          },
          axisLabel: {
            color: '#00ffff',
            fontSize: 11,
            fontFamily: 'Courier New, monospace',
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.2)',
              type: 'dashed',
            },
          },
        },
        series: [
          {
            data: props.data.map((item) => item.value),
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: '#00ffff' },
                  { offset: 1, color: '#ff00ff' },
                ],
              },
              width: 3,
              shadowColor: 'rgba(0, 255, 255, 0.8)',
              shadowBlur: 10,
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(0, 255, 255, 0.6)' },
                  { offset: 0.5, color: 'rgba(255, 0, 255, 0.3)' },
                  { offset: 1, color: 'rgba(0, 255, 255, 0.1)' },
                ],
              },
            },
            emphasis: {
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: 'rgba(0, 255, 255, 0.8)' },
                    { offset: 1, color: 'rgba(0, 255, 255, 0.2)' },
                  ],
                },
              },
            },
          },
        ],
      }

    default:
      return baseOption
  }
}

// 初始化图表
const initChart = async () => {
  await nextTick()
  if (chartRef.value && !chartInstance.value) {
    chartInstance.value = echarts.init(chartRef.value)
    chartInstance.value.setOption(getChartOption())

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)
  }
}

// 处理窗口大小变化
const handleResize = () => {
  if (chartInstance.value) {
    chartInstance.value.resize()
  }
}

// 监听数据变化
watch(
  () => props.data,
  () => {
    if (chartInstance.value) {
      chartInstance.value.setOption(getChartOption())
    }
  },
  { deep: true },
)

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose()
    chartInstance.value = null
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="chart-card">
    <div class="chart-container" :style="{ height }">
      <div ref="chartRef" class="chart"></div>
    </div>

    <!-- 装饰性边框 -->
    <div class="chart-border">
      <div class="corner corner-tl"></div>
      <div class="corner corner-tr"></div>
      <div class="corner corner-bl"></div>
      <div class="corner corner-br"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.chart-card {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(26, 26, 46, 0.8) 50%,
    rgba(22, 33, 62, 0.9) 100%
  );
  border: 2px solid transparent;
  border-radius: 12px;
  backdrop-filter: blur(15px);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
    transform: translateY(-5px) scale(1.02);
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

  .chart-container {
    position: relative;
    width: 100%;
    z-index: 2;

    .chart {
      width: 100%;
      height: 100%;
    }
  }

  .chart-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;

    .corner {
      position: absolute;
      width: 15px;
      height: 15px;
      border: 2px solid #00ffff;

      &.corner-tl {
        top: 8px;
        left: 8px;
        border-right: none;
        border-bottom: none;
      }

      &.corner-tr {
        top: 8px;
        right: 8px;
        border-left: none;
        border-bottom: none;
      }

      &.corner-bl {
        bottom: 8px;
        left: 8px;
        border-right: none;
        border-top: none;
      }

      &.corner-br {
        bottom: 8px;
        right: 8px;
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

// 响应式设计
@media (max-width: 768px) {
  .chart-card {
    .chart-border .corner {
      width: 10px;
      height: 10px;

      &.corner-tl,
      &.corner-tr {
        top: 5px;
      }

      &.corner-bl,
      &.corner-br {
        bottom: 5px;
      }

      &.corner-tl,
      &.corner-bl {
        left: 5px;
      }

      &.corner-tr,
      &.corner-br {
        right: 5px;
      }
    }
  }
}
</style>
