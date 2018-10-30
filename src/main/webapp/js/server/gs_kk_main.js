//跳转扣款页面
//设置监听
var gs_kkmain = (function(){
	var bcu;
	var init = function(){
		bcu = new bstClientUtil();
	}
	return {
		gs_kkonload:function(){
			init();
		},
		gs_menu:function(res){
			setTimeout(function() {
				var sbTree = $("#hlwsbTreeModule_1_span").html();//申报缴费菜单
				if(sbTree!=null&&sbTree!=""){
					init();
					bcu.remoteCall(JSON.stringify({code:'100',data:{"type":'0','step':2,'msg':'网上税务局地税系统登陆成功！'}}));
					setTimeout(function(){
						bcu.addHttpFilter({
							url:bstClientUtil.gs_kk_url,
							callback:'gs_kkmain.closeTaps',
							timeout:20000
						});
						//点击菜单
						var nodeSb = bcu.getNode('hlwsbTreeModule','MKXK_MC','实时扣款');
						bstClientUtil.prototype.openNode('hlwsbTreeModule',nodeSb);
					},2000);
				}else{
					bcu.remoteCall(JSON.stringify({code:'4',data:'网上税务局请求超时！'}));
				}
			},2000);
		},
		closeTaps:function(res){
			if(res!=null&&res!=""){
				bcu.remoteCall(JSON.stringify({code:'100',data:{"type":'0','step':2,'msg':'网上税务局地税系统登陆成功！'}}));
				/*关闭弹出提示窗口*/
				$('table.ui_border.ui_state_visible.ui_state_focus.ui_state_lock').find('a.ui_close')[0].click();
			}else{
				bcu.remoteCall(JSON.stringify({code:'4',data:'网上税务局请求超时！'}));
			}
		}
	};
}());