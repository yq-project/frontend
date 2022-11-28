import { ErrorMessageMode } from '/#/axios';
import { basicHttp } from '/@/utils/http/axios';

enum Api {
  CREATE = '/info/',
  GETLIST = '/info/',
}

export function createInfoApi(params, mode: ErrorMessageMode = 'modal') {
  return basicHttp.post(
    {
      url: Api.CREATE,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getInfoListApi(page: number, mode: ErrorMessageMode = 'modal') {
  return basicHttp.get(
    {
      url: Api.GETLIST + `?page=${page}`,
    },
    {
      errorMessageMode: mode,
    },
  );
}
