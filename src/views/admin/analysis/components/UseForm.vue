<template>
  <BasicForm @register="register" @submit="handleSubmit" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';

  const schemas: FormSchema[] = [
    {
      field: '[startTime, endTime]',
      component: 'RangePicker',
      label: '时间范围',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'fieldTimeGranularity',
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
            key: '1',
          },
          {
            label: '周',
            value: '2',
            key: '2',
          },
          {
            label: '年',
            value: '3',
            key: '3',
          },
        ],
      },
    },
  ];

  export default defineComponent({
    components: { BasicForm },
    setup() {
      const { createMessage } = useMessage();

      const [register] = useForm({
        labelWidth: 120,
        schemas,
        actionColOptions: {
          span: 24,
        },
        fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM']],
      });

      return {
        register,
        schemas,
        handleSubmit: (values: Recordable) => {
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
      };
    },
  });
</script>
