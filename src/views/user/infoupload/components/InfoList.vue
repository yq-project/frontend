<template>
  <BasicTable
    :columns="columns"
    :dataSource="data"
    :loading="loading"
    :striped="striped"
    :bordered="border"
    :pagination="pagination"
  >
    <template #toolbar>
      <a-button type="primary" @click="handleSubmit"> 上传信息 </a-button>
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { getBasicColumns, getBasicData } from './tableData';
  const loading = ref(false);
  const striped = ref(true);
  const border = ref(true);
  const pagination = ref<any>(true);
  const columns = getBasicColumns();
  const data = getBasicData();
  const router = useRouter();
  const handleSubmit = () => {
    router.push('/user/infomanage/uploadform');
  };
</script>
