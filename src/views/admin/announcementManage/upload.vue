<template>
  <PageWrapper class="high-form" title="发布公告">
    <a-card title="公告信息" :bordered="false">
      <BasicForm @register="registerTask" />
    </a-card>
    <a-card title="公告正文" :bordered="false" class="!mt-5">
      <BasicForm
        :labelWidth="100"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        :baseColProps="{ span: 24 }"
        @submit="handleSubmit"
      />
    </a-card>

    <template #rightFooter>
      <a-button type="primary" @click="submitAll"> 提交 </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm, FormSchema } from '/@/components/Form';
  import { defineComponent, ref, h } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { taskSchemas } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { Card } from 'ant-design-vue';
  import { uploadApi } from '/@/api/sys/upload';

  export default defineComponent({
    name: 'FormHightPage',
    components: { BasicForm, PageWrapper, [Card.name]: Card },
    setup() {
      const tableRef = ref<{ getDataSource: () => any } | null>(null);
      const schemas: FormSchema[] = [
        {
          field: 'tinymce',
          component: 'Input',
          label: '正文内容',
          defaultValue: 'defaultValue',
          rules: [{ required: true }],
          render: ({ model, field }) => {
            return h(Tinymce, {
              value: model[field],
              onChange: (value: string) => {
                model[field] = value;
              },
            });
          },
        },
        {
          field: 'field1',
          component: 'Upload',
          label: '上传附件',
          rules: [{ required: false, message: '请选择上传文件' }],
          componentProps: {
            api: uploadApi,
          },
        },
      ];

      const [registerTask] = useForm({
        layout: 'vertical',
        baseColProps: {
          span: 6,
        },
        schemas: taskSchemas,
        showActionButtonGroup: false,
      });

      async function submitAll() {
        createMessage.info('提交成功！');
      }

      const { createMessage } = useMessage();
      function handleSubmit(values: any) {
        createMessage.success('click search,values:' + JSON.stringify(values));
      }

      return { schemas, registerTask, submitAll, tableRef, handleSubmit };
    },
  });
</script>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 48px;
  }
</style>
