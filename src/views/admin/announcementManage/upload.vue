<template>
  <PageWrapper title="发布公告">
    <template v-if="route.query.id != null" #extra>
      <a-button @click="back"> 返回 </a-button>
    </template>
    <Card title="公告内容">
      <BasicForm
        :labelWidth="100"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        :baseColProps="{ span: 24 }"
        @submit="handleSubmit"
      />
    </Card>
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, FormSchema } from '/@/components/Form';
  import { defineComponent, ref, h } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { Card } from 'ant-design-vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { CreateBroadcastApi, UpdateBroadcastApi } from '/@/api/demo/admin';
  import { useRoute, useRouter } from 'vue-router';

  export default defineComponent({
    name: 'FormHightPage',
    components: { BasicForm, PageWrapper, Card, CollapseContainer },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const tableRef = ref<{ getDataSource: () => any } | null>(null);
      const schemas: FormSchema[] = [
        {
          field: 'title',
          component: 'Input',
          label: '公告标题',
          defaultValue: route.query.title,
          rules: [{ required: true }],
        },
        {
          field: 'content',
          component: 'Input',
          label: '正文内容',
          defaultValue: route.query.content,
          rules: [{ required: true }],
          render: ({ model, field }) => {
            return h(Tinymce, {
              value: model[field],
              plugins: ['lists autolink wordcount'],
              toolbar: [
                'fontsizeselect bold italic underline strikethrough alignleft aligncenter alignright outdent indent undo redo removeformat',
                'hr bullist numlist link',
              ],
              showImageUpload: false,
              onChange: (value: string) => {
                model[field] = value;
              },
            });
          },
        },
      ];

      const { createMessage } = useMessage();
      async function handleSubmit(values: any) {
        if (route.query.id != null) {
          await UpdateBroadcastApi(values, route.query.id);
        } else {
          await CreateBroadcastApi(values);
        }
        createMessage.info('上传成功！');
        router.push({
          path: '/announcement/updateAnnouncement',
        });
      }

      function back() {
        router.push('/announcement/updateAnnouncement');
      }
      return { schemas, tableRef, handleSubmit, back, route };
    },
  });
</script>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 48px;
  }
</style>
