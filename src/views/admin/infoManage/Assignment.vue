<template>
  <div class="p-4">
    <BasicTable @register="registerTable" @edit-change="onEditChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === '操作'">
          <template v-if="record.status === '未审核'">
            <a-button class="mr-2" @click="goToDetail"> 前往审核 </a-button>
          </template>
          <template v-else>
            <a-button class="mr-2" @click="goToDetail"> 前往分配 </a-button>
          </template>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onBeforeMount, ref } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';

  import { commentTaskListApi } from '/@/api/demo/table';
  import { useRouter } from 'vue-router';

  const columns: BasicColumn[] = [
    {
      title: '舆情主题',
      dataIndex: 'subject',
      editRow: true,
      editComponentProps: {
        prefix: '$',
      },
      width: 150,
    },
    {
      title: '上传时间',
      dataIndex: 'created_at',
      editRow: true,
      width: 150,
    },
    {
      title: '上传用户',
      dataIndex: 'creator',
      width: 150,
    },
    {
      title: '处理用户',
      dataIndex: 'name1',
      width: 150,
    },
    {
      title: '涉及单位',
      width: 150,
      dataIndex: 'department',
    },
    {
      title: '当前状态',
      width: 150,
      sorter: true,
      dataIndex: 'status',
    },
  ];
  export default defineComponent({
    components: { BasicTable },
    setup() {
      const router = useRouter();
      const data = ref([]);
      onBeforeMount(async () => {
        const res = await commentTaskListApi();
        data.value = res.results;
      });
      console.log(data);
      const [registerTable] = useTable({
        title: '网评任务分配页',
        titleHelpMessage: ['以列表的形式展示所有舆情信息'],
        columns: columns,
        dataSource: data,
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
        data,
        goToDetail,
        registerTable,
      };
    },
  });
</script>
