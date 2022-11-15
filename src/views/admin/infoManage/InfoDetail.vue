<template>
  <PageWrapper title="舆情主题：XXX" contentBackground>
    <template v-if="status === '1'" #extra>
      <a-button> 退回修改 </a-button>
      <a-button> 中止流程 </a-button>
      <a-button type="primary"> 审核通过 </a-button>
    </template>
    <template v-else-if="status === '2'" #extra>
      <a-button> 发布任务 </a-button>
      <a-button type="primary" @click="cancelNotification"> 撤回通知 </a-button>
    </template>

    <div class="pt-4 m-4 desc-wrap">
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="创建人"> 曲丽丽 </a-descriptions-item>
        <a-descriptions-item label="信息种类"> XXX </a-descriptions-item>
        <a-descriptions-item label="涉及单位"> XXX </a-descriptions-item>
        <a-descriptions-item label="源链接">
          <a href="https://www.zhihu.com/">https://www.zhihu.com/</a>
        </a-descriptions-item>
        <a-descriptions-item label="上传日期"> 2022-11-13 </a-descriptions-item>
        <a-descriptions-item label="备注"> XXX </a-descriptions-item>
      </a-descriptions>
      <a-card title="流程进度" :bordered="false">
        <a-steps :current="status" progress-dot size="small">
          <a-step title="上传信息">
            <template #description>
              <div>Vben</div>
              <p>2016-12-12 12:32</p>
            </template>
          </a-step>
          <a-step title="老师审核">
            <template #description>
              <p>Chad</p>
            </template>
          </a-step>
          <a-step title="通知二级领导" />
          <a-step title="流程结束" />
        </a-steps>
      </a-card>

      <a-card title="舆情具体内容" :bordered="false" class="mt-5">
        <a-descriptions-item label="描述" :span="2">
          这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
        </a-descriptions-item>
      </a-card>

      <a-card title="截图" :bordered="false" class="mt-5">
        <a-descriptions-item label="截图" :span="2"> 此处是截图... </a-descriptions-item>
      </a-card>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Divider, Card, Descriptions, Steps, Tabs } from 'ant-design-vue';

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
      function cancelNotification() {
        status = '1';
      }
      return {
        status: '1',
        cancelNotification,
      };
    },
  });
</script>
