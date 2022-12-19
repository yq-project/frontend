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
                icon: 'clarity:note-edit-line',
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
      <template #toolbar>
        <a-button type="primary" @click="userLoading"> 新增用户 </a-button>
        <ImpExcel @success="loadDataSuccess" dateFormat="YYYY-MM-DD">
          <a-button type="primary"> 批量导入 </a-button>
        </ImpExcel>
      </template> </BasicTable
    >>
    <AccountModal
      @register="registerModal"
      @success="handleSuccess"
      :updateUserList="updateUserList"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { ImpExcel, ExcelData } from '/@/components/Excel';
  import { BasicTable, useTable, BasicColumn, TableAction } from '/@/components/Table';
  import { userListApi } from '/@/api/demo/table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import AccountModal from './AccountModal.vue';
  import { DeleteUserApi } from '/@/api/demo/admin';
  const columns: BasicColumn[] = [
    {
      title: '用户名',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '用户权限',
      dataIndex: 'role',
      // edit: true,
      // editComponent: 'Select',
      // editComponentProps: {
      //   options: [
      //     {
      //       label: '管理员',
      //       value: 'admin',
      //     },
      //     {
      //       label: '学生助管',
      //       value: 'user',
      //     },
      //     {
      //       label: '学院领导',
      //       value: 'leader',
      //     },
      //   ],
      // },
      width: 150,
    },
    {
      title: '学/工号',
      dataIndex: 'number',
      width: 150,
    },
    {
      title: '部门',
      dataIndex: 'department',
      width: 150,
    },
  ];
  export default defineComponent({
    components: { BasicTable, TableAction, ImpExcel, AccountModal },
    setup() {
      const data = ref([]);
      const updateUserList = (currentPage) => {
        userListApi(currentPage).then((res) => {
          res.results.forEach((item) => {
            switch (item.role) {
              case 0:
                item.role = '管理员';
                break;
              case 1:
                item.role = '普通用户';
                break;
              case 2:
                item.role = '学院领导';
                break;
            }
          });
          data.value = res.results;
          console.log(data.value);
          setPagination({
            total: res.count,
            showSizeChanger: false,
            pageSize: 10,
          });
        });
      };
      const [registerTable, { reload, updateTableDataRecord, setPagination, getPaginationRef }] =
        useTable({
          title: '用户管理',
          dataSource: data,
          columns: columns,
          showIndexColumn: false,
          //showTableSetting: true,
          bordered: true,
          actionColumn: {
            width: 200,
            title: 'Action',
            dataIndex: 'action',
            fixed: 'right',
            // slots: { customRender: 'action' },
          },
          pagination: {
            //@ts-ignore
            onChange: pageChange,
          },
        });
      function pageChange(currentPage) {
        //console.log(getPaginationRef().current);
        updateUserList(currentPage);
      }

      updateUserList(1);
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();

      function loadDataSuccess(excelDataList: ExcelData[]) {
        console.log(excelDataList);
        createMessage.info('导入成功！');
      }
      const handleDelete = async (record: Recordable) => {
        try {
          await DeleteUserApi(record.id);
        } catch (err) {
          updateUserList(1);
        }
        createMessage.info('删除成功！');
      };
      function userLoading() {
        openModal(true, {
          isUpdate: false,
          currentPage: getPaginationRef().current,
        });
      }
      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          // 演示不刷新表格直接更新内部数据。
          // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
          const result = updateTableDataRecord(values.id, values);
          console.log(result);
        } else {
          reload();
        }
      }
      function handleEdit(record: Recordable) {
        console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
          currentPage: getPaginationRef().current,
        });
      }
      return {
        registerTable,
        handleDelete,
        loadDataSuccess,
        userLoading,
        registerModal,
        handleSuccess,
        handleEdit,
        updateUserList,
      };
    },
  });
</script>
