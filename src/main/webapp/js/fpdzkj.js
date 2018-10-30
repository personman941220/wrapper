/**
 * 电子发票单张开具js
 * 王培源 490176245@qq.com
 * 2018/3/16
 */
//调用方法
var basePath;
var proposals = new Array();
var shuil = new Array();
/*********输入型下拉框********/
$(document).ready(function(){
	var location = (window.location+'').split('/'); 
	basePath = location[0]+'//'+location[2];
	//alert(basePath);
    proposals = new Array();
    shuil = new Array();
    var proposals_gfnsrmc = new Array();//购方纳税人名称候选信息
    var proposals_gfxx = new Array();//购方信息
	_init_proposals();
	function _init_proposals() {
		$.ajax({
			url : basePath+"/invoice/initProposals.do", //要提交的URL路径
			type : "post", //发送请求的方式
			dataType : "json", //指定传输的数据格式
			success : function(result) {//请求成功后要执行的代码	
				for(var i=0;i<result.proposals.length;i++){
					//console.log("["+i+"]"+"sp_code"+result.proposals[i].sp_code);
					if(result.proposals[i].sp_code==null||result.proposals[i].sp_code.length<=0){
						proposals.push(result.proposals[i].sp_mc+ "|"+result.proposals[i].spbh);
						//console.log("["+i+"]"+result.proposals[i].sp_mc+ "|"+result.proposals[i].spbh);
					}else if(result.proposals[i].sp_code.trim()!=""){
						proposals.push(result.proposals[i].sp_mc+ "|"+result.proposals[i].spbh+"_"+result.proposals[i].sp_code);
						//console.log("["+i+"]"+result.proposals[i].sp_mc+ "|"+result.proposals[i].spbh+"_"+result.proposals[i].sp_code);
					}
					shuil.push(result.proposals[i].sl);
				}
				proposals_gfxx = result.proposals_gfxx;
				//alert("proposals_gfxx="+proposals_gfxx);
				for(var i=0;i<result.proposals_gfxx.length;i++){
					proposals_gfnsrmc.push(result.proposals_gfxx[i].GMF_MC);
					//alert("GMF_MC="+result.proposals_gfxx[i].GMF_MC);
				}
				//alert(result.proposals);
			}
		});
	}
	$('#spmc').autocomplete({
		hints: proposals,
		//width: 300,height: 30,
		onSubmit: function(text){
			//$('#message').html('Selected: <b>' + text + '</b>');	
			//alert(text);
			for(var i=0;i<proposals.length;i++){
				if(text==proposals[i]){
					$('#shuil0').val(shuil[i]);
					//如果金额（含税）有值，则重算
					if( $('#je0').val()!=null && $('#je0').val()!="" ){
						//alert("je0="+$('#je0').val());
						CalculationSE($('#je0').val(),0);
					}
				}
			}
			
		}
	});
	$('#gfnsrmc').autocomplete({
		hints: proposals_gfnsrmc,
		onSubmit: function(text){
			//填写纳税人识别号、地址、电话、开户行及账号、邮箱地址(QQ) proposals_gfxx
			for(var i=0;i<proposals_gfxx.length;i++){
				if (proposals_gfxx[i].GMF_MC==text) {
					$('#gfnsrsbh').val(proposals_gfxx[i].GMF_NSRSBH);
					$('#gfdzdh').val(proposals_gfxx[i].GMF_DZDH);
					$('#gfkhhzh').val(proposals_gfxx[i].GMF_YHZH);
					$('#gfyxdz').val(proposals_gfxx[i].GMF_LXFS);
				}
				
			}
			
		}
	});
});

