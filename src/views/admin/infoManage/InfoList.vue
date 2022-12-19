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

  import { infoListApi } from '/@/api/demo/table';
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
      width: 150,
      dataIndex: 'created_at',
    },
    {
      title: '上传用户',
      dataIndex: 'creator',
      width: 150,
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
      // defaultHidden: true,
    },
    {
      title: '当前状态',
      width: 150,
      dataIndex: 'state',
    },
  ];

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const router = useRouter();
      const data = ref([]);
      const updateInfoList = (currentPage) => {
        infoListApi(currentPage).then((res) => {
          res.results.forEach((item) => {
            let date = new Date(item.created_at);
            item.created_at = `${date.getFullYear()}年${
              date.getMonth() + 1
            }月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`;
            switch (item.state) {
              case 0:
                item.state = '待老师审核';
                break;
              case 1:
                item.state = '待学生重新提交';
                break;
              case 2:
                switch (item.process_state) {
                  case 0:
                    item.state = '待二级领导阅读';
                    break;
                  case 1:
                    item.state = '待二级领导反馈';
                    break;
                  case 2:
                    item.state = '待老师审核';
                    break;
                  case 3:
                    item.state = '审核通过';
                    break;
                }
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
          setPagination({
            total: res.count,
            showSizeChanger: false,
            pageSize: 10,
          });
        });
      };
      updateInfoList(1);
      const [registerTable, { setPagination }] = useTable({
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
        pagination: {
          //@ts-ignore
          onChange: pageChange,
        },
      });

      function pageChange(currentPage) {
        updateInfoList(currentPage);
      }

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
