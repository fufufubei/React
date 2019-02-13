// import $ from "zepto";
import Util from "./util.js"
import Page from "./page.js"

//公众号二维码
var wxqr = {
    //二维码列表
    qr_list: [{
            cityid: 379,
            cityname: "郑州市",
            name: 'UU跑腿官网',
            img: 'http://files.uupaotui.com/wxqr/UU%E8%B7%91%E8%85%BF%E5%AE%98%E7%BD%91.png'
        },
        {
            cityid: 105,
            cityname: "杭州市",
            name: '杭州UU跑腿',
            img: 'http://files.uupaotui.com/wxqr/%E6%9D%AD%E5%B7%9E.png'
        },
        {
            cityid: 28,
            cityname: "北京市",
            name: '北京UU跑腿',
            img: 'http://files.uupaotui.com/wxqr/%E5%8C%97%E4%BA%AC.png'
        },
        {
            cityid: 206,
            cityname: "南京市",
            name: '南京UU跑腿',
            img: 'http://files.uupaotui.com/wxqr/%E5%8D%97%E4%BA%AC.jpg'
        }
    ],
    //默认二维码
    def_qr: {
        cityid: 0,
        cityname: "全国",
        name: 'UU跑腿',
        img: 'http://files.uupaotui.com/wxqr/UU%E8%B7%91%E8%85%BF.png'
    }
}
var appWebUrl = function appWebUrl() {
    var url = "http://192.168.6.100:809";
    if (window.location.href.toLowerCase().indexOf("http://appweb") > -1  ) {
        url = "http://appweb.uupaotui.com";
    }else if(window.location.href.toLowerCase().indexOf("https://appweb") > -1){
         url = "https://appweb.uupt.com";
    }
    return url;
};
var activityWebUrl = function activityWebUrl() {
    var url = "http://192.168.6.2:9205";
    if (window.location.href.toLowerCase().indexOf("http://activity") > -1) {
        url = "http://activity.uupaotui.com";
    }else if( window.location.href.toLowerCase().indexOf("https://activity") > -1){
         url = "https://activity.uupt.com";
    }
    
    return url;
};
//根据城市获取微信二维码
var getWxInfo = function(cityid) {

    cityid = cityid || Page.Request("cityid") || Page.VueRequest("cityid");
    var i = wxqr.qr_list.filter(function(value, index) {
        return value.cityid == cityid;
    });
    if (typeof i != "undefined" && i.length > 0) {
        return i[0];
    } else {
        return wxqr.def_qr;
    }
}

//分享标题图标说明
var getShareInfo = function(cityid) {
    cityid = cityid || Page.Request("cityid") || Page.VueRequest("cityid");
    var data = {
        driver: {
            title: "火爆！万人追捧的理想工作，活好钱多轻松过万，再不上车就...",
            content: "已经超过50万人加入UU跑腿，工作轻松，时间自由、收入丰厚。现在加入，千万不要错过~",
            logo: "http://files.uupaotui.com/UUPTLogo/uushare.jpg",
            url: ""
        },
        user: {
            title: "又一款火爆朋友圈的APP！高逼格的人都已经在用了...",
            content: "人人都在用的网红UU跑腿，同城代买、代送、代排队等，高效快捷，省事省心，速来体验~",
            logo: "http://files.uupaotui.com/UUPTLogo/uushare.jpg",
            url: ""
        }
    };
    //console.log(activityWebUrl());
    Util.post({
        url: activityWebUrl() + "/action/share/getshare.action",
        data: { cityid: cityid },
        success: result => {
            if (!result.IsError) {
                if (result.Body.user.title == "") {
                    result.Body.user = data.user;
                }
                if (result.Body.driver.title == "") {
                    result.Body.driver = data.driver;
                }
                data = result.Body;
            }
        },
        noLoad:true
    })
    // $.ajax({
    //     url: activityWebUrl() + "/action/share/getshare.action",
    //     data: { cityid: cityid },
    //     async: false,
    //     dataType: "json",
    //     success: function(result) {
    //         if (!result.IsError) {
    //             if (result.Body.user.title == "") {
    //                 result.Body.user = data.user;
    //             }
    //             if (result.Body.driver.title == "") {
    //                 result.Body.driver = data.driver;
    //             }
    //             data = result.Body;
    //         }
    //     }
    // });
    return data;
}
export default {
    wxqr: wxqr,
    appWebUrl: appWebUrl(),
    activityWebUrl: activityWebUrl(),
    getWxQrInfo: getWxInfo,
    getShareInfo: getShareInfo
}