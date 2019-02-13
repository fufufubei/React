/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-17 23:12:56 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-16 14:20:55
 * @description  使用js桥接与客户端交互方法
 */
import Page from "./page.js"
let device = '';
//判断设备引入对应桥接方法
if (Page.Versions().mobile && Page.Versions().ios) {
    require("./iosJsBridge.js")
    device = 'ios';
    console.info("ios");
} else {
    require("./androidJsbridge.js")
    device = 'android';
    console.info("android");
};
//ios调用js方法
let IosCallJs = function(method, call) {
    window.setupWebViewJavascriptBridge(function(bridge) {
        bridge.registerHandler(method, function(data, responseCallback) {
            var responseData = { 'Javascript Says': 'Right back atcha!' }
                // responseCallback(responseData);
            if (typeof call == "function") {
                call(data);
            }
        })
    });
};
//js调用ios方法
let JsCallIos = function(method, params, call) {
    window.setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('uuptObjcCallback', { method: method, params: params },
            function(response) {
                if (typeof call == "function") {
                    call(response);
                }
            })
    });
};
//js调用安卓方法
let JsCallAndroid = function(method, params, call) {
    window.WebViewJavascriptBridge.callHandler('uuptObjcCallback', { method: method, params: params },
        function(response) {
            if (typeof call == "function") {
                call(JSON.parse(response));
            }
        })
};
//安卓调用js方法
let AndroidCallJs = function(method, call) {
    window.WebViewJavascriptBridge.registerHandler(method, function(data, responseCallback) {
        if (typeof call == "function") {
            call(JSON.parse(data));
        }
    });
};
/**
 * app版本 为  跑男端安卓(1.6.2.0)  Ios(1.6.2) 及以上版本支持
 */
