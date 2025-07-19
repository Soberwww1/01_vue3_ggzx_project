# 01_vue3_ggzx_project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

```
/* 基础打包 */
"build": "vite build",
/* 测试环境打包 */
"build:test": "vite build --mode test",
/* 生产环境打包 */
"build:pro": "vite build --mode production",
"preview": "vite preview",
// 这个使用eslint检查所有代码（不包括未指定的
"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
/* 对整个src文件夹进行代码语法检查（不修复） */
"lint-src": "eslint src",
/* 仅匹配src目录下的.vue & .js 文件 --- 并且启用缓存（大幅提升后续检查速度，仅重新检查有改动的文件） */
"lint-eslint": "eslint src/**/*.{js,vue} --cache --fix",
/* 对整个src文件夹进行代码语法检查（修复） */
"lint-fix": "eslint src --fix",
```

```
{
  "extends": [
    "stylelint-config-standard-less",       // 使用 Less 专属标准规则（已包含 recommended-less）
    "stylelint-config-standard-scss",       // 补充 SCSS 规则（部分通用）
    "stylelint-prettier/recommended",       // 合并 Prettier 规则（替代 stylelint-config-prettier）
    "stylelint-config-recess-order",        // 属性排序
    "stylelint-config-html/vue"             // Vue 文件支持
  ],
  "plugins": ["stylelint-prettier"],
  "customSyntax": "postcss-less",           // 默认解析 Less
  "overrides": [
    {
      "files": ["**/*.vue"],
      "customSyntax": "postcss-html"        // Vue 文件使用 HTML 解析器
    }
  ],
  "rules": {
    "prettier/prettier": true,              // 启用 Prettier
    "selector-class-pattern": null,         // 允许任意类名命名
    "value-keyword-case": null,             // 不强制关键字大小写
    "function-url-quotes": "always",        // URL 必须加引号
    "property-no-vendor-prefix": null,      // 允许厂商前缀
    "value-no-vendor-prefix": null,         // 允许值带厂商前缀
    "no-empty-source": null,                // 允许空样式文件
    "no-descending-specificity": null,      // 允许低优先级选择器覆盖高优先级
    "selector-pseudo-class-no-unknown": [   // 忽略 Vue 特殊伪类
      true,
      {
        "ignorePseudoClasses": ["global", "v-deep", "deep", "slotted"]
      }
    ],
    "at-rule-no-unknown": [                 // 允许 Less 的 @ 规则
      true,
      {
        "ignoreAtRules": ["extends", "mixin", "include", "if", "else", "for", "each"]
      }
    ],
    "scss/at-rule-no-unknown": null         // 关闭 SCSS 独有 @ 规则检查
  }
}
```