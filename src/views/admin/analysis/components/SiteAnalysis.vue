<template>
  <Card title="选择时间">
    <UseForm :updateCategory="updateCategory" />
  </Card>
  <Card title="表格">
    <div ref="chartRef" :style="{ height, width }"></div>
  </Card>
</template>
<script lang="ts">
  import { defineComponent, Ref, ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import UseForm from './UseForm.vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  export default defineComponent({
    components: { Card, UseForm },
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
      const category = ['1'];
      const activeKey = ref('tab1');
      const updateCategory = (data) => {
        category.values = data;
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
            data: [10, 20, 30, 40],
            type: 'bar',
            barMaxWidth: 50,
          },
        ],
      });
      return { activeKey, tabListTitle, onTabChange, chartRef, updateCategory };
    },
  });
</script>
