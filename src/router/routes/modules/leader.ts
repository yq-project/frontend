import { RoleEnum } from '/@/enums/roleEnum';
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

// @ts-ignore
const dashboard: AppRouteModule = {
  path: '/leader',
  name: 'Leader',
  component: LAYOUT,
  redirect: '/infoManage/infoList',
  meta: {
    orderNo: 100,
    icon: 'ion:grid-outline',
    title: '待处理任务',
    roles: [RoleEnum.LEADER],
  },
  children: [
    {
      path: 'processTaskList',
      name: 'ProcessTaskList',
      component: () => import('/@/views/leader/processTaskList.vue'),
      meta: {
        // affix: true,
        // hideMenu: true,
        title: t('routes.dashboard.infoManage.processTaskList'),
      },
    },
    {
      path: 'processTaskDetail',
      name: 'ProcessTaskDetail',
      component: () => import('/@/views/leader/processTaskDetail.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('routes.dashboard.infoManage.processTaskDetail'),
      },
    },
  ],
};

export default dashboard;
