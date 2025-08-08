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

const iconStyle = {
  width: props.size + 'px',
  height: props.size + 'px',
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