//添加一行
function addRow() {
	//原来的行数    比如：此处获得表格的行数是5，则每一行对应的index是0~4，所以下面在insertRow时，使用的是表格的当前行数
	var currentRows = document.getElementById("list_table").rows.length;
	var insertTr = document.getElementById("list_table").insertRow(currentRows);
	//alert('ok');

	insertTd = insertTr.insertCell(0);
	insertTd.style.textAlign = "center";
	insertTd.style.background = "#d5f4fe";
	insertTd.innerHTML = "<div id='spmc" + (currentRows) + "'></div>";
	
	insertTd = insertTr.insertCell(1);
	insertTd.style.textAlign = "center";
	insertTd.style.background = "#d5f4fe";
	insertTd.innerHTML = "<input id='ggxh" + (currentRows) + "' type='text'/>";

	insertTd = insertTr.insertCell(2);
	insertTd.style.textAlign = "center";
	insertTd.style.background = "#d5f4fe";
	insertTd.innerHTML = "<input id='dw" + (currentRows) + "' type='text'/>";

	insertTd = insertTr.insertCell(3);
	insertTd.style.textAlign = "center";
	insertTd.style.background = "#d5f4fe";
	insertTd.innerHTML = "<input id='sul" + (currentRows) + "' type='text' oninput='javascript:CalculationJE(" + (currentRows) + ")'/>";

	insertTd = insertTr.insertCell(4);
	insertTd.style.textAlign = "center";
	insertTd.style.background = "#d5f4fe";
	insertTd.innerHTML = "<input id='dj" + (currentRows) + "' type='text' oninput='javascript:CalculationJE(" + (currentRows) + ")'/>";

	insertTd = insertTr.insertCell(5);
	insertTd.style.textAlign = "center";
	insertTd.style.background = "#d5f4fe";
	insertTd.innerHTML = "<input id='je" + (currentRows) + "'type='text' oninput='javascript:CalculationSE(this.value," + (currentRows) + ")'/>";

	insertTd = insertTr.insertCell(6);
	insertTd.style.textAlign = "center";
	insertTd.style.background = "#d5f4fe";
	insertTd.innerHTML = "<input id='shuil"+ (currentRows) + "'type='text' value='' disabled='disabled'>";

	insertTd = insertTr.insertCell(7);
	insertTd.style.textAlign = "center";
	insertTd.style.background = "#d5f4fe";
	insertTd.innerHTML = "<input id='se" + (currentRows) + "'type='text'/>";
	
	
	var shuilstr=  "#spmc"+ currentRows ;
	//alert(shuilstr);
	$(shuilstr).autocomplete({
		hints: proposals,
		//width: 300,height: 30,
		onSubmit: function(text){
			//$('#message').html('Selected: <b>' + text + '</b>');	
			//alert(text);
			for(var i=0;i<proposals.length;i++){
				if(text==proposals[i]){
					var shuilstr=  "#shuil"+ currentRows ;
					$(shuilstr).val(shuil[i]);
					//如果金额（含税）有值，则重算
					if( $('#je'+currentRows).val()!=null && $('#je'+currentRows).val()!="" ){
						CalculationSE($('#je'+currentRows).val(),currentRows);
					}
				}
			}
			
		}
	});
	
}

