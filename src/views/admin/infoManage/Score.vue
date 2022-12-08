<template>
  <div class="p-4">
    <BasicTable
      @register="registerTable"
      @edit-end="handleEditEnd"
      @edit-cancel="handleEditCancel"
      :beforeEditSubmit="beforeEditSubmit"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
  import { infoListApi, infoScoreApi } from '/@/api/demo/table';
  import { useMessage } from '/@/hooks/web/useMessage';
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
      // sorter: true,
      dataIndex: 'created_at',
    },
    {
      title: '上传用户',
      dataIndex: 'creator',
      width: 150,
      // filters: [
      //   { text: 'Male', value: 'male' },
      //   { text: 'Female', value: 'female' },
      // ],
    },
    {
      title: '当前评分',
      dataIndex: 'score',
      edit: true,
      editComponent: 'RadioGroup',
      editComponentProps: {
        options: [
          {
            label: '0',
            value: '0',
          },
          {
            label: '1',
            value: '1',
          },
          {
            label: '2',
            value: '2',
          },
          {
            label: '3',
            value: '3',
          },
          {
            label: '4',
            value: '4',
          },
          {
            label: '5',
            value: '5',
          },
        ],
      },
      width: 200,
    },
  ];
  export default defineComponent({
    components: { BasicTable },
    setup() {
      const data = ref([]);
      let page = 1;
      const updateScoreList = (currentPage) => {
        infoListApi(currentPage).then((res) => {
          data.value = res.results;
          setPagination({
            total: res.count,
            showSizeChanger: false,
            pageSize: 10,
          });
          // console.log(res.results);
          // console.log(data.value);
        });
      };
      updateScoreList(1);
      const [registerTable, { setPagination }] = useTable({
        title: '舆情评分页',
        columns: columns,
        dataSource: data,
        showIndexColumn: false,
        bordered: true,
        pagination: {
          //@ts-ignore
          onChange: pageChange,
        },
      });
      function pageChange(currentPage) {
        page = currentPage;
        updateScoreList(currentPage);
      }

      const { createMessage } = useMessage();

      function handleEditEnd({ record, index, key, value }: Recordable) {
        console.log(record, index, key, value);
        return false;
      }

      // 模拟将指定数据保存
      function feakSave(id, value) {
        // createMessage.loading({
        //   content: `正在保存`,
        //   key: '_save_fake_data',
        //   duration: 0,
        // });
        return new Promise((resolve) => {
          setTimeout(async () => {
            if (value === '') {
              createMessage.error({
                content: '保存失败：不能为空',
                key: '_save_fake_data',
                duration: 2,
              });
              resolve(false);
            } else {
              // createMessage.success({
              //   content: ``,
              //   key: '_save_fake_data',
              //   duration: 2,
              // });
              let params = {
                score: value,
              };
              // console.log(id);
              await infoScoreApi(id, params);
              infoListApi(page).then((res) => {
                data.value = res.results;
                // console.log(res.results);
                // console.log(data.value);
              });
              // data.value = await infoListApi();
              // console.log(data);
              resolve(true);
            }
          }, 2000);
        });
      }

      async function beforeEditSubmit({ record, index, key, value }) {
        console.log('单元格数据正在准备提交', { record, index, key, value });
        return await feakSave(data.value[index].id, value);
      }

      function handleEditCancel() {
        console.log('cancel');
      }

      return {
        data,
        registerTable,
        handleEditEnd,
        handleEditCancel,
        beforeEditSubmit,
      };
    },
  });
</script>
