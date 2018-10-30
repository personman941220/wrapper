/**
 * <ol>
 * date:2013-10-21 editor:yanghongjian
 * <li>创建文档</li>
 * <li>税务客户端全局工具类</li>
 * </ol>
 */
var taxClientTools = baseTools || {};
/**
 * 获配置文件中取服务器地址
 */
taxClientTools.getCnfHost = function () {
	return taxClientTools.GetClientCNF("module.hosturl")
		|| window.location.host;
};
/**
 * 获配置文件中取服务器地址
 */
taxClientTools.getCnfHostChange = function () {
	return taxClientTools.GetClientCNF("module.hostChange") || "0";
};

/**
 * 获配置文件中取网厅服务器地址
 */
taxClientTools.getCnfHostWsbsfwt = function () {
	return taxClientTools.GetClientCNF("module.hostWsbsfwt") || "http://localhost:7001";
};
/**
 * 从setup.ini中获取配置参数
 */
taxClientTools.GetClientCNF = function (key) {
	if (typeof external.GetClientCNF != "undefined") {
		return external.GetClientCNF(key);
	} else {
		return "";
	}
};
/**
 * 税务客户端使用到的全局参数 注意是根时不要指定contextPath的内容, 如果有目录部署在添加,比如/cgs
 * 客户端请求时要设定client值，比如:http://localhost:7001
 */
taxClientTools.cnf = {
	clientURL: '',
	contextPath: '/web',
	rcodeOpen: 0
};

taxClientTools.loginCallBack = [];
taxClientTools.cnf.clientURL = taxClientTools.getCnfHost()
	+ taxClientTools.cnf.contextPath;
//taxClientTools.cnf.clientURL = "http://jspt.12366.ha.cn/web"

taxClientTools.cnf.clientURL = "";
//!!!!!!!!!!!!!!!!!!!!!!!!!!


var inlineOutline = 'outline';
switch (inlineOutline) {
	case 'inline':
		//测试环境
		//测试环境
		//通知公告，资料下载，政策查询地址
		taxClientTools.cnf.comUrlNew = "http://83.16.16.168:9116";
		taxClientTools.cnf.wsbsURL = "http://83.16.18.81:9105";

		taxClientTools.cnf.jspt = 'http://jspt.12366.ha.cn:9101';
		//纳税咨询接口地址
		taxClientTools.cnf.nszxURL = "http://83.16.18.3:8002";
		//涉税查询地址
		taxClientTools.cnf.sscxURL = "http://83.16.18.3:8003";
		taxClientTools.cnf.ythURL = "http://yth.htjs.net";
		taxClientTools.cnf.caURL = "https://ca1.htjs.net/";
		taxClientTools.cnf.dswtURL = "http://neusoft.hads.tax:7003/webroot/pages/home/gdsgj/gds_auto.jsp";//地税网厅跳转地址测试
		taxClientTools.cnf.dswjmm = "http://wwltqxgl.hads.tax:7201/sword?ctrl=MH002GetBackPwdCtrl_zhmm"  //地税忘记密码测试
		taxClientTools.cnf.dswjzc = "http://wwltqxgl.hads.tax:7201/sword?ctrl=MH002RegisterZrrCtrl_alertZrrZc&yhlx=08&r=0.2684903250951277&SWORDHTTP=false";  //地税个人注册测试
		taxClientTools.cnf.dswtzrrURL = "http://neusoft.hads.tax:7003/webroot/pages/home/gds_index.jsp";//地税网厅自然人跳转地址测试
		//网厅内网域名
		taxClientTools.cnf.gswtUrl = "http://wsbsfwt.12366.ha.cn:9105";  //测试
		//省局门户域名
		taxClientTools.cnf.sjmhUrl = "http://www.12366.ha.cn";  //测试
		taxClientTools.cnf.zrrDswtURL = "http://147.12.210.71:7003/webroot/pages/home/index.jsp";//地税网厅跳转地址测试
		//测试环境
		//测试环境
		break;

	default:
		//生产环境配置
		//生产环境配置

		taxClientTools.cnf.jspt = 'http://jcpt.ha-n-tax.gov.cn';

		// //生产环境
		// //生产环境
		//通知公告，资料下载，政策查询地址
		taxClientTools.cnf.comUrlNew = "http://www.ha-n-tax.gov.cn";
		taxClientTools.cnf.wsbsURL = "https://wsbsfwt.ha-n-tax.gov.cn";
		//纳税咨询接口地址
		taxClientTools.cnf.nszxURL = "http://zxhd.ha-n-tax.gov.cn"
		//涉税查询地址
		taxClientTools.cnf.sscxURL = "http://bsfwt.ha-n-tax.gov.cn"
		taxClientTools.cnf.ythURL = "http://yth.htjs.net";
		taxClientTools.cnf.caURL = "https://ca1.htjs.net/";
		taxClientTools.cnf.dswtURL = "https://dzswj.ha-l-tax.gov.cn/webroot/pages/home/index.jsp";//地税网厅跳转地址生产
		taxClientTools.cnf.dswjmm = "https://qxgl.ha-l-tax.gov.cn/sword?ctrl=MH002GetBackPwdCtrl_zhmm"  //地税忘记密码生产
		taxClientTools.cnf.dswjzc = "https://qxgl.ha-l-tax.gov.cn/sword?ctrl=MH002RegisterZrrCtrl_alertZrrZc&yhlx=08";  //地税个人注册生产
		taxClientTools.cnf.dswtzrrURL = "https://dzswj.ha-l-tax.gov.cn/webroot/pages/home/index.jsp";//地税网厅自然人跳转地址生产
		//网厅内网域名
		taxClientTools.cnf.gswtUrl = "https://wsbsfwt.ha-n-tax.gov.cn";  //生产

		//省局门户域名
		taxClientTools.cnf.sjmhUrl = "http://www.ha-n-tax.gov.cn";	//生产
		taxClientTools.cnf.zrrDswtURL = "https://dzswj.ha-l-tax.gov.cn/webroot/pages/home/index.jsp";//地税网厅跳转地址测试
	// //生产环境
	// //生产环境
}

/**
 * 获取请求前缀兼容客户端和在线两种模式
 */
taxClientTools.getClientOrServerUrl = function () {
	return taxClientTools.cnf.clientURL != '' ? taxClientTools.cnf.clientURL // 客户端请求
		: taxClientTools.cnf.contextPath;// 支持二级目录部署
};

// ///////////////////////////////////////////////////
// 截取URL地址中传递的参数
taxClientTools.getQueryString = function (name) {
	return baseTools.getUrlQueryString(name);
};
// 格式化数据库返回的日期
taxClientTools.formatDate = function (formatString, dateObject) {
	var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
	YY = ((YYYY = dateObject.getFullYear()) + "").slice(-2);
	MM = (M = dateObject.getMonth() + 1) < 10 ? ('0' + M) : M;
	MMM = (MMMM = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"][M - 1])
		.substring(0, 3);
	DD = (D = dateObject.getDate()) < 10 ? ('0' + D) : D;
	DDD = (DDDD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
		"Friday", "Saturday"][dateObject.getDay()]).substring(0, 3);
	th = (D >= 10 && D <= 20) ? 'th' : ((dMod = D % 10) == 1) ? 'st'
		: (dMod == 2) ? 'nd' : (dMod == 3) ? 'rd' : 'th';
	formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY)
		.replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM)
		.replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD)
		.replace("#DD#", DD).replace("#D#", D).replace("#th#", th);

	h = (hhh = dateObject.getHours());
	if (h == 0)
		h = 24;
	if (h > 12)
		h -= 12;
	hh = h < 10 ? ('0' + h) : h;
	AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
	mm = (m = dateObject.getMinutes()) < 10 ? ('0' + m) : m;
	ss = (s = dateObject.getSeconds()) < 10 ? ('0' + s) : s;
	return formatString.replace("#hhh#", hhh).replace("#hh#", hh).replace(
		"#h#", h).replace("#mm#", mm).replace("#m#", m).replace("#ss#", ss)
		.replace("#s#", s).replace("#ampm#", ampm).replace("#AMPM#", AMPM);
};
// ///////////////////////////////////////////////////

