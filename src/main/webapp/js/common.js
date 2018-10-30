var secure = null;	// 权限参数
var page = 1;	// 默认页面
var dialog = null;
//alert("ok");
 
 

$(function() {
	//alert(moduleCode);
 
	if(  moduleCode >= 0)
		findMenu(moduleCode, initFun);
	$('td.table-val').css('padding','5px');
	$('input.date-before').on('click', function(){
		WdatePicker({maxDate:'%y-%M-{%d}'});
	});
	$('input.date-after').on('click', function(){
		WdatePicker({minDate:'%y-%M-{%d}'});
	});
	$('input.date').on('click', function(){
		WdatePicker();
	});
});

/*
 * 获取权限信息, 传入模块编号及回调函数
 *  [K]
 */
function findModuleParameter(moduleCode, initFun) {
	//alert("findModuleParameter");
	if(!moduleCode) return;
	$.getJSON('mgr/findModuleParameter', {moduleCode : moduleCode}, function(data){
		if(!$.isSuccess(data)) return;
		$('a.acctInfo').append(data.body.acctount);
		secure = data.body;
		if(!secure.find){
			$('div.main').remove();	// 删除页面主要元素
			BootstrapDialog.msg("非法操作, 你没有当前页面的权限!", BootstrapDialog.TYPE_DANGER);
			return;
		}
		$('div.main').removeClass('hide');
		if("0" != moduleCode){
			var obj = $('ol.breadcrumb').empty();
			obj.append($("<li></li>").append(data.body.superModuleName));
			obj.append($("<li ckass='active'></li>").append(data.body.moduleName));
			$('.navbar-nav').find('.dropdown[name='+data.body.code+']').addClass('active');
			$('title').text("档案管理系统| "+data.body.moduleName + ' - ' + data.body.superModuleName+" [档案管理系统]");
		}
		initFun();
	});
}
/*
 * 退出登录
 *  [K]
 */
function exit(){
	BootstrapDialog.confirm("请确认是是否需要注销登录!", function(result){
		if(!result) return;
		BootstrapDialog.show({
			title : "加载中",
			closable : false,
			message: "正在加载, 请稍等..."
	    });
		$.getJSON('mgr/exit', function(data){
			if(!$.isSuccess(data)) return;
			window.location.href="./login.html"; 
		});
	});
}
/*
 * 根据当前帐号的权限获取导航菜单
 *  [K]
 */
function findMenu(moduleCode, initFun) {
	//alert("ok");

	$.getJSON("lists/findMenu.do", function(data) {
		//alert("ok");
		
		if(!$.isSuccess(data))
			return;
		
		var nav = $('ul#nav-box-ul').empty();
 		
		$.each(data.body, function(i, v) {
			if(v.modulelevel=='0'){
				//alert(v.modulecode);
			 
				/*原版菜单
				 $('<li> </li>')
					.append(
							$("<a class=\"withripple hover\" href=\"javascript:;\"></a>")
							.append("<i class=\"icon icon-article\"></i><span class=\"sidespan\">"+v.modulename+"</span><i class=\"iright pull-right\">&gt;</i>")
					)
					.append(analyzeMenu(v.modulecode, data.body))
					.appendTo(nav);
				*/	
				/*
				 <li>
				 <a class="withripple hover" href="javascript:;">
				 <i class="icon icon-article"></i><span class="sidespan">订单管理</span><i class="iright pull-right">&gt;</i>
				 </a>
                    <ul class="sidebar-dropdown">
                        <li><a onclick="loadtab('voucherlist')" href="javascript:void(0)" id="voucherlist" class="withripple" target="myframe">订单信息</a></li>
                    </ul>
                </li>
				 */
				 $('<li class="nav-item"></li>')
					.append(
							$("<a href=\"javascript:;\"></a>")
							.append("<i class=\"my-icon nav-icon icon_1\"></i><span><b>"+v.modulename+"</b></span><i class=\"my-icon nav-more\">")
					)
					.append(analyzeMenu(v.modulecode, data.body))
					.appendTo(nav);
				 /*
				<li class="nav-item">
                <a href="javascript:;"><i class="my-icon nav-icon icon_1"></i><span>网站配置</span><i class="my-icon nav-more"></i></a>
                <ul>
                    <li><a href="javascript:;"><span>网站设置</span></a></li>
                    <li><a href="javascript:;"><span>友情链接</span></a></li>
                    <li><a href="javascript:;"><span>分类管理</span></a></li>
                    <li><a href="javascript:;"><span>系统日志</span></a></li>
                </ul>
            </li>*/
			
				 
			}
			
		}
	
		);
		//findModuleParameter(moduleCode, initFun);
		
	});
}


/*
 * 获取面包绡
 *  [K]
 */
function findBreadcrumb(){
	$.post('mgr/findBreadcrumb', {moduleCode : moduleCode}, function(data){
		var obj = $('ol.breadcrumb').empty();
		obj.append($("<li></li>").append(data.body.superName));
		obj.append($("<li ckass='active'></li>").append(data.body.name));
		$('title').text(data.body.name + ' - ' + data.body.superName);
		$('.navbar-nav').find('.dropdown[name='+data.body.code+']').addClass('active');
	}, 'json');
}
/*
 * 最佳面包绡
 *  [K]
 */
function addBreadcrumb(msg){
	$('ol.breadcrumb').find('.active').removeClass('active');
	$('ol.breadcrumb').append($("<li class='active'></li>").append(msg));
}
/*
 * 解析导航菜单
 *  [K]
 */
