var pageNum;
var pages;
var total;
/*
 * 获取显示数据列表
 */
function getInvoiceList(pageNum,length){
	//获取查询条件
	var LPN=document.getElementById("LPN").value;
	var enterBy=document.getElementById("enterBy").value;	
	$.ajax({
		type:"post",
		url:"preprintedInvoice/getList.do",
		async:false,
		data:{"pageNum":pageNum,"length":length,"LPN":LPN,"enterBy":enterBy},
		dataType:"JSON",
		success: function(data){
			 $("#invoice_list tr:gt(0)").remove();
			//进行json数据类型转换
		    var pageInfo=eval(data);
			var view=pageInfo.list;	
			//初始化全局变量
			pageNum=pageInfo.pageNum;
			pages=pageInfo.pages;
			total=pageInfo.total;
			//遍历集合，显示数据
			for (var i = 0; i <view.length; i++) {			            	           	
			     $("#invoice_list").append("<tr>" +			        
				    "<td style='text-align: left; width: 10%' >" + (i+1) + "</td>" +
				    "<td style='text-align: left; width: 15%'  >" + view[i].LPN+"</td>" +
				    "<td style='text-align: left; width: 15%'  >" + view[i].invoiceTime + "</td>" +
				    "<td style='text-align: left; width: 15%' >" + view[i].enterBy + "</td>" +
				    "<td style='text-align: left; width: 15%'  >" + view[i].money + "</td>" +
				    "<td style='text-align: left; width: 15%'   >" + view[i].outTime + "</td>" +				    
				    "<td style='text-align: left; width: 15%'  >"+
                      "<a href='javascript:show("+view[i].id+")' name ='updateproduct"+i+"'   rel='external nofollow'>修改</a>&nbsp;&nbsp|&nbsp;&nbsp" +
                      "<a href='javascript:del("+view[i].id+")' name='delproduct"+i+"' rel='external nofollow'>删除</a>"
                      +"</td>"+
				    "</tr>");
			    }       	
			
		},
		error: function(){
			alert("数据查询失败！");
		}
	});
}

function initPages(pageNum,length) {
	//获取查询条件
	var LPN=document.getElementById("LPN").value;
	var enterBy=document.getElementById("enterBy").value;	
	$.ajax({
		type:"post",
		url:"preprintedInvoice/getList.do",
		async:false,
		data:{"pageNum":pageNum,"length":length,"LPN":LPN,"enterBy":enterBy},
		dataType:"JSON",
		success: function(data){			
			//进行json数据类型转换
		    var pageInfo=eval(data);			
			//初始化全局变量
			pageNum=pageInfo.pageNum;
			pages=pageInfo.pages;
			total=pageInfo.total;
		},
		error: function(){
			alert("数据查询失败！");
		}
	});
}

///*
//* 点击添加按钮事件
// */
//$(document).ready(function(){	
//	$("#invoice_add").click(function(){		
//		document.getElementById('light').style.display='block';
//		document.getElementById('fade').style.display='block';
//	});
//	
//});
/*
 * 显示弹窗
 */
function  show(id){	
	//判断是添加事件还是修改事件
	if(id=='0'){
		document.getElementById('invoice_tj').style.display='inline';
		document.getElementById('light').style.display='block';
		document.getElementById('fade').style.display='block';
	}else{		
		//加载修改信息
		$.ajax({
			type: "post",
			url: "preprintedInvoice/getAlterInfo.do",
			async: false,
			data: {"id":id},			
			dataType:"json",
			success: function(invoiceForm){				
				//设置显示值
				document.getElementById("A_LPN").value=invoiceForm.LPN;
				document.getElementById("A_invoiceTime").value=invoiceForm.invoiceTime;
				document.getElementById("A_money").value=invoiceForm.money;
				document.getElementById("A_outTime").value=invoiceForm.outTime;
				document.getElementById("A_id").value=invoiceForm.id;
				//弹窗显示
				document.getElementById('invoice_alter').style.display='inline';
				document.getElementById('light').style.display='block';
				document.getElementById('fade').style.display='block';
			},
			error: function(msg){
				alert("加载修改信息失败");
				
			}
		});
	}
}	

/*
 * 弹窗关闭事件
 */
