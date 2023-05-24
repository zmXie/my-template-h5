// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require("@/libs/util.import." + process.env.NODE_ENV);

/**
 * 业务路由
 */
const framePage = [
  {
    path: "/",
    name: "home",
    meta: {
      auth: true, // 是否需要登录
      isKeepAlive: false, // 是否需要缓存
      autoLogin: true, // 是否可以进行自动授权登录
    },
    component: _import("home/index"),
  },
];
/**
 * 系统路由
 */
const frameSys = [
  // 刷新页面 必须保留
  {
    path: "/refresh",
    name: "refresh",
    hidden: true,
    component: _import("system/function/refresh"),
  },
  // 页面重定向 必须保留
  {
    path: "/redirect/:route*",
    name: "redirect",
    hidden: true,
    component: _import("system/function/redirect"),
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: _import("system/login"),
  },
];
/**
 * 错误页面
 */
const errorPage = [
  {
    path: "*",
    name: "404",
    component: _import("system/error/404"),
  },
];

// 重新组织后导出
export default [...framePage, ...frameSys, ...errorPage];
