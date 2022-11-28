import { authHttp } from '/@/utils/http/axios';
import { AccountParams } from './model/accountModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  USER = '/user/',
}

export function CreateUserApi(params: AccountParams, mode: ErrorMessageMode = 'modal') {
  return authHttp.post(
    {
      url: Api.USER,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function UpdateUserApi(params: AccountParams, id) {
  return authHttp.put({
    url: Api.USER + id + '/',
    params,
  });
}

export function DeleteUserApi(id, mode: ErrorMessageMode = 'modal') {
  return authHttp.delete(
    {
      url: Api.USER + id + '/',
    },
    {
      errorMessageMode: mode,
    },
  );
}
