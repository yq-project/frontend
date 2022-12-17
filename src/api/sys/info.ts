import { ErrorMessageMode } from '/#/axios';
import { basicHttp } from '/@/utils/http/axios';

enum Api {
  CREATE = '/info/',
  GETLIST = '/info/',
  GET = '/info/',
  UPDATE = '/info/',
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

export function getInfoApi(id: number, mode: ErrorMessageMode = 'modal') {
  return basicHttp.get(
    {
      url: Api.GET + `${id}/`,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function updateInfoApi(id: number,params, mode: ErrorMessageMode = 'modal') {
  return basicHttp.put(
    {
      url: Api.UPDATE + `${id}/`,
      params
    },
    {
      errorMessageMode: mode,
    },
  );
}
