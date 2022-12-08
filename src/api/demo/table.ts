import {authHttp, basicHttp, defHttp} from '/@/utils/http/axios';
import {DemoListGetResultModel, DemoParams} from './model/tableModel';
import {ErrorMessageMode} from '/#/axios';

enum Api {
  DEMO_LIST = '/table/getDemoList',
  DEMO_LIST2 = '/table/getDemoList2',
  INFO_LIST = '/info/?format=json',
  INFO_LIST2 = '/info',
  COMMENT_TASK_LIST = '/comment_task/?format=json',
  PROCESS_TASK_LIST = '/process_task',
  USER_LIST = '/user/',
}

/**
 * @description: Get sample list value
 */

export const demoListApi = (params: DemoParams) =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.DEMO_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export const demoListApi2 = (params: DemoParams) =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.DEMO_LIST2,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export function infoListApi(pageIndex: number, mode: ErrorMessageMode = 'modal') {
  return basicHttp.get(
    {
      url: Api.INFO_LIST2 + `/?page=${pageIndex}`,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function processTaskListApi(pageIndex: number, mode: ErrorMessageMode = 'modal') {
  return basicHttp.get(
    {
      url: Api.PROCESS_TASK_LIST + `/?page=${pageIndex}`,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// interface infoDetailParam {
//   infoId: number;
// }

export function infoApi(param, mode: ErrorMessageMode = 'modal') {
  return basicHttp.get(
    {
      url: Api.INFO_LIST2 + '/' + param + '/',
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function infoCloseApi(param, mode: ErrorMessageMode = 'modal') {
  return basicHttp.post(
    {
      url: Api.INFO_LIST2 + '/' + param + '/close/',
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function infoScoreApi(id, params, mode: ErrorMessageMode = 'modal') {
  return basicHttp.put(
    {
      url: Api.INFO_LIST2 + '/' + id + '/score/',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function infoAdviceApi(id, params, mode: ErrorMessageMode = 'modal') {
  return basicHttp.put(
    {
      url: Api.INFO_LIST2 + '/' + id + '/advise/',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function infoPassApi(param, mode: ErrorMessageMode = 'modal') {
  return basicHttp.post(
    {
      url: Api.INFO_LIST2 + '/' + param + '/pass_info/',
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function processTaskPassApi(param, mode: ErrorMessageMode = 'modal') {
  return basicHttp.post(
    {
      url: Api.PROCESS_TASK_LIST + '/' + param + '/pass_task/',
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function processTaskReadApi(id, params, mode: ErrorMessageMode = 'modal') {
  return basicHttp.post(
    {
      url: Api.PROCESS_TASK_LIST + '/' + id + '/read_task/',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function processTaskFeedbackApi(id, params, mode: ErrorMessageMode = 'modal') {
  return basicHttp.put(
    {
      url: Api.PROCESS_TASK_LIST + '/' + id + '/feedback/',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function processTaskApi(param, mode: ErrorMessageMode = 'modal') {
  return basicHttp.get(
    {
      url: Api.PROCESS_TASK_LIST + '/' + param + '/',
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function commentTaskListApi(pageIndex: number, mode: ErrorMessageMode = 'modal') {
  return basicHttp.get(
    {
      url: Api.COMMENT_TASK_LIST + `?page=${pageIndex}`,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function userListApi(pageIndex: number, mode: ErrorMessageMode = 'modal') {
  return authHttp.get(
    {
      url: Api.USER_LIST + `?page=${pageIndex}`,
    },
    {
      errorMessageMode: mode,
    },
  );
}
