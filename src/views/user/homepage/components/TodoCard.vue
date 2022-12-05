<template>
  <Card title="待办事务" v-bind="$attrs">
    <template #extra>
      <a-button type="link" size="small" @click="goMore">更多</a-button>
    </template>

    <template v-for="item in items" :key="item">
      <CardGrid class="!md:w-1/3 !w-full">
        <span class="flex">
          <Icon icon="carbon:task-add" :color="item.color" size="30" />
          <span class="text-lg ml-4">舆情名称</span>
        </span>
        <div class="flex mt-2 h-10 text-secondary">参考口径</div>
        <div class="flex justify-between text-secondary">
          <span>{{ item.date }}</span>
        </div>
      </CardGrid>
    </template>
  </Card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Card } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { groupItems } from './data';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: { Card, CardGrid: Card.Grid, Icon },
    setup() {
      const router=useRouter();
      const goMore=()=>{
        router.push("/user/infomanage/todos");
      }
      return { items: groupItems,goMore };
    },
  });
</script>
