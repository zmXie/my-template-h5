/*全局组件*/
import pmEmpty from "./pm-empty";
import pmPage from "./pm-page";
import pmPagelist from "./pm-page-list";
import pmUserInfo from "./pm-user-info";
import pmButton from "./pm-button";
export default {
  install(Vue, option) {
    Vue.component("pm-empty", pmEmpty);
    Vue.component("pm-page", pmPage);
    Vue.component("pm-page-list", pmPagelist);
    Vue.component("pm-user-info", pmUserInfo);
    Vue.component("pm-button", pmButton);
  },
};
