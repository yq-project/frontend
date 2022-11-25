<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column }">
        <template v-if="column.key === '操作'">
          <a-button class="mr-2" @click="goToDetail"> 查看详情 </a-button>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onBeforeMount, ref } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';

  import { infoListApi } from '/@/api/demo/table';
  import { router } from '/@/router';

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
      width: 150,
      sorter: true,
      dataIndex: 'created_at',
    },
    {
      title: '上传用户',
      dataIndex: 'creator',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    },
    {
      title: '涉及单位',
      width: 150,
      dataIndex: 'department',
    },
    {
      title: '信息种类',
      dataIndex: 'infoType',
      width: 150,
      sorter: true,
      // defaultHidden: true,
    },
    {
      title: '当前状态',
      width: 150,
      sorter: true,
      dataIndex: 'state',
    },
  ];

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const data = ref([]);
      onBeforeMount(async () => {
        const res = await infoListApi();
        data.value = res.results;
      });
      console.log(data);
      const [registerTable] = useTable({
        title: '舆情信息列表',
        titleHelpMessage: ['以列表的形式展示所有的舆情信息'],
        columns: columns,
        // api: demoListApi,
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
