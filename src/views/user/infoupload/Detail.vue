<template>
  <PageWrapper title="舆情信息详情">
    <template #extra>
      <a-button @click="cancel"> 返回 </a-button>
      <a-button @click="handleSubmit"> 修改 </a-button>
    </template>
    <a-card :bordered="false">
      <BasicForm @register="register" />
    </a-card>
    <a-card title="流程进度" :bordered="false">
        <a-steps :current="step.currentStep" progress-dot size="small">
          <a-step :title="step.step1Name">
            <template #description>
              <p>{{step.time1}}</p>
            </template>
          </a-step>
          <a-step :title="step.step2Name">
            <template #description>
              <p>{{step.time2}}</p>
            </template>
          </a-step>
          <a-step title="完成" />
        </a-steps>
      </a-card>
      <a-card title="截图信息" :bordered="false">
      <ImagePreview v-if="showImg" :imageList="[imageUrl]" />
      <BasicUpload
        :maxSize="20"
        :maxNumber="1"
        @change="handleChange"
        :api="uploadApi"
        class="my-5"
        :accept="['png', 'jpg', 'jpeg']"
      />
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { defineComponent, ref, Ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Steps,  } from 'ant-design-vue';
  import { schemas } from './data';
  import { BasicUpload } from '/@/components/Upload';
  import { uploadApi } from '/@/api/sys/upload';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { updateInfoApi, getInfoApi } from '/@/api/sys/info';
  import { useRouter, useRoute } from 'vue-router';
  import { ImagePreview } from '/@/components/Preview/index';

  export default defineComponent({
    name: 'FormHightPage',
    components: { BasicForm, BasicUpload, PageWrapper, [Card.name]: Card, ImagePreview,[Steps.name]: Steps,
      [Steps.Step.name]: Steps.Step, },
    setup() {
      const imageList: Ref<any[]> = ref([]);
      const router = useRouter();
      const route = useRoute();
      const [register, { validate, setFieldsValue }] = useForm({
        layout: 'vertical',
        schemas: schemas,
        showActionButtonGroup: false,
      });
      const step=ref({
        step1Name:"上传舆情",
        step2Name:"审核",
        time1:"",
        time2:"",
        currentStep:1
      })
      const calTime=(time)=>{
        let date = new Date(time);
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
      }
      async function handleSubmit() {
        const formdata = await validate();
        let data:any={}
        data.subject=formdata.subject
        data.content=formdata.content
        data.department=formdata.department
        data.infoUrl=formdata.infoUrl
        data.infoType=formdata.infoType
        data.tip=formdata.tip
        if (imageList.value.length == 1) {
          data.picture = imageList.value[0];
          updateInfoApi(parseInt(route.query.id as string),data).then((_res) => {
            createMessage.success(`信息已更新`);
            router.push('/user/infomanage/upload');
          });
        } else {
          updateInfoApi(parseInt(route.query.id as string),data).then((_res) => {
            createMessage.success(`信息已更新`);
            router.push('/user/infomanage/upload');
          });
        }
      }
      const cancel = () => {
        router.push('/user/infomanage/upload');
      };
      const { createMessage } = useMessage();
      const showImg = ref(false);
      const imageUrl = ref('');
      const handleChange = (list: string[]) => {
        imageList.value = list;
        showImg.value=false;
        createMessage.info(`截图已保存`);
      };
      if (route.query.id) {
        getInfoApi(parseInt(route.query.id as string)).then((res) => {
          step.value.time1=calTime(res.created_at)
          if(res.state==0){
            step.value.currentStep=1
            step.value.step1Name="请修改后重新上传"
          }
          if(res.state==1){
            step.value.currentStep=0
          }
          if(res.state==2){
            step.value.currentStep=2
          }
          if(res.state==3){
            step.value.step2Name="管理员终止流程"
            step.value.currentStep=1
          }
          step.value.currentStep=res.state+1
          setFieldsValue(res);
          showImg.value = true;
          imageUrl.value = res.picture;
        });
      } else {
        router.push('/user/infomanage/upload');
      }
      return { step, showImg, imageUrl, handleSubmit, register, uploadApi, handleChange, cancel, imageList };
    },
  });
</script>
<style lang="less" scoped></style>
