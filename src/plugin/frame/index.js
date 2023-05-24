import "@/filters";
// 功能插件
import Vant, { Lazyload, ImagePreview } from "vant";
import "vant/lib/index.css";
import components from "@/components";

import axios from "axios";
window.vant = Vant;
window.axios = axios;

export default {
  async install(Vue, options) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false;
    // 当前环境
    Vue.prototype.$env = process.env.NODE_ENV;
    // 当前的 baseUrl
    Vue.prototype.$baseUrl = process.env.BASE_URL;
    // 当前版本
    Vue.prototype.$version = process.env.VUE_APP_VERSION;
    // 构建时间
    Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME;
    // 全局组件
    Vue.use(components);
    Vue.use(Vant);
    Vue.use(Lazyload);
    Vue.use(ImagePreview);
  },
};
