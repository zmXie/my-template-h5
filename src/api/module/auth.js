/**
 * 授权微服务
 * Created by DELL on 2020/6/23.
 */
import request from '@/plugin/axios'
import Qs from 'qs'
import store from '@/store'
let baseUrl = process.env.VUE_APP_API;
let authServer = 'scp-auth';

export default {
  // 账号密码登录
  loginUsePwd (params) {
    return request({ url: `${authServer}/auth2/loginUsePwd`, method: 'post', data: params });
  },
  // 手机-短信验证码登录
  smsLogin(params) {
    return request({ url: `${authServer}/auth2/loginUseSmsCode`, method: 'post', data: params });
  },
}
