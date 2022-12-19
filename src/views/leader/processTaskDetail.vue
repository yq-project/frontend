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
        <a-steps :current="state" progress-dot size="small">
          <a-step title="收到信息">
            <template #description>
              <p>{{ infoData.created_at }}</p>
            </template>
          </a-step>
          <a-step title="待反馈" />
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
    <FeedbackModal @register="register4" :update="back" />
  </PageWrapper>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Descriptions, Divider, Steps, Tabs } from 'ant-design-vue';
  import { processTaskApi } from '/@/api/demo/table';
  import FeedbackModal from './FeedbackModal.vue';
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
      FeedbackModal,
    },
    setup() {
      const data = ref([]);
      const infoData = ref([]);
      const route = useRoute();
      const router = useRouter();
      const param = route.query.infoId;
      const state = computed(() => {
        if (data.value.state != 3) return data.value.state;
        else return data.value.state + 1;
      });
      const title = computed(() => {
        return '舆情主题：' + infoData.value.subject;
      });
      const [register4, { openModal: openModal4 }] = useModal();
      const callback = (res) => {
        data.value = res;
        infoData.value = data.value.info;
        let date = new Date(infoData.value.created_at);
        infoData.value.created_at = `${date.getFullYear()}年${
          date.getMonth() + 1
        }月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`;
        // console.log(data.value.state);
      };
      processTaskApi(param).then(callback);
      function back() {
        router.push('/leader/processTaskList');
      }
      function linkDownload(url) {
        window.open(url, '_blank'); // 新窗口打开外链接
      }
      function update() {
        processTaskApi(param).then(callback);
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
        state,
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
