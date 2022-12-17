import { ErrorMessageMode } from '/#/axios';
import { basicHttp } from '/@/utils/http/axios';

enum Api {
  GETLIST = '/comment_task/',
}

export function getTaskListApi(page: number, mode: ErrorMessageMode = 'modal') {
  return basicHttp.get(
    {
      url: Api.GETLIST + `?page=${page}`,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getTodoTaskListApi( mode: ErrorMessageMode = 'modal') {
  return basicHttp.get(
    {
      url: Api.GETLIST + `?open_only=true`,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getTaskApi(id: number, mode: ErrorMessageMode = 'modal') {
  return basicHttp.get(
    {
      url: Api.GETLIST + `${id}/`,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function feedbackTaskApi(id: number,params, mode: ErrorMessageMode = 'modal') {
  return basicHttp.put(
    {
      url: Api.GETLIST + `${id}/feedback/`,
      params
    },
    {
      errorMessageMode: mode,
    },
  );
}
