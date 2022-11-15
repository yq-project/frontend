<template>
  <div class="p-4">
    <BasicTable @register="registerTable" @edit-change="onEditChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === '操作'">
          <template v-if="record.status_info === '未审核'">
            <a-button class="mr-2" @click="goToDetail"> 前往审核 </a-button>
          </template>
          <template v-else>
            <a-button class="mr-2" @click="goToDetail"> 查看详情 </a-button>
          </template>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';

  import { demoListApi } from '/@/api/demo/table';

  import { useRouter } from 'vue-router';

  const columns: BasicColumn[] = [
    {
      title: '舆情主题',
      dataIndex: 'content',
      editRow: true,
      editComponentProps: {
        prefix: '$',
      },
      width: 150,
    },
    {
      title: '当前状态',
      dataIndex: 'status_todo',
      editRow: true,
      width: 150,
    },
  ];
  export default defineComponent({
    components: { BasicTable },
    setup() {
      const router = useRouter();
      const [registerTable] = useTable({
        title: '待办事务列表',
        titleHelpMessage: ['以列表的形式显示所有待办事务'],
        api: demoListApi,
        columns: columns,
        showIndexColumn: false,
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: '操作',
          // slots: { customRender: 'action' },
        },
      });
      function goToDetail() {
        router.push('/infoManage/infoDetail');
      }
      return {
        goToDetail,
        registerTable,
      };
    },
  });
</script>
