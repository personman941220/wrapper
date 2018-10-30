/**
 * 国地税申报信息
 */
var exportExcel = (function() {
	var bcu, data, resData, iframe, rqdata, _this, picPath, path, excelUrl;
	var dataNum = 0;
	var init = function() {
		_this = exportExcel;
		bcu = new bstClientUtil();
		rqdata = JSON.parse(bcu.getData('rqdata'));
		data = JSON.parse(bcu.getData('data'));
		picPath = bcu.getData('picPath');
	};
	return {
		onload : function() {
			init();
			var picArray = picPath.split('\\');
			for (var i = 0; i < picArray.length; i++) {
				if (i == 0) {
					path = picArray[i];
				}
				if (i < picArray.length - 1 && i > 0) {
					path = path + "\\" + picArray[i];
				}
			}
		},
		gsInfo : function() {/* 国税首页 */
			exportExcel.onload();
//			var gsurl = '/hlwsb/cxdy/getSB_SBJG.do';
			excelUrl = bstClientUtil.gsExcelUrl.checkBtn;
			bcu.addHttpFilter({
				url : excelUrl,
				callback : 'exportExcel.searchDate',
				timeout : 20000
			});
			// 点击菜单
			// $("#hlwsbTreeModule_12_span").click();
			var nodeSb = new bstClientUtil().getNode('hlwsbTreeModule', 'MKXK_MC', '查询打印', '查询打印');
			bstClientUtil.prototype.openNode('hlwsbTreeModule', nodeSb);
		},

		/* 选择日期 */
		searchDate : function(res) {
			setTimeout(function() {
				// 获取当前iframe
				iframe = bcu.findFrame();
				if (res != "" && res != null) {
					excelUrl = bstClientUtil.gsExcelUrl.checkBtn;
					bcu.addHttpFilter({
						url : excelUrl,
						callback : 'exportExcel.gsSbjg',
						timeout : 20000
					});
					// 填入日期重新查询
//					$(iframe.contentWindow.document).find('#RQQ')[0].value = '2018-07-01';
//					$(iframe.contentWindow.document).find('#RQZ')[0].value = '2018-07-31';
					 $(iframe.contentWindow.document).find('#RQQ')[0].value = rqdata.rqq;
					 $(iframe.contentWindow.document).find('#RQZ')[0].value = rqdata.rqz;
					$(iframe.contentWindow.document).find("input[class='searchbtn']").click()
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
							'msg' : '查询打印信息成功'
						}
					}));
					var resData = [];
					// 根据返回参数点击所有税种，获取cell列表
					for (var i = 0; i < res.data.RESULT.length; i++) {
						resData[resData.length] = res.data.RESULT[i].NSRLX_DM;
					}
					bcu.setData("resData", resData);
					_this.excelfunc();
				} else {
					bcu.remoteCall(JSON.stringify({
						code : '13',
						data : '网上税务局请求超时！'
					}));
				}
			}, 1000);
		},

		excelfunc : function() {
			// 获取当前iframe
			iframe = bcu.findFrame();
			// 纳税人类型代码
			resData = bcu.getData("resData").split(',');
			// 监听
			excelUrl = bstClientUtil.gsExcelUrl.arrayUrl;
			bcu.addHttpFilter({
				url : excelUrl,
				callback : 'exportExcel.excelData',
				timeout : 50000
			});
			var obj = "";
			var szdm = "";
			if (dataNum == resData.length) {
				szdm = "5010002";// 财务报表有两个报表需要导出，所以再进一次
			} else {
				szdm = resData[dataNum];
			}
			switch (szdm) {
			case "5010002":// 财务报表
				obj = $(iframe.contentWindow.document).find('div.mmg-bodyWrapper:eq(0)').find('td').find('span');
				for (var j = 0; j < obj.length; j++) {
					if (obj[j].outerText == "5010002") {// 匹配报表税种
						// 监听
						$(iframe.contentWindow.document).find('div.mmg-bodyWrapper:eq(0)').find('td')[j].click();
						return;
					}
				}
				break;
			case "101010201":// 增值税小规模纳税人（查账征收）
				obj = $(iframe.contentWindow.document).find('div.mmg-bodyWrapper:eq(0)').find('td').find('span');
				for (var k = 0; k < obj.length; k++) {
					if (obj[k].outerText == "101010201") {// 匹配报表税种
						// 监听
						$(iframe.contentWindow.document).find('div.mmg-bodyWrapper:eq(0)').find('td')[k].click();
						return;
					}
				}
				break;
			case "101010102":// 增值税一般纳税人
				obj = $(iframe.contentWindow.document).find('div.mmg-bodyWrapper:eq(0)').find('td').find('span');
				for (var l = 0; l < obj.length; l++) {
					if (obj[l].outerText == "101010102") {// 匹配报表税种
						// 监听
						$(iframe.contentWindow.document).find('div.mmg-bodyWrapper:eq(0)').find('td')[l].click();
						return;
					}
				}
				break;
			case "101040040010":// 企业所得税纳税人（核定征收）（月季） 101040040010
				obj = $(iframe.contentWindow.document).find('div.mmg-bodyWrapper:eq(0)').find('td').find('span');
				for (var m = 0; m < obj.length; m++) {
					if (obj[m].outerText == "101040040010") {// 匹配报表税种
						// 监听
						$(iframe.contentWindow.document).find('div.mmg-bodyWrapper:eq(0)').find('td')[m].click();
						return;
					}
				}
				break;
			case "101040010010":// 企业所得税纳税人（查账征收）（月季） 101040010010
				obj = $(iframe.contentWindow.document).find('div.mmg-bodyWrapper:eq(0)').find('td').find('span');
				for (var n = 0; n < obj.length; n++) {
					if (obj[n].outerText == "101040010010") {// 匹配报表税种
						// 监听
						$(iframe.contentWindow.document).find('div.mmg-bodyWrapper:eq(0)').find('td')[n].click();
						return;
					}
				}
				break;
			default:
				bcu.remoteCall(JSON.stringify({
					code : '13',
					data : '网上税务局请求超时！'
				}));
			break;
			}
		},

		excelData : function(res) {
			setTimeout(function() {
				if (res != "" && res != null) {
					// 获取当前iframe
					iframe = bcu.findFrame();
					if (res.data.RESULT[0].NSRLX_DM == "5010002") {// 财务报表
						var hrefArray = $(iframe.contentWindow.document).find('div.mmg-bodyWrapper:eq(1)').find('td').find('span').find('a');
						if (dataNum < resData.length) {// 资产负债表 50100311001
							// 监听 资产负债表
							excelUrl = bstClientUtil.gsExcelUrl.cwbb.zcfzb;
							bcu.addHttpFilter({
								url : excelUrl,
								callback : 'exportExcel.excelExport',
								timeout : 20000
							});
							// 点击打印
							for (var j = 0; j < hrefArray.length; j++) {
								if (hrefArray[j].href.includes('zcfz')) {
//									if (hrefArray[j].href.indexOf('zcfz') > 0) {
									bcu.setData('bbmc', '资产负债表');
									hrefArray[j].click();
									return;
								}
							}
						}

						if (dataNum == resData.length) {// 利润表 50100311002
							// 监听 利润表
							// https://wssb.ha-n-tax.gov.cn/hlwsb/cwbb/xqy/getSB_CWBB_XQY_LRB_YB.do
							excelUrl = bstClientUtil.gsExcelUrl.cwbb.lrb;
							bcu.addHttpFilter({
								url : excelUrl,
								callback : 'exportExcel.excelExport',
								timeout : 20000
							});
							// 点击打印
							for (var o = 0; o < hrefArray.length; o++) {
								if (hrefArray[o].href.includes('lrb')) {
									bcu.setData('bbmc', '利润表');
									hrefArray[o].click();
									return;
								}
							}
						}
					}
					if (res.data.RESULT[0].NSRLX_MC.indexOf("增值税")) {// 增值税
						// 增值税一般纳税人101010102
						if (res.data.RESULT[0].NSRLX_DM == "101010201") {// 增值税小规模纳税人（查账征收）
							// 监听 增值税纳税申报表
							excelUrl = bstClientUtil.gsExcelUrl.zzs.xgmnsrCzzs;
							bcu.addHttpFilter({
								url : excelUrl,
								callback : 'exportExcel.excelExport',
								timeout : 20000
							});
						}
						if (res.data.RESULT[0].NSRLX_DM == "101010102") {// 增值税一般纳税人
							// 监听 增值税纳税申报表
							excelUrl = bstClientUtil.gsExcelUrl.zzs.ybnsr;
							bcu.addHttpFilter({
								url : excelUrl,
								callback : 'exportExcel.excelExport',
								timeout : 20000
							});
						}
						bcu.setData('bbmc', res.data.RESULT[0].SBBZL_MC);
						// 点击打印
						$(iframe.contentWindow.document).find('div.mmg-bodyWrapper:eq(1)').find('tr:eq(0)').find('a')[0].click();
					}
					if (res.data.RESULT[0].NSRLX_DM == "101040040010" || res.data.RESULT[0].NSRLX_DM == "101040010010") {// 企业所得税
						// 企业所得税纳税人（查账征收）（月季） 101040010010 //企业所得税纳税人（核定征收）（月季）
						// 101040040010
						if (res.data.RESULT[0].SBBZL_DM == "10104110003") {// B类
							excelUrl = bstClientUtil.gsExcelUrl.qysds.qysdsB;
							bcu.addHttpFilter({
								url : excelUrl,
								callback : 'exportExcel.excelExport',
								timeout : 20000
							});
						} else {
							excelUrl = bstClientUtil.gsExcelUrl.qysds.qysdsA;
							bcu.addHttpFilter({
								url : excelUrl,
								callback : 'exportExcel.excelExport',
								timeout : 20000
							});
						}
						bcu.setData('bbmc', res.data.RESULT[0].SBBZL_MC);
						// 点击打印
						$(iframe.contentWindow.document).find('div.mmg-bodyWrapper:eq(1)').find('tr:eq(0)').find('a')[0].click();
					}
				} else {
					bcu.remoteCall(JSON.stringify({
						code : '13',
						data : '网上税务局请求超时！'
					}));
				}
			}, 2000);
		},
		excelExport : function(res) {// 导出EXCEL
			setTimeout(function() {
				if (res != null && res != "") {
					var bbmc = bcu.getData("bbmc");
					// picPath;
					// 导出EXCEL
					$("iframe")[2].contentWindow.DCellWeb1.ExportExcelFile(path + "\\" + bbmc + ".xls", -1);
					// 关闭浮层
					$("table.ui_dialog").find("div.ui_title_buttons").find("a.ui_close")[2].click();
					var reslength = bcu.getData("resData").split(',').length;
					if (dataNum < reslength) {
						dataNum++;
						_this.excelfunc();
					} else {
						bcu.remoteCall(JSON.stringify({
							code : '12',
							data : JSON.stringify(data)
						}));
					}
				} else {
					bcu.remoteCall(JSON.stringify({
						code : '13',
						data : '网上税务局请求超时！'
					}));
				}
			}, 2000);
		}
	};
}());