function windowClose() {	
	document.getElementById('invoice_tj').style.display='none';	
	document.getElementById('invoice_alter').style.display='none';
	document.getElementById('light').style.display='none';
	document.getElementById('fade').style.display='none';
}


/*
* 添加手撕票信息
*/
function addInvoice() {
	var LPN=document.getElementById("A_LPN").value;
	var invoiceTime=document.getElementById("A_invoiceTime").value;
	var money=document.getElementById("A_money").value;
	var outTime=document.getElementById("A_outTime").value;
	//验证信息
	if(LPN==null||LPN==""){
		alert("请输入车牌号！");
		return;
	}
	if(invoiceTime==null||invoiceTime==""){
		alert("请选择开票时间！");
		return;
	}
	if(money==null||money==""){
		alert("请输入开票金额！");
		return;
	}
	if(outTime==null||outTime==""){
		alert("请选择车辆出场时间！");
		return;
	}		
	/*
	 * 验证通过，提交信息到后台
	 * '{"LPN":'+LPN+',"invoiceTime":'+invoiceTime+',"money":'+money+',"outTime":'+outTime+'}'
	 */
	
	$.ajax({
		type: "post",
		url: "preprintedInvoice/add.do",
		async: false,
		data: {"LPN":LPN,"invoiceTime":invoiceTime,"money":money,"outTime":outTime},			
		dataType:"text",
		success: function(msg){
			alert("成功");
			//关闭窗口
			windowClose();
			//更新显示
			getInvoiceList(1,10);
		},
		error: function(msg){
			alert("失败");
		}
	});

}
/*
 * 修改手撕票信息
 */
function alter(){	
	/*
	 * 异步加载，修改数据信息
	 */
	var LPN=document.getElementById("A_LPN").value;
	var invoiceTime=document.getElementById("A_invoiceTime").value;
	var money=document.getElementById("A_money").value;
	var outTime=document.getElementById("A_outTime").value;
	var id=document.getElementById("A_id").value;	
	//验证信息
	if(LPN==null||LPN==""){
		alert("请输入车牌号！");
		return;
	}
	if(invoiceTime==null||invoiceTime==""){
		alert("请选择开票时间！");
		return;
	}
	if(money==null||money==""){
		alert("请输入开票金额！");
		return;
	}
	if(outTime==null||outTime==""){
		alert("请选择车辆出场时间！");
		return;
	}		
	/*
	 * 验证通过，提交信息到后台
	 * '{"LPN":'+LPN+',"invoiceTime":'+invoiceTime+',"money":'+money+',"outTime":'+outTime+'}'
	 */
	
	/*
	 * 获取绝对路径
	 */
	var location = (window.location+'').split('/'); 
	basePath = location[0]+'//'+location[2]+'/'+location[3]; 
	$.ajax({
		type: "post",
		url: basePath+"/preprintedInvoice/alter.do",
		async: false,
		data: {"LPN":LPN,"invoiceTime":invoiceTime,"money":money,"outTime":outTime,"id":id},			
		dataType:"text",
		success: function(msg){
			alert("更新成功");
			//关闭当前窗口
			windowClose();
			//更新显示列表
			getInvoiceList(1,10);
		},
		error: function(msg){
			alert("更新失败");
		}
	});

}

/*
 * 删除数据信息
 */
function del(id){
	if(id==null||id==""){
		alert("删除数据信息不存在！");
		return;
	}
	/*
	 * 异步请求，删除信息
	 */
	if(confirm("确认删除？")==true){
		$.ajax({
			type:"post",
			url:"preprintedInvoice/delete.do",
			async:false,
			data:{"id":id},
			dataType:"text",
			success: function(msg){
				alert("删除成功！");
				//更新显示信息
				getInvoiceList(1,10);
			},
			error: function(error){
				alert("删除失败！");
			}
		});
	}	
}

/*
 * 页面进入时触发事件。
 */
//window.onload=function(){
//	getInvoiceList(1,10);
//}

/*
 * 日期控件
*/
$(function() {
	 
	$('.invoiceTime').on('click', function(){
		WdatePicker({maxDate:'%y-%M-{%d}',dateFmt:'yyyy-MM-dd HH:mm:ss'});
	});
	$('.outTime').on('click', function(){
		WdatePicker({minDate:'%y-%M-{%d}',dateFmt:'yyyy-MM-dd HH:mm:ss'});
	});
	 
	 
});	


