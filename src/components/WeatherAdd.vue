<script setup lang="ts">
import Icon from './Icon.vue';

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <div :class="$style.main">
    <button :class="$style.button" @click="emit('click')">
      <Icon icon="plus.png" :width="50" :height="50" />
    </button>
  </div>
</template>

<style lang="scss" module>
.main {
  padding: 20px 20px;
  border-radius: 15px;
  background-image: url('@/assets/icons/gradient-1.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider {
  margin-top: 30px;
  margin-bottom: 30px;
}

.button {
  background-color: white;

  border-radius: 100%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.682);
    cursor: pointer;
  }
}
</style>
