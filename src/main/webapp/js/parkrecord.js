/*
 * select点击事件
 */
function search(){
	/*
	 * 获取selectDiv
	 */	
	var selectDiv=document.getElementById("select");	
	
	if(selectDiv.style.display=="none"||selectDiv.style.display==""){		
		selectDiv.style.display="block";
		/*
		 * 设置tab位置下移
		 */
		var tab=document.getElementById("park_list");
		tab.style.top="200px";
	}else{
		selectDiv.style.display="none";
		/*
		 * 设置tab位置下移
		 */
		var tab=document.getElementById("park_list");
		tab.style.top="50px";
	}
	
	
}

/*
 * 区域选择
 */		
		var falg = true;   
		function showArea(){
				var area=document.getElementById("area");
				$.ajax({
					url:"parkRecord/getAreaData.do",
					type:"post",
					data:{},			
					dataType:"json",
					success: function(data){
						//判断是否为第一次执行
						if(falg==true){
							//将数据转换成json格式										
							var child=eval(data);				
							for(var i=0;i<child.length;i++){
							//动态的创建节点				
							var areaName=document.createElement("option");				
							//设置节点的value属性				
							areaName.innerHTML=child[i].name;				
							//添加子节点
							area.appendChild(areaName);
							//设置全局变量为
							falg=false;	
						}
																	
					}
				}
				
			});
		}

		
		

		//获取多级下拉组织
	
		
		function TreeSelector(item,data,rootId){ 
			this._data = data; 
			this._item = item; 
			this._rootId = rootId; 
		} 
		TreeSelector.prototype.createTree = function(){ 
			var len =this._data.length; 
			for( var i= 0;i<len;i++){ 
			if ( this._data[i].pid == this._rootId){ 
			this._item.options.add(new Option(".."+this._data[i].text,this._data[i].id)); 
			for(var j=0;j<len;j++){ 
			this.createSubOption(len,this._data[i],this._data[j]); 
			} 
			} 
			} 
		};
			 
		TreeSelector.prototype.createSubOption = function(len,current,next){ 
			var blank = ".."; 
			if ( next.pid == current.id){ 
			intLevel =0; 
			var intlvl =this.getLevel(this._data,this._rootId,current); 
			for(a=0;a<intlvl;a++) 
			blank += ".."; 
			blank += "┣"; 
			this._item.options.add(new Option(blank + next.text,next.id)); 
			for(var j=0;j<len;j++){ 
			this.createSubOption(len,next,this._data[j]); 
			} 
			} 
			} ;
		TreeSelector.prototype.getLevel = function(datasources,topId,currentitem){ 
			var pid =currentitem.pid; 
			if( pid !=topId) 
			{ 
			for(var i =0 ;i<datasources.length;i++) 
			{ 
			if( datasources[i].id == pid) 
			{ 
			intLevel ++; 
			this.getLevel(datasources,topId,datasources[i]); 
			} 
			} 
			} 
			return intLevel; 
		} ;
		
		
		var data =new Array(); 
		var ts;
		var ts1;
		

		
			
			
	/////////////////////////////
/*
 * 查询事件
 */
		function selectByConditions(LPN,isInvoice,start,length){	
			//查询条件判断为空
			if(LPN==""&&isInvoice=="--请选择开票状态"){
				alert("请输入查询条件！");
				return;
			}
			/*
			 * 异步加载查询结果信息
			 */
			$.ajax({
				url:"parkRecord/select.do",
				type:"post",
				data:{"LPN":LPN,"isInvoice":isInvoice,"start":start,"length":length},		
				dataType:"json",
				success: function(msg){			
					 $("#park_list tr:gt(0)").remove();
					 //进行json数据类型转换
					 var pageInfo=eval(msg);
					 var view=pageInfo.list;
					 //遍历集合，显示数据列表
			            for (var i = 0; i <view.length; i++) {
			            	var isInvoice
			            	if(view[i].isInvoice==0)
			            		isInvoice="否";
			            	else
			            		isInvoice="是";	            	
			            	$("#park_list").append("<tr>" +
			            			 //"<td style='text-align: left; width: 10%' ><input type=\"checkbox\" name=\"list_check\"/></td>" +
				                      "<td style='text-align: left; width: 10%' >" + view[i].LPN + "</td>" +
				                      "<td style='text-align: left; width: 10%'  >" + isInvoice+"</td>" +
				                      "<td style='text-align: left; width: 10%'  >" + view[i].startTime + "</td>" +
				                      "<td style='text-align: left; width: 10%' >" + view[i].endTime + "</td>" +
				                      "<td style='text-align: left; width: 10%'  >" + view[i].ARM + "</td>" +
				                      "<td style='text-align: left; width: 10%'   >" + view[i].TTC + "</td>" +
				                      "<td style='text-align: left; width: 10%'  >" + view[i].name + "</td>" +
				                      "<td style='text-align: left; width: 10%'  >" + view[i].voucherId + "</td>" +
				                      "<td style='text-align: left; width: 10%'  >" + view[i].ECB + "</td>" +
				                     "</tr>");
			            	}
			          //更新显示分页信息
			           var info="当前第"+pageInfo.pageNum+" 页.总共 "+pageInfo.pages+" 页.一共 "+pageInfo.total+" 条记录";	           
			          document.getElementById("pageInfo").innerHTML=info;
			          //分页菜单更新
			          var page_menu="<nav aria-label=\"Page navigation\">"+  
		                "<ul class=\"pagination\">"+
		                    "<li><a href=\"javascript\:pageTurn('1','10')\">首页</a></li>"+
		                    "<li>"+ 
		                    	
		                            "<a href=\"javascript\:pageTurn("+pageInfo.prePage+",'10')\" aria-label=\"Previous\">"+  
		                                "<span aria-hidden=\"true\">上一页</span>"+  
		                            "</a>"+ 
		                           
		                    "</li>"+		                    
		                    "<li>"+
		                    	
		                            "<a href=\"javascript\:pageTurn("+pageInfo.nextPage+",'10')\""+  
		                               "aria-label=\"Next\">"+  
		                                "<span aria-hidden=\"true\">下一页</span>"+  
		                            "</a>"+
		                             
		                    "</li>"+ 
		                    "<li><a href=\"javascript\:pageTurn("+pageInfo.pages+",'10')\">尾页</a></li>"+  
		                "</ul>"+  
		            "</nav>";
			          //alert(page_menu); 
			          document.getElementById("page").innerHTML=page_menu;
			          
				},
				error: function(error){
					alert("数据查询失败！");
				}
		});
				
				
		}

