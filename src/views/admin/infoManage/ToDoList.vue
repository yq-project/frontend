<template>
  <div class="p-4">
    <BasicTable @register="registerTable" @edit-change="onEditChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === '操作'">
          <a-button class="mr-2" @click="goToDetail(record.id)"> 前往审核 </a-button>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';

  import { infoListApi } from '/@/api/demo/table';

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
      dataIndex: 'state',
      editRow: true,
      width: 150,
    },
  ];
  export default defineComponent({
    components: { BasicTable },
    setup() {
      const router = useRouter();
      const data = ref([]);
      const privateList = ref([]);
      infoListApi().then((res) => {
        let tmp = [];
        res.results.forEach((item) => {
          if (item.state === 0) {
            item.state = '待老师审核';
            tmp.push(item);
          }
        });
        privateList.value = tmp;
        data.value = privateList.value;
      });
      const [registerTable] = useTable({
        title: '待办事务列表',
        titleHelpMessage: ['以列表的形式显示所有待办事务'],
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
      function goToDetail(id) {
        // console.log(id);
        router.push({
          path: '/infoManage/infoDetail',
          query: {
            infoId: id,
          },
        });
      }
      return {
        data,
        goToDetail,
        registerTable,
      };
    },
  });
</script>
