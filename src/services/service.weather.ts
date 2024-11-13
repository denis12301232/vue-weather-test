import { useFetch, type UseFetchOptions } from '@vueuse/core';
import { computed, type MaybeRefOrGetter, isProxy, isRef } from 'vue';
import type { Weather } from '@/types';

export default abstract class WeatherService {
  static current(q: Partial<Weather.Current.Request>, options: UseFetchOptions = {}) {
    const query = computed(
      () =>
        `${import.meta.env.VITE_OPEN_WEATHER_API_URL}/weather?${new URLSearchParams(q).toString()}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`,
    );

    return useFetch(query, options).json<Weather.Current.Response>();
  }

  static forecast(q: Partial<Weather.Current.Request>, options: UseFetchOptions = {}) {
    const query = computed(
      () =>
        `${import.meta.env.VITE_OPEN_WEATHER_API_URL}/forecast?${new URLSearchParams(q).toString()}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`,
    );

    return useFetch(query, options).json<Weather.Forecast.Response>();
  }

  static cities(q: Weather.Cities.Request, options: UseFetchOptions = {}) {
    const query = computed(
      () =>
        `https://api.openweathermap.org/geo/1.0/direct?${new URLSearchParams(q).toString()}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`,
    );

    return useFetch(query, options).json<Weather.Cities.Response[]>();
  }
}
