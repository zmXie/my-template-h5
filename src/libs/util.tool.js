const Base64 = require('js-base64').Base64;
/**
 * Created by DELL on 2020/3/3.
 */
export default {
  /**
   * 解析jwt_token
   * @param token
   */
  parseJwtToken (token) {
    try {
      let jwts = token.split('.');
      let jwt = {};
      jwt.header = JSON.parse(Base64.decode(jwts[0]));
      jwt.payload = JSON.parse(Base64.decode(jwts[1]));
      jwt.signature = jwts[2];
      jwt.token = token;
      return jwt;
    } catch (e) {
      console.warn('解析token出错' + e);
      return null;
    }
  },
  /*创建worker线程*/
  createWorker(f) {
    let blob = new Blob(['(' + f.toString() + ')()']);
    let url = window.URL.createObjectURL(blob);
    let worker = new Worker(url);
    return worker;
  }
}
