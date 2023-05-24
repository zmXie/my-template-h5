/**
 * 授权微服务
 */
import request from "@/plugin/axios";
import Qs from "qs";
let basicServer = "scp-basic";
export default {
  //发送手机验证码
  sendSmsCode(params) {
    let queryStr = Qs.stringify(params, { arrayFormat: "repeat" });
    return request({
      url: `${basicServer}/sms/open/sendSmsCode?${queryStr}`,
      method: "post",
      isHideLoading: true,
    });
  },
  //获取七牛上传凭证 POST
  getQiniuToken(params) {
    return request({
      url: `/${basicServer}/qiniu/getQiniuToken`,
      method: "post",
      data: params,
      isHideLoading: true,
    });
  },
};