/**
 * 设置cookie
 * 
 * @param jsonObj
 */
taxClientTools.setCookieJsonObjLogin = function (data) {
	if (!this.checkCookie())
		return false;
	baseTools.setCookie("QX_USER", data);
	return true;
};

/**
 * 清空Cookie
 */
taxClientTools.clearAllCookie = function () {
	// this.delCookie("LOGIN_USER");
	// this.delCookie("QX_USER");
	// this.delCookie("USER_SEQ");
	// this.delCookie("loginFlag");
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if (keys) {
		for (var i = keys.length; i--;) {
			this.delCookie(keys[i]);
		}
	}
};

taxClientTools.setCookie = function (key, val) {
	if (/[\]\}]$/.test(val)) {
		val = baseTools.stringify(val);
	};

	$.cookie(key, val, {
		domain: DOMAIN,
		path: "/"
	});
};

taxClientTools.getCookie = function (key) {
	if (!this.checkCookie()) {
		this.gotoLogin();
		return "";
	}
	var val = $.cookie(key);
	return baseTools.parse(val);
};
taxClientTools.delCookie = function (key) {
	$.cookie(key, null, {
		domain: DOMAIN,
		path: "/"
	});
};

baseTools.checkCookie = function () {
	var cookieEnabled = (navigator.cookieEnabled) ? true : false;
	if (!cookieEnabled) {
		alert('请开启浏览器COOKIE功能!');
		return false;
	}
	return true;
};

taxClientTools.gotoLogin = function () {
	this.clearAllCookie();
	top.countentFrm.location.href = "wsbs.html";
};

taxClientTools.close_window = function () {
	var loginObj = $("#login_rq");
	if (loginObj.length > 0) {
		loginObj.hide();
	}
};

// 获取发布域路径(兼容客户端路径)
baseTools.getWebRoot = function () {
	if (location.href.indexOf("http") != -1)
		return taxClientTools.cnf.contextPath;

	var tem = [];
	var paths = location.href.split('/');
	for (var i in paths) {
		if (paths[i] == 'web')
			break;
		tem.push(paths[i]);
	}
	tem.push("web");
	return tem.join('/');
};

baseTools.getLogin = function () {
	return this.getWebRoot() + "/hntaxclient/gsgg.html";
};

// ///////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////
/**
 * 计算表格在页面中的高度
 * 
 * @param tbList
 *            表格的jquery对象
 */
taxClientTools.getMmGridHeight = function (tbList) {
	var tbHeight = 2;
	var tbListPg = tbList.next();
	if (tbListPg.size() != 0) {
		tbHeight = tbListPg.height() == 0 ? 24 : tbListPg.height();
	}
	var docHeight = document.documentElement.clientHeight;
	var jc = baseTools.getCurBrowser().isIE7 ? 29 - tbHeight : 0;
	return docHeight - Math.abs(tbList.offset().top) - tbHeight - jc;
};

// ////////////////////////重载baseTools中的相关方法////////////////////////////////
baseTools.showMaskDel = function (msg) {
	msg = msg ? msg : "数据加载中...";
	var baseMask = $(".baseMask");
	if (baseMask.size() != 0) {
		baseMask[0].innerHTML = msg;
		baseMask.css({
			display: ''
		});
		return null;
	} else {
		var maskObj = null;
		var api = null;
		try {
			api = frameElement.api;
		} catch (e) {
			api = null;
		}
		var rand = (Math.round(Math.random() * 10));
		if (api) {
			maskObj = api.opener.$.dialog({
				id: "yhjMaskDlg_parent_" + rand,
				icon: 'loading.gif',
				content: msg,
				title: false,
				cancel: false,
				fixed: true,
				lock: true,
				resize: false,
				parent: api
			});
		} else {
			maskObj = $.dialog({
				id: "yhjMaskDlg_" + rand,
				icon: 'loading.gif',
				content: msg,
				title: false,
				cancel: false,
				fixed: true,
				lock: true,
				resize: false
			});
		}

		baseTools.maskObj = maskObj;
		return maskObj;
	}
};
baseTools.maskObj = null;
baseTools.showMask = function (msg) {
	msg = msg ? msg : "数据加载中...";

	var maskObj = null;
	var api = null;
	try {
		api = frameElement.api;
	} catch (e) {
		api = null;
	}
	try {
		var rand = (Math.round(Math.random() * 10));
		if (api) {
			maskObj = api.opener.$.dialog({
				id: "yhjMaskDlg_parent_" + rand,
				icon: 'loading.gif',
				content: msg,
				title: false,
				cancel: false,
				fixed: true,
				lock: true,
				resize: false,
				parent: api
			});
		} else {
			maskObj = $.dialog({
				id: "yhjMaskDlg_" + rand,
				icon: 'loading.gif',
				content: msg,
				title: false,
				cancel: false,
				fixed: true,
				lock: true,
				resize: false
			});

			baseTools.maskObj = maskObj;
			return maskObj;
		}
	} catch (e) {

	}
};

baseTools.hideMash = function (maskObj) {
	$(".baseMask").css({
		display: 'none'
	});

	if (maskObj) {
		if (!maskObj.closed)
			maskObj.close();
	} else {
		if (baseTools.maskObj) {
			if (!baseTools.maskObj.closed)
				baseTools.maskObj.close();
		}
	}
	baseTools.maskObj = null;

};
baseTools.hideMashDel = function (maskObj) {
	var baseMask = $(".baseMask");
	if (baseMask.size() != 0) {
		baseMask.css({
			display: 'none'
		});
	} else {
		if (maskObj) {
			if (!maskObj.closed)
				maskObj.close();
		} else {
			if (baseTools.maskObj) {
				if (!baseTools.maskObj.closed)
					baseTools.maskObj.close();
			}
		}
		baseTools.maskObj = null;
	}
};

/**
 * 在ajax请求时添加其他参数(需要在主体软件中重载)
 * 
 * @param xhrArgs
 *            ajax请求参数
 */
baseTools.getXhrAjaxParams = function (xhrArgs) {
	// 添加附加参数
	var params = xhrArgs.params || {};
	var paramOther = {};
	if (typeof params.CUR_USERID == "undefined")
		paramOther.CUR_USERID = taxClientTools.getUserId();
	// console.log($.extend(params, paramOther))
	if (typeof params.CUR_DLMC == "undefined")
		paramOther.CUR_DLMC = taxClientTools.getUserAttr("DLMC");

	return $.extend(params, paramOther);
};
/**
 * 重载baseTools中的方法,追加额外的查询
 * 
 * @param xhrArgs
 *            请求参数
 */
baseTools.xhrAjax = function (xhrArgs) {// 已http或https开头的地址,不再追加
	if (!(xhrArgs.url.indexOf("http://") == 0 || xhrArgs.url
		.indexOf("https://") == 0)) {
		if (taxClientTools.cnf.clientURL != '')
			// 客户端请求
			xhrArgs.url = taxClientTools.cnf.clientURL + xhrArgs.url;
		else
			// 支持二级目录部署
			xhrArgs.url = taxClientTools.cnf.contextPath + xhrArgs.url;
	}
	//console.log(xhrArgs.url)
	// 添加附加参数
	xhrArgs.params = this.getXhrAjaxParams(xhrArgs);

	var params = xhrArgs.params || {};
	var page = $('#tbListPg').data("page") ? $('#tbListPg').data("page") : 1;
	var pageSize = $('.limit select').val() ? $('.limit select').val() : 20;
	var start = pageSize * (page - 1) + 1;
	var end = pageSize * page;
	if (params.START == undefined)
		params.START = start;
	if (params.END == undefined)
		params.END = end;
	xhrArgs.params = params;

	return this.xhrAjaxJsonP(xhrArgs);
};
/**
 * 重载baseTools中的方法,增加超时时间设置
 */
