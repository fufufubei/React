import lay from "./lay.js";
import $ from "zepto";
    ///通用验证
    var validate=   {
        errMsg: {
            mobile: "手机号不正确",
            empty: "不能为空",
            mail: "邮箱不正确"
        },
        submit: function (par, fun) {
            if (validate.check(par)) {
                if (fun != undefined) {
                    try {
                        var json = {};
                        var text = [];
                        var ids = [];
                        text.push("{");
                        par.forEach(function (v, i) {
                            if (typeof v.id != "undefined") {
                                if (i > 0) {
                                    text.push(',');
                                }
                                ids = v.id.split(' ');
                                text.push(ids[ids.length - 1].substring(1));
                                text.push(":");
                                text.push("'");
                                text.push(v.val);
                                text.push("'");
                            }
                       

                        });
                        text.push("}");
                        fun(eval('(' + text.join('') + ')'));
                    } catch (e) {
                        fun({});
                        console.info(e);
                    }

                }
            }
        },
        ///检测入口
        check: function (par, fun) {
            for (let m in par) {
                var data = par[m];
                var rule = data.rule;

                switch (rule) {
                    ///不为空验证
                    case "empty":
                        validate.empty(data);
                        break;
                    case "length":
                        validate.length(data);
                        break;
                    case "mobile":
                        validate.mobile(data);
                        break;
                    case "password":
                        validate.password(data);
                        break;
                    case "confirm_password":
                        validate.confirm_password(data);
                        break;
                    case "mail":
                        validate.mail(data);
                        break;
                    case "number":
                        validate.number(data);
                        break;
                    case "price":
                        validate.price(data);
                        break;
                    case "idcard":
                        validate.idcard(data);
                        break;
                    case "regular":
                        validate.regular(data);
                        break;
                    default:
                        console.info(data);
                        return alert("参数错误");;
                        break;
                }
            }

            if (validate.error.length > 0) {
                if (validate.isall) {
                    for (x in validate.error) {
                        validate.tips(validate.error[x]);
                    }
                } else {

                    validate.tips(validate.error[0]);
                }
                validate.error = [];
                return false;
            }
            validate.error = [];
            if (fun != undefined) {
                fun();
            }
            return true;
        },
        ////是否提示所有的
        isall: false,

        ///错误信息
        error: [],
        ///错误提示方式
        tips: function (m) {
            lay.msg(m.message, 1, function () {
                $(m.id).css({
                    "border-color": "red"
                });
            
            });

        },
        ///不为空验证
        empty: function (m) {
           var val = m.val||$(m.id).val();
            if (val == ""||typeof val=="undefined") {
                validate.error.push(m);
            }
            m.val = val;
        },
        //长度证码
        length: function (m) {
            var val = m.val||$(m.id).val();
            if (m.min > 0) {
                if (val == "") {
                    validate.error.push(m);
                }
            }

            if (val.length > m.max || val.length < m.min) {
                validate.error.push(m);
            }
            m.val = val;
        },
        ///验证大于0的数字
        number: function (m) {
            var regPass = /^\+?[1-9][0-9]*$/;
           var val = m.val||$(m.id).val();
            if (!regPass.test(val)) {
                validate.error.push(m);
            }
            m.val = val;
        },
        ///价格验证
        price: function (m) {
            var regPass = /^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/;
           var val = m.val||$(m.id).val();
            if (!regPass.test(val)) {
                validate.error.push(m);
            }
            m.val = val;
        },
        ///手机号验证
        mobile: function (m) {
            var regTel = /^[1]{1}\d{10}$/;
           var val = m.val||$(m.id).val();
            if (!regTel.test(val)) {
                if (typeof m.message == "undefined") {
                    m.message = this.errMsg.mobile;
                }
                validate.error.push(m);
            }
            m.val = val;

        },
        //密码验证
        password: function (m) {
            var regPass = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,22}$/;
           var val = m.val||$(m.id).val();
            if (!regPass.test(val)) {
                validate.error.push(m);
            }
            m.val = val;

        },
        ///两次密码一致验证
        confirm_password: function (m) {
            var id1 = m.id[0];
            var id2 = m.id[1];
            var id1val =m.val1|| $(id1).val();
            var id2val = m.val2||$(id2).val();
            if (id1val != id2val) {
                validate.error.push(m);
            }

        },
        ///正则表达式验证
        regular: function (m) {
            var reg = new RegExp(m.val);
           var val = m.val||$(m.id).val();
            if (!reg.test(val)) {
                validate.error.push(m);
            }
            m.val = val;

        },
        //邮箱验证
        mail: function (m) {
            var regPass = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
           var val = m.val||$(m.id).val();
            if (!regPass.test(val)) {
                validate.error.push(m);
            }
            m.val = val;
        },
        //生份证号验证
        idcard: function (m) {
            var regPass = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
           var val = m.val||$(m.id).val();
            if (!regPass.test(val)) {
                validate.error.push(m);
            }
            m.val = val;
        }
    };
 
export default validate
