/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-17 23:12:37 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2018-06-17 23:12:37 
 * @description  前端加密方法
 */
var JM = {
    // 加密/解密方法
    Enuu: function(obj, flag) { // flag：ture加密false解密，默认加密
        if (flag === undefined) flag = true;
        // 判断类型
        var _type = (obj instanceof Array) ? "array" : (typeof obj);
        // 数字类型大于10位数按字符串处理
        if (typeof obj === "number" && String(obj).length > 10) {
            _type = "string";
            obj = String(obj);
        }
        // 各个类型的处理
        switch (_type) {
            case "string":
                return flag ? this.jia(obj) : this.jie(obj);
                break;
            case "array":
                // 转到数组处理方法
                return this.handleArr(obj, flag);
                break;
            case "number":
                // 加密和解密方法处理和返回的都是字符串，使用的时候转为字符串，返回的时候转为number类型
                return flag ? Number(this.jia(String(obj))) : Number(this.jie(String(obj)));
                break;
            case "object":
                // 转到对象处理方法
                return this.handleObj(obj, flag);
                break;
        }
    },
    // 处理对象数据
    handleObj: function(obj, flag) {
        var _obj = {};
        // 遍历对象
        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) continue;
            // 递归处理对象里的所有参数
            _obj[key] = this.Enuu(obj[key], flag);
        }
        return _obj;
    },
    // 处理数组数据
    handleArr: function(obj, flag) {
        var arr = [];
        // 遍历数组
        obj.map(function(item) {
            // 递归处理多维数组
            item = this.Enuu(item, flag);
            arr.push(item);
        }.bind(this))
        return arr;
    },
    // 加密
    jia: function(str) {
        var es = [],
            c = '',
            ec = '';
        if (typeof str === "string") {
            str = str.split('');
        }
        // 遍历
        for (var i = 0, length = str.length; i < length; i++) {
            // 获取每个字符的encode
            c = str[i];
            ec = encodeURIComponent(c);
            // 如果encode等于原字符转16进制
            if (ec == c) {
                if (typeof c === "string") {
                    ec = c.charCodeAt().toString(16);
                }
                ec = ('00' + ec).slice(-2);
            }
            es.push(ec);
        }
        // 转为字符串，去掉字符串所有的‘%’并转为大写
        return es.join('').replace(/%/g, '').toUpperCase();
    },
    // 解密
    jie: function(str) {
        // 每隔两个加上%
        for (var i = 0, len = str.length, result = "%"; i < len; i++) {
            result += str[i];
            if (i % 2 == 1) result += '%';
        }
        // 去掉最后一个%
        result = result.substring(0, result.length - 1);
        return decodeURIComponent(result);
    },
    // 终端类型
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核 1 
            presto: u.indexOf('Presto') > -1, //opera内核 2
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 3
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 4
            iOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 5
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端 6
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 7
            iPad: u.indexOf('iPad') > -1, //是否iPad 8
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部 9
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）10
            qq: u.match(/\sQQ/i) == " qq" //是否QQ 11
        };
    }(),
    // 获取屏幕分辨率
    getPcSize: function() {
        return (window.screen.width + " * " + window.screen.height);
    },
    // 返回终端类型字符串
    getVer: function() {
        var ver = this.versions,
            a;
        // 遍历终端对象
        for (var i in ver) {
            if (!ver.hasOwnProperty(i)) continue;
            // console.log(i + ": " + ver[i]);
            if (ver[i]) {
                a = i;
            }
        }
        return a;
    },
    // 对应终端类型
    getNum: function(str) {
        switch (str) {
            case "trident":
                return 1;
                break;
            case "presto":
                return 2;
                break;
            case "webKit":
                return 3;
                break;
            case "gecko":
                return 4;
                break;
            case "mobile":
                return 5;
                break;
            case "iOS":
                return 6;
                break;
            case "android":
                return 7;
                break;
            case "iPhone":
                return 8
                break;
            case "iPad":
                return 9;
                break;
            case "webApp":
                return 10;
                break;
            case "weixin":
                return 11;
                break;
            default:
                return 12;
                break;

        }
    },
    // 获取操作系统
    detectOS: function() {
        var sUserAgent = navigator.userAgent;
        var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
        var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        if (isMac) return "Mac";
        var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
        if (isUnix) return "Unix";
        var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
        if (isLinux) return "Linux";
        if (isWin) {
            var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
            if (isWin2K) return "Win2000";
            var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
            if (isWinXP) return "WinXP";
            var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
            if (isWin2003) return "Win2003";
            var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
            if (isWinVista) return "WinVista";
            var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
            if (isWin7) return "Win7";
        }
        return "other";
    },
    // 获取混淆后的head信息
    getData: function(ver, otherObj) { // 版本号，其他对象
        var reqHead = {
            ver: ver,
            headinfo: this.getPcSize() + "," + this.getNum(this.getVer()) + "," + this.detectOS(), // 分辨率、平台、操作系统
            plat: this.versions.iOS ? 1 : this.versions.android ? 2 : 3
        };
        reqHead.headinfo = this.Enuu(reqHead.headinfo, true);
        return (otherObj !== undefined && otherObj instanceof Object) ? Object.assign(otherObj, reqHead) : reqHead;
    }
}
export default JM