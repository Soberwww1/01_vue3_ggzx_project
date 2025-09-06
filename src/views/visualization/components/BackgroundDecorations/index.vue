<script setup>
import { ref, onMounted } from 'vue'

const decorations = ref([
  {
    id: 1,
    type: 'floating',
    content: '01',
    x: 10,
    y: 20,
    delay: 0,
  },
  {
    id: 2,
    type: 'floating',
    content: '10',
    x: 85,
    y: 15,
    delay: 1,
  },
  {
    id: 3,
    type: 'floating',
    content: '11',
    x: 15,
    y: 80,
    delay: 2,
  },
  {
    id: 4,
    type: 'floating',
    content: '00',
    x: 90,
    y: 75,
    delay: 3,
  },
  {
    id: 5,
    type: 'floating',
    content: 'FF',
    x: 5,
    y: 50,
    delay: 4,
  },
  {
    id: 6,
    type: 'floating',
    content: 'AA',
    x: 95,
    y: 30,
    delay: 5,
  },
  {
    id: 7,
    type: 'floating',
    content: '55',
    x: 25,
    y: 10,
    delay: 6,
  },
  {
    id: 8,
    type: 'floating',
    content: 'CC',
    x: 75,
    y: 90,
    delay: 7,
  },
])

onMounted(() => {
  // 可以在这里添加更多的动态效果
})
</script>

<template>
  <div class="background-decorations">
    <!-- 浮动数字 -->
    <div
      v-for="decoration in decorations"
      :key="decoration.id"
      class="floating-number"
      :style="{
        left: `${decoration.x}%`,
        top: `${decoration.y}%`,
        animationDelay: `${decoration.delay}s`,
      }"
    >
      {{ decoration.content }}
    </div>

    <!-- 连接线 -->
    <svg class="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #00ffff; stop-opacity: 0.8" />
          <stop offset="50%" style="stop-color: #ff00ff; stop-opacity: 0.4" />
          <stop offset="100%" style="stop-color: #00ffff; stop-opacity: 0.8" />
        </linearGradient>
      </defs>
      <path
        d="M10,20 Q50,50 90,15"
        stroke="url(#lineGradient)"
        stroke-width="0.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M15,80 Q50,50 90,75"
        stroke="url(#lineGradient)"
        stroke-width="0.5"
        fill="none"
        opacity="0.4"
      />
    </svg>

    <!-- 脉冲圆环 -->
    <div class="pulse-rings">
      <div class="pulse-ring ring-1"></div>
      <div class="pulse-ring ring-2"></div>
      <div class="pulse-ring ring-3"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.background-decorations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

  .floating-number {
    position: absolute;
    font-family: 'Courier New', monospace;
    font-size: 1rem;
    font-weight: bold;
    color: rgba(0, 255, 255, 0.4);
    animation:
      float 6s ease-in-out infinite,
      glow-pulse 3s ease-in-out infinite;
    text-shadow:
      0 0 5px rgba(0, 255, 255, 0.8),
      0 0 10px rgba(0, 255, 255, 0.6),
      0 0 15px rgba(0, 255, 255, 0.4);
    background: linear-gradient(45deg, #00ffff, #ff00ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.6));
  }

  .connection-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: lineGlow 4s ease-in-out infinite;
    filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.3));
  }

  .pulse-rings {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .pulse-ring {
      position: absolute;
      border: 2px solid transparent;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      &.ring-1 {
        width: 200px;
        height: 200px;
        border-image: linear-gradient(45deg, #00ffff, #ff00ff) 1;
        animation:
          pulse 3s ease-in-out infinite,
          rotate 20s linear infinite;
        box-shadow:
          0 0 20px rgba(0, 255, 255, 0.3),
          inset 0 0 20px rgba(0, 255, 255, 0.1);
      }

      &.ring-2 {
        width: 300px;
        height: 300px;
        border-image: linear-gradient(45deg, #ff00ff, #ffff00) 1;
        animation:
          pulse 3s ease-in-out infinite 1s,
          rotate 25s linear infinite reverse;
        box-shadow:
          0 0 30px rgba(255, 0, 255, 0.3),
          inset 0 0 30px rgba(255, 0, 255, 0.1);
      }

      &.ring-3 {
        width: 400px;
        height: 400px;
        border-image: linear-gradient(45deg, #ffff00, #00ff00) 1;
        animation:
          pulse 3s ease-in-out infinite 2s,
          rotate 30s linear infinite;
        box-shadow:
          0 0 40px rgba(255, 255, 0, 0.3),
          inset 0 0 40px rgba(255, 255, 0, 0.1);
      }
    }
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  25% {
    transform: translateY(-15px) rotate(90deg) scale(1.1);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(180deg) scale(1.2);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-10px) rotate(270deg) scale(1.1);
    opacity: 0.6;
  }
}

@keyframes glow-pulse {
  0%,
  100% {
    text-shadow:
      0 0 5px rgba(0, 255, 255, 0.8),
      0 0 10px rgba(0, 255, 255, 0.6),
      0 0 15px rgba(0, 255, 255, 0.4);
  }
  50% {
    text-shadow:
      0 0 10px rgba(0, 255, 255, 1),
      0 0 20px rgba(255, 0, 255, 0.8),
      0 0 30px rgba(0, 255, 255, 0.6);
  }
}

@keyframes lineGlow {
  0%,
  100% {
    opacity: 0.3;
    filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.3));
  }
  50% {
    opacity: 0.8;
    filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.6));
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0;
  }
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .background-decorations {
    .floating-number {
      font-size: 0.6rem;
    }

    .pulse-rings .pulse-ring {
      &.ring-1 {
        width: 150px;
        height: 150px;
      }

      &.ring-2 {
        width: 200px;
        height: 200px;
      }

      &.ring-3 {
        width: 250px;
        height: 250px;
      }
    }
  }
}
</style>
