<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'state' && record.state === '在线'">
          <Tag color="green">
            {{ record.state }}
          </Tag>
        </template>
        <template v-if="column.key === 'state' && record.state === '离线'">
          <Tag color="red">
            {{ record.state }}
          </Tag>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table/src/types/table';
  import { demoListApi } from '/@/api/demo/table';
  import { Tag } from 'ant-design-vue';

  export default defineComponent({
    components: { BasicTable, Tag },
    setup() {
      const [registerTable] = useTable({
        canResize: true,
        title: '用户列表',
        api: demoListApi,
        columns: getBasicColumns(),
        defSort: {
          field: 'name',
          order: 'ascend',
        },
        rowKey: 'id',
        showTableSetting: true,
        showIndexColumn: false,
      });
      function getBasicColumns(): BasicColumn[] {
        return [
          {
            title: 'ID',
            dataIndex: 'id',
            fixed: 'left',
            width: 200,
            sorter: true,
          },
          {
            title: '用户名',
            dataIndex: 'name',
            width: 150,
            sorter: true,
          },
          {
            title: '上传信息数量',
            dataIndex: 'uploadInfoNum',
            width: 150,
            sorter: true,
          },
          {
            title: '上传信息平均得分',
            dataIndex: 'uploadInfoScore',
            width: 150,
            sorter: true,
          },
          {
            title: '当前状态',
            width: 150,
            dataIndex: 'state',
            filters: [
              { text: '在线', value: 'online' },
              { text: '离线', value: 'offline' },
            ],
          },
        ];
      }
      return {
        registerTable,
      };
    },
  });
</script>
