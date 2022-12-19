<template>
  <Card title="选择时间">
    <Filter :updateCategory="updateCategory" />
  </Card>
  <Card title="成员上传信息">
    <div ref="chartRef" :style="{ height, width }"></div>
  </Card>
</template>
<script lang="ts">
  import { defineComponent, Ref, ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import Filter from './infoKindFilter.vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { infoStatisticApi } from '/@/api/demo/table';

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
      let data: any[] = [];
      const activeKey = ref('tab1');

      const updateCategory = (start, end, span) => {
        data = [];
        infoStatisticApi('creator', span, start + 'T00:00:00', end + 'T23:59:59').then((res) => {
          res.result.forEach((item) => {
            let tmp = { value: item.count, name: item.creator };
            data.push(tmp);
          });
          console.log(data);
          setOptions({
            tooltip: {
              trigger: 'item',
            },
            legend: {
              bottom: '1%',
              left: 'center',
            },
            series: [
              {
                color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
                name: '成员',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2,
                },
                label: {
                  show: false,
                  position: 'center',
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '12',
                    fontWeight: 'bold',
                  },
                },
                labelLine: {
                  show: false,
                },
                data: data,
                animationType: 'scale',
                animationEasing: 'exponentialInOut',
                animationDelay: function () {
                  return Math.random() * 100;
                },
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
          trigger: 'item',
        },
        legend: {
          bottom: '1%',
          left: 'center',
        },
        series: [
          {
            color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
            name: '成员',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: data,
            animationType: 'scale',
            animationEasing: 'exponentialInOut',
            animationDelay: function () {
              return Math.random() * 100;
            },
          },
        ],
      });
      return { activeKey, tabListTitle, onTabChange, chartRef, updateCategory };
    },
  });
</script>
