<template>
  <div>
    <transition name="scale">
      <div class="login" v-if="isShow">
        <div class="loginBox">
          <div class="content">
            <div class="close" @click="show"><img src="./images/close_48.png"></div>
            <div class="title">请验证您的手机号</div>
            <div class="ipt um-flex um-between um-ver">
              <input type="tel" maxlength='11' placeholder="请输入手机号" v-model="form.tel">
            </div>
            <div class="ipt um-flex um-between um-ver" v-show="imgCode">
              <input type="tel" maxlength='6' placeholder="请输入图片验证码" v-model="form.imgCode"> <img :src="captchaUrl" @click="captchaUrl=commonUrl+imgCodeUrl+'&code='+Math.random()">
            </div>
            <div class="ipt um-flex um-between um-ver">
              <input type="tel" maxlength="4" class="codeIpt" placeholder="请输入验证码" v-model="form.code">
              <button class="code" @click="sendCode" :disabled="codeDisabled">{{msg}}</button>
            </div>
            <div class="button">
              <button @click="submit()" :disabled="submitDisabled">确定 </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "select",
    data() {
      return {
        //图片验证码显示隐藏
        imgCode: false,
        //是否显示登录框
        isShow: true,
        //发送验证码按钮是否禁用
        codeDisabled: false,
        //提交按钮禁用
        submitDisabled: false,
        msg: "发送手机验证码",
        //填写的数据
        form: {
          tel: '',
          code: '',
          imgCode: '',
        },
        //点击次数
        clickCounts: 0,
        //图片验证码url
        captchaUrl: '',
        //倒计时间
        time: 0,
      }
    },
    props: {
      //传入的倒计时
      seconds: {
        type: Number,
        default: 5
      },
      //ip地址
      commonUrl: {
        type: String,
        default: ""
        // default: "http://192.168.6.168:1419/"
      },
      //图片验证码接口
      imgCodeUrl:{
        type:String,
        default:"/bizmall/Captcha.ashx?Type=1",
      },
      //发送验证码接口
      sendCodeUrl:{
        type:String,
        default:'/Handler/BaseService.ashx?action=sendsmscode',
      },
      //获取验证次数接口
      getCountUrl:{
        type:String,
        default:"/Handler/BaseService.ashx?action=sendcount",
      },
      //登录接口
      loginUrl:{
        type:String,
        default:'/Handler/BaseService.ashx?action=verify',
      },
      //传入的城市
      city: {
        type: String,
        default: "郑州市"
      },
      district: {
        type: String,
        default: "郑州市"
      },
      //出现图片验证码的次数
      maxCounts: {
        type: Number,
        default: 1
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.time = this.seconds;
        setTimeout(() => {
          this.getValCount();
        }, 0)
      })
    },
    methods: {
      show() {
        this.isShow = !this.isShow;
      },
      //发送验证码 
      sendCode() {
        if (this.phoneCheck(this.form.tel)) {
          let that = this;
          if (that.clickCounts >= this.maxCounts && !that.imgCode) {
            this.imgCode = true;
            this.captchaUrl = this.commonUrl + this.imgCodeUrl+"&code=" + Math.random();
            return
          }
          if (this.imgCode && this.form.imgCode === '') {
            this.Lay.msg("请输入图片验证码")
            return
          }
          that.ajax.post(that.commonUrl + that.sendCodeUrl, {
            mobile: that.form.tel,
            BizCode:1,
            validateType: 1,
            photoCode: that.form.imgCode || ''
          }, (res) => {
            if (res.State == 1) {
              that.$emit("sendSuceess", res);
              that.codeTimer();
              console.log(res);
            } else {
              that.$emit("sendError", res);
              that.Lay.msg(res.Msg);
              this.captchaUrl = this.commonUrl + that.imgCodeUrl+"&code=" + Math.random();
              console.log(res);
            }
          })
        }
      },
      //倒计时
      codeTimer() {
        let that = this;
        let timer = setInterval(send, 1000);
        that.clickCounts++;
        function send() {
          that.codeDisabled = true;
          if (that.time == 0) {
            that.codeDisabled = false;
            that.time = that.seconds;
            that.msg = "重新获取";
            clearInterval(timer);
            timer = null;
          } else {
            that.time--;
            that.msg = that.time + "秒后重新获取";
          }
        }
      },
      //验证
      validate() {
        let that = this;
        for (let m in this.form) {
          if (this.form[m] === '') {
            switch (m) {
              case 'tel':
                that.Lay.msg("请填写手机号码");
                break;
              case 'code':
                that.Lay.msg("请填写验证码");
                break;
              case 'imgCode':
                if (that.imgCode) {
                  that.Lay.msg("请填写图片验证码");
                } else {
                  return true
                }
            }
            return false;
          }
        }
        return true;
      },
      //检测手机号
      phoneCheck(val) {
        let that = this;
        var regTel = /^[1]{1}[3,4,5,7,8]\d{9}$/;
        if (!regTel.test(val)) {
          that.Lay.msg("请输入正确的手机号");
          return false;
        } else {
          return true;
        }
      },
      //登录
      submit() {
        let that = this;
        if (this.validate()) {
          this.submitDisabled = true;
          that.ajax.post(that.commonUrl + that.loginUrl, {
            ValidateCode: that.form.code,
            // cityName: that.city || '',
            // district: that.district || '',
            recievePhone: that.form.tel,
            BizCode:1,
            // ValidateType: 2,
            // photoCode: that.form.imgCode || ''
          }, (res) => {
            if (res.State == 1) {
              that.$emit("success", res);
              that.Lay.msg("登录成功");
              setTimeout(() => {
                that.isShow = false;
              }, 300)
            } else {
              that.$emit("error", res);
              that.Lay.msg(res.Msg);
            }
            that.submitDisabled = false;
          })
        }
      },
      //获取验证次数
      getValCount() {
        let that = this;
        that.ajax.post(that.commonUrl + that.getCountUrl, {
          r: Math.random()
        }, (res) => {
          if (res.State == 1) {
            that.clickCounts = res.Body;
            if (res.Body >= that.maxCounts) {
              that.imgCode = true;
              that.captchaUrl = that.commonUrl + that.imgCodeUrl+"&code=" + Math.random();
            }
          } else {
            that.Lay.msg(res.Msg);
          }
        })
      },
    },
  }
