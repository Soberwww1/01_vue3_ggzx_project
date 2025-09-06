<script setup>
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

const router = useRouter()
const goHome = () => {
  router.push('/')
}

let animationId
let canvas
let ctx

const initMatrix = () => {
  canvas = document.getElementById('matrix')
  ctx = canvas.getContext('2d')

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
  const fontSize = 14
  const columns = canvas.width / fontSize

  const drops = Array(Math.floor(columns)).fill(1)

  const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#0F0'
    ctx.font = `${fontSize}px "Fira Code", monospace`

    for (let i = 0; i < drops.length; i++) {
      const text = characters[Math.floor(Math.random() * characters.length)]
      const x = i * fontSize
      const y = drops[i] * fontSize

      ctx.fillStyle = `hsl(120, 100%, ${Math.random() * 40 + 40}%)`
      ctx.fillText(text, x, y)

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
    animationId = requestAnimationFrame(draw)
  }

  draw()

  return () => {
    window.removeEventListener('resize', resizeCanvas)
    cancelAnimationFrame(animationId)
  }
}

onMounted(() => {
  const cleanup = initMatrix()
  onUnmounted(cleanup)
})
</script>

<template>
  <canvas id="matrix"></canvas>
  <div class="error-container">
    <div class="glitch-wrapper">
      <div class="error-content">
        <h1 class="glitch" data-text="404">404</h1>
        <h2 class="cyberpunk">SYSTEM_ERROR//</h2>
        <p class="cyberpunk-sub">[ ERROR_CODE: PAGE_NOT_FOUND ]</p>
        <el-button class="cyber-button" type="primary" @click="goHome">
          <span class="glitch-text" data-text="RETURN_HOME//">返回首页//</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.error-container {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  position: relative;
  overflow: hidden;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.8), rgba(0, 255, 255, 0.05));
    backdrop-filter: blur(2px);
    z-index: 1;
  }

  .glitch-wrapper {
    position: relative;
    z-index: 2;
    padding: 20px;
  }

  .error-content {
    text-align: center;
    padding: 3rem;
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid #0ff;
    box-shadow:
      0 0 30px #0ff,
      inset 0 0 20px rgba(0, 255, 255, 0.5);
    position: relative;
    overflow: hidden;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: #0ff;
      animation: scan 3s linear infinite;
      opacity: 0.5;
      box-shadow: 0 0 15px #0ff;
    }

    &::after {
      top: auto;
      bottom: 0;
      animation-direction: reverse;
    }
  }

  .glitch {
    font-size: 180px;
    font-weight: 900;
    font-family: 'Fira Code', monospace;
    color: #fff;
    text-shadow:
      2px 2px #0ff,
      -2px -2px #f0f;
    animation: glitch 1s infinite;
    margin: 0;
    line-height: 1;
    letter-spacing: -5px;
  }

  .cyberpunk {
    font-family: 'Fira Code', monospace;
    font-size: 42px;
    color: #0ff;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin: 20px 0;
    text-shadow: 0 0 15px #0ff;
  }

  .cyberpunk-sub {
    font-family: 'Fira Code', monospace;
    font-size: 24px;
    color: #f0f;
    margin-bottom: 40px;
    text-shadow: 0 0 10px #f0f;
    letter-spacing: 2px;
  }

  .cyber-button {
    background: transparent;
    border: 2px solid #0ff;
    padding: 15px 40px;
    font-size: 18px;
    font-family: 'Fira Code', monospace;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #0ff;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0, 255, 255, 0.2);
      color: #fff;
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.6);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }

    .glitch-text {
      position: relative;
      display: inline-block;

      &::before,
      &::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.8;
      }

      &::before {
        animation: glitch-effect 3s infinite;
        clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        transform: translate(-2px, -2px);
        color: #f0f;
      }

      &::after {
        animation: glitch-effect 2s infinite reverse;
        clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
        transform: translate(2px, 2px);
        color: #0ff;
      }
    }
  }
}

@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes glitch {
  0%,
  100% {
    text-shadow:
      -2px -2px #0ff,
      2px 2px #f0f;
  }
  25% {
    text-shadow:
      2px 2px #0ff,
      -2px -2px #f0f;
  }
  50% {
    text-shadow:
      -2px 2px #0ff,
      2px -2px #f0f;
  }
  75% {
    text-shadow:
      2px -2px #0ff,
      -2px 2px #f0f;
  }
}

@keyframes glitch-effect {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
}

// 移动端适配
@media (max-width: 768px) {
  .error-container {
    .glitch {
      font-size: 120px;
    }

    .cyberpunk {
      font-size: 32px;
    }

    .cyberpunk-sub {
      font-size: 18px;
    }

    .cyber-button {
      padding: 12px 30px;
      font-size: 16px;
    }
  }
}
</style>
