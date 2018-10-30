/*根据零模板进行数据填充，方便parse_data方法进行数据转换*/
bstClientUtil.prototype.fillModelData = function(info, table) {
    if(info!=null&&info.list!=null&&info.list.length>0&&table.model.length>0){
        var list = info.list;
        //财务报表相关6个表 ，企业所得税，增值税 纳税申报 附列 小规模，文化事业建设费，附加税，等行次跟输入列单一对应的表可使用此规则填充
        if(info.id=='50100311001' || info.id=='50100311002' || info.id=='50100311003' 
			|| info.id=='50100201001' || info.id=='50100201002' || info.id=='50100201003' 
			|| info.id=='10104111021' || info.id=='101012008' || info.id=='103012601' || info.id=='101018001'){
            for(var j = 0;j<list.length;j++){
                try{
                    // debugger;
                    if(info.id=='10104111021'||info.id=='101018001'){
                    	//需处理 企业所得税 QMCYRS,附加税 LXFS, 等无行次的参数
                    	if(list[j].col){
                            table.model[list[j].col-1]["endbal"] = list[j].value;
                        }else{
                            table.model[list[j].name] = list[j].value;
						}
                    }else{
                        table.model[list[j].col-1]["endbal"] = list[j].value;
                    }
                }catch(e){

                }
            }
		}else{/*增值税 纳税申报 小规模，小规模 减免税明细表*/
            for(var j = 0;j<list.length;j++){
                try{
                    // debugger;
                    table.model[list[j].col-1][list[j].name] = list[j].value;
                }catch(e){

                }
            }
		}
	}
	return table.model;
}
/*解析取数工具返回数组，转换成申报可以直接填写的数据个数，按报表代码解析数据并返回,由于需要兼容取数工具转换成报表数组，所以统一处理*/
bstClientUtil.prototype.parse_data = function(sbbzlDm, data, node,iframe) {
	var dataInfo = {};
	var SSSQ_Z = node.other.SSSQ_Z;
	var SSSQ_Q = node.other.SSSQ_Q;
	var NSRSBH = iframe.contentWindow.hlwsbTools.getUserZh();
	var SBBZL_DM = node.id;
	var SBBXH = NSRSBH + SSSQ_Q.replace(new RegExp(/-/gm) ,"") + SSSQ_Z.replace(new RegExp(/-/gm) ,"") + SBBZL_DM;
	var DJXH = iframe.contentWindow.hlwsbTools.getDjxh();
	dataInfo.HEAD = {
		"SSSQ_Z" : SSSQ_Z,
		"SSSQ_Q" : SSSQ_Q,
		"NSRSBH" : NSRSBH,
		"SBBXH"  : SBBXH,
		"DJXH"   : DJXH,
		"SBBZL_DM":SBBZL_DM
	};

	var ary = new Array();
	var obj = null;
	/*小企业资产负债表*/
	if (sbbzlDm == 50100311001) {
		/*ary是数组，.HC对象从1开始，报表行次共计32*/
		ary[ary.length] = {
			HC:1
		};
		ary[ary.length] = {
			HC:2,
			ZCQMYE:data[0].endbal,
			FZQMYE:data[30].endbal
		};
		ary[ary.length] = {
			HC:3,
			ZCQMYE:data[1].endbal,
			FZQMYE:data[31].endbal
		};
		ary[ary.length] = {
			HC:4,
			ZCQMYE:data[2].endbal,
			FZQMYE:data[32].endbal
		};
		ary[ary.length] = {
			HC:5,
			ZCQMYE:data[3].endbal,
			FZQMYE:data[33].endbal
		};
		ary[ary.length] = {
			HC:6,
			ZCQMYE:data[4].endbal,
			FZQMYE:data[34].endbal
		};
		ary[ary.length] = {
			HC:7,
			ZCQMYE:data[5].endbal,
			FZQMYE:data[35].endbal
		};
		ary[ary.length] = {
			HC:8,
			ZCQMYE:data[6].endbal,
			FZQMYE:data[36].endbal
		};
		ary[ary.length] = {
			HC:9,
			ZCQMYE:data[7].endbal,
			FZQMYE:data[37].endbal
		};
		ary[ary.length] = {
			HC:10,
			ZCQMYE:data[8].endbal,
			FZQMYE:data[38].endbal
		};
		ary[ary.length] = {
			HC:11,
			ZCQMYE:data[9].endbal,
			FZQMYE:data[39].endbal
		};
		ary[ary.length] = {
			HC:12,
			ZCQMYE:data[10].endbal
		};
		ary[ary.length] = {
			HC:13,
			ZCQMYE:data[11].endbal
		};
		ary[ary.length] = {
			HC:14,
			ZCQMYE:data[12].endbal,
			FZQMYE:data[41].endbal
		};
		ary[ary.length] = {
			HC:15,
			ZCQMYE:data[13].endbal,
			FZQMYE:data[42].endbal
		};
		ary[ary.length] = {
			HC:16,
			FZQMYE:data[43].endbal
		};
		ary[ary.length] = {
			HC:17,
			FZQMYE:data[44].endbal
		};
		ary[ary.length] = {
			HC:18,
			ZCQMYE:data[15].endbal
		};
		ary[ary.length] = {
			HC:19,
			ZCQMYE:data[16].endbal
		};
		ary[ary.length] = {
			HC:20,
			ZCQMYE:data[17].endbal
		};
		ary[ary.length] = {
			HC:21,
			ZCQMYE:data[18].endbal
		};
		ary[ary.length] = {
			HC:22,
			ZCQMYE:data[19].endbal
		};
		ary[ary.length] = {
			HC:23,
			ZCQMYE:data[20].endbal
		};
		ary[ary.length] = {
			HC:24,
			ZCQMYE:data[21].endbal
		};
		ary[ary.length] = {
			HC:25,
			ZCQMYE:data[22].endbal
		};
		ary[ary.length] = {
			HC:26,
			ZCQMYE:data[23].endbal
		};
		ary[ary.length] = {
			HC:27,
			ZCQMYE:data[24].endbal,
			FZQMYE:data[47].endbal
		};
		ary[ary.length] = {
			HC:28,
			ZCQMYE:data[25].endbal,
			FZQMYE:data[48].endbal
		};
		ary[ary.length] = {
			HC:29,
			ZCQMYE:data[26].endbal,
			FZQMYE:data[49].endbal
		};
		ary[ary.length] = {
			HC:30,
			ZCQMYE:data[27].endbal,
			FZQMYE:data[50].endbal
		};
		ary[ary.length] = {
			HC:31
		};
		ary[ary.length] = {
			HC:32
		};
	}else if (sbbzlDm == 50100311002) {/*利润表 月报 小企业*/
		/*ary是数组，.HC对象从1开始，报表行次共计32*/
		ary[ary.length] = {
			HC:1,
			BYJE:data[0].endbal
		};
		ary[ary.length] = {
			HC:2,
			BYJE:data[1].endbal
		};
		ary[ary.length] = {
			HC:3,
			BYJE:data[2].endbal
		};
		ary[ary.length] = {
			HC:4,
			BYJE:data[3].endbal
		};
		ary[ary.length] = {
			HC:5,
			BYJE:data[4].endbal
		};
		ary[ary.length] = {
			HC:6,
			BYJE:data[5].endbal
		};
		ary[ary.length] = {
			HC:7,
			BYJE:data[6].endbal
		};
		ary[ary.length] = {
			HC:8,
			BYJE:data[7].endbal
		};
		ary[ary.length] = {
			HC:9,
			BYJE:data[8].endbal
		};
		ary[ary.length] = {
			HC:10,
			BYJE:data[9].endbal
		};
		ary[ary.length] = {
			HC:11,
			BYJE:data[10].endbal
		};
		ary[ary.length] = {
			HC:12,
			BYJE:data[11].endbal
		};
		ary[ary.length] = {
			HC:13,
			BYJE:data[12].endbal
		};
		ary[ary.length] = {
			HC:14,
			BYJE:data[13].endbal
		};
		ary[ary.length] = {
			HC:15,
			BYJE:data[14].endbal
		};
		ary[ary.length] = {
			HC:16,
			BYJE:data[15].endbal
		};
		ary[ary.length] = {
			HC:17,
			BYJE:data[16].endbal
		};
		ary[ary.length] = {
			HC:18,
			BYJE:data[17].endbal
		};
		ary[ary.length] = {
			HC:19,
			BYJE:data[18].endbal
		};
		ary[ary.length] = {
			HC:20,
			BYJE:data[19].endbal
		};
		ary[ary.length] = {
			HC:21
		};
		ary[ary.length] = {
			HC:22,
			BYJE:data[21].endbal
		};
		ary[ary.length] = {
			HC:23,
			BYJE:data[22].endbal
		};
		ary[ary.length] = {
			HC:24,
			BYJE:data[23].endbal
		};
		ary[ary.length] = {
			HC:25,
			BYJE:data[24].endbal
		};
		ary[ary.length] = {
			HC:26,
			BYJE:data[25].endbal
		};
		ary[ary.length] = {
			HC:27,
			BYJE:data[26].endbal
		};
		ary[ary.length] = {
			HC:28,
			BYJE:data[27].endbal
		};
		ary[ary.length] = {
			HC:29,
			BYJE:data[28].endbal
		};
		ary[ary.length] = {
			HC:30
		};
		ary[ary.length] = {
			HC:31,
			BYJE:data[30].endbal
		};
		ary[ary.length] = {
			HC:32
		};
	} else if (sbbzlDm == 50100312002) {/*利润表 年报 小企业*/
		for (var i = 0; i < 33; i++) {
			obj = {};
			if (i >= 1) {
				obj.BNLJJE = data[i - 1].endbal;
				obj.SNJE = "";
			}
			obj.HC = i;
			ary[ary.length] = obj;
		}
	} else if (sbbzlDm == 50100311003) {/*现金流量表 月报 小企业*/
		/*ary是数组，.HC对象从1开始，报表行次共计25*/
		ary[ary.length] = {
			HC:1
		};
		ary[ary.length] = {
			HC:2,
			BYJE:data[0].endbal
		};
		ary[ary.length] = {
			HC:3,
			BYJE:data[1].endbal
		};
		ary[ary.length] = {
			HC:4,
			BYJE:data[2].endbal
		};
		ary[ary.length] = {
			HC:5,
			BYJE:data[3].endbal
		};
		ary[ary.length] = {
			HC:6,
			BYJE:data[4].endbal
		};
		ary[ary.length] = {
			HC:7,
			BYJE:data[5].endbal
		};
		ary[ary.length] = {
			HC:8
		};
		ary[ary.length] = {
			HC:9
		};
		ary[ary.length] = {
			HC:10,
			BYJE:data[7].endbal
		};
		ary[ary.length] = {
			HC:11,
			BYJE:data[8].endbal
		};
		ary[ary.length] = {
			HC:12,
			BYJE:data[9].endbal
		};
		ary[ary.length] = {
			HC:13,
			BYJE:data[10].endbal
		};
		ary[ary.length] = {
			HC:14,
			BYJE:data[11].endbal
		};
		ary[ary.length] = {
			HC:15
		};
		ary[ary.length] = {
			HC:16
		};
		ary[ary.length] = {
			HC:17,
			BYJE:data[13].endbal
		};
		ary[ary.length] = {
			HC:18,
			BYJE:data[14].endbal
		};
		ary[ary.length] = {
			HC:19,
			BYJE:data[15].endbal
		};
		ary[ary.length] = {
			HC:20,
			BYJE:data[16].endbal
		};
		ary[ary.length] = {
			HC:21,
			BYJE:data[17].endbal
		};
		ary[ary.length] = {
			HC:22
		};
		ary[ary.length] = {
			HC:23
		};
		ary[ary.length] = {
			HC:24,
			BYJE:data[20].endbal
		};
		ary[ary.length] = {
			HC:25
		};
	} 
	/*A101010一般企业收入明细表（年报）和A102010一般企业成本支出明细表*/
	else if (sbbzlDm == 10104112003 || sbbzlDm == 10104112005) {
		for (var i = 0; i < 27; i++) {
			obj = {};
			if(i>=1){
				obj.JE = data[i-1].endbal;
			}
			obj.HC = i;
			ary[ary.length] = obj;
		}
	} 
	/*A104000期间费用明细表 --excel导入*/
	else if (sbbzlDm == 10104112008 && external.Get_NameStrVar('data_way')==0) {
		for (var i = 0; i < data.length; i++) {
			obj = {};
			obj.XSFY = data[i].col1;
			obj.JWZF = data[i].col2;
			obj.GLFY = data[i].col3;
			obj.GLJWZF = data[i].col4;
			obj.CWFY = data[i].col5;
			obj.CWJWZF = data[i].col6;
			obj.HC = data[i].row;
			ary[ary.length] = obj;
		}
	}
	/*A104000期间费用明细表 --取数工具*/
	else if (sbbzlDm == 10104112008 && external.Get_NameStrVar('data_way')!=0) {
		for (var i = 0; i < data.length; i++) {
			obj = {};
			obj.XSFY = data[i].sfee;
			obj.JWZF = "";
			obj.GLFY = data[i].mfee;
			obj.GLJWZF = "";
			obj.CWFY = data[i].ffee;
			obj.CWJWZF = "";
			obj.HC = data[i].row;
			ary[ary.length] = obj;
		}
	} else if (sbbzlDm == 50100201003) {/*一般企业现金流量表*/
		ary[ary.length] = {
			HC:1
		};
		ary[ary.length] = {
			HC:2,
			BQJE:data[1].endbal
		};
		ary[ary.length] = {
			HC:3,
			BQJE:data[2].endbal
		};
		ary[ary.length] = {
			HC:4,
			BQJE:data[3].endbal
		};
		ary[ary.length] = {
			HC:5
		};
		ary[ary.length] = {
			HC:6,
			BQJE:data[5].endbal
		};
		ary[ary.length] = {
			HC:7,
			BQJE:data[6].endbal
		};
		ary[ary.length] = {
			HC:8,
			BQJE:data[7].endbal
		};
		ary[ary.length] = {
			HC:9,
			BQJE:data[8].endbal
		};
		ary[ary.length] = {
			HC:10
		};
		ary[ary.length] = {
			HC:11
		};
		ary[ary.length] = {
			HC:12
		};
		ary[ary.length] = {
			HC:13,
			BQJE:data[12].endbal
		};
		ary[ary.length] = {
			HC:14,
			BQJE:data[13].endbal
		};
		ary[ary.length] = {
			HC:15,
			BQJE:data[14].endbal
		};
		ary[ary.length] = {
			HC:16,
			BQJE:data[15].endbal
		};
		ary[ary.length] = {
			HC:17,
			BQJE:data[16].endbal
		};
		ary[ary.length] = {
			HC:18
		};
		ary[ary.length] = {
			HC:19,
			BQJE:data[18].endbal
		};
		ary[ary.length] = {
			HC:20,
			BQJE:data[19].endbal
		};
		ary[ary.length] = {
			HC:21,
			BQJE:data[20].endbal
		};
		ary[ary.length] = {
			HC:22,
			BQJE:data[21].endbal
		};
		ary[ary.length] = {
			HC:23
		};
		ary[ary.length] = {
			HC:24
		};
		ary[ary.length] = {
			HC:25
		};
		ary[ary.length] = {
			HC:26,
			BQJE:data[25].endbal
		};
		ary[ary.length] = {
			HC:27,
			BQJE:data[26].endbal
		};
		ary[ary.length] = {
			HC:28,
			BQJE:data[27].endbal
		};
		ary[ary.length] = {
			HC:29
		};
		ary[ary.length] = {
			HC:30,
			BQJE:data[29].endbal
		};
		ary[ary.length] = {
			HC:31,
			BQJE:data[30].endbal
		};
		ary[ary.length] = {
			HC:32,
			BQJE:data[31].endbal
		};
		ary[ary.length] = {
			HC:33
		};
		ary[ary.length] = {
			HC:34
		};
		ary[ary.length] = {
			HC:35,
			BQJE:data[34].endbal
		};
		ary[ary.length] = {
			HC:36
		};
		ary[ary.length] = {
			HC:37,
			BQJE:data[36].endbal
		};
		ary[ary.length] = {
			HC:38
		};
	} else if (sbbzlDm == 50100702001) {
		for (var i = 0; i < data.length; i++) {
			obj = {};
			obj.QMZMYE = data[i].endbal;
			obj.QMSJ = data[i].col2;
			obj.HC = data[i].row;
			ary[ary.length] = obj;
		}
	} else if (sbbzlDm == 50100702002) {
		for (var i = 0; i < data.length; i++) {
			obj = {};
			obj.QMZMYE = data[i].col1;
			obj.HC = data[i].row;
			ary[ary.length] = obj;
		}
	} else if (sbbzlDm == 50100702003) {
		for (var i = 0; i < data.length; i++) {
			obj = {};
			obj.QMZMYE = data[i].col1;
			obj.QMSJ = data[i].col2;
			obj.HC = data[i].row;
			ary[ary.length] = obj;
		}
	} else if (sbbzlDm == 50100702004) {
		for (var i = 0; i < data.length; i++) {
			obj = {};
			obj.YJ = data[i].col1;
			obj.LJZJ = data[i].col2;
			obj.HC = data[i].row;
			ary[ary.length] = obj;
		}
	} else if (sbbzlDm == 50100702005) {
		for (var i = 0; i < data.length; i++) {
			obj = {};
			obj.QMZMYE = data[i].endbal;
			obj.HC = data[i].row;
			ary[ary.length] = obj;
		}
	} else if (sbbzlDm == 50100702006) {
		for (var i = 0; i < data.length; i++) {
			obj = {};
			obj.QMZMYE = data[i].endbal;
			obj.HC = data[i].row;
			ary[ary.length] = obj;
		}
	} else if (sbbzlDm == 50100702007) {
		for (var i = 0; i < data.length; i++) {
			obj = {};
			obj.BNJE = data[i].endbal;
			obj.HC = data[i].row;
			ary[ary.length] = obj;
		}
	}
	/* 减免所得税额明细表  */
	else if (sbbzlDm == 10104111007) {
		for (var i = 0; i < data.length; i++) {
			obj = {};
			obj.BQJE = data[i].endbal;
			obj.HC = data[i].row;
			ary[ary.length] = obj;
		}
	}
	/*企业所得税*/
	else if(sbbzlDm==10104111021) {
		/*ary是数组，.HC对象从1开始，报表行次共计21*/
		ary[ary.length] = {
			HC:1,
			LJJE:data[0].endbal
		};
		ary[ary.length] = {
			HC:2,
			LJJE:data[1].endbal
		};
		ary[ary.length] = {
			HC:3,
			LJJE:data[2].endbal
		};
		ary[ary.length] = {
			HC:4,
			LJJE:data[3].endbal
		};
		ary[ary.length] = {
			HC:5,
			LJJE:data[4].endbal
		};
		ary[ary.length] = {
			HC:6
		};
		ary[ary.length] = {
			HC:7
		};
		ary[ary.length] = {
			HC:8
		};
		ary[ary.length] = {
			HC:9
		};
		ary[ary.length] = {
			HC:10
		};
		ary[ary.length] = {
			HC:11
		};
		ary[ary.length] = {
			HC:12
		};
		ary[ary.length] = {
			HC:13
		};
		ary[ary.length] = {
			HC:14
		};
		ary[ary.length] = {
			HC:15
		};
		ary[ary.length] = {
			HC:16
		};
		ary[ary.length] = {
			HC:17
		};
		ary[ary.length] = {
			HC:18
		};
		ary[ary.length] = {
			HC:19
		};
		ary[ary.length] = {
			HC:20
		};
		ary[ary.length] = {
			HC:21
		};
		ary[ary.length] = {
			HC:22
		};
        dataInfo.HEAD.QMCYRS = data.QMCYRS;
	}
	/* 不征税收入和税基类减免应纳税所得额明细表  */
	else if (sbbzlDm == 10104111005) {
		ary = data;
	}
	/* 固定资产加速折旧（扣除）明细表  */
	else if (sbbzlDm == 10104111009) {
		for (var i = 0; i < data.length; i++) {
			obj = {};
			obj.COL01 = data[i].col1;
			obj.COL02 = data[i].col2;
			obj.COL03 = data[i].col3;
			obj.COL04 = data[i].col4;
			obj.COL05 = data[i].col5;
			obj.COL06 = data[i].col6;
			obj.COL08 = data[i].col8;
			obj.COL09 = data[i].col9;
			obj.COL13 = data[i].col13;
			obj.COL14 = data[i].col14;
			obj.HC = data[i].row;
			ary[ary.length] = obj;
		}
	}
	/* 技术成果投资入股企业所得税递延纳税备案表 */
	else if (sbbzlDm == 10104111010) {
		for (var i = 0; i < data.length; i++) {
			obj = {};
			obj.COL01 = data[i].col1;
			obj.COL02 = data[i].col2;
			obj.COL03 = data[i].col3;
			obj.COL04 = data[i].col4;
			obj.COL05 = data[i].col5;
			obj.COL06 = data[i].col6;
			obj.COL08 = data[i].col8;
			obj.COL09 = data[i].col9;
			obj.COL10 = data[i].col10;
			obj.COL11 = data[i].col11;
			obj.COL12 = data[i].comment;
			obj.HC = data[i].row;
			ary[ary.length] = obj;
		}
	}
	/* 资产负债表（月季）（一般企业）*/
	else if (sbbzlDm == 50100201001) {
		/*ary是数组，.HC对象从1开始，报表行次共计41*/
		ary[ary.length] = {
			HC:1
		};
		ary[ary.length] = {
			HC:2,
			ZCQMYE:data[0].endbal,
			FZQMYE:data[39].endbal
		};
		ary[ary.length] = {
			HC:3,
			ZCQMYE:data[1].endbal,
			FZQMYE:data[40].endbal
		};
		ary[ary.length] = {
			HC:4,
			ZCQMYE:data[2].endbal,
			FZQMYE:data[41].endbal
		};
		ary[ary.length] = {
			HC:5,
			ZCQMYE:data[3].endbal,
			FZQMYE:data[42].endbal
		};
		ary[ary.length] = {
			HC:6,
			ZCQMYE:data[4].endbal,
			FZQMYE:data[43].endbal
		};
		ary[ary.length] = {
			HC:7,
			ZCQMYE:data[5].endbal,
			FZQMYE:data[44].endbal
		};
		ary[ary.length] = {
			HC:8,
			ZCQMYE:data[6].endbal,
			FZQMYE:data[45].endbal
		};
		ary[ary.length] = {
			HC:9,
			ZCQMYE:data[7].endbal,
			FZQMYE:data[46].endbal
		};
		ary[ary.length] = {
			HC:10,
			ZCQMYE:data[8].endbal,
			FZQMYE:data[47].endbal
		};
		ary[ary.length] = {
			HC:11,
			ZCQMYE:data[9].endbal,
			FZQMYE:data[48].endbal
		};
		ary[ary.length] = {
			HC:12,
			ZCQMYE:data[10].endbal,
			FZQMYE:data[49].endbal
		};
		ary[ary.length] = {
			HC:13,
			ZCQMYE:data[11].endbal,
			FZQMYE:data[50].endbal
		};
		ary[ary.length] = {
			HC:14,
			ZCQMYE:data[12].endbal,
			FZQMYE:data[51].endbal
		};
		ary[ary.length] = {
			HC:15,
			FZQMYE:data[52].endbal
		};
		ary[ary.length] = {
			HC:16
		};
		ary[ary.length] = {
			HC:17,
			ZCQMYE:data[14].endbal
		};
		ary[ary.length] = {
			HC:18,
			ZCQMYE:data[15].endbal,
			FZQMYE:data[54].endbal
		};
		ary[ary.length] = {
			HC:19,
			ZCQMYE:data[16].endbal
		};
		ary[ary.length] = {
			HC:20,
			ZCQMYE:data[17].endbal,
			FZQMYE:data[56].endbal
		};
		ary[ary.length] = {
			HC:21,
			ZCQMYE:data[18].endbal,
			FZQMYE:data[57].endbal
		};
		ary[ary.length] = {
			HC:22,
			ZCQMYE:data[19].endbal,
			FZQMYE:data[58].endbal
		};
		ary[ary.length] = {
			HC:23,
			ZCQMYE:data[20].endbal,
			FZQMYE:data[59].endbal
		};
		ary[ary.length] = {
			HC:24,
			ZCQMYE:data[21].endbal,
			FZQMYE:data[60].endbal
		};
		ary[ary.length] = {
			HC:25,
			ZCQMYE:data[22].endbal,
			FZQMYE:data[61].endbal
		};
		ary[ary.length] = {
			HC:26,
			ZCQMYE:data[23].endbal,
			FZQMYE:data[62].endbal
		};
		ary[ary.length] = {
			HC:27,
			ZCQMYE:data[24].endbal,
			FZQMYE:data[63].endbal
		};
		ary[ary.length] = {
			HC:28,
			ZCQMYE:data[25].endbal
		};
		ary[ary.length] = {
			HC:29,
			ZCQMYE:data[26].endbal
		};
		ary[ary.length] = {
			HC:30,
			ZCQMYE:data[27].endbal
		};
		ary[ary.length] = {
			HC:31,
			ZCQMYE:data[28].endbal,
			FZQMYE:data[66].endbal
		};
		ary[ary.length] = {
			HC:32,
			ZCQMYE:data[29].endbal
		};
		ary[ary.length] = {
			HC:33,
			ZCQMYE:data[30].endbal,
			FZQMYE:data[68].endbal
		};
		ary[ary.length] = {
			HC:34,
			FZQMYE:data[69].endbal
		};
		ary[ary.length] = {
			HC:35,
			FZQMYE:data[70].endbal
		};
		ary[ary.length] = {
			HC:36,
			FZQMYE:data[71].endbal
		};
		ary[ary.length] = {
			HC:37,
			FZQMYE:data[72].endbal
		};
		ary[ary.length] = {
			HC:38,
			FZQMYE:data[73].endbal
		};
		ary[ary.length] = {
			HC:39,
			FZQMYE:data[74].endbal
		};
		ary[ary.length] = {
			HC:40
		};
		ary[ary.length] = {
			HC:41
		};
	}
	
	/* 利润表（月季）、年度（一般企业） */
	else if (sbbzlDm == 50100201002) {
		/*ary是数组，.HC对象从1开始，报表行次共计33 (35，但有两行被略过)*/
		ary[ary.length] = {
			HC:1,
			BQJE:data[0].endbal
		};
		ary[ary.length] = {
			HC:2,
			BQJE:data[1].endbal
		};
		ary[ary.length] = {
			HC:3,
			BQJE:data[2].endbal
		};
		ary[ary.length] = {
			HC:4,
			BQJE:data[3].endbal
		};
		ary[ary.length] = {
			HC:5,
			BQJE:data[4].endbal
		};
		ary[ary.length] = {
			HC:6,
			BQJE:data[5].endbal
		};
		ary[ary.length] = {
			HC:7,
			BQJE:data[6].endbal
		};
		ary[ary.length] = {
			HC:8,
			BQJE:data[7].endbal
		};
		ary[ary.length] = {
			HC:9,
			BQJE:data[8].endbal
		};
		ary[ary.length] = {
			HC:10,
			BQJE:data[9].endbal
		};
		ary[ary.length] = {
			HC:11,
			BQJE:data[10].endbal
		};
		ary[ary.length] = {
			HC:12,
			BQJE:data[11].endbal
		};
		ary[ary.length] = {
			HC:13
		};
		ary[ary.length] = {
			HC:14,
			BQJE:data[13].endbal
		};
        ary[ary.length] = {
            HC:15
        };
        ary[ary.length] = {
			HC:16,
			BQJE:data[15].endbal
		};
        ary[ary.length] = {
			HC:17
		};
		ary[ary.length] = {
			HC:18
		};
		ary[ary.length] = {
			HC:19,
			BQJE:data[18].endbal
		};
        ary[ary.length] = {
            HC:20
        };
        ary[ary.length] = {
			HC:21,
            BQJE:data[20].endbal
		};
        ary[ary.length] = {
			HC:22,
            BQJE:data[21].endbal
		};
		ary[ary.length] = {
			HC:23
		};
		ary[ary.length] = {
			HC:24
		};
		ary[ary.length] = {
			HC:25,
            BQJE:data[24].endbal
		};
		ary[ary.length] = {
			HC:26,
            BQJE:data[25].endbal
		};
		ary[ary.length] = {
			HC:27
		};
		ary[ary.length] = {
			HC:28,
			BQJE:data[27].endbal
		};
		ary[ary.length] = {
			HC:29,
            BQJE:data[28].endbal
		};
		ary[ary.length] = {
			HC:30,
			BQJE:data[29].endbal
		};
		ary[ary.length] = {
			HC:31,
			BQJE:data[30].endbal
		};
		ary[ary.length] = {
			HC:32,
			BQJE:data[31].endbal
		};
		ary[ary.length] = {
			HC:33
		};
		ary[ary.length] = {
			HC:34
		};
		ary[ary.length] = {
			HC:35,
            BQJE:data[33].endbal
		};
		ary[ary.length] = {
			HC:36,
            BQJE:data[34].endbal
		};
	}
	/* 所有者权益（或股东权益）增减变动表 */
	else if (sbbzlDm == 50100202004 || sbbzlDm == 50100201004)  {
		for (var i = 2; i <= 22; i++) {
			obj = {};
			obj.BN_SSZB=data[i - 2].col1;
			obj.BN_ZBGJ=data[i - 2].col2
			obj.BN_KCG=data[i - 2].col3;
			obj.BN_QTZHSY=data[i - 2].col4;
			obj.BN_YYGJ=data[i - 2].col5;
			obj.BN_WFPLR=data[i - 2].col6;
			obj.HC = i-1;
			ary[ary.length] = obj;
		}
	}
	/* 企业所得税年度纳税人申报表(B类，2015年版) */
	else if (sbbzlDm == 10104102003) {
		ary = data;
	}
	/* 企业所得税月（季）度预缴报表（B类，2015年版） */
	else if (sbbzlDm == 10104110002) {
		ary = data;
	}
	/* 增值税纳税申报表，（小规模纳税人适用）附列资料、增值税减免税申报明细表 */
/*
 * 	else if (sbbzlDm == 101012007 || sbbzlDm ==101012008 || sbbzlDm==101012009) {
 *		ary = data;
 *	}
 */
	/*文化事业建设费*/
	else if(sbbzlDm==103012601) {
        /*ary是数组，.HC对象从1开始，报表行次共计19*/
        ary[ary.length] = {
            HC:1,
            BYS:data[0].endbal
        };
        ary[ary.length] = {
            HC:2,
            BYS:data[1].endbal
        };
        ary[ary.length] = {
            HC:3
        };
        ary[ary.length] = {
            HC:4,
            BYS:data[3].endbal
        };
        ary[ary.length] = {
            HC:5
        };
        ary[ary.length] = {
            HC:6
        };
        ary[ary.length] = {
            HC:7
        };
        ary[ary.length] = {
            HC:8
        };
        ary[ary.length] = {
            HC:9
        };
        ary[ary.length] = {
            HC:10
        };
        ary[ary.length] = {
            HC:11
        };
        ary[ary.length] = {
            HC:12
        };
        ary[ary.length] = {
            HC:13
        };
        ary[ary.length] = {
            HC:14
        };
        ary[ary.length] = {
            HC:15
        };
        ary[ary.length] = {
            HC:16
        };
        ary[ary.length] = {
            HC:17
        };
        ary[ary.length] = {
            HC:18
        };
        ary[ary.length] = {
            HC:19,
            BYS:data[18].endbal
        };

    }
    /*附加税*/
	else if(sbbzlDm==101018001){
        dataInfo.HEAD.LXFS = data.LXFS;
	}
	
	/*增值税 纳税申报 小规模*/
	else if(sbbzlDm==101012007) {
		/*ary是数组，.HC对象从1开始，报表行次共计22*/
		ary[ary.length] = {
			HC:1,
			BQS_YSHWJLW:data[0].BQS_YSHWJLW,
			BQS_YSFW:data[0].BQS_YSFW
		};
		ary[ary.length] = {
			HC:2
		};
		ary[ary.length] = {
			HC:3,
			BQS_YSHWJLW:data[2].BQS_YSHWJLW,
			BQS_YSFW:data[2].BQS_YSFW
		};
		ary[ary.length] = {
			HC:4,
			BQS_YSFW:data[3].BQS_YSFW
		};
		ary[ary.length] = {
			HC:5
		};
		ary[ary.length] = {
			HC:6,
			BQS_YSFW:data[5].BQS_YSFW
		};
		ary[ary.length] = {
			HC:7,
			BQS_YSHWJLW:data[6].BQS_YSHWJLW
		};
		ary[ary.length] = {
			HC:8,
			BQS_YSHWJLW:data[7].BQS_YSHWJLW
		};
		ary[ary.length] = {
			HC:9
		};
		ary[ary.length] = {
			HC:10,
			BQS_YSHWJLW:data[9].BQS_YSHWJLW,
			BQS_YSFW:data[9].BQS_YSFW
		};
		ary[ary.length] = {
			HC:11,
			BQS_YSHWJLW:data[10].BQS_YSHWJLW,
			BQS_YSFW:data[10].BQS_YSFW
		};
		ary[ary.length] = {
			HC:12,
			BQS_YSHWJLW:data[11].BQS_YSHWJLW,
			BQS_YSFW:data[11].BQS_YSFW
		};
		ary[ary.length] = {
			HC:13,
			BQS_YSHWJLW:data[12].BQS_YSHWJLW,
			BQS_YSFW:data[12].BQS_YSFW
		};
		ary[ary.length] = {
			HC:14,
			BQS_YSHWJLW:data[13].BQS_YSHWJLW,
			BQS_YSFW:data[13].BQS_YSFW
		};
		ary[ary.length] = {
			HC:15
		};
		ary[ary.length] = {
			HC:16,
			BQS_YSHWJLW:data[15].BQS_YSHWJLW,
			BQS_YSFW:data[15].BQS_YSFW
		};
		ary[ary.length] = {
			HC:17,
			BQS_YSFW:data[16].BQS_YSFW
		};
		ary[ary.length] = {
			HC:18,
			BQS_YSFW:data[17].BQS_YSFW
		};
		ary[ary.length] = {
			HC:19,
			BQS_YSFW:data[18].BQS_YSFW
		};
		ary[ary.length] = {
			HC:20
		};
		ary[ary.length] = {
			HC:21
		};
		ary[ary.length] = {
			HC:22
		};
	}
	/*增值税 纳税申报 附列 小规模*/
	else if(sbbzlDm==101012008) {
        /*ary是数组，.HC对象从1开始，报表行次共计16*/
        ary[ary.length] = {
            HC: 1
        };
        ary[ary.length] = {
            HC: 2,
            COL2: data[1].endbal
        };
        ary[ary.length] = {
            HC: 3,
            COL3: data[2].endbal
        };
        ary[ary.length] = {
            HC: 4
        };
        ary[ary.length] = {
            HC: 5,
            COL5: data[4].endbal
        };
        ary[ary.length] = {
            HC: 6
        };
        ary[ary.length] = {
            HC: 7
        };
        ary[ary.length] = {
            HC: 8
        };
        ary[ary.length] = {
            HC: 9
        };
        ary[ary.length] = {
            HC: 10,
            COL10: data[9].endbal
        };
        ary[ary.length] = {
            HC: 11,
            COL11: data[10].endbal
        };
        ary[ary.length] = {
            HC: 12
        };
        ary[ary.length] = {
            HC: 13,
            COL13: data[12].endbal
        };
        ary[ary.length] = {
            HC: 14
        };
        ary[ary.length] = {
            HC: 15
        };
        ary[ary.length] = {
            HC: 16
        };
    }
    /*小规模 减免税明细表*/
    else if(sbbzlDm==101012009) {
		/*ary是数组，.HC对象从1开始，报表行次共计1*/
		ary[ary.length] = {
			HC:1,
			COL1:data[0].COL1,
			COL2:data[0].COL2,
			COL4:data[0].COL4
		};
	}
	dataInfo.BODY = ary;
	return dataInfo;
}

