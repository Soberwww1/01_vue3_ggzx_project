import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
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
import Unocss from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  /* 
  使用loadEnv函数获取项目中环境变量（.env.development\.env.production\.env.test）
  通过mode变量vite判断当前是什么状态（development or production or test），
  而loadEnv函数需要三个变量 --- 当前状态（mode，vite会自动判断）、要获取的环境变量（.env文件）的地址（加载envDir目录下的.env
  文件，这里使用process.cwd()函数获取根目录地址，因为.env文件都在根目录）、prefixes前缀（默认是VITE_,基本上写环境变量前缀都是VITE_）

  注意： 这里获取环境变量为何不使用 import.meta.env --- 测试代码如下，返回结果为undefined
  */
  // console.log(import.meta.env)
  const env = loadEnv(mode, process.cwd())
  // console.log(env)
  // console.log(env.VITE_APP_BASE_API)
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
      Unocss(), // 仅打包用到的css
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
    // 全局配置跨域 --- 服务器地址与该前端项目运行地址不一致
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据请求服务器地址
          target: env.VITE_SERVE,
          // 是否代理跨域
          changeOrigin: true,
          /*
          路径覆写 --- 不同状态覆写不同前缀，开发覆写'/api'；测试覆写'test-api'。
          注意，这里不代表有生产模式，因为生产中dist已经是静态文件了，没有vite服务器动态监视什么前缀的axios请求，
          那么如果想让打包后文件成功进行数据请求，需要配置Nginx服务器代替vite服务器进行监视
          */
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
        },
      },
    },
    build: {
      // 提高告警阈值1000KB（1MB）
      chunkSizeWarningLimit: 3000,
    },
  }
})
