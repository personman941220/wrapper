/*$(document).ready(function(){
	// 登陆
	$("#login_in").click(checklogin);
	// 注册
	$("#register_sure").click(userregister);
	// 找回密码
	$("#back_sure").click(callbackpassword);
	// 注册获取验证码
	$("#code_register").click(registersendyzm);
	// 修改密码获取验证码
	$("#code_forget").click(forgetsendyzm);
	// 左侧菜单当前选中
	$('.m_side_menu a').click(function() {
		$('.m_side_menu a').removeClass('j_active');
		$(this).addClass('j_active');
	});
	// 计算内容区高度函数调用
	calc_con_h();
	// 窗口发生变化再次计算内容区高度
	$(window).resize(function() {
		calc_con_h();
	});
	// 登陆
	var input = document.getElementById("password");
	var eyes = document.getElementById("login_hidden_block");
	eyes.onclick = function(e) {
		var btn = e.target.className; // e.target是找到了鼠标点击事件的DOM元素
		if (btn === 'hidden') {
			input.type = "text";
			e.target.className = "block";
			document.getElementById("block").style.display = "block";
		} else if (btn === 'block') {
			input.type = "password";
			e.target.className = "hidden";
			document.getElementById("hidden").style.display = "hidden";
		}
	}
	// 注册
	var inputR = document.getElementById("register_password");
	var eyesR = document.getElementById("register_hidden_block");
	eyesR.onclick = function(e) {
		var btnR = e.target.className; // e.target是找到了鼠标点击事件的DOM元素
		if (btnR === 'hidden') {
			inputR.type = "text";
			e.target.className = "block";
			document.getElementById("blockR").style.display = "block";
		} else if (btnR === 'block') {
			inputR.type = "password";
			e.target.className = "hidden";
			document.getElementById("hiddenR").style.display = "hidden";
		}
	}
	// 找回
	var inputB1 = document.getElementById("back_password1");
	var eyesB1 = document.getElementById("bask_hidden_block1");
	eyesB1.onclick = function(e) {
		var btnB1 = e.target.className; // e.target是找到了鼠标点击事件的DOM元素
		if (btnB1 === 'hidden') {
			inputB1.type = "text";
			e.target.className = "block";
			document.getElementById("block1").style.display = "block";
		} else if (btnB1 === 'block') {
			inputB1.type = "password";
			e.target.className = "hidden";
			document.getElementById("hidden1").style.display = "hidden";
		}
	}
	var inputB2 = document.getElementById("back_password2");
	var eyesB2 = document.getElementById("bask_hidden_block2");
	eyesB2.onclick = function(d) {
		var btnB2 = d.target.className; // e.target是找到了鼠标点击事件的DOM元素
		if (btnB2 === 'hidden') {
			inputB2.type = "text";
			d.target.className = "block";
			document.getElementById("block2").style.display = "block";
		} else if (btnB2 === 'block') {
			inputB2.type = "password";
			d.target.className = "hidden";
			document.getElementById("hidden2").style.display = "hidden";
		}
	}

	// 左侧菜单当前选中
	$("#iframeid").attr("src", "/user/deskindex");
	$("#welcome").html("欢迎使用报税机器人！以下是工作台，主要提供整体报税统计、征期日历、使用流程、温馨提示功能。");
	$('.m_side_menu a').click(function() {
		$('.m_side_menu a').removeClass('j_active');
		$(this).addClass('j_active')
		var action = $(this).attr("action");
		if (action.indexOf("/user/deskindex") != -1) {
			$("#welcome").html("欢迎使用报税机器人！以下是工作台，主要提供整体报税统计、征期日历、使用流程、温馨提示功能。");
		} else if (action.indexOf("/declare/index") != -1) {
			$("#welcome").html('以下是可以进行申报的纳税人列表，在表格内即可填写申报数据，点击纳税人名称可以进入详细数据编辑界面。' /!*+*!/
			/!*'<span style="color:#ea4949;font-size:12px;">数据填写之后，请点击保存按钮保存数据，否则可能造成申报有误</span>'*!/);
			$("#welcome").append("<p>温馨提示：数据填写之后，请点击保存按钮，否则可能造成申报不准。</p>");
		} else if (action.indexOf("/search/declareSearch") != -1) {
			$("#welcome").html("以下是申报结果列表。");
		} else if (action.indexOf("/deductions/index") != -1) {
			$("#welcome").html("以下是一键扣款列表。");
		}
		$("#iframeid").attr("src", action);
	});

	// 计算内容区高度函数调用
	calc_con_h();
	// 窗口发生变化再次计算内容区高度
	$(window).resize(function() {
		calc_con_h();
	});

	$(".swf_min").click(function() {
		external.MinWindow();
	});
	$(".swf_close").click(function() {
		external.CloseWindow();
	});

});
function sidernavkhgl() {
	$('.m_side_menu a').removeClass('j_active');
	$('.m_side_menu a:nth-child(2)').addClass('j_active');
}
function sidernavplsb() {
	$('.m_side_menu a').removeClass('j_active');
	$('.m_side_menu a:nth-child(3)').addClass('j_active');
}
function sidernavyjkk() {
	$('.m_side_menu a').removeClass('j_active');
	$('.m_side_menu a:nth-child(4)').addClass('j_active');
}
// 计算内容区高度函数
function calc_con_h() {
	var win_h = $(window).height(), top_h = $('.m_top').outerHeight(true), content_h = win_h - top_h;
	$('#iframeid,.g_content').css('height', content_h);
}
function logout() {
	window.location.href = "/robot/dropout";
}*/

