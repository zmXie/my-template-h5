<template>
  <van-button v-bind="$attrs" @click="handleClick" :loading="loading">
    <slot></slot>
  </van-button>
</template>
<script>
export default {
  name: 'pm-button',
  props: {
    click: Function
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    handleClick() {
      this.loading = true;
      Promise.resolve()
        .then(() => this.click())
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
