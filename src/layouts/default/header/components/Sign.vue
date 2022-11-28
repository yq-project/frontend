<template>
  <Tooltip v-if="showSign" :title="getTitle" placement="bottom" :mouseEnterDelay="0.5">
    <span @click="handleClick">
      <EditOutlined />
    </span>
  </Tooltip>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { Tooltip } from 'ant-design-vue';

  import { EditOutlined } from '@ant-design/icons-vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'FullScreen',
    components: { EditOutlined, Tooltip },

    setup() {
      const getTitle = '签到';
      const { createMessage } = useMessage();
      const handleClick = () => {
        createMessage.success('签到成功');
      };
      const userStore = useUserStore();
      const showSign = computed(() => {
        const { role } = userStore.getUserInfo;
        if (role && role.length == 1) {
          return role[0].value == 'user';
        } else {
          return false;
        }
      });
      return {
        showSign,
        getTitle,
        handleClick,
      };
    },
  });
</script>