/* websocket通讯工具 */
function webSocketTool(url) {
	var _this = this;
	_this.websocket = new WebSocket(url);
	_this.websocket.onmessage = function(evt) {
		_this.callback(evt.data);
	};
}
/*定时任务，超时判断*/
webSocketTool.prototype.set_timeout = function(callback) {
	var _this = this;
	if (typeof callback != 'undefined') {/*判断是否传回调，如果没传回调，则不执行计时*/
		_this.timeout_idx = 1;/*重置定时器*/
		_this.timeout_count = 60000;/*超时间隔*/
		_this.timeout_flag = setInterval(function(){/*设置超时定时*/
			if(_this.timeout_idx*1000 >= _this.timeout_count){/*判断是否超时*/
				_this.remove_timeout();/*清理掉定时*/
//				_this.send(JSON.stringify({cmd:8}));/*尝试关闭客户端*/
				callback(0);/*执行超时回调*/
				_this.send(JSON.stringify({cmd:1,action:4,target:1}));/*超时之后跳转到首页*/
			}
			_this.timeout_idx++;
		},1000);
	}
}
/*设置心跳执行方法*/
webSocketTool.prototype.set_heartbeat = function(callback){
	var _this = this;
	if (typeof callback != 'undefined') {/*执行心跳方法*/
		_this.heartbeat_callback = callback;/*重置定时器*/
	}else{
		_this.heartbeat_callback = undefined;/*重置定时器*/
	}
}
/*心跳刷新*/
webSocketTool.prototype.refresh_timeout = function(data){
	var _this = this;
	_this.timeout_idx = 1;/*重置定时器*/
	if (typeof _this.heartbeat_callback != 'undefined') {/*执行心跳方法*/
		_this.heartbeat_callback(data);
	}
}
/*正常执行成功，移除超时*/
webSocketTool.prototype.remove_timeout = function() {
	var _this = this;
	_this.timeout_idx = 1;/*重置定时器*/
	clearInterval(_this.timeout_flag);/*清理掉定时*/
}

