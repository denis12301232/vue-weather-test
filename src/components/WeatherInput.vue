<script setup lang="ts">
interface Props {
  modelValue: string;
}

defineProps<Props>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div :class="[$style.container, 'flex', 'items-center']">
    <input :class="$style.input" :value="modelValue" type="text" @input="onInput" />
    <div :class="$style.search">
      <img src="@/assets/icons/search.svg" alt="" style="height: 30px; width: 30px" />
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  background-color: black;
  border-radius: 10px;
  height: 50px;

  & .input {
    background-color: transparent;
    width: 100%;
    color: var(--color-white);
    border: none;
    appearance: none;
    outline: none;
    margin-left: 10px;
  }

  & .search {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
