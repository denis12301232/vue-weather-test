<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const model = defineModel();
const { t } = useI18n();
</script>

<template>
  <select v-model="model">
    <option value="day">{{ t('select.one') }}</option>
    <option value="5">{{ t('select.five') }}</option>
  </select>
</template>