baseTools.xhrAjaxJsonP = function (xhrArgs) {

	var maskObj = null;
	var bShow = false;
	if (typeof xhrArgs.bShow != 'undefined') {
		bShow = xhrArgs.bShow;
	}
	if (bShow) {
		maskObj = this.showMask(xhrArgs.msg);
	}

	var urlParam = this.preparePostData(xhrArgs.forms, xhrArgs.params);

	var tempUrl = xhrArgs.url;
	if (tempUrl && tempUrl.indexOf("?") == -1) {
		tempUrl = tempUrl + "?" + urlParam;
	} else {
		tempUrl = tempUrl + "&" + urlParam;
	}

	if (tempUrl && tempUrl.indexOf("username") == -1
		&& tempUrl.indexOf("sign") == -1) {
		// 追加单点登录参数
		var username = baseTools.getUrlQueryString("username");
		var sign = baseTools.getUrlQueryString("sign");
		if (username && sign) {
			urlParam += "&username=" + username;
			urlParam += "&sign=" + sign;
		}
	}

	var url = xhrArgs.url;
	var actionUrl = baseTools.getUrlQueryString("actionUrl");
	if (actionUrl) {
		// 跨域action请求
		url = baseTools.getUrlQueryString("actionUrl") + url;
	}

	var async = true;
	if (xhrArgs.async != undefined)
		async = xhrArgs.async;
	var dataType = "jsonp";
	if (xhrArgs.dataType != undefined)
		dataType = xhrArgs.dataType;
	var type = "POST";
	if (xhrArgs.type != undefined)
		type = xhrArgs.type;
	$.ajax({
		url: url,
		type: type,
		async: async,
		dataType: dataType,
		timeout: 120000,
		// 要发送到服务器的数据
		data: urlParam,
		// 当请求失败时调用的函数
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			if (url.indexOf("ca1.") == -1) {
				if (textStatus == 'timeout') {
					alert('连接服务器超时，请稍后再试！');
				} else {
					if (textStatus == 'parsererror') {
						//alert('连接服务器超时，请稍后再试！');
					} else {
						alert('操作提示\n操作失败原因:' + textStatus + "\n" + errorThrown);
					}
				}
			}

			if (bShow)
				baseTools.hideMash(maskObj);
			if (xhrArgs.errorcallback) {
				xhrArgs.errorcallback(XMLHttpRequest, textStatus, errorThrown);
			}
		},
		// 当请求成功时调用的函数
		success: function (data, textStatus) {
			// this; // 调用本次AJAX请求时传递的options参数
			if (xhrArgs.callback)
				for (var i = 0; i < xhrArgs.callback.length; i++)
					xhrArgs.callback[i](data, xhrArgs);
			if (bShow)
				baseTools.hideMash(maskObj);
		},
		// 当请求完成时调用的函数
		complete: function () {
		}
	});
};
// ////////////////局端管理中使用到的方法///////////////////////
/**
 * 获取JS模板
 * 
 * @param tplID
 *            模板ID
 */
taxClientTools.getTpl = function (tplID) {
	return BaseTemplate(tplID);
};
/**
 * 在iframe页面获取局端管理全局组件操作辅助对象
 */
taxClientTools.getTaxClientPlugins = function () {
	return top.taxClientPlugins;
};

/**
 * 获取用户ID
 * 
 * @returns
 */
taxClientTools.getUserId = function () {
	var userSeq = this.getCookie("USER_SEQ");
	if (userSeq) {
		return userSeq;
	} else {
		// if(typeof external.getSign != "undefined"){
		var r = baseTools.getQueryString("r");
		var s = baseTools.getQueryString("s");
		var userMap = baseTools.getQueryString("userMap");
		var cur_userid = baseTools.getQueryString("CUR_USERID");
		if (r && s && userMap && cur_userid) {
			var t = baseTools.parse(userMap);
			// if(s == external.getSign(t.DLMC,t.NSRMC,r)){
			this.setCookie("USER_SEQ", cur_userid);
			this.setCookie("QX_USER", t);
			return cur_userid;
			// }
		}
		// }
	}
	return null;
};
/**
 * 获取用户登录名
 * 
 * @returns
 */
taxClientTools.getUserName = function () {
	return taxClientTools.getUserAttr("DLMC");
};
/**
 * 获取企业名称
 * 
 * @returns
 */
taxClientTools.getNsrmc = function () {
	return taxClientTools.getUserAttr("NSRMC");
};
/**
 * 获取登录用户姓名
 * 
 * @returns
 */
taxClientTools.getCzryMc = function () {
	return taxClientTools.getUserAttr("CZRY_MC");
};
/**
 * 获取企业名称
 * 
 * @returns
 */
taxClientTools.getUserAttr = function (key) {
	var userMap = this.getCookie("QX_USER");
	if (userMap) {
		return userMap[key];
	}
};

taxClientTools.showEwm = function () {
	ythydyy_ewm.isShow = true;
	if ($(ythydyy_ewm).data("loaded") == 1) {
		ythydyy_ewm.style.display = 'block';
		return;
	}
	baseTools.xhrAjax({
		url: "/taxclient/searchKhdbb.do",
		params: {
			RJBB_DM: "80",
			F_BBHZX: 1
		},
		callback: [function (jsonObj, xhrArgs) {
			// console.log(jsonObj);
			var code = parseInt(jsonObj.code);
			if (code == 0) {
				var appUrl = "";
				var appMc = "一体化办税";
				if (jsonObj.data.length > 0) {
					appUrl = jsonObj.data[0].APP_URL_FULL;
					appMc = jsonObj.data[0].APP_MC;
				}
				// console.log(appUrl);
				if (appUrl != "") {
					$(ythydyy_ewm).qrcode({
						render: "table",
						width: 150,
						height: 150,
						background: "#ffffff",
						foreground: "#000000",
						correctLevel: QRErrorCorrectLevel.H,
						text: appUrl
					});
					$("span", ythydyy_ewm).html(appMc);
					$(ythydyy_ewm).data("loaded", 1);
					ythydyy_ewm.style.display = 'block';
				}
			} else {
				// alert(jsonObj.msg);
			}
		}]
	});
};

taxClientTools.hideEwm = function () {
	ythydyy_ewm.isShow = false;
	setTimeout("taxClientTools.toggleEwm()", 1000);
};

taxClientTools.toggleEwm = function () {
	if (ythydyy_ewm.isShow) {
		ythydyy_ewm.style.display = 'block';
	} else {
		ythydyy_ewm.style.display = 'none';
	}
};

