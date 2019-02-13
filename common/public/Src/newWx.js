/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-17 23:13:21 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-17 23:13:44
 * @description  微信分享配置方法 用于activity2.0项目  (暂时废弃)
 */
import page from "./page"
import uPop from "./uPop"
import wx from "weixin-js-sdk"
import Util from "./util"
var wxShare = {
    share: function(data) {
        data = data || {};
        if (!page.Versions().weiXin) {
            console.info("不在微信");
            return;
        }
        var wxConfig_appId, wxConfig_timestamp, wxConfig_nonceStr, wxConfig_signature, jsApiList;
        var sid = page.Request("sid") || page.VueRequest("sid") || data.sid;
        var cityid = page.Request("cityid") || page.VueRequest("cityid") || data.cityid;
        var sccid = page.Request("sccid") || page.VueRequest("sccid") || data.sccid;
        var activitycode = page.Request("activitycode") || page.VueRequest("activitycode") || data.activitycode;
        var extid = page.Request("extid") || page.VueRequest("extid") || data.extid;
        GetWeixinConfig();

        function GetWeixinConfig() {
            Util.post({
                url: data.url+"/Handler/Common.ashx?action=getwxshareconfig",
                data: {
                    activitycode: activitycode,
                    url: window.location.href.split("#")[0]
                },
                success: function(res) {
                    if (!res.IsError) {
                        wxConfig_appId = res.Body.appId;
                        wxConfig_timestamp = res.Body.timestamp;
                        wxConfig_nonceStr = res.Body.nonceStr;
                        wxConfig_signature = res.Body.signature;
                        jsApiList = res.Body.jsApiList;
                        wxconfig();
                    } else {
                        uPop.msg("微信授权失败");
                    }
                },
				noLoad: true
            })
        }

        function wxconfig() {
            wx.config({
                debug: false,
                appId: wxConfig_appId,
                timestamp: wxConfig_timestamp,
                nonceStr: wxConfig_nonceStr,
                signature: wxConfig_signature,
                jsApiList: jsApiList
            });
        }
        var share_config = {
            title: data.title || "又一款火爆朋友圈的APP！高逼格的人都已经在用了...",
            desc: data.desc || "人人都在用的网红UU跑腿，同城代买、代送、代排队等，高效快捷，省事省心，速来体验~",
            link: data.link || window.location.href.replace(/\WWxUserInfo.+/, ""),
            imgUrl: data.imgUrl || "http://files.uupaotui.com/UUPTLogo/uushare.jpg",
            success: function() {
                if (typeof(data.success) == "function") {
                    data.success();
                } else {
                    if (sid != null || sccid != null) {
                        Util.post({
                            url: data.url+"/Pages/Common/tplservice/updatewxshare.action",
                            data: {
                                sccid: sccid,
                                activicode: activicode,
                                sid: sid,
                                extid: extid
                            },
                            success: function(res) {
                                console.log(res);
                            }
                        })
                    }
                }
            },
            cancel: function() {
                uPop.msg("已取消分享");
            },
            fail: function() {
                uPop.msg("分享失败");
            }
        };
        wx.ready(function() {
            // 分享到朋友圈
            wx.onMenuShareTimeline(share_config);
            //分享给朋友
            wx.onMenuShareAppMessage(share_config);
            //分享到QQ
            wx.onMenuShareQQ(share_config);
            //分享到腾讯微博
            wx.onMenuShareWeibo(share_config);
            wx.error(function(res) {
                alert(res.errMsg);
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        })
    }
}
export default wxShare