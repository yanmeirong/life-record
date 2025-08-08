<!-- 

<template>
  <text 
    :class="['iconfont', iconClass, customClass]" 
    :style="iconStyle"
    @click="$emit('click', $event)"
  ></text>
</template>

<script setup>
import { defineProps, computed } from 'vue'

// 定义组件属性
const props = defineProps({
  // 图标类名（对应iconfont.css中的类名，如icon-share）
  iconClass: {
    type: String,
    required: true,
    description: '图标类名（从iconfont项目中获取）'
  },
  // 图标大小（默认24px）
  size: {
    type: [Number, String],
    default: 24,
    description: '图标尺寸（px）'
  },
  // 图标颜色
  color: {
    type: String,
    default: '',
    description: '图标颜色'
  },
  // 自定义类名
  customClass: {
    type: String,
    default: '',
    description: '自定义CSS类名'
  }
})

// 计算图标样式
const iconStyle = computed(() => {
  const style = {}
  if (typeof props.size === 'number') {
    style.fontSize = `${props.size}px`
  } else {
    style.fontSize = props.size
  }
  if (props.color) {
    style.color = props.color
  }
  return style
})
</script>

<style scoped>
/* 引入字体图标样式 */
@import url('/static/icons/iconfont.css');

/* 基础样式 */
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
}
</style>

 -->
