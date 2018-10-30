bstClientUtil.list_url = '/webroot/com/neusoft/tax/wlsb/byysb/mainbyysblist.execute.svc';

bstClientUtil.init = {
	'ds_init':{
		clickSearch_url:'/webroot/com/neusoft/etax/recommend/RecommendMenu.collect.svc',//点击查询菜单
		data_url:'/webroot/com/neusoft/tax/wlsb/byysb/Byysb.looksfzrdxx.svc',//监听数据
		dskk_url:'/webroot/com/neusoft/etax/recommend/RecommendMenu.collect.svc'//地税扣款
	}
}

bstClientUtil.data = {
	'GHJF0001':{/*工会经费*/
		run_fun:'run_ghjf',/*填数逻辑*/
		load_url:'/webroot/net/hitina/spark/declaration/Declaration.initialize.svc',/*加载成功回调*/
		saved_url:'/webroot/net/hitina/spark/declaration/Declaration.submit.svc',/*数据提交回调*/
		nopay_url:'/webroot/com/neusoft/tax/wlsb/byysb/Byysb.nopay.svc',/*0申报回调*/
		queryje_url:'/webroot/com/neusoft/tax/wlsb/byysb/byysb.querysbje.svc'/*查看税金*/
	},
	'SBGF0005':{/*附加税*/
		run_fun:'run_fjs',/*填数逻辑*/
		load_url:'/webroot/net/hitina/spark/declaration/Declaration.initialize.svc',/*加载成功回调*/
		saved_url:'/webroot/net/hitina/spark/declaration/Declaration.submit.svc',/*数据提交回调*/
		nopay_url:'/webroot/com/neusoft/tax/wlsb/byysb/Byysb.nopay.svc',/*0申报回调*/
		queryje_url:'/webroot/com/neusoft/tax/wlsb/byysb/byysb.querysbje.svc'/*查看税金*/
	},
	'YHS0001':{/*印花税*/
		run_fun:'run_yhs',/*填数逻辑*/
		load_url:'/webroot/net/hitina/spark/declaration/Declaration.initialize.svc',/*加载成功回调*/
		saved_url:'/webroot/net/hitina/spark/declaration/Declaration.submit.svc',/*数据提交回调*/
		nopay_url:'/webroot/com/neusoft/tax/wlsb/byysb/Byysb.nopay.svc',/*0申报回调*/
		queryje_url:'/webroot/com/neusoft/tax/wlsb/byysb/byysb.querysbje.svc'/*查看税金*/
	},
	'GS0001':{/*个人所得税*/
		run_fun:'run_grsds',/*填数逻辑*/
		load_url:'/webroot/com/neusoft/etax/wlsb/gs0001/gskjsbbmx3list.execute.svc',/*加载成功回调*/
		saved_url:'/webroot/com/neusoft/etax/wlsb/gs0001/gskjsbb.submit.svc',/*数据提交回调*/
		nopay_url:'/webroot/com/neusoft/tax/wlsb/byysb/byysb.nopay.svc',/*0申报回调*/
		queryje_url:'/webroot/com/neusoft/tax/wlsb/byysb/byysb.querysbje.svc',/*查看税金*/
		remove_url:'/webroot/com/neusoft/etax/wlsb/gs0001/gskjsbb.removedata.svc',/*删除原数据*/
		save_url:'/webroot/com/neusoft/etax/wlsb/gs0001/gskjsbb.declare.svc',/*保存数据*/
		init_url:'/webroot/com/neusoft/etax/wlsb/gs0001/gskjsbb.initdata.svc'/*提取上期数据*/
	}
};