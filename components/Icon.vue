<template>
  <svg class="icon" :class="className" aria-hidden="true" :style="iconStyle">
    <use :xlink:href="`#${iconName}`"></use>
  </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue'

// 接收 props 参数
const props = defineProps({
  // 图标名称（对应 iconfont 中的 symbol id）
  iconName: {
    type: String,
    required: true,
    default: ''
  },
  // 自定义类名
  className: {
    type: String,
    default: ''
  },
  // 图标大小（支持数字型 rpx 或字符串型带单位）
  size: {
    type: [Number, String],
    default: 32
  },
  // 图标颜色
  color: {
    type: String,
    default: ''
  }
})

// 计算图标样式
const iconStyle = computed(() => {
  const style = {}
  // 处理大小（默认单位 rpx）
  if (typeof props.size === 'number') {
    style.fontSize = `${props.size}rpx`
  } else {
    style.fontSize = props.size
  }
  // 处理颜色
  if (props.color) {
    style.color = props.color
  }
  return style
})
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>