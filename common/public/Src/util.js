/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-17 23:15:30 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2018-06-17 23:15:30 
 * @description  封装的axios请求方法
 */


import Ajax from "axios"
import Qs from "qs"
import uPop from "./uPop"
import JM from "./jm_kf.js"

function ajax(data) {
    if (data.noLoad != true) {
        uPop.loading();
    }
    Ajax({
        method: data.method || "get",
        url: data.url,
        headers: data.headers,
        params: data.params,
        data: data.data,
        transformRequest: [function (data) {
            data = Qs.stringify(data);
            return data
        }]
    }).then(function (result) {
        if (typeof data.success == 'function') {
            if (data.noLoad != true) {
                setTimeout(function () {
                    uPop.close();
                }, 500)

                setTimeout(function () {
                    data.success(result.data);
                }, 600)
            } else {
                data.success(result.data);
            }

        }
    }).catch(function (error) {
        if (data.noLoad != true) {
            uPop.close();
        }
        uPop.msg(error);
        if (typeof data.error == 'function') {
            data.error(error);
        }
    })
}
var util = {
    uuJM: JM,
    //get请求
    /*参数:{
       url:请求地址
       //传输的数据
       params:{

       },
       success 成功后的回调函数
       error 失败后的回调函数
    }*/
    get: function (data) {
        ajax({
            method: "get",
            url: data.url,
            headers: data.headers || { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: data.params,
            success: data.success,
            error: data.error,
            noLoad: data.noLoad || false
        });
    },
    //post请求
    /*参数:{
       url:请求地址
       //传输的数据
       data:{

       },
       success 成功后的回调函数
       error 失败后的回调函数
    }*/
    post: function (data) {
        ajax({
            method: "post",
            url: data.url,
            headers: data.headers || { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: data.data,
            success: data.success,
            error: data.error,
            noLoad: data.noLoad || false
        });
    },
    //session存储  如果只传入key则返回当前key对应的session值
    /**
     * 
     * key:存储名称
     * val:存储的数据
     */
    session: function (key, val) {
        if (val) {
            if (typeof val == "object") {
                val = JSON.stringify(val);
            }
            sessionStorage.setItem(key, val);
            return;
        }
        var sessionMes;
        try {
            sessionMes = JSON.parse(sessionStorage.getItem(key));
        } catch (e) {
            sessionMes = sessionStorage.getItem(key);
        }
        return sessionMes
    },
    //移除session
    removeSession: function (key) {
        if (sessionStorage.getItem(key)) {
            sessionStorage.removeItem(key);
        }
    },
    //禁止双击上移
    ProMove: function () {
        try {
            var agent = navigator.userAgent.toLowerCase(); //检测是否是ios
            var iLastTouch = null; //缓存上一次tap的时间
            if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
                document.body.addEventListener('touchend', function (event) {
                    var iNow = new Date().getTime();
                    iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */;
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
    ///格式化时间  date时间对象  fmt时间格式 如yyyy/MM/dd hh:mm:ss
    FmtTime: function (date, fmt) {
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
    Versions: function () {
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
    /**
     * a cookie名称
     * b cookie值
     * c cookie过期时间
     */
    CreateCookie: function (a, b, c, d) {
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
    ReadCookie: function (a) {
        for (var b = a + "=",
            c = document.cookie.split(";"), d = 0; d < c.length; d++) {
            for (var e = c[d];
                " " == e.charAt(0);) e = e.substring(1, e.length);
            if (0 == e.indexOf(b)) return e.substring(b.length, e.length)
        }
        return null
    },
    DelCookie: function (name) {
        var that = this;
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = that.ReadCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    //获取url参数
    Request: function (name) {
        var reg = new RegExp("([&,?])" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;

    },
    GetQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    },
    //针对Vue路由跳转获取地址栏参数
    VueRequest: function (name) {
        var reg = new RegExp("([&,?])" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.hash.match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    },
    //检测手机号
    checkPhone: function (m) {
        var regTel = /^[1]{1}\d{10}$/;
        if (regTel.test(m)) {
            return true
        } else {
            return false
        }
    }
}
export default util