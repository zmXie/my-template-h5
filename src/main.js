import 'babel-polyfill'
import Vue from 'vue'
import i18n from './i18n'
import '@vant/touch-emulator';
import App from './App.vue'
import router from './router'
import store from './store'
import frame from '@/plugin/frame/index'

Vue.config.productionTip = false
Vue.use(frame);
window.$rootVue = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted () {
    // 获取并记录用户 UA
    this.$store.commit('frame/ua/get')
  }
}).$mount('#app');
