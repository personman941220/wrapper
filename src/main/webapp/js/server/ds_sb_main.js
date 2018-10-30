//设置监听
var ds_sblc = (function(){
	var bcu,sb_res;
	var init = function(){
		bcu = new bstClientUtil();
	}
	return {
		onload : function(){
			ds_sblc.init();
			var cur_url = bstClientUtil.ds_main_url;
			bcu.addHttpFilter({/*监听登录后主页加载完成*/
				url:cur_url,
//				callback:'ds_initmain.clickSearch',
				callback:'ds_sblc.clickSearch',
				timeout:40000
			});
			sb_res = JSON.parse(bcu.getData("sb_res"));
			bcu.goMain('ds_main.get_all_data');/*跳转到首页，并开始执行下一个表*/
		},
		clickSearch:function(res){
			if(res!=null&&res!=""){
				init();
				bcu.remoteCall(JSON.stringify({code:'100',data:{"type":'1','step':1,'msg':'进入地方税费系统！'}}));
				setTimeout(function(){
					bcu.addHttpFilter({/*启动监听主页list列表加载*/
						url:bstClientUtil.init['ds_init'].clickSearch_url,
						callback:'ds_sblc.ds_data',
						timeout:20000
					});
					$('h4:eq(0)').find('span:eq(1)').click();/*点击我要办税*/
				},300);
			}else{
				bcu.remoteCall(JSON.stringify({code:'4',data:"网上税务局请求超时！"}));
			}
		},
		ds_data:function(res){
			setTimeout(function(){
				if(res!=null&&res!=""){
					bcu.remoteCall(JSON.stringify({code:'100',data:{"type":"1",'step':1,'msg':'开始获取申报信息'}}));
					var dataUrl = '/webroot/com/neusoft/etax/wlsb/dwhdsbf/dwhdsbf0001.getInfo.svc';
					//截取请求数据
					bcu.addHttpFilter({
						url:dataUrl,
						callback:'ds_sblc.ds_databack',
						timeout:20000
					});
					//单位社会保险费日常申报菜单
					$($("iframe")[0].contentWindow.document).find("#000001004:eq(0)").find('li:eq(0)').click();
				}else{
					bcu.remoteCall(JSON.stringify({code:'4',data:"网上税务局请求超时！"}));
				}
				
			},300);
		},
		ds_databack:function(res){
			setTimeout(function(){
				if(res!=null&&res!=""){
					bcu.remoteCall(JSON.stringify({code:'100',data:{"type":"1",'step':1,'msg':'开始获取申报信息'}}));
					var dataUrl = 'webroot/com/neusoft/etax/recommend/RecommendMenu.collect.svc';
					//截取请求数据
					bcu.addHttpFilter({
						url:dataUrl,
						callback:'ds_sblc.ds_pay',
						timeout:20000
					});
					//判断申报内容信息弹窗是否弹出，若弹出则该用户已申报，未弹出则点击申报按钮
					if($($("iframe")[0].contentWindow.document).find('.modal').css('display') == 'block'){
						$($("iframe")[0].contentWindow.document).find('.modal-footer').find('.btn-primary').click();//关闭弹窗		
					}
					$($("iframe")[0].contentWindow.document).find('.p5').find('#fakesubmit')[0].click();
					$('.placeul').find('li:eq(4)').click();
				}else{
					//返回超时
					bcu.remoteCall(JSON.stringify({code:'4',data:"网上税务局请求超时！"}));
				}
			},500);
		},
		ds_pay:function(res){
			setTimeout(function(){
				if(res!=null&&res!=""){
					bcu.remoteCall(JSON.stringify({code:'100',data:{"type":"1",'step':1,'msg':'开始获取申报缴纳信息'}}));
					var dataUrl = 'webroot/com/neusoft/etax/recommend/RecommendMenu.collect.svc';
					//截取请求数据
					bcu.addHttpFilter({
						url:dataUrl,
						callback:'ds_sblc.ds_kk',
						timeout:20000
					});
					//社会保险申报缴纳
					$($("iframe")[0].contentWindow.document).find("#000001004:eq(0)").find('li:eq(1)').click();
				}else{
					//返回超时
					bcu.remoteCall(JSON.stringify({code:'4',data:"网上税务局请求超时！"}));
				}
			},500);
		},
		ds_kk:function(res){
			setTimeout(function(){
				if(res!=null&&res!=""){
					//判断判断缴款信息弹窗是否弹出，弹出在则说明以缴款，不弹出点击缴款按钮；
					if($($("iframe")[0].contentWindow.document).find('.modal').css('display') == 'block'){
						$($("iframe")[0].contentWindow.document).find('.modal-footer').find('.btn-primary').click();//关闭弹窗	
						sb_res[sb_res.length] = {type:2,id:info.id,msg:'该账户暂无可缴款信息'};//申报结果
					}else{
						console.log('此处需点击缴款按钮');
						sb_res[sb_res.length] = {type:1,id:info.id,msg:'缴款成功'};//申报结果
					}
					var done = {code:5,data:sb_res};
					bcu.remoteCall(JSON.stringify(done));/*返回申报结果*/
				}else{
					//返回超时
					bcu.remoteCall(JSON.stringify({code:'4',data:"网上税务局请求超时！"}));
				}
			},500);
		}
		
//		clickSearch2:function(){
//			bcu.addHttpFilter({/*启动监听主页list列表加载*/
//				url:'/webroot/com/neusoft/etax/recommend/RecommendMenu.collect.svc',
//				callback:'ds_initmain.ds_data2',
//				timeout:10000
//			});
//			$('h4:eq(1)').find('span:eq(1)').click();/*点击我要查询*/
//		},
//		
//		ds_data2:function(){
//			bcu2.addHttpFilter({
//				url:'https://dzswj.ha-l-tax.gov.cn/webroot/com/neusoft/tax/tjwsswj/tjdsweb/zhcx/swdjcx/sfxycx/SfxyQuery.sfxyQuery.svc',
//				callback:'ds_initmain.ds_databack2',
//				timeout:20000
//			});
//			//点击三方协议查询
//			$($("iframe")[0].contentWindow.document).find("#000002002:eq(0)").find('li:eq(4)').click()
//		},
//		ds_databack2:function(res){
//			if(res!=null&&res!=""){
//				//三方协议信息
//				var ds_data = res.data.sfxygrid;
//				var sfxyxx = new Array();
//				if(ds_data!=""&&ds_data!=null){
//					//三方协议 全拼
//					for(var i=0;i<ds_data.length;i++){
//						var sfxyh;
//						if(ds_data[i].SFXYH!=null){
//							sfxyh=ds_data[i].SFXYH;
//						}
//						var khyhhh;
//						if(ds_data[i].KHYHHH!=null){ 
//							khyhhh=ds_data[i].KHYHHH;
//						}
//						var jkzh;
//						if(ds_data[i].JKZH!=null){
//							jkzh=ds_data[i].JKZH;
//						}
//						sfxyxx.push({"sfxyh":sfxyh,"khyhhh":khyhhh,"jkzh":jkzh});
////						sfxyxx.push({"jkzh":jkzh});
//					}
//				}
//				ds_backdata.push({"sfxyxx":sfxyxx});
////				external.RemoteProcedureCall(JSON.stringify({code:'3',data:JSON.stringify(ds_backdata)}));
////				test();
//			}
//		}
	};
}());