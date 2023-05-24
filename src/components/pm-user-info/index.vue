<template>
  <div class="pm-user-info flex-fs-c">
    <van-image v-if="data.patientHeadPic" round width="50" height="50" :src="data.patientHeadPic" />
    <van-image v-else round width="50" height="50" :src="require('@/assets/images/ic_avatar_def.png')" />
    <div class="ml-10">
      <div class="name">
        <span>{{data.name}}</span>
        <span class="desc ml-10">
          <span>{{data.sex | sex}}</span>
          <span v-if="data.age" class="ml-5">{{data.age}}岁</span>
        </span>
      </div>
      <div class="desc"> {{data.mobile }} </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pm-user-info',
  props: {
    data: {
      type: Object,
      default: Object
    }
  },
  data() {
    return {

    };
  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.name {
  font-size: 16px;
  font-weight: 500;
  color: #212121;
  line-height: 22px;
}
.desc {
  font-size: 14px;
  font-weight: 400;
  color: #212121;
  line-height: 20px;
}
.ml-10 {
  margin-left: 10px;
}
.ml-5 {
  margin-left: 5px;
}
</style>