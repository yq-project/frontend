<template>
  <BasicTable
    title="已完成事务"
    :columns="columns"
    :dataSource="data"
    :loading="loading"
    :striped="striped"
    :bordered="border"
    :pagination="pagination"
  />
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { getBasicColumns, getBasicData } from './tableData';
  const loading = ref(false);
  const striped = ref(true);
  const border = ref(true);
  const pagination = ref<any>(true);
  const columns = getBasicColumns();
  const data = getBasicData();
</script>
