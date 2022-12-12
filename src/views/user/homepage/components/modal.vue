<template>
  <BasicModal :title="title" @register="register" @ok="handleConfirm">
    <div v-html="content"></div>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { filterXSS } from 'xss';
import { readLatestBroadCastApi} from '/@/api/sys/broadcast'
import {useMessage } from '/@/hooks/web/useMessage';

export default defineComponent({
  components: { BasicModal },
  setup() {
    const title = ref('');
    const content = ref('');
    const id = ref(-1);
    const [register, { closeModal }] = useModalInner((data) => {
      data && onDataReceive(data);
    });
    const { createMessage } = useMessage();

    function onDataReceive(data) {
      title.value = data.title;
      content.value = filterXSS(data.content);
      if(data.id){
        id.value=data.id;
      }
      
    }

    const handleConfirm = () => {
      if(id.value>=0){
        readLatestBroadCastApi(id.value).then((_res)=>{
          createMessage.success("已读公告")
        })
      }
      closeModal();
    };
    return { register, title, content, handleConfirm };
  },
});
</script>
