/**
 * 国地税申报之后申报结果信息获取
 */
var gds_sbinfoMain = (function() {
	var gs_data = new Array();
	var ds_data = new Array();
	var sb_res = [];
	var bcu, data, picPath_wssb, picPath_kkjg, picPath_dssbxx, done;
	var init = function() {
		bcu = new bstClientUtil();
		data = JSON.parse(bcu.getData('login_config_jtxx'));
	};
	return {
		onload : function() {
			init();
		},

		dsOnload : function() {
			gds_sbinfoMain.onload();
			bcu.goMain('gds_sbinfoMain.dsInfo');/* 跳转到首页，并开始执行申报结果获取 */
		},

		dsInfo : function(res) {/* 地税信息 */
			setTimeout(function() {
				gds_sbinfoMain.onload();
				if (res != "" && res != null) {
					// 设置心跳
					bcu.remoteCall(JSON.stringify({
						code : '100',
						data : {
							"type" : '1',
							'step' : 3,
							'msg' : '正在获取申报结果'
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
					picPath_dssbxx = external.GetSnapshot(data.account, data.company, "地税申报信息");// 截图
					if (picPath_dssbxx == "") {
						var ref = setInterval(function() {
							picPath_dssbxx = external.GetSnapshot(data.account, data.company, "地税申报信息");// 截图
							if (picPath_dssbxx != "") {
								clearInterval(ref);
							}
						}, 1000);
					}
					sb_res = JSON.parse(bcu.getData('sb_res'));
					// 申报结果获取
					sb_res[sb_res.length] = {
						"gdsbz" : "D",
						"step" : 1,
						"picPath_dssbxx" : picPath_dssbxx,
						"ds_data" : ds_data
					};
					var done = {
						code : 5,
						data : sb_res
					};
					bcu.remoteCall(JSON.stringify(done));/* 返回申报结果 */
				} else {
					bcu.setData('sbjg_data', "申报结果获取超时");/* 记录跳转后执行的方法 */
				}
			}, 500);
		},

		gsInfo : function() {/* 国税申报信息 */
			setTimeout(function() {
				gds_sbinfoMain.onload();
				bcu.remoteCall(JSON.stringify({
					code : '100',
					data : {
						"type" : '0',
						'step' : 3,
						'msg' : '正在获取申报结果'
					}
				}));
				setTimeout(function() {
					bcu.addHttpFilter({
						url : bstClientUtil.gs_sbjg_url,
						callback : 'gds_sbinfoMain.gsSbjg',
						timeout : 20000
					});
					// 点击菜单
					var nodeSb = bcu.getNode('hlwsbTreeModule', 'MKXK_MC', '申报结果查询');
					bstClientUtil.prototype.openNode('hlwsbTreeModule', nodeSb);
				}, 2000);
			}, 500);
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
					picPath_wssb = external.GetSnapshot(data.account, data.company, "国税申报结果查询");// 截图
					bcu.addHttpFilter({
						url : bstClientUtil.gs_sbkk_url,
						callback : 'gds_sbinfoMain.kkjgcx',
						timeout : 20000
					});
					// 点击菜单
					var nodeSb = bcu.getNode('hlwsbTreeModule', 'MKXK_MC', '扣款结果查询');
					bstClientUtil.prototype.openNode('hlwsbTreeModule', nodeSb);
				} else {
					// 申报结果获取超时
					sb_res = JSON.parse(bcu.getData('sb_res'));
					sb_res[sb_res.length] = '申报结果获取超时';
					done = {
						code : 5,
						data : sb_res
					};
					bcu.remoteCall(JSON.stringify(done));/* 返回申报结果 */
				}
			}, 1000);
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
					picPath_kkjg = external.GetSnapshot(data.account, data.company, "国税扣款结果查询");// 截图
					// 数据回调
					sb_res = JSON.parse(bcu.getData('sb_res'));
					sb_res[sb_res.length] = {
						"gdsbz" : "G",
						"step" : 1,
						"picPath_wssb" : picPath_wssb,
						"picPath_kkjg" : picPath_kkjg,
						"gs_data" : gs_data
					};
					done = {
						code : 5,
						data : sb_res
					};
					bcu.remoteCall(JSON.stringify(done));/* 返回申报结果 */

				} else {
					// 申报结果获取超时
					sb_res = JSON.parse(bcu.getData('sb_res'));
					sb_res[sb_res.length] = '申报结果获取超时';
					done = {
						code : 5,
						data : sb_res
					};
					bcu.remoteCall(JSON.stringify(done));/*返回申报结果*/
				}
			}, 1000);
		}

	};
}());
