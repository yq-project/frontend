<template>
  <PageWrapper title="通知公告">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action' && showAction">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                onClick: handleDelete.bind(null, record),
              },
              {
                label: '编辑',
                icon: 'material-symbols:edit-document-outline',
                onClick: handleDelete.bind(null, record), //popConfirm
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, computed, ref } from 'vue';
  import { BasicTable, useTable, TableAction, BasicColumn } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useUserStore } from '/@/store/modules/user';
  import { getBroadcastListApi } from '/@/api/sys/broadcast';

  export default defineComponent({
    components: { BasicTable, TableAction, PageWrapper },
    setup() {
      const userStore = useUserStore();
      const showAction = computed(() => {
        const { role } = userStore.getUserInfo;
        if (role && role.length == 1) {
          return role[0].value == 'admin';
        } else {
          return false;
        }
      });
      const actionColumn = showAction.value
        ? {
            width: 160,
            title: 'Action',
            dataIndex: 'action',
            fixed: 'right',
          }
        : undefined;
      const tableColumns = [
        {
          title: '发布人',
          dataIndex: 'creator',
          width: 150,
        },
        {
          title: '标题',
          dataIndex: 'title',
        },
        {
          title: '发布时间',
          width: 250,
          dataIndex: 'created_at',
        },
      ] as BasicColumn[];
      const data = ref([]);
      const count = ref(0);
      const [registerTable, { setLoading, setPagination, getPaginationRef }] = useTable({
        dataSource: data,
        columns: tableColumns,
        rowKey: 'id',
        actionColumn: actionColumn as BasicColumn,
        pagination: {
          //ts
          onChange: pageChange,
        },
      });
      function pageChange(currentPage, pageSize) {
        getBroadcastList(currentPage);
      }

      const getBroadcastList = (pageIndex) => {
        getBroadcastListApi(pageIndex).then((res) => {
          res.results.forEach((item) => {
            item.creator = '管理员';
          });
          count.value = res.count;
          data.value = res.results;
          setPagination({
            total: res.count,
            showSizeChanger: false,
            pageSize: 10,
          });
        });
      };
      getBroadcastList(1);

      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }
      function handleOpen(record: Recordable) {
        console.log('点击了启用', record);
      }

      return {
        registerTable,
        handleDelete,
        handleOpen,
        showAction,
      };
    },
  });
</script>
