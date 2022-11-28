<template>
  <PageWrapper title="信息上传">
    <template #extra>
      <a-button type="primary" @click="handleSubmit"> 上传信息 </a-button>
    </template>
    <InfoList />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import InfoList from './components/InfoList.vue';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const handleSubmit = () => {
    router.push('/user/infomanage/uploadform');
  };
</script>
