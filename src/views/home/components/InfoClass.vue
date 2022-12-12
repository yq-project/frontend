<template>
  <Card title="舆情种类（近一个月）" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import moment from 'moment';
  import { infoStatisticApi } from '/@/api/demo/table';

  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }

      function getLastTime(N) {
        return moment(new Date().getTime() - N * 1000 * 24 * 60 * 60).format('YYYY-MM-DD');
      }
      let start = getLastTime(30);

      function findMax(value) {
        // console.log(value);
        let max = 0;
        let secMax = 0;
        let Index = 0;
        let secIndex = 0;
        let thMax = 0;
        let thIndex = 0;
        for (let i = 0; i < value.length; i++) {
          //遍历
          if (value[i] > max) {
            //找最大值
            thMax = secMax; //将原来的第三大变为第二大
            thIndex = secIndex;
            secMax = max; //如果条件成立，原来的最大值变为第二大
            secIndex = Index;
            max = value[i];
            Index = i; //当找到最大值时，就把下标赋值
          } else if (value[i] > secMax) {
            thMax = secMax; //将原来的第三大变为第二大
            thIndex = secIndex;
            secMax = value[i];
            secIndex = i;
          } else if (value[i] > thMax) {
            thMax = value[i];
            thIndex = i;
          }
        }
        return [Index, max, secIndex, secMax, thIndex, thMax];
      }

      const data = [
        { value: 0, name: '类别A' },
        { value: 0, name: '类别B' },
        { value: 0, name: '类别C' },
        { value: 0, name: '其他' },
      ];

      infoStatisticApi('infoType', '', start + 'T00:00:00', '').then((res) => {
        let value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let name = ['', '', '', '', '', '', '', '', '', ''];
        let index = 0;
        res.result.forEach((item) => {
          value[index] = item.count;
          name[index] = item.infoType;
          index++;
        });
        let result = findMax(value);
        data[0] = { value: result[1], name: name[result[0]] };
        data[1] = { value: result[3], name: name[result[2]] };
        data[2] = { value: result[5], name: name[result[4]] };
        let otherValue = 0;
        value.forEach((item) => {
          if (item != result[1] && item != result[3] && item != result[5]) otherValue += item;
        });
        data[3].value = otherValue;
        setOptions({
          tooltip: {
            trigger: 'item',
          },

          series: [
            {
              name: '舆情种类',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
              data: data.sort(function (a, b) {
                return a.value - b.value;
              }),
              roseType: 'radius',
              animationType: 'scale',
              animationEasing: 'exponentialInOut',
              animationDelay: function () {
                return Math.random() * 400;
              },
            },
          ],
        });
      });
    },
    { immediate: true },
  );
</script>
