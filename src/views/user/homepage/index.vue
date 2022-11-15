<template>
  <PageWrapper>
    <!-- <template #headerContent> <WorkbenchHeader /> </template> -->
    <div class="lg:flex">
      <div class="w-full !mr-4 enter-y">
        <TodoCard :loading="loading" class="enter-y" />
        <BroadcastInfo :loading="loading" class="!my-4 enter-y" />
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import TodoCard from './components/TodoCard.vue';
  import BroadcastInfo from './components/BroadcastInfo.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 500);
</script>
