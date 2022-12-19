<template>
  <PageWrapper :title="title" contentBackground>
    <template v-if="state === 1" #extra>
      <a-button @click="back"> 返回 </a-button>
      <a-button class="my-4" @click="handleRefunded"> 退回修改 </a-button>
      <a-button @click="close"> 中止流程 </a-button>
      <a-button type="primary" @click="pass"> 审核通过 </a-button>
    </template>
    <template v-else-if="state === 2" #extra>
      <a-button @click="back"> 返回 </a-button>
      <a-button @click="handleAllocate"> 发布任务 </a-button>
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
          <a class="a-style" @click="linkDownload(data.infoUrl)">{{ data.infoUrl }}</a>
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
        <a-steps v-if="state === 4" :current="1" progress-dot size="small">
          <a-step title="上传信息">
            <template #description>
              <p>{{ data.created_at }}</p>
            </template>
          </a-step>
          <a-step title="学生撤回信息" />
        </a-steps>
        <a-steps v-if="state !== 3 && state !== 4" :current="sumState" progress-dot size="small">
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
        <a-descriptions-item label="截图" :span="2">
          <img :src="data.picture" style="width: 800px" />
        </a-descriptions-item>
      </a-card>
      <BasicTable @register="registerTimeTable" />
    </div>
    <RefundedModal @register="registerRefundedModal" :update="update" />
    <AllocateModal @register="registerAllocateModal" :update="update" />
  </PageWrapper>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Descriptions, Divider, Steps, Tabs } from 'ant-design-vue';
  import {
    infoApi,
    infoPassApi,
    processTaskApi,
    infoCloseApi,
    processTaskPassApi,
    userListApi,
    commentTaskApi,
  } from '/@/api/demo/table';
  import RefundedModal from './RefundedModal.vue';
  import AllocateModal from './AllocateModal.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useModal } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table/src/types/table';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTable,
      [Divider.name]: Divider,
      [Card.name]: Card,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      [Steps.name]: Steps,
      [Steps.Step.name]: Steps.Step,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
      RefundedModal,
      AllocateModal,
    },
    setup() {
      const data = ref([]);
      const processTaskData = ref([]);
      const commentTaskData = ref([]);
      const commentTaskUser = ref([]);
      const route = useRoute();
      const router = useRouter();
      const param = route.query.infoId;
      const title = computed(() => {
        return '舆情主题：' + data.value.subject;
      });
      const memberListAll: LabelValueOptions = [];
      const memberList: LabelValueOptions = [];
      const _memberList: LabelValueOptions = [];

      const [registerRefundedModal, { openModal: openRefundedModal }] = useModal();
      const [registerAllocateModal, { openModal: openAllocateModal }] = useModal();
      const callback = (res) => {
        data.value = res;
        let date = new Date(data.value.created_at);
        data.value.created_at = `${date.getFullYear()}年${
          date.getMonth() + 1
        }月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`;
        // console.log(data.value);
        if (data.value.state == 2) {
          processTaskApi(data.value.process_id).then((res) => {
            processTaskData.value = res;
          });
        }
        userListApi(-1).then((res) => {
          res.forEach((item) => {
            // console.log(item);
            if (item.role == 1) {
              let tmp = { label: item.name, value: item.id };
              memberListAll.push(tmp);
            }
          });
          if (data.value.comment_id != null) {
            commentTaskApi(data.value.comment_id).then((res) => {
              commentTaskData.value = res;
              // console.log(commentTaskData.value.user);
              // console.log(memberListAll);
              memberListAll.forEach((member) => {
                let flag = false;
                commentTaskData.value.user.forEach((item) => {
                  if (member.value == item.user) {
                    _memberList.push(member.value);
                    item.user = member.label;
                    flag = true;
                  }
                });
                if (!flag) {
                  let _tmp = { label: member.label, value: member.value };
                  memberList.push(_tmp);
                }
              });
              // console.log(_memberList);
              commentTaskData.value.user.forEach((item) => {
                commentTaskUser.value.push({
                  user: item.user,
                  created_at: item.created_at,
                  feedback: item.feedback,
                  feedback_at: item.feedback_at,
                });
              });
            });
          } else {
            memberListAll.forEach((member) => {
              let _tmp = { label: member.label, value: member.value };
              memberList.push(_tmp);
            });
          }
        });
      };
      infoApi(param).then(callback);
      const processTaskState = computed(() => {
        return processTaskData.value.state; //老师审核通过，待二级领导反馈
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
          default:
            return 1;
        }
      });
      const sumState = computed(() => {
        if (state.value == 2) return 2 + processTaskState.value;
        return state.value;
      });
      function back() {
        router.push('/infoManage/infoList');
      }
      const close = async () => {
        // const param = route.query.infoId;
        await infoCloseApi(param);
        data.value = await infoApi(param);
      };
      const pass = async () => {
        // const param = route.query.infoId;
        await infoPassApi(param);
        data.value = await infoApi(param);
      };
      const passProcessTask = async () => {
        // const param = route.query.infoId;
        await processTaskPassApi(param);
        infoApi(param).then(callback);
      };
      function linkDownload(url) {
        window.open(url, '_blank'); // 新窗口打开外链接
      }
      function update() {
        infoApi(param).then(callback);
      }
      function handleRefunded() {
        openRefundedModal(true, {
          data: param,
          info: data.value.advice,
        });
      }

      function handleAllocate() {
        // console.log(data.value);
        // console.log(_memberList);
        openAllocateModal(true, {
          data: param,
          commentTaskId:data.value.comment_id,
          memberList: memberList,
          _memberList: _memberList,
        });
      }

      // const refundTimeTableData: any[] = [];
      // const refundTimeTableData = ref([
      //   {
      //     user: 'a',
      //     created_at: 'b',
      //     feedback: 'c',
      //     feedback_at: 'd',
      //   },
      // ]);
      // console.log(refundTimeTableData);
      // console.log(commentTaskUser);
      const refundTimeTableData = computed(() => {
        commentTaskUser.value.forEach((item) => {
          let date = new Date(item.created_at);
          item.created_at = `${date.getFullYear()}年${
            date.getMonth() + 1
          }月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`;
          if (item.feedback_at == null) {
            item.feedback = '待反馈';
            item.feedback_at = '暂无';
          } else {
            let _date = new Date(item.feedback_at);
            item.feedback_at = `${_date.getFullYear()}年${
              _date.getMonth() + 1
            }月${_date.getDate()}日 ${_date.getHours()}:${_date.getMinutes()}`;
          }
        });
        return commentTaskUser;
      });

      const refundTimeTableSchema: BasicColumn[] = [
        {
          title: '分配成员',
          width: 150,
          dataIndex: 'user',
        },
        {
          title: '发布时间',
          width: 150,
          dataIndex: 'created_at',
        },
        {
          title: '内容反馈',
          width: 150,
          dataIndex: 'feedback',
        },
        {
          title: '反馈时间',
          width: 150,
          dataIndex: 'feedback_at',
        },
      ];

      const [registerTimeTable] = useTable({
        title: '网评任务成员',
        columns: refundTimeTableSchema,
        pagination: false,
        dataSource: refundTimeTableData,
        showIndexColumn: false,
        scroll: { y: 300 },
      });

      return {
        update,
        linkDownload,
        registerTimeTable,
        title,
        processTaskData,
        processTaskState,
        commentTaskData,
        commentTaskUser,
        data,
        state,
        sumState,
        // advice,
        pass,
        passProcessTask,
        close,
        back,
        handleRefunded,
        handleAllocate,
        registerRefundedModal,
        registerAllocateModal,
      };
    },
  });
</script>