taxClientTools.checkLogin = function (params) {
	if (taxClientTools.getUserId() == null) {
		$("#user_box").css("display", "none");
		// var homes = this.getLogin().split("/");
		// var curPages = window.document.location.href.split("/");
		// 不是首页时跳转到首页
		// if (homes[homes.length - 1] != curPages[curPages.length - 1])
		// this.gotoLogin();
		var divQyCp = $("#content");
		if (divQyCp.size() != 0 && divQyCp.attr("BASE_ATTR") == "WSBS")
			divQyCp.html("").parent().removeClass("home_ltop").addClass(
				"home_ltop_welcome");
		$("#user_box").html(this.getTpl("tplUserBoxLogin").render(null));
		// baseTools.byId("USER_ZH").focus();

		//if (params && params.bShow) {
		// alert("请先登录!");
		//baseTools.byId("USER_ZH").focus();
		//}
		taxClientTools.Init();
		return false;
	} else {
		var userMap = this.getCookie("QX_USER");
		if (!userMap) {
			var tmp = baseTools.getQueryString("userMap");
			if (tmp) {
				userMap = baseTools.parse(tmp);
				if (userMap) {

					this.setCookie("QX_USER", userMap);
				}
			}
		}
		if (!userMap) {
			$("#user_box").css("display", "none");

			$("#user_box").html(this.getTpl("tplUserBoxLogin").render(null));
			baseTools.byId("USER_ZH").focus();
		} else {
			if (userMap.NSRMC.length > 15) {
				userMap.NSRMC_sim = userMap.NSRMC.substring(0, 13) + "...";
			} else {
				userMap.NSRMC_sim = userMap.NSRMC;
			}
			$("#user_box").html(this.getTpl("tplUserBoxLoginout").render({
				data: userMap
			}));
			// for (var i = 0; i < taxClientTools.loginCallBack.length; i++) {
			// 	taxClientTools.loginCallBack[i]();
			// }
			taxClientTools.Init();
		}
		return true;
	}
};

taxClientTools.loginout = function () {
	taxClientTools.clearAllCookie();
	taxClientTools.checkLogin({
		bShow: false
	});
	// if ($('#countentFrm').attr("src") == "wsbs1.html") {
	// window.location = "wsbs.html"
	// }
	window.parent.location = 'wsbs.html';
};
// 运行使用默认密码
taxClientTools.getCheckpass = function () {
	var ischeck = taxClientTools.getUserAttr("RKLCHECK");
	return ischeck && ischeck == "1" ? taxClientTools.getCookie("CHECKPASS") : "";
};
// 判断获取yhxxly
taxClientTools.getYhxxly = function () {
	return taxClientTools.getUserAttr("YHXXLY_1");
};
// 判断是否进入CA管理
taxClientTools.getCheckRca = function () {
	if (taxClientTools.getYhxxly() == '9') {// 个体双定户
		if (typeof external.CheckPfxCertInIE != "undefined") {
			if (external.CheckPfxCertInIE(taxClientTools.getUserAttr("SHXYDM")) == 0) {// 系统中未安装该企业的软证书
				return true;
			}
		}
	}
	return false;
};
//刷新验证码
taxClientTools.refreshRcode = function () {
	if (taxClientTools.cnf.rcodeOpen == 1) {
		$('#picCode').attr("src", taxClientTools.cnf.clientURL + '/cm/showPictureCode.do?t=' + Math.random());
	} else {
		$("#div_jym").hide();
	}

};
taxClientTools.onforgetPwd = function () {
	var url = taxClientTools.getCnfHostWsbsfwt() + "/taxclient/czmmsq/czmm_index.html";
	window.open(url, "win_dsxxcj_");
};
taxClientTools.onLogin = function () {

	var zh = baseTools.byId("USER_ZH").value.trim();
	var mm = baseTools.byId("USER_MM").value.trim();
	//var rc = baseTools.byId("rcode").value.trim();	
	var rc = '';
	if (baseTools.byId("rcode")) {
		rc = baseTools.byId("rcode").value.trim();
	}

	taxClientTools.setCookie("LAST_USER", zh);
	if (zh.length == 0) {
		alert('请录入帐号!');
		baseTools.byId("USER_ZH").focus();
		return false;
	}
	if (mm.length == 0) {
		alert('请录入口令!');
		baseTools.byId("USER_MM").focus();
		return false;
	}
	if (taxClientTools.cnf.rcodeOpen == 1) {
		if (rc.length == 0) {
			alert('请输入校验码!');
			baseTools.byId("rcode").focus();
			return false;
		}

		if (rc.length != 4) {
			alert('校验码无效!');
			baseTools.byId("rcode").focus();
			return false;
		}
	}
	// 判断密码强度
	if (taxClientTools.checkpassword(mm) != true) {
		// 密码不含字母和数字组合
		this.setCookie("CHECKPASS", 'true');
		// 判断密码强度
	} else if (zh.substring(zh.length - 8) == mm) {
		// 密码不含字母和数字组合
		this.setCookie("CHECKPASS", 'true');
	} else {
		this.delCookie("CHECKPASS");
	}
	var loginUrl = "/checkQyLogin.do";

	baseTools
		.xhrAjax({
			url: loginUrl,
			bShow: false,
			params: {
				USERNAME: zh,
				PASSWORD: mm,
				rcode: rc,
				CUR_USERID: "-1"
			},
			callback: [function (jsonObj, xhrArgs) {

				switch (parseInt(jsonObj.code)) {
					// 查询操作返回标志
					case 1:
						if (taxClientTools.setCookieJsonObjLogin(jsonObj.data)) {
							taxClientTools.setCookie("USER_SEQ",
								jsonObj.data.USERID);
							taxClientTools.checkLogin({
								bShow: false
							});

							if (typeof external.ADDUSER != "undefined") {
								// 登录成功,记入客户端本地数据库
								try {
									external.ADDUSER(zh);
								} catch (e) {
								}
							}
							taxClientTools.close_window();// 关闭登录窗口
							if (taxClientTools.getCheckpass() == 'true') {
								alert("根据国家税务总局信息系统安全管理要求，登录河南网上办税厅用户使用弱口令需要先修改密码才能办理涉税相关业务，密码规则为长度不小于8位的数字与字母的组合，请您点击确定配合修改密码！");
								// location.href =
								// taxClientTools.getServerHost() +
								// "user_main_pass.html";
								taxClientTools.gotoManage();
							} else if (taxClientTools.getCheckRca()) {
								alert("你尚未安装数字证书，请先进行数字证书申请操作！");
								taxClientTools.gotoRca();
							} else {// 登录之后不再跳转
								// location.href = "wsbs.html";
							}
							//for (var i = 0; i < taxClientTools.loginCallBack.length; i++) {
							//	taxClientTools.loginCallBack[i]();
							//}
						}

						break;
					// 在线帮助
					case 6:
						break;
					case -1:// 保存出错返回标志
						if (jsonObj.msg == '您尚未开通系统的使用权限！') {
							if (confirm("您尚未开通系统的使用权限！\n是否现在开通？")) {
								taxClientTools.addQyyhByNsrsbh(zh);
								break;
							}
						} else {
							alert(jsonObj.msg);
						}
						baseTools.byId("USER_MM").focus();
						break;
					case -2:// 其它错误返回标志
					case -4:// 校验码出错返回标志
						alert("校验码无效，请重新输入！");
						taxClientTools.refreshRcode();
						break;
					case -5://用户名密码过于简单
						alert(jsonObj.msg);
						taxClientTools.gotoManage();
						break;
					case -3:// session 失效请重新登录
						break;
					default:
				}
			}],
			errorcallback: function (XMLHttpRequest, textStatus,
				errorThrown) {
				taxClientTools.checkUserInfo("loginerror:" + textStatus
					+ ":" + errorThrown);
			}
		});
};

