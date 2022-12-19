<template>
  <div class="p-4">
    <InfoNumChart class="!my-4 enter-y" :loading="loading" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import InfoNumChart from './components/infoNumChart.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
