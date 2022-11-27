<template>
  <PageWrapper class="high-form" title="舆情信息填写">
    <a-card title="信息填写" :bordered="false">
      <BasicForm @register="register" />
    </a-card>

    <a-card title="截图上传" :bordered="false">
      <BasicUpload
        :maxSize="20"
        :maxNumber="1"
        @change="handleChange"
        :api="uploadApi"
        class="my-5"
        :accept="['png', 'jpg', 'jpeg']"
      />
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
  import { BasicUpload } from '/@/components/Upload';
  import { uploadApi } from '/@/api/sys/upload';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { createInfoApi } from '/@/api/sys/info'

  export default defineComponent({
    name: 'FormHightPage',
    components: { BasicForm, BasicUpload, PageWrapper, [Card.name]: Card },
    setup() {
      const [register, { validate }] = useForm({
        layout: 'vertical',
        schemas: schemas,
        showActionButtonGroup: false,
      });
      async function submitAll() {
        // const data = await validate();
        const data={
          content:"123",
          department:"1234",
          infoType:'yde',
          infoUrl:'dcfdvcf',
          picture:'额的',
          subject:'dcdvf'
        }
        console.log(data);
        createInfoApi(data).then((res)=>{
          console.log(res)
        })
      }
      const { createMessage } = useMessage();
      const handleChange = (list: string[]) => {
        createMessage.info(`已上传文件${JSON.stringify(list)}`);
      };
      return { submitAll, register, uploadApi, handleChange };
    },
  });
</script>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 48px;
  }
</style>
