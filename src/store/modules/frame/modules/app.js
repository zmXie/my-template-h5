import store from '@/store';
export default {
  namespaced: true,
  state: {
    appInfo: {}, // app信息
    initLoading: false
  },
  actions: {
    /**
     * 初始化应用数据
     * @param state
     * @param dispatch
     * @return {Promise<unknown>}
     */
    init({ state, dispatch }) {
      return new Promise((resolve) => {
        if (!store.state.frame.jwt.token) {
          return resolve();
        }
        if (state.initLoading) {
          return resolve();
        }
        state.initLoading = true;
        // 初始化菜单权限
        window.$rootVue.$SCP_APP_FRAME.initMenu().then(({appMenuData, appData}) => {
          state.appInfo = appData;
          // 初始权限指令
          window.$rootVue.$initPermission(appData.appMenuIds);
        }).finally(() => {
          state.initLoading = false;
        });
        resolve();
      })
    }
  },
  mutations: {
  }
}
