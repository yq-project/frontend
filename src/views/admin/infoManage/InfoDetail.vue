<template>
  <PageWrapper title="舆情主题：XXX" contentBackground>
    <template v-if="state === 1" #extra>
      <a-button @click="back"> 返回 </a-button>
      <a-button @click="advice"> 退回修改 </a-button>
      <a-button @click="close"> 中止流程 </a-button>
      <a-button type="primary" @click="pass"> 审核通过 </a-button>
    </template>
    <template v-else-if="state === 2" #extra>
      <a-button @click="back"> 返回 </a-button>
      <a-button> 发布任务 </a-button>
      <a-button v-if="processTaskState === 2" type="primary" @click="passProcessTask">
        审核通过
      </a-button>
    </template>
    <template v-else #extra>
      <a-button @click="back"> 返回 </a-button>
    </template>

    <div class="pt-4 m-4 desc-wrap">
      <a-descriptions size="default" :column="2">
        <a-descriptions-item label="创建人"> {{ data.creator }} </a-descriptions-item>
        <a-descriptions-item label="信息种类"> {{ data.infoType }} </a-descriptions-item>
        <a-descriptions-item label="涉及单位"> {{ data.department }} </a-descriptions-item>
        <a-descriptions-item label="源链接">
          <a href="https://www.zhihu.com/">{{ data.infoUrl }}/</a>
        </a-descriptions-item>
        <a-descriptions-item label="上传日期"> {{ data.created_at }} </a-descriptions-item>
        <a-descriptions-item label="备注"> {{ data.tip }} </a-descriptions-item>
      </a-descriptions>
      <a-card title="流程进度" :bordered="false">
        <a-steps v-if="state === 3" :current="state" progress-dot size="small">
          <a-step title="上传信息">
            <template #description>
              <p>{{ data.created_at }}</p>
            </template>
          </a-step>
          <a-step title="待老师审核" />
          <a-step title="老师结束流程" />
        </a-steps>
        <a-steps v-if="state === 4" :current="2" progress-dot size="small">
          <a-step title="上传信息">
            <template #description>
              <p>{{ data.created_at }}</p>
            </template>
          </a-step>
          <a-step title="待老师审核" />
          <a-step title="学生撤回信息" />
        </a-steps>
        <a-steps
          v-if="state !== 3 && state !== 4"
          :current="state + processTaskState"
          progress-dot
          size="small"
        >
          <a-step v-if="state !== 0" title="上传信息">
            <template #description>
              <p>{{ data.created_at }}</p>
            </template>
          </a-step>
          <a-step v-if="state === 0" title="待学生修改后再次上传">
            <template #description>
              <p>修改意见：{{ data.advice }}</p>
            </template>
          </a-step>
          <a-step title="待老师审核" />
          <a-step title="通知二级领导" />
          <a-step title="待二级领导反馈" />
          <a-step title="待老师审核">
            <template v-if="processTaskState === 2" #description>
              <p>二级领导反馈：{{ processTaskData.feedback }}</p>
            </template>
          </a-step>
          <a-step title="流程结束" />
        </a-steps>
      </a-card>

      <a-card title="舆情具体内容" :bordered="false" class="mt-5">
        <a-descriptions-item label="描述" :span="2">
          {{ data.content }}
        </a-descriptions-item>
      </a-card>

      <a-card title="截图" :bordered="false" class="mt-5">
        <a-descriptions-item label="截图" :span="2"> 此处是截图... </a-descriptions-item>
      </a-card>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Descriptions, Divider, Steps, Tabs } from 'ant-design-vue';
  import {
    infoApi,
    infoPassApi,
    infoAdviceApi,
    processTaskApi,
    infoCloseApi,
    processTaskPassApi,
  } from '/@/api/demo/table';
  import { useRoute, useRouter } from 'vue-router';

  export default defineComponent({
    components: {
      PageWrapper,
      [Divider.name]: Divider,
      [Card.name]: Card,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      [Steps.name]: Steps,
      [Steps.Step.name]: Steps.Step,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      let data = ref([]);
      let processTaskData = ref([]);
      const route = useRoute();
      const router = useRouter();
      const param = route.query.infoId;
      const callback = (res) => {
        data.value = res;
        if (data.value.state == 2) {
          processTaskApi(param).then((res) => {
            processTaskData.value = res;
          });
        }
      };
      infoApi(param).then(callback);
      const processTaskState = computed(() => {
        switch (
          processTaskData.value.state //老师审核通过，待二级领导反馈
        ) {
          case 0:
            return 0;
          case 1:
            return 1;
          case 2:
            return 2;
          case 3:
            return 3;
          default:
            return 0;
        }
      });
      const state = computed(() => {
        switch (data.value.state) {
          case 0:
            return 1; //待老师审核状态
          case 1:
            return 0; //待学生重新编辑
          case 2:
            return 2; //老师审核通过，待二级领导反馈
          case 3:
            return 3; //老师结束流程
          case 4:
            return 4; //学生撤回信息
        }
      });
      function back() {
        router.back();
      }
      const advice = async () => {
        const id = route.query.infoId;
        const params = {
          advice: 'lalalsdfkljsldfjskldfjsl',
        };
        await infoAdviceApi(id, params);
        data.value = await infoApi(param);
      };
      const close = async () => {
        const param = route.query.infoId;
        await infoCloseApi(param);
        data.value = await infoApi(param);
      };
      const pass = async () => {
        const param = route.query.infoId;
        await infoPassApi(param);
        data.value = await infoApi(param);
      };
      const passProcessTask = async () => {
        const param = route.query.infoId;
        await processTaskPassApi(param);
        infoApi(param).then(callback);
      };
      return {
        processTaskData,
        processTaskState,
        data,
        state,
        advice,
        pass,
        passProcessTask,
        close,
        back,
      };
    },
  });
</script>
