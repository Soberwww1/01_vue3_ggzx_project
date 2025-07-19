// "export default { extends: ['@commitlint/config-conventional'] };"
export default {
  extends: ['@commitlint/config-conventional'],
  // 校验规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 添加新功能或功能性改变
        'fix', // 修复BUG
        'docs', // 仅文档变更
        'style', // 不影响代码运行的代码样式变更（如空白符、格式化、分号）
        'refactor', // 重构代码，既不增加新功能，也不修复bug
        'perf', // 提升性能的代码变更
        'test', // 增加或修改测试用例
        'chore', // 其他修改，比如改变构建流程、增加依赖库、工具等
        'revert', // 回滚到上一个版本
        'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
