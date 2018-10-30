var hebei_main = (function(){
	var _this,bcu,type,method,cur_url,code,array;
	var init = function(){
		bcu = new bstClientUtil();
	}
	var szxxall = [];
	return {
		onload:function(){
			init();
		},
		login_hebei:function(res){
			init();
			szxxall[0] = res;
		},
		data_hebei:function(res){
			setTimeout(function(){//延时加载
				hebei_main.onload();
				debugger;
				if(res!=null&&res!=""){
					$('span#0.mini-tools-close').click();
					bcu.addHttpFilter({//监听
						url:' https://ybs.he-n-tax.gov.cn:8888/yhs-web/api/common/query',
						callback:'hebei_main.getNsrjbxx',//回调方法
						timeout:20000
					});
					$('div.user-info').find('a').click();
				}else{
					bcu.remoteCall(JSON.stringify({code:'4',data:"获取纳税人基本信息请求超时！"}));
				}
			},300);
		},
		
		getNsrjbxx:function(res){//获取纳税人基本信息回调
			array[array.length]=res.value;
			bcu.addHttpFilter({//监听
				url:' https://ybs.he-n-tax.gov.cn:8888/yhs-web/api/common/query',
				callback:'hebei_main.sfzxx',//回调方法
				timeout:20000
			});
			//
			$($("iframe")[0].contentWindow.document).find('ul.second-menu.second-menu-swdj').find('li').click();
		},
		sfzxx : function(res){
			
			array[array.length]=res.value;
			
			external.RemoteProcedureCall(JSON.stringify({
			code : '3', 
			data : array
		}));
		}
	}
}());


//重写（点击链接发请求，返回回来有数据弹出提示框，点击确定后，再打开对应的窗口）
function clickHref(url,code,isValidate){
    if(url.indexOf('gds/dssbIndex.html')>-1){
        var dsNsrState = store.getSession('dsNsrxxErr');
        var sfzData = store.getSession('ds_' + code);
        var arr = ['3386', '33G5', '33G7', '3358','33G3','3356','3357'];
        if(arr.indexOf(code) == -1){
            if(dsNsrState){
                mini.alert('您的纳税人基础信息不符或者不完整，请到税务机关办税服务厅进行维护！','提示');
                return false;
            }
            else if(!sfzData){
                //mini.alert('您不需要申报此报表，如您确实需要，请联系主管税务机关！','提示');
                mini.alert('若需办理此业务，请暂时先到办税服务厅办理，给您带来的不便，敬请谅解！','提示');
                return false;
            }
        }
    }
	var datetime = Date.parse(new Date());
	if(url.indexOf("?")>-1){
		url += "&_t="+datetime;
	}else{
		url += "?_t="+datetime;
	}
	// 车购税带参数 sh swjgdm
	//if(code==='10438'){ 10438 和申报种类代码 冲突，改成 cgs
	if(code==='cgs'){
	    var NsrxxVO = getNsrxxVO()||{};
        url +='&sh=' + NsrxxVO.nsrsbh + '&swjg_dm=' + NsrxxVO.zgswjDm;
    }

	//window.open(url);
	window.location.href(url);
}

                                                

/*
 * c.getNode('hlwsbTreeModule','MKXK_MC','网上申报','申报、实时扣款')
 * openNode('hlwsbTreeModule',a)
 * /hlwsb/sbkk/tsxCheck.do
 * $(iframeObj.contentWindow.document.body).find("#tbList tr")
 * 	$(iframe.contentWindow.document.body).find("#tbList tr").each(function(j){
		$(this).find('td span').find("input[type=checkbox]").click();
	})
 * iframeObj.contentWindow['sb'].onToolbarClick(1);
 * 
 * 
 * */