taxClientTools.onLogin_gdsgj = function () {

	var zh = baseTools.byId("USER_ZH").value.trim();
	var mm = baseTools.byId("USER_MM").value.trim();
	//var rc = baseTools.byId("rcode").value.trim();	
	var rc = '';
	if (baseTools.byId("rcode")) {
		rc = baseTools.byId("rcode").value.trim();
	}

	taxClientTools.setCookie("LAST_USER", zh);
	if (zh.length == 0) {
		alert('请录入帐号!');
		baseTools.byId("USER_ZH").focus();
		return false;
	}
	if (mm.length == 0) {
		alert('请录入口令!');
		baseTools.byId("USER_MM").focus();
		return false;
	}
	if (taxClientTools.cnf.rcodeOpen == 1) {
		if (rc.length == 0) {
			alert('请输入校验码!');
			baseTools.byId("rcode").focus();
			return false;
		}

		if (rc.length != 4) {
			alert('校验码无效!');
			baseTools.byId("rcode").focus();
			return false;
		}
	}
	// 判断密码强度
	if (taxClientTools.checkpassword(mm) != true) {
		// 密码不含字母和数字组合
		this.setCookie("CHECKPASS", 'true');
		// 判断密码强度
	} else if (zh.substring(zh.length - 8) == mm) {
		// 密码不含字母和数字组合
		this.setCookie("CHECKPASS", 'true');
	} else {
		this.delCookie("CHECKPASS");
	}
	var loginUrl = "/checkQyyhLogin.do";

	baseTools
		.xhrAjax({
			url: loginUrl,
			bShow: false,
			params: {
				USERNAME: zh,
				PASSWORD: mm,
				rcode: rc,
				CUR_USERID: "-1"
			},
			callback: [function (jsonObj, xhrArgs) {

				switch (parseInt(jsonObj.code)) {
					// 查询操作返回标志
					case 1:
						if (taxClientTools.setCookieJsonObjLogin(jsonObj.data)) {
							taxClientTools.setCookie("USER_SEQ",
								jsonObj.data.USERID);

							var gsxxData;
							if (taxClientTools.setCookieJsonObjLogin(jsonObj.data)) {
								//检查成功同时国税认证成功：jsonObj.data有数据是国税认证成功的标志
								//写在此处是为了写一次cookie
								gsxxData = jsonObj.data;
								taxClientTools.setCookie("USER_SEQ", gsxxData.USERID);
								taxClientTools.setCookie("DJXH", gsxxData.DJXH);
								taxClientTools.setCookie("DJZCLX_DM", gsxxData.DJZCLX_DM);
								// 登录的账号
								taxClientTools.setCookie("USER_CODE", $(":input[name='USER_ZH']").val().trim());
								// taxClientTools.setCookie("WGZ_NH", gsxxData.COL1);
								// taxClientTools.setCookie("WGZ_WH", gsxxData.COL2);
								// 删除弱口令标志
								taxClientTools.delCookie("RKLBZ");

							}
							// 检查成功且纳税人存在
							if (jsonObj.data && jsonObj.data.NSRSBH) {
								// $("#nsrsbh").val(jsonObj.data.NSRSBH);
								// $("#shxydm").val(jsonObj.data.SHXYDM);
								// $("#ssdabh").val(jsonObj.data.SSDABH);
								// //页面刷新后也可以取到这些信息
								// taxClientTools.setCookie("gds_nsrsbh", jsonObj.data.NSRSBH);
								// taxClientTools.setCookie("gds_shxydm", jsonObj.data.SHXYDM);
								// taxClientTools.setCookie("gds_ssdabh", jsonObj.data.SSDABH);
							}
							// baseTools.hideMash(maskObj);
							//显示选择入口界面
							$(".login_box").hide();
							//写在最后不怕前面报错
							taxClientTools.setCookie("loginFlag", "true");
							window.location = "wsbs.html";
						}

						break;
					// 在线帮助
					case 6:
						break;
					case -1:// 保存出错返回标志
						if (jsonObj.msg == '您尚未开通系统的使用权限！') {
							if (confirm("您尚未开通系统的使用权限！\n是否现在开通？")) {
								taxClientTools.addQyyhByNsrsbh_gdsgj(zh);
								break;
							}
						} else {
							alert(jsonObj.msg);
						}
						baseTools.byId("USER_MM").focus();
						break;
					case -2:// 其它错误返回标志
					case -4:// 校验码出错返回标志
						alert("校验码无效，请重新输入！");
						taxClientTools.refreshRcode();
						break;
					case -5://用户名密码过于简单
						alert(jsonObj.msg);
						taxClientTools.gotoManage();
						break;
					case -3:// session 失效请重新登录
						break;
					default:
				}
			}],
			errorcallback: function (XMLHttpRequest, textStatus,
				errorThrown) {
				taxClientTools.checkUserInfo("loginerror:" + textStatus
					+ ":" + errorThrown);
			}
		});
};
taxClientTools.addQyyhByNsrsbh = function (nsrsbh) {
	baseTools.xhrAjax({
		url: '/taxclient/addQyyhByNsrsbh.do',
		bShow: false,
		params: {
			NSRSBH: nsrsbh
		},
		callback: [function (jsonObj, xhrArgs) {
			switch (parseInt(jsonObj.code)) {
				// 查询操作返回标志
				case 1:// 开户成功
					if (confirm("您已成功开通河南省网上税务局！默认密码Aa加纳税人识别号后8位，现在是否登录？")) {
						baseTools.byId("USER_MM").value = "Aa" + nsrsbh.substring(nsrsbh.length - 8);
						baseTools.onLogin();
					}
					break;
				// 在线帮助
				case 0:
					alert("您已开通过河南省网上税务局，无需再次开通！");
					break;
				case 2:
					alert("纳税人识别号无效！");
					break;
				case 3:
					alert("用户状态异常，请联系主管税务机关！");
					break;
				case -3:// session 失效请重新登录
					break;
				default:
					alert(jsonObj.msg);
			}
		}]
	});

};
taxClientTools.onBindFormData = function (jsonObj) {
	for (var key in jsonObj) {
		var obj = $("input[name='" + key + "']");
		if ($(obj).length > 0) {
			$(obj).val(jsonObj[key]);
		}
		var objSpan = $("span[name='" + key + "']");
		if ($(objSpan).length > 0) {
			$(objSpan).html(jsonObj[key]);
		}
		var objDiv = $("div[name='" + key + "']");
		if ($(objDiv).length > 0) {
			$(objDiv).html(jsonObj[key]);
		}
		var objDiv = $("select[name='" + key + "']");
		if ($(objDiv).length > 0) {
			$(objDiv).val(jsonObj[key]);
		}
	}
};
taxClientTools.addQyyhByNsrsbh_gdsgj = function (nsrsbh) {
	baseTools.xhrAjax({
		url: '/taxclient/addQyyhByNsrsbh.do',
		bShow: false,
		params: {
			NSRSBH: nsrsbh
		},
		callback: [function (jsonObj, xhrArgs) {
			switch (parseInt(jsonObj.code)) {
				// 查询操作返回标志
				case 1:// 开户成功
					if (confirm("您已成功开通河南省网上税务局！默认密码Aa加纳税人识别号后8位，现在是否登录？")) {
						baseTools.byId("USER_MM").value = "Aa" + nsrsbh.substring(nsrsbh.length - 8);
						baseTools.onLogin_gdsgj();
					}
					break;
				// 在线帮助
				case 0:
					alert("您已开通过河南省网上税务局，无需再次开通！");
					break;
				case 2:
					alert("纳税人识别号无效！");
					break;
				case 3:
					alert("用户状态异常，请联系主管税务机关！");
					break;
				case -3:// session 失效请重新登录
					break;
				default:
					alert(jsonObj.msg);
			}
		}]
	});

};
taxClientTools.checkpassword = function (v) {
	var numasc = 0;
	var charasc = 0;
	var otherasc = 0;
	if (0 == v.length) {
		return "密码不能为空";
	} else if (v.length < 8 || v.length > 24) {
		return "密码规则：长度为8~24位数字、字母或特殊字符组合（不含空格）";
	} else {
		for (var i = 0; i < v.length; i++) {
			var asciiNumber = v.substr(i, 1).charCodeAt();
			if (asciiNumber >= 48 && asciiNumber <= 57) {
				numasc += 1;
			}
			if ((asciiNumber >= 65 && asciiNumber <= 90)
				|| (asciiNumber >= 97 && asciiNumber <= 122)) {
				charasc += 1;
			}
			if ((asciiNumber >= 33 && asciiNumber <= 47)
				|| (asciiNumber >= 58 && asciiNumber <= 64)
				|| (asciiNumber >= 91 && asciiNumber <= 96)
				|| (asciiNumber >= 123 && asciiNumber <= 126)) {
				otherasc += 1;
			}
		}
		// if(0==numasc) {
		// return "密码必须含有数字";
		// }else if(0==charasc){
		// return "密码必须含有字母";
		// }else if(0==otherasc){
		// return "密码必须含有特殊字符";
		// }else{
		// return true;
		// }
		if ((numasc != 0 && charasc != 0) || (numasc != 0 && otherasc != 0)
			|| (charasc != 0 && otherasc != 0)) {
			return true;
		} else {
			return "密码规则：长度为8~24位数字、字母或特殊字符组合（不含空格）";
		}
	}
};
taxClientTools.user_xs = function () {
	user_pop1.isShow = true;
	user_pop1.style.display = 'block';
};

