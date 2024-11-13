<script setup lang="ts">
const open = defineModel<boolean>({ default: false });
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="modal" :open="open">
      <div class="content">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.47);
  min-width: 300px;
}

.content {
  border-radius: 20px;
  background-color: white;
  padding: 10px;
  min-width: 300px;
}
</style>
