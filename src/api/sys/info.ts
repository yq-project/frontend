import { basicHttp } from '/@/utils/http/axios';

enum Api {
  CREATE = '/info/',
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
