<template>
  <div class="p-4">
    <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import VisitSource from './components/VisitSource.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
