<template>
  <BasicTable @register="registerTable">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction
          stopButtonPropagation
          :actions="[
            {
              label: '详情',
              icon: 'bx:message-detail',
              onClick: handleDetail.bind(null, record),
            },
          ]"
        />
      </template>
      <template v-else-if="column.key === 'state'">
          <Tag :color="record.stateColor">
            {{ record.state }}
          </Tag>
        </template>
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { BasicColumn, BasicTable, TableAction, useTable } from '/@/components/Table';
  import { getInfoListApi } from '/@/api/sys/info';
  import { stateMap } from '/@/enums/infoStateEnum';
  import { Tag } from 'ant-design-vue'

  const actionColumn = {
    width: 120,
    title: 'Action',
    dataIndex: 'action',
    fixed: 'right',
  };
  const columns = [
    {
      title: '舆情名称',
      dataIndex: 'subject',
    },
    {
      title: '发布时间',
      width: 250,
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
  const router = useRouter();
  const [registerTable, { setPagination }] = useTable({
    dataSource: data,
    columns: columns,
    actionColumn: actionColumn as BasicColumn,
    pagination: {
      //@ts-ignore
      onChange: pageChange,
    },
  });
  const getInfoList = (page) => {
    getInfoListApi(page).then((res) => {
      res.results.forEach((item) => {
        item.stateColor="green"
        if(item.state==1){
          item.stateColor="red"
        }
        item.state = stateMap.get(item.state);
        let date = new Date(item.created_at);
        item.created_at = `${date.getFullYear()}年${
          date.getMonth() + 1
        }月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`;
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
  function pageChange(currentPage, _pageSize) {
    getInfoList(currentPage);
  }
  function handleDetail(record) {
    router.push(`/user/infomanage/detail?id=${record.id}`);
  }
</script>
