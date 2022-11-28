<template>
  <PageWrapper title="舆情信息填写">
    <template #extra>
      <a-button @click="cancel"> 返回 </a-button>
      <a-button type="primary" @click="submitAll"> 提交 </a-button>
    </template>
    <a-card :bordered="false">
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
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card } from 'ant-design-vue';
  import { schemas } from './data';
  import { BasicUpload } from '/@/components/Upload';
  import { uploadApi } from '/@/api/sys/upload';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { createInfoApi } from '/@/api/sys/info';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'FormHightPage',
    components: { BasicForm, BasicUpload, PageWrapper, [Card.name]: Card },
    setup() {
      const imageList = ref([]);
      const router = useRouter();
      const [register, { validate }] = useForm({
        layout: 'vertical',
        schemas: schemas,
        showActionButtonGroup: false,
      });
      async function submitAll() {
        const data = await validate();
        if (imageList.value.length == 1) {
          data.picture = imageList.value[0];
          createInfoApi(data).then((res) => {
            createMessage.success(`信息已上传至系统`);
            router.push('/user/infomanage/upload');
          });
        } else {
          createMessage.error('未上传截图');
        }
      }
      const cancel = () => {
        router.push('/user/infomanage/upload');
      };
      const { createMessage } = useMessage();
      const handleChange = (list: string[]) => {
        imageList.value = list;
        createMessage.info(`截图已保存`);
      };
      return { submitAll, register, uploadApi, handleChange, cancel, imageList };
    },
  });
</script>
<style lang="less" scoped>
</style>
