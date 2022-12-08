<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === '操作'">
          <template v-if="record.status === '未审核'">
            <a-button class="mr-2" @click="goToDetail(record.info)"> 前往审核 </a-button>
          </template>
          <template v-else>
            <a-button class="mr-2" @click="goToDetail(record.info)"> 前往分配 </a-button>
          </template>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
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
      const updateAssignmentList = (currentPage) => {
        commentTaskListApi(currentPage).then((res) => {
          data.value = res.results;
          setPagination({
            total: res.count,
            showSizeChanger: false,
            pageSize: 10,
          });
        });
      };
      // console.log(data);
      updateAssignmentList(1);
      const [registerTable, { setPagination }] = useTable({
        title: '网评任务页',
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
        pagination: {
          //@ts-ignore
          onChange: pageChange,
        },
      });
      function pageChange(currentPage) {
        updateAssignmentList(currentPage);
      }

      function goToDetail(id) {
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
