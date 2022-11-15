<template>
  <div class="p-4">
    <BasicTable @register="registerTable" @edit-change="onEditChange">
      <template #bodyCell="{ column }">
        <template v-if="column.key === '操作'">
          <a-button class="mr-2" @click="goToDetail"> 查看详情 </a-button>
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
      title: '上传时间',
      width: 150,
      sorter: true,
      dataIndex: 'beginTime',
    },
    {
      title: '上传用户',
      dataIndex: 'name',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    },
    {
      title: '涉及单位',
      width: 150,
      dataIndex: 'content',
    },
    {
      title: '信息种类',
      dataIndex: 'no',
      width: 150,
      sorter: true,
      // defaultHidden: true,
    },
    {
      title: '当前状态',
      width: 150,
      sorter: true,
      dataIndex: 'status_info',
    },
  ];
  export default defineComponent({
    components: { BasicTable },
    setup() {
      const router = useRouter();
      const [registerTable] = useTable({
        title: '舆情信息列表',
        titleHelpMessage: ['以列表的形式展示所有的舆情信息'],
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
