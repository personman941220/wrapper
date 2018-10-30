//跳转扣款页面
//设置监听
var ds_kkmain = (function(){
	var _this,bcu;
	var init = function(){
		_this = ds_kkmain;
		bcu = new bstClientUtil();
	}
	return {
		ds_kkonload:function(){
			init();
		},
		ds_menu:function(res){
			ds_kkmain.ds_kkonload();
			//判断页面是否加载完成
			if(res!=null&&res!=""){
				//设置心跳
				bcu.remoteCall(JSON.stringify({code:'100',data:{"type":'1','step':2,'msg':'网上税务局地税系统登陆成功！'}}));
				var iframe = $("iframe")[0].contentWindow.document;
				var div = $(iframe).find(".modal").find(".modal-body");/*获取弹框div，以便获取提示语*/
				if(div.length>0&&div[0].outerText.indexOf("初始化")>0){
					$(iframe).find(".modal").find(".btn-primary").click();/*尝试加载列表页*/
				}
				_this.clickPay();
			}else{
				bcu.remoteCall(JSON.stringify({code:'4',data:"网上税务局请求超时！"}));
			}
		},
		clickPay:function(){
			bcu.addHttpFilter({/*启动监听主页list列表加载*/
				url:bstClientUtil.init['ds_init'].dskk_url,
				callback:'ds_kkmain.ds_kkdata',
				timeout:60000
			});
			$('h4:eq(0)').find('span:eq(1)').click();/*点击我要办税*/
		},
		ds_kkdata:function(res){
			if(res!=""&&res!=null){
				bcu.remoteCall(JSON.stringify({code:'100',data:{"type":'1','step':2,'msg':'我要办税！'}}));
				//点击申报表报送及缴款
				$($("iframe")[0].contentWindow.document).find("#000001003:eq(0)").find('li:eq(0)').click()
			}else{
				bcu.remoteCall(JSON.stringify({code:'4',data:"网上税务局请求超时！"}));
			}
		}
	};
}());