<template>
  <BasicForm @register="register" @submit="handleSubmit" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
  //import moment from 'moment';

  const schemas: FormSchema[] = [
    {
      field: 's2e',
      component: 'RangePicker',
      label: '时间范围',
      colProps: {
        span: 8,
      },
      // componentProps: {
      //   defaultValue: [moment(new Date()), moment(new Date())],
      // },
    },
    {
      field: 'span',
      component: 'Select',
      label: '时间粒度',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '日',
            value: 'day',
          },
          {
            label: '周',
            value: 'week',
          },
          {
            label: '月',
            value: 'month',
          },
        ],
      },
      // defaultValue: {
      //   label: '日',
      //   value: 'day',
      // },
    },
  ];

  export default defineComponent({
    components: { BasicForm },
    props: {
      updateCategory: {
        type: Function,
      },
    },
    setup(props) {
      const [register] = useForm({
        labelWidth: 120,
        schemas,
        actionColOptions: {
          span: 24,
        },
        fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM']],
      });

      async function handleSubmit(values: Recordable) {
        const cg: any[] = [];
        let date1 = new Date(values.s2e[0].$d);
        let date2 = new Date(values.s2e[1].$d);
        if (values.span == 'day') {
          for (let i = date1.getTime(); i <= date2.getTime(); i = i + 86400000) {
            let t = new Date(i);
            var format = `${t.getFullYear()}.${t.getMonth() + 1}.${t.getDate()}`;
            cg.push(format);
          }
        } else if (values.span == 'week') {
          date1 = startOfWeek(date1, { weekStartsOn: 1 });
          date2 = endOfWeek(date2, { weekStartsOn: 1 });
          for (let i = date1.getTime(); i <= date2.getTime(); i = i + 86400000 * 7) {
            let s = new Date(i);
            let e = new Date(i + 86400000 * 6);
            var format = `${s.getFullYear()}.${
              s.getMonth() + 1
            }.${s.getDate()} - ${e.getFullYear()}.${e.getMonth() + 1}.${e.getDate()}`;
            cg.push(format);
          }
          //console.log(cg);
        } else if (values.span == 'month') {
          date1 = startOfMonth(date1);
          date2 = startOfMonth(date2);
          for (let i = date1.getTime(); i <= date2.getTime(); ) {
            let t = new Date(i);
            var format = `${t.getFullYear()}.${t.getMonth() + 1}`;
            cg.push(format);
            t = endOfMonth(t);
            console.log(t);
            i = t.getTime() + 1;
          }
          date2 = endOfMonth(date2);
        }
        var d1 = `${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate()}`;
        var d2 = `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}`;
        props.updateCategory(d1, d2, values.span, cg);
      }

      return {
        register,
        schemas,
        handleSubmit,
      };
    },
  });
</script>
