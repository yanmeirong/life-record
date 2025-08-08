<template>
  <svg class="icon" :style="iconStyle" aria-hidden="true">
    <use :xlink:href="`#${iconClass}`"></use>
  </svg>
</template>

<script setup>
const props = defineProps({
  iconClass: { type: String, required: true }, // 传图标symbol名称，如 icon-home
  size: { type: [Number, String], default: 24 },
  color: { type: String, default: '' }
});

// 确保size总是有效的数字
const iconSize = typeof props.size === 'number' ? props.size : parseInt(props.size) || 24;

const iconStyle = {
  width: `${iconSize}px`,
  height: `${iconSize}px`,
  color: props.color
};
</script>

<style scoped>
.icon {
  vertical-align: -0.15em;
  fill: currentColor; 
  overflow: hidden;
}
</style>