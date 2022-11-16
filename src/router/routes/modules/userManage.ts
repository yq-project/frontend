import { RoleEnum } from '/@/enums/roleEnum';
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/userList',
  meta: {
    orderNo: 100,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.user'),
    roles: [RoleEnum.ADMIN],
  },
  children: [
    {
      path: 'userList',
      name: 'UserList',
      component: () => import('/@/views/admin/userManage/UseTable.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.userList'),
      },
    },
    {
      path: 'userManage',
      name: 'UserManage',
      component: () => import('/@/views/admin/userManage/EditCellTable.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.userManage'),
      },
    },
  ],
};

export default dashboard;
