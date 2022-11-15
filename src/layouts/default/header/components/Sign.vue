<template>
  <Tooltip :title="getTitle" placement="bottom" :mouseEnterDelay="0.5">
    <span @click="handleClick">
      <EditOutlined />
    </span>
  </Tooltip>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Tooltip } from 'ant-design-vue';

  import { EditOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    name: 'FullScreen',
    components: { EditOutlined, Tooltip },

    setup() {
      const getTitle = '签到';
      const handleClick = () => {
        console.log('sign');
      };

      return {
        getTitle,
        handleClick,
      };
    },
  });
</script>
