/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-17 23:12:10 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2018-06-17 23:12:10 
 * @description  下载用户端/跑男端/商户端方法
 */
var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weiXin: u.indexOf('MicroMessenger') > -1 //是否是微信
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
var downLoad = {
    gotodown_driver: function() {
        var androidDown = "http://down.uupaotui.com/APP/driver/UUPaoTui_w_1.3.8.0_1118.apk";
        var iosDown = "http://itunes.apple.com/us/app/uu-fei-ren/id991522191?l=zh&ls=1&mt=8";
        var wxdown = "http://a.app.qq.com/o/simple.jsp?pkgname=com.slkj.paotui.worker";
        var downurl = androidDown;
        if (browser.versions.weiXin) {
            downurl = wxdown;
        } else {
            //如果为安卓手机
            if (browser.versions.mobile && browser.versions.android) {
                var $ = require("zepto");
                $.ajax({
                    url: "https://www.uupt.com/Handler/down.ashx?ctype=2&r=" + Math.random(),
                    success: function(result) {
                        window.location.href = result;
                    }
                });
                return;
            } else if (browser.versions.mobile && browser.versions.ios) {
                downurl = iosDown;
            } else if (browser.versions.mobile && browser.versions.iPhone) {
                downurl = iosDown;
            } else if (browser.versions.mobile && browser.versions.iPad) {
                downurl = iosDown;
            }
        }
        window.location.href = downurl;
    },
    //用户下载
    gotodown_user: function() {
        var androidDown = "http://down.uupaotui.com/APP/user/UUpaotui_C_1.3.2.0_20161119.apk";
        var iosDown = "https://itunes.apple.com/cn/app/uu-pao-tui/id991522182?mt=8";
        var wxdown = "http://a.app.qq.com/o/simple.jsp?pkgname=com.slkj.paotui.customer";
        var downurl = androidDown;
        if (browser.versions.weiXin) {
            downurl = wxdown;
        } else {
            //如果为安卓手机
            if (browser.versions.mobile && browser.versions.android) {
                var $ = require("zepto");
                $.ajax({
                    url: "https://www.uupt.com/Handler/down.ashx?ctype=1&r=" + Math.random(),
                    success: function(result) {
                        window.location.href = result;
                    }
                });
                return;
            }
            if (browser.versions.mobile && browser.versions.ios) {
                downurl = iosDown;
            }
            if (browser.versions.mobile && browser.versions.iPhone) {
                downurl = iosDown;
            }
            if (browser.versions.mobile && browser.versions.iPad) {
                downurl = iosDown;
            }

        }
        window.location.href = downurl;
    },
    //商户下载
    gotodown_business: function() {
        var androidDown = "https://down1.uupt.com/APP/merchant/UUpaotui_M_1.0.0.0_20170804.apk";
        var iosDown = "https://itunes.apple.com/cn/app/uu%E5%95%86%E5%AE%B6%E7%89%88/id1259780596?mt=8";
        var wxdown = "https://down1.uupt.com/APP/merchant/UUpaotui_M_1.0.0.0_20170804.apk";
        var downurl = androidDown;
        if (browser.versions.weiXin) {
            // downurl = wxdown;
            if (browser.versions.mobile && browser.versions.android) {
                downurl = androidDown;
            }
            if (browser.versions.mobile && browser.versions.ios) {
                downurl = iosDown;
            }
            if (browser.versions.mobile && browser.versions.iPhone) {
                downurl = iosDown;
            }
            if (browser.versions.mobile && browser.versions.iPad) {
                downurl = iosDown;
            }

        } else {
            //如果为安卓手机
            if (browser.versions.mobile && browser.versions.android) {
                var $ = require("zepto");
                $.ajax({
                    url: "https://www.uupt.com/Handler/down.ashx?ctype=3&r=" + Math.random(),
                    success: function(result) {
                        window.location.href = result;
                    }
                });
                return;
            }
            if (browser.versions.mobile && browser.versions.ios) {
                downurl = iosDown;
            }
            if (browser.versions.mobile && browser.versions.iPhone) {
                downurl = iosDown;
            }
            if (browser.versions.mobile && browser.versions.iPad) {
                downurl = iosDown;
            }

        }
        window.location.href = downurl;
    },

}
export default downLoad