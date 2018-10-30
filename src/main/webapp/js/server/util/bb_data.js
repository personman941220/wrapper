/*国税申报提交列表页*/
bstClientUtil.gs_submit_list = '/hlwsb/sbkk/checkSfzxx.do';
/*国税申报提交请求*/
bstClientUtil.gs_submit_url = '/hlwsb/sbkk/sb.do';
/*报表模板*/
bstClientUtil.data = {
	'50100311001':{/*资产负债表 小企业*/
		model:[/*0模板,模板中的row是行次*/
			{"row":1,"endbal":0},
			{"row":2,"endbal":0},
			{"row":3,"endbal":0},
			{"row":4,"endbal":0},
			{"row":5,"endbal":0},
			{"row":6,"endbal":0},
			{"row":7,"endbal":0},
			{"row":8,"endbal":0},
			{"row":9,"endbal":0},
			{"row":10,"endbal":0},
			{"row":11,"endbal":0},
			{"row":12,"endbal":0},
			{"row":13,"endbal":0},
			{"row":14,"endbal":0},
			{"row":15,"endbal":0},
			{"row":16,"endbal":0},
			{"row":17,"endbal":0},
			{"row":18,"endbal":0},
			{"row":19,"endbal":0},
			{"row":20,"endbal":0},
			{"row":21,"endbal":0},
			{"row":22,"endbal":0},
			{"row":23,"endbal":0},
			{"row":24,"endbal":0},
			{"row":25,"endbal":0},
			{"row":26,"endbal":0},
			{"row":27,"endbal":0},
			{"row":28,"endbal":0},
			{"row":29,"endbal":0},
			{"row":30,"endbal":0},
			{"row":31,"endbal":0},
			{"row":32,"endbal":0},
			{"row":33,"endbal":0},
			{"row":34,"endbal":0},
			{"row":35,"endbal":0},
			{"row":36,"endbal":0},
			{"row":37,"endbal":0},
			{"row":38,"endbal":0},
			{"row":39,"endbal":0},
			{"row":40,"endbal":0},
			{"row":41,"endbal":0},
			{"row":42,"endbal":0},
			{"row":43,"endbal":0},
			{"row":44,"endbal":0},
			{"row":45,"endbal":0},
			{"row":46,"endbal":0},
			{"row":47,"endbal":0},
			{"row":48,"endbal":0},
			{"row":49,"endbal":0},
			{"row":50,"endbal":0},
			{"row":51,"endbal":0},
			{"row":52,"endbal":0},
			{"row":53,"endbal":0}
		],
		table:'*资产负债表',/*申报菜单名*/
		parent:'小企业会计准则（月/季）',/*父级菜单名*/
		url:'/hlwsb/cwbb/xqy/getSB_CWBB_XQY_ZCFZB.do',
		saveUrl:'/hlwsb/cwbb/xqy/insertSB_CWBB_XQY_ZCFZB.do',
		saveUrl_update:'/hlwsb/cwbb/xqy/updateSB_CWBB_XQY_ZCFZB.do',
		obj:'zcfz',
		cellCols:["ZCQMYE","FZQMYE"]
	},
	'50100311002':{/*利润表 小企业*/
		model:[/*0模板*/
	       	{"row":1,"endbal":0},
			{"row":2,"endbal":0},
			{"row":3,"endbal":0},
			{"row":4,"endbal":0},
			{"row":5,"endbal":0},
			{"row":6,"endbal":0},
			{"row":7,"endbal":0},
			{"row":8,"endbal":0},
			{"row":9,"endbal":0},
			{"row":10,"endbal":0},
			{"row":11,"endbal":0},
			{"row":12,"endbal":0},
			{"row":13,"endbal":0},
			{"row":14,"endbal":0},
			{"row":15,"endbal":0},
			{"row":16,"endbal":0},
			{"row":17,"endbal":0},
			{"row":18,"endbal":0},
			{"row":19,"endbal":0},
			{"row":20,"endbal":0},
			{"row":21,"endbal":0},
			{"row":22,"endbal":0},
			{"row":23,"endbal":0},
			{"row":24,"endbal":0},
			{"row":25,"endbal":0},
			{"row":26,"endbal":0},
			{"row":27,"endbal":0},
			{"row":28,"endbal":0},
			{"row":29,"endbal":0},
			{"row":30,"endbal":0},
			{"row":31,"endbal":0},
			{"row":32,"endbal":0}
		],
		table:'*利润表',/*申报菜单名*/
		parent:'小企业会计准则（月/季）',/*父级菜单名*/
		url:'/hlwsb/cwbb/xqy/getSB_CWBB_XQY_LRB_YB.do',
		saveUrl:'/hlwsb/cwbb/xqy/insertSB_CWBB_XQY_LRB_YB.do',
		saveUrl_update:'/hlwsb/cwbb/xqy/updateSB_CWBB_XQY_LRB_YB.do',
		obj:'lrb_yb',
		cellCols:["BYJE"]
	},
	'50100311003':{/*现金流量表 小企业*/
		model:[/*0模板*/
	       	{"row":1,"endbal":0},
			{"row":2,"endbal":0},
			{"row":3,"endbal":0},
			{"row":4,"endbal":0},
			{"row":5,"endbal":0},
			{"row":6,"endbal":0},
			{"row":7,"endbal":0},
			{"row":8,"endbal":0},
			{"row":9,"endbal":0},
			{"row":10,"endbal":0},
			{"row":11,"endbal":0},
			{"row":12,"endbal":0},
			{"row":13,"endbal":0},
			{"row":14,"endbal":0},
			{"row":15,"endbal":0},
			{"row":16,"endbal":0},
			{"row":17,"endbal":0},
			{"row":18,"endbal":0},
			{"row":19,"endbal":0},
			{"row":20,"endbal":0},
			{"row":21,"endbal":0},
			{"row":22,"endbal":0}
		],
		table:'现金流量表',/*申报菜单名*/
		parent:'小企业会计准则（月/季）',/*父级菜单名*/
		url:'/hlwsb/cwbb/xqy/getSB_CWBB_XQY_XJLLB_YB.do',
		saveUrl:'/hlwsb/cwbb/xqy/insertSB_CWBB_XQY_XJLLB_YB.do',
		saveUrl_update:'/hlwsb/cwbb/xqy/updateSB_CWBB_XQY_XJLLB_YB.do',
		obj:'xjll',
		cellCols:["BYJE"]
	},
	'50100201001':{/*一般企业 资产负债表*/
		model:[/*0模板，总共77行次*/
			{"row":1,"endbal":0},
			{"row":2,"endbal":0},
			{"row":3,"endbal":0},
			{"row":4,"endbal":0},
			{"row":5,"endbal":0},
			{"row":6,"endbal":0},
			{"row":7,"endbal":0},
			{"row":8,"endbal":0},
			{"row":9,"endbal":0},
			{"row":10,"endbal":0},
			{"row":11,"endbal":0},
			{"row":12,"endbal":0},
			{"row":13,"endbal":0},
			{"row":14,"endbal":0},
			{"row":15,"endbal":0},
			{"row":16,"endbal":0},
			{"row":17,"endbal":0},
			{"row":18,"endbal":0},
			{"row":19,"endbal":0},
			{"row":20,"endbal":0},
			{"row":21,"endbal":0},
			{"row":22,"endbal":0},
			{"row":23,"endbal":0},
			{"row":24,"endbal":0},
			{"row":25,"endbal":0},
			{"row":26,"endbal":0},
			{"row":27,"endbal":0},
			{"row":28,"endbal":0},
			{"row":29,"endbal":0},
			{"row":30,"endbal":0},
			{"row":31,"endbal":0},
			{"row":32,"endbal":0},
			{"row":33,"endbal":0},
			{"row":34,"endbal":0},
			{"row":35,"endbal":0},
			{"row":36,"endbal":0},
			{"row":37,"endbal":0},
			{"row":38,"endbal":0},
			{"row":39,"endbal":0},
			{"row":40,"endbal":0},
			{"row":41,"endbal":0},
			{"row":42,"endbal":0},
			{"row":43,"endbal":0},
			{"row":44,"endbal":0},
			{"row":45,"endbal":0},
			{"row":46,"endbal":0},
			{"row":47,"endbal":0},
			{"row":48,"endbal":0},
			{"row":49,"endbal":0},
			{"row":50,"endbal":0},
			{"row":51,"endbal":0},
			{"row":52,"endbal":0},
			{"row":53,"endbal":0},
			{"row":54,"endbal":0},
			{"row":55,"endbal":0},
			{"row":56,"endbal":0},
			{"row":57,"endbal":0},
			{"row":58,"endbal":0},
			{"row":59,"endbal":0},
			{"row":60,"endbal":0},
			{"row":61,"endbal":0},
			{"row":62,"endbal":0},
			{"row":63,"endbal":0},
			{"row":64,"endbal":0},
			{"row":65,"endbal":0},
			{"row":66,"endbal":0},
			{"row":67,"endbal":0},
			{"row":68,"endbal":0},
			{"row":69,"endbal":0},
			{"row":70,"endbal":0},
			{"row":71,"endbal":0},
			{"row":72,"endbal":0},
			{"row":73,"endbal":0},
			{"row":74,"endbal":0},
			{"row":75,"endbal":0},
			{"row":76,"endbal":0},
			{"row":77,"endbal":0}
		],
		table:'*资产负债表',/*申报菜单名*/
		parent:'财务报表（月/季）',/*父级菜单名*/
		url:'/hlwsb/cwbb/ybqy/getSB_CWBB_YBQY_ZCFZB.do',
		saveUrl:'/hlwsb/cwbb/ybqy/insertSB_CWBB_YBQY_ZCFZB.do',
		obj:'zcfzb',
		cellCols:["ZCQMYE","FZQMYE"]
	},
	'50100201002':{/*一般企业 利润表，共35行次*/
		model:[/*0模板*/
			{"row":1,"endbal":0},
			{"row":2,"endbal":0},
			{"row":3,"endbal":0},
			{"row":4,"endbal":0},
			{"row":5,"endbal":0},
			{"row":6,"endbal":0},
			{"row":7,"endbal":0},
			{"row":8,"endbal":0},
			{"row":9,"endbal":0},
			{"row":10,"endbal":0},
			{"row":11,"endbal":0},
			{"row":12,"endbal":0},
			{"row":13,"endbal":0},
			{"row":14,"endbal":0},
			{"row":15,"endbal":0},
			{"row":16,"endbal":0},
			{"row":17,"endbal":0},
			{"row":18,"endbal":0},
			{"row":19,"endbal":0},
			{"row":20,"endbal":0},
			{"row":21,"endbal":0},
			{"row":22,"endbal":0},
			{"row":23,"endbal":0},
			{"row":24,"endbal":0},
			{"row":25,"endbal":0},
			{"row":26,"endbal":0},
			{"row":27,"endbal":0},
			{"row":28,"endbal":0},
			{"row":29,"endbal":0},
			{"row":30,"endbal":0},
			{"row":31,"endbal":0},
			{"row":32,"endbal":0},
			{"row":33,"endbal":0},
			{"row":34,"endbal":0},
			{"row":35,"endbal":0}
		],
		table:'*利润表',/*申报菜单名*/
		parent:'财务报表（月/季）',/*父级菜单名*/
		url:'/hlwsb/cwbb/ybqy/getSB_CWBB_YBQY_LRB.do',
		saveUrl:'/hlwsb/cwbb/ybqy/insertSB_CWBB_YBQY_LRB.do',
		obj:'lrb',
		cellCols:["BQJE"]
	},
	'50100201003':{/*一般企业 现金流量表，共38行次*/
		model:[/*0模板*/
			{"row":1,"endbal":0},
			{"row":2,"endbal":0},
			{"row":3,"endbal":0},
			{"row":4,"endbal":0},
			{"row":5,"endbal":0},
			{"row":6,"endbal":0},
			{"row":7,"endbal":0},
			{"row":8,"endbal":0},
			{"row":9,"endbal":0},
			{"row":10,"endbal":0},
			{"row":11,"endbal":0},
			{"row":12,"endbal":0},
			{"row":13,"endbal":0},
			{"row":14,"endbal":0},
			{"row":15,"endbal":0},
			{"row":16,"endbal":0},
			{"row":17,"endbal":0},
			{"row":18,"endbal":0},
			{"row":19,"endbal":0},
			{"row":20,"endbal":0},
			{"row":21,"endbal":0},
			{"row":22,"endbal":0},
			{"row":23,"endbal":0},
			{"row":24,"endbal":0},
			{"row":25,"endbal":0},
			{"row":26,"endbal":0},
			{"row":27,"endbal":0},
			{"row":28,"endbal":0},
			{"row":29,"endbal":0},
			{"row":30,"endbal":0},
			{"row":31,"endbal":0},
			{"row":32,"endbal":0},
			{"row":33,"endbal":0},
			{"row":34,"endbal":0},
			{"row":35,"endbal":0},
			{"row":35,"endbal":0},
			{"row":37,"endbal":0},
			{"row":38,"endbal":0}
		],
		table:'现金流量表',/*申报菜单名*/
		parent:'财务报表（月/季）',/*父级菜单名*/
		url:'/hlwsb/cwbb/ybqy/getSB_CWBB_YBQY_XJLLB.do',
		saveUrl:'/hlwsb/cwbb/ybqy/insertSB_CWBB_YBQY_XJLLB.do',
		obj:'xjllb',
		cellCols:["BQJE"]
	},
	'101012009':{/* 小规模 减免税明细表*/
		model:[/*0模板*/
            {"row":1,"endbal":0}
		],
		table:'*增值税减免税申报明细表（2016年版）',/*申报菜单名*/
		parent:'增值税（小规模纳税人适用）查账征收',/*父级菜单名*/
		url:'/hlwsb/zzs/xgm/getSB_ZZS_XGMNSR_CZZS_JMSMXB.do',
		saveUrl:'/hlwsb/zzs/xgm/insertSB_ZZS_XGMNSR_CZZS_JMSMXB.do',
		obj:'czzs',
		cellCols:["COL1","COL2","COL4"]
	},
	'101011021':{/*增值税 纳税申报表 一般纳税人  暂时不处理*/
		model:[/*0模板*/
	       	{"row":1,"endbal":0},
			{"row":2,"endbal":0},
			{"row":3,"endbal":0},
			{"row":4,"endbal":0},
			{"row":5,"endbal":0},
			{"row":6,"endbal":0},
			{"row":7,"endbal":0},
			{"row":8,"endbal":0},
			{"row":9,"endbal":0},
			{"row":10,"endbal":0},
			{"row":11,"endbal":0},
			{"row":12,"endbal":0},
			{"row":13,"endbal":0},
			{"row":14,"endbal":0},
			{"row":15,"endbal":0},
			{"row":16,"endbal":0},
			{"row":17,"endbal":0},
			{"row":18,"endbal":0},
			{"row":19,"endbal":0},
			{"row":20,"endbal":0},
			{"row":21,"endbal":0},
			{"row":22,"endbal":0},
			{"row":23,"endbal":0},
			{"row":24,"endbal":0},
			{"row":25,"endbal":0},
			{"row":26,"endbal":0},
			{"row":27,"endbal":0},
			{"row":28,"endbal":0},
			{"row":29,"endbal":0},
			{"row":30,"endbal":0}
		],
		table:'*增值税纳税申报表(一般纳税人适用)2016版',/*申报菜单名*/
		parent:'增值税（一般纳税人适用）',/*父级菜单名*/
		url:'/hlwsb/zzs/ybnsr/getSB_ZZS_YBNSR.do',
		saveUrl:'/hlwsb/zzs/ybnsr/updateSB_ZZS_YBNSR.do',
		obj:'ybnsr2016',
		cellCols:[]
	},
	'101011034':{/*增值税 纳税申报表附列一 一般纳税人 暂时不处理*/
		model:[/*0模板*/
	       	{"row":1,"endbal":0},
			{"row":2,"endbal":0},
			{"row":3,"endbal":0},
			{"row":4,"endbal":0},
			{"row":5,"endbal":0},
			{"row":6,"endbal":0},
			{"row":7,"endbal":0},
			{"row":8,"endbal":0},
			{"row":9,"endbal":0},
			{"row":10,"endbal":0},
			{"row":11,"endbal":0},
			{"row":12,"endbal":0},
			{"row":13,"endbal":0},
			{"row":14,"endbal":0},
			{"row":15,"endbal":0},
			{"row":16,"endbal":0},
			{"row":17,"endbal":0},
			{"row":18,"endbal":0},
			{"row":19,"endbal":0},
			{"row":20,"endbal":0},
			{"row":21,"endbal":0},
			{"row":22,"endbal":0},
			{"row":23,"endbal":0},
			{"row":24,"endbal":0},
			{"row":25,"endbal":0},
			{"row":26,"endbal":0},
			{"row":27,"endbal":0},
			{"row":28,"endbal":0},
			{"row":29,"endbal":0},
			{"row":30,"endbal":0}
		],
		table:'*增值税纳税申报表附列资料（一）2017版',/*申报菜单名*/
		parent:'增值税（一般纳税人适用）',/*父级菜单名*/
		url:'/hlwsb/zzs/ybnsr/getSB_ZZS_YBNSR_FB1.do',
		saveUrl:'/hlwsb/zzs/ybnsr/updateSB_ZZS_YBNSR_FB1.do',
		obj:'fb1_2017',
		cellCols:[]
	},
	'101011035':{/*暂时不处理*/
		model:[/*0模板*/
	       	{"row":1,"endbal":0},
			{"row":2,"endbal":0},
			{"row":3,"endbal":0},
			{"row":4,"endbal":0},
			{"row":5,"endbal":0},
			{"row":6,"endbal":0},
			{"row":7,"endbal":0},
			{"row":8,"endbal":0},
			{"row":9,"endbal":0},
			{"row":10,"endbal":0},
			{"row":11,"endbal":0},
			{"row":12,"endbal":0},
			{"row":13,"endbal":0},
			{"row":14,"endbal":0},
			{"row":15,"endbal":0},
			{"row":16,"endbal":0},
			{"row":17,"endbal":0},
			{"row":18,"endbal":0},
			{"row":19,"endbal":0},
			{"row":20,"endbal":0},
			{"row":21,"endbal":0},
			{"row":22,"endbal":0},
			{"row":23,"endbal":0},
			{"row":24,"endbal":0},
			{"row":25,"endbal":0},
			{"row":26,"endbal":0},
			{"row":27,"endbal":0},
			{"row":28,"endbal":0},
			{"row":29,"endbal":0},
			{"row":30,"endbal":0}
		],
		table:'*增值税纳税申报表附列资料（二）2017版',/*申报菜单名*/
		parent:'增值税（一般纳税人适用）',/*父级菜单名*/
		url:'/hlwsb/zzs/ybnsr/getSB_ZZS_YBNSR_FB2.do',
		saveUrl:'/hlwsb/zzs/ybnsr/updateSB_ZZS_YBNSR_FB2.do',
		obj:'fb2_2017',
		cellCols:[]
	},
	'101011025':{/*暂时不处理*/
		model:[/*0模板*/
	       	{"row":1,"endbal":0},
			{"row":2,"endbal":0},
			{"row":3,"endbal":0},
			{"row":4,"endbal":0},
			{"row":5,"endbal":0},
			{"row":6,"endbal":0},
			{"row":7,"endbal":0},
			{"row":8,"endbal":0},
			{"row":9,"endbal":0},
			{"row":10,"endbal":0},
			{"row":11,"endbal":0},
			{"row":12,"endbal":0},
			{"row":13,"endbal":0},
			{"row":14,"endbal":0},
			{"row":15,"endbal":0},
			{"row":16,"endbal":0},
			{"row":17,"endbal":0},
			{"row":18,"endbal":0},
			{"row":19,"endbal":0},
			{"row":20,"endbal":0},
			{"row":21,"endbal":0},
			{"row":22,"endbal":0},
			{"row":23,"endbal":0},
			{"row":24,"endbal":0},
			{"row":25,"endbal":0},
			{"row":26,"endbal":0},
			{"row":27,"endbal":0},
			{"row":28,"endbal":0},
			{"row":29,"endbal":0},
			{"row":30,"endbal":0}
		],
		table:'增值税纳税申报表附列资料（四）2016版',/*申报菜单名*/
		parent:'增值税（一般纳税人适用）',/*父级菜单名*/
		url:'/hlwsb/zzs/ybnsr/getSB_ZZS_FB4.do',
		saveUrl:'/hlwsb/zzs/ybnsr/updateSB_ZZS_YBNSR_FB4.do',
		obj:'fb4',
		cellCols:[]
	},
	'101011026':{/*暂时不处理*/
		model:[/*0模板*/
	       	{"row":1,"endbal":0},
			{"row":2,"endbal":0},
			{"row":3,"endbal":0},
			{"row":4,"endbal":0},
			{"row":5,"endbal":0},
			{"row":6,"endbal":0},
			{"row":7,"endbal":0},
			{"row":8,"endbal":0},
			{"row":9,"endbal":0},
			{"row":10,"endbal":0},
			{"row":11,"endbal":0},
			{"row":12,"endbal":0},
			{"row":13,"endbal":0},
			{"row":14,"endbal":0},
			{"row":15,"endbal":0},
			{"row":16,"endbal":0},
			{"row":17,"endbal":0},
			{"row":18,"endbal":0},
			{"row":19,"endbal":0},
			{"row":20,"endbal":0},
			{"row":21,"endbal":0},
			{"row":22,"endbal":0},
			{"row":23,"endbal":0},
			{"row":24,"endbal":0},
			{"row":25,"endbal":0},
			{"row":26,"endbal":0},
			{"row":27,"endbal":0},
			{"row":28,"endbal":0},
			{"row":29,"endbal":0},
			{"row":30,"endbal":0}
		],
		table:'增值税纳税申报表附列资料（五）2016版',/*申报菜单名*/
		parent:'增值税（一般纳税人适用）',/*父级菜单名*/
		url:'/hlwsb/zzs/ybnsr/getSB_ZZS_BDCFQDCJSB.do',
		saveUrl:'/hlwsb/zzs/ybnsr/updateSB_ZZS_BDCFQDCJSB.do',
		obj:'fb5_2016',
		cellCols:[]
	},
	'101011027':{/*暂时不处理*/
		model:[/*0模板*/
	       {"row":1,"endbal":0},
	       {"row":2,"endbal":0},
	       {"row":3,"endbal":0},
	       {"row":4,"endbal":0},
	       {"row":5,"endbal":0},
	       {"row":6,"endbal":0},
	       {"row":7,"endbal":0},
	       {"row":8,"endbal":0},
	       {"row":9,"endbal":0},
	       {"row":10,"endbal":0},
	       {"row":11,"endbal":0},
	       {"row":12,"endbal":0},
	       {"row":13,"endbal":0},
	       {"row":14,"endbal":0},
	       {"row":15,"endbal":0},
	       {"row":16,"endbal":0},
	       {"row":17,"endbal":0},
	       {"row":18,"endbal":0},
	       {"row":19,"endbal":0},
	       {"row":20,"endbal":0},
	       {"row":21,"endbal":0},
	       {"row":22,"endbal":0},
	       {"row":23,"endbal":0},
	       {"row":24,"endbal":0},
	       {"row":25,"endbal":0},
	       {"row":26,"endbal":0},
	       {"row":27,"endbal":0},
	       {"row":28,"endbal":0},
	       {"row":29,"endbal":0},
	       {"row":30,"endbal":0}
		],
		table:'*固定资产（不含不动产）进项税额抵扣情况表2016版',/*申报菜单名*/
		parent:'增值税（一般纳税人适用）',/*父级菜单名*/
		url:'/hlwsb/zzs/ybnsr/getSB_ZZS_GDZCJXSEDKQKB.do',
		saveUrl:'/hlwsb/zzs/ybnsr/updateSB_ZZS_GDZCJXSEDKQKB.do',
		obj:'gdzcjxsedkqkb',
		cellCols:[]
	},
	'10104111007': {/*暂时不处理*/
	    model: [ /*0模板*/
	        { "row": 1, "endbal": 0 },
	        { "row": 2, "endbal": 0 },
	        { "row": 3, "endbal": 0 },
	        { "row": 4, "endbal": 0 },
	        { "row": 5, "endbal": 0 },
	        { "row": 6, "endbal": 0 },
	        { "row": 7, "endbal": 0 },
	        { "row": 8, "endbal": 0 },
	        { "row": 9, "endbal": 0 },
	        { "row": 10, "endbal": 0 },
	        { "row": 11, "endbal": 0 },
	        { "row": 12, "endbal": 0 },
	        { "row": 13, "endbal": 0 },
	        { "row": 14, "endbal": 0 },
	        { "row": 15, "endbal": 0 },
	        { "row": 16, "endbal": 0 },
	        { "row": 17, "endbal": 0 },
	        { "row": 18, "endbal": 0 },
	        { "row": 19, "endbal": 0 },
	        { "row": 20, "endbal": 0 },
	        { "row": 21, "endbal": 0 },
	        { "row": 22, "endbal": 0 },
	        { "row": 23, "endbal": 0 },
	        { "row": 24, "endbal": 0 },
	        { "row": 25, "endbal": 0 },
	        { "row": 26, "endbal": 0 },
	        { "row": 27, "endbal": 0 },
	        { "row": 28, "endbal": 0 },
	        { "row": 29, "endbal": 0 },
	        { "row": 30, "endbal": 0 }
	    ],
	    table: '减免所得税额明细表（三）', /*申报菜单名*/
	    parent: '居民企业所得税（据实预缴新）',/*父级菜单名*/
	    url: '/hlwsb/qysds/getSB_QYSDS_JM_YJ_A_FB3.do',
	    saveUrl: '/hlwsb/qysds/insertSB_QYSDS_JM_YJ_A_FB3.do',
	    obj: 'jm_yj_a3',
	    cellCols: ["QTXM", "BQJE"]
	},
	'10104111005': {/*暂时不处理*/
	    model: [ /*0模板*/
	        { "row": 1, "endbal": 0 },
	        { "row": 2, "endbal": 0 },
	        { "row": 3, "endbal": 0 },
	        { "row": 4, "endbal": 0 },
	        { "row": 5, "endbal": 0 },
	        { "row": 6, "endbal": 0 },
	        { "row": 7, "endbal": 0 },
	        { "row": 8, "endbal": 0 },
	        { "row": 9, "endbal": 0 },
	        { "row": 10, "endbal": 0 },
	        { "row": 11, "endbal": 0 },
	        { "row": 12, "endbal": 0 },
	        { "row": 13, "endbal": 0 },
	        { "row": 14, "endbal": 0 },
	        { "row": 15, "endbal": 0 },
	        { "row": 16, "endbal": 0 },
	        { "row": 17, "endbal": 0 },
	        { "row": 18, "endbal": 0 },
	        { "row": 19, "endbal": 0 },
	        { "row": 20, "endbal": 0 },
	        { "row": 21, "endbal": 0 },
	        { "row": 22, "endbal": 0 },
	        { "row": 23, "endbal": 0 },
	        { "row": 24, "endbal": 0 },
	        { "row": 25, "endbal": 0 },
	        { "row": 26, "endbal": 0 },
	        { "row": 27, "endbal": 0 },
	        { "row": 28, "endbal": 0 },
	        { "row": 29, "endbal": 0 },
	        { "row": 30, "endbal": 0 },
	        { "row": 31, "endbal": 0 },
	        { "row": 32, "endbal": 0 },
	        { "row": 33, "endbal": 0 },
	        { "row": 34, "endbal": 0 }
	    ],
	    table: '不征税收入和税基类减免应纳税所得额明细表（一）',
	    /*申报菜单名*/
	    parent: '居民企业所得税（据实预缴新）',
	    /*父级菜单名*/
	    url: '/hlwsb/qysds/getSB_QYSDS_JM_YJ_A_FB1.do',
	    saveUrl: '/hlwsb/qysds/insertSB_QYSDS_JM_YJ_A_FB1.do',
	    obj: 'jm_yj_a',
	    cellCols: ["BQJE"]
	},
	'10104111021': {/*企业所得税 1*/
	    model: [ /*0模板*/
	        { "row": 1, "endbal": 0 },
	        { "row": 2, "endbal": 0 },
	        { "row": 3, "endbal": 0 },
	        { "row": 4, "endbal": 0 },
	        { "row": 5, "endbal": 0 },
	        { "row": 6, "endbal": 0 },
	        { "row": 7, "endbal": 0 },
	        { "row": 8, "endbal": 0 },
	        { "row": 9, "endbal": 0 },
            { "row": 10, "endbal": 0 },
            { "row": 11, "endbal": 0 },
            { "row": 12, "endbal": 0 },
            { "row": 13, "endbal": 0 },
            { "row": 14, "endbal": 0 },
            { "row": 15, "endbal": 0 },
            { "row": 16, "endbal": 0 },
            { "row": 17, "endbal": 0 },
            { "row": 18, "endbal": 0 },
            { "row": 19, "endbal": 0 },
            { "row": 20, "endbal": 0 },
            { "row": 21, "endbal": 0 }
        ],
	    table: '*A200000企业所得税月（季）度纳税申报表2018年版(A类)',
	    /*申报菜单名*/
	    parent: '居民企业所得税（据实预缴新）',
	    /*父级菜单名*/
	    url: '/hlwsb/qysds/getSB_QYSDS_JM_YJ_A_2015.do',
	    saveUrl: '/hlwsb/qysds/insertSB_QYSDS_JM_YJ_A_2015.do',
	    saveUrl_update: '/hlwsb/qysds/updateSB_QYSDS_JM_YJ_A_2015.do',
	    obj: 'jm_yj_a',
	    cellCols: ["LJJE","QMCYRS"]
	},
	'10104111022': {/*企业所得税 2*/
	    model: [ /*0模板*/
	        { "row": 1, "endbal": 0 }
        ],
	    table: 'A201010免税收入、减计收入、所得减免等优惠明细表',
	    /*申报菜单名*/
	    parent: '居民企业所得税（据实预缴新）',
	    /*父级菜单名*/
	    url: '/hlwsb/qysds/getSB_QYSDS_JM_YJ_A_FB1.do',
	    saveUrl: '/hlwsb/qysds/insertSB_QYSDS_JM_YJ_A_FB1.do',
	    obj: 'jm_yj_a',
	    cellCols: []
	},
	'10104111023': {/*企业所得税 3*/
	    model: [ /*0模板*/
	        { "row": 1, "endbal": 0 }
        ],
	    table: 'A201020固定资产加速折旧(扣除)优惠明细表',
	    /*申报菜单名*/
	    parent: '居民企业所得税（据实预缴新）',
	    /*父级菜单名*/
	    url: '/hlwsb/qysds/getSB_QYSDS_JM_YJ_A_FB2_2015.do',
	    saveUrl: '/hlwsb/qysds/insertSB_QYSDS_JM_YJ_A_FB2_2015.do',
	    saveUrl_update: '/hlwsb/qysds/updateSB_QYSDS_JM_YJ_A_FB2_2015.do',
	    obj: 'jm_yj_a_fb2',
	    cellCols: []
	},
	'10104111024': {/*企业所得税 4*/
	    model: [ /*0模板*/
	        { "row": 1, "endbal": 0 }
        ],
	    table: 'A201030减免所得税优惠明细表附表',
	    /*申报菜单名*/
	    parent: '居民企业所得税（据实预缴新）',
	    /*父级菜单名*/
	    url: '/hlwsb/qysds/getSB_QYSDS_JM_YJ_A_FB3.do',
	    saveUrl: '/hlwsb/qysds/insertSB_QYSDS_JM_YJ_A_FB3.do',
	    // saveUrl_update: '/hlwsb/qysds/updateSB_QYSDS_JM_YJ_A_FB3.do',
	    obj: 'jm_yj_a3',
	    cellCols: []
	},
	'10104110003': {/*企业所得税 B类 核定征收*/
	    model: [ /*0模板*/
	        { "row": 1, "endbal": 0 }
        ],
	    table: '*B100000企业所得税月（季）度预缴纳税申报表B类',
	    /*申报菜单名*/
	    parent: '居民企业所得税（核定新）',
	    /*父级菜单名*/
	    url: '/hlwsb/qysds/getSB_QYSDS_JM_YJ_B_2015.do',
	    saveUrl: '/hlwsb/qysds/insertSB_QYSDS_JM_YJ_B_2015.do',
	    saveUrl_update: '/hlwsb/qysds/updateSB_QYSDS_JM_YJ_B_2015.do',
	    obj: 'jm_yj_b',
	    cellCols: []
	},
	'101012007': {
	    model: [ /*0模板*/
	        { "row": 1, "endbal": 0 },
	        { "row": 2, "endbal": 0 },
	        { "row": 3, "endbal": 0 },
	        { "row": 4, "endbal": 0 },
	        { "row": 5, "endbal": 0 },
	        { "row": 6, "endbal": 0 },
	        { "row": 7, "endbal": 0 },
	        { "row": 8, "endbal": 0 },
	        { "row": 9, "endbal": 0 },
	        { "row": 10, "endbal": 0 },
	        { "row": 11, "endbal": 0 },
	        { "row": 12, "endbal": 0 },
	        { "row": 13, "endbal": 0 },
	        { "row": 14, "endbal": 0 },
	        { "row": 15, "endbal": 0 },
	        { "row": 16, "endbal": 0 },
	        { "row": 17, "endbal": 0 },
	        { "row": 18, "endbal": 0 },
	        { "row": 19, "endbal": 0 },
	        { "row": 20, "endbal": 0 },
	        { "row": 21, "endbal": 0 },
	        { "row": 22, "endbal": 0 }
	    ],
	    table: '*增值税纳税申报表（小规模纳税人适用2016年版）',
	    /*申报菜单名*/
	    parent: '增值税（小规模纳税人适用）查账征收',
	    /*父级菜单名*/
	    url: '/hlwsb/zzs/xgm/getSB_ZZS_XGMNSR_CZZS.do',
	    saveUrl: '/hlwsb/zzs/xgm/insertSB_ZZS_XGMNSR_CZZS.do',
	    saveUrl_update: '/hlwsb/zzs/xgm/updateSB_ZZS_XGMNSR_CZZS.do',
	    obj: 'czzs',
	    cellCols: ["BQS_YSHWJLW", "BQS_YSFW"]
	},
	'101012008': {
	    model: [ /*0模板*/
	        { "row": 1, "endbal": 0 },
	        { "row": 2, "endbal": 0 },
	        { "row": 3, "endbal": 0 },
	        { "row": 4, "endbal": 0 },
	        { "row": 5, "endbal": 0 },
	        { "row": 6, "endbal": 0 },
	        { "row": 7, "endbal": 0 },
	        { "row": 8, "endbal": 0 },
	        { "row": 9, "endbal": 0 },
	        { "row": 10, "endbal": 0 },
	        { "row": 11, "endbal": 0 },
	        { "row": 12, "endbal": 0 },
	        { "row": 13, "endbal": 0 },
	        { "row": 14, "endbal": 0 },
	        { "row": 15, "endbal": 0 },
	        { "row": 16, "endbal": 0 }
	    ],
	    table: '增值税纳税申报表（小规模纳税人适用）附列资料（2016年版）',
	    /*申报菜单名*/
	    parent: '增值税（小规模纳税人适用）查账征收',
	    /*父级菜单名*/
	    url: '/hlwsb/zzs/xgm/getSB_ZZS_XGMNSR_CZZS_FB1_2016.do',
	    saveUrl: '/hlwsb/zzs/xgm/insertSB_ZZS_XGMNSR_CZZS_FB1_2016.do',
	    saveUrl_update: '/hlwsb/zzs/xgm/updateSB_ZZS_XGMNSR_CZZS_FB1_2016.do',
	    obj: 'fb1',
	    cellCols: ["COL01", "COL02", "COL03", "COL04", "COL05", "COL06",
	        "COL07", "COL08", "COL09", "COL10", "COL11", "COL12",
	        "COL13", "COL14", "COL15", "COL16"
	    ]
	},
	'10104111009': {/*暂时不处理*/
	    model: [ /*0模板*/
	        { "row": 1, "endbal": 0 },
	        { "row": 2, "endbal": 0 }
	    ],
	    table: '固定资产加速折旧（扣除）明细表（二）',
	    /*申报菜单名*/
	    parent: '居民企业所得税（据实预缴新）',
	    /*父级菜单名*/
	    url: '/hlwsb/qysds/getSB_QYSDS_JM_YJ_A_FB2_2015.do',
	    saveUrl: '/hlwsb/qysds/updateSB_QYSDS_JM_YJ_A_FB2_2015.do',
	    obj: 'jm_yj_a',
	    cellCols: ["XM", "COL01", "COL02", "COL03", "COL04", "COL05", "COL06", "COL07", "COL08", "COL09", "COL10", "COL11", "COL12", "COL13", "COL14", "COL15", "COL16", "COL17"]
	},
	'101018001': {/*附加税 没有实际需要填写的行，只需要填写联系方式*/
	    model: [ /*附加税 0模板*/
	        { "row": 1, "endbal": 0 }
	    ],
	    table: '*城建税、教育费附加、地方教育附加税（费）申报表',
	    /*申报菜单名*/
	    parent: '附加税申报',
	    /*父级菜单名*/
	    url: '/hlwsb/fjs/getSB_FJS_ZB.do',
	    saveUrl: '/hlwsb/fjs/insertSB_FJS_ZB.do',
	    obj: 'fjszb',
	    cellCols: ["LXFS"]
	},
	'103012601': {
	    model: [ /*文化事业建设费 0模板*/
	        { "row": 1, "endbal": 0 },
	        { "row": 2, "endbal": 0 },
	        { "row": 3, "endbal": 0 },
	        { "row": 4, "endbal": 0 },
	        { "row": 5, "endbal": 0 },
	        { "row": 6, "endbal": 0 },
	        { "row": 7, "endbal": 0 },
	        { "row": 8, "endbal": 0 },
	        { "row": 9, "endbal": 0 },
	        { "row": 10, "endbal": 0 },
	        { "row": 11, "endbal": 0 },
	        { "row": 12, "endbal": 0 },
	        { "row": 13, "endbal": 0 },
	        { "row": 14, "endbal": 0 },
	        { "row": 15, "endbal": 0 },
	        { "row": 16, "endbal": 0 },
	        { "row": 17, "endbal": 0 },
	        { "row": 18, "endbal": 0 },
	        { "row": 19, "endbal": 0 }
	    ],
	    table: '*文化事业建设费申报表',
	    /*申报菜单名*/
	    parent: '文化事业建设费',
	    /*父级菜单名*/
	    url: '/hlwsb/zfxjj/getSB_WHSYJSF.do',
	    saveUrl: '/hlwsb/zfxjj/insertSB_WHSYJSF.do',
	    saveUrl_update: '/hlwsb/zfxjj/updateSB_WHSYJSF.do',
	    obj: 'whsyjsf',
	    cellCols: ["BYS"]
	}
};
/*申报顺序及申报表过滤规则，只有定义在这里边的表才会去自动打开申报系统对应表并填报*/
bstClientUtil.dataConf = [
    /*增值税 小规模 3张表 1231，企业所得税 4张表12341234，这个逻辑的表顺序非要求不要动，其他表顺序不限制*/
    /*1 增值税 小规模 纳税申报表*/
    {"sbbid":"101012007","conf":{"dofill":1,"dosave":1,"submitorder":0}},
    /*2 增值税 小规模 纳税申报 附列*/
    {"sbbid":"101012008","conf":{"dofill":1,"dosave":1,"submitorder":0}},
    /*3 增值税 小规模 减免税明细表， 暂时不填数，只保存*/
    {"sbbid":"101012009","conf":{"dofill":0,"dosave":1,"submitorder":0}},
    /*1 不填数，只保存*/
    {"sbbid":"101012007","conf":{"dofill":0,"dosave":1,"submitorder":0}},
    /*1 企业所得税*/
    {"sbbid":"10104111021","conf":{"dofill":1,"dosave":1,"submitorder":0}},
    /*2 企业所得税*/
    {"sbbid":"10104111022","conf":{"dofill":0,"dosave":1,"submitorder":0}},
    /*3 企业所得税*/
    {"sbbid":"10104111023","conf":{"dofill":0,"dosave":1,"submitorder":0}},
    /*4 企业所得税*/
    {"sbbid":"10104111024","conf":{"dofill":0,"dosave":1,"submitorder":0}},
    /*1 企业所得税*/
    {"sbbid":"10104111021","conf":{"dofill":1,"dosave":1,"submitorder":0}},
    /*2 企业所得税*/
    {"sbbid":"10104111022","conf":{"dofill":0,"dosave":1,"submitorder":0}},
    /*3 企业所得税*/
    {"sbbid":"10104111023","conf":{"dofill":0,"dosave":1,"submitorder":0}},
    /*4 企业所得税*/
    {"sbbid":"10104111024","conf":{"dofill":0,"dosave":1,"submitorder":0}},
    /* 资产负债表 小企业*/
    {"sbbid":"50100311001","conf":{"dofill":1,"dosave":1,"submitorder":0}},
    /* 利润表 小企业*/
    {"sbbid":"50100311002","conf":{"dofill":1,"dosave":1,"submitorder":0}},
    /* 现金流量表 小企业 暂时不报了*/
    // {"sbbid":"50100311003","conf":{"dofill":1,"dosave":1,"submitorder":0}},
    /* 资产负债表 一般企业*/
    {"sbbid":"50100201001","conf":{"dofill":1,"dosave":1,"submitorder":0}},
    /* 利润表 一般企业*/
    {"sbbid":"50100201002","conf":{"dofill":1,"dosave":1,"submitorder":0}},
    /* 现金流量表 一般企业 暂时不报了*/
    // {"sbbid":"50100201003","conf":{"dofill":1,"dosave":1,"submitorder":0}},
    /* 文化事业建设费*/
    {"sbbid":"103012601","conf":{"dofill":1,"dosave":1,"submitorder":0}},
    /* 附加税  目前填报逻辑必须放到最后 submitorder 1 */
    {"sbbid":"101018001","conf":{"dofill":1,"dosave":1,"submitorder":1}}
];