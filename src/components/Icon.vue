<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  icon: string;
  width?: string | number;
  height?: string | number;
}

const props = withDefaults(defineProps<Props>(), { width: 25, height: 25 });
const path = computed(() => new URL(`/src/assets/icons/${props.icon}`, import.meta.url).href);
const url = computed(() => `url(${path.value})`);
</script>

<template>
  <i class="icon" :style="{ width: width + 'px', height: height + 'px' }"></i>
</template>
<style lang="scss" scoped>
.icon {
  display: inline-block;
  background-image: v-bind(url);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
