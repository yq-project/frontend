import { otherHttp } from '/@/utils/http/axios';

enum Api {
  DEMO_LIST = '/api/info/?format=json',
}

/**
 * @description: Get sample list value
 */

export const demoListApi = () =>
  otherHttp({
    url: Api.DEMO_LIST,
    method: 'get',
  });
