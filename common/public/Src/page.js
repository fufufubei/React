/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-17 23:13:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-24 17:11:03
 * @description 封装的公共方法
 */
let viewH = document.documentElement.clientHeight || document.body.clientHeight;
export default {
    //处理安卓手机点击Input框时不会自动上移问题
    dealWithInput() {
        if (/Android [4-8]/.test(navigator.appVersion)) {
            window.addEventListener('resize', function() {
                if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                    document.getElementsByTagName('html')[0].style.height = `${viewH}px`;
                    document.body.style.height = `${viewH}px`;
                    window.setTimeout(function() {
                        document.activeElement.scrollIntoViewIfNeeded()
                    }, 0)
                }
            })
        }
    },
    //禁止双击上移
    ProMove: function() {
        try {
            var agent = navigator.userAgent.toLowerCase(); //检测是否是ios
            var iLastTouch = null; //缓存上一次tap的时间
            if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
                document.body.addEventListener('touchend', function(event) {
                    var iNow = new Date().getTime();
                    iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
                    var delta = iNow - iLastTouch;
                    if (delta < 500 && delta > 0) {
                        event.preventDefault();
                        return false;
                    }
                    iLastTouch = iNow;
                }, false);
            }
        } catch (e) {
            console.info(e);
        }

    },
    ///格式化时间
    FmtTime: function(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份   
            "d+": date.getDate(), //日   
            "h+": date.getHours(), //小时   
            "m+": date.getMinutes(), //分   
            "s+": date.getSeconds(), //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    //获取浏览器版本
    Versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
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
    },
    //创健cookie
    CreateCookie: function(a, b, c, d) {
        var d = d ? d : "/";
        if (c) {
            var e = new Date;
            e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c);
            var f = "; expires=" + e.toGMTString();
        } else {


            var f = "";
        }
        document.cookie = a + "=" + b + f + "; path=" + d;
    },
    //读取 cookie
    ReadCookie: function(a) {
        for (var b = a + "=",
                c = document.cookie.split(";"), d = 0; d < c.length; d++) {
            for (var e = c[d];
                " " == e.charAt(0);) e = e.substring(1, e.length);
            if (0 == e.indexOf(b)) return e.substring(b.length, e.length)
        }
        return null
    },
    DelCookie: function(name) {
        var that = this;
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = that.ReadCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    //获取url参数wq
    Request: function(name) {
        var reg = new RegExp("([&,?])" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;

    },
    //针对Vue路由跳转获取地址栏参数
    VueRequest: function(name) {
        var reg = new RegExp("([&,?])" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.hash.match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    },
    ///设置锚点
    SetHash: function() {
        function setHash() {
            var hash = window.location.hash;
            if (hash.length < 3 && hash != "") {
                return;
            }
            var hashlist = $("div[data-target]");
            hashlist.hide();
            var dom = $("div[data-target='" + hash + "']");
            if (hash == "" || dom.length == 0) {
                return hashlist.eq(0).show();
            }
            dom.show();
        }
        window.onhashchange = function() {
            setHash();
        }
        setHash();
    },
    /**
     * 过滤手机号
     * @param {Number} tel 
     */
    filterPhone(tel){
        var phone=String(tel).replace(/[^\d.]+/g,'').replace(/^\+?86/g, '').substring(0, 11);
        return phone;
    }
}