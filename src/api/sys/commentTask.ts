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
