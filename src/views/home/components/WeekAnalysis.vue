<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { basicProps } from './props';
  import moment from 'moment';
  import { infoStatisticApi } from '/@/api/demo/table';
  import {last} from "lodash-es";

  defineProps({
    ...basicProps,
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  function getStartOfWeek(index) {
    return moment(
      moment()
        .week(moment().week() - index)
        .startOf('week')
        .valueOf(),
    ).format('YYYY-MM-DD');
  }

  function datedifference(sDate1, sDate2) {
    let dateSpan, iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays;
  }

  const data = [0, 0, 0, 0, 0, 0, 0];
  const lastWeek = getStartOfWeek(1);
  const thisWeek = getStartOfWeek(0);

  infoStatisticApi('time', 'day', lastWeek + 'T00:00:00', thisWeek + 'T00:00:00').then((res) => {
    // console.log(res.result);
    res.result.forEach((item) => {
      let index;
      index = datedifference(lastWeek, item.time.slice(0, 10));
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
        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
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
