import { RoleEnum } from '/@/enums/roleEnum';
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/user/infomanage',
  name: 'userinfomanage',
  component: LAYOUT,
  redirect: '/user/infomanage/infoupload',
  meta: {
    hideChildrenInMenu: false,
    icon: 'ic:sharp-manage-accounts',
    title: '信息管理',
    orderNo: 1020,
    roles: [RoleEnum.USER],
  },
  children: [
    {
      path: 'upload',
      name: 'Upload',
      component: () => import('/@/views/user/infoupload/index.vue'),
      meta: {
        title: '信息上传',
        icon: 'bx:upload',
        hideMenu: false,
      },
    },
    {
      path: 'todos',
      name: 'Todos',
      component: () => import('/@/views/user/todos/index.vue'),
      meta: {
        title: '待办事务',
        icon: 'ri:calendar-todo-fill',
        hideMenu: false,
      },
    },
    {
      path: 'task',
      name: 'Task',
      component: () => import('/@/views/user/detailedtask/index.vue'),
      meta: {
        title: '任务详情',
        hideMenu: true,
        hideBreadcrumb: true,
      },
    },
    {
      path: 'uploadform',
      name: 'Uploadform',
      component: () => import('/@/views/user/infoupload/upload.vue'),
      meta: {
        title: '信息上传',
        hideMenu: true,
        hideBreadcrumb: true,
      },
    },
  ],
};

export default dashboard;
