<template>
    <transition name="up">
        <div class='shareWay upDown' v-if="show" @click="stop">
            <swiper :options="swiperOption">
                <swiper-slide>
                    <div class="tip" @click.stop="share(0)">
                        <img src="./images/wechat.png">
                        <p class="title">微信好友</p>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="tip" @click.stop="share(1)"><img src="./images/friendc.png">
                        <p class="title">朋友圈</p>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="tip" @click.stop="share(2)"><img src="./images/QQ.png"/>
					 <p class="title">QQ</p>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="tip" @click.stop="share(3)"><img src="./images/space.png">
                        <p class="title">QQ空间</p>
                    </div>
                </swiper-slide>
                <swiper-slide v-if="type==1">
                    <div class="tip" @click.stop="share(5)"><img src="./images/message.png">
                        <p class="title">短信</p>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </transition>
</template>
<script>
    import Vue from "vue"
    import VueAwesomeSwiper from 'vue-awesome-swiper'
    Vue.use(VueAwesomeSwiper);
    import App from "public/app"
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'

    export default {
        name: '',
        //实例数据
        data() {
            return {
                swiperOption: {
                    pagination: '.swiper-pagination',
                    slidesPerView: 4,
                    paginationClickable: true,
                    spaceBetween: 10,
                    freeMode: true
                },
                show:false
            }
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
                default: "人人都在用的网红UU跑腿，同城代买、代送、代排队等，高效快捷，省事省心，速来体验~",
            },
            //分享的logo
            logo: {
                type: String,
                //default: "http://files.uupaotui.com/UUPTLogo/uushare.jpg"
				default: "https://otherfiles.uupt.com/ActivityScene/20170428/ShareIcon37920170428095725262.png"
            },
            disabled: {
                type: Boolean,
                default: false
            },
            //分享类型  type为1 分享内容  2分享图片
            type:{
                type:String,
                default:"1"
            },
            //图片路径
            imagePath:{
                type:String,
                default:''
            }
        },
        //页面渲染完成后执行的钩子函数
        mounted() {
            document.body.addEventListener("click", function() {
                if(!this.disabled){
                     this.show = false;
                }
               
                // console.log(event.target);
            }.bind(this))
        },
        //实例被创建之后调用的钩子函数
        created() {},
        //自定义的方法
        methods: {
            share(type) {
                let that = this;
                event.stopPropagation();
                if(this.type==1){
                    App.app.share2({
                        type: type,
                        url: that.url,
                        title: that.title,
                        content: that.content,
                        logo: that.logo
                    });
                }else{
                    App.app.ShareImage(type,that.title,that.imagePath);
                }

            },
            stop() {
                event.stopPropagation();
            },
            showDia() {
                // this.show =! this.show;
                // console.log(this.show);
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>
<style lang='less'>
    @rem: 75rem;
    .shareWay {
        position: fixed;
        width: 100%;
        padding: 60/@rem 0;
        background: #f5f6f7;
        bottom: 0;
        left: 0;
        overflow: hidden;
        .swiper-wrapper {
            display: -webkit-flex;
            display: -webkit-box;
            display: flex;
            .swiper-slide {
                .tip {
                    width: 108/@rem;
                    img {
                        width: 108/@rem;
                        height: 108/@rem;
                    }
                    margin-left:50/@rem;
                }
                .title {
                    margin-top: 30/@rem;
                    font-size: 26/@rem;
                    color: #333;
                    text-align: center;
                    width: 100%;
                }
            }
        }
    }
    .up-enter-active,
    .up-leave-active {
        transition: all .5s;
        -webkit-transform: translateY(0%);
        transform: translateY(0%);
    }
    .up-enter,
    .up-leave-to {
        // opacity: 0;
        -webkit-transform: translateY(100%);
        transform: translateY(100%);
    }
</style>