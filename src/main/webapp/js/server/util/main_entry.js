var flag = true;
function mainEntry(params){
	//debugger;
	if(params==true||params==false){
		flag = params;
	}
	if(flag){
		var res = null;
		if(typeof params == "string"){
			res = JSON.parse(params);
		}else{
			res = params;
		}
		var method = res.method;
		var data = res.data;
		if(method!=null){
			var calls = method.split('.');
			var obj = window;
			for(var i = 0;i<calls.length;i++){
				obj = obj[calls[i]];
			}
			obj(data);
		}
	}
}

/*调用websocket方法*/
bstClientUtil.prototype.remoteCall = function(param){
	external.RemoteProcedureCall(param);
}

/*
 * 0是国税，1是地税
mainEntry('{"method":"ds_login.ds_auto_login","data":{"nsrsbh":"91410523798233259Q","password":"Abcd1234","data":[{"id":"GHJF0001"},{"id":"SBGF0005"},{"id":"YHS0001"},{"id":"GS0001"}]}}');
{
	"method":"login_plugin.init_auto_login",
	"data":{
		"type":0,
		"method":"",
		"nsrsbh":"91410523798233259Q",
		"password":"Abcd1234",
		"data":[{
			"id":"GHJF0001"
		},{
			"id":"SBGF0005"
		},{
			"id":"YHS0001"
		},{
			"id":"GS0001"
		}]
	}
}
new bstClientUtil().remoteCall('{"code":"5","data":[{"type":1,"id":"1234","msg":""},{"type":2,"id":"1234","msg":"表申报错误信息"}]}')
{
	"code":"5",
	"data":[{
		"type":1,
		"id":"1234",
		"msg":""
	},{
		"type":2,
		"id":"1234",
		"msg":"表申报错误信息"
	}]
}
new bstClientUtil().remoteCall('{"code":"6","data":"超时"}')
{
	"code":"6",
	"data":"超时"
}
*/