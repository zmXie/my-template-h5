<template>
  <div class="pm-empty">
    <van-empty :image="require('@/assets/images/empty.png')" image-size="117" v-bind="[$attrs, $props]">
      <slot>
        <van-button v-if="$listeners.refresh" type="info" round size="small" class="bottom-button" @click="refresh">刷新</van-button>
      </slot>
    </van-empty>
  </div>
</template>

<script>
import util from '@/libs/util';
export default {
  name: 'pm-empty',
  props: {
    // 文字描述
    description: {
      type: String,
      default: '暂无数据'
    }
  },
  data() {
    return {

    };
  },
  mounted() {

  },
  methods: {
    refresh: util.debounce(function () {
      this.$emit('refresh');
    }),
  }
};
</script>

<style lang="scss" scoped>
.bottom-button {
  padding: 0 16px;
}
::v-deep .van-empty__description {
  padding: 0 80px;
  text-align: center;
}
</style>