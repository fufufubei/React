<template>
    <div class="shade" @click.self='close'>
        <div class="zin" v-if="show"></div>
        <transition name="up">
            <div class="inviteLay" v-if="show">
                <div class="type">
                    <div class="title"><span>选择邀请方式</span></div>
                    <ul class="um-flex  um-center">
                        <li @click='sharetype(0)'>
                            <img :src="require('./images/wx.png')" alt="">
                            <p>微信好友</p>
                        </li>
                        <li @click='sharetype(1)'>
                            <img :src="require('./images/cirfriend.png')" alt="">
                            <p>朋友圈</p>
                        </li>
                    </ul>
                </div>
                <div class="cancel" @click='close'>取消</div>
            </div>
        </transition>
    </div>
</template>
<script>
    import Vue from "vue";
    import App from "public/app";
    export default {
        name: "",
        //实例数据
        data() {
            return {
                show: false
            };
        },
        props: {
            //分享的url
            url: {
                type: String,
                default: "https://yarnpkg.com/zh-Hans/"
            },
            //分享的标题
            title: {
                type: String,
                default: "又一款火爆朋友圈的APP！高逼格的人都已经在用了..."
            },
            //分享的内容
            content: {
                type: String,
                default: "人人都在用的网红UU跑腿，同城代买、代送、代排队等，高效快捷，省事省心，速来体验~"
            },
            //分享的logo
            logo: {
                type: String,
                //default: "http://files.uupaotui.com/UUPTLogo/uushare.jpg"
                default: "https://otherfiles.uupt.com/ActivityScene/20170428/ShareIcon37920170428095725262.png"
            },
            show: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            //分享类型  type为1 分享内容  2分享图片
            type: {
                type: String,
                default: "1"
            },
            //图片路径
            imagePath: {
                type: String,
                default: ""
            }
        },
        //页面渲染完成后执行的钩子函数
        mounted() {},
        //实例被创建之后调用的钩子函数
        created() {},
        //自定义的方法
        methods: {
            close: function() {
                this.show = false;
                this.$emit("close", this.show);
            },
            /* 分享 */
            sharetype: function(type) {
                var that = this;
                if (that.type == 1) {
                    App.app.share2({
                        title: that.title,
                        url: that.url,
                        content: that.content,
                        type: type
                    });
                } else {
                    App.app.ShareImage(type, that.title, that.imagePath);
                }
            }
        }
    };
</script>
<style lang='less'>
    @rem: 75rem;
    .shade {
        .zin {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.65);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 800;
        }
        .inviteLay {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 1000;
            width: 100%;
            box-shadow: 0 0 20/@rem rgba(0, 0, 0, 0.2);
            .type {
                background: #f7f7f7;
                .title {
                    width: 100%;
                    position: relative;
                    padding: 40/@rem 0;
                    text-align: center;
                    &:after {
                        content: "";
                        display: block;
                        width: 100%;
                        height: 1px;
                        position: absolute;
                        top: 50%;
                        left: 0;
                        background: #e5e5e5;
                        transform: scaleY(0.5);
                        -webkit-transform: scaleY(0.5);
                        transform-origin: 0 0;
                        -webkit-transform-origin: 0 0;
                    }
                    span {
                        font-size: 24/@rem;
                        color: #666;
                        padding: 0 24/@rem;
                        background: #f7f7f7;
                        position: relative;
                        z-index: 1100;
                    }
                }
                ul {
                    padding: 16/@rem 0 44/@rem;
                    li {
                        padding: 0 55/@rem;
                        img {
                            width: 108/@rem;
                            margin-bottom: 16/@rem;
                        }
                        p {
                            font-size: 22/@rem;
                            color: #666;
                            text-align: center;
                        }
                    }
                }
            }
            .cancel {
                background: #fff;
                font-size: 28/@rem;
                color: #444;
                text-align: center;
                line-height: 100/@rem;
            }
        }
    }
    .up-enter-active,
    .up-leave-active {
        -webkit-transition: all 0.4s ease-in-out;
        -moz-transition: all 0.4s ease-in-out;
        transition: all 0.4s ease-in-out;
    }
    .up-enter,
    .up-leave-to {
        opacity: 0;
        -webkit-transform: translate3d(0, 1300px, 0);
        -moz-transform: translate3d(0, 1300px, 0);
        transform: translate3d(0, 1300px, 0);
    }
</style>