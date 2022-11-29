<template>
  <BasicModal v-bind="$attrs" :title="title" @register="register">
    <div v-html="content"></div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { filterXSS } from 'xss';
  export default defineComponent({
    components: { BasicModal },
    setup() {
      const title = ref('');
      const content = ref('');
      const [register] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data) {
        title.value = data.title;
        content.value = filterXSS(data.content);
      }
      return { register, title, content };
    },
  });
</script>
