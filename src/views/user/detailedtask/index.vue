<template>
  <PageWrapper title="七彩花店事件" contentBackground>
    <div class="pt-4 m-4 desc-wrap">
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="舆情名称">七彩花店事件</a-descriptions-item>
        <a-descriptions-item label="舆情日期"> 2017-07-07 </a-descriptions-item>
        <a-descriptions-item label="舆情链接"> <a>baidu.com</a> </a-descriptions-item>
        <a-descriptions-item label="任务发布人"> 管理员A </a-descriptions-item>
        <a-descriptions-item label="任务发布时间"> 2017-07-10 </a-descriptions-item>
        <a-descriptions-item label="参考口径"> 请于两个工作日内确认 注意立场高度 </a-descriptions-item>
      </a-descriptions>
      <a-card title="舆情详情">
        aaaa
      </a-card>
      <a-card title="舆情截图">
        <ImagePreview :imageList="imgList" />
      </a-card>
      <a-card title="流程进度" :bordered="false">
        <a-steps :current="2" progress-dot size="small">
          <a-step title="上传舆情">
            <template #description>
              <p>2016-12-12 12:32</p>
            </template>
          </a-step>
          <a-step title="发布网评任务">
            <template #description>
              <p>2017-12-12 12:32</p>
            </template>
          </a-step>
          <a-step title="填写任务反馈" />
          <a-step title="完成" />
        </a-steps>
      </a-card>

      <a-card title="填写反馈" class="my-5">
        <TextArea rows="4" placeholder="请反馈任务完成情况" maxLength="200" />
        <Button type="primary" class="submit">提交</Button>
      </a-card>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Divider, Card, Empty, Descriptions, Steps, Tabs, Input } from 'ant-design-vue';
  import { createImgPreview, ImagePreview } from '/@/components/Preview/index';
  import { Input} from 'ant-design-vue';
  import { Button } from '/@/components/Button';
  import { refundTimeTableSchema, refundTimeTableData } from './data';
  
  const {TextArea}=Input;
  export default defineComponent({
    components: {
      Button,
      ImagePreview,
      TextArea,
      BasicTable,
      PageWrapper,
      [Divider.name]: Divider,
      [Card.name]: Card,
      Empty,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      [Steps.name]: Steps,
      [Steps.Step.name]: Steps.Step,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      const imgList: string[] = [
    'https://picsum.photos/id/66/346/216',
  ];
      const [registerTimeTable] = useTable({
        title: '退货进度',
        columns: refundTimeTableSchema,
        pagination: false,
        dataSource: refundTimeTableData,
        showIndexColumn: false,
        scroll: { y: 300 },
      });

      return {
        imgList,
        registerTimeTable,
      };
    },
  });
</script>

<style scoped>
.submit{
  margin: 10px;
  float: right;
}
</style>