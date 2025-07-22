import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
// 配置elemrntplus 自动导入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 配置 vite-plugin-svg-icons 插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 配置mock插件 提供方法
import { viteMockServe } from 'vite-plugin-mock'

import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      vueDevTools(),
      viteMockServe({
        // mockPath: 'mock',
        // 保证开发阶段可以使用mock接口
        enable: command === 'serve',
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(fileURLToPath(new URL('./src/assets/icons', import.meta.url)))],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    // 全局配置使用 less 变量
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import (css) 'element-plus/dist/index.css';@import "@/styles/variables.less";`,
        },
      },
    },
    base: './',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
