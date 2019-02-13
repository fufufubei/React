import uPop from 'public/uPop.js';
import Qs from 'qs'
import Ajax from "axios";
// install 方法
function $$http(Vue) {
    if ($$http.installed) {
        return;
    }

    function ajax(data) {
        if (data.noLoad != true) {
            uPop.loading("正在加载...");
        }
        Ajax({
            method: data.method || 'POST',
            headers: data.headers || { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: data.url,
            data: data.data,
            params: data.params,
            //withCredentials: true,
            transformRequest: [function(data) {
                data = Qs.stringify(data);
                return data;
            }],

        }).then(function(result) {
            if (data.noLoad == true) {
                if (typeof data.success == "function") {
                    data.success(result.data);
                }
            } else {
                setTimeout(function() {
                    uPop.close();
                }, 500);
                setTimeout(function() {
                    if (typeof data.success == "function") {
                        data.success(result.data);
                    }
                }, 600);
            }

        }).catch(function(error) {
            console.info(error);
            uPop.msg(error);
        });;

    }
    Vue.prototype.$ajax = Ajax;
    Vue.prototype.ajax = function(data1) {
        ajax(data1);
    };
    Vue.prototype.ajax.post = function(url, data, success, config) {
        var conf = config || {};
        ajax({
            method: "post",
            data: data,
            url: url,
            success: success,
            noLoad: conf.noLoad || false,
            loadMsg: conf.loadMsg || "正在加载..."

        });
    }
    Vue.prototype.ajax.get = function(url, params, success, config) {
        var conf = config || {};
        ajax({
            method: "get",
            url: url,
            params: params || {},
            success: success,
            noLoad: conf.noLoad || false,
            loadMsg: conf.loadMsg || "正在加载..."
        });
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use($$http);
}

export default $$http