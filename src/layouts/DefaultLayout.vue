<script setup lang="ts">
import LangSwitcher from '@/components/LangSwitcher.vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
</script>

<template>
  <header class="header">
    <div>
      <div class="title">{{ t('layout.title') }}</div>
      <nav class="nav">
        <RouterLink to="/">{{ t('layout.menu.home') }}</RouterLink>
        <RouterLink to="/favorites">{{ t('layout.menu.favorites') }}</RouterLink>
      </nav>
    </div>
    <div>
      <LangSwitcher v-model="locale" />
    </div>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>fff</footer>
</template>

<style scoped lang="scss">
.header {
  max-width: 1200px;
  margin: 0 auto;
  background-color: rgba(58, 87, 186, 0.195);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.head {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.title {
  color: white;
  font-size: larger;
}

.nav {
  display: flex;
  gap: 5px;
  margin-top: 10px;

  & a {
    color: white;
    text-decoration: none;
    &:hover {
      color: blue;
    }
    &:active {
      color: white;
    }
  }
}
</style>
