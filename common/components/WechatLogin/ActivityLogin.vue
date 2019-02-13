<template>
  <div>
    <div id="allmap"></div>
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
              <input type="tel" maxlength='6' placeholder="请输入图片验证码" v-model="form.imgCode"> <img :src="captchaUrl" @click="getCode">
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
  import Util from './util'
  import uPop from 'public/uPop'
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
          tel: "",
          code: "",
          imgCode: ""
        },
        //图片验证码url
        captchaUrl: "",
        //倒计时间
        time: 0,
        ticket: null, // 身份凭证
        url: {}, //地址栏
        locations: {
          longitude: '', //经度
          latitude: '', //纬度
          cityname:'',//城市名字
        },
      };
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
        // default: "http://192.168.6.168:9309"
        default: "" //此处不能填ip，原由是关于登录验证所有接口会报undefined,原因不明
      },
      //图片验证码接口
      imgCodeUrl: {
        type: String,
        default: "/Handler/ATSCaptcha.ashx"
      },
      //发送验证码接口
      sendCodeUrl: {
        type: String,
        default: "/Handler/ATSBaseService.ashx?action=sendsms"
      },
      //获取验证次数接口
      getCountUrl: {
        type: String,
        default: "/Handler/ATSBaseService.ashx?action=smssendcount"
      },
      //登录接口
      loginUrl: {
        type: String,
        default: "/Handler/ATSBaseService.ashx?action=verfy"
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
        this.getUrll()
        this.getValCount();
        this.locationa();
      });
    },
    methods: {
      show() {
        this.isShow = !this.isShow;
      },
      //倒计时
      codeTimer() {
        let that = this;
        let timer = setInterval(send, 1000);
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
          if (this.form[m] === "") {
            switch (m) {
              case "tel":
                uPop.msg("请填写手机号码");
                break;
              case "code":
                uPop.msg("请填写验证码");
                break;
              case "imgCode":
                if (that.imgCode) {
                  uPop.msg("请填写图片验证码");
                } else {
                  return true;
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
          uPop.msg("请输入正确的手机号");
          return false;
        } else {
          return true;
        }
      },
      //1.获取验证次数
      getValCount() {
        let that = this;
        Util.get({
          url: that.commonUrl + that.getCountUrl,
          data: {
            ticket: '',
          },
          success: res => {
            if (res.State === 1) {
              that.imgCode = res.Body.sendCounts
              that.ticket = res.Body.ticket;
              if (that.imgCode >= 4) {
                that.imgCode = true
                that.getCode();
              } else {
                that.imgCode = false
              }
            } else {
              uPop.msg(res.Msg)
            }
          },
          error: res => {
            uPop.msg(res.Msg)
          }
        })
      },
      // 2、获取图片验证码
      getCode() {
        let that = this;
        Util.get({
          url: that.commonUrl + that.imgCodeUrl,
          data: {
            mobile: that.form.tel,
            ticket: that.ticket
          },
          success: res => {
            // that.captchaUrl = `${that.commonUrl}${that.imgCodeUrl}?ticket=${that.ticket}&r=${Math.round(Math.random()*100)}`;
            that.captchaUrl = 'http://192.168.6.168:9309' + that.imgCodeUrl + '?ticket=' + that.ticket + '&r=' + Math.round(Math.random() * 100);
          },
          error: res => {
            uPop.msg(res.Msg)
          }
        })
      },
      // 3.发送短信验证码
      sendCode() {
        if (this.phoneCheck(this.form.tel)) {
          let that = this;
          that.time--;
          that.msg = that.time + "秒后重新获取";
          that.codeDisabled = true;
          if (this.imgCode && this.form.imgCode === "") {
            uPop.msg("请输入图片验证码");
            return;
          }
          Util.post({
            url: that.commonUrl + that.sendCodeUrl,
            data: {
              mobile: that.form.tel,
              ValidateType: 2,
              bizcode: 3,
              ticket: that.ticket,
              photocode: that.form.imgCode||''
            },
            success: res => {
              if (res.State === 1) {
                that.codeTimer();
              } else {
                uPop.msg(res.Msg);
              }
            },
            error: res => {
              uPop.msg(res.Msg);
            }
          })
        }
      },
      //登录
      submit() {
        let that = this;
        if (this.validate()) {
          this.submitDisabled = true;
          Util.post({
            url: that.commonUrl + that.loginUrl,
            data: {
              mobile: that.form.tel,
              photocode: that.form.imgCode,
              locationx: that.locations.longitude,
              locationy: that.locations.latitude,
              cityname: that.cityname,
              openid: that.url.openid+'=',
              ticket: that.ticket,
              smscode: that.form.code
            },
            success: res => {
              if (res.State === 0) {
                that.$emit("sendSuceess", res.Body);
                uPop.msg(res.Msg)
                setTimeout(() => {
                  that.isShow = false;
                },300);
              } else {
                uPop.msg(res.Msg);
              }
              that.submitDisabled = false;
            },
            error: res => {
              uPop.msg(res.Msg);
            }
          })
        }
      },
      //获取地址栏信息
      getUrll() {
        if (window.location.search.indexOf('=') != -1) {
          let getArr = window.location.search.split('?')[1].split('&');
          getArr.forEach(e => {
            if (!(e.split('=')[0] in this.url)) {
              this.url[e.split('=')[0]] = e.split('=')[1]
            }
          })
        } else return 'nodata';
      },
      // 定位 
      locationa() {
        // 百度地图API功能
        var that = this
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 12);
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
            that.locations.longitude = r.point.lng //经度
            that.locations.latitude = r.point.lat //纬度
          } else {
            console.log('failed' + this.getStatus());
          }
        }, {
          enableHighAccuracy: true
        })
        function myFun(result) {
          var cityName = result.name;
          map.setCenter(cityName);
          that.cityname = cityName
          // alert("当前定位城市:" + cityName);
        }
        var myCity = new BMap.LocalCity();
        myCity.get(myFun);
      }
    }
  };
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
    opacity: 0;
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