/* 回调函数用于分发 */
webSocketTool.prototype.callback = function(data) {
//	debugger;
	var _this = this;
	var obj;
	var result = JSON.parse(data);
	var code = result.code;
	if(code!='100'&&code!='99'){/*如果是结果回调，则关闭定时，即不是99也不是100*/
		_this.remove_timeout();/*尝试关闭超时定时，不一定有*/
	}
	var param = result.data;
	var func = webSocketTool.data[code];
	var funcs = func.split('.');
	// obj = $('#iframeid')[0].contentWindow;/* 初始化第一层iframe */
	// if ($(obj.document).find('#iframeid').length != 0) {/* 如果有，则处理第二层iframe，永远回调当前最小的iframe中的方法，处理到第二层 */
	// 	obj = $(obj.document).find('#iframeid')[0].contentWindow;
	// }
	obj = window;
	for (var i = 0; i < funcs.length; i++) {
		obj = obj[funcs[i]];
	}
	obj(param);
};
webSocketTool.prototype.send = function(msg) {
	this.websocket.send(msg);
};
webSocketTool.prototype.close = function() {
	this.websocket.close();
};
webSocketTool.prototype.state = function() {
	if (this.websocket == null) {
		return 3;
	}
	return this.websocket.readyState;
};
webSocketTool.socket_url = 'ws://127.0.0.1:7681';/* websocket链接，一定是本地的 */
webSocketTool.client_url = 'http://127.0.0.1:8082/js/server/setup.json';/* 服务链接,服务器地址 */
/* url跳转方法 */
webSocketTool.url = {
	'login' : 'http://113.16.167.157:9011/SKServer/index.jsp'
};
webSocketTool.socket;
/* websocket初始化 */
webSocketTool.init = function(callback) {/* 回调函数，0是成功，-1是失败 */
	if (webSocketTool.socket == null || webSocketTool.socket.state() == 3 || webSocketTool.socket.state() == 2) {/* 判断是否已经存在链接，如果不存在，则进行初始化 */
		$('#taxroborUrl').attr('src','taxrobot://config=' + webSocketTool.client_url);/* 通过协议启动客户端 */
		var timeout = 10000, idx = 1, count = 200;
		var initCode = setInterval(function() {/* 尝试启动初始化 */
			if (webSocketTool.socket != null && webSocketTool.socket.state() == 1) {/* 判断链接是否成功，如果成功则执行回调函数，并关掉循环 */
				clearInterval(initCode);
				if (typeof callback != 'undefined') {
					callback(0);
				}
				return;
			}
			if (idx * count % timeout == 0) {/* 如果超过timeout，便停止并执行回调，且传回-1 */
				clearInterval(initCode);
				if (typeof callback != 'undefined') {
					callback(-1);
				}
				return;
			}
			idx++;/* 计时器 */
			if (webSocketTool.socket == null || webSocketTool.socket.state() == 3) {/* 如果链接为空或状态为3，则重建websocket */
				try {/* 捕获掉链接不上的错误 */
					webSocketTool.socket = new webSocketTool(webSocketTool.socket_url);
				} catch (e) {
				}
			}/* 如果socket状态是0或2，则等socket执行完成后，再判断是成功还是重建 */
		}, count);
	}
};
/* 返回值与回调函数对应关系配置 */
webSocketTool.data = {
		'1001' : 'getResult',/* 测试时统一回调方法 */
		'100' : 'webSocketTool.refreshTimeout',/* 执行端心跳回调 */
		'99' : 'webSocketTool.switchCallback',/* 用于登录时确认登录页面加载完成，以便执行方法调用方法，处理首页加载超时问题 */
		'5' : 'declareJsHandler.inertfSuccessResult',
		'6' : 'declareJsHandler.interfFailResult',
		'3' : 'initCateData',
		'4' : 'initFalseCateData',
		'10' : 'loadCa',
		'7' : 'changeChannelResult',
		'8' : 'addCustomers',
		'9' : 'checkgxq',
		'2' : 'loadFalse', /* 用于一键扣款失败返回 */
		'12': 'loadDeclareData',
		'14': 'initGxq',
		'13': 'loadFalseDeclareData',
		'15': 'openFolder',
		'16': 'getFilePath',
		'17': 'getMapJson',
		'66': 'showshenfendata', /*选择用户身份,*/
		'65': 'showyzmm',
		'67': 'showmessage'
};