taxClientTools.user_yc = function () {
	user_pop1.isShow = false;
	setTimeout("taxClientTools.toggleUserInfo()", 1000);
};

taxClientTools.toggleUserInfo = function () {
	if (user_pop1.isShow) {
		user_pop1.style.display = 'block';
	} else {
		user_pop1.style.display = 'none';
	}
};

taxClientTools.RunExe = function (regPath, exeName, downurl) {
	try {
		var path = "";

		WshShell = new ActiveXObject("WScript.Shell");
		if (regPath.indexOf("HKEY_LOCAL_MACHINE") != -1) {
			var p1 = "";
			try {// 判断是否64位系统
				p1 = WshShell
					.RegRead("HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\");
			} catch (e) {
			}
			if (p1) {// 64位操作系统
				path = WshShell.RegRead(regPath);
			} else {// 非64位操作系统
				path = WshShell.RegRead(regPath.replace(/Wow6432Node/ig, ""));
			}
		} else {
			path = regPath;
		}
		var pathArr = path.split("\\");
		path = "";
		for (var i = 0; i < pathArr.length; i++) {
			var p = pathArr[i];
			if (p.indexOf(".exe") > -1) {
				path = path + p;
			} else {
				if (p.length <= 8) {
					path += p + "\\\\";
				} else {
					path += p.substr(0, 6) + "~1\\\\";
				}
			}
		}
		if (regPath.indexOf("HKEY_LOCAL_MACHINE") != -1) {
			path += exeName;
			// }else{
			// if(exeName){
			// path ="cmd.exe /c start /d "+path +" "+exeName;
			// }else{
			// path ="cmd.exe /c start /d "+path;
			// }
		}
		// alert(path)
		WshShell.Run(path);
	} catch (e) {
		// alert(e);
		if (downurl) {
			if (confirm("您尚未安装该应用！是否下载安装？")) {
				window.open(downurl, "_blank");
			}
		} else {
			alert("您尚未安装该应用！");
		}
	}
};

taxClientTools.ssoLoginMethod = function (params) {
	if(params==1){//网上涉税事项办理
		params = {RJBB_DM:"1312091724010001", RJBB_BM:"wssp",RJBB_MC:"网上涉税事项办理",SFDZ:"2",OPEN_TYPE:"1",QYDDZ:"https://jcpt.ha-n-tax.gov.cn/web/taxclient/manage/main.html?n=ss",DDDLCS:"XMFL_DM=wssp",JDDZ:"https://wsbsfwt.ha-n-tax.gov.cn"};
	}else if(params==2){
		params = {RJBB_DM:"333333", RJBB_BM:"hlwsb",RJBB_MC:"纳税申报",SFDZ:"2",OPEN_TYPE:"1",QYDDZ:"https://jcpt.ha-n-tax.gov.cn/web/taxclient/manage/main.html?n=sb",DDDLCS:"XMFL_DM=80,hlwsb",JDDZ:"https://wssb.ha-n-tax.gov.cn"};
	}
	
	// 0未定制，1已定制未审批，2已定义已审批

	if (params.OPEN_TYPE == '2') {
		var path = params.QYDDZ;
		var dddlcs = params.DDDLCS;
		var jddz = params.JDDZ;

		if (typeof external.OpenModel != "undefined") {
			// if(dddlcs==""){
			// external.OpenModel(path, "", "max", "exe");
			// }else{
			taxClientTools.RunExe(path, dddlcs, jddz);
			// }
		} else {
			taxClientTools.RunExe(path, dddlcs, jddz);
		}
		return;
	}

	// if (params.SFDZ == "1") {
	// 	alert("已定制未开通!\n请联系400-811-0006进行开通!");
	// 	return false;
	// }

	// taxClientTools.ssoLoginRjbb = function (RJBB_DM, RJBB_BM, RJBB_MC) {
	baseTools
		.xhrAjax({
			url: "/taxclient/ssoLogin.do",
			params: {
				RJBB_DM: params.RJBB_DM,
				returnJson: true
			},
			callback: [function (jsonObj, xhrArgs) {
				switch (parseInt(jsonObj.code)) {
					case 0:
						if (typeof external.OpenModel != "undefined") {
							var url = jsonObj.data.ssoRedirectURL;
							var winHref = taxClientTools.cnf.clientURL;
							if (url.indexOf("12366.ha.cn") > -1
								&& winHref.indexOf("htjs.net") > -1
								&& taxClientTools.getCnfHostChange() == 1) {
								url = url.replace("12366.ha.cn", "htjs.net");
							}
							if (url.indexOf("wssb2.12366.ha.cn") > -1) {
								url = url.replace("wssb2.12366.ha.cn",
									"wssb3.12366.ha.cn");
							}
							var drag_win_id = params.RJBB_DM;
							if (url.indexOf("ycrz2") > -1) {
								var rtn = taxClientTools.RunYcrz(drag_win_id);
								if (rtn && rtn == 0) {
									return;
								}
							}
							if (url.indexOf("?") > -1) {
								url += "&drag_win_id=" + drag_win_id;
							} else {
								url += "?drag_win_id=" + drag_win_id;
							}

							var OPEN_TYPE = params.OPEN_TYPE;
							if (OPEN_TYPE == '1') {
								external
									.OpenModel(url, "0", "max", drag_win_id);
							} else if (OPEN_TYPE == '2'
								&& (url.indexOf(".exe") > -1)) {
								// 以exe结尾,调用本机程序
								external.OpenModel(url, "0", "max", "exe");
							} else if (OPEN_TYPE == '2'
								&& !(url.indexOf(".exe") > -1)) {
								// 不以exe结尾,调用注册表
								external.OpenModel(url, "0", "max", "reg");// reg
							}

						} else {
							var left = 0;
							var top = 0;
							var width = screen.availWidth - 16;
							var height = screen.availHeight - 70;
							var param = "left=" + left + ",top=" + top
								+ ",width=" + width + ",height=" + height;
							param += ",scrollbars,resizable=yes,toolbar=no";
//							window.open(jsonObj.data.ssoRedirectURL,params.RJBB_MC, param);
							window.location.href(jsonObj.data.ssoRedirectURL);
						}
						break;
					default:
						alert(jsonObj.msg);
						break;
				}
			}]
		});
};

//跳转地税网厅
//跳转地税网厅
taxClientTools.ssoLoginDswt = function () {
	baseTools.xhrAjax({
		url: '/checkGt3DsLogin.do',
		bShow: false,
		async: false,
		params: {
			DJXH: taxClientTools.getCookie('QX_USER').DJXH
		},
		callback: [function (jsonObj) {
			switch (jsonObj.code) {
				case "0":
					var r = jsonObj.data;
					var param = "?htjs_sso_service=" + encodeURIComponent(r.htjs_sso_service) + "&yhuuid=" + encodeURIComponent(r.yhuuid) + "&nsrsbh=" + encodeURIComponent(r.nsrsbh)
						+ "&dlzhdm=" + encodeURIComponent(r.dlzhdm) + "&sjhm=" + encodeURIComponent(r.sjhm) + "&shxydm=" + encodeURIComponent(r.shxydm) + "&zyhuuid=" + encodeURIComponent(r.zyhuuid) + "&djxh=" + encodeURIComponent(r.djxh)
						+ "&sfsmrz=" + encodeURIComponent(r.sfsmrz) + "&sfzzh=" + encodeURIComponent(r.sfzzh) + "&sfmrmm=" + encodeURIComponent(r.sfmrmm)
						+ "&xm=" + encodeURIComponent(r.xm) + "&yhmc=" + encodeURIComponent(r.yhmc);
					var url = taxClientTools.cnf.zrrDswtURL + param;
//					window.open(url);
					window.location.href(url);/*登录完成跳转*/
					break;
				default:
					alert(jsonObj.msg);
					return;
			}

		}]
	});
};


//保存地税跳转记录
taxClientTools.insertDstzjl = function (ssdabh) {
	baseTools.xhrAjax({
		url: "/taxclient/insertDstzjl.do",
		params: {
			SSDABH: ssdabh
		},
		callback: [function (jsonObj, xhrArgs) {

		}]
	});
};
taxClientTools.downloadIE = function () {
	var param = "left=" + 200 + ",top=" + 200 + ",width=" + 200 + ",height="
		+ 200;
	param += ",scrollbars,resizable=yes,toolbar=no";
	var url = "http://download.microsoft.com/download/1/6/1/16174D37-73C1-4F76-A305-902E9D32BAC9/IE8-WindowsXP-x86-CHS.exe";
	window.open(url, "IE8下载", param);
};
taxClientTools.openCjwt = function () {
	var param = "";
	var url = "help.html";
	window.open(url, "常见问题", param);
};
/**
 * 登录框下拉选择初始化
 */
taxClientTools.Init = function () {

	// $("#allSitesBoxHdl")[0].style.display = 'none';//不显示公司账号的列表
	//if (typeof external.GETUSER != "undefined") {
	$("#USER_ZH").each(function () {// 给所有的text加属性
		$(this).bind("keyup", OnKeyup); // 按键时
		$(this).bind("mousedown", BoxShowUrls); // 鼠标安下时
		$(this).bind("mouseout", BoxHide); // 鼠标离开时
		$(this).bind("focus", closeIME); // 处到焦点时
		// $(this).bind("paste", OnPaste); //处理http;//
		$(this)[0].setAttribute('autocomplete', 'off');
	});
	// 取出当前账号
	// var icpSite = "410104712644904,410104712644905,410104712644906";//
	// "410104712644904,410104712644905,410104712644906";external.GETUSER()


	var ca = typeof external.UK_Get_Cn != "undefined" ? external.UK_Get_Cn() : null;
	var p = baseTools.getQueryString("p");
	var w = baseTools.getQueryString("w");

	if (p) {
		onCaChanged(p, w);
	} else if (ca) {
		var nsrsbh = ca.substring(ca.indexOf("CN=") + 3, ca.indexOf(","));
		$("#USER_ZH").val(nsrsbh);
	} else {
		var icpSite = '';
		try {
			icpSite = external.GETUSER();
		} catch (e) {
			//console.log('获取客户端方法错误');
		}

		if (!icpSite) {
			icpSite = taxClientTools.getUserName();
		}
		if (icpSite) {// 如果存在的话取第一个值给当前框
			icpSite = icpSite.split(',')[0];
			$("#USER_ZH").val(icpSite);
		}
	}

	//}

	taxClientTools.refreshRcode();
};
/**
 * 获取服务器地址
 */
taxClientTools.getServerHost = function () {
	var winHref = window.location.href;
	//if (winHref.indexOf("file:") > -1) {
	//	return taxClientTools.cnf.ythURL + "/web/ythclient/";
	//} else {
	return "";
	//}
};
/**
 * 获取服务器地址
 */
taxClientTools.getHntaxServerHost = function () {
	return taxClientTools.cnf.ythURL + "/web/hntaxclient/";
};

/**
 * 进入到管理界面
 */
taxClientTools.gotoManage = function () {
	var winHref = window.location.href;
	var r = Math.round(Math.random() * 100000);
	var khsh = this.getUserAttr("DLMC");
	var khmc = this.getUserAttr("NSRMC");
	if (typeof external.getSign != "undefined") {
		// 调用外壳程序下载,
		var s = external.getSign(khsh, khmc, r);
		// var s="";
		// window.open(taxClientTools.getServerHost() +
		// "user_main_pass.html?CUR_USERID=" + taxClientTools.getUserId() +
		// "&userMap=" + baseTools.stringify(this.getCookie("QX_USER")) +
		// "&r="+r+"&s="+s);
		top.countentFrm.location.href = taxClientTools.getServerHost()
			+ "user_main_pass.html?CUR_USERID="
			+ taxClientTools.getUserId() + "&userMap="
			+ baseTools.stringify(this.getCookie("QX_USER")) + "&r=" + r
			+ "&s=" + s;
	} else {
		if (winHref.indexOf("http") > -1) {
			top.countentFrm.location.href = "user_main_pass.html";
		} else {
			top.countentFrm.location.href = "user_main_pass.html";
			return;
		}
	}
};
/**
 * 进入软证书下载
 */
taxClientTools.gotoRca = function () {
	var winHref = window.location.href;
	var r = Math.round(Math.random() * 100000);
	var khsh = this.getUserAttr("DLMC");
	var khmc = this.getUserAttr("NSRMC");
	if (typeof external.getSign != "undefined") {
		// 调用外壳程序下载,
		var s = external.getSign(khsh, khmc, r);
		// var s="";
		// window.open(taxClientTools.getServerHost() +
		// "user_main_pass.html?CUR_USERID=" + taxClientTools.getUserId() +
		// "&userMap=" + baseTools.stringify(this.getCookie("QX_USER")) +
		// "&r="+r+"&s="+s);
		top.countentFrm.location.href = taxClientTools.getServerHost()
			+ "user_main_rca.html?CUR_USERID=" + taxClientTools.getUserId()
			+ "&userMap=" + baseTools.stringify(this.getCookie("QX_USER"))
			+ "&r=" + r + "&s=" + s;
	} else {
		if (winHref.indexOf("http") > -1) {
			top.countentFrm.location.href = "user_main_rca.html";
		} else {
			alert("功能暂时不可用！");
			return;
		}
	}
};
taxClientTools.RunFixTools = function () {
	if (typeof external.getCurrentDir != "undefined") {
		// taxClientTools.RunExe(external.getCurrentDir()+"fixtool.exe","","http://yth.htjs.net/web/download/setupfix.exe");
		// external.OpenModel(external.getCurrentDir()+"fixtool.exe", "", "max",
		// "exe");
		external.run_fixtool();
	}
};
taxClientTools.RunYcrz = function (u) {
	if (typeof external.getCurrentDir != "undefined") {
		// taxClientTools.RunExe(external.getCurrentDir()+"fixtool.exe","","http://yth.htjs.net/web/download/setupfix.exe");
		// alert("C:\\ythfpscan\\TaxInfo.exe "+u);
		try {
			// WshShell = new ActiveXObject("WScript.Shell");
			// WshShell.run("cmd.exe /c copy c:\\ythfpscan\\autoupd.exe
			// c:\\ythfpscan\\autoupd_bak.exe /Y");
			if (typeof external.Copy_file != "undefined!") {
				external.Copy_file("c:\\ythfpscan\\autoupd.exe",
					"c:\\ythfpscan\\autoupd_bak.exe");
			}
		} catch (e) {

		}
		return external.OpenModel("C:\\ythfpscan\\autoupd_bak.exe",
			"C:\\ythfpscan " + u + " 升级窗口显示标题", "max", "exe");
		// taxClientTools.RunExe("C:/ythfpscan/TaxInfo.exe
		// u","","http://yth.htjs.net/web/download/setupfix.exe");

	}
};

// 显示已安装软件列表新增的方法开始
taxClientTools.createDocument = function () {
	if (typeof arguments.callee.activeXString != "string") {
		var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0",
			"MSXML2.DOMDocument"], i, len;
		for (i = 0, len = versions.length; i < len; i++) {
			try {
				var xmldom = new ActiveXObject(versions[i]);
				arguments.callee.activeXString = versions[i];
				break;
			} catch (ex) {
				// 跳过
			}
		}
	}
	return new ActiveXObject(arguments.callee.activeXString);
};
taxClientTools.getSoftList = function () {
	var data = new Array();

	var fileName = "c:/一体化办税/skin/module.xml";
	if (typeof external.getCurrentDir != "undefined") {
		fileName = external.getCurrentDir() + "/skin/module.xml";// 要解析的xml文件
	}
	// test:"D:/XUJUN/workspace/yth_platform_test/softmgr/module.xml";//
	var xmldom = taxClientTools.createDocument();

	xmldom.async = false;
	xmldom.load(fileName);
	if (xmldom.parseError != 0) {// 解析出现错误
		// 错误
	} else {
		var rows = xmldom.getElementsByTagName("ROW");
		for (var i = 0; i < rows.length; i++) {
			data.push(rows[i]);
		}
	}

	return data;
};
// 显示已安装软件列表新增的方法结束

