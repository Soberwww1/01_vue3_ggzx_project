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
    default: 'radar',
    validator: (value) => ['radar', 'gauge', 'funnel', 'sankey', 'heatmap'].includes(value),
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
      },
    },
    animation: true,
    animationDuration: 2000,
    animationEasing: 'cubicOut',
  }

  switch (props.type) {
    case 'radar':
      return {
        ...baseOption,
        radar: {
          indicator: props.data.map((item) => ({
            name: item.name,
            max: 100,
          })),
          radius: '70%',
          splitNumber: 5,
          axisName: {
            color: '#00ffff',
            fontSize: 12,
            fontFamily: 'Courier New, monospace',
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.3)',
            },
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(0, 255, 255, 0.1)', 'rgba(0, 255, 255, 0.05)'],
            },
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.5)',
            },
          },
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: props.data.map((item) => item.value),
                name: '数据指标',
                itemStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      { offset: 0, color: 'rgba(0, 255, 255, 0.8)' },
                      { offset: 1, color: 'rgba(255, 0, 255, 0.8)' },
                    ],
                  },
                },
                areaStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      { offset: 0, color: 'rgba(0, 255, 255, 0.4)' },
                      { offset: 1, color: 'rgba(255, 0, 255, 0.1)' },
                    ],
                  },
                },
                lineStyle: {
                  color: '#00ffff',
                  width: 3,
                  shadowColor: 'rgba(0, 255, 255, 0.8)',
                  shadowBlur: 10,
                },
              },
            ],
          },
        ],
      }

    case 'gauge':
      return {
        ...baseOption,
        series: [
          {
            type: 'gauge',
            radius: '80%',
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#00ffff' },
                  { offset: 0.5, color: '#ff00ff' },
                  { offset: 1, color: '#ffff00' },
                ],
              },
              shadowColor: 'rgba(0, 255, 255, 0.8)',
              shadowBlur: 15,
            },
            progress: {
              show: true,
              width: 20,
              itemStyle: {
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
                shadowColor: 'rgba(0, 255, 255, 0.8)',
                shadowBlur: 10,
              },
            },
            axisLine: {
              lineStyle: {
                width: 20,
                color: [
                  [0.3, 'rgba(0, 255, 255, 0.3)'],
                  [0.7, 'rgba(255, 0, 255, 0.3)'],
                  [1, 'rgba(255, 255, 0, 0.3)'],
                ],
              },
            },
            axisTick: {
              distance: -30,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#00ffff',
              },
            },
            splitLine: {
              distance: -35,
              length: 30,
              lineStyle: {
                width: 3,
                color: '#00ffff',
              },
            },
            axisLabel: {
              distance: -20,
              color: '#00ffff',
              fontSize: 12,
              fontFamily: 'Courier New, monospace',
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}%',
              color: '#00ffff',
              fontSize: 20,
              fontFamily: 'Courier New, monospace',
              fontWeight: 'bold',
              textShadowColor: 'rgba(0, 255, 255, 0.8)',
              textShadowBlur: 10,
            },
            data: [
              {
                value: props.data[0]?.value || 0,
                name: props.data[0]?.name || '指标',
              },
            ],
          },
        ],
      }

    case 'funnel':
      return {
        ...baseOption,
        series: [
          {
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside',
              color: '#ffffff',
              fontSize: 12,
              fontFamily: 'Courier New, monospace',
              fontWeight: 'bold',
              formatter: '{b}: {c}%',
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid',
              },
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
            },
            emphasis: {
              label: {
                fontSize: 14,
              },
            },
            data: props.data.map((item, index) => ({
              value: item.value,
              name: item.name,
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
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
                shadowColor: 'rgba(0, 255, 255, 0.5)',
                shadowBlur: 10,
              },
            })),
          },
        ],
      }

    case 'sankey':
      return {
        ...baseOption,
        series: [
          {
            type: 'sankey',
            layout: 'none',
            emphasis: {
              focus: 'adjacency',
            },
            data: props.data.map((item) => ({
              name: item.name,
            })),
            links: props.data.slice(0, -1).map((item, index) => ({
              source: item.name,
              target: props.data[index + 1]?.name || '结束',
              value: item.value,
            })),
            lineStyle: {
              color: 'gradient',
              curveness: 0.5,
            },
            itemStyle: {
              borderWidth: 1,
              borderColor: '#aaa',
            },
            label: {
              color: '#00ffff',
              fontSize: 12,
              fontFamily: 'Courier New, monospace',
            },
          },
        ],
      }

    case 'heatmap':
      return {
        ...baseOption,
        tooltip: {
          position: 'top',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          borderColor: '#00ffff',
          borderWidth: 2,
          textStyle: {
            color: '#00ffff',
            fontSize: 12,
            fontFamily: 'Courier New, monospace',
          },
        },
        grid: {
          height: '50%',
          top: '10%',
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          splitArea: {
            show: true,
          },
          axisLabel: {
            color: '#00ffff',
            fontSize: 11,
            fontFamily: 'Courier New, monospace',
          },
        },
        yAxis: {
          type: 'category',
          data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00'],
          splitArea: {
            show: true,
          },
          axisLabel: {
            color: '#00ffff',
            fontSize: 11,
            fontFamily: 'Courier New, monospace',
          },
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
          inRange: {
            color: ['#0a0a0a', '#00ffff', '#ff00ff', '#ffff00'],
          },
          textStyle: {
            color: '#00ffff',
            fontFamily: 'Courier New, monospace',
          },
        },
        series: [
          {
            name: '热力图',
            type: 'heatmap',
            data: props.data,
            label: {
              show: true,
              color: '#ffffff',
              fontSize: 10,
              fontFamily: 'Courier New, monospace',
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
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
  <div class="advanced-chart-card">
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
.advanced-chart-card {
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
  .advanced-chart-card {
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
