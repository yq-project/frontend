<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="新增用户" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './account.data';
  import { CreateUserApi, UpdateUserApi } from '/@/api/demo/admin';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    props: {
      updateUserList: {
        type: Function,
      },
    },
    //emits: ['success', 'register'],
    setup(props) {
      const isUpdate = ref(true);
      const currentPage = ref(1);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        //console.log(data.currentPage);
        currentPage.value = data.currentPage;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const { createMessage } = useMessage();

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          console.log(values);
          if (unref(isUpdate)) {
            const data = await UpdateUserApi(values, rowId.value);
            console.log(data);
            props.updateUserList(currentPage.value);
            createMessage.info('更新成功！');
          } else {
            const data = await CreateUserApi(values);
            console.log(data);
            props.updateUserList(currentPage.value);
            createMessage.info('新建成功！');
          }
          closeModal();
          //emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, handleSubmit };
    },
  });
</script>
