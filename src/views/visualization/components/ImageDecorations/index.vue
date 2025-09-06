<script setup>
import { ref } from 'vue'

// 使用项目中的图片资源
const decorations = ref([
  {
    id: 1,
    type: 'corner',
    image: '/src/views/visualization/images/dataScreen-main-lt.png',
    position: 'top-left',
    size: 'small',
  },
  {
    id: 2,
    type: 'corner',
    image: '/src/views/visualization/images/dataScreen-main-rt.png',
    position: 'top-right',
    size: 'small',
  },
  {
    id: 3,
    type: 'corner',
    image: '/src/views/visualization/images/dataScreen-main-lb.png',
    position: 'bottom-left',
    size: 'small',
  },
  {
    id: 4,
    type: 'corner',
    image: '/src/views/visualization/images/dataScreen-main-rb.png',
    position: 'bottom-right',
    size: 'small',
  },
])

const getImagePath = (imagePath) => {
  // 将相对路径转换为正确的导入路径
  return new URL(imagePath, import.meta.url).href
}
</script>

<template>
  <div class="image-decorations">
    <!-- 角落装饰 -->
    <div
      v-for="decoration in decorations"
      :key="decoration.id"
      class="corner-decoration"
      :class="[`position-${decoration.position}`, `size-${decoration.size}`]"
    >
      <img
        :src="getImagePath(decoration.image)"
        :alt="`装饰-${decoration.position}`"
        class="decoration-image"
      />
    </div>

    <!-- 中央装饰 -->
    <div class="center-decoration">
      <img
        src="/src/views/visualization/images/dataScreen-title.png"
        alt="标题装饰"
        class="title-decoration"
      />
    </div>

    <!-- 侧边装饰 -->
    <div class="side-decorations">
      <div class="left-decoration">
        <img
          src="/src/views/visualization/images/dataScreen-main-lc.png"
          alt="左侧装饰"
          class="side-image"
        />
      </div>
      <div class="right-decoration">
        <img
          src="/src/views/visualization/images/dataScreen-main-rc.png"
          alt="右侧装饰"
          class="side-image"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.image-decorations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;

  .corner-decoration {
    position: absolute;
    opacity: 0.6;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }

    &.position-top-left {
      top: 20px;
      left: 20px;
    }

    &.position-top-right {
      top: 20px;
      right: 20px;
    }

    &.position-bottom-left {
      bottom: 20px;
      left: 20px;
    }

    &.position-bottom-right {
      bottom: 20px;
      right: 20px;
    }

    &.size-small {
      width: 60px;
      height: 60px;
    }

    .decoration-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.3));
    }
  }

  .center-decoration {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.1;
    z-index: 1;

    .title-decoration {
      width: 200px;
      height: auto;
      filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.2));
    }
  }

  .side-decorations {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .left-decoration,
    .right-decoration {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.3;

      .side-image {
        width: 40px;
        height: auto;
        filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.2));
      }
    }

    .left-decoration {
      left: 10px;
    }

    .right-decoration {
      right: 10px;
    }
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .image-decorations {
    .corner-decoration {
      &.size-small {
        width: 40px;
        height: 40px;
      }
    }

    .center-decoration .title-decoration {
      width: 150px;
    }

    .side-decorations {
      .left-decoration,
      .right-decoration {
        .side-image {
          width: 30px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .image-decorations {
    .corner-decoration {
      &.size-small {
        width: 30px;
        height: 30px;
      }

      &.position-top-left,
      &.position-top-right {
        top: 10px;
      }

      &.position-bottom-left,
      &.position-bottom-right {
        bottom: 10px;
      }

      &.position-top-left,
      &.position-bottom-left {
        left: 10px;
      }

      &.position-top-right,
      &.position-bottom-right {
        right: 10px;
      }
    }

    .center-decoration .title-decoration {
      width: 100px;
    }

    .side-decorations {
      .left-decoration,
      .right-decoration {
        .side-image {
          width: 20px;
        }
      }

      .left-decoration {
        left: 5px;
      }

      .right-decoration {
        right: 5px;
      }
    }
  }
}
</style>
