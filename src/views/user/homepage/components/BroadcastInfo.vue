<template>
  <Card title="通知公告" v-bind="$attrs">
    <template #extra>
      <a-button type="link" size="small" @click="goMore">更多</a-button>
    </template>
    <List item-layout="horizontal" :data-source="listData">
      <template #renderItem="{ item }">
        <ListItem @click="handleClick(item)">
          <ListItemMeta>
            <template #description>
              {{ item.date }}
            </template>
            <!-- eslint-disable-next-line -->
            <template #title> {{ item.name }} <span v-html="item.desc"> </span> </template>
            <template #avatar>
              <Icon :icon="item.avatar" :size="30" />
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </Card>
  <Modal @register="registerModal" />
</template>
<script lang="ts" setup>
import { Card, List } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { useRouter } from 'vue-router';
import { getBroadcastListApi } from '/@/api/sys/broadcast';
import { reactive } from 'vue';
import { useModal } from '/@/components/Modal';
import { useUserStore } from '/@/store/modules/user';
import Modal from './modal.vue';

const router = useRouter();
const userStore = useUserStore();
const goMore = () => {
  router.push('/broadcasts/index');
};
const avatars = [
  'dynamic-avatar-1|svg',
  'dynamic-avatar-2|svg',
  'dynamic-avatar-3|svg',
  'dynamic-avatar-4|svg',
];
const listData = reactive([]);
const [registerModal, { openModal: openModal }] = useModal();

getBroadcastListApi(1).then((res) => {
  let data = res.results;
  if (data.length > 6) {
    data.splice(6, data.length - 6);
  }
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let obj: any = {};
    obj.id = item.id;
    obj.avatar = avatars[i % avatars.length];
    obj.name = '管理员';
    let date = new Date(item.created_at);
    let format = `${date.getFullYear()}年${
      date.getMonth() + 1
    }月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`;
    obj.date = format;
    obj.desc = `发布了通知 <a>${item.title}</a>`;
    obj.content = item.content;
    obj.title = item.title;
    //@ts-ignore
    listData.push(obj);
  }
});

setTimeout(() => {
  const userinfo = userStore.userInfo;
  //@ts-ignore
  if (userinfo.role[0].value == 'user' && userinfo.read == false && listData.length > 0) {
    openModal(true, {
      title: listData[0].title,
      content: listData[0].content,
      id: listData[0].id,
    });
  }
}, 1500);

const handleClick=(item)=>{
  openModal(true, {
      title: item.title,
      content: item.content,
    });
}

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;
</script>
