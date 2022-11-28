import { authHttp, basicHttp } from '/@/utils/http/axios';
import { AccountParams } from './model/accountModel';
import { ErrorMessageMode } from '/#/axios';
import { BroadcastParams } from './model/broadcastModel';

enum Api {
  USER = '/user/',
  BROADCAST = '/broadcast/',
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

export function CreateBroadcastApi(params: BroadcastParams, mode: ErrorMessageMode = 'modal') {
  return basicHttp.post(
    {
      url: Api.BROADCAST,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function broadcastListApi(mode: ErrorMessageMode = 'modal') {
  const response = basicHttp.get(
    {
      url: Api.BROADCAST,
    },
    {
      errorMessageMode: mode,
    },
  );
  return response;
}

export function DeleteBroadcastApi(id, mode: ErrorMessageMode = 'modal') {
  return basicHttp.delete(
    {
      url: Api.BROADCAST + id + '/',
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function UpdateBroadcastApi(params: AccountParams, id) {
  return basicHttp.put({
    url: Api.BROADCAST + id + '/',
    params,
  });
}
