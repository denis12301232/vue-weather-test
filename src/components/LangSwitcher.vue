<script setup lang="ts">
const model = defineModel<string>();
</script>

<template>
  <select v-model="model" name="" id="">
    <option value="en">EN</option>
    <option value="uk">UK</option>
  </select>
</template>
