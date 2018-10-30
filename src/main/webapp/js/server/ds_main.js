var ds_main = (function(){
	var _this,bcu,data,iframe,confirmBtn,info,totalCount,dataCount;
	var sb_res = [];
	var idx = 0;
	var ds_init = function(){
		_this = ds_main;
		bcu = new bstClientUtil();
		data = JSON.parse(bcu.getData('login_config_data'));
		dataCount = data.length;
		totalCount = $(bcu.findFrameDs()).find("#byysbList").find("tbody:eq(1)").find("ul:last span:last").html()*1;/*获取地税列表总条数*/
	}
	return {
		onload : function(res) {/* 地税信息  每月第一次登陆时候，需点掉提示*/
			setTimeout(function(){
				ds_init();
				if (res != null && res != "") {
					if(res.message.indexOf("查询失败")>=0&&res.status==200){//每月第一次登陆时候，需点掉提示
						var cur_url = bstClientUtil.list_url;
						bcu.addHttpFilter({/*监听登录后主页加载完成*/
							url:cur_url,
							callback:'ds_main.dssbTip',
							timeout:40000
						});
						$($("iframe")[0].contentWindow.document).find("button")[1].click();
					}else{
						bcu.setData('resData',JSON.stringify(res));//如无需点击，则传递数据，进行接下去的操作
						_this.dssbTip();
					}
				}else{
					bcu.remoteCall(JSON.stringify({
						code : '13',
						data : "网上税务局请求超时！"
					}));
				}
			},800);
		},
		dssbTip:function(res){/*回调页面跳转问题，外壳已经处理，页面不需要再处理*/
			if(res==null&&res==''){
				bcu.remoteCall(JSON.stringify({"code":"6","data":"获取菜单页失败"}));
				return;
			}
			setTimeout(function(){/*设置延时，留出请求完成后，页面渲染时间*/
				ds_init();
				if(res==undefined){
					res = JSON.parse(bcu.getData('resData'));
				}
				
				bcu.remoteCall(JSON.stringify({code:'100',data:{"type":'1','step':4,'msg':'网上税务局地税系统登陆成功！'}}));
				iframe = bcu.findFrameDs();
				var div = $(iframe).find(".modal").find(".modal-body");/*获取弹框div，以便获取提示语*/
				if(div.length>0 && div[0].outerText.indexOf("初始化")>=0){
					bcu.addHttpFilter({/*启动监听主页list列表加载*/
						url:bstClientUtil.list_url,
						callback:'ds_main.onload'
					});
					$(iframe).find(".modal").find(".btn-primary").click();/*尝试点击保存成功*/
				}else{
					_this.get_all_data();
				}
			},1000);
		},
		get_all_data:function(){/*获取菜单行次，以便后续打开操作，每次申报完，顺序会更改，此方法需要刷新*/
			var url = bstClientUtil.list_url;
			var param = {
				pageInfo : {
					begin : 1,
					end : totalCount,
					pageDataName : 'byysbListData',
					sortMap : {}
				}
			};
			$.ajax({
				url : url,
				type : "post",
				dataType : "json",
				contentType : "application/json;charset=UTF-8",
				data : JSON.stringify(param),
				success : function(res) {
					var tmpData = res.data.byysbListData;
					var tmpId;
					for (var i = 0; i < tmpData.length; i++) {
						tmpId = tmpData[i].TABLE_ID;
						if (bstClientUtil.data[tmpId] != undefined) {
							bstClientUtil.data[tmpId].TABLENAME = tmpData[i].TABLENAME;
							bstClientUtil.data[tmpId].SKSSQZ = tmpData[i].SKSSQZ;
							bstClientUtil.data[tmpId].SKSSQQ = tmpData[i].SKSSQQ;
							bstClientUtil.data[tmpId].SBZT_MC = tmpData[i].SBZT_MC;/*申报状态名称 申报成功*/
							bstClientUtil.data[tmpId].SBZT_DM = tmpData[i].SBZT_DM;
							bstClientUtil.data[tmpId].JKZT_MC = tmpData[i].JKZT_MC;/*缴款状态名称 缴款成功*/
							bstClientUtil.data[tmpId].JKZT_DM = tmpData[i].JKZT_DM;
							bstClientUtil.data[tmpId].DATARN = tmpData[i].DATARN;
							bstClientUtil.data[tmpId].TABLE_ID = tmpData[i].TABLE_ID;
						}
					}
					_this.run_start();
				},
				error : function(msg) {
					/*请求失败处理*/
					bcu.remoteCall(JSON.stringify({"code":"6","data":"获取菜单页失败"}));
					return;
				}
			});
		},
		run_start:function(){
			iframe = bcu.findFrameDs();
			info = data[idx];
			if(bstClientUtil.data[info.id].DATARN==null){
				sb_res[sb_res.length] = {type:2,id:info.id,msg:'本月没有该报表'};/*处理错误信息*/
				this.bb_finish(-1);
				return;
			}
			if(bstClientUtil.data[info.id].JKZT_MC.indexOf('缴款成功')>=0){/*申报成功，直接跳到切换报表*/
				_this.bb_finish(1);
				return;
			}else if(bstClientUtil.data[info.id].SBZT_MC.indexOf('申报成功')>=0){/*直接进入缴款*/
				_this.bb_saved(1);
				return;
			}
			/*跳转页面*/
			bstClientUtil.goToTableDs(bstClientUtil.data[info.id].load_url, 'ds_main.bb_load', iframe, bstClientUtil.data[info.id].DATARN);
		},
		bb_load:function(res){/*报表加载完成*/
			if(res==null||res==''){/*报表跳转超时*/
				bcu.remoteCall(JSON.stringify({"code":"6","data":"报表加载超时"}));
				return;
			}
			setTimeout(function(){/*请求加载完成,延时留页面渲染时间*/
				_this[bstClientUtil.data[info.id].run_fun]();/*执行不同的表的填数逻辑，需要同步方法*/
			},1000);
		},
		bb_save:function(){
			$(iframe).find(".modal").find(".btn-primary").click();/*尝试点击保存成功*/
			setTimeout(function(){/*给填表和关闭弹框运行时间*/
				iframe = bcu.findFrameDs();/*页面跳转，需要重新获取iframe*/
				confirmBtn = bcu.findBtnByName(iframe, info.id, '申报');
				//如果是个税则触发编辑，进行个税税费计算
				if(info.id=="GS0001"){
                    $("iframe")[0].contentWindow.window.$('#MX1 .glyphicon.glyphicon-edit.rowButton').each(function(){
                        $(this).click();
                    });
				}
				if(confirmBtn!=null&&confirmBtn.length>0){
					bcu.addHttpFilter({/*启动申报成功回调*/
						url:bstClientUtil.data[info.id].saved_url,
						callback:'ds_main.bb_saved'
					});
					confirmBtn[0].click();
				}else{
					sb_res[sb_res.length] = {type:2,id:info.id,msg:'没有申报按钮'};/*处理错误信息*/
					_this.bb_finish(-1);
				}
			},500);
		},
		bb_saved:function(res){/*报表申报完成*/
			if(res==null||res==''){/*报表跳转超时*/
				bcu.remoteCall(JSON.stringify({"code":"6","data":"报表保存超时"}));
				return;
			}
			setTimeout(function(){/*请求加载完成,延时留页面渲染时间*/
				iframe = bcu.findFrameDs();
				var div = $(iframe).find(".modal").find(".modal-body");/*获取弹框div，以便获取提示语，如果没有申报，则会跳过该过程*/
				if(div.length>0&&div[0].outerText.indexOf("申报成功")<0){/*申报不成功*/
					var error;
					if((div[0].outerText).indexOf("身份证") >= 0){/*包含身份证错误信息的，直接给固定值!，则返回“身份证号码不正确或存在多条身份中相同的信息！”*/
						error = "身份证号码不正确或存在多条身份中相同的信息！";
					}else{/*申报成功error的值给空，未申报成功，给error赋值错误信息!*/
						error=div[0].outerText;
					}
					$(iframe).find(".modal").find(".btn-primary").click();/*处理完成点掉错误提示*/
					sb_res[sb_res.length] = {type:2,id:info.id,msg:error};/*处理错误信息*/
					_this.bb_finish(-1);
					return;
				}
				$(iframe).find(".modal").find(".btn-default").click();/*申报成功，尝试关掉缴款按钮，后面统一点缴款*/
				setTimeout(function(){/*取消缴款延迟*/
					$(iframe).find(".modal").find(".btn-primary").click();/*取消缴款确认*/
					setTimeout(function(){/*取消缴款确认延迟*/
						confirmBtn = bcu.findBtnByName(iframe, info.id, '缴款');
						if(confirmBtn!=null&&confirmBtn.length>0){
							bcu.addHttpFilter({/*查询申报金额回调*/
								url:bstClientUtil.data[info.id].queryje_url,
								callback:'ds_main.bb_queryje'
							});
							bcu.addHttpFilter({/*无金额回调*/
								url:bstClientUtil.data[info.id].nopay_url,
								callback:'ds_main.bb_finish'
							});
							confirmBtn[0].click();
						}else{
							sb_res[sb_res.length] = {type:2,id:info.id,msg:'没有缴款按钮'};/*处理错误信息*/
							_this.bb_finish(-1);
						}
					},1500);
				},1500);
			},200);
		},
		bb_queryje:function(res){
			if(res==null||res==''){/*报表查询税款超时*/
				bcu.remoteCall(JSON.stringify({"code":"6","data":"报表查询税款超时"}));
				return;
			}
			if(res.data.SB_JE!=0){/*不是0则去掉nopay监听，*/
				bcu.removeHttpFilter(bstClientUtil.data[info.id].nopay_url);/*删除无金额回调监听*/
				sb_res[sb_res.length] = {type:2,id:info.id,msg:'有税额，无法处理缴款'};/*处理错误信息*/
				_this.bb_finish(-1);
			}
		},
		bb_finish:function(res){/*报表完成处理*/
			if(res==null||res==''){/*报表缴款超时*/
				bcu.remoteCall(JSON.stringify({"code":"6","data":"报表缴款超时"}));
				return;
			}else if(res!=-1){/*-1是错误的表，错误的表在前头处理直接跳过，此处处理成功的报表*/
				sb_res[sb_res.length] = {type:1,id:info.id};/*添加执行成功的报表*/
			}
			idx++;/*执行下一个报表*/
			if(idx==dataCount){/*idx从0开始，如果等于数组length，则已经执行完毕*/
				//申报结果获取
//				bcu.setData("sb_res",JSON.stringify(sb_res));
//				gds_sbinfoMain.dsOnload();
				var done = {code:5,data:sb_res};
				bcu.remoteCall(JSON.stringify(done));/*返回申报结果*/
				return;
			}else{
				bcu.goMain('ds_main.get_all_data');/*跳转到首页，并开始执行下一个表*/
			}
		},
		run_ghjf:function(res){/*填表工会经费*/
			//设置心跳
			bcu.remoteCall(JSON.stringify({code:'100',data:{"type":'1','step':4,'msg':'工会经费'}}));
			iframe = bcu.findFrameDs();/*获取当前iframe对象 地税*/
			$(iframe).find(".modal").find(".btn-primary").click();/*尝试关掉弹框*/
			setTimeout(function(){/*给加载完成一点延时*/
				var bsmdata = info.list;/*传递参数*/
				if(bsmdata!=null&&bsmdata.length>0){
					$("iframe")[0].contentWindow.$.spark.dataCenter.set("MX1[0].f5",bsmdata[0].qtsr_ysx);/*填入应税项*/
					$("iframe")[0].contentWindow.$.spark.dataCenter.set("MX1[0].f6",bsmdata[0].qtsr_jcx);/*减除项*/
					$("iframe")[0].contentWindow.$.spark.dataCenter.set("MX1[0].f14",bsmdata[0].qtsr_bqyj);/*本期已缴税额*/
				}
				_this.bb_save();
			},500);
		},
		run_fjs:function(res){/*填表附加税*/
			//设置心跳
			iframe = bcu.findFrameDs();/*获取当前iframe对象 地税*/
			$(iframe).find(".modal").find(".btn-primary").click();/*尝试关掉弹框*/
			setTimeout(function(){/*给加载完成一点延时*/
				var bsmdata = info.list;
				if(bsmdata!=null&&bsmdata!=""){
					var fjsObj = $("iframe")[0].contentWindow.$.spark.dataCenter.get("MX1");
					for(var i=0;i<bsmdata.length;i++){
						for(var j=0;j<fjsObj.length;j++){
							if(bsmdata[i].fjs_zspm==fjsObj[j].f2){/*匹配相应的征收品目，传递来的数顺序不能保证一定正确*/
								$("iframe")[0].contentWindow.$.spark.dataCenter.set("MX1["+j+"].f3",bsmdata[i].fjs_ybzz);/*一般增值*/
								$("iframe")[0].contentWindow.$.spark.dataCenter.set("MX1["+j+"].f4",bsmdata[i].fjs_mdse);/*免税抵额*/
								$("iframe")[0].contentWindow.$.spark.dataCenter.set("MX1["+j+"].f12",bsmdata[i].fjs_bqyj);/*本期已缴税额*/
							}
						}
					}
				}
				_this.bb_save();
			},500);
		},
		run_yhs:function(res){/*填表印花税*/
			/*获取当前iframe对象 地税*/
			//设置心跳
			bcu.remoteCall(JSON.stringify({code:'100',data:{"type":'1','step':4,'msg':'印花税'}}));
			iframe = bcu.findFrameDs();
			$(iframe).find(".modal").find(".btn-primary").click();/*尝试关掉弹框*/
			setTimeout(function(){/*给加载完成一点延时*/
				var bsmdata = info.list;
				if(bsmdata!=null&&bsmdata!=""){
					var yhsObj = $("iframe")[0].contentWindow.$.spark.dataCenter.get("MX1");
					if(bsmdata.length==yhsObj.length){
						for(var i=0;i<bsmdata.length;i++){
							for(var j=0;j<yhsObj.length;j++){/*应税凭证*/
								var yspz = $("iframe")[0].contentWindow.$.spark.dataCenter.get("MX1["+j+"].f1");
								if(yspz==bsmdata[i].yhs_zspm){/*匹配相应的征收品目*/
									$("iframe")[0].contentWindow.$.spark.dataCenter.set("MX1["+j+"].f2",bsmdata[i].yhs_jsjejs);/*计税金额或件数*/
									$("iframe")[0].contentWindow.$.spark.dataCenter.set("MX1["+j+"].f7",bsmdata[i].yhs_bqyjse);/*本期已交税额*/
								}
							}
						}
					}
				}
				_this.bb_save();
			},500);
		},
		run_grsds:function(res){/*删除原表信息*/
			//设置心跳
			bcu.remoteCall(JSON.stringify({code:'100',data:{"type":'1','step':4,'msg':'个人所得税'}}));
			iframe = bcu.findFrameDs();/*页面跳转，需要重新获取iframe*/
			$(iframe).find(".modal").find(".btn-primary").click();/*尝试关掉弹框*/
			setTimeout(function(){/*给加载完成一点延时*/
				confirmBtn = bcu.findBtnByName(iframe, info.id, '全部删除');
				var bsmdata = info.list;
				if(bsmdata==null){
					sb_res[sb_res.length] = {type:2,id:info.id,msg:'个税没有申报数据'};/*处理错误信息*/
					_this.bb_finish(-1);
					return;
				}
				if(confirmBtn!=null&&confirmBtn.length>0){
					//priorPeriod
					if(bsmdata[0].priorPeriod=="0"||bsmdata[0].priorPeriod==0){
						bcu.addHttpFilter({//个税铺数
							url:bstClientUtil.data[info.id].remove_url,
							callback:'ds_main.fill_grsds'
						});
					}else{
						bcu.addHttpFilter({/*提取上期数据*/
							url:bstClientUtil.data[info.id].remove_url,
							callback:'ds_main.fill_tisqsj_grsds'
						});
					}
					/*先删除原有数据*/
					confirmBtn[0].click();
					setTimeout(function(){/*等删除确认提示，点击确定触发删除方法*/
						$(iframe).find(".modal").find(".btn-primary").click();/*确认删除按钮*/
					},500);
				}else{
					if(bsmdata[0].priorPeriod=="0"||bsmdata[0].priorPeriod==0){
						_this.fill_grsds(1);
					}else{
						_this.fill_tisqsj_grsds(1);
					}
				}
			},500);
		},
		fill_tisqsj_grsds:function(res){//提取上期数据，直接点申报
			//设置心跳
			bcu.remoteCall(JSON.stringify({code:'100',data:{"type":'1','step':4,'msg':'个人所得税'}}));
			iframe = bcu.findFrameDs();/*页面跳转，需要重新获取iframe*/
			setTimeout(function(){/*给加载完成一点延时*/
				if(res==null||res==''){/*删除个税报表超时*/
					bcu.remoteCall(JSON.stringify({"code":"6","data":"删除个税报表超时"}));
					return;
				}
				$(iframe).find(".modal").find(".btn-primary").click();/*尝试关掉弹框*/
				setTimeout(function(){/*给加载完成一点延时*/
					confirmBtn = bcu.findBtnByName(iframe, info.id, '提取上期数据');
					if(confirmBtn!=null&&confirmBtn.length>0){
						bcu.addHttpFilter({/*点击提取上期数据按钮*/
							url:bstClientUtil.data[info.id].init_url,
							callback:'ds_main.bb_errorInfo'
						});
						confirmBtn[0].click();
					}else{
						sb_res[sb_res.length] = {type:2,id:info.id,msg:'没有提取上期数据按钮'};/*处理错误信息*/
						_this.bb_finish(-1);
					}
				},500);
			},500);
		},
		//提取上期数据错误信息
		bb_errorInfo:function(res){
			setTimeout(function(){/*给加载完成一点延时*/
				$(iframe).find(".modal").find(".btn-primary").click();/*确认按钮*/
				if(res!=""&&res!=null){
					if(res.code=="1"){
						//code==1时返回错误信息，返回给前端
						sb_res[sb_res.length] = {type:2,id:info.id,msg:res.message};/*处理错误信息*/
						_this.bb_finish(-1);
						return;
					}
					if(res.code=="0"){
						//提取上期数据成功，点击申报按钮
						_this.bb_save();
					}
				}else{
					bcu.remoteCall(JSON.stringify({"code":"6","data":"提取上期数据超时"}));
					_this.bb_finish(-1);
				}
			},500);
		},
		
		
		fill_grsds:function(res){/*填表个人所得税*/
			if(res==null||res==''){/*删除个税报表超时*/
				bcu.remoteCall(JSON.stringify({"code":"6","data":"删除个税报表超时"}));
				return;
			}
			setTimeout(function(){
				iframe = bcu.findFrameDs();
				var div = $(iframe).find(".modal").find(".modal-body");/*获取弹框div，以便获取提示语，如果没有删除动作，则没有弹框，跳过该过程*/
				if(div.length>0&&div[0].outerText.indexOf("删除成功")<0){/*删除不成功*/
					var	error = div[0].outerText;
					$(iframe).find(".modal").find(".btn-primary").click();/*处理完成点掉错误提示*/
					sb_res[sb_res.length] = {type:2,id:info.id,msg:error};/*处理错误信息*/
					_this.bb_finish(-1);
					return;
				}
				$(bcu.findFrameDs()).find(".modal").find(".btn-primary").click();/*删除成功，删除成功按钮确认*/
				setTimeout(function(){/*给删除成功确认一点延时*/
					var bsmdata = info.list;
					if(bsmdata==null){
						sb_res[sb_res.length] = {type:2,id:info.id,msg:'个税没有申报数据'};/*处理错误信息*/
						_this.bb_finish(-1);
						return;
					}
					for(var i = 0 ;i<bsmdata.length-1;i++){
						$("iframe")[0].contentWindow.window.$('#MX1 .glyphicon.glyphicon-plus.rowButton:eq(0)').click();
					}
					var excelData=$("iframe")[0].contentWindow.window.$("#MX1").sDataGrid().getData();
					for(var i = 0 ;i<bsmdata.length;i++){
						excelData[i].F2=bsmdata[i].name;//姓名
						excelData[i].F4=bsmdata[i].idNumber;//身份证号
						
						if(bsmdata[i].gainsName!=null){
							excelData[i].GRSDSSDXM_DM = bsmdata[i].gainsName;//所得项目
						}
						
						if(bsmdata[i].salary!=null){
							excelData[i].F8=(bsmdata[i].salary)*1;//薪水
						}
						
						if(bsmdata[i].freeTax!=null){
							excelData[i].F9=(bsmdata[i].freeTax)*1;//免稅所得
						}
						
						var total = 0;
						if(bsmdata[i].endowment!=null){
							total = total + (bsmdata[i].endowment)*1;
							excelData[i].F10=(bsmdata[i].endowment)*1;//基本养老保险
						}
						if(bsmdata[i].medical!=null){
							total = total + (bsmdata[i].medical)*1;
							excelData[i].F11=(bsmdata[i].medical)*1;//基本医疗保险费
						}
						if(bsmdata[i].idleness!=null){
							total = total + (bsmdata[i].idleness)*1;
							excelData[i].F12=(bsmdata[i].idleness)*1;//失业保险费
						}
						if(bsmdata[i].housing!=null){
							total = total + (bsmdata[i].housing)*1;
							excelData[i].F13=(bsmdata[i].housing)*1;//住房公积金
						}
						if(bsmdata[i].property!=null){
							total = total + (bsmdata[i].property)*1;
							excelData[i].F14=(bsmdata[i].property)*1;//财产原值
						}
						if(bsmdata[i].allowDeduction!=null){
							total = total + (bsmdata[i].allowDeduction)*1;
							excelData[i].F15=(bsmdata[i].allowDeduction)*1;//允许扣除税费
						}
						if(bsmdata[i].annuity!=null){
							total = total + (bsmdata[i].annuity)*1;
							excelData[i].F16=(bsmdata[i].annuity)*1;//年金
						}
						if(bsmdata[i].healthy!=null){
							total = total + (bsmdata[i].healthy)*1;
							excelData[i].F17=(bsmdata[i].healthy)*1;//商业健康险
						}
						if(bsmdata[i].investment!=null){
							total = total + (bsmdata[i].investment)*1;
							excelData[i].F18=(bsmdata[i].investment)*1;//投资抵扣
						}
						if(bsmdata[i].other!=null){
							total = total + (bsmdata[i].other)*1;
							excelData[i].F19=(bsmdata[i].other)*1;//其他扣除
						}
						//合计
						excelData[i].F20=total;
						if(bsmdata[i].deductionFee!=null){
							excelData[i].F21=bsmdata[i].deductionFee;//减除费用
						}
						if(bsmdata[i].taxableAmount!=null){
							excelData[i].F23=bsmdata[i].taxableAmount;//应纳税所得额
						}
						if(bsmdata[i].rate!=null){
							excelData[i].F24=bsmdata[i].rate;//税率
						}
						
						if(bsmdata[i].quickDeduction!=null){
							excelData[i].F25=bsmdata[i].quickDeduction;//速算扣除数
						}
						
						if(bsmdata[i].payableAmount!=null){
							excelData[i].F26=bsmdata[i].payableAmount;//应纳税额
						}
						if(bsmdata[i].taxDeduction!=null){
							excelData[i].F27=bsmdata[i].taxDeduction;//减免税额
						}
						if(bsmdata[i].abatementTax!=null){
							excelData[i].F28=bsmdata[i].abatementTax;//应扣减税额
						}
						
						/*if(bsmdata[i].abatementTax!=null){
							excelData[i].F28=bsmdata[i].abatementTax;//准予扣除的捐赠额
						}
						if(bsmdata[i].abatementTax!=null){
							excelData[i].F28=bsmdata[i].abatementTax;//应扣减税额
						}
						if(bsmdata[i].abatementTax!=null){
							excelData[i].F28=bsmdata[i].abatementTax;//应扣减税额
						}*/
					}

                    //$("iframe")[0].contentWindow.window.$("#MX1").sDataGrid().getData("added").push(excelData);

                    _this.gs_save();
                },500);
			},500);
		},
		gs_save:function(){
			setTimeout(function(){/*给填表和关闭弹框运行时间*/
				iframe = bcu.findFrameDs();/*页面跳转，需要重新获取iframe*/
				confirmBtn = bcu.findBtnByName(iframe, info.id, '保存');
				if(confirmBtn!=null&&confirmBtn.length>0){
					bcu.addHttpFilter({/*启动申报成功回调*/
						url:bstClientUtil.data[info.id].save_url,
						callback:'ds_main.gs_saved'
					});
					bcu.addHttpFilter({/*启动保存成功回调*/
						url:bstClientUtil.data[info.id].load_url,
						callback:'ds_main.bb_save'
					});
					confirmBtn[0].click();
				}else{
					sb_res[sb_res.length] = {type:2,id:info.id,msg:'没有保存按钮'};/*处理错误信息*/
					_this.bb_finish(-1);
				}
			},500);
		},
		gs_saved:function(res){
			if(res==null||res==''){/*报表保存超时*/
				bcu.remoteCall(JSON.stringify({"code":"6","data":"报表保存超时"}));
				bcu.removeHttpFilter(bstClientUtil.data[info.id].load_url);/*删除保存成功后数据监听*/
				return;
			}
		}
		
	};
}());

var dataArray={
		"正常工资薪金": "0101",
		"外籍人员正常工资薪金": "0102",
		"全年一次性奖金收入": "0103",
		"外籍人员数月奖金": "0104",
		"内退一次性补偿金": "0107",
		"解除劳动合同一次性补偿金": "0108",
		"个人股票期权行权收入": "0109",
		"企业年金": "0110",
		"提前退休一次性补贴": "0111",
		"个体工商户生产经营所得": "0200",
		"企事业单位承包、承租经营所得": "0300",
		"劳务报酬所得": "0400",
		"稿酬所得": "0500",
		"特许权使用费所得": "0600",
		"利息、股息、红利所得": "0700",
		"个人房屋出租所得": "0801",
		"其他财产租赁所得": "0899",
		"股票转让所得": "0901",
		"个人房屋转让所得": "0902",
		"限售股转让所得": "0903",
		"财产拍卖所得及回流文物拍卖所得": "0904",
		"股权转让所得": "0905",
		"其他财产转让所得": "0999",
		"偶然所得": "1000",
		"其他所得": "9900"
	};

/*用于去掉alert，防止程序被模态框打断，测试开发时可以去掉该代码*/
//function alert(msg){}