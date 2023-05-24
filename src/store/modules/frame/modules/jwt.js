import util from '@/libs/util'

export default {
  namespaced: true,
  state: {
    // jwt token
    token: null,
    // jwt 格式化数据
    data: { }
  },
  actions: {
    /**
     * @description 设置解析jwtToken
     * @param {Object} context
     * @param {object} info {jwtTokenStr}
     */
    set ({ state, dispatch }, { jwtTokenStr }) {
      return new Promise(async resolve => {
        let data = util.tool.parseJwtToken(jwtTokenStr);
        state.data = data || {};
        if (state.data.payload) {
          util.cookies.set('uuid', state.data.payload.userId);
        }
        state.token = jwtTokenStr;
        let jwt = {};
        jwt.token = state.token;
        jwt.data = state.data;
        // 持久化
        await dispatch('frame/db/set', {
          dbName: 'sys',
          path: 'user.jwt',
          value: jwt,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从数据库取token数据
     * @param {Object} context
     */
    load ({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        let jwt = await dispatch('frame/db/get', {
          dbName: 'sys',
          path: 'user.jwt',
          defaultValue: {},
          user: true
        }, { root: true })
        state.token = jwt.token;
        state.data = jwt.data;
        dispatch('frame/app/init', {}, { root: true });
        // end
        resolve(jwt)
      })
    },
    clear ({ state, dispatch }) {
      return new Promise(async resolve => {
        state.data = {};
        state.token = null;
        let jwt = {};
        jwt.token = state.token;
        jwt.data = state.data;
        // 持久化
        await dispatch('frame/db/set', {
          dbName: 'sys',
          path: 'user.jwt',
          value: jwt,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    }
  },
  getters: {
    /**
     * @description 校验token是否有效
     * @param {Object} state state
     * @returns {boolean}
     */
    verifyJwtToken (state) {
      if (!state.token) {
        return false;
      }
      let nowDate = new Date().getTime();
      return nowDate <= (state.data.payload.exp * 1000);
    }
  }
}
