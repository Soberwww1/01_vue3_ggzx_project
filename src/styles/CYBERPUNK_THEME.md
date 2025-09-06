# 明亮赛博朋克主题设计规范

## 概述

本项目采用明亮赛博朋克风格设计，以未来科技感为核心，使用玻璃质感、霓虹色彩和发光效果营造科技氛围。整体风格明亮而不刺眼，既不过于花哨，也不过于阴沉，在保持专业性的同时展现强烈的科技感和未来感。

## 色彩系统

### 主色调
- **主色调 (Primary)**: `#ff00ff` - 深粉色/洋红色，用于主要元素和强调
- **辅助色 (Secondary)**: `#00ffff` - 青色，用于辅助元素
- **强调色 (Accent)**: `#ff0080` - 深粉色，用于特殊强调
- **成功色 (Success)**: `#00ff88` - 青绿色，用于成功状态
- **警告色 (Warning)**: `#ffaa00` - 橙色，用于警告状态
- **错误色 (Error)**: `#ff3366` - 红色，用于错误状态
- **紫色 (Purple)**: `#8b5cf6` - 紫色，用于装饰元素
- **蓝色 (Blue)**: `#3b82f6` - 蓝色，用于科技感元素
- **粉色 (Pink)**: `#ec4899` - 粉色，用于柔和强调

### 背景色彩
- **主背景 (Primary)**: `#1a0b2e` - 深紫色
- **次背景 (Secondary)**: `#16213e` - 深蓝紫
- **第三背景 (Tertiary)**: `#0f3460` - 深蓝
- **玻璃背景 (Glass)**: `rgba(255, 255, 255, 0.1)` - 玻璃质感背景
- **深色玻璃背景 (Glass Dark)**: `rgba(0, 0, 0, 0.2)` - 深色玻璃背景

### 文字色彩
- **主文字 (Primary)**: `#ffffff` - 白色文字
- **次文字 (Secondary)**: `#e2e8f0` - 浅灰白文字
- **弱化文字 (Muted)**: `#94a3b8` - 中灰文字
- **强调文字 (Accent)**: `#ff00ff` - 洋红色文字

### 边框和阴影
- **边框**: `rgba(255, 0, 255, 0.4)` - 半透明洋红色边框
- **激活边框**: `rgba(255, 0, 255, 0.8)` - 高亮洋红色边框
- **蓝色边框**: `rgba(59, 130, 246, 0.4)` - 蓝色边框
- **紫色边框**: `rgba(139, 92, 246, 0.4)` - 紫色边框
- **阴影**: `rgba(255, 0, 255, 0.3)` - 洋红色阴影
- **激活阴影**: `rgba(255, 0, 255, 0.6)` - 高亮洋红色阴影

## 设计原则

### 1. 视觉层次
- 使用渐变背景营造深度感
- 通过发光效果突出重要元素
- 利用边框和阴影创建层次

### 2. 交互反馈
- 悬停时显示发光效果
- 点击时提供视觉反馈
- 使用动画增强用户体验

### 3. 一致性
- 统一的圆角半径 (8px, 12px, 15px)
- 一致的边框宽度 (1px, 2px)
- 统一的字体族 (Courier New, monospace)

## 组件样式规范

### 卡片组件
```less
.card {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(26, 26, 46, 0.9) 100%);
  border: 2px solid @cyber-border;
  border-radius: 12px;
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: @cyber-border-active;
    box-shadow: 0 0 20px @cyber-shadow;
    transform: translateY(-2px);
  }
}
```

### 按钮组件
```less
.button {
  border: 2px solid @cyber-border;
  border-radius: 8px;
  background: linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.05));
  color: @cyber-text-primary;
  font-family: 'Courier New', monospace;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: @cyber-border-active;
    background: linear-gradient(45deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.1));
    box-shadow: 0 0 15px @cyber-shadow;
    transform: translateY(-2px);
  }
}
```

### 输入框组件
```less
.input {
  .el-input__wrapper {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid @cyber-border;
    border-radius: 8px;
    
    &:hover {
      border-color: @cyber-border-active;
      box-shadow: 0 0 10px @cyber-shadow;
    }
    
    &.is-focus {
      border-color: @cyber-border-active;
      box-shadow: 0 0 15px @cyber-shadow-active;
    }
  }
}
```

## 动画效果

### 边框流动动画
```less
@keyframes border-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### 脉冲发光动画
```less
@keyframes pulse-glow {
  0%, 100% { 
    opacity: 0.3;
    transform: scale(1);
  }
  50% { 
    opacity: 0.6;
    transform: scale(1.1);
  }
}
```

### 网格移动动画
```less
@keyframes grid-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}
```

## 响应式设计

### 断点设置
- **桌面端**: > 1200px
- **平板端**: 768px - 1200px
- **移动端**: < 768px

### 适配原则
- 保持核心设计元素不变
- 调整间距和字体大小
- 优化触摸交互体验

## 使用指南

### 1. 变量使用
```less
// 使用预定义变量
.my-component {
  color: @cyber-text-primary;
  background: @cyber-bg-primary;
  border: 1px solid @cyber-border;
}
```

### 2. 类名规范
```less
// 使用语义化类名
.cyber-card { }
.cyber-button { }
.cyber-input { }
```

### 3. 动画应用
```less
// 添加动画效果
.animated-element {
  animation: border-flow 3s ease-in-out infinite;
}
```

## 注意事项

1. **性能考虑**: 避免过度使用动画效果
2. **可访问性**: 确保足够的对比度
3. **兼容性**: 使用现代CSS特性时提供降级方案
4. **维护性**: 保持代码结构清晰，便于后续维护

## 扩展建议

1. **主题切换**: 可考虑添加其他主题选项
2. **个性化**: 允许用户自定义部分颜色
3. **国际化**: 考虑不同文化的色彩偏好
4. **无障碍**: 增加高对比度模式支持
