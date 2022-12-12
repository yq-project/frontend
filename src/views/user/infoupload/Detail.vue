<template>
  <PageWrapper title="舆情信息详情">
    <template #extra>
      <a-button @click="cancel"> 返回 </a-button>
    </template>
    <a-card :bordered="false">
      <BasicForm @register="register" />
    </a-card>

    <a-card title="截图信息" :bordered="false">
      <ImagePreview v-if="showImg" :imageList="[imageUrl]" />
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
  import { defineComponent, ref, Ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card } from 'ant-design-vue';
  import { schemas } from './data';
  import { BasicUpload } from '/@/components/Upload';
  import { uploadApi } from '/@/api/sys/upload';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { createInfoApi, getInfoApi } from '/@/api/sys/info';
  import { useRouter, useRoute } from 'vue-router';
  import { ImagePreview } from '/@/components/Preview/index';

  export default defineComponent({
    name: 'FormHightPage',
    components: { BasicForm, BasicUpload, PageWrapper, [Card.name]: Card, ImagePreview },
    setup() {
      const imageList: Ref<any[]> = ref([]);
      const router = useRouter();
      const route = useRoute();
      const [register, { validate, setFieldsValue }] = useForm({
        layout: 'vertical',
        schemas: schemas,
        showActionButtonGroup: false,
      });
      async function submitAll() {
        const data = await validate();
        if (imageList.value.length == 1) {
          data.picture = imageList.value[0];
          createInfoApi(data).then((_res) => {
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
      const showImg = ref(false);
      const imageUrl = ref('');
      const handleChange = (list: string[]) => {
        imageList.value = list;
        createMessage.info(`截图已保存`);
      };
      if (route.query.id) {
        getInfoApi(parseInt(route.query.id as string)).then((res) => {
          setFieldsValue(res);
          showImg.value = true;
          imageUrl.value = res.picture;
        });
      } else {
        router.push('/user/infomanage/upload');
      }
      return { showImg, imageUrl, submitAll, register, uploadApi, handleChange, cancel, imageList };
    },
  });
</script>
<style lang="less" scoped></style>