function analyzeMenu(code, data){
	
 
	var ul = '';
	/* 旧版菜单
	ul += "<ul class=\"sidebar-dropdown\">";
	$.each(data, function(i,v){
	
		if(v.modulesupercode == code) {
			//alert (v.modulesupercode);
			ul += "<li> <a onclick=\"loadtab('"+v.modulepage+"')\" href=\"javascript:void(0)\" id=\"voucherlist\" class=\"withripple\" target=\"myframe\">"+v.modulename+"</a></li>"; 
			//alert (ul);
		}
	});
	ul += "</ul>";
	*/
	ul += "<ul>";
	$.each(data, function(i,v){
 
		if(v.modulesupercode == code) {
 			ul += " <li><a onclick=\"loadtab('"+v.modulename+"','"+v.modulepage+"')\" href=\"javascript:;\"><span><b>"+v.modulename+"</b></span></a></li>"; 
 		}
	});
	ul += "</ul>";
	/*
	 * 
	 * <ul>
                    <li><a href="javascript:;"><span>网站设置</span></a></li>
             
                </ul>
	 * 
	 * */
  // alert (ul);
	return ul;
}
BootstrapDialog.confirm = function(message, callback) {new BootstrapDialog({
        title: '提示信息',
        message: message,
        closable: false,
        data: {'callback': callback},
        buttons: [{
	        label: '取消',
	        action: function(dialog) {
	        	// 容易理解的写法 if(typeof dialog.getData('callback') === 'function') dialog.getData('callback')(false); // or callback(false);
	            typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(false);
	            dialog.close();
	        }
	    }, {
	        label: '确定',
	        cssClass: 'btn-primary',
	        action: function(dialog) {
	            typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(true);
	            dialog.close();
	        }
	    }]
    }).open();
};
BootstrapDialog.alert = function(message, type){
	new BootstrapDialog({
		title : '提示信息',
		message : message,
		type : type,
		closeabled : true,
		buttons: [{label: '关闭',action: function(dialog) {dialog.close();}}]
	}).open();
};
BootstrapDialog.msg = function(message, type){
	new BootstrapDialog({
		title : '提示信息',
		message : message, 
		type : type,
		closeabled : false,
		backdrop : 'static'
	}).open();
};
BootstrapDialog.isSubmitted = function(){
	return BootstrapDialog.show({
		title : "正在提交",
		closable : false,
		message: "请稍等, 正在提交请求!"
    });
};
BootstrapDialog.loading = function(){
	return BootstrapDialog.show({
		title : "加载中",
		closable : false,
		message: "正在加载, 请稍等..."
    });
};
BootstrapDialog.hideModel = function(eml){
	eml.modal('hide');
};
BootstrapDialog.showModel = function(eml){
	eml.modal({backdrop : 'static', keyboard : false}).modal('show');
};
(function($) {
	// 获取传递的参数
	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	};
	// 获取项目根路径
	$.getRootPath = function(){
	    var curWwwPath=window.document.location.href; // 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	    var pathName=window.document.location.pathname; // 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	    var pos=curWwwPath.indexOf(pathName);
	    var localhostPaht=curWwwPath.substring(0,pos); // 获取主机地址，如： http://localhost:8083
	    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1); // 获取带"/"的项目名，如：/uimcardprj
	    return(localhostPaht+projectName);
	};
	// 删除空格
	$.removeTrim = function(str){
		return str.replace(/^\s+|\s+$/g,"");
	};
	// 分页插件
	$.analysisPage = function(data){
		$("#pagination ul").empty();
		if(data.totalPage < 2){
			$('nav#pagination').hide();
			return;
		}
		$("#pagination").pagy({
			totalPages: data.totalPage,
			currentPage: data.nowPage,
			innerWindow: 3,
			page : function(clickPage) {
				page = clickPage;
				if(page == data.nowPage) return false;
				dialog = BootstrapDialog.loading();
				findListInfo();
				return true;
			}
		});
	};
	$.isSubmit = true;	// 是否可提交
	$.verifyForm = function(eml, isEmpty){
		//alert('empty1');
		eml.removeClass('empty');
		if(!isEmpty) return eml.val();
		var val = eml.val();
		if(val < 1 || val.length < 1){
			$.isSubmit = false;
			eml.addClass('empty');
			//alert('empty2');
		}
		return val;
	};
	$.findChecked = function(val){
		return val ? " checked=true " : "" ;
	};
	$.findOpeion = function(id, current){
		return id == current ? " selected=true " : "" ;
	};
	// 点击搜索按钮, 弹出正在加载窗口, 调用findListInfo(); 函数获取列表数据!
	$.search = function(){
		dialog = BootstrapDialog.loading();
		findListInfo();
	};
	// 判断返回数据的JSON头是成功还是失败
	$.isSuccess = function(data) {
		if(data.head) return data.head;
		if(!data.body) return;
		//alert(data.body);
		if((data.body == 'PERMISSION_DENIED' || data.body == 'UNLOGIN') /*&& dialog != null*/){
			
			//alert(data.body);
			//dialog.close();
			
			if(data.body == 'UNLOGIN'){
				BootstrapDialog.show({
					title : "错误！",
					type : BootstrapDialog.TYPE_DANGER,
					message : "您尚未登录",
					 buttons : [{
						      label : "登录系统",
						      message : "请登录系统",
						      action : function(dialog){   //给当前按钮添加点击事件
						        dialog.close();
						        window.location.href="./login.html";
						      }
						    }
						  ]
						    
				});
				return;
			}
		}
		BootstrapDialog.show({
			title : "错误",
			type : BootstrapDialog.TYPE_DANGER,
			message : data.body
		});
		return data.head;
	};
})(jQuery);


