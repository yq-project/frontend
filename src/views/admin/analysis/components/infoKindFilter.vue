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
