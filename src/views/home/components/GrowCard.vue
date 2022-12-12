<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0 !mt-4"
        :class="[index + 1 < 4 && '!md:mr-4']"
        :canExpan="false"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between">
          <CountTo prefix="" :startVal="1" :endVal="item.value" class="text-2xl" />
          <Icon :icon="item.icon" :size="40" />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>总舆情数</span>
          <CountTo prefix="" :startVal="1" :endVal="item.total" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '/@/components/CountTo/index';
  import { Icon } from '/@/components/Icon';
  import { Card, Tag } from 'ant-design-vue';
  import { infoStatisticApi } from '/@/api/demo/table';
  import { reactive, ref } from 'vue';
  import moment from 'moment';

  interface GrowCardItem {
    icon: string;
    title: string;
    value: number;
    total: number;
    color: string;
    action: string;
  }

  const data = ref([]);
  const growCardList: GrowCardItem[] = reactive([
    {
      title: '舆情数（昨日上传）',
      icon: 'visit-count|svg',
      value: 5,
      total: 1000,
      color: 'green',
      action: '日',
    },
    {
      title: '舆情数（最近一周）',
      icon: 'total-sales|svg',
      value: 30,
      total: 1000,
      color: 'blue',
      action: '周',
    },
    {
      title: '舆情数（最近一月）',
      icon: 'download-count|svg',
      value: 100,
      total: 1000,
      color: 'orange',
      action: '月',
    },
    {
      title: '舆情数（最近一年）',
      icon: 'transaction|svg',
      value: 800,
      total: 1000,
      color: 'purple',
      action: '年',
    },
  ]);

  function getLastTime(N) {
    return moment(new Date().getTime() - N * 1000 * 24 * 60 * 60).format('YYYY-MM-DD');
  }

  const getLastStatisticInfo = (span, lastTime, index) => {
    infoStatisticApi('time', span, lastTime + 'T00:00:00', '').then((res) => {
      data.value = res.result;
      growCardList[index].value = data.value[0].count;
    });
  };

  const lastDay = getLastTime(1);
  const lastWeek = getLastTime(7);
  const lastMonth = getLastTime(30);
  const lastYear = getLastTime(365);

  getLastStatisticInfo('day', lastDay, 0);
  getLastStatisticInfo('week', lastWeek, 1);
  getLastStatisticInfo('month', lastMonth, 2);
  getLastStatisticInfo('year', lastYear, 3);

  const getTotalStatisticInfo = () => {
    infoStatisticApi('time', 'year', '', '').then((res) => {
      let total = 0;
      res.result.forEach((item) => {
        total += item.count;
      });
      growCardList.forEach((item) => {
        item.total = total;
      });
    });
  };
  getTotalStatisticInfo();

  defineProps({
    loading: {
      type: Boolean,
    },
  });
</script>
