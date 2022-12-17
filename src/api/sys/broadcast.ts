import { basicHttp } from '/@/utils/http/axios';

enum Api {
  GETBROADCASTLIST = '/broadcast/',
}

export const getBroadcastListApi = (pageIndex: number) =>
  basicHttp.get({
    url: Api.GETBROADCASTLIST + `?page=${pageIndex}`,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export const readLatestBroadCastApi = (id: number) =>
basicHttp.post({
  url: Api.GETBROADCASTLIST + `${id}/read_latest/`,
  headers: {
    // @ts-ignore
    ignoreCancelToken: true,
  },
});