/* 是否为空值 */
export function isValueNull(value) {
  if (!value) {
    return false;
  }
  return true;
}

/**
 * [validPhone 合法手机号]
 * @param  {[type]} phone [description]
 * @return {[type]}       [description]
 */
export function validPhone(value) {
  return /^1[3-9]\d{9}$/.test(value);
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validEmail(email) {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}
