<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" />
    <SiteAnalysis class="!my-4 enter-y" :loading="loading" />
    <div class="md:flex enter-y">
      <InfoClass class="md:w-1/3 w-full" :loading="loading" />
      <UnitsInvolved class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <DealSituation class="md:w-1/3 w-full" :loading="loading" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  import UnitsInvolved from './components/UnitsInvolved.vue';
  import InfoClass from './components/InfoClass.vue';
  import DealSituation from './components/DealSituation.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
