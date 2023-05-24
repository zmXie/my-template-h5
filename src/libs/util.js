import db from "./util.db";
import log from "./util.log";
import tool from "./util.tool";
import cookies from "./util.cookies";
import "./util.array";

const util = {
  db,
  log,
  cookies,
  tool,
};

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || "数智云";
  window.document.title = `${processTitle}${
    titleText ? ` | ${titleText}` : ""
  }`;
};

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("target", "_blank");
  a.setAttribute("id", "xg-link-temp");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(document.getElementById("xg-link-temp"));
};

/**
 * 防抖
 * @param {*} fn
 * @param {*} delay
 */
util.debounce = function (fn, delay = 300) {
  var timerId = null;
  var flag = true;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timerId);
    let isRepeat = false;
    if (flag) {
      fn.apply(context, args);
      isRepeat = true;
      flag = false;
    }
    timerId = setTimeout(() => {
      if (!isRepeat) fn.apply(context, args);
      flag = true;
    }, delay);
  };
};

export default util;
