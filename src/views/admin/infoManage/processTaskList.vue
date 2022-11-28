<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === '操作'">
          <a-button class="mr-2" @click="goToDetail(record.id)"> 查看详情 </a-button>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';

  import { infoApi, processTaskApi, processTaskListApi } from '/@/api/demo/table';
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
      title: '发生时间',
      width: 150,
      sorter: true,
      dataIndex: 'created_at',
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
      const router = useRouter();
      const data = ref([]);
      processTaskListApi().then((res) => {
        res.results.forEach(async (item) => {
          // let infoData = ref([]);
          // const infoData = await infoApi(item.info);
          // console.log(infoData.infoType);
          item.infoType = '生活';
          item.subject = 'XXX';
          // item.subject = infoData.subject;
          switch (item.state) {
            case 0:
              item.state = '待老师审核';
              break;
            case 1:
              item.state = '待学生重新提交';
              break;
            case 2:
              item.state = '审核通过';
              break;
            case 3:
              item.state = '老师终止流程';
              break;
            case 4:
              item.state = '学生撤回上传信息';
              break;
          }
        });
        data.value = res.results;
      });
      const [registerTable] = useTable({
        title: '舆情信息列表',
        titleHelpMessage: ['以列表的形式展示所有的舆情信息'],
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
          path: '/infoManage/processTaskDetail',
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
