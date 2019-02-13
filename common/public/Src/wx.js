/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-17 23:16:05 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2018-06-17 23:16:05 
 * @description 微信分享配置 (目前使用的)
 */

import page from "./page.js";
import config from "./config.js";
import lay from "./lay.js";
// import $ from "zepto";
import Util from './util.js'
import wx from 'weixin-js-sdk'
//微信分享
var wxShare = {
    share: function (data) {
        data = data || {};
        // console.info(config.getShareInfo());
        if (!page.Versions().weiXin) {
            console.info("不在微信");
            return;
        }
        // var wx = require("wx");
        var wxConfig_appId, wxConfig_timestamp, wxConfig_nonceStr, wxConfig_signature, jsApiList;
        var wid = data.wid || 3;
        var joggleUrl = "/handler/GetWeiXinConfig.ashx?action=1002&wid=";
        if (wid !== 3) {
            config.activityWebUrl = "http://activity.uupaotui.com"
            joggleUrl = "/handler/GetWeiXinConfigV2.ashx?action=1002&wid="
        }
        GetWeixinConfig();
        var shareInfo = config.getShareInfo(data.cityid).user;
        var sid = page.Request("sid") || page.VueRequest("sid") || data.sid;
        var cityid = page.Request("cityid") || page.VueRequest("cityid") || data.cityid;
        var sccid = page.Request("sccid") || page.VueRequest("sccid") || data.sccid;
        if (sid != null && sid.indexOf("200") > -1) {
            shareInfo = config.getShareInfo().driver;
        }
        function GetWeixinConfig() {
            Util.post({
                url: config.activityWebUrl + joggleUrl + wid,
                data: {
                    url: window.location.href.split("#")[0]
                },
                success: json => {
                    if (json.State == "1") {
                        wxConfig_appId = json.Body.appId;
                        wxConfig_timestamp = json.Body.timestamp;
                        wxConfig_nonceStr = json.Body.nonceStr;
                        wxConfig_signature = json.Body.signature;
                        jsApiList = json.Body.jsApiList;
                        wxconfig();
                    } else {
                        alert("微信授权失败");
                    }
                },
                noLoad:true
            })
            // $.ajax({
            //     type: "post",
            //     url:config.activityWebUrl+"/handler/GetWeiXinConfig.ashx?action=1002&wid="+wid,
            //     async: false,
            //     dataType: "json",
            //     data: {
            //         url: window.location.href.split("#")[0]
            //     },
            //     success: function (json) {
            //         if (json.State == "1") {
            //             wxConfig_appId = json.Body.appId;
            //             wxConfig_timestamp = json.Body.timestamp;
            //             wxConfig_nonceStr = json.Body.nonceStr;
            //             wxConfig_signature = json.Body.signature;
            //             jsApiList=json.Body.jsApiList;
            //             wxconfig();
            //         } else {
            //             alert("微信授权失败");
            //         }
            //     }
            // });
        }
        function wxconfig() {
            wx.config({
                debug: false,
                appId: wxConfig_appId,
                timestamp: wxConfig_timestamp,
                nonceStr: wxConfig_nonceStr,
                signature: wxConfig_signature,
                // jsApiList: jsApiList
                jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    'checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'
                ]
            });
        }
        var share_config = {
            title: data.title || shareInfo.title,
            desc: data.desc || shareInfo.content,
            link: data.link || window.location.href.replace(/\WWxUserInfo.+/, ""),
            imgUrl: data.imgUrl || shareInfo.logo,
            success: function () {
                if (typeof (data.success) == "function") {
                    data.success();
                } else {
                    if (sid != null || sccid != null) {
                        if(wid!=3)return;
                        lay.ajax({
                            url: config.activityWebUrl + "/action/tpl/updatewxshare.action",
                            data: { sid: sid, cityid: cityid, sccid: sccid },
                            success: function (result) {
                                console.info(result);
                            }
                        });
                    }
                }
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                lay.msg("已取消分享");
            },
            fail: function () {
                // 用户确认分享后执行的回调函数
                //window.location.href = link;
                lay.msg("分享失败");
            }
        };
        wx.ready(function () {
            // 分享到朋友圈
            wx.onMenuShareTimeline(share_config);
            //分享给朋友
            wx.onMenuShareAppMessage(share_config);
            //分享到QQ
            wx.onMenuShareQQ(share_config);
            //分享到腾讯微博
            wx.onMenuShareWeibo(share_config);
            wx.error(function (res) {
                alert(res.errMsg);
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        });
    }
}
export default wxShare



