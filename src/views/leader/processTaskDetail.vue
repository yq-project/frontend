<template>
  <PageWrapper :title="title" contentBackground>
    <template #extra>
      <a-button @click="back"> 返回 </a-button>
      <a-button v-if="data.state < 2" type="primary" @click="send"> 填写反馈 </a-button>
    </template>

    <div class="pt-4 m-4 desc-wrap">
      <a-descriptions size="default" :column="2">
        <a-descriptions-item label="创建人"> {{ infoData.creator }} </a-descriptions-item>
        <a-descriptions-item label="信息种类"> {{ infoData.infoType }} </a-descriptions-item>
        <a-descriptions-item label="涉及单位"> {{ infoData.department }} </a-descriptions-item>
        <a-descriptions-item label="源链接">
          <a class="a-style" @click="linkDownload(infoData.infoUrl)">{{ infoData.infoUrl }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="上传日期"> {{ infoData.created_at }} </a-descriptions-item>
        <a-descriptions-item label="备注"> {{ infoData.tip }} </a-descriptions-item>
      </a-descriptions>
      <a-card title="流程进度" :bordered="false">
        <a-steps :current="data.state" progress-dot size="small">
          <a-step title="收到信息">
            <template #description>
              <p>{{ infoData.created_at }}</p>
            </template>
          </a-step>
          <a-step title="待审核">
            <template v-if="data.state >= 2" #description>
              <p>二级领导反馈：{{ data.feedback }}</p>
            </template> </a-step
          >>
          <a-step title="审核通过" />
        </a-steps>
      </a-card>

      <a-card title="舆情具体内容" :bordered="false" class="mt-5">
        <a-descriptions-item label="描述" :span="2">
          {{ infoData.content }}
        </a-descriptions-item>
      </a-card>

      <a-card title="截图" :bordered="false" class="mt-5">
        <a-descriptions-item label="截图" :span="2">
          <img :src="infoData.picture" style="width: 800px" />
        </a-descriptions-item>
      </a-card>
    </div>
    <Modal4 @register="register4" :update="update" />
  </PageWrapper>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Descriptions, Divider, Steps, Tabs } from 'ant-design-vue';
  import { infoApi, processTaskApi } from '/@/api/demo/table';
  import Modal4 from './FeedbackModal.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useModal } from '/@/components/Modal';

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
      Modal4,
    },
    setup() {
      const data = ref([]);
      const infoData = ref([]);
      const route = useRoute();
      const router = useRouter();
      const param = route.query.infoId;
      const title = computed(() => {
        return '舆情主题：' + infoData.value.subject;
      });
      const [register4, { openModal: openModal4 }] = useModal();
      const callback = (res) => {
        data.value = res;
        infoData.value = data.value.info;
        // console.log(infoData);
      };
      processTaskApi(param).then(callback);
      function back() {
        router.push('/infoManage/processTaskList');
      }
      function linkDownload(url) {
        window.open(url, '_blank'); // 新窗口打开外链接
      }
      function update() {
        infoApi(param).then(callback);
      }
      function send() {
        openModal4(true, {
          data: param,
          info: data.value.feedback,
        });
      }
      return {
        update,
        linkDownload,
        title,
        data,
        infoData,
        back,
        send,
        register4,
        openModal4,
      };
    },
  });
</script>
