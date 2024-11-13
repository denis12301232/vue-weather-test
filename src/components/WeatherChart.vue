<script setup lang="ts">
import WeatherSelect from './WeatherSelect.vue';
import Loader from './Loader.vue';
import { WeatherService } from '@/services';
import { computed, onMounted, ref, shallowRef, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Props {
  lat: string;
  lon: string;
  lang: string;
}

const props = defineProps<Props>();
const chart = shallowRef<Chart<any, any>>();
const selected = ref('day');
const { data, execute, isFetching } = WeatherService.forecast(props, { immediate: false });
const temp = computed(() =>
  selected.value === 'day'
    ? data.value?.list.map((item) => ({ temp: item.main.temp, date: item.dt_txt })).slice(0, 8)
    : averageTempOver5Days(),
);

watch(temp, () => {
  updateChart(
    temp.value?.map((item) => item.date) || [],
    temp.value?.map((item) => item.temp) || [],
  );
});

watch(props, () => execute());

onMounted(async () => {
  await execute();

  chart.value = new Chart('chart', {
    type: 'line',
    data: {
      labels: temp.value?.map((item) => item.date),
      datasets: [
        {
          label: 'Temperature',
          data: temp.value?.map((item) => item.temp),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (label, index, labels) {
              return label + '°';
            },
          },
        },
        x: {
          ticks: {
            callback: function (value, index, ticks) {
              const values = temp.value?.map((item) => item.date) || [];
              const tickDate = new Date(values[index]);
              return selected.value === 'day'
                ? tickDate.toLocaleTimeString(props.lang, { hour: '2-digit', minute: '2-digit' })
                : tickDate.toLocaleDateString(props.lang);
            },
          },
        },
      },
    },
  });
});

function updateChart(labels: any[], data: any[]) {
  if (chart.value) {
    chart.value.data.datasets[0].data = data;
    chart.value.data.labels = labels;
    chart.value.update();
  }
}

function averageTempOver5Days() {
  const arr =
    data.value?.list.map((item) => ({
      temp: item.main.temp,
      date: new Date(item.dt_txt).toLocaleDateString('en-EN'),
    })) || [];
  const map = new Map<string, number[]>();

  for (const item of arr) {
    map.has(item.date) ? map.get(item.date)?.push(item.temp) : map.set(item.date, [item.temp]);
  }
  return [...map.keys()].map((item) => ({
    temp: map.get(item)!.reduce((p, c) => p + c, 0) / map.get(item)!.length,
    date: item,
  }));
}
</script>

<template>
  <div class="container-chart">
    <WeatherSelect v-model="selected" />
    <div v-if="isFetching" class="flex justify-center items-center load">
      <Loader />
    </div>
    <div>
      <canvas v-show="!isFetching" class="chart" id="chart" />
    </div>
  </div>
</template>

<style scoped>
.chart {
  max-width: 1200px;
  max-height: 400px;
  width: 100%;
}

.container-chart {
  padding: 10px;
}

.load {
  height: 400px;
}
</style>
