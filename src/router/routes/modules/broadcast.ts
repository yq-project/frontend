import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/broadcasts',
  name: 'broadcasts',
  component: LAYOUT,
  redirect: '/broadcasts/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'icon-park-outline:blackboard',
    title: '通知公告',
    orderNo: 3,
  },
  children: [
    {
      path: 'index',
      name: 'Broadcast',
      component: () => import('/@/views/common/broadcasts/index.vue'),
      meta: {
        title: '通知公告',
        icon: 'icon-park-outline:blackboard',
        hideMenu: false,
      },
    },
  ],
};

export default dashboard;
