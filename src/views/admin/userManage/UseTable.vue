<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'online' && record.online === true">
          <Tag color="green"> 在线 </Tag>
        </template>
        <template v-if="column.key === 'online' && record.online === false">
          <Tag color="red"> 离线 </Tag>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onBeforeMount, ref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table/src/types/table';
  import { userListApi } from '/@/api/demo/table';
  import { Tag } from 'ant-design-vue';

  export default defineComponent({
    components: { BasicTable, Tag },
    setup() {
      const data = ref([]);
      onBeforeMount(async () => {
        const res = await userListApi();
        data.value = res.results;
      });
      const [registerTable] = useTable({
        canResize: true,
        title: '用户列表',
        dataSource: data,
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
            dataIndex: 'online',
            filters: [
              { text: '在线', value: 'true' },
              { text: '离线', value: 'false' },
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
