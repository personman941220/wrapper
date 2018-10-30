var hebeiInfo = (function(){
	var _this,bcu,type,method,cur_url,code;
	var result={};
	var init = function(){
		_this = login_plugin;
		bcu = new bstClientUtil();
	}
	return {
		onload:function(){
			init();
		},
		sbinfo:function(res){
			setTimeout(function(){//延时加载
				debugger;
				hebei_info.init();
				if(res!=null&&res!=""){
					$('span#0.mini-tools-close').click();
					bcu.addHttpFilter({//监听
						url:' https://ybs.he-n-tax.gov.cn:8888/yhs-web/api/common/query',
						callback:'hebei_info.getSbinfo',//回调方法
						timeout:20000
					});
					$('li#wdbsdt').find('a').click();
				}else{
					bcu.remoteCall(JSON.stringify({code:'4',data:"获取信息请求超时！"}));
				}
			},300);
		},
		
		getSbinfo:function(res){//申报结果获取回调
			result.sbinfo=res.value;
			setTimeout(function(){//延时加载
				if(res!=null&&res!=""){
					function getContext(){
						var text="";
						//获取标签元素拼接
						$('.context-box .common .todoLi sbLi span').each(function(){
							text+=$(this).html()+",";
						});
						return text;
					}
				}else{
					bcu.remoteCall(JSON.stringify({code:'4',data:"获取信息请求超时！"}));
				}
			},300);
		}
	}
}