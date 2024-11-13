import './assets/css/index.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';

const app = createApp(App);
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      layout: {
        title: 'Weather App',
        menu: {
          home: 'Home',
          favorites: 'Favorites',
        },
      },
      modal: {
        much: 'To add, remove the city ... because the maximum is 5',
        understand: 'Understand',
        sure: 'Delete?',
        yes: 'Yes',
        no: 'No',
      },
      select: {
        one: 'Day',
        five: '5 days',
      },
    },
    uk: {
      layout: {
        title: 'Додаток погоди',
        menu: {
          home: 'Головна',
          favorites: 'Вибрані',
        },
      },
      modal: {
        much: 'Для додавання видаліть місто ... тому що максимум 5',
        understand: 'Зрозумів',
        sure: 'Видалити?',
        yes: 'Так',
        no: 'Ні',
      },
      select: {
        one: 'День',
        five: '5 днів',
      },
    },
  },
});

app.use(createPinia()).use(i18n).use(router).mount('#app');
