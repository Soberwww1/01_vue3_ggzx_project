import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // Eslint 推荐规则
  { files: ['**/*.{js,mjs,cjs,vue}'], plugins: { js }, extends: ['js/recommended'] },
  // vue3 规则
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser, // 浏览器全局变量（window, document 等）
        process: 'readonly', // 声明 process 是全局变量（可读不可写）
      },
    },
  },
  pluginVue.configs['flat/essential'],
  // 全局规则
  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      globals: {
        ...globals.node, // Node.js 全局变量（require, process 等）
      },
    },
    rules: {
      'no-var': 'error', // 强制使用 let/const
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 限制空行
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境禁用 console
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境禁用 debugger
      'no-unexpected-multiline': 'error', // 防止意外的换行错误
      'no-useless-escape': 'off', // 允许不必要的转义

      // Vue 特定规则
      'vue/multi-word-component-names': 'off', // 允许单字组件名
      'vue/no-mutating-props': 'off', // 允许直接修改 props（需谨慎）
      'vue/attribute-hyphenation': 'off', // 不限制 props 必须是 kebab-case
    },
  },
])
