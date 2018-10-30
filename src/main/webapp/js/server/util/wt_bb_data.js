/*网厅主页加载*/
bstClientUtil.wt_list_url = '/webroot/com/neusoft/tax/wlsb/byysb/mainbyysblist.execute.svc';
/*网厅树结构*/
bstClientUtil.wt_tree_url = '/getQyUserGnmkTree.do';
/*网厅纳税人基本信息*/
bstClientUtil.wt_menu_url = '/taxclient/wssq/cxtj/select_yjscx_nsrjbxx.do';
//国税监听主页
bstClientUtil.gs_list_url = '/getNSR_SBB_TREE.do';
//国税扣款监听主页
bstClientUtil.gs_kk_url = '/hlwsb/sbkk/getNsrlx.do';
//国税申报结果查询监听主页
bstClientUtil.gs_sbjg_url = '/hlwsb/sbkk/getSBJGBYPAGE.do';
//国税申报扣款结果查询监听主页
bstClientUtil.gs_sbkk_url = '/hlwsb/sbkk/getKKJGBYPAGE.do';
//注册信息
bstClientUtil.gs_regedit_url = '/hlwsb/xtgl/regedit.do';

//国税报表导出url
bstClientUtil.gsExcelUrl = {
		checkBtn:'/hlwsb/cxdy/getSB_SBJG.do',//查询打印
		arrayUrl:'/hlwsb/cxdy/getSB_SBJG_LIST.do',//报表列表
		cwbb:{//财务报表
			zcfzb:'/hlwsb/cwbb/xqy/getSB_CWBB_XQY_ZCFZB.do',//资产负债表
			lrb:'/hlwsb/cwbb/xqy/getSB_CWBB_XQY_LRB_YB.do',//利润表
		},
		zzs:{//增值税
			xgmnsrCzzs:'/hlwsb/zzs/xgm/getSB_ZZS_XGMNSR_CZZS.do',//增值税小规模纳税人（查账征收）
			ybnsr:'/hlwsb/zzs/ybnsr/getSB_ZZS_YBNSR.do',//增值税一般纳税人
		},
		qysds:{//企业所得税
			qysdsB:'/hlwsb/qysds/getSB_QYSDS_JM_YJ_B_2015.do',//企业所得税纳税人B类
			qysdsA:'/hlwsb/qysds/getSB_QYSDS_JM_YJ_A_2015.do',//企业所得税纳税人A类
		}
//		'cwbb':{//文化建设事业税
//			'zcfzb':'/hlwsb/cwbb/xqy/getSB_CWBB_XQY_ZCFZB.do',//资产负债表
//			'lrb':'/hlwsb/cwbb/xqy/getSB_CWBB_XQY_LRB_YB.do',//利润表
//		}
}