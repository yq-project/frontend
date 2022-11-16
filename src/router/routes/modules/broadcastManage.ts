import { RoleEnum } from '/@/enums/roleEnum';
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/announcement',
  name: 'Announcement',
  component: LAYOUT,
  redirect: '/announcement/uploadAnnouncement',
  meta: {
    orderNo: 110,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.announcement'),
    roles: [RoleEnum.ADMIN],
  },
  children: [
    {
      path: 'uploadAnnouncement',
      name: 'UploadAnnouncement',
      component: () => import('/@/views/admin/announcementManage/upload.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.uploadAnnouncement'),
      },
    },
    {
      path: 'updateAnnouncement',
      name: 'UpdateAnnouncement',
      component: () => import('/@/views/admin/announcementManage/update.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.updateAnnouncement'),
      },
    },
  ],
};

export default dashboard;
