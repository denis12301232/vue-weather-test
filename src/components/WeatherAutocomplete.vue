<script setup lang="ts">
import Loader from './Loader.vue';
import { ref, watch } from 'vue';
import { OnClickOutside } from '@vueuse/components';

interface Props {
  items: any[];
  loading: boolean;
}

defineProps<Props>();
const emit = defineEmits<{ select: [any] }>();
const model = defineModel<string>();
const open = ref(false);

watch(model, () => {
  model.value?.length ? setHints(true) : setHints(false);
});

function setHints(v: boolean) {
  open.value = v;
}

function select(v: any) {
  model.value = v.name + ', ' + v.country;
  emit('select', v);
  setTimeout(() => setHints(false));
}
</script>

<template>
  <OnClickOutside @trigger="setHints(false)">
    <div class="container">
      <input v-model="model" type="text" autofocus />
      <ul v-if="open" class="hints">
        <li v-if="loading" class="flex justify-center">
          <Loader />
        </li>
        <li v-else-if="!items.length">Nothing found</li>
        <li v-else v-for="(item, i) of items" :key="i" @click="select(item)">
          {{ item.name }}, {{ item.country }}
        </li>
      </ul>
    </div>
  </OnClickOutside>
</template>

<style scoped lang="scss">
.container {
  position: relative;

  & input {
    width: 100%;
    background-color: transparent;
    width: 100%;
    color: var(--color-white);
    border: none;
    appearance: none;
    outline: none;
    background-color: black;
    border-radius: 10px;
    height: 50px;
    padding: 4px;
  }

  & .hints {
    background-color: black;
    position: absolute;
    border-radius: 10px;
    margin-top: 5px;
    padding: 5px;
    max-height: 200px;
    width: 100%;
  }

  & li {
    padding: 4px;
    &:hover {
      background-color: rgba(40, 43, 43, 0.803);
      cursor: pointer;
    }
  }
}
</style>
