/*静态工具类，main中websocket链接工具，提供send方法*/
var webSocketTool = webSocketTool || function () {
	
};
/*发送消息，同步方法，不保证发送成功*/
webSocketTool.send = function(msg){
	window.top.webSocketTool.socket.send(msg);
};
/*查看链接状态*/
webSocketTool.state = function(){
	return window.top.webSocketTool.socket.state();
};
/*关闭连接*/
webSocketTool.close = function(){
	window.top.webSocketTool.socket.close();
};
/*重新连接*/
webSocketTool.connector = function(callback){
	window.top.webSocketTool.init(callback);
};
/*设置超时回调*/
webSocketTool.setTimeout = function(callback){
	window.top.webSocketTool.socket.set_timeout(callback);
};
/*刷新超时计时器*/
webSocketTool.refreshTimeout = function(data){
	window.top.webSocketTool.socket.refresh_timeout(data);
}
/*设置心跳函数*/
webSocketTool.setHeartbeat = function(callback){
	window.top.webSocketTool.socket.set_heartbeat(callback);
};

/*是否初始化过*/
webSocketTool.isInit = function(){
	if(window.top.webSocketTool.socket==null){
		return false;
	}else{
		return true;
	}
}
/*关闭连接*/
webSocketTool.getUrl = function(name){
	return window.top.webSocketTool.url[name];
};
/* 
 * 带*为可传可不传
 * cmd:
 * CMD_LOAD_NEW_PAGE = 1 加载新页面
 * CMD_INVOKE_SCRIPT = 2 执行当前页面js
 * ---------------------------------后4个命令监听处理返回参数格式---------------------------------
 * {"code":"6","data":"{}"}
 * CMD_FIND_CASHARER = 3 遍历共享器
 * CMD_SWITCH_CHANNEL = 4 切换频道
 * CMD_GET_CERT = 5 获取当前证书
 * CMD_ENUM_CERT = 6 遍历证书
 * CMD = 8 关闭后台客户端
 * ---------------用于直接调用外壳操作时使用 即cmd是3、4、5、6时需要此参数-------------------------
 * code:*返回调用方法
 * devno:*切换设备号
 * channel:*切换频道号
 * ---------------用于调用server端页面的时使用，即cmd是1、2时需要传此参数-------------------------
 * url:*跳转地址
 * target:*目标窗口 1是隐藏主窗口，2是弹窗
 * action:*加载js类型代码1,2,4,8,16等
 * method:*调用方法
 * data:*调用参数
 * timeout:*超时时间，执行js的等待时间,工具类需要处理超时，目前还没有处理，暂时没用
{
	cmd:4,
	code:6,
	devno:10,
	channel:11
}
{
	cmd:1,
	action:4,
	target:1
}
{
	cmd:2,
	target:1,
	method:'method',
	data:{},
}
 *发送消息，异步方法，保证发送成功，并提供回调，如果是0则执行成功，如果是-1则执行失败
 */
