<template>
  <BasicTable @register="registerTable"></BasicTable>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getInfoListApi } from '/@/api/sys/info';
  import { stateMap } from '/@/enums/infoStateEnum';
  const columns = [
    {
      title: '舆情名称',
      dataIndex: 'subject',
    },
    {
      title: '发布时间',
      width: 150,
      dataIndex: 'created_at',
    },
    {
      title: '评分',
      width: 150,
      dataIndex: 'score',
    },
    {
      title: '当前状态',
      width: 150,
      dataIndex: 'state',
    },
  ];
  const data = ref([]);
  const count = ref(0);
  const [registerTable, { setPagination }] = useTable({
    dataSource: data,
    columns: columns,
    pagination: {
      //@ts-ignore
      onChange: pageChange,
    },
  });
  const getInfoList = (page) => {
    getInfoListApi(page).then((res) => {
      res.results.forEach((item) => {
        item.state = stateMap.get(item.state);
      });
      count.value = res.count;
      data.value = res.results;
      setPagination({
        total: res.count,
        showSizeChanger: false,
        pageSize: 10,
      });
    });
  };
  getInfoList(1);
  function pageChange(currentPage, pageSize) {
    getInfoList(currentPage);
  }
  const router = useRouter();
</script>