taxClientTools.getSoftList2 = function () {
	var data = new Array();
	//var fileName = "c:/一体化办税/skin/module.xml";

	var fileName = "c:/一体化办税/skin/module.xml";
	if (typeof external.getCurrentDir != "undefined") {
		fileName = external.getCurrentDir() + "/skin/module.xml";// 要解析的xml文件
	}

	// test:"D:/XUJUN/workspace/yth_platform_test/softmgr/module.xml";//
	var xmldom = taxClientTools.createDocument();

	xmldom.async = false;
	// alert(fileName)
	try {
		xmldom.load(fileName);
	} catch (e) {
		//console.log('读取module.xml错误');
	}
	if (xmldom.parseError != 0) {// 解析出现错误
		// alert("1111");
		// 错误
	} else {
		// alert(xmldom.innerText);
		var rows = xmldom.getElementsByTagName("ROW");
		// alert(rows.length);
		var r = /^(EXE|REG)$/i;
		for (var i = 0; i < rows.length; i++) {
			// if(rows[i].getAttribute("STRCODE")=="20001"){
			// alert(rows[i].getAttribute("STRRUNMODE"));
			// }
			if (rows[i].getAttribute("STRCODE") != "10000"
				&& rows[i].getAttribute("STRSTATE") == 4
				&& r.test(rows[i].getAttribute("STRRUNMODE"))) {
				var t = {
					"no": rows[i].getAttribute("STRCODE"),
					"title": rows[i].getAttribute("STRNAME"),
					"img": rows[i].getAttribute("STRIMAGE")
				};
				data.push(t);
			}
		}
	}
	// alert(data.length);
	return data;
};
/**
 * 检测用户信息
 */
