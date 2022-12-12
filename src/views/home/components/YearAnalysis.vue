<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { basicProps } from './props';
  import moment from 'moment';
  import {infoStatisticApi} from "/@/api/demo/table";

  defineProps({
    ...basicProps,
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  function getStartOfYear(index) {
    return moment(
      moment()
        .year(moment().year() - index)
        .startOf('year')
        .valueOf(),
    ).format('YYYY-MM-DD');
  }

  function getLastTime(N) {
    return moment(new Date().getTime() - N * 1000 * 24 * 60 * 60).format('YYYY-MM-DD');
  }

  const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // const lastYear = getStartOfYear(1);
  // const thisYear = getStartOfYear(0);
  const start = getLastTime(365);

  infoStatisticApi('time', 'month', start + 'T00:00:00', '').then((res) => {
    res.result.forEach((item) => {
      let index;
      if (item.time[5] == '0') {
        index = item.time[6];
      } else {
        index = item.time[5] + item.time[6];
      }
      index -= 1;
      data[index] = item.count;
    });
    setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            width: 1,
            color: '#019680',
          },
        },
      },
      grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
      xAxis: {
        type: 'category',
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
      },
      yAxis: {
        type: 'value',
        max: Math.ceil(Math.max.apply(null, data) * 1.2 + 1),
        splitNumber: (Math.ceil(Math.max.apply(null, data) * 1.2 + 1) % 4) + 1,
      },
      series: [
        {
          data: data,
          type: 'bar',
          barMaxWidth: 80,
        },
      ],
    });
  });
</script>