/* 填写报表，操作cell控件，将报表填写进申报页面 */
bstClientUtil.prototype.fillData = function(sbbzlDm,data,iframeObj,cellCols) {
	/* 自动填报分报表逻辑 */
	if(sbbzlDm == 10104111010){
		iframeObj.contentWindow.DCellWeb1.initSelectCell({
			col: "COL02",
			selectStr:"专利技术\t1\r\n计算机软件著作权\t2\r\n集成电路布图设计权\t3\r\n植物新品种（权）\t4\r\n生物医药新品种\t5\r\n其他技术成果\tZ\r\n"
		});
		iframeObj.contentWindow.DCellWeb1.initSelectCell({
			col: "COL11",
			selectStr:"是\t1\r\n否\t0\r\n"
		});
	    iframeObj.contentWindow.DCellWeb1.initRowToCell({
			cols: ["COL01","COL02","COL03","COL04","COL05","COL06","COL07","COL08","COL09","COL10","COL11","COL12"],
			cellRows: [
				{
					start: "HC", end: "HJ",
					hc: "HC", xl: "XL",
					addButton: {name: "ADD"},
					delButton: {
						name: "DEL",
						checkbox: "CZ"
					}
				}
			],
	        data:data,
			nsrxxCols:["NSRSBH","NSRMC","SSSQ"]
        });
    }else if(sbbzlDm == 101012007){/*增值税 纳税申报 小规模*/
		debugger;
    	var cellObj = iframeObj.contentWindow.DCellWeb1;
    	// var getValue1 = data.BODY[0].endbal;
    	// var value1 = cellObj.getValue(5, 10, 0);
    	// cellObj.setValue(5, 11, 0, getValue1);
    	// cellObj.setValue(5, 9, 0, getValue1+value1);
    	// if(data.BODY.length==2){
	    // 	var getValue2 = data.BODY[1].endbal;
	    // 	var value2 = cellObj.getValue(6, 10, 0);
	    // 	cellObj.setValue(6, 11, 0, getValue2);
	    // 	cellObj.setValue(6, 9, 0, getValue2+value2);
    	// }
		for(var i=0;i<data.BODY.length;i++){
			if(data.BODY[i].BQS_YSHWJLW){
                cellObj.setValue(5, data.BODY[i].HC+8, 0, data.BODY[i].BQS_YSHWJLW);
			}
            if(data.BODY[i].BQS_YSFW){
                cellObj.setValue(6, data.BODY[i].HC+8, 0, data.BODY[i].BQS_YSFW);
			}
		}
    }else if(sbbzlDm == 101012008){/*增值税 纳税申报 附列 小规模*/
    	var cellObj = iframeObj.contentWindow.DCellWeb1;
		for(var i=0;i<data.BODY.length;i++){
			if(eval('data.BODY[i].COL'+(Number(i)+1))){
                cellObj.setValue(4, data.BODY[i].HC+5, 0, eval('data.BODY[i].COL'+(Number(i)+1)));
			}
		}
    }else if(sbbzlDm == 101012009){/*增值税 纳税申报 减免税明细表 小规模 */
    	var cellObj = iframeObj.contentWindow.DCellWeb1;
    	//触发增行按钮
		debugger;
        iframeObj.contentWindow.DCellWeb1_ButtonCellClicked_JS(3,8,0);
        //暂时不处理
		//回填下拉选择 0001129914
        cellObj.SetDroplistCellKey(2, 9, 0, '223');
		//填充本行数据
		if(data.BODY[0].COL1){
            cellObj.setValue(5, 9, 0, data.BODY[0].COL1);
		}
		if(data.BODY[0].COL2){
            cellObj.setValue(6, 9, 0, data.BODY[0].COL2);
		}
		if(data.BODY[0].COL4){
            cellObj.setValue(8, 9, 0, data.BODY[0].COL4);
		}
    }else if(sbbzlDm == 10104111021){/* 企业所得税 */
    	var cellObj = iframeObj.contentWindow.DCellWeb1;
		for(var i=0;i<data.BODY.length;i++){
			if(data.BODY[i].LJJE){
                cellObj.setValue(8, data.BODY[i].HC+9, 0, data.BODY[i].LJJE);
			}
		}
		if(data.HEAD.QMCYRS){
            cellObj.setValByLabel("B35",data.HEAD.QMCYRS);
		}
    }else if(sbbzlDm == 101018001){/*附加税*/
    	var cellObj = iframeObj.contentWindow.DCellWeb1;
        if(data.HEAD.LXFS){
            cellObj.setValByLabel("M7",data.HEAD.LXFS);
        }
    }else if(sbbzlDm == 103012601){/*文化事业建设费*/
    	var cellObj = iframeObj.contentWindow.DCellWeb1;
        for(var i=0;i<data.BODY.length;i++){
            if(data.BODY[i].BYS){
                cellObj.setValue(5, data.BODY[i].HC+5, 0, data.BODY[i].BYS);
            }
        }
    }else if(sbbzlDm == 10104111007){/*企业所得税 减免所得税额明细表*/
    	var cellObj = iframeObj.contentWindow.DCellWeb1;
    	var tempValue ;
    	for (var i = 0; i < data.BODY.length; i++) {
    		tempValue =  cellObj.getValue(4,5+(data.BODY[i].HC)*1,0);
    		if(tempValue*1 == 0){
    			cellObj.setValue(4,5+(data.BODY[i].HC)*1,0,data.BODY[i].BQJE);
    		}
		}
    }else{
		iframeObj.contentWindow.DCellWeb1.initDataToCell({
			cols : cellCols,
			data : data
	    });
	}
}
/*排序及过滤方法 */
bstClientUtil.prototype.reOrderData = function(data) {
    var datares = [];
    var doOrder = bstClientUtil.dataConf;
    for(var i=0;i<doOrder.length;i++){
        for(var j=0;j<data.length;j++){
            if(doOrder[i].sbbid==data[j].id){
                data[j].conf = doOrder[i].conf;
                datares[datares.length] = data[j];
            }
        }
    }
    /*for(var m=0;m<data.length;m++){
        var isin = false;
        for(var k=0;k<datares.length;k++){
            if(datares[k].id==data[m].id){
                isin = true;
                break;
            }
        }
        if(!isin){
            datares[datares.length] = data[m];
        }
    }*/
    return datares;
}