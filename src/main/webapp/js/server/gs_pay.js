/**
 * 国税实时扣款
 */
var gsPay = (function() {
	var bcu, data, resData, iframe, rqdata, _this, picPath, path;
	var dataNum = 0;
	var init = function() {
		_this = gsPay();
		bcu = new bstClientUtil();
	};
	return {
		onload : function() {
			init();
		},
		gsMain : function() {/* 国税首页 */
			exportExcel.onload();
			var gsurl = '/hlwsb/sbkk/getNsrlx.do';
			bcu.addHttpFilter({
				url : gsurl,
				callback : 'gsPay.gsSbjk',
				timeout : 20000
			});
			// 点击菜单
			var nodeSb = bcu.getNode('hlwsbTreeModule', 'MKXK_MC', '实时扣款');
			bstClientUtil.prototype.openNode('hlwsbTreeModule', nodeSb);
		},

		gsSbjk : function(res) {// 国税申报缴款
			setTimeout(function() {
				if (res != "" && res != null) {
					bcu.remoteCall(JSON.stringify({
						code : '100',
						data : {
							"type" : '0',
							'step' : 3,
							'msg' : ''
						}
					}));
					/*关闭弹出提示窗口*/
					$('table.ui_border.ui_state_visible.ui_state_focus.ui_state_lock').find('a.ui_close')[0].click();
					iframe = bcu.findFrame();
//					var nsrlxDmArray = $($("iframe")[9].contentWindow.document).find("#tbList").find('tr');
					var nsrlxDmArray = $(iframe.contentWindow.document).find("#tbList").find('tr');
					for(var i = 0; i < res.data.length; i++){
						res.data[i].NSRLX_DM;
						for(var j = 0; j < nsrlxDmArray.length; j++){
							if(nsrlxDmArray[j].innerText.indexOf(res.data[i].NSRLX_DM)){//匹配税种
								//选中要实施扣款的项
								$(iframe.contentWindow.document).find("#tbList").find('tr:eq('+j+')').find("input[class='mmg-check']").click();
								return;
							}
//							if(res.data[i].NSRLX_DM==nsrlxDmArray[j].innerText){//匹配税种
//								//选中要实施扣款的项
//								$($("iframe")[7].contentWindow.document).find("#tbList").find('tr:eq('+j+')').find("input[class='mmg-check']").click()
//							}
						}
					}
					//点击实施扣款按钮
					$(iframe.contentWindow.document).find("#kkButton");
					
				} else {
					bcu.remoteCall(JSON.stringify({
						code : '13',
						data : '网上税务局请求超时！'
					}));
				}
			}, 1000);
		}
	};
}());
