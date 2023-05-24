import util from '@/libs/util'
import Api from '@/api'
export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {},
    // 新手指引
    guide: {},
    // 系统变量
    systemVariables: {
      LOGIN_EMP_ID: null, // 当前登录人员
      LOGIN_EMP_DEP_ID: null // 当前登录人员部门
    }
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} context
     * @param {*} info info
     */
    set ({ state, dispatch }, info) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = info;
        // 持久化
        await dispatch('frame/db/set', {
          dbName: 'sys',
          path: 'user.info',
          value: info,
          user: true
        }, { root: true });
        // end
        resolve()
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} context
     */
    load ({ state, dispatch, commit }) {
      return new Promise(async (resolve, reject) => {
        let info = await dispatch('frame/db/get', {
          dbName: 'sys',
          path: 'user.info',
          value: '',
          user: true
        }, { root: true });
        state.info = info || {};
        if (state.info.userId) {
          let systemVariables = {
            LOGIN_EMP_ID: state.info.userId,
            LOGIN_EMP_DEP_ID: state.info.departmentId,
          };
          commit('setSystemVariables', systemVariables);
          resolve();
          let data = await Api.basic.getUserInfo();
          if (data) {
            state.info = data;
            dispatch('set', data || {});
          }
        } else {
          let data = await Api.basic.getUserInfo();
          if (data) {
            state.info = data;
            let systemVariables = {
              LOGIN_EMP_ID: state.info.userId,
              LOGIN_EMP_DEP_ID: state.info.departmentId,
            };
            commit('setSystemVariables', systemVariables);
            await dispatch('set', data || {});
          }
          resolve()
        }
        // end
      })
    },
    /**
     * @description 清除用户数据
     * @param state
     * @param dispatch
     * @returns {Promise}
     */
    clear ({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        await dispatch('frame/db/set', {
          dbName: 'sys',
          path: 'user',
          value: {},
          user: true
        }, { root: true });
        // end
        resolve()
      })
    }
  },
  mutations: {
    // 设置系统变量
    setSystemVariables(state, systemVariables) {
      Object.assign(state.systemVariables, systemVariables);
    }
  }
}
