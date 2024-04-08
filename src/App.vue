<template>
  <div id="app">
    <transition>
      <keep-alive>
        <router-view :key="$route.fullPath" v-if="$route.meta && $route.meta.isKeepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition>
      <router-view :key="$route.fullPath" v-if="!($route.meta && $route.meta.isKeepAlive)">
        <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
      </router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app',
  components: {

  },
  async created() {
    // 从数据库取用户信息
    let jwt = await this.$store.dispatch('frame/jwt/load');
    if (jwt.token) {
      await this.$store.dispatch('frame/user/load');
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import "~@/assets/style/public-class.scss";
</style>
