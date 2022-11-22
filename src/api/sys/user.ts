import { authHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/login/',
  Logout = '/logout/',
  GetUserInfo = '/me/',
  GetPermCode = '/getPermCode',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return authHttp.post(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 检查用户登陆状态
export function getUserInfo() {
  return authHttp.get({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

// 这个接口不会使用，但删掉的话改动太大了
export function getPermCode() {
  return authHttp.get<string[]>({ url: Api.GetPermCode });
}

// 登出
export function doLogout() {
  return authHttp.get({ url: Api.Logout });
}
