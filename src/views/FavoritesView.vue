<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import WeatherInfoFavorites from '@/components/WeatherInfoFavorites.vue';
import WeatherChart from '@/components/WeatherChart.vue';
import { useStore } from '@/stores';
import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';

const store = useStore();
const { locale } = useI18n();
const selected = ref();
const selectedId = ref();

function onSelect(id: string) {
  selected.value = store.favorites.get(id);
  selectedId.value = id;
}

onMounted(() => {
  if (store.favorites.size) {
    const [id] = Array.from(store.favorites).at(0)!;
    selected.value = store.favorites.get(id);
    selectedId.value = id;
  }
});
</script>

<template>
  <DefaultLayout>
    <div class="container">
      <div v-if="store.favorites.size" class="cards">
        <WeatherInfoFavorites
          v-for="card of store.favorites.keys()"
          :key="card"
          :query="{
            lat: String(store.favorites.get(card)?.lat),
            lon: String(store.favorites.get(card)?.lon),
            lang: locale,
          }"
          :selected="selectedId === card"
          @select="onSelect"
        />
      </div>
      <div v-else class="nothing">Nothing there</div>
      <div class="flex justify-center">
        <WeatherChart
          v-if="selected"
          class="max-width text-body2"
          :lat="String(selected.lat)"
          :lon="String(selected.lon)"
          :lang="locale"
        />
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
.container {
  color: white;
  max-width: 1200px;
  margin: 0 auto;
}

.cards {
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

.nothing {
  text-align: center;
  padding: 20px;
}
</style>
