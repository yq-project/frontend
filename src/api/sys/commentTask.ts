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

export function getTodoTaskListApi(page: number, mode: ErrorMessageMode = 'modal') {
  return basicHttp.get(
    {
      url: Api.GETLIST + `?page=${page}`,
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
