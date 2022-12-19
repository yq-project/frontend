<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="网评任务分配"
    @visible-change="handleVisibleChange"
    @ok="handleSubmit"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { computed, defineComponent, nextTick, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { commentTaskCreateApi, commentTaskUpdateApi } from '/@/api/demo/table';

  // userListApi(-1).then((res) => {
  //   res.forEach((item) => {
  //     // console.log(item);
  //     if (item.role == 1) {
  //       let tmp = { label: item.name, value: item.id };
  //       memberList.push(tmp);
  //     }
  //   });
  // });

  export default defineComponent({
    name: 'AllocateModal',
    components: { BasicModal, BasicForm },
    props: {
      userData: { type: Object },
      update: {
        type: Function,
      },
    },
    setup(props) {
      let id = 0;
      let commentTaskId;
      const modelRef = ref({});

      const memberList = ref([]);
      const _memberList = ref([]);

      function onDataReceive(data) {
        console.log('Data Received', data);
        id = data.data;
        commentTaskId = data.commentTaskId;
        memberList.value = data.memberList;
        _memberList.value = data._memberList;
        modelRef.value = { field2: data.data, field1: data.info };
        // console.log(_memberList);
        // console.log(memberList);
      }

      const schemas: FormSchema[] = [
        {
          field: 'advise',
          component: 'Input',
          label: '指导意见',
          colProps: {
            span: 24,
          },
          // required: true,
          // defaultValue: '请输入指导意见',
        },
        {
          field: 'member',
          component: 'Select',
          label: '选择成员',
          componentProps: {
            options: memberList,
          },
          required: true,
        },
      ];

      const [registerForm, { validate }] = useForm({
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

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      function unique(arr) {
        return Array.from(new Set(arr));
      }

      async function handleSubmit() {
        // console.log(_memberList);
        const value = await validate();
        // console.log(id);
        // console.log(value.member);
        let _commentTaskId = -1;
        // console.log(value.advise);
        console.log(commentTaskId);
        if (commentTaskId == null) {
          const param = { info: id };
          await commentTaskCreateApi(param).then((res) => {
            // console.log(res.id);
            _commentTaskId = res.id;
          });
        } else {
          _commentTaskId = commentTaskId;
        }
        const userList = unique(_memberList.value);
        // console.log(userList);
        userList.push(value.member);
        const userListParam = { userList: userList };
        await commentTaskUpdateApi(_commentTaskId, userListParam);
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
