<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="填写反馈"
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
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { processTaskFeedbackApi } from '/@/api/demo/table';
  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '反馈处理',
      colProps: {
        span: 24,
      },
      defaultValue: '请输入你的反馈情况',
    },
  ];
  export default defineComponent({
    name: 'FeedbackModal',
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
          // setFieldsValue,
          // setProps
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
        // 方式1;
        // setFieldsValue({
        //   field2: data.data,
        //   field1: data.info,
        // });

        // // 方式2
        modelRef.value = { field2: data.data, field1: data.info };

        // setProps({
        //   model:{ field2: data.data, field1: data.info }
        // })
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      async function handleSubmit() {
        const value = await validate();
        console.log(id);
        console.log(value.field1);
        const param = {
          feedback: value.field1,
        };
        console.log(param);
        await processTaskFeedbackApi(id, param);
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
