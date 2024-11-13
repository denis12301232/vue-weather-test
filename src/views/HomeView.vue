<script setup lang="ts">
import WeatherInfo from '@/components/WeatherInfo.vue';
import WeatherChart from '@/components/WeatherChart.vue';
import WeatherAdd from '@/components/WeatherAdd.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '@/stores';

const store = useStore();
const { locale, t } = useI18n();
const dialog = ref(false);
const full = ref(false);
const selectedId = ref('');
const selected = ref();
const remove = reactive({ id: '', name: '' });

function onAdd() {
  if (store.cards.size < 5) {
    store.cards.set(`card_${store.cards.size + 1}`, { lat: 0, lon: 0 });
  }
}

function onRemove(name: string) {
  if (store.cards.size > 1) {
    dialog.value = true;
    remove.name = name;
  }
}

function del() {
  if (store.cards.size > 1) {
    store.cards.delete(remove.name);
  }
  dialog.value = false;
  const [id, coords] = Array.from(store.cards).at(-1)!;
  selectedId.value = id;
  selected.value = coords;
}

function onSelect(id: string) {
  selectedId.value = id;
  selected.value = store.cards.get(id);
}

function onFull() {
  full.value = true;
}
</script>

<template>
  <DefaultLayout>
    <div class="main">
      <div class="container">
        <WeatherInfo
          v-for="card of store.cards.keys()"
          :key="card"
          :id="card"
          :show-trash="store.cards.size > 1"
          :selected="selectedId === card"
          @remove="onRemove"
          @add="onAdd"
          @select="onSelect"
          @full="onFull"
        />
        <WeatherAdd v-if="store.cards.size < 5" @click="onAdd" />
      </div>
      <div class="flex justify-center">
        <WeatherChart
          v-if="selected"
          class="max-width text-body2"
          :lat="String(selected.lat)"
          :lon="String(selected.lon)"
          :lang="locale"
        />
      </div>
      <ModalWindow v-model="dialog">
        <h1 class="text-center">{{ t('modal.sure') }}</h1>
        <div class="flex justify-between mt-sm">
          <button @click="del">{{ t('modal.yes') }}</button>
          <button @click="dialog = !dialog">{{ t('modal.no') }}</button>
        </div>
      </ModalWindow>
      <ModalWindow v-model="full">
        <div class="text-center">{{ t('modal.much') }}</div>
        <div class="flex justify-center">
          <button @click="full = !full">{{ t('modal.understand') }}</button>
        </div>
      </ModalWindow>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
.main {
  max-width: 1200px;
  margin: 0 auto;
}
.container {
  padding: 10px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: var(--color-white);
  gap: 20px;
}

.head {
  display: flex;
  padding: 10px;
  justify-content: space-between;
}

.nav {
  display: flex;
  gap: 5px;

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
