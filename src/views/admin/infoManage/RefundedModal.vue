<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="退回修改"
    @visible-change="handleVisibleChange"
    @ok="handleSubmit"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { infoAdviceApi } from '/@/api/demo/table';
  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '修改意见',
      colProps: {
        span: 24,
      },
      defaultValue: '请输入你的修改意见',
    },
  ];
  export default defineComponent({
    name: 'RefundedModal',
    components: { BasicModal, BasicForm },
    props: {
      userData: { type: Object },
      update: {
        type: Function,
      },
    },
    setup(props) {
      let id = 0;
      const modelRef = ref({});
      const [
        registerForm,
        {
          validate,
        },
      ] = useForm({
        labelWidth: 120,
        schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data) {
        console.log('Data Received', data);
        id = data.data;
        modelRef.value = { field2: data.data, field1: data.info };
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      async function handleSubmit() {
        const value = await validate();
        console.log(id);
        console.log(value.field1);
        const param = {
          advice: value.field1,
        };
        await infoAdviceApi(id, param);
        props.update();
        closeModal();
      }

      return {
        register,
        schemas,
        registerForm,
        model: modelRef,
        handleVisibleChange,
        handleSubmit,
      };
    },
  });
</script>
