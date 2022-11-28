import { basicHttp } from '/@/utils/http/axios';

enum Api {
  GETBROADCASTLIST = '/broadcast/',
}

export const getBroadcastListApi = () =>
  basicHttp.get({
    url: Api.GETBROADCASTLIST,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
