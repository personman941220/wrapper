function bstClientUtil(){}
/*默认超时时间，静态变量*/
bstClientUtil.timeout = 30000;
/*
 * 添加url拦截器
 * url和callback必填
 * timeout选填
 * */
bstClientUtil.prototype.addHttpFilter = function(param){
	var url = param.url;
	var callback = param.callback;
	var timeout;
	if(typeof param.timeout == 'number'){
		timeout = param.timeout;
	}else{
		timeout = bstClientUtil.timeout;
	}
	return external.AddHttpRequestFilter(url, callback, timeout, true);
}
/*删除url拦截器*/
bstClientUtil.prototype.removeHttpFilter = function(url){
	return external.RemoveHttpRequestFilter(url);
}
/*设置内存临时变量*/
bstClientUtil.prototype.setData = function(key,value){
	external.SetTempData(key, value);
}
/*获取内存临时变量*/
bstClientUtil.prototype.getData = function(key){
	return external.GetTempData(key);
}
/*清除数据临时变量*/
bstClientUtil.prototype.clearData = function(key,value){
	external.ClearTempData();
}
/*根据菜单名称和父级菜单名称获取菜单node对象*/
bstClientUtil.prototype.getNode = function(obj,key,name,parent){
    // debugger;
	var node_ary = $.fn.zTree.getZTreeObj(obj).getNodesByParam(key,name);
	if(node_ary==null || node_ary.length==0){
		return null;
	}
	if(parent){
		for(var i = 0;i<node_ary.length;i++){
			if(node_ary[i].getParentNode()!=null&&node_ary[i].getParentNode()[key] == parent){
				return node_ary[i];
			}
		}
	}else{
		return node_ary[0];
	}
	return null;
};
/*打开node菜单*/
bstClientUtil.prototype.openNode = function(obj,node){
	// debugger;
	$.fn.zTree.getZTreeObj(obj).selectNode(node,false,true);
	$('#'+node.tId+' a').click();
};
/*获取当前iframe对象 国税*/
bstClientUtil.prototype.findFrame = function(){
	var iframeObj;
	$(".navTab-panel").find("iframe").each(function(idx, obj) {
		var dis = $(obj).is(":visible");
		if (dis) {
			iframeObj = obj;
			return;
		}
	});
	return iframeObj;
};
/*获取当前时间*/
bstClientUtil.prototype.getDate = function(){
	var mydate = new Date();
	var str = "" + mydate.getFullYear() + "-";
	str += (mydate.getMonth()+1) + "-";
	str += mydate.getDate();
	return str;
};
/*获取当前iframe对象 地税*/
bstClientUtil.prototype.findFrameDs = function(){
	return $("iframe")[0].contentWindow.document;
};

bstClientUtil.goToTableDsParam_url;
bstClientUtil.goToTableDsParam_callback;
bstClientUtil.goToTableDsParam_rowIndex;
bstClientUtil.goToTableDsParam_iframe;
/*地税跳转工具方法，注意是静态方法，rowNo从1开始，同步方法不能重复调用*/
bstClientUtil.goToTableDs = function(url,callback,iframe,rowNo) {
	var pageNum, rowIndex,pageTbody;
	var pageSize = 10;
	/*计算某张报表在列表的第几页，好进行翻页*/
	if(rowNo%pageSize == 0){
		pageNum = rowNo/pageSize;
		rowIndex = pageSize-1;
	}else{
		pageNum = parseInt(rowNo/pageSize)+1;
		rowIndex = rowNo%pageSize-1;
	}
	pageTbody = $(iframe).find("table:eq(1)").find("tbody:eq(0)");
	bstClientUtil.goToTableDsParam_url = url;
	bstClientUtil.goToTableDsParam_callback = callback;
	bstClientUtil.goToTableDsParam_rowIndex = rowIndex;
	bstClientUtil.goToTableDsParam_iframe = iframe;
	if(pageNum>1){
		external.AddHttpRequestFilter(bstClientUtil.list_url, 'bstClientUtil.goToTableDs_callback', bstClientUtil.timeout, true);
		pageTbody.find("ul:eq(1) li:eq(" + (pageNum + 1) + ") a")[0].click();
	}else{
		bstClientUtil.goToTableDs_callback(1);
	}
};
/*地税跳转，如需翻页，翻页处理*/
bstClientUtil.goToTableDs_callback = function(res){
	if(res==null||res==''){
		/*处理超时*/
		return;
	}
	external.AddHttpRequestFilter(bstClientUtil.goToTableDsParam_url, bstClientUtil.goToTableDsParam_callback, bstClientUtil.timeout, true);
	var dataTbody = $(bstClientUtil.goToTableDsParam_iframe).find("table:eq(0)").find("tbody:eq(0)");
	dataTbody.find("tr:eq(" + bstClientUtil.goToTableDsParam_rowIndex + ")").find("td:eq(1) a")[0].click();
};
/*获取申报，保存按钮*/
bstClientUtil.prototype.findBtnByName = function(iframe, id, name) {
	var $btnDiv, btnObj;
	if (id == "SBGF0005" || id == "YHS0001" || id == "GHJF0001") {
		$btnDiv = $(iframe).find(".p5 .panel").next();
	} else if (id == "GS0001") {
		$btnDiv = $(iframe).find(".bg-gray");
	} else{
		return null;
	}
	$btnDiv.find(".btn").each(function() {
		if (this.innerHTML == name && $(this).css("display") != "none") {
			btnObj = $(this);
			return;
		}
	});
	return btnObj;
};
/*地税跳回主页*/
bstClientUtil.prototype.goMain = function(callback) {
	external.AddHttpRequestFilter(bstClientUtil.list_url, callback, bstClientUtil.timeout, true);
	$("#pageBtn")[0].click();
};