//安卓方法  
let AndroidMethod = {
    /**
     * 客户端分享
     * @param {0微信 1 微信朋友圈 2 QQ 3 QQ空间 4 新浪微博 5 短信 7剪切板} type    
        5 7没有回调
     * @param {标题} title 
     * @param {内容} content 
     * @param {图片logo} url 
     */
    openShare(type, title, content, url) {
        return new Promise((resolve, reject) => {
            try {
                JsCallAndroid("openShare", { type, title, content, url }, function(data) {
                    if (typeof call == "function") {
                        /**
                         * State  1:分享成功 2:分享取消  3:分享错误
                         */
                        if (data.State == 1) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    }
                });
            } catch (error) {
                reject(error);
            }

        })

    },
    /**
     * 
     * @param {0 微信   1 微信朋友圈  2 QQ   3 QQ空间} type 
     * @param {标题} title 
     * @param {图片url} url 
     */
    shareImage(type, title, url) {
        return new Promise((resolve, reject) => {
            try {
                JsCallAndroid('shareImage', { type, title, url }, function(data) {
                    if (data.State == 1) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
            } catch (error) {
                reject(error);
            }
        })

    },
    /**
     * @method 调取客户端登录弹窗
     */
    getUserLogin() {
        return new Promise((resolve, reject) => {
            JsCallAndroid("getUserLogin", {}, function(data) {
                try {
                    if (data.State == 1) {
                        //登陆成功
                        //返回用户信息
                        resolve(window.slkj.GetDeviceInfo());
                    } else {
                        //取消登陆
                        reject(data.Msg);
                    }
                } catch (error) {
                    reject(error);
                }
            })
        })

    },
    /********* 以下为UU星球API列表 */
    /**
     * 截屏回调
     */
    onScreenShot() {
        return new Promise((resolve, reject) => {
            try {
                AndroidCallJs("onScreenShot", function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject(error);
            }

        })

    },
    /**
     * 调起通讯录
     */
    getContactList() {
        return new Promise((resolve, reject) => {
            try {
                JsCallAndroid("getContactList", {}, function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject(error);
            }
        })

    },
    /**
     * 是否安装UU跑腿APP
     */
    isInstalluupt() {
        return new Promise((resolve, reject) => {
            try {
                JsCallAndroid("isInstalluupt", {}, function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject();
            }
        })

    },
    /**
     * 获取设备相关信息
     */
    getDeviceInfo() {
        return new Promise((resolve, reject) => {
            try {
                JsCallAndroid("getDeviceInfo", {}, function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject();
            }
        })

    },
    /**
     * 
     * @param {Boolean} show 是否现实
     * @param {String} Title  标题文字
     */
    updateTitleBar(show = true, Title = '', bgColor = '', fontColor = '', isExit = false) {
        return new Promise((resolve, reject) => {
            try {
                JsCallAndroid("updateTitleBar", { show, Title, bgColor, isExit, fontColor }, function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject(error);
            }
        })

    },
    gotouupt() {
        return new Promise((resolve, reject) => {
            try {
                JsCallAndroid("gotouupt", {}, function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject(error);
            }
        })

    },
    /**
     * 
     * @param {String} imagePath  图片路径
     * @param {Sting} imagename 图片名称
     */
    savePhoto(imagePath, imagename) {
        return new Promise((resolve, reject) => {
            try {
                JsCallAndroid("savePhoto", { imagePath, imagename }, function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject(error);
            }
        })

    },
    scanCode() {
        return new Promise((resolve, reject) => {
            try {
                JsCallAndroid("scanCode", {}, function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject(error);
            }
        })
    }
};
//ios方法
let IosMethod = {
    /**
     * 客户端分享
     * @param {0微信 1 微信朋友圈 2 QQ 3 QQ空间 4 新浪微博 5 短信 7剪切板} type    
        5 7没有回调
     * @param {标题} title 
     * @param {内容} content 
     * @param {logo} url 
     * 
     */
    openShare(type, title, content, url) {
        return new Promise((resolve, reject) => {
            try {
                JsCallIos("openShare", { type, title, content, url }, function(data) {
                    /**
                     * State  1:分享成功 0:分享失败
                     */
                    if (data.State == 1) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
            } catch (error) {
                reject(error);
            }
        })
    },
    /**
     * 客户端分享图片
     * @param {0 微信   1 微信朋友圈  2 QQ   3 QQ空间} type 
     * @param {标题} title 
     * @param {图片链接} url 
     */
    shareImage(type, title, url) {
        return new Promise((resolve, reject) => {
            try {
                JsCallIos('shareImage', { type, title, url }, function(data) {
                    /**
                     * State  1:分享成功  0:分享失败
                     */
                    if (data.State == 1) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
            } catch (e) {
                reject(e);
            }

        })
    },
    /**
     * @method 调取客户端登录弹窗
     */
    getUserLogin() {
        return new Promise((resolve, reject) => {
            try {
                JsCallIos("getUserLogin", {}, function(data) {

                    if (data.State == 1) {

                        //登陆成功
                        window.webkit.messageHandlers.FeirenAppAction.postMessage({ "method": "ios_GetDeviceInfo", "param1": "getDeviceInfoCallback" });
                        window.getDeviceInfoCallback = function(result) {
                            //返回用户信息
                            resolve(result);
                        };
                    } else {
                        //取消登陆
                        reject(data.Msg);
                    }

                })
            } catch (error) {
                reject(error);
            }
        })
    },
    /**
     * @method ios新增获取客户端设备信息方法
     */
    newGetDeviceInfo(){
        JsCallIos('ios_GetDeviceInfo',{},function(data){
            resolve(data);
        })
    },
    /**
     * 截屏回调
     */
    onScreenShot() {
        return new Promise((resolve, reject) => {
            try {
                IosCallJs("onScreenShot", function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject(error);
            }

        })

    },
    /**
     * 调起通讯录
     */
    getContactList() {
        return new Promise((resolve, reject) => {
            try {
                JsCallIos("getContactList", {}, function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject(error);
            }
        })

    },
    /**
     * 是否安装UU跑腿APP
     */
    isInstalluupt() {
        return new Promise((resolve, reject) => {
            try {
                JsCallIos("isInstalluupt", {}, function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject();
            }
        })

    },
    /**
     * 获取设备相关信息
     */
    getDeviceInfo() {
        return new Promise((resolve, reject) => {
            try {
                JsCallIos("getDeviceInfo", {}, function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject();
            }
        })

    },
    /**
     * 
     * @param {Boolean} show 是否现实
     * @param {String} Title  标题文字
     */
    updateTitleBar(show = true, Title = '', bgColor = '', fontColor = '', isExit = false, battery = '8,0,69,1') {
        return new Promise((resolve, reject) => {
            try {
                JsCallIos("updateTitleBar", { show, Title, bgColor, fontColor, isExit, battery }, function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject(error);
            }
        })

    },
    gotouupt() {
        return new Promise((resolve, reject) => {
            try {
                JsCallIos("gotouupt", {}, function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject(error);
            }
        })

    },
    /**
     * 
     * @param {String} imagePath  图片路径
     * @param {Sting} imagename 图片名称
     */
    savePhoto(imagePath, imagename) {
        return new Promise((resolve, reject) => {
            try {
                JsCallIos("savePhoto", { imagePath, imagename }, function(data) {
                    resolve(data);
                })
            } catch (error) {
                reject(error);
            }
        })

    }
};
export default device == 'ios' ? IosMethod : AndroidMethod