<template>
  <PageWrapper class="high-form" title="舆情信息填写">
    <a-card title="信息填写" :bordered="false">
      <BasicForm @register="register" />
    </a-card>

    <a-card title="截图上传" :bordered="false">
        
    </a-card>

    <template #rightFooter>
      <a-button type="primary" @click="submitAll"> 提交 </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
import { BasicForm, useForm } from '/@/components/Form';
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card } from 'ant-design-vue';
  import { schemas } from './data';

  export default defineComponent({
    name: 'FormHightPage',
    components: { BasicForm, PageWrapper, [Card.name]: Card },
    setup() {
      const [register] = useForm({
        layout: 'vertical',
        schemas: schemas,
        showActionButtonGroup: false,
      });
      async function submitAll() {
        console.log('submit');
      }
      return { submitAll, register };
    },
  });
</script>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 48px;
  }
</style>
