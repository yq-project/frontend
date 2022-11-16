import { RoleEnum } from '/@/enums/roleEnum';
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/statsAnalysis',
  name: 'StatsAnalysis',
  component: LAYOUT,
  redirect: '/statsAnalysis/infoNum',
  meta: {
    orderNo: 120,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.statsAnalysis'),
    roles: [RoleEnum.ADMIN],
  },
  children: [
    {
      path: 'infoNum',
      name: 'InfoNum',
      component: () => import('/@/views/admin/analysis/infoNum.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.infoNum'),
      },
    },
    {
      path: 'infoKind',
      name: 'InfoKind',
      component: () => import('/@/views/admin/analysis/infoKind.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.infoKind'),
      },
    },
    {
      path: 'department',
      name: 'Department',
      component: () => import('/@/views/admin/analysis/department.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.department'),
      },
    },
    {
      path: 'attendance',
      name: 'Attendance',
      component: () => import('/@/views/admin/analysis/attendance.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.attendance'),
      },
    },
  ],
};

export default dashboard;
