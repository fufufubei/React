/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-17 23:14:46 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2018-06-17 23:14:46 
 * @description  获取活动模板数据通用方法
 */

import page from "./page.js";
import lay from "./lay.js";
import config from "./config.js";
import ajax from "axios";
    ///获取模板数据
    var getTplData = function (defdata,func,sid, cityid,sccid,url) {
        var tplData = {};
        if (sid == undefined) {
            sid = page.Request("sid");
        }
        if (cityid == undefined) {
            cityid = page.Request("cityid");
        }
        if (sccid == undefined) {
            sccid = page.Request("sccid");
        }
		if(url==undefined){
			url='';
		}
        ajax({
            url: url+ "/action/tpl/gettpldata.json?r=" + Math.random(),
            async: false,
			method:"get",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            params: { sid: sid, cityid: cityid, sccid: sccid },
           
        }).then(function(result){
			
              if (!result.data.IsError) {
                    tplData = result.data.Body.tpl_data;
                    sccid = result.data.Body.sccid;
                    sid = result.data.Body.sid;
                    cityid = result.data.Body.cityid;
                }
	
		 if(typeof(func)=="function"){
			  for (var key in defdata) {
				if (defdata.hasOwnProperty(key)) {
                if (typeof (tplData[key]) == "undefined" || tplData[key] == "") {
                    tplData[key] = defdata[key];
                } else {
                    if (typeof (tplData[key]) == "object" &&tplData[key].length==0) {
                        tplData[key] = defdata[key];
                    }
                }
               
            }
		  
		 }
		   var data= { tpl_data: tplData, sccid: sccid, sid: sid, cityid: cityid }
		 func(data)
		 }
        });
      
    }
  

    export default { getTplData: getTplData }
