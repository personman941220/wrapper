//设置监听
var ds_initmain = (function(){
	var ds_backdata = new Array();
	var bcu;
	var init = function(){
		bcu = new bstClientUtil();
	}
	return {
		clickSearch:function(res){
			init();
			bcu.remoteCall(JSON.stringify({code:'100',data:{"type":'1','step':1,'msg':'进入地方税费系统！'}}));
			if(res!=null&&res!=""){
				setTimeout(function(){
					bcu.addHttpFilter({/*启动监听主页list列表加载*/
						url:bstClientUtil.init['ds_init'].clickSearch_url,
						callback:'ds_initmain.ds_data',
						timeout:20000
					});
					$('h4:eq(1)').find('span:eq(1)').click();/*点击我要查询*/
				},300);
			}else{
				bcu.remoteCall(JSON.stringify({code:'4',data:"网上税务局请求超时！"}));
			}
		},
		ds_data:function(res){
			setTimeout(function(){
				if(res!=null&&res!=""){
					bcu.remoteCall(JSON.stringify({code:'100',data:{"type":"1",'step':1,'msg':'开始获取申报信息'}}));
					//截取请求数据
					bcu.addHttpFilter({
						url:bstClientUtil.init['ds_init'].data_url,
						callback:'ds_initmain.ds_databack',
						timeout:20000
					});
					//点击税费种认定菜单
					$($("iframe")[0].contentWindow.document).find("#000002002:eq(0)").find('li:eq(0)').click();
				}else{
					bcu.remoteCall(JSON.stringify({code:'4',data:"网上税务局请求超时！"}));
				}
			},300);
		},
		ds_databack:function(res){
			setTimeout(function(){
				if(res!=""&&res!=null){
					bcu.remoteCall(JSON.stringify({code:'100',data:{"type":"1",'step':1}}));
					//税费种信息 字段名全拼
					var sfzrdxx = res.data.sfzrdxxData;
					var sfzrdxxback = new Array();
					if(sfzrdxx!=null&&sfzrdxx!=""){
						for(var i=0;i<sfzrdxx.length;i++){
							if(sfzrdxx[i].rdyxqz>bcu.getDate()){
								var zsxmmc = sfzrdxx[i].zsxmmc;
								var zspmmc = sfzrdxx[i].zspmmc;
								var rdyxqq = sfzrdxx[i].rdyxqq;
								var rdyxqz = sfzrdxx[i].rdyxqz;
								var nsqxmc = sfzrdxx[i].nsqxmc;
								var zsxmDm = sfzrdxx[i].zsxmDm;
								var zspmDm = sfzrdxx[i].zspmDm;
								sfzrdxxback.push({"zsxmdm":zsxmDm,"zsxmmc":zsxmmc,"zspmdm":zspmDm,"zspmmc":zspmmc,"rdyxqq":rdyxqq,"rdyxqz":rdyxqz,"nsqxmc":nsqxmc});
							}
						}
					}
					ds_backdata.push({gdsbz:"D",'step':1,"sfzrd":sfzrdxxback});
					bcu.remoteCall(JSON.stringify({code:'3',data:ds_backdata}));
					//三方协议→点击我要查询
//					_this.clickSearch2();
				}else{
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