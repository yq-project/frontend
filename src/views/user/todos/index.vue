<template>
  <div>
    <div class="p-4">
      <TodoCard />
    </div>
    <div class="p-4">
      <HistoryTask />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import TodoCard from './components/TodoCard.vue';
  import HistoryTask from './components/HistoryTask.vue';
  components: [PageWrapper];
</script>