webSocketTool.sendAsync = function(params){
	var msg = {},callback,timeout_callback,heartbeat_callback;
	msg.cmd = params.cmd;
	callback = params.callback;
	if(params.cmd == 1){/*判断命令类型，拼装不同的参数*/
		msg.url = "http://113.16.167.157:9011/SKServer/index.jsp";
		msg.target = params.target;
		msg.action = params.action;
	}else if(params.cmd == 2){
		msg.target = params.target;
		msg.method = params.method;
		msg.data = params.data;
		timeout_callback = params.timeout;/*只有命令是2的时候，即执行js的时候，触发超时机制*/
		heartbeat_callback = params.heartbeat;/*心跳函数*/
	}else if(params.cmd >= 3 && params.cmd <= 10){
			msg.code = params.code;
			msg.devno = params.devno;
			msg.channel = params.channel;
			msg.startchl = params.startchl;
			msg.endchl = params.endchl;
			msg.mobile=params.mobile;
	}else if (params.cmd == 11){
		msg.code = params.code;
		msg.xlsfile = params.xlsfile;
		msg.mapjson = params.mapjson;
	}
	else if(params.cmd == 14){
		msg.code = params.code;
	}
	msg = JSON.stringify(msg);/*转化成字符串*/
	if(webSocketTool.isInit()&&webSocketTool.state()==0){/*如果websocket状态为0，等待其链接，发送请求，如果超过规定时间，则返回超时*/
		var timeout = 10000,idx = 1,count = 200;/*初始化超时参数*/
		var sendCode = setInterval(function(){
			if(idx*count%timeout==0){/*如果超过timeout，便停止并执行回调，且传回-1*/
				clearInterval(sendCode);
				if(typeof callback!='undefined'){
					callback(-1);
				}
				return;
			}
			idx++;/*计时器*/
			if(webSocketTool.state()==1){/*如果状态websocket状态是1，直接发送，调用回调，回调返回值0*/
				clearInterval(sendCode);
				webSocketTool.send(msg);
				if(typeof callback!='undefined'){
					if(typeof heartbeat_callback!='undefined'){/*心跳函数设置*/
						webSocketTool.setHeartbeat(heartbeat_callback);
					}else{
						webSocketTool.setHeartbeat();/*心跳函数清除*/
					}
					callback(0);
					if(typeof timeout_callback !='undefined'){/*判断如果超时回调方法存在，则设置回调计时器*/
						webSocketTool.setTimeout(timeout_callback);/*调用设置超时方法*/
					}
				}
				return;
			}
		},count);
	}else if(webSocketTool.isInit()&&webSocketTool.state()==1){/*如果状态websocket状态是1，直接发送，调用回调，回调返回值0*/
		webSocketTool.send(msg);
		if(typeof callback!='undefined'){
			if(typeof heartbeat_callback!='undefined'){/*心跳函数设置*/
				webSocketTool.setHeartbeat(heartbeat_callback);
			}else{
				webSocketTool.setHeartbeat();/*心跳函数清除*/
			}
			callback(0);
			if(typeof timeout_callback !='undefined'){/*判断如果超时回调方法存在，则设置回调计时器*/
				webSocketTool.setTimeout(timeout_callback);/*调用设置超时方法*/
			}
		}
		return;
	}else{/*如果状态websocket状态是2或3，则链接已断，尝试重新链接*/
		webSocketTool.connector(function(flag){/*调用websocket链接方法，此方法参考main.js，返回0则成功，返回-1则失败*/
			if(flag==-1){/*如果启动失败，回调函数则返回-1*/
				if(typeof callback!='undefined'){
					callback(-1);
				}
				return;
			}
			webSocketTool.send(msg);
			if(typeof callback!='undefined'){
				if(typeof heartbeat_callback!='undefined'){/*心跳函数设置*/
					webSocketTool.setHeartbeat(heartbeat_callback);
				}else{
					webSocketTool.setHeartbeat();/*心跳函数清除*/
				}
				callback(0);
				if(typeof timeout_callback !='undefined'){/*判断如果超时回调方法存在，则设置回调计时器*/
					webSocketTool.setTimeout(timeout_callback);/*调用设置超时方法*/
				}
			}
			return;
		});
	}
};
/*调用跳转并执行时，用于存储临时变量*/
webSocketTool.switchWindowStorage = {};
/*跳转页面并执行方法
 * callback 触发执行后，成功的回调函数（即websocket命令发送成功）
 * timeout  超时后触发的回调函数
 * heartbeat  每次发送心跳需要处理的函数，会把后台参数代入此方法中
 * */
webSocketTool.switchWindowAndRun = function(params){/*callback回调函数参数-1是websocket连不上，-2是首页跳转失败，0是执行成功，timeout是超时触发，触发是参数是-1*/
	/*传入参数存起来，以供触发调用函数使用*/
	webSocketTool.switchWindowStorage = {
		action:params.action,
		target:params.target,
		data:params.data,
		callback:params.callback,
		timeout:params.timeout,
		heartbeat:params.heartbeat
	};
	webSocketTool.sendAsync({/* 打开登录页面 */
		cmd : 1,
		action : params.action,
		target : params.target,
		timeout : params.timeout,
		heartbeat:params.heartbeat,
		callback:function(){/*触发打开方法后，开启定时，记录是否超时*/
			webSocketTool.switchWindowStorage.switchWindowCount = setTimeout(function(){/*触发超时方法*/
				var callback = webSocketTool.switchWindowStorage.callback;
				webSocketTool.switchClear();/*超时后清除存储参数*/
				if(typeof callback!='undefined'){
					callback(-2);/*触发回调，提示调用失败*/
				}
			},20000);
		}
	});
};
webSocketTool.switchCallback = function(){/*页面加载完成调用，如果是登录后的第二个页面触发，由于参数是空，所以不会调用函数*/
	var param = webSocketTool.switchWindowStorage;
	webSocketTool.switchClear();/*调用后清除存储参数*/
	if(param.switchWindowCount!=null){/*收到页面加载完成后的回调后，执行方法调用操作*/
		webSocketTool.sendAsync({/*调用方法*/
			cmd : 2,
			target : param.target,
			method : 'login_plugin.init_auto_login',
			data : param.data,
			callback : param.callback,
			timeout : param.timeout,
			heartbeat : param.heartbeat
		});
	}
};
/*清除所有本次调用数据*/
webSocketTool.switchClear = function(){
	clearTimeout(webSocketTool.switchWindowCount);/*关掉超时计时器*/
	webSocketTool.switchWindowStorage = {};/*去掉之前记录的参数*/
};