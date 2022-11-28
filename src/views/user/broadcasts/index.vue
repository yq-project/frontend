<template>
  <PageWrapper title="通知公告">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action' ">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '详情',
                icon: 'bx:message-detail',
                onClick: handleDetail.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <Modal @register="registerModal" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction, BasicColumn } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { getBroadcastListApi } from '/@/api/sys/broadcast';
  import { useModal } from '/@/components/Modal';
  import Modal from './components/modal.vue';

  export default defineComponent({
    components: { BasicTable, TableAction, PageWrapper, Modal },
    setup() {
      const actionColumn = {
        width: 120,
        title: 'Action',
        dataIndex: 'action',
        fixed: 'right',
      };

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
      const [registerModal, { openModal: openModal }] = useModal();
      const [registerTable, { setPagination }] = useTable({
        dataSource: data,
        columns: tableColumns,
        rowKey: 'id',
        actionColumn: actionColumn as BasicColumn,
        pagination: {
          //@ts-ignore
          onChange: pageChange,
        },
      });
      function pageChange(currentPage, _pageSize) {
        getBroadcastList(currentPage);
      }

      const getBroadcastList = (pageIndex) => {
        getBroadcastListApi(pageIndex).then((res) => {
          res.results.forEach((item) => {
            item.creator = '管理员';
            let date = new Date(item.created_at);
            let format = `${date.getFullYear()}年${
              date.getMonth() + 1
            }月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`;
            item.created_at = format;
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

      function handleDetail(record) {
        openModal(true, {
          title: record.title,
          content: record.content,
        });
      }

      return {
        registerTable,
        handleDetail,
        registerModal,
      };
    },
  });
</script>
