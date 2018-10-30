/**
 * 国地税申报信息
 */
var gds_infoMain = (function() {
	var gs_data = new Array();
	var ds_data = new Array();
	var bcu, data,iframe;
	var init = function() {
		bcu = new bstClientUtil();
		data = JSON.parse(bcu.getData('login_config_jtxx'));
	};
	return {
		onload : function() {
			init();
		},
		dsInfo : function(res) {/* 地税信息 */
			setTimeout(function() {
				gds_infoMain.onload();
				if (res != null && res != "") {
					if (res.message.indexOf("查询失败") >= 0 && res.status == 200) {// 每月第一次登陆时候，需点掉提示
						var cur_url = bstClientUtil.list_url;
						bcu.addHttpFilter({/* 监听登录后主页加载完成 */
							url : cur_url,
							callback : 'gds_infoMain.dsInfoTip',
							timeout : 40000
						});
						$($("iframe")[0].contentWindow.document).find("button")[1].click();
					} else {
						bcu.setData('resData', JSON.stringify(res));
						gds_infoMain.dsInfoTip();
					}
				} else {
					bcu.remoteCall(JSON.stringify({
						code : '13',
						data : "网上税务局请求超时！"
					}));
				}
			}, 800);
		},

		dsInfoTip : function(res) {/* 地税信息 */
			setTimeout(function() {
				gds_infoMain.onload();
				if (res == undefined) {
					res = JSON.parse(bcu.getData('resData'));
				}
				if (res != null && res != "") {
					// 设置心跳
					bcu.remoteCall(JSON.stringify({
						code : '100',
						data : {
							"type" : '1',
							'step' : 3,
							'msg' : '地方税费系统登录成功 ！'
						}
					}));
					var caozsj = "";
					if (res.data.byysbListData != undefined) {// 个体户无个人所得税，地税首页可能数据为空
						var byysbList = res.data.byysbListData;
						for (var i = 0; i < byysbList.length; i++) {
							var flag = false;// 参数
							var sbzt_dm = "";
							if (ds_data.length > 0) {
								for (var j = 0; j < ds_data.length; j++) {
									if (byysbList[i].TABLE_ID == ds_data[j].tableId) {
										flag = true;// 有重复税种
										if (byysbList[i].SBZT_DM == "03" || byysbList[i].SBZT_MC.indexOf("未申报") >= 0) {// 申报成功,未申报
											ds_data.splice(j, 1);// 移除重复元素
											if (byysbList[i].SBZT_MC.indexOf("未申报") < 0) {
												caozsj = byysbList[i].LR_SJ;// 操作时间
											}
											if (byysbList[i].SBZT_DM != undefined) {
												sbzt_dm = byysbList[i].SBZT_DM;
											}
											ds_data.push({
												"sbzt_mc" : byysbList[i].SBZT_MC,
												"sbzt_dm" : sbzt_dm,
												"tableId" : byysbList[i].TABLE_ID,
												"skssqq" : byysbList[i].SKSSQQ,
												"skssqz" : byysbList[i].SKSSQZ,
												"jkztMc" : byysbList[i].JKZT_MC,
												"caozsj" : caozsj
											});// 添加申报成功元素
										}
									}
								}
							}
							if (!flag) {// 当有重复税种的时候不走这里
								if (byysbList[i].SBZT_MC.indexOf("未申报") < 0) {
									caozsj = byysbList[i].LR_SJ;// 操作时间
								}
								if (byysbList[i].SBZT_DM != undefined) {
									sbzt_dm = byysbList[i].SBZT_DM;
								}
								ds_data.push({
									"sbzt_mc" : byysbList[i].SBZT_MC,
									"sbzt_dm" : sbzt_dm,
									"tableId" : byysbList[i].TABLE_ID,
									"skssqq" : byysbList[i].SKSSQQ,
									"skssqz" : byysbList[i].SKSSQZ,
									"jkztMc" : byysbList[i].JKZT_MC,
									"caozsj" : caozsj
								});
							}
						}
					} else {
						ds_data = "";
					}
					external.GetSnapshot(data.account, data.company, "地税申报信息");// 截图
					// if(picPath_dssbxx==""){
					// var ref = setInterval(function(){
					// picPath_dssbxx = external.GetSnapshot(data.account,
					// data.company, "地税申报信息");// 截图
					// if(picPath_dssbxx != ""){
					// clearInterval(ref);
					// }
					// },1);
					// }
					bcu.remoteCall(JSON.stringify({
						code : '12',
						data : JSON.stringify({
							"gdsbz" : "D",
							"step" : 1,
							"ds_data" : ds_data
						})
					}));
				} else {
					bcu.remoteCall(JSON.stringify({
						code : '13',
						data : "网上税务局请求超时！"
					}));
				}
			}, 500);
		},
		gsInfo : function(res) {/* 国税申报信息 */
			setTimeout(function() {
				gds_infoMain.onload();
				if (res != null && res != "") {
					bcu.remoteCall(JSON.stringify({ 
						code : '100',
						data : {
							"type" : '0',
							'step' : 3,
							'msg' : ''
						}
					}));
					setTimeout(function() {
						bcu.addHttpFilter({
							url : bstClientUtil.gs_sbjg_url,
							callback : 'gds_infoMain.searchDate',
							timeout : 20000
						});
						// 点击菜单
						var nodeSb = bcu.getNode('hlwsbTreeModule', 'MKXK_MC', '申报结果查询');
						bstClientUtil.prototype.openNode('hlwsbTreeModule', nodeSb);
					}, 2000);
				} else {
					bcu.remoteCall(JSON.stringify({
						code : '13',
						data : '网上税务局请求超时！'
					}));
				}
			}, 500);
		},

		/* 选择日期 */
		searchDate : function(res) {
			setTimeout(function() {
				if (res != "" && res != null) {
					// 获取当前iframe
					iframe = bcu.findFrame();
					bcu.addHttpFilter({
						url : bstClientUtil.gs_sbjg_url,
						callback : 'gds_infoMain.gsSbjg',
						timeout : 20000
					});
					// 填入日期重新查询
					$(iframe.contentWindow.document).find('#RQQ').val(data.rqq);
					$(iframe.contentWindow.document).find('#RQZ').val(data.rqz);
					$(iframe.contentWindow.document).find('#search_dg').click();
				} else {
					bcu.remoteCall(JSON.stringify({
						code : '13',
						data : '网上税务局请求超时！'
					}));
				}
			}, 1000);
		},
		gsSbjg : function(res) {// 国税申报结果查询
			setTimeout(function() {
				if (res != "" && res != null) {
					bcu.remoteCall(JSON.stringify({
						code : '100',
						data : {
							"type" : '0',
							'step' : 3,
							'msg' : '正在获取申报结果'
						}
					}));
					for (var i = 0; i < res.data.length; i++) {
						var sbrq = res.data[i].SBRQ;// 申报日期
						var nsrlxdm = res.data[i].NSRLX_DM;// 纳税人类型代码
						var yzpzxh = res.data[i].YZPZXH;// 凭证序号
						var sbjg_dm = res.data[i].SBJG_DM;// 申报结果代码
						var sbxmmc = res.data[i].SBXMMC;// 申报项目代码
						var sssq_z = res.data[i].SSSQ_Z;// 所属日期止
						var sbjg_ms = res.data[i].SBJG_MS;// 申报结果
						var sssq_q = res.data[i].SSSQ_Q;// 所属日期起
						gs_data.push({
							"sbrq" : sbrq,
							"nsrlxdm" : nsrlxdm,
							"yzpzxh" : yzpzxh,
							"sbjgdm" : sbjg_dm,
							"sbxmmc" : sbxmmc,
							"sssqz" : sssq_z,
							"sbjgms" : sbjg_ms,
							"sssqq" : sssq_q,
							"zspm_dm" : "",
							"kkrq" : "",
							"sjse" : "",
							"sphm" : "",
							"kkjgDm" : ""
						});
					}
					external.GetSnapshot(data.account, data.company, "国税申报结果查询");// 截图
					bcu.addHttpFilter({
						url : bstClientUtil.gs_sbkk_url,
						callback : 'gds_infoMain.searchKkDate',
						timeout : 20000
					});
					// 点击菜单
					var nodeSb = bcu.getNode('hlwsbTreeModule', 'MKXK_MC', '扣款结果查询');
					bstClientUtil.prototype.openNode('hlwsbTreeModule', nodeSb);
				} else {
					bcu.remoteCall(JSON.stringify({
						code : '13',
						data : '网上税务局请求超时！'
					}));
				}
			}, 1000);
		},

		/* 选择日期 */
		searchKkDate : function(res) {
			setTimeout(function() {
				if (res != null && res != "") {
					if (res.code == "1") {
						// 获取当前iframe
						iframe = bcu.findFrame();
						bcu.addHttpFilter({
							url : bstClientUtil.gs_sbkk_url,
							callback : 'gds_infoMain.kkjgcx',
							timeout : 30000
						});
						// 填入日期重新查询
						$(iframe.contentWindow.document).find('#RQQ').val(data.rqq);
						$(iframe.contentWindow.document).find('#RQZ').val(data.rqz);
						$(iframe.contentWindow.document).find('#search_dg').click();
					}
				}
			}, 3000);
		},

		kkjgcx : function(res) {
			setTimeout(function() {
				if (res != "" && res != null) {
					bcu.remoteCall(JSON.stringify({
						code : '100',
						data : {
							"type" : '0',
							'step' : 3,
							'msg' : '正在获取扣款结果'
						}
					}));
					for (var i = 0; i < res.data.length; i++) {
						var zspm_dm = res.data[i].ZSPM_DM;// 征收品目代码
						var kkrq = res.data[i].KKRQ;// 扣款日期
						var sjse = res.data[i].SJSE;// 扣款金额
						var sphm = res.data[i].SPHM;// 税票号码
						var kkjgDm = res.data[i].KKJG_DM;// 扣款结果代码
						var kkjgYzpzxh = res.data[i].YZPZXH;// 凭证序号

						for (var j = 0; j < gs_data.length; j++) {
							// 匹配扣款项目 使用
							if (gs_data[i].yzpzxh == kkjgYzpzxh) {
								gs_data[i].zspm_dm = zspm_dm;
								gs_data[i].kkrq = kkrq;
								gs_data[i].sjse = sjse;
								gs_data[i].sphm = sphm;
								gs_data[i].kkjgDm = kkjgDm;
							}
						}
					}
//					external.GetSnapshot(data.account, data.company, "国税扣款结果查询");// 截图
					var picPath = external.GetSnapshot(data.account, data.company, "国税扣款结果查询");// 截图
					bcu.setData('picPath', picPath);
					bcu.setData('rqdata', JSON.stringify(data));
					bcu.setData('data', JSON.stringify({
						"gdsbz" : "G",
						"step" : 1,
						"gs_data" : gs_data
					}));
					exportExcel.gsInfo();
//					 数据回调
//					 bcu.remoteCall(JSON.stringify({
//					 code : '12',
//					 data : JSON.stringify({
//					 "gdsbz" : "G",
//					 "step" : 1,
//					 "gs_data" : gs_data
//					 })
//					 }));
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
