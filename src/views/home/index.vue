<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" />
    <SiteAnalysis class="!my-4 enter-y" :loading="loading" />
    <div class="md:flex enter-y">
      <InfoClass class="md:w-1/3 w-full" :loading="loading" />
      <UnitsInvolved class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <RankList
        class="md:w-1/3 w-full"
        :loading="loading"
        title="排行榜（近一个月）"
        :list="rankList"
      />
      <!--      <DealSituation class="md:w-1/3 w-full" :loading="loading" />-->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  import UnitsInvolved from './components/UnitsInvolved.vue';
  import InfoClass from './components/InfoClass.vue';
  // import DealSituation from './components/DealSituation.vue';

  import RankList from './components/RankList.vue';

  const loading = ref(true);

  const rankList = [];
  for (let i = 0; i < 7; i++) {
    rankList.push({
      name: '白鹭岛 ' + (i + 1) + ' 号店',
      total: 1234.56 - i * 100,
    });
  }

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
