<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '编辑',
                icon: 'material-symbols:edit-document-outline',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns } from './tableData';
  import { broadcastListApi, DeleteBroadcastApi } from '/@/api/demo/admin';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: { BasicTable, TableAction },
    setup() {
      const router = useRouter();
      const data = ref([]);
      const updateBroadcastList = () => {
        broadcastListApi().then((res) => {
          res.results.forEach((item) => {
            item.creator = '管理员';
            let date = new Date(item.created_at);
            let format = `${date.getFullYear()}年${
              date.getMonth() + 1
            }月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`;
            item.created_at = format;
          });
          data.value = res.results;
          console.log(data.value);
        });
      };
      updateBroadcastList();
      const [registerTable] = useTable({
        title: '公告管理',
        dataSource: data,
        columns: getBasicColumns(),
        rowKey: 'id',
        showIndexColumn: false,
        //showTableSetting: true,
        actionColumn: {
          width: 200,
          title: 'Action',
          dataIndex: 'action',
          fixed: 'right',
          // slots: { customRender: 'action' },
        },
      });
      const { createMessage } = useMessage();
      async function handleDelete(record: Recordable) {
        try {
          await DeleteBroadcastApi(record.id);
        } catch (err) {
          updateBroadcastList();
        }
        createMessage.info('删除成功！');
      }
      function handleEdit(record: Recordable) {
        console.log(record);
        router.push({
          path: '/announcement/uploadAnnouncement',
          query: {
            title: record.title,
            content: record.content,
            id: record.id,
          },
        });
      }

      return {
        registerTable,
        handleDelete,
        handleEdit,
      };
    },
  });
</script>
