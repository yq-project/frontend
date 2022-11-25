import { defHttp, basicHttp } from '/@/utils/http/axios';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';
import {ErrorMessageMode} from "/#/axios";

enum Api {
  DEMO_LIST = '/table/getDemoList',
  DEMO_LIST2 = '/table/getDemoList2',
  INFO_LIST = '/info/?format=json',
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

export function infoListApi(mode: ErrorMessageMode = 'modal') {
  const response = basicHttp.get(
    {
      url: Api.INFO_LIST,
    },
    {
      errorMessageMode: mode,
    },
  );
  return response;
}
