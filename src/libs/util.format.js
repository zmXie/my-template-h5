import dayjs from "dayjs";
// 请求参数转换
export function queryString(data) {
  const str = [];
  for (const key in data) {
    str.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
  }
  return str.join("&");
}

// 时间格式化函数（value：时间戳，format：格式）
export function dateFormat(value, format = "YYYY.MM.DD HH:mm") {
  if (!value) return "";
  return dayjs(value).format(format);
}
/* ------------ Currency ------------- */

// 转换为千分制
export function toThousand(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}

/**
 * desc: 货币价格过滤器
 */
export function currency(value, currency, decimals) {
  const digitsRE = /(\d{3})(?=\d)/g;

  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) return "";
  currency = currency != null ? currency : "$";
  decimals = decimals != null ? decimals : 2;
  var stringified = Math.abs(value).toFixed(decimals);
  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  var i = _int.length % 3;
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? "," : "") : "";
  var _float = decimals ? stringified.slice(-1 - decimals) : "";
  var sign = value < 0 ? "-" : "";
  return (
    sign + currency + head + _int.slice(i).replace(digitsRE, "$1,") + _float
  );
}

/* ------------ Bytes ------------- */

/**
 * [bytes 返回字节]
 * @param  {[type]} bytes     [bytes,KB,MB,GB]
 * @param  {[type]} precision [精度]
 * @return {[type]}
 * @demo: bytes(1073741824) // 1024MB
 */
export function bytes(bytes, precision) {
  if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return "-";
  if (typeof precision === "undefined") precision = 1;
  const units = ["bytes", "kB", "MB", "GB", "TB", "PB"];
  const number = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +
    " " +
    units[number]
  );
}
