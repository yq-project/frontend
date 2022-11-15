import { RoleEnum } from '/@/enums/roleEnum';
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/userManage',
  name: 'UserManage',
  component: LAYOUT,
  redirect: '/userManage/userList',
  meta: {
    orderNo: 130,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.userManage'),
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
  ],
};

export default dashboard;
