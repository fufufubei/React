/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-17 23:10:59 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-16 14:15:42
 * @description 以下为调用客户端原生方法
 */
var browser = {
    versions: function () {
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

//用户端appjS
var userApp = {
    // 下单（尝鲜社）
  RushToBuy: function RushToBuy(data) {
    if (browser.versions.mobile && browser.versions.android) {
      window.slkj.RushToBuy(JSON.stringify(data));
    } else if (browser.versions.mobile && browser.versions.ios) {
      window.location.href = "objc://RushToBuy:/" + encodeURIComponent(JSON.stringify(data));
    }
  },

  // 分享给好友（尝鲜社活动）
  ShareToFriend: function ShareToFriend(data) {
    if (browser.versions.mobile && browser.versions.android) {
      window.slkj.ShareToFriend(JSON.stringify(data));
    } else if (browser.versions.mobile && browser.versions.ios) {
      window.location.href = "objc://ShareToFriend:/" + encodeURIComponent(JSON.stringify(data));
    }
  },
    // 跳转小程序
    GotoMiniProgram(appId,path) {
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.GotoMiniProgram(appId, path);
        } else if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://GotoMiniProgram:/" + appId + ":/" + path;
        }
    },
    // 跳大厅
    gotoMainPanel(){
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.gotoMainPanel();
        } else if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://gotoMainPanel:/";
        }
    },
    //跳转充值页面
    GoRecharge: function () {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.GoRecharge();
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://GoRecharge:/";
        }
    },
    ////去订单主页 type:web
    gotoOrder: function (id) {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.gotoDetail(id);
        }
        //如果为苹果手机
        else if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://goOrderDetail:/" + encodeURIComponent(id);
        }
    },
    /**
     * 帮买商城跳转下单
     * @param {Number} activityId 活动id
     * @param {Number} orderId 订单id
     */
    goBuyMallPlaceOrder: function (activityId, orderId) {
        if (!orderId) {
            orderId = 0;
        }
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.goBuyMallPlaceOrder(activityId, orderId);
        }
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://goBuyMallPlaceOrder:/" + activityId + ':/' + orderId
        }
    },
    ResultCheckCityInfo: function (CityID, CityName) {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.ResultCheckCityInfo(CityID, CityName);
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://ResultCheckCityInfo:/" + encodeURIComponent(CityID) + ":/" + encodeURIComponent(CityName)
        }
    },
    //去优惠券列表
    gotocouponlist: function () {
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.gotocouponlist();
        }
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://gotocouponlist:/";
        }
    },
    //跳转商户注册
    gotoSellerRegister: function () {
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.gotoSellerRegister();
        }
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://gotoSellerRegister:/";
        }
    },
    //去客户端首页
    goPTIndex: function () {
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.gotoMainPanel();
        }
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://gotoMainPanel:/";
        }
    },

    //去用户端个人资料
    goEditUserPersonData: function () {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.gotoUserPersonData();
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://gotoUserPersonData:/";
        }
    },
    //获取客户端消息通知个数
    GetMessageNum: function () {
        if (browser.versions.mobile && browser.versions.android) {
            if (slkj != undefined) {
                slkj.GetMessageNum();
            }
        } else if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://GetMessageNum:/";
        }
    },
    //设置消息通知个数(初始化为0)
    SetClientMessageNum: function (num) {
        if (browser.versions.mobile && browser.versions.android) {
            if (slkj != undefined) {
                slkj.SetClientMessageNum(num);
            }
        } else if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://SetClientMessageNum:/";
        }
    },
    //返回到指定的url
    BackToUrl: function (Address) {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.BackToUrl(Address);
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://BackToUrl:/" + encodeURIComponent(Address);
        }
    },
    //保存交通运输工具 Transports==json字符串
    SaveTransport: function (Transports) {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.SaveTransport(Transports);
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://SaveTransport:/" + encodeURIComponent(Transports);
        }
    },
    //企业版开通之后跳转企业版首页
    goEnterpriseHomePages: function (EnterpriseId, RoleId) {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.goEnterpriseHomePage(EnterpriseId, RoleId);
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            goEnterpriseHomePage(EnterpriseId, RoleId);
            // window.location.href = "objc://OpenGroupChat:";
        }
    },
    //无秘支付绑定
    OpenNonSecretPays: function (state, source) {
        try {
            //如果为安卓手机
            if (browser.versions.mobile && browser.versions.android) {
                window.slkj.OpenNonSecretPay(state, source);
            }
            //如果为苹果手机
            if (browser.versions.mobile && browser.versions.ios) {
                window.location.href = "objc://OpenNonSecretPay:/" + state + ":/" + source;
            }
        } catch (e) {
            console.log(e);
        }
    },
};
//跑男js
var driverApp = {

    //如果待完成里面还有订单则跳转到待完成列表，如果没有跳转到接单大厅
    gotoNewOrder: function () {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.gotoNewOrder();
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://gotoNewOrder:";
        }
    },
    ////司机去登陆
    gotoLogin: function (username, password) {
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.gotoLogin(username, password);
        }
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://gotoLogin:/" + encodeURIComponent(username) + ":/" + encodeURIComponent(password);
        }
    },

    //跑男充值调起支付宝支付
    DriverAliPay: function (order, OrderUrl) {
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.AliPay(order, OrderUrl);
        }
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://AliPay:/" + OrderUrl;
        }
    },
    DriverWxPay: function (signOption) {
        try {
            if (browser.versions.mobile && browser.versions.android) {
                window.slkj.WeiPay(signOption.order, signOption.appid, signOption.noncestr, signOption.package, signOption.partnerid, signOption.prepayid, signOption.sign, signOption.timestamp);
            }
            if (browser.versions.mobile && browser.versions.ios) {
                window.location.href = "objc://WeiPay:/" + encodeURIComponent(signOption.order) + ":/" + encodeURIComponent(signOption.appid) + ":/" + encodeURIComponent(signOption.noncestr) + ":/" + signOption.package + ":/" + encodeURIComponent(signOption.partnerid) + ":/" + encodeURIComponent(signOption.prepayid) + ":/" + encodeURIComponent(signOption.sign) + ":/" + encodeURIComponent(signOption.timestamp);
            }
        } catch (e) {
            alert(e);
        }
    },
    //去飞人端意见反馈
    goDriverFeedBack: function () {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.goDriverFeedBack();
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://goDriverFeedBack:/";
        }
    },
    //去跑男端设置中心
    goDriverPersonData: function () {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.goDriverPersonData();
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://goDriverPersonData:/";
        }
    },
    //改变跑男状态
    UpdateDriverAccoutState: function (content, title, linkurl) {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.UpdateDriverAccoutState(content, title, linkurl);
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://UpdateDriverAccoutState:/" + encodeURIComponent(content) + ":/" + encodeURIComponent(title) + ":/" + encodeURIComponent(linkurl);
        }
    },
    //U币商城支付宝在线支付
    UUAliPay: function (OrderUrl, Type, backUrl) {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.UUAliPay(OrderUrl, Type, encodeURIComponent(backUrl));
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://UUAliPay:/" + OrderUrl + ":/" + Type + ":/" + encodeURIComponent(backUrl);
        }
    },
    //U币商城微信在线支付
    UUWxPay: function (signOption, Type, backUrl) {
        try {
            //如果为安卓手机
            if (browser.versions.mobile && browser.versions.android) {
                window.slkj.UUWeiPay(signOption.appid, signOption.noncestr, signOption.package, signOption.partnerid, signOption.prepayid, signOption.sign, signOption.timestamp, Type, encodeURIComponent(backUrl));
            }
            //如果为苹果手机 
            if (browser.versions.mobile && browser.versions.ios) {
                window.location.href = "objc://UUWeiPay:/" + encodeURIComponent(signOption.order) + ":/" + encodeURIComponent(signOption.appid) + ":/" + encodeURIComponent(signOption.noncestr) + ":/" + signOption.package + ":/" + encodeURIComponent(signOption.partnerid) + ":/" + encodeURIComponent(signOption.prepayid) + ":/" + encodeURIComponent(signOption.sign) + ":/" + encodeURIComponent(signOption.timestamp) + ":/" + Type + ":/" + encodeURIComponent(backUrl);
            }
        } catch (e) {
            alert(e);
        }
    },
    //跳转充值页面
    GotoRecharge: function () {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.GoRecharge();
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://GoRecharge:/";
        }
    },
    CleanLocalHistory: function () {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.CleanLocalHistory();
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://CleanLocalHistory:/";
        }
    },
    //更新保温箱是否携带
    isCarrayUUBoxs: function (state) {
        try {
            //如果为安卓手机
            if (browser.versions.mobile && browser.versions.android) {
                window.slkj.isCarrayUUBox(state);
            }
            //如果为苹果手机
            if (browser.versions.mobile && browser.versions.ios) {
                isCarrayUUBox(state);
            }
        } catch (e) {

        }
    },
    /**
     * 更新跑男设置信息
     */
    updateDriverSelfInfo() {
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj && window.slkj.UpdateSelfInfo();
        } else {
            window.location.href = "objc://UpdateSelfInfo:/"
        }
    },
    ///截屏分享  跑男端1.7.0以上版本支持，
    ScreenshotSharing: function () {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            try {
                window.slkj.ScreenshotSharing();
            } catch (e) {
                alert(e);
            }
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://ScreenshotSharing:/";
        }
    },


};
window.getDeviceInfoCallback = function (result) {
    return result;
};
///跑男和用户端共用js
var app = {
    //获取设备信息
    getDeviceInfo: function (call) {

        if (browser.versions.mobile && browser.versions.android) {
            if (typeof call == 'function') {
                try {
                    call(window.slkj.GetDeviceInfo());
                } catch (e) {
                    alert(e);
                }
            }
        } else if (browser.versions.mobile && browser.versions.ios) {
            window.webkit.messageHandlers.FeirenAppAction.postMessage({ "method": "ios_GetDeviceInfo", "param1": "app.getDeviceInfoCallback" });
        }
    },
    //获取微信用户信息
    ///type:1:  微信。2，QQ ,callBackFun:回调函数，客户端调我提供的js方法名称，参数 head,nick
    GetWxInfo: function (type, callBackFun) {
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.GetHeadNickNameInfo(type, callBackFun);
        } else if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://GetHeadNickNameInfo:/" + type + ":/" + callBackFun;
        }
    },
    //分享内容
    /**type参数说明**/
    /******************
    0 微信
    1 微信朋友圈
    2 QQ
    3 QQ空间
    
    4 新浪微博
    5 短信
    7 剪切板

    ******************/
    share: function (url, title, content, type, logo) {
        //如果是短信则转成新浪短网网址
        if (type == 5) {
            var $ = require("zepto");
            $.ajax({
                type: "get",
                dataType: "text",
                async: false,
                url: "/handler/Common.ashx?action=shorturl&longurl=" + url,
                success: function (result) {
                    console.info(result);
                    if (result.length > 0) {
                        url = result;
                    }
                }
            });
        }
        if (browser.versions.mobile && browser.versions.android) {
            if (typeof logo != "undefined") {
                window.slkj.openShare(url, title, content, type, logo);
            } else {
                window.slkj.openShare(url, title, content, type);
            }

        }
        if (browser.versions.mobile && browser.versions.ios) {
            if (typeof logo != "undefined") {

                window.location.href = "objc://openShare:/" + encodeURIComponent(url) + ":/" + encodeURIComponent(title) + ":/" + encodeURIComponent(content) + ":/" + encodeURIComponent(type) + ":/" + encodeURIComponent(logo);
            } else {
                window.location.href = "objc://openShare:/" + encodeURIComponent(url) + ":/" + encodeURIComponent(title) + ":/" + encodeURIComponent(content) + ":/" + encodeURIComponent(type);
            }
        }
    },
    share2: function (data) {
        app.share(data.url, data.title, data.content, data.type, data.logo);

    },
    ///客户端分享晒单图片
    /** type参数说明**/
    /******************
    0 微信
    1 微信朋友圈
    2 QQ
    3 QQ空间
    **/
    ShareImage: function (type, title, imagePath) {

        if (browser.versions.mobile && browser.versions.android) {
            try {
                window.slkj.SVIPShareImage(type, title, imagePath);
            } catch (e) {
                alert(e);
            }

        } else if (browser.versions.mobile && browser.versions.ios) {


            window.location.href = "objc://SVIPShareImage:/" + encodeURIComponent(type) + ":/" + encodeURIComponent(title) + ":/" + encodeURIComponent(imagePath);
        }

    },
    //发送短信
    SendSmS: function (mobile, content) {
        var url = "";
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            url = "smsto:" + mobile + "?body=" + content;
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            url = "sms:" + mobile + "&body=" + content;
        }
        window.location = url;
    },
    //更新标题
    UpdateWebTitel: function (content) {
        if (browser.versions.mobile && browser.versions.android) {
            if (typeof slkj != "undefined") {
                slkj.updateWebTitle(content)
            }
        }
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://updateWebTitle:/" + encodeURIComponent(content);
        }
    },
    ///隐藏标题
    HideWebTitle: function () {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {

            window.slkj.HideWebTitle();
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://HideWebTitle:/";
        }
    },
    //改变IOS状态栏颜色
    HiddenTitleWithStatusBarColors: function (IsSetColor) {
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            HiddenTitleWithStatusBarColor(IsSetColor);
        }
    },
    //调用通讯录（参数：短信内容）
    BookFriends: function (content) {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.InviteAddressBookFriends(content);
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            //window.location.href = "objc://InviteAddressBookFriends:/" + encodeURIComponent(content);
            InviteAddressBookFriends(content);
        }
    },
    goPhone: function (phone) {
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.getphone(phone);
        }
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://goTel:/" + encodeURIComponent(phone);
        }
    },
    //下一页
    goBack: function () {
        if (browser.versions.mobile && browser.versions.android) {
            if (slkj != undefined) {
                slkj.goback();
            }
        }
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://goback:/";
        }
    },
    //跑男下载
    gotodown_driver: function () {
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
                    success: function (result) {
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
    //U币商城支付宝在线支付
    UUAliPay: function (OrderUrl, Type, backUrl) {
        //如果为安卓手机
        if (browser.versions.mobile && browser.versions.android) {
            window.slkj.UUAliPay(OrderUrl, Type, encodeURIComponent(backUrl));
        }
        //如果为苹果手机
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "objc://UUAliPay:/" + OrderUrl + ":/" + Type + ":/" + encodeURIComponent(backUrl);
        }
    },
    //U币商城微信在线支付
    UUWxPay: function (signOption, Type, backUrl) {
        try {
            //如果为安卓手机
            if (browser.versions.mobile && browser.versions.android) {
                window.slkj.UUWeiPay(signOption.appid, signOption.noncestr, signOption.package, signOption.partnerid, signOption.prepayid, signOption.sign, signOption.timestamp, Type, encodeURIComponent(backUrl));
            }
            //如果为苹果手机 
            if (browser.versions.mobile && browser.versions.ios) {
                window.location.href = "objc://UUWeiPay:/" + encodeURIComponent(signOption.order) + ":/" + encodeURIComponent(signOption.appid) + ":/" + encodeURIComponent(signOption.noncestr) + ":/" + signOption.package + ":/" + encodeURIComponent(signOption.partnerid) + ":/" + encodeURIComponent(signOption.prepayid) + ":/" + encodeURIComponent(signOption.sign) + ":/" + encodeURIComponent(signOption.timestamp) + ":/" + Type + ":/" + encodeURIComponent(backUrl);
            }
        } catch (e) {
            alert(e);
        }
    },
    //用户下载
    gotodown_user: function () {
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
                    success: function (result) {
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
    gotodown_business: function () {
        var androidDown = "https://down1.uupt.com/APP/merchant/UUpaotui_M_1.0.0.0_20170804.apk";
        var iosDown = "https://itunes.apple.com/cn/app/uu%E5%95%86%E5%AE%B6%E7%89%88/id1259780596?mt=8";
        var wxdown = "http://a.app.qq.com/o/simple.jsp?pkgname=com.slkj.paotui.shopclient";
        var downurl = androidDown;
        if (browser.versions.weiXin) {
            downurl = wxdown;
        } else {
            //如果为安卓手机
            if (browser.versions.mobile && browser.versions.android) {
                var $ = require("zepto");
                $.ajax({
                    url: "https://www.uupt.com/Handler/down.ashx?ctype=3&r=" + Math.random(),
                    success: function (result) {
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
    //客户端保存图片 Type 1:用户端 2飞人段
    SavePhotosAlbum: function (Url, Type) {
        try {
            if (browser.versions.mobile && browser.versions.android) {
                window.slkj.SavePhotosAlbum(Url);
            }
            if (browser.versions.mobile && browser.versions.ios) {
                if (Type == 1) {
                    SavePhotosAlbum(Url);
                } else {
                    window.webkit.messageHandlers.FeirenAppAction.postMessage({ "method": "SavePhotosAlbum", "param1": Url })
                }
            }
        } catch (e) {
            alert("请更新最新版客户端");
        }
    },
};
// * ios线上版本1.0.1以后生效 可在网页中直接调起App
var shopApp = {

    //跳转大厅
    goShopIndex: function () {
        if (browser.versions.mobile && browser.versions.android) {
            window.location.href = "uushop://home";
        }
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "com.uu.merchant://home";
        }

    },
    //下单页
    goShopPlaceOrder: function () {
        if (browser.versions.mobile && browser.versions.android) {
            window.location.href = "uushop://addorder";
        }

        if (browser.versions.mobile && browser.versions.ios) {
            // alert("uuMerchantOpenUrl://placeOrder")
            window.location.href = "com.uu.merchant://placeOrder";
        }
    },
    //商户充值页面
    goShopRecharge: function () {
        if (browser.versions.mobile && browser.versions.android) {
            window.location.href = "uushop://recharge";
        }

        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "com.uu.merchant://recharge";
        }

    },
    //优惠券列表
    goShopCoupon: function () {
        if (browser.versions.mobile && browser.versions.android) {
            window.location.href = "uushop://coupon";
        }
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "com.uu.merchant://coupon";
        }
    },
    //消息中心
    goShopMessage: function () {
        if (browser.versions.mobile && browser.versions.android) {
            window.location.href = "uushop://messagecenter";
        }
        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "com.uu.merchant://messageCenter";
        }
    },
    //订单列表
    goShopOrderList: function () {
        if (browser.versions.mobile && browser.versions.android) {
            window.location.href = "uushop://myorderlist";
        }

        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "com.uu.merchant://orderManagement";
        }

    },
    //订单详情 id:订单id
    goShopOrderDetail: function (id) {
        if (browser.versions.mobile && browser.versions.android) {
            window.location.href = "uushop://orderdetail?order_id=" + id;
        }

        if (browser.versions.mobile && browser.versions.ios) {
            window.location.href = "com.uu.merchant://orderDetail?orderId=" + id;
        }

    },
    //我的地址*
    goShopAddress: function (type) {
        if (browser.versions.mobile && browser.versions.android) {
            if (!type)
                type = 0;
            window.location.href = "uushop://myaddress?type=" + type;
        }

        if (browser.versions.mobile && browser.versions.ios) {

        }

    },
    //跑男列表*
    goShopDriver: function () {
        if (browser.versions.mobile && browser.versions.android) {
            window.location.href = "uushop://mydriver";
        }
        if (browser.versions.mobile && browser.versions.ios) {

        }

    },
    //关于我们*
    goShopAbout: function () {
        if (browser.versions.mobile && browser.versions.android) {
            window.location.href = "uushop://about";
        }

        if (browser.versions.mobile && browser.versions.ios) {

        }

    },
    //跳转指定app内内嵌web页面*
    goShopWeb: function (url, title) {
        if (browser.versions.mobile && browser.versions.android) {
            window.location.href = "uushop://web?url=" + url + "&title" + title;
        }

        if (browser.versions.mobile && browser.versions.ios) {

        }

    },
    //登录页
    goShopLogin: function () {
        if (browser.versions.mobile && browser.versions.android) {
            window.location.href = "uushop://login";
        }

        if (browser.versions.mobile && browser.versions.ios) { }

    },

}
///调用app
export default { browser: browser, userApp: userApp, driverApp: driverApp, app: app, shopApp: shopApp }