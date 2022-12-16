<template>
  <BasicForm @register="register" @submit="handleSubmit" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  const schemas: FormSchema[] = [
    {
      field: 's2e',
      component: 'RangePicker',
      label: '时间范围',
      colProps: {
        span: 8,
      },
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
            value: '1',
          },
          {
            label: '周',
            value: '7',
          },
          {
            label: '月',
            value: '30',
          },
        ],
      },
    },
  ];

  export default defineComponent({
    components: { BasicForm },
    props: {
      updateCategory: {
        type: Function,
      },
    },
    setup() {
      const [register] = useForm({
        labelWidth: 120,
        schemas,
        actionColOptions: {
          span: 24,
        },
        fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM']],
      });

      // function handleSubmit() {
      return {
        register,
        schemas,
        handleSubmit: (values: Recordable) => {
          const data: any[] = [];
          let date1 = new Date(values.s2e[0].$d);
          let date2 = new Date(values.s2e[1].$d);
          for (let i = date1.getTime(); i <= date2.getTime(); i = i + 86400000 * values.span) {
            let t = new Date(i);
            var format = `${t.getFullYear()}.${t.getMonth() + 1}.${t.getDate()}`;
            data.push(format);
          }
          console.log(data);
          //props.updateCategory(data);
        },
      };
    },
  });
</script>
