<template>
  <PageWrapper title="网评任务详情" contentBackground>
    <template #extra>
      <a-button @click="cancel"> 返回 </a-button>
      <a-button type="primary"  @click="handleSubmit">提交</a-button>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="舆情名称">{{info.subject}}</a-descriptions-item>
        <a-descriptions-item label="舆情日期">{{info.created_at}} </a-descriptions-item>
        <a-descriptions-item label="舆情链接"> <a>{{info.infoUrl}}</a> </a-descriptions-item>
        <a-descriptions-item label="任务发布人"> {{creator}} </a-descriptions-item>
        <a-descriptions-item label="任务发布时间"> {{info.created_at}} </a-descriptions-item>
        <a-descriptions-item label="参考口径">
          {{info.advice}}
        </a-descriptions-item>
      </a-descriptions>
      <a-card title="舆情详情"> {{info.content}} </a-card>
      <a-card title="舆情截图">
        <ImagePreview :imageList="imgList" />
      </a-card>
      <a-card title="流程进度" :bordered="false">
        <a-steps :current="step.currentStep" progress-dot size="small">
          <a-step title="上传舆情">
            <template #description>
              <p>{{step.time1}}</p>
            </template>
          </a-step>
          <a-step title="发布网评任务">
            <template #description>
              <p>{{step.time2}}</p>
            </template>
          </a-step>
          <a-step title="填写任务反馈">
            <template #description>
              <p>{{step.time3}}</p>
            </template>
          </a-step>
          <a-step title="完成" />
        </a-steps>
      </a-card>

      <a-card title="填写反馈" class="my-5">
        <TextArea :rows="4" placeholder="请反馈任务完成情况" maxLength="200" v-model:value="feedback" />
      </a-card>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent,ref,reactive } from 'vue';
  import { useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Divider, Card, Descriptions, Steps, Tabs, Input } from 'ant-design-vue';
  import { ImagePreview } from '/@/components/Preview/index';
  import { Button } from '/@/components/Button';
  import { getTaskApi, feedbackTaskApi } from '/@/api/sys/commentTask';
  import { useRoute,useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { TextArea } = Input;
  export default defineComponent({
    components: {
      Button,
      ImagePreview,
      TextArea,
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
      const imgList: string[] = reactive([]);
      const info=ref({
        content:"",
        advice:"",
        created_at:"",
        subject:"",
        tip:"",
        infoUrl:"",
        id:-1
      });
      const step=ref({
        currentStep:2,
        time1:"",
        time2:"",
        time3:""
      })
      const {createMessage}=useMessage();
      const creator=ref("");
      const feedback=ref("")
      const route = useRoute();
      const router = useRouter();
      const calTime=(time)=>{
        let date = new Date(time);
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
      }

      getTaskApi(parseInt(route.query.id as string)).then((res) => {
        // 基本信息
        res.info.created_at = calTime(res.info.created_at);
        if(!res.info.advice){
          res.info.advice="无"
        }
        imgList.push(res.info.picture)
        info.value=res.info
        creator.value=res.creator

        // 进度
        let state=res.state;
        let time1 =res.info.created_at;
        let time2= calTime(res.created_at)
        step.value.currentStep=state+2
        step.value.time1=time1
        step.value.time2=time2
      });

      const handleSubmit=()=>{
        let params={
          feedback:feedback.value
        }
        feedbackTaskApi(parseInt(route.query.id as string),params).then((_res)=>{
          createMessage.success("反馈成功")
          router.push("/user/infomanage/todos")
        })
      }

      const cancel=()=>{
        router.push("/user/infomanage/todos")
      }

      return {
        imgList,
        info,
        step,
        creator,
        handleSubmit,
        feedback,
        cancel
      };
    },
  });
</script>

<style scoped>
  .submit {
    margin: 10px;
    float: right;
  }
</style>
