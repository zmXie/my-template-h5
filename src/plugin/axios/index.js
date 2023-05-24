import store from "@/store";
import axios from "axios";
import { openLoading, closeLoading } from "@/plugin/loading";
import util from "@/libs/util";
import Qs from "qs";
import { Dialog, Toast } from "vant";
let loadingDialog = null;

// 创建一个错误
function errorCreate(msg, isThrow = true) {
  const error = new Error(msg);
  errorLog(error);
  if (isThrow) {
    throw error;
  }
}

// 记录和显示错误
function errorLog(error) {
  // 打印到控制台
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }
  // 显示提示
  Dialog.alert({
    title: "提示",
    message: `${error.message}`,
    confirmButtonText: "知道了",
  }).then(() => {
    // on close
  });
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 25000, // 请求超时时间
});
service.defaults.paramsSerializer = function (params) {
  return Qs.stringify(params, { arrayFormat: "repeat" });
};

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理
    const jwtToken = store.state.frame.jwt.token;
    if (jwtToken) {
      config.headers.Authorization = `${jwtToken}`;
    }
    if (loadingDialog) {
      closeLoading(loadingDialog);
    }
    if (!config.isHideLoading) {
      loadingDialog = openLoading();
    }
    return config;
  },
  (error) => {
    // 发送失败
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    loadingDialog && closeLoading(loadingDialog);
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    const config = response.config;
    // 这个状态码是和后端约定的
    const { code, resultCode, resultMsg } = dataAxios;
    // 根据 code 进行判断
    if (code === undefined && resultMsg === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口
      return dataAxios;
    } else if (code !== undefined) {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case "2005":
        case "A0009": // token过期
        case "9992": // token失效
          errorCreate(
            `[ code: ${code} ] ${dataAxios.msg}: ${config.url}`,
            false
          );
          location.hash = "#/login";
          break;
        default:
          if (dataAxios.success === false) {
            if (!config.isHideErrorMessage) {
              errorCreate(`${dataAxios.message}`, false);
            }
          }
      }
      return dataAxios;
    } else {
      return dataAxios;
    }
  },
  (error) => {
    if (error && error.response) {
      let data = error.response.data || {};
      if (["9992", "2005", "A0009"].includes(data.code)) {
        location.hash = "#/login";
        return Promise.reject(error);
      }
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          error.message = "未授权，请登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = data.message || "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
          break;
      }
      if (data.message) {
        error.message = `${data.message} ${error.response.status}`;
      }
    }
    loadingDialog && closeLoading(loadingDialog);
    errorLog(error);
    return Promise.reject(error);
  }
);

export default service;
