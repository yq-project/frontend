import { RoleEnum } from '/@/enums/roleEnum';
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

// @ts-ignore
const dashboard: AppRouteModule = {
  path: '/infoManage',
  name: 'InfoManage',
  component: LAYOUT,
  redirect: '/infoManage/infoList',
  meta: {
    orderNo: 100,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.infoManage.infoManage'),
    roles: [RoleEnum.ADMIN],
  },
  children: [
    {
      path: 'infoList',
      name: 'InfoList',
      component: () => import('/@/views/admin/infoManage/InfoList.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.infoManage.infoList'),
      },
    },
    {
      path: 'toDoList',
      name: 'ToDoList',
      component: () => import('/@/views/admin/infoManage/ToDoList.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.infoManage.toDoList'),
      },
    },
    {
      path: 'score',
      name: 'Score',
      component: () => import('/@/views/admin/infoManage/Score.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.infoManage.score'),
      },
    },
    {
      path: 'assignment',
      name: 'Assignment',
      component: () => import('/@/views/admin/infoManage/Assignment.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.infoManage.assignment'),
      },
    },
    {
      path: 'infoDetail',
      name: 'InfoDetail',
      component: () => import('/@/views/admin/infoManage/InfoDetail.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('routes.dashboard.infoManage.infoDetail'),
      },
    },
    {
      path: 'processTaskList',
      name: 'ProcessTaskList',
      component: () => import('/@/views/admin/infoManage/processTaskList.vue'),
      meta: {
        // affix: true,
        // hideMenu: true,
        title: t('routes.dashboard.infoManage.processTaskList'),
      },
    },
  ],
};

export default dashboard;