taxClientTools.checkUserInfo = function (cps) {
	var par = {
		QYID: taxClientTools.getUserAttr("QYID"),
		KHSH: taxClientTools.getUserAttr("NSRSBH"),
		DLZH: taxClientTools.getUserAttr("NSRSBH"),
		CPS: cps
	};
	//
	if (typeof external.GETUSER != "undefined") {
		try {
			par.KHSHS = external.GETUSER();
		} catch (e) {
		}
	}
	if (typeof external.get_version != "undefined") {
		par.CLIENTVER = external.get_version();
	}
	if (typeof external.get_ieversion != "undefined") {
		par.BROWSER = external.get_ieversion();
	}
	if (typeof external.get_winversion != "undefined") {
		par.OS = external.get_winversion();
	}
	if (typeof external.get_memsize != "undefined") {
		par.MEMORY = external.get_memsize();
	}
	if (typeof external.get_clientid != "undefined") {
		par.CLIENTID = external.get_clientid();
	}
	// alert(cps);
	var urlParam = baseTools.preparePostData(null, par);
	// alert(urlParam);
	$.ajax({
			url: taxClientTools.cnf.caURL + "checkUserInfo",
			dataType: 'jsonp',
			data: urlParam,
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				// if (textStatus == 'timeout') {
				// alert('连接服务器超时，请稍后再试！');
				// } else {
				// // 调用本次AJAX请求时传递的options参数
				// alert('操作提示\n操作失败原因:' + textStatus + "\n" + errorThrown);
				// }
			},
			success: function (data) {
				switch (parseInt(data.Code)) {
					// 查询操作返回标志
					case 1:
						if (data.notice
							&& !baseTools.getCookie("notice_"
								+ data.notice[0].ID)) {// 如果返回的有通知，且没有看过，则显示公告。
							var notice_obj = $("#notice_win");
							notice_obj.find(".win_title").html(
								data.notice[0].title);
							notice_obj.find("ul").html(data.notice[0].content);
							notice_obj.show();
							notice_obj.attr("notice_id", data.notice[0].ID);

						}
						break;
					default:

				}
			}
		});
};


/**
 * 打开线路选择
 */
taxClientTools.run_fixtool_net = function () {
	if (typeof external.run_fixtool_net != 'undefined') {
		// alert("1");
		external.run_fixtool_net();
	} else {
		taxClientTools.RunFixTools();
	}
};

/**
 * 设置参数 fname:配置文件名字（setup.ini); key:配置熟悉名称 value:设置值
 */
taxClientTools.SetClientCNF = function (fname, key, value) {
	if (typeof external.SetClientCNF != 'undefined') {
		external.SetClientCNF(fname, key, value);
	}
};
/**
 * 设置参数 fname:配置文件名字（setup.ini); key:配置熟悉名称 value:设置值
 */
taxClientTools.getSeParam = function (czlx) {
	if (typeof external.getSign != "undefined"
		&& typeof external.getSign != "unknown") {
		var param = {};
		var khsh = taxClientTools.getUserAttr("NSRSBH");
		var r = Math.round(Math.random() * 100000);
		var md5str = curSeg.getSign(khsh, czlx, r);
		param = {
			KHSH: khsh,
			CZLX: czlx,
			R: r,
			MD5STR: md5str
		};
		return param;
	} else {
		return {};
	}

};

/**
 * 计算表格在页面中的高度
 * 
 * @param tbList
 *            表格的jquery对象
 */
taxClientTools.getMmGridHeight = function (tbList) {
	var tbHeight = 2;
	var tbListPg = tbList.next();
	if (tbListPg.size() != 0) {
		tbHeight = tbListPg.height() == 0 ? 24 : tbListPg.height();
	}
	var docHeight = document.documentElement.clientHeight;
	var jc = 0;
	if (baseTools.getCurBrowser().isIE8 || baseTools.getCurBrowser().isIE7) {
		jc = 29 - tbHeight;
		if (tbList.offset().top == -120) {// IE7下top值为-120
			jc = jc - 60;
		}
	}
	return docHeight - Math.abs(tbList.offset().top) - tbHeight - jc;
};

taxClientTools.openZxkf = function () {
	external.Run_Fwzs('88888');
};
