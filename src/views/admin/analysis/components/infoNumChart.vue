<template>
  <Card title="选择时间">
    <Filter :updateCategory="updateCategory" />
  </Card>
  <Card title="信息数量">
    <div ref="chartRef" :style="{ height, width }"></div>
  </Card>
</template>
<script lang="ts">
  import { defineComponent, Ref, ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import Filter from './infoNumFilter.vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { infoStatisticApi } from '/@/api/demo/table';
  import { differenceInMonths } from 'date-fns';

  export default defineComponent({
    components: { Card, Filter },
    props: {
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: '280px',
      },
    },
    setup() {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      let category = [];
      let data: number[] = [];
      const activeKey = ref('tab1');

      function datedifference(sDate1, sDate2) {
        let dateSpan, iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays;
      }

      const updateCategory = (start, end, span, cg) => {
        category = cg;
        data = [];
        category.forEach(() => {
          data.push(0);
        });
        infoStatisticApi('time', span, start + 'T00:00:00', end + 'T23:59:59').then((res) => {
          if (span == 'day') {
            res.result.forEach((item) => {
              let index;
              index = datedifference(category[0], item.time.slice(0, 10));
              data[index] = item.count;
            });
          } else if (span == 'week') {
            res.result.forEach((item) => {
              let index;
              index = datedifference(item.time.slice(0, 10), start) / 7;
              //console.log(item.time.slice(0, 10) + ',' + start + ',' + index);
              data[index] = item.count;
            });
          } else if (span == 'month') {
            res.result.forEach((item) => {
              let index;
              index = differenceInMonths(new Date(item.time.slice(0, 10)), new Date(start));
              data[index] = item.count;
            });
          }
          console.log(data);
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
              data: category,
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
                barMaxWidth: 50,
              },
            ],
          });
        });
      };
      const tabListTitle = [
        {
          key: 'tab1',
          tab: '柱状图',
        },
        {
          key: 'tab2',
          tab: '表格',
        },
      ];
      function onTabChange(key) {
        activeKey.value = key;
      }
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
          data: category,
        },
        yAxis: {
          type: 'value',
          max: 100,
          splitNumber: 5,
        },
        series: [
          {
            data: [],
            type: 'bar',
            barMaxWidth: 50,
          },
        ],
      });
      return { activeKey, tabListTitle, onTabChange, chartRef, updateCategory };
    },
  });
</script>
