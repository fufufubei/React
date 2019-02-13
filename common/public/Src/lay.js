import layer from "./Layer/layer.js"
var loadingDialog = [];
var lay = {
    skin: "default",
    msg: function(msg, time, fun, skin) {
        var index = layer.open({
            content: msg,
            skin: skin || "msg",
            time: time || 2,
            yes: function(index) {
                layer.close(index);
            },
            end: function() {
                if (typeof fun == "function") {
                    fun();
                }
            }
        });
    },
    alert: function(msg, btn, fun, skin) {
        layer.open({
            skin: skin || '',
            content: msg,
            btn: btn || "确定",
            yes: function(index) {
                if (fun != undefined) {
                    fun();
                }
                layer.close(index);
            }
        });
    },
    text: function(title, content, skin) {
        layer.open({
            // type: 1,
            skin: skin || "text",
            content: content,
            // anim: 'up',
            title: title + "<a class='close' href='javascript:void(0)' onclick='layer.closeAll()'></a>",
        });
    },
    confirm: function(msg, icon, btn, yes, no) {
        layer.open({
            className: icon || '',
            shadeClose: false,
            content: '<i class="icon"></i>' + msg,
            anim: false,
            btn: btn || ['确定', '取消'],
            yes: function(index) {
                if (yes != undefined) {
                    yes();
                }
            },
            no: function() {
                if (no != undefined) {
                    no();
                }
            }

        });
    },
    custom: function(content, yes, no) {
        layer.open({
            className: 'um-custom',
            content: content,
            yes: function() {
                if (yes != undefined) {
                    yes();
                }
            },
            no: function() {
                if (no != undefined) {
                    no();
                }
            }
        });
    },
    loading: {
        show: function(text) {
            var index = layer.open({
                className: 'Loading1',
                shade: true,
                shadeClose: false,
                type: 2,
                content: text || ''
            });
            loadingDialog.push(index);
        },
        hide: function() {
            loadingDialog.forEach(function(value, intex) {
                layer.close(value);
            });
        },
        load: function(txt, type) {
            // type ： ripple,  cirball,  clip, snake,  block,  pulse,  clip-rotate
            type = type || 'snake';
            txt = txt || '加载中...';
            layer.open({
                skin: "loadingtxt",
                content: '<div class="pub"><div class="' + type + '"> <div></div> <div></div> <div></div> </div></div><p class="loadingtxt">' + txt + '</p>',
                shade: false
            });
        },
        close: function() {
            layer.closeAll();
        }
    },

    close: function(index) {
        if (typeof index == "undefined") {
            return layer.closeAll();
        }
        layer.close(index);
    }
}
export default lay