<template>
    <div class="smscode">
        <button type="button" v-on:click="sendSms" :disabled="disabled">{{ textJs }}</button>
        <div id="captcha" ref='ipt' v-if="captchashow">
            <div class="captcha">
                <div class="close" @click="captchashow=false"></div>
                <p class="title">请输入6位图片验证码</p>
                <div class="img_code um-flex um-between um-ver">
                    <input @focus="getFocus" @blur="getBlur"  type="tel" maxlength="6" v-model="captcha" class="um-flex-item" id="captcha_code" placeholder="请输入验证码">
                    <div class="code_word">
                        <img id="captcha_code_img" :src="captchaUrl" @click="captchaUrl=captchaUrl+'&r='+Math.random()">
                    </div>
                </div>
                <button class="layer_btn" :class="{on:captcha.length>5}" :disabled='captcha.length!=6' @click="sendSms()">提交</button>
            </div>
            <div class="shadow" @click="captchashow=false"></div>
        </div>
    </div>
</template>
<script charset="utf-8">
    import validate from "public/validate-vue";
    import uPop from "public/uPop"
    import config from "public/config"
	import Util from "public/util"
    export default {
        props: {
            second: {
                type: Number,
                default: 60
            },
            mobile: {
                type: String,
                default: ""
            },
            //
            text: {
                type: String,
                default: "获取验证码"
            },

            //0: 所有手机号都能发送。发送一定次数增加图形验证
            //1: 有注册才发验证码
            //2:手机号注册过跑男才发
            //3:手机号没有注册过跑男才发
            //4:手机号没有注册过用户才发
            sendtype: {
                type: Number,
                default: 0
            },
            isHideCaptcha:{
                type: Boolean,
                default: false
            },
            //业务类型
            businessCode:{
                type:Number,
                default:0
            },
            activityscene:{
                type: String,
                default: ''
            },
        },
        data: function () {
            return {
                time: 0,
                disabled: false,
                textJs: "",
                //同一手机号发送次数
                clickCount: 0,
                captchashow: false,
                captcha: "",
                captchaUrl:""
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                
                this.textJs = this.text;
            });
        },
        methods: {
            sendSms: function () {
                var that = this;

                validate.submit([
                    {
                        val: that.mobile,
                        rule: 'mobile',
                        message: "手机号不正确"
                    }
                ], function () {
             
                    that.disabled = true;
                     Util.post({
                        url: config.activityWebUrl+ "/Handler/Common.ashx?action=SendSmsCodeNew",
                        data: { mobile: that.mobile, captcha: that.captcha, type: that.sendtype,businesscode:that.businessCode,activityscene:that.activityscene},
                        success: function (result) {
                            if (result.IsError) {
                               
                                that.disabled = false;
                                if (result.Msg == '图形验证码不对'||result.State==-999) {
                                
                                    if(typeof isHideCaptcha!="undefined"&&isHideCaptcha){
                                          return that.$emit("error", result);
                                    }
                                    that.captchaUrl= config.activityWebUrl+ "/Handler/Captcha.ashx?mobile="+that.mobile+"&r="+Math.random();
                                    if(!that.captchashow){
                                        that.captcha = '';
                                        that.captchashow = true;
                                        document.addEventListener("touchmove", function(e) {
                                            if (document.querySelector("#captcha") != null) {
                                                e.preventDefault();
                                            }
                                        });
                                        return
                                    }
                                    that.captchaUrl=that.captchaUrl+'&r='+Math.random();
                                    return uPop.msg('图形验证码不对');

                                } else {
                                    return that.$emit("error", result);

                                }
                            }
                            that.captchashow=false;
                            that.$emit("success", result);
                            that.clickCount++;
                            that.time = that.second;
                            that.timer();
                        }

                    });


                });
            },
            getFocus:function(){
                this.$refs.ipt.style.position="absolute";
                window.scrollTo(0,0);
            },
            getBlur:function(){
                this.$refs.ipt.style.position="fixed";
            },
            timer: function () {
                var that = this;
                var inter = setInterval(send, 1000);
                function send() {
                    that.disabled = true;
                    if (that.time == 0) {
                        that.textJs = "重新获取";
                        that.disabled = false;
                        clearInterval(inter);
                    }
                    else {
                        that.textJs = that.time + 's';
                        that.time--;
                    }
                }
            }
        }
    }
</script>
<style lang='less' scoped>
@rem: 75rem;
.bor_ra(@width) {
    -webkit-border-radius: @width;
    -moz-border-radius: @width;
    border-radius: @width;
}

;
.um-flex {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
}

.um-flex-item {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}

.um-ver {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}

.um-between {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

#captcha {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 2000;
    padding: 0 36/@rem;
    .captcha {
        position: relative;
        background: #fff;
        padding: 86/@rem 60/@rem 60/@rem;
        .bor_ra(8/@rem);
        z-index: 2000;
        margin: 308/@rem auto 0;
        p.title {
            margin-bottom: 36/@rem;
            text-align: center;
            font-size: 28/@rem;
            color: #333;
            line-height: 58/@rem;
            font-weight: 600;
        }
        .img_code {
            height: 100/@rem;
            padding: 0 10/@rem 0 20/@rem;
            position: relative;
			border-bottom: 1px solid #aaaaaa;
            input {
                height: 100/@rem;
                line-height: 24/@rem;
                text-align: left;
                border: none;
                font-size: 24/@rem;
            }
            Input::-webkit-input-placeholder {
                line-height:100/@rem;
                font-size: 24/@rem;
            }
            .code_word {
                position: relative;
                img {
                    display: block;
                    width: 144/@rem;
                }
            }
        }
        .layer_btn {
            display: block;
            outline: none;
            text-align: center;
            height: 100/@rem;
            line-height: 100/@rem;
            margin-top: 60/@rem;
            background: #e5e5e5;
            color: #fff;
            font-size: 25/@rem;
            .bor_ra(50/@rem);
            &.on {
                background: #ff8b03;
                color: #fff;
                -webkit-box-shadow: 0 8/@rem 60/@rem rgba(255, 139, 3, .1);
                -moz-box-shadow: 0 8/@rem 60/@rem rgba(255, 139, 3, .1);
                box-shadow: 0 8/@rem 60/@rem rgba(255, 139, 3, .1);
            }
        }
        .close {
            height: 86/@rem;
            width: 86/@rem;
            position: absolute;
            top: 0;
            right: 0;
            background-image: url(./images/close.png);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 30/@rem 30/@rem ;
        }
    }
}

.shadow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .75);
    z-index: 1000;
}



.smscode button {
    border: none;
    outline: none;
    background: transparent;
    color: #ff8b03;
    width: 100%;
    text-align: center;
    position: relative;
    z-index: 2;
}

.smscode {
    height: 0.64rem;
    padding: 0 0.26666667rem;
    // position: relative;
    text-align: center;
    line-height: 0.61333333rem;
    color: #fff;
    .bor_ra(8/@rem);
    font-size: 24/@rem;
    border: none;
    outline: none;
    color: #333;
    background: #fff;
    color: #ff8b03;
}
</style>