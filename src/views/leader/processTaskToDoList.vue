<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === '操作'">
          <a-button v-if="record.state === '审核通过'" class="mr-2" @click="goToDetail(record)">
            查看详情
          </a-button>
          <a-button v-else class="mr-2" @click="goToDetail(record)"> 前往处理 </a-button>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';

  import { infoApi, processTaskReadApi, processTaskListApi } from '/@/api/demo/table';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '/@/store/modules/user';

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
      const privateList = ref([]);
      const userStore = useUserStore();
      const { department } = userStore.getUserInfo;
      const updateProcessTaskToDoList = (currentPage) => {
        processTaskListApi(currentPage).then((res) => {
          let tmp = [];
          res.results.forEach((item) => {
            // console.log(item);
            if (item.info.department === department && item.state !== 3) {
              item.infoType = item.info.infoType;
              item.subject = item.info.subject;
              if (item.info.state === 2) {
                switch (item.state) {
                  case 0:
                    item.state = '信息未读';
                    break;
                  case 1:
                    item.state = '信息未反馈';
                    break;
                  case 2:
                    item.state = '待审核';
                    break;
                  case 3:
                    item.state = '审核通过';
                    break;
                }
              }
              tmp.push(item);
            }
          });
          privateList.value = tmp;
          data.value = privateList.value;
          setPagination({
            total: res.count,
            showSizeChanger: false,
            pageSize: 10,
          });
        });
      };
      updateProcessTaskToDoList(1);
      const [registerTable, { setPagination }] = useTable({
        title: '待办任务列表',
        titleHelpMessage: ['以列表的形式展示所有负责的未审核通过的舆情信息'],
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
        updateProcessTaskToDoList(currentPage);
      }

      function goToDetail(info) {
        // console.log(info.info.subject);
        if (info.state === '信息未读') {
          const params = {
            info: {
              subject: info.info.subject,
              content: info.info.content,
              department: info.info.department,
              infoUrl: info.info.infoUrl,
              picture: info.info.picture,
              infoType: info.info.infoType,
              tip: info.info.tip,
            },
          };
          processTaskReadApi(info.id, params);
        }
        router.push({
          path: '/leader/processTaskDetail',
          query: {
            infoId: info.id,
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
