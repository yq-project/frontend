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
import {ref} from 'vue';
import {BasicColumn, BasicTable, TableAction, useTable} from '/@/components/Table';
import {getTaskListApi} from '/@/api/sys/commentTask';
import {commentTaskStateMap} from '/@/enums/infoStateEnum';
import { useRouter } from 'vue-router';
import { Tag } from 'ant-design-vue'

const data = ref([]);
  const actionColumn = {
    width: 120,
    title: 'Action',
    dataIndex: 'action',
    fixed: 'right',
  };
  const columns = [
    {
      title: '舆情名称',
      dataIndex: 'info_subject',
    },
    {
      title: '发布人',
      width: 100,
      dataIndex: 'creator',
    },
    {
      title: '发布时间',
      width: 250,
      dataIndex: 'created_at',
    },
    {
      title: '状态',
      width: 250,
      dataIndex: 'state',
    },
  ];
  const count = ref(0);
  const router = useRouter();

  const getTaskList = (pageIndex) => {
    getTaskListApi(pageIndex).then((res) => {
      res.results.forEach((item) => {
        let date = new Date(item.created_at);
        item.created_at = `${date.getFullYear()}年${
          date.getMonth() + 1
        }月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`;
        item.stateColor="green"
        if(item.state==0){
          item.stateColor="red"
        }
        item.state = commentTaskStateMap.get(item.state);
        
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
  getTaskList(1);
  function pageChange(currentPage, _pageSize) {
    getTaskList(currentPage)
  }
  const [registerTable, { setPagination }] = useTable({
    title: '全部事务',
    dataSource: data,
    columns: columns,
    actionColumn: actionColumn as BasicColumn,
    pagination: {
      //@ts-ignore
      onChange: pageChange,
    },
  });
  const handleDetail=(record)=> {
    router.push(`/user/infomanage/task?id=${record.id}`);
  }
</script>
