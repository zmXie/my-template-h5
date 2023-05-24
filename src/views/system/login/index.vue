<template>
  <page-container title="登录" class="page-system-login">
    <div class="login-box">
      <scp-icon name="siconm-shuzhiyun" class="logon-icon" type="font-class" fontFamily="scpiconm"></scp-icon>
      <div class="title">数智云</div>
    </div>
    <van-form ref="refForm" @submit="onSubmit">
      <van-field
        v-model="formInfo.username" validate-trigger="onSubmit"
        clearable
        name="mobile"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写邮箱/手机号' }]"
      ></van-field>
      <van-field :key="`smsCode`" name="smsCode"
        v-model="formInfo.smsCode" validate-trigger="onSubmit"
        center
        clearable
        label="短信验证码"
        :rules="[{ required: true, message: '请填写短信验证码' }]"
        placeholder="请输入短信验证码" v-if="isSmsLogin">
        <template #button>
          <van-button size="small" type="primary" native-type="button"
                      :disabled="sendSmsDisabled" :loading="sendLoading"
                      @click="sendSmsCode">{{ smsCodeDesc }}</van-button>
        </template>
      </van-field>
      <van-field v-else
                 :key="`password`" validate-trigger="onSubmit"
        v-model="formInfo.password"
        clearable
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      ></van-field>
      <div class="desc-btn" @click="handleCutLogin(false)" v-if="isSmsLogin">使用账户密码登录</div>
      <div class="desc-btn" @click="handleCutLogin(true)" v-else>使用短信验证码登录</div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>

  </page-container>
</template>
<script>
import Api from '@/api'
const deviceInfo = navigator && navigator.userAgent;
export default {
  data() {
    return {
      loginClientType: 'APP',
      userTag: 'EMP',
      bizType: 'SCP_OSS',
      isSmsLogin: false,
      sendSmsDisabled: false,
      sendLoading: false,
      countDownNum: 60,
      countDownTimer: null,
      formInfo: {
        username: '',
        password: '',
        smsCode: ''
      }
    }
  },
  computed: {
    /*按钮描述*/
    smsCodeDesc() {
      if (this.sendSmsDisabled) {
        let num = this.countDownNum;
        return `${num}秒重新发送`;
      } else {
        return '发送验证码';
      }
    }
  },
  methods: {
    async onSubmit(val) {
      if (this.isSmsLogin) {
        this.loginSmsCode();
      } else {
        this.passwordLogin();
      }
    },
    /*密码登录*/
    passwordLogin() {
      let _self = this;
      let params = {};
      params.account = this.formInfo.username;
      params.password = this.formInfo.password;
      params.loginClientType = this.loginClientType;
      params.bizType = this.bizType;
      params.userTag = this.userTag;
      params.deviceInfo = deviceInfo;
      Api.auth.loginUsePwd(params).then(async data => {
        if (data.success) {
          let {token} = data.value;
          try {
            await _self.$store.dispatch('frame/jwt/set', { jwtTokenStr: token });
            _self.$store.dispatch('frame/user/load');
          } catch(e) {}
          _self.redirectPath();
        }
      });
    },
    //登陆成功后跳转原来的页面
    redirectPath() {
      let query = this.$route.query || {};
      let redirect = query.redirect;
      this.$router.push({
        path: redirect || '/'
      })
    },
    /*切换登录方式*/
    handleCutLogin(isSmsLogin) {
      this.isSmsLogin = isSmsLogin;
      if (isSmsLogin) {
        this.formInfo.smsCode = '';
      }
    },
    /*发送短信验证码*/
    sendSmsCode() {
      this.$refs.refForm.validate(['mobile']).then(() => {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!reg.test(this.formInfo.username)) {
          this.$toast("请输入正确的手机号码");
          return false;
        }
        this.sendLoading = true;
        let params = {};
        params.mobile = this.formInfo.username;
        params.type = 'CODE_LOGIN';
        Api.basic.sendSmsCode(params).then((data) => {
          if (data && data.success) {
            this.$toast("发送成功");
            this.sendSmsDisabled = true;
            this.startCountDownTime();
          }
          this.sendLoading = false;
        }).catch(() => {
          this.sendLoading = false;
        });
      });
    },
    /*启动倒计时*/
    startCountDownTime() {
      this.countDownTimer = setInterval(() => {
        this.countDownNum--;
        if (this.countDownNum <= 0) {
          clearInterval(this.countDownTimer);
          this.sendSmsDisabled = false;
          this.countDownTimer = null;
          this.countDownNum = 60;
        }
      }, 1000);
    },
    /*短信验证码登录*/
    loginSmsCode() {
      let _self = this;
      let params = {};
      params.loginClientType = this.loginClientType;
      params.mobile = this.formInfo.username;
      params.smsCode = this.formInfo.smsCode;
      params.bizType = this.bizType;
      params.userTag = this.userTag;
      params.deviceInfo = deviceInfo;
      Api.auth.smsLogin(params).then(async data => {
        if (data.success) {
          let {token} = data.value;
          try {
            await _self.$store.dispatch('frame/jwt/set', { jwtTokenStr: token });
            _self.$store.dispatch('frame/user/load');
          } catch(e) {}
          _self.redirectPath();
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.page-system-login{
  height: 100vh;
  background-color: #ffffff;
}
.login-box{
  text-align: center;
  background-color: #ffffff;
  padding-top: 10vh;
  padding-bottom: 5vh;
  .logon-icon{
    font-size: 60px;
    color: #0089fe;
  }
  .title{
    line-height: 2em;
    color: #333333;
  }
}
.desc-btn{
  display: inline-block;
  color: #4f6a96;
  padding: 5px 16px;
}
</style>
