
function caodan(param_in){
    //var param_in = $("#param_in").val();
	if(param_in==""||param_in==null){
		layer.msg("参数为空");
		return;
	}
	webSocketTool.init();
	// webSocketTool.socket.websocket.send(JSON.stringify({cmd : 1,action : 2,target : 1,url:'http://jcpt.ha-n-tax.gov.cn/web/ythclient/wsbs.html'}))
	// webSocketTool.socket.websocket.send(param_in)
	switchWindowAndRun(param_in);
}

function getResult(data,preStr) {
	$("#res_out").val(preStr+JSON.stringify(data));
}

function switchWindowAndRun(param){
    param = eval('('+param+')');
    console.log(param);
	webSocketTool.switchWindowAndRun({
		action:param.action,/*申报地税标志*/
		target:param.target,
		data:param.data,
		callback:function(data){
			getResult(data,"返回：");
		},
		heartbeat:function(data){
			getResult(data,"心跳返回：");
		},
		timeout:function(){
			$("#res_out").val("超时");
		}
	});
}

function initFalseCateData(param) {
	//debugger;
	if (param.indexOf("用户名或密码错误") != -1) {
		$("#dszt").val(param.split("，", 1));
	} else {
		$("#dszt").val(param);
	}
	if (flg == 1 || y == 1) {//快速登录 
		setTimeout(function() {
			layer.msg(param);
		}, 500);
		layer.closeAll('loading');

	}
//	if (z == 1) {// 批量初始化返回错误

//	if (t==2) {//使用共享器
//	$("#cusxx").append("<p>"+trDatas.name+"初始化时"+param+"</p>");
//	}else{
//	$("#cusxx").append("<p>"+trDatas[a].name+"初始化时"+param+"</p>");
//	}
//	$.ajax({// 通过ID修改初始化失败记录
//	url : '/customer/updataCusById',
//	data : {
//	id : id,
//	mes : $("#dszt").val()
//	},
//	type : 'post',
//	success : function(data) {

//	}
//	});
//	idx++;
//	guidesJsHandler.plInitCate();
//	}
}


function showyzmm(param) {
	//debugger;
	layer.open({
		/*type : 1,
		area : ['400px','100px'], //宽度
		content : param,
		title : '验证',
		shadeClose:true,//点击阴影关闭
		//点关闭按钮，退出登录
		cancel: function(index){
			layer.close(index);
		}*/
		title: '验证',
		shadeClose: false, // 点击遮罩关闭层
		area: ['400px','150px'],
		content: param,
		btn: ['提交'],
		yes: function(index, layero) {
			layer.close(index);
			debugger;
			var yam = $("#captchCode").val();
			var sf = $("input[name=nsrsbh]").val();
			var password = $("input[name=gsmm]").val();
			yanzhengma(yam,sf,password);
		},
	});
}

function showshenfendata(param) {
	layer.open({
		/*type : 1,
		area : '600px', //宽度
		content : param,
		title : '选择办税人身份',
		shadeClose:true,//点击阴影关闭
		//点关闭按钮，退出登录
		cancel: function(index){
			layer.close(index);
		}*/
		title: '选择身份',
		shadeClose: false, // 点击遮罩关闭层
		area: ['400px','200px'],
		content: param,
		btn: ['确定进入'],
		yes: function(index, layero) {
			layer.close(index);
			var checkedone=1;
			debugger;
			var xzsf = document.getElementsByName('xzsf');

			var s2 = $("input[name='xzsf']:checked").val();
			checkedone = s2
			/*for(var ik=0,ij=xzsf.length;ik<ij;ik++){
				if(xzsf[ik].checked=="true"){
					checkedone=ik;
					break;
				}
			}*/
			xuanshenfen(checkedone);
		},
	});
}
function showmessage(param) {
	layer.msg(param);
}

function yanzhengma(yam,sf,password) {
	debugger;
	var data = {
			yam : yam,
			sf : sf,
			password : password
	};
	webSocketTool.sendAsync({
		cmd:2,
		target:1,
		method:'login_plugin.login_dl',
		data:data,
		callback:function(){
			//layer.closeAll();
		}
	});
}
function xuanshenfen(checkedone) {
	debugger;
	var data = {
			type : checkedone
	};
	webSocketTool.sendAsync({
		cmd:2,
		target:1,
		method:'login_plugin.login_sf',
		data:data,
		callback:function(){
			layer.closeAll();
		}
	});
}
