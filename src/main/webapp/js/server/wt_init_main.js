//设置监听
var wt_initmain = (function() {
	var bcu;
	var init = function() {
		bcu = new bstClientUtil();
	}
	var allszxx = [];
	return {
		wt_data : function(res) {
			/*
			 * init(); var index = 0; var bstInterval = setInterval(function(){
			 * var menu = $('#treeModule_90_span').html(); if(menu=="用户信息管理"){
			 * clearInterval(bstInterval); var nodeSb = new
			 * bstClientUtil().getNode('treeModule','MKXK_MC','基本信息管理');
			 * bstClientUtil.prototype.openNode('treeModule',nodeSb); }else{
			 * index++; console.log("index："+index); } },200);
			 */
			//debugger;
			
			if (res != null && res != "") {
				allszxx = res;//
				init();
				external.RemoteProcedureCall(JSON.stringify({
					code : '4',
					data : '网上税务局登录成功！'
				}));
				setTimeout(function() {
					bcu.addHttpFilter({
						url : bstClientUtil.wt_menu_url,
						callback : 'wt_initmain.wt_datafirst',
						timeout : 20000
					});
					// 点击菜单
					/*var nodeSb = new bstClientUtil().getNode('menuUl',
							'wddazx', '我的档案中心');*/
					//bstClientUtil.prototype.openNode('treeModule', nodeSb);
					

					$('#wddazx a')[0].click();//点开我的档案中心
					
					
					
				}, 2000);
			} else {
				external.RemoteProcedureCall(JSON.stringify({
					code : '4',
					data : '网上税务局请求超时！'
				}));
			}
		},
		wt_datafirst : function(res) {
			$($("#iframeMain").contents().find("#main-nav .first-menu li")[1]).click();//点开税种登记信息
			$($("#iframeMain").contents().find(".second-menu-swdj li")[0]).click();//点开税种登记信息
			//获取税种
			bcu.addHttpFilter({
				url : "https://ybs.he-n-tax.gov.cn:8888/yhs-web/api/common/query",
				callback : 'wt_initmain.wt_datafirstall',
				timeout : 20000
			});
			setTimeout(function() {
				wt_initmain.wt_databack(res);
			},1000)
			
		},
		wt_datafirstall : function(res) {
			//获取所有的
			var szall = res.value;
			if(szall){
				allszxx[2] = szall
			}
			
			
		},
		wt_databack : function(res) {
			setTimeout(function() {
				init();
				var wt_data = new Array();
				if (res != "" && res != null) {
					bcu.remoteCall(JSON.stringify({
						code : '100',
						data : {
							"type" : '0',
							'step' : 1,
							'msg' : '进入用户基本信息'
						}
					}));
					/*
					 * 全部传 backdata = res.data;
					 */
					debugger;
					res = res.value[0];
					
					var nsrlx;//
					if (res.ybnsrbz	!= "" && res.ybnsrbz == "是"
						) {
						nsrlx = "一般纳税人";
					} else {
						nsrlx = "小规模纳税人";
					}
					// 纳税人识别号
					var nsrsbh;
					if (res.NSRSBH != null) {
						nsrsbh = res.NSRSBH;
					}
					// 适用会计制度。。。。
					var sykjzd;
					/*if (res.NSRXX_KZ.KJZDZZMC != null) {
						sykjzd = res.NSRXX_KZ.KJZDZZMC;
					}*/
					// 纳税人名称
					var nsrmc;
					if (res.NSRMC != null) {
						nsrmc = res.NSRMC;
					}
					// 行业名称
					var hymc;
					if (res.HY_MC != null) {
						hymc = res.HY_MC;
					}
					// 所属机关名称
					var gszgswjg_mc;
					if (res.swjgmc != null) {
						gszgswjg_mc = res.swjgmc;
					}
					// 所属机关代码
					var gszgswjg_j_dm;
					if (res.zgswjDm!= null) {
						gszgswjg_j_dm = res.zgswjDm;
					}
					// 注册地址
					var zcdz;
					if (res.scjydz != null) {
						zcdz = res.scjydz;
					}
					// 从业人数
					var cyrs;
					/*if (res.NSRXX.CYRS != null) {
						cyrs = res.NSRXX.CYRS;
					}*/
					// 经营范围
					var jyfw;
					if (res.jyfw != null) {
						jyfw = res.jyfw;
					}

					// 税费种认定
					var sfzrd = new Array();
					var gsik ,gsdata;
					if(allszxx[0].data){
						gsik = allszxx[0].data.length;
						gsdata = allszxx[0].data;
					}
					
					//国税费种
					if (gsik >0) {
						for (var i = 0; i < gsik; i++) {
							// 征收项目 ** 征收品目*** 纳税期限
							//var zsxmdm = gsdata[i].code;
							//var zspmdm = gsdata[i].id;
							/*if (zsxmdm == "10101") {// 增值税
								zspmdm = "101017100";
							}
							if (zsxmdm == "10104") {// 企业所得税
								zspmdm = "101040000";
							}*/
							/*sfzrd.push({
								zsxmmc : gsdata[i].name,
								zsxmdm : zsxmdm,
								zspmmc : "",
								zspmdm : zspmdm,
								nsqxmc : gsdata[i].sbqx
							})*/
							if(gsdata[i].name.indexOf("小企业会计准则")!=-1){
								sykjzd = "小企业会计准则";
							}else if(gsdata[i].name.indexOf("企业会计准则")!=-1){
								sykjzd = "小企业会计准则";
							}
						}
					}
					//地税税种
					/*var dsik ,dsdata ;
					if(allszxx[1].data){
						dsik = allszxx[1].data.length;
						dsdata = allszxx[1].data;
					}
					
					if (dsik > 0) {
						for (var i = 0; i < dsik; i++) {
							// 征收项目 ** 征收品目*** 纳税期限
							var zsxmdm = dsdata[i].code;
							var zspmdm = dsdata[i].id;
							if (zsxmdm == "10101") {// 增值税
								zspmdm = "101017100";
							}
							if (zsxmdm == "10104") {// 企业所得税
								zspmdm = "101040000";
							}
							sfzrd.push({
								zsxmmc : dsdata[i].name,
								zsxmdm : zsxmdm,
								zspmmc : "",
								zspmdm : zspmdm,
								nsqxmc : dsdata[i].sbqx
							})
						}
					}*/
					var allsik ,allsdata ;
					if(allszxx[2]){
						allsik = allszxx[2].length;
						allsdata = allszxx[2];
					}
					
					if (allsik > 0) {
						for (var i = 0; i < allsik; i++) {
							// 征收项目 ** 征收品目*** 纳税期限
							/*var zsxmdm = allsdata[i].code;
							var zspmdm = allsdata[i].id;
							if (zsxmdm == "10101") {// 增值税
								zspmdm = "101017100";
							}
							if (zsxmdm == "10104") {// 企业所得税
								zspmdm = "101040000";
							}*/
							sfzrd.push({
								zsxmmc : allsdata[i].zsxmjc,
								zsxmdm : "",
								zspmmc : allsdata[i].zspmmc,
								zspmdm : "",
								nsqxmc : allsdata[i].nsqxmc,
								rdyxqq : allsdata[i].dyxqq,
								rdyxqz : allsdata[i].rdyxqz
							})
						}
					}
					// 人员信息ryxxList
					var ryxxArray = new Array();
					/*if (res.ryxxList.length > 0) {
						for (var j = 0; j < res.ryxxList.length; j++) {
							// 人员 姓名 身份证件类型 证件号码 移动电话 实名制采集状态
							ryxxArray.push({
								rylx : res.ryxxList[j].RYLX,// 人员类型,
								XM : res.ryxxList[j].XM,// 人员姓名
								sfzjlx_dm : res.ryxxList[j].SFZJLX_DM,// 身份证件类型代码
								sfzjlxmc : res.ryxxList[j].SFZJLXMC,// 身份证件类型名称,
								sfzjhm : res.ryxxList[j].SFZJHM,// 证件号码
								yddh : res.ryxxList[j].YDDH,// 移动电话,
								cjbz : res.ryxxList[j].CJBZ
								// 实名采集标志
							})
						}
					}*/

					wt_data.push({
						"gdsbz" : "G",
						'step' : 1,
						'NSRLX' : nsrlx,
						'NSRSBH' : nsrsbh,
						'SYKJZD' : sykjzd,
						'nsrmc' : nsrmc,
						'hymc' : hymc,
						'gszgswjg_mc' : gszgswjg_mc,
						'gszgswjg_j_dm' : gszgswjg_j_dm,
						'zcdz' : zcdz,
						'cyrs' : cyrs,
						'jyfw' : jyfw,
						'sfzrd' : sfzrd,
						'ryxxArray' : ryxxArray
					});
					// 返回数据
					external.RemoteProcedureCall(JSON.stringify({
						code : '3',
						data : wt_data
					}));
					debugger;
					//退出网上税务局
					//$("#tcdl-btn")[0].click();
				} else {
					external.RemoteProcedureCall(JSON.stringify({
						code : '4',
						data : '网上税务局请求超时！'
					}));
				}
			}, 1000);
		}
	};
}());