<script setup lang="ts">
import type { Weather } from '@/types';
import WeatherAutocomplete from './WeatherAutocomplete.vue';
import Icon from './Icon.vue';
import Loader from './Loader.vue';
import { OpenWeatherCodes } from '@/util/matching';
import { computed, onMounted, reactive, watch } from 'vue';
import { requestGeolocation } from '@/util';
import { watchDebounced } from '@vueuse/core';
import { WeatherService } from '@/services';
import { useStore } from '@/stores';
import { useI18n } from 'vue-i18n';

interface Props {
  showTrash: boolean;
  id: string;
  selected: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{ remove: [string]; select: [string]; full: [] }>();
const store = useStore();
const { locale } = useI18n();
const query = reactive({ lat: '', lon: '', q: '', lang: computed(() => locale.value) });
const citiesQuery = reactive({ q: '', limit: 5 });
const current = WeatherService.current(query, {
  immediate: false,
  afterFetch(ctx) {
    store.cards.set(props.id, {
      lat: ctx.data.coord.lat,
      lon: ctx.data.coord.lon,
    });
    emit('select', props.id);
    return ctx;
  },
});
const cities = WeatherService.cities(citiesQuery, { immediate: false });
const name = computed(() => current.data.value?.coord.lat + '-' + current.data.value?.coord.lon);

onMounted(() =>
  requestGeolocation().then((p) => {
    query.lat = p.coords.latitude.toString();
    query.lon = p.coords.longitude.toString();
  }),
);

watchDebounced(
  () => citiesQuery.q,
  () => {
    cities.canAbort.value && cities.abort();
    citiesQuery.q && cities.execute();
  },
  { debounce: 500, maxWait: 1000 },
);

watch(query, () => current.execute());

const image = computed(() => OpenWeatherCodes[`${current.data.value?.weather?.at(0)?.id}`]);
const date = computed(() =>
  current.data.value?.dt
    ? new Date((current.data.value.dt || 0) * 1000).toLocaleDateString(locale.value, {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '---',
);

function onSelect(data: Weather.Cities.Response) {
  query.lat = data.lat.toString();
  query.lon = data.lon.toString();
}

function addFavorite() {
  if (current.data.value) {
    if (store.favorites.has(name.value)) {
      store.favorites.delete(name.value);
    } else if (store.favorites.size < 5) {
      store.favorites.set(name.value, {
        lat: current.data.value.coord.lat,
        lon: current.data.value.coord.lon,
      });
    } else {
      emit('full');
    }
  }
}
</script>

<template>
  <div :class="[$style.main, { [$style.selected]: selected }]" @click="emit('select', id)">
    <div v-if="current.isFetching.value" :class="$style.load">
      <Loader />
    </div>
    <div class="flex gap-2 items-center">
      <WeatherAutocomplete
        v-model="citiesQuery.q"
        :items="cities.data.value || []"
        :loading="cities.isFetching.value"
        @select="onSelect"
      />
      <button v-if="showTrash" :class="$style.button" @click="emit('remove', id)">
        <Icon icon="trash.png" :width="20" :height="20" />
      </button>
      <button :class="$style.button" @click="addFavorite">
        <Icon v-if="store.favorites.has(name)" icon="like-1.png" :width="20" :height="20" />
        <Icon v-else icon="like-2.png" :width="20" :height="20" />
      </button>
    </div>
    <Icon class="mt-md" :icon="`weather/${image}.png`" :width="70" :height="70" />
    <h1 style="margin-top: 40px">
      {{ current.data.value?.main?.temp ? Math.round(current.data.value.main.temp) : '---' }} °C
    </h1>
    <div class="flex items-center">
      <Icon icon="weather.svg" :width="20" :height="20" />
      <div class="first-upper" style="margin-left: 10px">
        {{ current.data.value?.weather?.at(0)?.description || '---' }}
      </div>
    </div>
    <hr :class="$style.divider" />
    <div class="flex items-center">
      <Icon
        icon="location.svg"
        width="15"
        height="15"
        style="transform: scale(1.3); transform-origin: center"
      />
      <div style="margin-left: 10px">
        {{
          current.data.value?.name
            ? current.data.value?.name + ', ' + current.data.value?.sys?.country
            : '---'
        }}
      </div>
    </div>
    <div class="flex items-center mt-sm">
      <Icon icon="calendar.svg" width="15" height="15" />
      <div style="margin-left: 10px">{{ date }}</div>
    </div>
  </div>
</template>

<style lang="scss" module>
.main {
  grid-area: a;
  padding: 20px 20px;
  border-radius: 15px;
  background-image: url('@/assets/icons/gradient-1.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 300px;
  position: relative;
  cursor: pointer;
}

.load {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected {
  border: 1px solid blue;
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
  padding: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.682);
    cursor: pointer;
  }
}
</style>
