import { ref, computed, watchEffect } from 'vue';
import { defineStore } from 'pinia';

export default defineStore('main', () => {
  const favorites = ref(
    new Map<string, { lat: number; lon: number }>(
      Object.entries(JSON.parse(localStorage.getItem('favorites') || '{}')),
    ),
  );
  const cards = ref(
    new Map<string, { lat: number; lon: number }>(Object.entries({ card_1: { lat: 0, lon: 0 } })),
  );

  watchEffect(() =>

    localStorage.setItem('favorites', JSON.stringify(Object.fromEntries(favorites.value))),
  );

  return { favorites, cards };
});
