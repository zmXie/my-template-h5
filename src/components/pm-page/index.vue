<template>
  <div :class="['pm-page',{'safe-bottom-area':safeBottom}]">
    <div class="page-wraper" v-if="status==='success'">
      <slot></slot>
    </div>
    <pm-empty v-else-if="status === 'failed'" description="加载失败" @refresh="refresh"></pm-empty>
    <pm-empty v-else-if="status === 'empty'"></pm-empty>
    <slot v-else-if="status === 'custom'" name="custom"></slot>
  </div>
</template>

<script>
export default {
  name: 'pm-page',
  props: {
    // 状态
    status: {
      type: String,
      default: 'success',
      validator(value) {
        return ['', 'success', 'failed', 'empty', 'custom'].includes(value);
      }
    },
    // 底部安全距离
    safeBottom: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {
    refresh() {
      this.$emit('refresh');
    }
  }
};
</script>

<style lang="scss" scoped>
.safe-bottom-area {
  padding-bottom: env(safe-area-inset-bottom);
  .page-wraper {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    box-sizing: border-box;
  }
}
</style>