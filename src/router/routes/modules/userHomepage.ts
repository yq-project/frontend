import { RoleEnum } from '/@/enums/roleEnum';
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/user/homepage',
  name: 'userHomepage',
  component: LAYOUT,
  redirect: '/user/homepage/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'clarity:dashboard-line',
    title: '主页',
    orderNo: 1000,
    roles: [RoleEnum.USER],
  },
  children: [
    {
      path: 'index',
      name: 'HomePage',
      component: () => import('/@/views/user/homepage/index.vue'),
      meta: {
        title: '主页',
        icon: 'clarity:dashboard-line',
        hideMenu: false,
      },
    },
  ],
};

export default dashboard;
