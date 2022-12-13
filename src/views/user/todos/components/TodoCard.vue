<template>
  <Card title="待办事务" v-bind="$attrs">
    <template v-for="item in tasks" :key="item">
      <CardGrid class="!md:w-1/3 !w-full" @click="handleClick(item.id)">
        <span class="flex">
          <Icon icon="carbon:task-add" :color="item.color" size="30" />
          <span class="text-lg ml-4">舆情名称</span>
        </span>
        <div class="flex mt-2 h-10 text-secondary">参考口径</div>
        <div class="flex justify-between text-secondary">
          <span>{{ item.created_at }}</span>
        </div>
      </CardGrid>
    </template>
  </Card>
</template>
<script lang="ts">
import {defineComponent, ref, Ref} from 'vue';
import {Card} from 'ant-design-vue';
import {Icon} from '/@/components/Icon';
import {useRouter} from 'vue-router';
import {getTodoTaskListApi} from '/@/api/sys/commentTask';

export default defineComponent({
    components: { Card, CardGrid: Card.Grid, Icon },
    setup() {
      const router = useRouter();
      const tasks: Ref<any[]> = ref([]);
      const colors = ['#00d8ff', '#3fb27f', '#e18525', '#bf0c2c', ''];
      const getTodoTasks = () => {
        getTodoTaskListApi().then(
          (res) => {
            res.results.forEach((item, index) => {
              let date = new Date(item.created_at);
              item.created_at = `${date.getFullYear()}年${
                date.getMonth() + 1
              }月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`;
              item.color = colors[index % 5];
            });
            tasks.value = res.results;
          },
          (_err) => {},
        );
      };
      getTodoTasks();
      const handleClick = (id) => {
        router.push(`/user/infomanage/task?id=${id}`);
      };
      return { tasks, handleClick, colors };
    },
  });
</script>
