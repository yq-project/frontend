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
  import { infoStatisticApi } from '/@/api/demo/table';
  import moment from 'moment';

  const loading = ref(true);

  const rankList = [
    { name: '暂无', total: 0 },
    { name: '暂无', total: 0 },
    { name: '暂无', total: 0 },
    { name: '暂无', total: 0 },
    { name: '暂无', total: 0 },
    { name: '暂无', total: 0 },
    { name: '暂无', total: 0 },
    { name: '暂无', total: 0 },
    { name: '暂无', total: 0 },
    { name: '暂无', total: 0 },
  ];
  function getLastTime(N) {
    return moment(new Date().getTime() - N * 1000 * 24 * 60 * 60).format('YYYY-MM-DD');
  }
  let start = getLastTime(30);
  infoStatisticApi('creator', '', start + 'T00:00:00', '').then((res) => {
    let data = [];
    res.result.forEach((item) => {
      data.push({
        name: item.creator,
        total: item.count,
      });
    });
    data.sort((n1, n2) => {
      return n2.total - n1.total;
    });
    let max = data.length;
    if (max > 10) max = 10;
    for (let i = 0; i < max; ++i) {
      rankList[i] = data[i];
    }
    // console.log(data);
  });

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
