<template>
  <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tabChange="onTabChange"
  >
    <p v-if="activeKey === 'tab1'">
      <DayAnalysis />
    </p>
    <p v-if="activeKey === 'tab2'">
      <WeekAnalysis />
    </p>
    <p v-if="activeKey === 'tab3'">
      <YearAnalysis />
    </p>
  </Card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import DayAnalysis from './DayAnalysis.vue';
  import WeekAnalysis from './WeekAnalysis.vue';
  import YearAnalysis from './YearAnalysis.vue';

  const activeKey = ref('tab1');

  const tabListTitle = [
    {
      key: 'tab1',
      tab: '昨日上传',
    },
    {
      key: 'tab2',
      tab: '过去一周',
    },
    {
      key: 'tab3',
      tab: '过去一年',
    },
  ];

  function onTabChange(key) {
    activeKey.value = key;
  }
</script>