//删除最后一行
function deltr() {

	//删除指定Index的行
	var rowIndex = document.getElementById("list_table").rows.length;
	//alert(rowIndex);
	document.getElementById("list_table").deleteRow(rowIndex - 1);

}
//发票开具
function fpkj() {
	//alert("---function fpkj()---发票开具");
	var fpqqlsh = document.getElementById("fpqqlsh").value;
    console.log("----"+fpqqlsh);
    var tostring = "";//显示页面数据字符串
	//购方信息---第一部分
	var kprq = document.getElementById("kprq").innerHTML;
	var gfnsrmc = document.getElementById("gfmc").value;
	var gfnsrsbh = document.getElementById("gfsh").value;
	var gfdzdh = document.getElementById("gfdzdh").value;
	var gfkhhzh = document.getElementById("gfkhhzh").value;
	var gfyxdz = document.getElementById("gfyxdz").value;
	
	//表格数据---第二部分
	var rowIndex = document.getElementById("list_table").rows.length;//行数
	//alert(rowIndex);
	//声明二维数组
	var tableData = new Array(rowIndex);//有rowIndex行
	for (var i = 0; i < tableData.length; i++) {
		tableData[i] = new Array(8); //每行有8列  
	}
	//第一行
	//var spmc0 = document.getElementById("spmc0").value;
	var spmc0 = $('#spmc0 input[name="query"]').val();
	var ggxh0 = document.getElementById("ggxh0").value;
	var dw0 = document.getElementById("dw0").value;
	var sul0 = document.getElementById("sul0").value;
	var dj0 = document.getElementById("dj0").value;
	var je0 = document.getElementById("je0").value;
	var shuil0 = document.getElementById("shuil0").value;
	var se0 = document.getElementById("se0").value;
	tableData[0][0] = spmc0;
	tableData[0][1] = ggxh0;
	tableData[0][2] = dw0;
	tableData[0][3] = sul0;
	tableData[0][4] = dj0;
	tableData[0][5] = je0;
	tableData[0][6] = shuil0;
	tableData[0][7] = se0;
	//第2行开始
	for (var i = 1; i < rowIndex; i++) {
		tableData[i][0] = $("#spmc" + i + " input[name='query']").val();
		//alert("tableData[i][0]="+tableData[i][0]);
		tableData[i][1] = document.getElementById("ggxh" + i).value;
		tableData[i][2] = document.getElementById("dw" + i).value;
		tableData[i][3] = document.getElementById("sul" + i).value;
		tableData[i][4] = document.getElementById("dj" + i).value;
		tableData[i][5] = document.getElementById("je" + i).value;
		tableData[i][6] = document.getElementById("shuil" + i).value;
		tableData[i][7] = document.getElementById("se" + i).value;
	}

	var hjje = document.getElementById("hjje").innerHTML;
	var hjse = document.getElementById("hjse").innerHTML;
	var jshj = document.getElementById("jshj").innerHTML;
	//销方信息---第三部分
	var xfnsrmc = document.getElementById("xfnsrmc").value;
	var xfnsrsbh = document.getElementById("xfnsrsbh").value;
	var xfdzdh = document.getElementById("xfdzdh").value;
	var xfkhhzh = document.getElementById("xfkhhzh").value;
	var bz = document.getElementById("bz").value;
	var skr = document.getElementById("skr").value;
	var fh = document.getElementById("fh").value;
	var kpr = document.getElementById("kpr").value;
    
	var GHF = new Array(8);
	GHF[0] = xfnsrmc;
	GHF[1] = xfnsrsbh;
	GHF[2] = xfdzdh;
	GHF[3] = xfkhhzh;
	GHF[4] = bz;
	GHF[5] = skr;
	GHF[6] = fh;
	GHF[7] = kpr;
	
	/*
	var = document.getElementById("").value;
	var = document.getElementById("").value;
	var = document.getElementById("").value;
	 */

	/*
	 *弹窗显示页面信息
	 */
	tostring += kprq + "," + gfnsrmc + "," + gfnsrsbh + "," + gfdzdh + ","
			+ gfkhhzh + "," + gfyxdz + ",";//第一部分
	//tostring += spmc0+","+ggxh0+","+dw0+","+sul0+","+dj0+","+je0+","+shuil0+","+se0+",";
	//第二部分
	for (var i = 0; i < rowIndex; i++) {
		for (var j = 0; j < 8; j++) {
			tostring += tableData[i][j] + ",";
		}
	}
	//第三部分
	tostring += hjje + "," + hjse + "," + jshj + "," + xfnsrmc + "," + xfnsrsbh
			+ "," + xfdzdh + "," + xfkhhzh + "," + bz + "," + skr + "," + fh
			+ "," + kpr;
	//alert(tostring);
	
	
	
	if("" == gfnsrmc)
    {
      alert("客户名称不能为空！");
      return;
    }
	if("" == gfyxdz)
    {
      alert("邮箱不能为空！");
      return;
    }
    if("" == kpr)
    {
      alert("开票人不能为空！");
      return;
    }
    
    var detaildata = {};
    for (var i = 0; i < rowIndex; i++) {
    	//tableData[i][j];
    	var strs= new Array(); //定义一数组 
    	if(tableData[i][0]==null||tableData[i][0]==""||tableData[i][0].indexOf("|")==-1){//为空或者不是标准输入
    		alert("第"+new Number(i+1)+"行，货物或应税劳务名称填写非法");
    		return;
    	}
    	strs=tableData[i][0].split("|"); //字符分割 
    	//alert("strs="+strs);
    	var spbh;
    	var zxbm="";
    	if(strs[1].indexOf('_')==-1){
    		spbh = strs[1];
    	}else{
    		spbh = strs[1].substring(0,strs[1].lastIndexOf('_'));
    		zxbm = strs[1].substring(strs[1].lastIndexOf('_')+1);
    	}
    	//alert("spbh:"+spbh);
    	if("" !=spbh) {
    		var rowdata = new Object();
    		rowdata["zxbm"] = zxbm;
    		rowdata["spbh"] = spbh;
    		rowdata["spmc"] = strs[0];
    		//alert("spmc:"+strs[0]);
    		rowdata["ggxh"] = tableData[i][1];
    		rowdata["dw"] = tableData[i][2];
    		rowdata["dj"] = tableData[i][4];
    		rowdata["je"] = tableData[i][5];
        	rowdata["sl"] = tableData[i][6];
        	rowdata["se"] = tableData[i][7];
        	rowdata["spsl"] = tableData[i][3];
        	rowdata["jshj"] = tableData[i][5];
        	detaildata[i] = rowdata;
        	//如果输入了数量 没有单价 return
    		if((tableData[i][3]!=""&&tableData[i][4]=="")||(tableData[i][3]==""&&tableData[i][4]!="")){
    			alert("第"+new Number(i+1)+"行输入了数量,没有单价,或者有单价无数量");
    			return;
    		}
    		//没有金额
    		if (tableData[i][5]==null||tableData[i][5]=="") {
    			alert("第"+new Number(i+1)+"行，金额（含税）填写非法");
        		return;
			}
    	}
	}
    
    detaildata = JSON.stringify(detaildata);
    if("{}" == detaildata)
    {
      alert("请选择商品！");
      return;
    }
    
	$.ajax({
        url: basePath+"/voucher/saveAndSkdo.do", //ajax提交路径
        data: {
        	'fpqqlsh':fpqqlsh,
          'khsh' : gfnsrsbh,
          'khmc' : gfnsrmc,
          'yhzh' : gfkhhzh,
          'dzdh' : gfdzdh,
          'email' : gfyxdz,
          'bz'   : bz,
          'skr' : skr,
          'fhr' : fh,
          'kpr' : kpr,
          'jshj' : jshj,
          'hjje' : hjje,
		  'hjse' : hjse,
          'detaildata' : detaildata,
        },
        type: 'post', //提交方式
        success: function(responseData) {
          alert(responseData.desc);
          window.location.href = basePath+"/voucherHs/getVouchers.do";
        },
        error: function(error) {
          alert("网络访问失败");
        }
      });
}
/************校验*************/
//1.纳税人识别号
function checkSBH(sbh) {
	if(sbh.length==0){
		$("#gfnsrsbh").parent().css('background','#d5f4fe');
		$("#gfnsrsbh").css('background','#d5f4fe');
	}
	else if(sbh.length!=15&&sbh.length!=18){
		//alert(sbh.length);
		$("#gfnsrsbh").parent().css('background','#CC3333');
		$("#gfnsrsbh").css('background','#CC3333');
	}else{
		//alert(sbh.length);
		$("#gfnsrsbh").parent().css('background','#d5f4fe');
		$("#gfnsrsbh").css('background','#d5f4fe');
	}
}
//2.计算税额
function CalculationSE(je,no) {
	if( ( $("#sul"+no).val()!=""&&$("#sul"+no).val()!=null ) &&( $("#dj"+no).val()!=""&&$("#dj"+no).val()!=null) ){
		//alert("sul="+$("#sul"+no).val()+"dj"+$("#dj"+no).val());
		$("#je"+no).val( new Number($("#sul"+no).val())*new Number($("#dj"+no).val()) );
	}
	//alert('---CalculationSE---');
	var se = je-je/(1+ new Number( $('#shuil'+no).val() ));
	$('#se'+no).val(se.toFixed(2));//修改单项税额
	var jshj = 0;
	var hjse = 0;
	var hjje = 0;
	//修改价税合计、税额
	var currentRows = document.getElementById("list_table").rows.length;
	for(var i=0;i<currentRows;i++){
		if($('#je'+i).val()!=""){
			jshj += new Number($('#je'+i).val());
		}
		if($('#se'+i).val()!=""){
			hjse += new Number($('#se'+i).val());
			//console.log(i+',se='+$('#se'+i).val()+',hjse='+hjse);
		}
		
	}
	$('#jshj').html(jshj);//修改合计金额
	hjse = hjse.toFixed(2);
	$('#hjse').html(hjse);//修改税额
	if( $('#jshj').html()!="" && $('#hjse').html()!="" ){
		hjje = new Number(jshj) - new Number(hjse);
		$('#hjje').html(hjje);
	}
}
//3.由数量、单价计算金额
function CalculationJE(no) {
	$("#je"+no).val( new Number($("#sul"+no).val())*new Number($("#dj"+no).val()) );
	var je = $("#je"+no).val();
	CalculationSE(je,no);
}