/*
 * 全选事件
 */
function selectAll() {
	var park_check_all=document.getElementById("park_check_all");
	var list_check=document.getElementsByName("list_check");
	if(park_check_all.checked==true){
		if(list_check.length){
			for(var i=0;i<list_check.length;i++){
				list_check[i].checked=true;
			}
		}
	}else{
		if(list_check.length){
			for(var i=0;i<list_check.length;i++){
				list_check[i].checked=false;
			}
		}
	}
}

/*
 *重置事件
 */
function reset() {
	var LPN=document.getElementById("LPN");
	LPN.value="";
}

/*
 * Excel异步加载导入
 */
function importExp() {
	//获取需要验证的数据
	var area=document.getElementById("area");
	var file=document.getElementById("file");
	
	
	var excel2003=".xls";
	var excel2007=".xlsx"
	//获取文件扩展名
	var extFile=file.value.substring(file.value.lastIndexOf("."));
	if(area.value==0){
		alert("请选择区域！");
		return false;
	}
	if(file.value==""){
		alert("请选择需要导入的Excel文件");
		return false;
	}
	if(extFile!=excel2003&&extFile!=excel2007){
		alert("文件类型不正确,请检查是否显示文件扩展名！");
		return false;
	}
	
	var formData=new FormData();
	formData.append("file",$("#file")[0].files[0]);
	formData.append("name",name);
	$.ajax({
		type:"post",
		url:"parkRecord/excelExport.do?areaId="+area.value,
		async:false,
		data:formData,
		dataType:"text",
		//告诉jquery不要去处理发送的数据
		processData:false,
		//告诉jquery不要设置content-type请求头
		contentType:false,		
		beforeSend:function(){
			console.log("正在进行，请稍后......");
		},
		success:function(msg){			
			if(msg=="success")
				alert("导入成功！");
			else
				alert("导入失败！");
		},
		error:function(error){
			alert("导入失败!");
		}
		
	});
}


function ajaxFileUpload() {
	 if($("#area").val()==0){
    	  alert("您好，请选择停车区域");
          return
    }
	 
    if($("#fileToUpload").val()==null||$("#fileToUpload").val()==""){
      alert("您好，请先导入选择文件");
      return;
    }
  
    
  
		$.ajaxFileUpload({
		url : "parkRecord/ajaxexcelExport.do?areaId="+area.value,
		secureuri : false,
		fileElementId : 'fileToUpload',
		dataType : 'text',
		data : {
			name : $('#name').val()
		},
		success : function(msg, status) {
			if(msg=="success")
				alert("导入成功！");
			else
				alert("导入失败！");
		},
		error : function(msg, status, e) {
			alert("导入失败!");
		}
	});

 
}

/*
*翻页操作
*/

function pageTurn(start,length) {
	//获取查询条件
	var LPN=document.getElementById("LPN").value;
	var isInvoice=document.getElementById("isInvoice").value;
	
	//查询条件判断为空
	if(LPN==""&&isInvoice=="--请选择开票状态"){
		//跳转主页翻页
		window.location.href="parkRecord/toParkIndex.do?start="+start+"&length="+length;
	}else{
		selectByConditions(LPN, isInvoice,start,length);
		
	}
	
}

	