</script>

<style lang="less">
  @rem: 75rem;
  .click {
    width: 200px;
    height: 100px;
    text-align: center;
  }
  button[disabled].code {
    background: #f1f1f1 !important;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.1s linear;
  }
  .fade-enter,
  .fade-leave-to {
    // transform: scale(0);
    opacity: 0
  }
  .login {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
    background: rgba(0, 0, 0, 0.7);
    .loginBox {
      .content {
        position: relative;
        .close {
          position: absolute;
          width: 48/@rem;
          height: 48/@rem;
          right: 0;
          top: -5/@rem;
          img {
            width: 48/@rem;
            height: 48/@rem;
          }
        }
      }
      width: 550/@rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 30/@rem 30/@rem;
      background: #fff;
      position: absolute;
      z-index: 10000;
      top: 50%;
      margin-top: -280/@rem;
      left: 50%;
      margin-left: -275/@rem;
      -webkit-border-radius: 8/@rem;
      border-radius: 8/@rem;
      .title {
        font-size: 30/@rem;
        text-align: center;
        color: #333;
        font-weight: bold;
        margin-bottom: 20/@rem;
      }
      .ipt {
        width: 100%;
        position: relative;
        input {
          width: 100%;
          text-align: left;
          padding: 30/@rem 0;
          font-size: 24/@rem;
          &.codeIpt {
            width: 200/@rem;
          }
        }
        &:after {
          position: absolute;
          width: 100%;
          height: 1px;
          content: "";
          display: block;
          -webkit-transform-origin: 0 100%;
          transform-origin: 0 100%;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
          border-bottom: 1px solid #f1f1f1;
          left: 0;
          bottom: 0;
        }
        .code {
          border: none;
          outline: none;
          padding: 5/@rem 10/@rem;
          text-align: center;
          background: #ff8b03;
          color: #fff;
          font-size: 24/@rem;
          -webkit-border-radius: 8/@rem;
          border-radius: 8/@rem;
        }
      }
      .button {
        width: 100%;
        button {
          border: none;
          outline: none;
          background: #ff8b03;
          color: #fff;
          font-size: 24/@rem;
          margin-top: 30/@rem;
          width: 100%;
          padding: 25/@rem 0;
          border-radius: 8/@rem;
          -webkit-border-radius: 8/@rem;
        }
      }
    }
  }
</style>