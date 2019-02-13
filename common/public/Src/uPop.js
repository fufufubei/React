/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-17 23:15:07 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-21 11:30:17
 * @description  简易的移动端弹窗插件
 */
/****2017/09/01    ljy */
require("./layV2/toast.css");
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : 
    typeof define === 'function' && define.amd ? define(factory) : (global.uPop = factory());
})(this, (function () {
    return {
        //加载弹窗默认配置  type 动画类型  text文字
        loadOpt: {
            type: "snake",
            text: "加载中..."
        },
        //加载弹窗当前索引值
        loadIndex: -1,
        //提示弹窗默认配置  defaultType 位置    duration 显示时间  animate 动画效果 
        msgOpt: {
            defaultType: "center",
            duration: 2000,
            animate: 'Scale'
        },
        //当前提示弹窗索引值
        msgIndex: -1,
        //存储多个提示弹窗定时器
        msgTimer: [],
        //当前comfirm弹窗索引值
        popIndex: -1,
        //存储多个confirm弹窗定时器
        popTimer: [],
        /**
         * @description 加载弹窗
         * @param {Object} obj  {type:动画类型  可选 rects  douBounce bounce grid snake text 文字 }
         */
        loading: function (obj) {
            this.loadIndex++;
            var type = obj ? obj.type ? obj.type : this.loadOpt.type : this.loadOpt.type;
            var text = obj ? obj.text ? obj.text : this.loadOpt.text : this.loadOpt.text;
            var tem = '';
            switch (type) {
                case 'rects':
                    tem = "<div class='vue-loading  loding-'" + this.loadIndex + "><div class='vue-toast-pub'>" +
                        "<div class='loading-center-absolute'>" +
                        "<div class='object object_one'></div>" +
                        "<div class='object object_two'></div>" +
                        "<div class='object object_three'></div>" +
                        "<div class='object object_four'></div>" +
                        "</div>"
                        + "</div></div>"
                    break;
                case 'douBounce':
                    tem = "<div class='vue-loading fullScreen loding-'" + this.loadIndex + "><div class='vue-toast-pub'>" +
                        "<div class='sk-double-bounce'>" +
                        "<div class='sk-child sk-double-bounce-1'></div>" +
                        "<div class='sk-child sk-double-bounce-2'></div>" +
                        "</div>"
                        + "</div></div>"
                    break;
                case 'bounce':
                    tem = "<div class='vue-loading   loding-'" + this.loadIndex + "><div class='vue-toast-pub'>" +
                        "<div class='sk-circle-bounce'>" +
                        "<div class='sk-child sk-circle-1'></div>" +
                        "<div class='sk-child sk-circle-2'></div>" +
                        "<div class='sk-child sk-circle-3'></div>" +
                        "<div class='sk-child sk-circle-4'></div>" +
                        "<div class='sk-child sk-circle-5'></div>" +
                        "<div class='sk-child sk-circle-6'></div>" +
                        "<div class='sk-child sk-circle-7'></div>" +
                        "<div class='sk-child sk-circle-8'></div>" +
                        "<div class='sk-child sk-circle-9'></div>" +
                        "<div class='sk-child sk-circle-10'></div>" +
                        "<div class='sk-child sk-circle-11'></div>" +
                        "<div class='sk-child sk-circle-12'></div>" +
                        "</div>"
                        + "</div></div>"
                    break;
                case "grid":
                    tem = "<div class='vue-loading fullScreen loding-'" + this.loadIndex + "><div class='vue-toast-pub'>" +
                        "<div class='sk-cube-grid'>" +
                        "<div class='sk-cube sk-cube-1'></div>" +
                        "<div class='sk-cube sk-cube-2'></div>" +
                        "<div class='sk-cube sk-cube-3'></div>" +
                        "<div class='sk-cube sk-cube-4'></div>" +
                        "<div class='sk-cube sk-cube-5'></div>" +
                        "<div class='sk-cube sk-cube-6'></div>" +
                        "<div class='sk-cube sk-cube-7'></div>" +
                        "<div class='sk-cube sk-cube-8'></div>" +
                        "<div class='sk-cube sk-cube-9'></div>" +
                        "</div>"
                        + "</div></div>"
                    break;
                case "snake":
                    tem = ("<div class=\"vue-loading loding-" + this.loadIndex + "\">\n        <div class=\"vue-toast-pub\">\n          <div class=\"vue-toast-" + type + "\">\n            <div></div>\n            <div></div>\n            <div></div>\n          </div>\n          <p class=\"text\">" + "</p>\n        </div>\n      </div>");
                    break;
                default:
                    tem = ("<div class=\"vue-loading loding-" + this.loadIndex + "\">\n        <div class=\"vue-toast-pub\">\n          <div class=\"vue-toast-" + type + "\">\n            <div></div>\n            <div></div>\n            <div></div>\n          </div>\n          <p class=\"text\">" + "</p>\n        </div>\n      </div>");
            }
            var div = document.createElement("div");
            div.className = ("vue-toast-loading  loading-" + this.loadIndex);
            div.innerHTML = tem;
            if (document.querySelector('.vue-loading')) {
                document.body.removeChild(document.getElementsByClassName(("loading-" + (this.loadIndex - 1)))[0]);
            }
            document.body.appendChild(div);
        },
        /**
         * @description 
         * 关闭所有类型的弹窗  当有自定义或comfirm弹窗 和 loading存在时 将只会关闭loading加载弹窗
         */
        close: function () {
            // console.log(loadIndex);
            if (this.loadIndex >= 0) {
                if (document.getElementsByClassName(("loading-" + this.loadIndex))[0] && document.getElementsByClassName("lay_common")[0]) {
                    document.body.removeChild(document.getElementsByClassName(("loading-" + this.loadIndex))[0]);
                    return
                }
                if (!document.getElementsByClassName(("loading-" + this.loadIndex))[0] && document.getElementsByClassName("lay_common")[0]) {
                    document.body.removeChild(document.getElementsByClassName("lay_common")[0]);
                    return;
                }
                if (document.getElementsByClassName(("loading-" + this.loadIndex))[0]) {
                    document.body.removeChild(document.getElementsByClassName(("loading-" + this.loadIndex))[0]);
                }

            } else {
                if (document.getElementsByClassName("lay_common")[0]) {

                    document.body.removeChild(document.getElementsByClassName("lay_common")[0]);
                }
            }
        },
        /**
         * @description  消息提示弹窗 
         * @param {String} toast  提示文字
         * @param {Object} obj { position:位置  animate:动画类型 默认为Scale   time 时间 }
         */
        msg: function (toast, obj) {
            var that = this;
            this.msgIndex++;
            var chooseType = obj ? obj.position ? obj.position : this.msgOpt.defaultType : this.msgOpt.defaultType;
            var animates = obj ? obj.animate ? obj.animate : this.msgOpt.animate : this.msgOpt.animate;
            var durations = obj ? obj.time ? obj.time : this.msgOpt.duration : this.msgOpt.duration;
            var toastTip = ("<div class='vue-toast-cell'><div class=\"vue-tip tip-" + chooseType + " vue-toast-" + animates + " index-" + this.msgIndex + "\">" + "<div class='vue-toast-innerDiv'>" + toast + "</div>" + "</div></div></div>");
            var div = document.createElement("div");
            div.className = (" vue-toast-modal-msg msg-" + this.msgIndex);
            div.innerHTML = toastTip;
            if (document.querySelector('.vue-tip')) {
                document.body.removeChild(document.getElementsByClassName(("msg-" + (this.msgIndex - 1)))[0]);
                clearTimeout(this.msgTimer[this.msgIndex - 1]);
            }
            document.body.appendChild(div);
            this.msgTimer.push(setTimeout(function () {
                document.body.removeChild(document.getElementsByClassName(("msg-" + that.msgIndex))[0]);
            }, durations));
        },
        /**
         * @description 提示弹窗 
         * @param {String} toast  提示文字
         * @param {Object} obj {position:位置 Up 以及 Down    time为时间 } 时间为豪秒数
         */
        pop: function (toast, obj) {
            var that = this;
            this.popIndex++;
            var position = obj ? obj.position ? obj.position : '' : 'Up';
            var time = obj ? obj.time ? obj.time : 2000 : 2000;
            var popTip = "<div class='popToast_info'>" + toast + "</div>";
            var popDiv = document.createElement("div");
            popDiv.className = "popToast" + " vue-toast-" + position + " " + "popToast_" + this.popIndex;
            popDiv.innerHTML = popTip;
            if (document.querySelector(".popToast")) {
                clearTimeout(this.popTimer[popIndex - 1]);
                document.body.removeChild(document.getElementsByClassName(("popToast_" + (this.popIndex - 1)))[0]);
            }
            document.body.appendChild(popDiv);
            setTimeout(function () {
                that.addClass(popDiv, "on");
            }, 100)
            this.popTimer.push(setTimeout(function () {
                that.removeClass(document.getElementsByClassName("popToast_" + that.popIndex)[0], 'on');
                setTimeout(function () {
                    document.body.removeChild(document.getElementsByClassName("popToast_" + that.popIndex)[0]);
                }, 200)
            }, time));
        },
        /**
         * @description 提示框
         * @param {Object}  obj {text:提示文字;yes:确定回调函数;no:取消回调函数;ani:动画类型 默认为scale 可传Up ;className:自定义类名}
         */
        confirm: function (obj) {
            var title = obj ? obj.text ? obj.text : "您确定要这样操作吗?" : "您确定要这样操作吗?";
            var anima = obj ? obj.ani ? obj.ani : 'scale' : 'scale';
            var className = obj ? obj.className ? obj.className : '' : '';
            var tem = ("\n            <div class=\"confirm_outBox\">\n            <div class=\"confirm_inBox" + " " + className + " vue-toast-" + anima + "\">\n                <div class=\"confirm_title\">" + title + "</div>\n                <div class=\"confirm_btn\">\n\n                </div>\n            </div>\n            </div>\n        ");
            var div = document.createElement("div");
            div.className = "lay_common";
            div.innerHTML = tem;
            document.body.appendChild(div);
            document.querySelector(".confirm_outBox").addEventListener("click", function (e) {
                e.stopPropagation();
                e.preventDefault();
                if (e.target.className.indexOf("confirm_outBox") != -1)
                    document.body.removeChild(document.querySelector(".lay_common"));
            });
            document.addEventListener("touchmove", function (e) {
                if (document.querySelector(".lay_common") != null) {
                    e.preventDefault();
                }
            });
            if (obj && obj.yes) {
                var yes = document.createElement("div");
                yes.className = "confirm_yes";
                yes.innerText = "确定";
                document.querySelector(".confirm_btn").appendChild(yes);
                yes.addEventListener("click", function (e) {
                    e.stopPropagation();
                    document.body.removeChild(document.querySelector(".lay_common"));
                    if (obj && typeof (obj.yes) == "function") {
                        obj.yes();
                    }
                });
            }
            if (obj && obj.no) {
                var no = document.createElement("div");
                no.className = "confirm_no";
                no.innerText = "取消";
                document.querySelector(".confirm_btn").appendChild(no);
                no.addEventListener("click", function (e) {
                    e.stopPropagation();
                    document.body.removeChild(document.querySelector(".lay_common"));
                    if (obj && typeof (obj.no) == "function") {
                        obj.no();
                    }
                });
            }
        },
        /**
         * @description 自定义弹窗样式 
         * @param {Object} obj 
         * {
         *   className:自定义类名, String
         *   btnClose:点击遮罩层区域是否关闭 Boolean
         *   html:自定义html片段  String
         *   showClose:是否显示关闭按钮  Boolean
         *   ani:动画类型 默认为scale  String
         *   success:成功回调   function    
         * }
         */
        custom: function (obj) {
            var that = this;
            if (!obj || !obj.html) {
                this.msg("请传入html片段");
                return;
            }
            var claName = obj ? obj.className ? obj.className : '' : '';
            var div = document.createElement("div");
            var btnClose = obj ? obj.btnClose ? obj.btnClose : false : false;
            div.className = "lay_common";
            var innerDiv = document.createElement("div");
            if (obj.ani) {
                innerDiv.className = "custom_box" + " vue-toast-" + obj.ani;
            } else {
                innerDiv.className = "custom_box vue-toast-scale";
            }
            var inner = document.createElement("div");
            inner.className = "custom_inner" + " " + claName;
            inner.innerHTML = obj.html;
            if (obj.showClose == true) {
                var close = document.createElement("div");
                close.className = "close";
                inner.appendChild(close);
                close.addEventListener("click", function (e) {
                    e.stopPropagation();
                    document.body.removeChild(div);
                    if (obj && obj.showClose && obj.close) {
                        obj.close();
                    }
                });
            }
            innerDiv.appendChild(inner);
            div.appendChild(innerDiv);
            document.body.appendChild(div);
            document.addEventListener("touchmove", function (e) {
                if (document.querySelector(".lay_common") != null) {
                    e.preventDefault();
                }
            });
            document.querySelector(".lay_common").addEventListener("click", function (e) {
                e.stopPropagation();
                if (e.target.className == 'lay_common' || e.target.className == "custom_box") {
                    if (btnClose) {
                        document.body.removeChild(document.querySelector(".lay_common"));
                    }

                }
            });
            document.querySelector(".custom_box").addEventListener("click", function (e) {
                e.stopPropagation();
                if (that.hasClass(e.target, "custom_box")) {
                    if (btnClose) {
                        document.body.removeChild(document.querySelector(".lay_common"));
                    }
                }
            });
            if (obj.success && typeof obj.success == 'function') {
                obj.success();
            }
        },
        //判断是否有class
        hasClass: function (ele, cls) {
            var cls = cls || '';
            if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
            return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
        },
        //增加class
        addClass: function (ele, cls) {
            var that = this;
            if (!that.hasClass(ele, cls)) {
                ele.className = ele.className == '' ? cls : ele.className + " " + cls
            }
        },
        //移除class
        removeClass: function (ele, cls) {
            var that = this;
            if (that.hasClass(ele, cls)) {
                var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + " ";
                while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                    newClass = newClass.replace(' ' + cls + ' ', ' ');
                }
                ele.className = newClass.replace(/^\s+|\s+$/g, '');
            }
        }
    };
}))