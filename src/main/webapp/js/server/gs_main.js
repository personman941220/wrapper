var gs_main = (function(){
	var _this,bcu,data,data_size,tables,table,info,node,dataConf,data_submit,iframe,submit_type,idx_jsf,tmp_idx;
	var idx = 0,idx_submit = 0,fjs_flag = false;;
    var sb_res = [];
    var sbmsg = "";
    var has_fjs = false;
    var has_run_zs = false;
    var fjs_hassb = false;
    var listenUrl = "";
    /*当前打开的表是否是添加*/
    var bAdd = true;
	var init = function(){
		_this = gs_main;
		bcu = new bstClientUtil();
		var idata = bcu.getData('login_config_data');
        data = $.parseJSON(idata);/*获取从login传来的申报数据*/
//        debugger;
        data = bcu.reOrderData(data);
        tables = bstClientUtil.data;/*获取报表模板*/
		data_size = data.length;/*获取报表数量*/
	};
	return {
		onload:function(){
			init();
			_this.tree_inited();/*监听左侧树加载，加载完成启动申报流程*/
		},
		tree_inited:function(){/*通过页面来判断主页是否加载完成*/
			setTimeout(function(){
				_this.run_open();
			},3000);
		},
		run_open:function(){/*打开表*/
		    if((data!=null&&data.length>1)||(data.length==1&&data[0].conf.submitorder==0)){
                info = data[idx++];/*当前报表传入数据*/
                dataConf = info.conf;
            }else{
                //data空，说明无附加税时提交失败或有附加税时附加税提交失败,先提交 非附加税，再提交附加税
				if(!has_run_zs){
                    _this.init_submit(1);
                }else{
					_this.openFjsNode();
                }
                return;
            }
//		    debugger;
			table = tables[info.id];/*当前报表模板*/
            // debugger;
            if(table!=null){
                node = bcu.getNode('hlwsbTreeModule','MKXK_MC',table.table,table.parent);/*国税树的key是name*/
			}else{
                //记录错误信息
                // sb_res[sb_res.length] = {type:4,id:info.id,msg:'无报表模板'};/*处理错误信息*/
                _this.doRecord(4,info.id,'无报表模板');
                _this.run_saved(-1);
                return;
            }
            if(node!=null){
                listenUrl = table.url;
                bcu.addHttpFilter({
                    url:listenUrl,
                    callback:'gs_main.run_write'
                });
                bcu.remoteCall(JSON.stringify({code:'100',data:{type:0,step:101,tableid:info.id}}));
                bcu.openNode('hlwsbTreeModule',node);
            }else {
                //记录错误信息
                // sb_res[sb_res.length] = {type:3,id:info.id,msg:'系统没有当前报表'};/*处理错误信息*/
                _this.doRecord(3,info.id,'系统没有当前报表');
                _this.run_saved(-1);
                return;
			}
        },
		run_write:function(res){/*填表并保存*/
			setTimeout(function(){
				//异常处理
				if(res!=null&&res!=""){
					if(res.code&&res.code==-1){
						_this.record(2,info.id,"网上税务局系统出现异常！");
                        _this.run_saved(-1);
						return;
					}
                    if (res.data.HEAD&&res.data.HEAD.SBBZT) {
                        bAdd = false;
                    }else{
                        bAdd = true;
					}
				    if(info.id=='101018001'){
				        //附加税先判断处理
                        iframe = bcu.findFrame();
                        var cellObj = iframe.contentWindow.DCellWeb1;
                        var tsxx = cellObj.getValByLabel("A2");
                        //未申报时才处理
                        // debugger;
                        if(tsxx.indexOf("附加税已申报")==-1){
                            gs_main.run_filldata();
                        }else{
                            //记录信息
                            // sb_res[sb_res.length] = {type:1,id:info.id,msg:tsxx};/*处理错误信息*/
                            fjs_hassb = true;
                            _this.doRecord(1,info.id,tsxx);
                            _this.run_saved(-1);
                            return;
                        }
                    }else if(dataConf&&dataConf.dofill==0){
                        gs_main.run_filldata(true);
                    }else{
                        gs_main.run_filldata();
                    }
                }else{
					//记录错误信息
                    // sb_res[sb_res.length] = {type:2,id:info.id,msg:'打开报表回填数据出错'};/*处理错误信息*/
                    _this.doRecord(2,info.id,'打开报表回填数据出错');
                    _this.run_saved(-1);
                    return;
				}
			},1000);
		},
        /* directDoSave 是否直接触发保存，不进行数据填充*/
        run_filldata:function(directDoSave){
            iframe = bcu.findFrame();
            listenUrl = table.saveUrl;
            if(!directDoSave){
                var modelData = bcu.fillModelData(info, table);
                var parsed_data = bcu.parse_data(info.id, modelData, node,iframe);
                bcu.fillData(info.id, parsed_data, iframe, table.cellCols);
            }
            //除附加税、增值税小规模减免税明细、一般企业 利润表、一般企业 现金流量表、一般企业 资产负债表、企业所得税 2表 外，
            // 其他表 res.data.HEAD.SBBZT 有值则保存时调用update接口，否则调用insert接口
            if((info.id=='101012007'||info.id=='101012008'||info.id=='10104111021'
				||info.id=='50100311001'||info.id=='50100311002'||info.id=='50100311003' 
                ||info.id=='103012601'||info.id=='10104111023')&&!bAdd){
                listenUrl = table.saveUrl_update;
            }
            bcu.addHttpFilter({
                url:listenUrl,
                callback:'gs_main.run_saved'
            });
            //重写申报填表界面alert，获取提示信息
            iframe.contentWindow.window.eval('function alert(msg){external.SetTempData("sbsavemsg",msg);}');
            iframe.contentWindow.window.eval('function confirm(msg){return true;}');
            // var flag = false;
            bcu.remoteCall(JSON.stringify({code:'100',data:{type:0,step:102,tableid:info.id}}));
            var flag = iframe.contentWindow[table.obj].onSave();
            // var rmsg = bcu.getData("sbsavemsg");
            // debugger;
            //处理onSave方法校验的 提示信息，包括保存接口返回的信息，只处理走重写方法情况，未走重写的交给监听接口处理
            // if(hasDoRes){
                // bcu.removeHttpFilter(listenUrl);
                // sbmsg = "";
                // sbmsg = bcu.getData("sbsavemsg");
                //记录错误信息
                // sb_res[sb_res.length] = {type:2,id:info.id,msg:sbmsg};/*处理错误信息*/
                // _this.doRecord(2,info.id,sbmsg);
                // _this.run_saved(1);
                // return;
            // }
        },
        setRes : function(msg){
            sbmsg = msg;
            _this.run_saved(1);
		},
		run_saved:function(res){/*已保存回调*/
            setTimeout(function(){
				// debugger;
				//处理保存接口返回的出错提示信息
				sbmsg = "";
				sbmsg = bcu.getData("sbsavemsg");
				bcu.setData("sbsavemsg","");
				if((res!=null&&res!=''&&res.code==1)||sbmsg=="保存成功"){/*错误的表在前头处理直接跳过，此处处理成功的报表*/
                    /*添加执行成功的报表*/
                    // sb_res[sb_res.length] = {type:1,id:info.id};
                    _this.doRecord(1,info.id,'保存成功');
				}else if(res.code&&res.code!=1&&res.msg.indexOf("已申报")==-1){
					//记录错误信息
					// sb_res[sb_res.length] = {type:2,id:info.id,msg:sbmsg};/*处理错误信息*/
                    _this.doRecord(2,info.id,sbmsg);
				}else if(res!=-1){
					// sb_res[sb_res.length] = {type:2,id:info.id,msg:'获取保存状态异常'};/*处理错误信息*/
					if(sbmsg!=""&&sbmsg.indexOf("已申报")!=-1){
                        _this.doRecord(1,info.id,sbmsg);
                    }else if(sbmsg!=""&&sbmsg.indexOf("已申报")==-1){
                        _this.doRecord(2,info.id,sbmsg);
                    }else{
                        _this.doRecord(2,info.id,'获取保存状态异常');
                    }
				}
				//考虑到附加税 在其他税种提交后才能保存提交，做此处理
				if(idx==data_size-1&&data[data_size-1].conf.submitorder==1){
					//有附加税，附加税以外税种先提交
					has_fjs = true;
					_this.init_submit(1);
					return;
				}else if(idx==data_size&&data[data_size-1].conf.submitorder==0){
					//无附加税，附加税以外税种提交
					_this.init_submit(1);
					return;
				}else if(idx==data_size&&data[data_size-1].conf.submitorder==1){/*申报完成处理*/
					//有附加税，附加税提交
					_this.init_submit(0);
					return;
				}else{/*启动下一张表*/
					gs_main.run_open();
				}
            },1500);
		},
		init_submit:function(type){/*跳转至申报提交页面,type是0则填报附加税，type是1则填报非附加税*/
			if(sb_res.length!=0){
				for(var i = 0;i<sb_res.length;i++){
					if(sb_res[i].type!=1&&sb_res[i].type!=3){
						_this.run_submit_done(2,'申报失败，不能提交');
						return;
					}
				}
			}
			submit_type = type;/*type是0则附加税提交，type是1则其他税种提交*/
			bcu.addHttpFilter({/*页面加载完成的请求监听*/
				url:bstClientUtil.gs_submit_list,
				callback:'gs_main.start_submit'
			});
			var node = bcu.getNode('hlwsbTreeModule','MKXK_MC','网上申报','申报、实时扣款');
            bcu.remoteCall(JSON.stringify({code:'100',data:{type:0,step:103,msg:"开始申报提交"}}));
			bcu.openNode('hlwsbTreeModule',node);
		},
		start_submit:function(res){/*获取要提交的税种列表*/
			if(res==''){
				_this.run_submit_done(2,'提交超时');
				return;
			}
			setTimeout(function(){
				if(submit_type==0){
					_this.run_submit_fjs(1);/*附加税提交*/
				}else{
					_this.run_submit(1);/*除附加税外提交*/
				}
			},1000);
		},
		run_submit_fjs:function(res){/*提交附加税*/
			setTimeout(function(){
				iframe = bcu.findFrame();
				iframe.contentWindow.window.eval('function confirm(msg){return true;}');/*重写confirm，直接提交*/
				data_submit = $(iframe.contentWindow.document.body).find("#tbList tr");/*记录当前页面序号*/
				// debugger;
				if(res==''){/*两种情况，一种是保存超时，一种是由于某种表的原因没有保存*/
					_this.run_submit_done(2,'提交超时',true);
					return;
				}
				var msg = iframe.contentWindow.window.$('#tip').html();
				if(msg!=null&&msg!=''&&msg.indexOf('申报成功')<0){/*提交报错*/
					_this.run_submit_done(2,msg,true);
					return;
				}
				iframe.contentWindow.window.$('#tip').html('')/*清空错误信息*/
				iframe.contentWindow.window.$.dialog({id:'winTbsxsm'}).close();/*关闭弹框*/
				setTimeout(function(){/*为页面操作按钮提供时间*/
					if(fjs_flag||fjs_hassb){/*提交执行完成 或者 附加税不需要申报*/
						_this.run_submit_done(1,'提交成功');
						// debugger;
						return;
					}
					for(var i = 0;i<data_submit.length;i++){
						if($(data_submit[i]).find('[nodeIndex="3"]')[0].outerText.indexOf("附加税")>=0){/*判断是否是附加税*/
							$(data_submit[i]).find('td span').find("input[type=checkbox]").click();/*选中要提交的项*/
							fjs_flag = true;
							break;
						}
					}
					if(!fjs_flag){/*如果没有附加税提交，则认为提交成功*/
						_this.run_submit_done(1,'提交成功');
						return;
					}
					setTimeout(function(){/*为页面操作按钮提供时间*/
						bcu.addHttpFilter({/*页面加载完成的请求监听*/
							url:bstClientUtil.gs_submit_url,
							callback:'gs_main.run_submit_fjs'
						});
		                bcu.remoteCall(JSON.stringify({code:'100',data:{type:0,step:106,msg:"附加税提交"}}));
		                idx_submit++;/*跑下一户*/
						iframe.contentWindow['sb'].onToolbarClick(1);/*申报提交*/
					},1500);
				},1500);
			},1500);
		},
		run_submit:function(res){/*循环递归执行提交，除附加税*/
			setTimeout(function(){
				iframe = bcu.findFrame();
				iframe.contentWindow.window.eval('function confirm(msg){return true;}');/*重写confirm，直接提交*/
				data_submit = $(iframe.contentWindow.document.body).find("#tbList tr");/*记录当前页面序号*/
				if(res==''){/*两种情况，一种是保存超时，一种是由于某种表的原因没有保存*/
					_this.run_submit_done(2,'提交超时',true);
					return;
				}
				var msg = iframe.contentWindow.window.$('#tip').html();/*处理上个循环结果*/
				if(msg!=null&&msg!=''&&msg.indexOf('申报成功')<0){/*提交报错*/
					_this.run_submit_done(2,msg,true);
					return;
				}
				iframe.contentWindow.window.$('#tip').html('')/*清空错误信息*/
				iframe.contentWindow.window.$.dialog({id:'winTbsxsm'}).close();/*关闭弹框*/
				setTimeout(function(){/*为页面操作按钮提供时间*/
					if(idx_submit>=data_submit.length&&idx_jsf==null){/*提交执行完成，且建设费提交完成*/
						// debugger;
	                    has_run_zs = true;
						_this.run_open();
						return;
					}else if(idx_submit==data_submit.length&&idx_jsf!=null){/*执行文化事业建设费，需要放到最后执行*/
						tmp_idx = idx_jsf;/*当前执行建设费*/
						idx_jsf = null;/*置空建设费*/
					}else{/*普通执行流程*/
						tmp_idx = idx_submit;
					}
					if($(data_submit[tmp_idx]).find('[nodeIndex="3"]')[0].outerText.indexOf("附加税")>=0
							||$(data_submit[tmp_idx]).find('[nodeIndex="14"]')[0].outerText.indexOf("申报成功")>=0){/*判断是否是附加税*，判断是否已经申报成功*/
						idx_submit++;/*跑下一户*/
						_this.run_submit(1);
						return;
					}else if(idx_submit<data_submit.length&&$(data_submit[tmp_idx]).find('[nodeIndex="3"]')[0].outerText.indexOf("文化事业")>=0){/*标记是否是文化事业建设费，延后，如果最后走，则直接跳过*/
						idx_jsf = tmp_idx;/*记录文化事业建设费id*/
						idx_submit++;/*跑下一户*/
						_this.run_submit(1);
						return;
					}
					$(data_submit[tmp_idx]).find('td span').find("input[type=checkbox]").click();/*选中要提交的项*/
					setTimeout(function(){/*为页面操作按钮提供时间*/
						bcu.addHttpFilter({/*页面加载完成的请求监听*/
							url:bstClientUtil.gs_submit_url,
							callback:'gs_main.run_submit'
						});
		                bcu.remoteCall(JSON.stringify({code:'100',data:{type:0,step:104,msg:$(data_submit[tmp_idx]).find('[nodeIndex="3"]')[0].outerText+"提交"}}));
		                idx_submit++;/*跑下一户*/
						iframe.contentWindow['sb'].onToolbarClick(1);/*申报提交*/
					},1500);
				},1500);
			},1500);
		},
		run_submit_done:function(code,msg,flag){/*提交失败处理*/
			sb_res[sb_res.length] = {type:code,id:'99999',msg:msg};/*处理错误信息*/
			if(has_fjs&&flag){/*has_fjs判断是否存在附加税，用于报错时判断是否需要添加附加税保存失败*/
				sb_res[sb_res.length] = {type:2,id:'101018001',msg:'提交未成功，附加税未申报'};/*附加税还没有保存*/
			}
			//申报结束 ，国税申报结果获取  
//			gds_sbinfoMain.gsInfo();
//			// sb_res = _this.dealSbRes(sb_res);/*处理增值税重复报表*/
            var done = {code:5,data:sb_res};
            bcu.remoteCall(JSON.stringify(done));/*返回申报结果*/
		},
		doRecord:function(code,tabid,msg){
            var zzsArr = ["101012007","101012008","101012009"];
            var qysdsArr = ["10104111021","10104111022","10104111023","10104111024"];
            var isSuccess = true;
            var isSuccessQysds = true;
            
            /*增值税*/
            for(var i=0;i<zzsArr.length;i++){
				if(tabid==zzsArr[i]&&code!=1&&code!=3){
                    isSuccess = false;
					 break;
				}
            }
            if(!isSuccess) {
                for (var j = 0; j < zzsArr.length; j++) {
                    /*写入增值税 出错信息*/
                    _this.record(2, zzsArr[j], msg);
				}
                var isInsz;
                var inx;
                do{
                    isInsz = false;
                    inx = idx;
                    for (var j = 0; j < zzsArr.length; j++) {
                        if(data[inx].id==zzsArr[j]){
                            isInsz = true;
                            break;
                        }
                    }
                    idx++;
                }while (isInsz);
                if(!isInsz){
                    /*删除监听，避免造成超时影响*/
                    bcu.removeHttpFilter(listenUrl);
                    return;
                }
            }

            /*企业所得税*/
            for(var i=0;i<qysdsArr.length;i++){
				if(tabid==qysdsArr[i]&&code!=1&&code!=3){
                    isSuccessQysds = false;
					 break;
				}
            }
            if(!isSuccessQysds) {
                for (var j = 0; j < qysdsArr.length; j++) {
                    /*写入企业所得税 出错信息*/
                    _this.record(2, qysdsArr[j], msg);
				}
				var isInsz;
                var inx;
                do{
                    isInsz = false;
                    inx = idx;
                    for (var j = 0; j < qysdsArr.length; j++) {
                        if(data[inx].id==qysdsArr[j]){
                            isInsz = true;
							 break;
                        }
                    }
                    idx++;
                }while (isInsz); 
				if(!isInsz){
                    /*删除监听，避免造成超时影响*/
                    bcu.removeHttpFilter(listenUrl);
                    return;
				}
            }

            /* 增值税或企业所得税 执行成功的记录或其他税种的执行状态信息记录 */
            _this.record(code, tabid, msg);
            return;
		},
		/*申报表保存时记录信息，同一个表不会重复记录信息，会重写已经存在的记录信息*/
		record:function(code,tabid,msg){
		    // debugger;
		    if(sb_res.length==0){
                sb_res[sb_res.length] = {type:code,id:tabid,msg:msg};
                return;
            }
            var hasThisTab = false;
        	for(var i=0;i<sb_res.length;i++){
        	    if(tabid==sb_res[i].id){
                    hasThisTab = true;
                    //有当前表对应的记录信息时就重写记录信息
                    sb_res[i].type=code;
                    sb_res[i].msg=msg;
                    break;
                }
            }
            //无当前表记录时添加记录
            if(!hasThisTab){
                sb_res[sb_res.length] = {type:code,id:tabid,msg:msg};
            }
        },
		openFjsNode:function () {
            //尝试打开附加税节点，获取附加税申报状态
			var fjsTable = bstClientUtil.data["101018001"];
            node = bcu.getNode('hlwsbTreeModule','MKXK_MC',fjsTable.table,fjsTable.parent);
            if(node!=null){
                bcu.addHttpFilter({
                    url:fjsTable.url,
                    callback:'gs_main.openFjsNodeRes'
                });
                bcu.remoteCall(JSON.stringify({code:'100',data:{type:0,step:105,msg:"打开附加税节点"}}));
                bcu.openNode('hlwsbTreeModule',node);
            }
        },
        openFjsNodeRes:function (res) {
            setTimeout(function(){
                if(res!=null&&res!=""){
                    iframe = bcu.findFrame();
                    var cellObj = iframe.contentWindow.DCellWeb1;
                    var tsxx = cellObj.getValByLabel("A2");
                    //未申报时才处理
                    // debugger;
                    if(tsxx.indexOf("附加税已申报")!=-1){
                        _this.doRecord(1,"101018001","附加税已申报！");
						fjs_hassb = true;
                    }
                    _this.init_submit(0);
                }else{
                    _this.run_submit_done(2,"提交超时");
                    return;
				}
			},500);
        }
	};
}());

/*
 * c.getNode('hlwsbTreeModule','MKXK_MC','网上申报','申报、实时扣款')
 * openNode('hlwsbTreeModule',a)
 * /hlwsb/sbkk/tsxCheck.do
 * $(iframeObj.contentWindow.document.body).find("#tbList tr")
 * 	$(iframe.contentWindow.document.body).find("#tbList tr").each(function(j){
		$(this).find('td span').find("input[type=checkbox]").click();
	})
 * iframeObj.contentWindow['sb'].onToolbarClick(1);
 * 
 * 
 * */