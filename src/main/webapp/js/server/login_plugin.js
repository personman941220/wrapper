/*首页加载完成事件，用于判断首页加载是否超时*/
$(document).ready(function() {
	new bstClientUtil().remoteCall(JSON.stringify({
		code : 99,
		data : {}
	}));
});
/* 登录函数 */
var login_plugin = (function() {
	var _this, bcu, type, method, cur_url, code;
	var init = function() {
		_this = login_plugin;
		bcu = new bstClientUtil();
	}
	return {
		onload : function() {
			init();
		},
		init_auto_login : function(data) {/* init登录 */
			//  external.StopWindowShield();
			// // debugger;
			// // EV_modeAlert('envon');//开启遮罩
			// //debugger;
			// login_plugin.onload();/* 初始化对象 */
			// cur_url = bstClientUtil.login_main_url;/* 网上税务局主页加载监听请求 */
			
			// bcu.setData('login_config_type', data.type);/* 记录是跳转网厅(申报已和网厅合并)还是地税 */
			// bcu.setData('login_config_method', data.method);/* 记录跳转后执行的方法 */
			// bcu.setData('login_config_data', JSON.stringify(data.data));
			// bcu.setData('login_config_jtxx', JSON.stringify({
			// 	"account" : data.account,
			// 	"company" : data.company
			// }));
			// bcu.setData('login_config_shenfen', '66');// 记录返回的需要选择的身份
			// // bcu.setData('login_config_yzm','65');//弹出验证码
			// if (data.method == 0 || data.method == 3) {/* 初始化,快速入口 */
			// 	bcu.setData('login_config_code', 4);/* 保存code回调处理代码，根据请求的业务调用不同的回调函数 */
			// } else if (data.method == 2) {/* 扣款 */
			// 	bcu.setData('login_config_code', 2);/* 保存code回调处理代码，根据请求的业务调用不同的回调函数 */
			// } else if (data.method == 4) {
			// 	bcu.setData('login_config_code', 11);/* 保存code回调处理代码，根据请求的业务调用不同的回调函数 */
			// } else if (data.method == 7) {// 查询申报信息
			// 	bcu.setData('login_config_code', 13);/* 保存code回调处理代码，根据请求的业务调用不同的回调函数 */
			// } else {
			// 	bcu.setData('login_config_code', 6);/* 申报 */
			// }
			//注入账号和密码
			$('#czydm').val(data.nsrsbh);
			$('#yhkl').val(data.password);
			// window.nsrsbh = data.nsrsbh;
			// window.password = data.password;
			// window.ghdwmc = data.ghdwmc;
			// window.ghdwdm = data.ghdwdm;
			// window.ghdwdzdh = data.ghdwdzdh;
			// window.ghdwyhzh = data.ghdwyhzh;
			localStorage.setItem('zpORpp',data.zpORpp); 
			localStorage.setItem('ghdwmc',data.ghdwmc); 
			localStorage.setItem('ghdwdm',data.ghdwdm); 
			localStorage.setItem('ghdwdzdh',data.ghdwdzdh); 
			localStorage.setItem('ghdwyhzh',data.ghdwyhzh); 
			// console.log(window.nsrsbh);
			// console.log(window.password);
			// console.log(window.ghdwmc);
			// console.log(window.ghdwdm);
			// console.log(window.ghdwdzdh);
			// console.log(window.ghdwyhzh);

			login();
			// console.log("ghdwmc");
			// $('#ghdwmc').val("35435435");
			// $('#ghdwdm').val("3543634");
			
			// 获取验证码
			// if (data.nsrsbh && data.password) {
			// 	//refreshCode(this);
			// 	var src = $('#picimg')[0].src; 
			// 	//alert(src);
			// 	bcu.addHttpFilter({
			// 		url : src,
			// 		callback : 'login_plugin.login_check_code',
			// 		timeout : 2000
			// 	});
				
			// }
		},
		// 识别验证码
		// login_check_code : function() {
		// 	// 获取图片的base64字符串
		// 	var str = external.GetImgData('picimg');
		// 	//console.log(str);
		// 	var base64img = "data:image/png;base64," + str;
		// 	//跨域请求
		// 	$.ajax({
		// 		type: "get",
		// 		async: false,
		// 		url: "http://192.168.3.114:8080/upload?",
		// 		data: {
		// 			file: base64img,
		// 		},
		// 		dataType: "jsonp",
        //    		jsonp:"callback",
        //     	jsonpCallback:"successCallback",
		// 		success: function(json){
		// 			//console.log(json);
		// 			login_plugin.login(json);
		// 		},
		// 		error: function(json){
		// 			//console.log(json);
		// 		}
		// 	  });
		// },
		// //执行登录
		// login : function(data) {
		// 	$("input[name='check_code']").val(data.yzm);// 验证码
		// 	cur_url = "/ajax.sword?ctrl=GDSDZBSXTKYhmMmDlCtrl_loadWinIndex";/*网上税务局主页加载监听请求*/
		// 	bcu.addHttpFilter({/*监听登录后主页加载完成*/
		// 		url:cur_url,
		// 		callback:'login_plugin.auto_login_gx',
		// 		timeout:10000/*网厅登录特别卡，所以时间设置比较长*/
		// 	});
		// 	//setTimeout("handleLoginDW()",5000);
		// 	handleLoginDW();// 网上税务局提交
		// },
		// auto_login_gx :function(res){
		// 	if(res!=null&&res!=""){
		// 		//取出token值
		// 		var token;
		// 		for(var i=0;i<res.data.length;i++){
		// 			if(res.data[i]=="gdsinvoktoten"){
		// 				token = res.data[i].value;
		// 			}
		// 		}
		// 		bcu.addHttpFilter({/*监听登录后主页加载完成*/
		// 			url:"/WSSBSL/do_index_Index_loadBwParams.action",
		// 			callback:'login_plugin.auto_login_gx2',
		// 			timeout:10000/*网厅登录特别卡，所以时间设置比较长*/
		// 		});
		// 		alert(token);
		// 		//window.location.href("http://www.gxgs.gov.cn:8103/WSSBSL/gntz.html?gnid=wssb_index&token="+token);
				
		// 	}else{
		// 		"chaosh"
		// 	}
		// },
		// auto_login_gx2 :function(res){
			
		// },
		
		// login_error : function(msg) {/* 对接前台，处理错误信息 */
		// 	// debugger;
		// 	// msg=$(".layui-layer-content").html();
		// 	// $(".layui-layer-btn0")[0].click();
		// 	code = bcu.getData('login_config_code');
		// 	//if (msg.indexOf("登录错误") < 0) {
		// 	//	msg = "网上税务局登录错误：" + msg;
		// 	//}
		// 	bcu.remoteCall(JSON.stringify({
		// 		code : code,
		// 		data : msg
		// 	}));
		// 	if (cur_url != null && cur_url != '') {/* 如果有监听地址，尝试删除监听 */
		// 		bcu.removeHttpFilter(cur_url);
		// 	}
		// }
	};
}());
/* 重写页面alert，处理错误信息 */
function alert(msg) {
	if (msg != null && msg != '' && msg.indexOf('请及时更新') >= 0) {/* ca更新，点掉继续执行，不报错 */
		return;
	}
	//login_plugin.login_error(msg);
}