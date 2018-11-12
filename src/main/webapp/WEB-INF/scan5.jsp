
<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<% String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";

	System.out.println(basePath);
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath %>">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="msapplication-tap-highlight" content="no">
	<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no, target-densitydpi=device-dpi">
	<title>开票申请</title>
	<script type="text/javascript" src="<%=basePath%>js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/bootstrap.min.js"></script>
	<script src="<%=basePath%>js/jquery.cookie.js" type="text/javascript"></script>
	<script src="<%=basePath%>datecom/js/mobiscroll_002.js" type="text/javascript"></script>
	<script src="<%=basePath%>datecom/js/mobiscroll_004.js" type="text/javascript"></script>
	<script src="<%=basePath%>datecom/js/mobiscroll.js" type="text/javascript"></script>
	<script src="<%=basePath%>datecom/js/mobiscroll_003.js" type="text/javascript"></script>
	<script src="<%=basePath%>datecom/js/mobiscroll_005.js" type="text/javascript"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.4.0.js" type="text/javascript"></script>
    <script src="http://res2.wx.qq.com/open/js/jweixin-1.4.0.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>css/index.css">
	<link href="<%=basePath%>datecom/css/mobiscroll_002.css" rel="stylesheet" type="text/css">
	<link href="<%=basePath%>datecom/css/mobiscroll.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="<%=basePath%>css/bootstrap.min.css">

	<style type="text/css">
		span {
			display: block;
			width: 100%;
			text-align: center;
			color: #F00
		}
	</style>
</head>
<body>
<!-- header start -->
<div class="header">
	<div class="head-img" style="width: 170px; margin-top: 25px;background-image:url('<%=basePath%>images/Hojologo.png');"></div>
	<br>
</div>
<!-- header end
<span>特别提示:凡贵宾卡、第三方支付消费及出租柜台商品不予开具发票</span> -->
<br />
<ul id="myTab" class="nav nav-tabs">
	<li id="tab1" role="presentation" class="active" style="width:33%;text-align: center"><a href="#dianzitab" data-toggle="tab">电子发票</a></li>
	<li id="tab2" role="presentation"  style="width:33%;text-align: center"><a href="#pupiaotab" data-toggle="tab">普票</a></li>
	<li id="tab3" role="presentation"  style="width:34%;text-align: center"><a href="#zhuanpiaotab" data-toggle="tab">专票</a></li>
</ul>

<div id="myTabContent" class="tab-content">
	<div class="tab-pane fade in active" id="dianzitab">
		<div id="tabContent" class="content-wrapper">

		</div>
	</div>
	<div class="tab-pane fade" id="pupiaotab">
		<div id="tabContent2" class="content-wrapper">

		</div>
	</div>
	<div class="tab-pane fade" id="zhuanpiaotab">
		<div id="tabContent3" class="content-wrapper">

		</div>
	</div>
	<br>
	<div class="search1" align="center">
		<button type="button" id="skdo" class="btn btn-primary btn-lg" style="width:150px" >
			<b>提交</b>
		</button>
	</div>
	<table class="table_css"  id="checks" cellspacing="1"></table>
</div>
<input type="hidden" id="openid" value="">
<input type="hidden" id="appId" value="${appId}">
<input type="hidden" id="timestamp" value="${timestamp}">
<input type="hidden" id="nonceStr" value="${nonceStr}">
<input type="hidden" id="signature" value="${signature}">
<%--微信抬头获取按钮工具--%>
<%--<button class="btn btn_primary" id="chooseInvoiceTitle" type="hidden">chooseInvoiceTitle</button>--%>

<script>
    $("#openid").attr("value", getQueryString("openid"));
    // $("#appId").attr("value", getQueryString("appId"));
    // $("#timestamp").attr("value", getQueryString("timestamp"));
    // $("#nonceStr").attr("value", getQueryString("nonceStr"));
    // $("#signature").attr("value", getQueryString("signature"));
	function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        console
        if (r != null) return unescape(r[2]); return null;
    }

    $(document).ready(function(){
        document.getElementById('tabContent').innerHTML = code1;
    });
    var code1 = "" +
        "<input type=\"hidden\" id=\"fppz\" value=\"026\"> " +
        "<ul class=\"ul-style\">\n" +
        "<li>\n" +
        "<label class=\"width-85\">购方名称</label>\n" +
        "<input id=\"gfmc\" type=\"text\" class=\"input-style\" placeholder=\"请输入购买方名称\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<label class=\"width-85\">购方税号</label>\n" +
        "<input id=\"gfsh\" type=\"text\" class=\"input-style\" placeholder=\"请输入购买方税号\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<label class=\"width-85\">地址电话</label>\n" +
        "<input id=\"gfdzdh\" type=\"text\" class=\"input-style\" placeholder=\"专票必须填写\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<label class=\"width-35\">开户行及账号</label>\n" +
        "<input id=\"gfyhzh\" type=\"text\" class=\"input-style\" placeholder=\"专票必须填写\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<input id=\"type\" name=\"type\" value=\"${type}\" type=\"hidden\">\n" +
        "<input id=\"token\" name=\"token\" value=\"${token}\" type=\"hidden\">\n" +
        "<label class=\"width-85\">姓名</label>\n" +
        "<input id=\"name\" type=\"text\" class=\"input-style2\"  placeholder=\"请输入客户姓名\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<label class=\"width-85\">房号</label>\n" +
        "<input id=\"roomno\" type=\"text\" class=\"input-style\" placeholder=\"请输入房间号\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<label class=\"width-85\">邮箱</label>\n" +
        "<input id=\"email\" type=\"email\" class=\"input-style\" placeholder=\"请输入接收邮箱\">\n" +
        "</li>\n" +
        "</ul>";

    var code2 = "" +
        "<input type=\"hidden\" id=\"fppz\" value=\"007\"> " +
        "<ul class=\"ul-style\">\n" +
        "<li>\n" +
        "<label class=\"width-85\">购方名称</label>\n" +
        "<input id=\"gfmc\" type=\"text\" class=\"input-style\" placeholder=\"请输入购买方名称\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<label class=\"width-85\">购方税号</label>\n" +
        "<input id=\"gfsh\" type=\"text\" class=\"input-style\" placeholder=\"请输入购买方税号\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<label class=\"width-85\">地址电话</label>\n" +
        "<input id=\"gfdzdh\" type=\"text\" class=\"input-style\" placeholder=\"专票必须填写\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<label class=\"width-35\">开户行及账号</label>\n" +
        "<input id=\"gfyhzh\" type=\"text\" class=\"input-style\" placeholder=\"专票必须填写\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<input id=\"type\" name=\"type\" value=\"${type}\" type=\"hidden\">\n" +
        "<input id=\"token\" name=\"token\" value=\"${token}\" type=\"hidden\">\n" +
        "<label class=\"width-85\">姓名</label>\n" +
        "<input id=\"name\" type=\"text\" class=\"input-style2\"  placeholder=\"请输入客户姓名\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<label class=\"width-85\">房号</label>\n" +
        "<input id=\"roomno\" type=\"text\" class=\"input-style\" placeholder=\"请输入房间号\">\n" +
        "</li>\n" +
        "<li>\n" +
        "</ul>";

    var code3 = "" +
        "<input type=\"hidden\" id=\"fppz\" value=\"004\"> " +
        "<ul class=\"ul-style\">\n" +
        "<li>\n" +
        "<label class=\"width-85\">购方名称</label>\n" +
        "<input id=\"gfmc\" type=\"text\" class=\"input-style\" placeholder=\"请输入购买方名称\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<label class=\"width-85\">购方税号</label>\n" +
        "<input id=\"gfsh\" type=\"text\" class=\"input-style\" placeholder=\"请输入购买方税号\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<label class=\"width-85\">地址电话</label>\n" +
        "<input id=\"gfdzdh\" type=\"text\" class=\"input-style\" placeholder=\"专票必须填写\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<label class=\"width-35\">开户行及账号</label>\n" +
        "<input id=\"gfyhzh\" type=\"text\" class=\"input-style\" placeholder=\"专票必须填写\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<input id=\"type\" name=\"type\" value=\"${type}\" type=\"hidden\">\n" +
        "<input id=\"token\" name=\"token\" value=\"${token}\" type=\"hidden\">\n" +
        "<label class=\"width-85\">姓名</label>\n" +
        "<input id=\"name\" type=\"text\" class=\"input-style2\"  placeholder=\"请输入客户姓名\">\n" +
        "</li>\n" +
        "<li>\n" +
        "<label class=\"width-85\">房号</label>\n" +
        "<input id=\"roomno\" type=\"text\" class=\"input-style\" placeholder=\"请输入房间号\">\n" +
        "</li>\n" +
        "<li>\n" +
        "</ul>";

    $('#myTab a').click(function (e) {
        e.preventDefault();
        $("#tabContent").empty();;
        $("#tabContent2").empty();;
        $("#tabContent3").empty();;
        $(this).tab('show');
        if($("#tab1").attr("class")=="active") {
            document.getElementById('tabContent').innerHTML = code1;
        }
        if($("#tab2").attr("class")=="active") {
            document.getElementById('tabContent2').innerHTML = code2;
        }
        if($("#tab3").attr("class")=="active") {
            document.getElementById('tabContent3').innerHTML = code3;
        }
    })
</script>
<script type="text/javascript">
    //微信信息以及调用的方式
    var appId = $("#appId").val();
    var timestamp = $("#timestamp").val();
    var nonceStr = $("#nonceStr").val();
    var signature = $("#signature").val();
    wx.config({
        debug: false,
        beta: true,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList:[
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard']
    });
    //获取抬头js
    // document.querySelector('#chooseInvoiceTitle').onclick = function(){
    //     wx.invoke('chooseInvoiceTitle',{
    //         "scene":"1"
    //     },function(res){
    //         //回调函数
    //         var obj=	 JSON.parse(res.choose_invoice_title_info);
    //             if($("#tab1").attr("class")=="active") {
    //                 $("#gfmc").val(obj.title);
    //                 $("#gfsh").val(obj.taxNumber);
    //                 $("#gfdzdh").val(obj.companyAddress+obj.telephone);
    //                 $("#gfyhzh").val(obj.bankName+obj.bankAccount);
    //             }
    //             if($("#tab2").attr("class")=="active") {
    //                 $("#gfmc").val(obj.title);
    //                 $("#gfsh").val(obj.taxNumber);
    //                 $("#gfdzdh").val(obj.companyAddress+obj.telephone);
    //                 $("#gfyhzh").val(obj.bankName+obj.bankAccount);
    //             }
    //             if($("#tab3").attr("class")=="active") {
    //                 $("#gfmc").val(obj.title);
    //                 $("#gfsh").val(obj.taxNumber);
    //                 $("#gfdzdh").val(obj.companyAddress+obj.telephone);
    //                 $("#gfyhzh").val(obj.bankName+obj.bankAccount);
    //             }
    //     })
    // };

    function setCookie(){ //设置cookie
        var gfmc = $("#inputClientName").val(); //获取用户名信息
        var orderno = $("#orderno").val(); //获取登陆密码信息
        var email = $("#email").val(); //获取登陆密码信息
        var gfsh=$("#gfsh").val();
        //  alert(gfsh);

        //if(checked){ //判断是否选中了“记住密码”复选框
        $.cookie("gfmc",gfmc);//调用jquery.cookie.js中的方法设置cookie中的用户名
        $.cookie("orderno",orderno);//调用jquery.cookie.js中的方法设置cookie中的登陆密码，并使用base64（jquery.base64.js）进行加密
        $.cookie("email",email);//调用jquery.cookie.js中的方法设置cookie中的登陆密码，并使用base64（jquery.base64.js）进行加密
        $.cookie("gfsh",gfsh);//调用jquery.cookie.js中的方法设置cookie中的登陆密码，并使用base64（jquery.base64.js）进行加密

        //}
    }

    function getCookie(){ //获取cookie
        var gfmc = $.cookie("gfmc"); //获取cookie中的用户名
        var orderno =  $.cookie("orderno"); //获取cookie中的登陆密码
        var email = $.cookie("email"); //获取cookie中的用户名
        var gfsh =  $.cookie("gfsh"); //获取cookie中的登陆密码
        // alert(gfmc);

        $("#inputClientName").val(gfmc);

        $("#orderno").val(orderno);

        $("#email").val(email);

        $("#gfsh").val(gfsh);
    }


    $(document).ready(function(){

        $("#skdo").click(function(){

            var khmc=document.getElementById('name').value;
            var type=$("#type").val();
            var roomno=$("#roomno").val();
            var gfsh=$("#gfsh").val();
            var gfmc=$("#gfmc").val();
            var gfdzdh = $("#gfdzdh").val();
            var gfyhzh = $("#gfyhzh").val();
            var inputMoney=$("#inputMoney").val();
            var email = $("#email").val();
            var token = $("#token").val();
            var fppz  = $("#fppz").val();
            var openid = $("#openid").val();
            //alert(gfsh);c
            setCookie();
            //return false;
            // alert(sdata);
            //专票必填信息判断
			if(gfmc.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
                alert('购方名称姓名不能为空!');
                return false;
			}

            if(fppz==004&&(gfsh.replace(/(^\s*)|(\s*$)/g, "").length == 0)){
                alert('专票必须购方税号');
                return false;
            }

            if(gfsh.replace(/(^\s*)|(\s*$)/g, "").length > 0
			&&(!(/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(gfsh)))){
                alert('购方税号格式错误');
                return false;
            }

            if(fppz==004&&(gfdzdh==null||gfdzdh=="")){
                alert('专票必须填写地址电话');
                return false;
            }

            if(fppz==004&&(gfyhzh==null||gfyhzh=="")){
                alert('专票必须填写银行账号');
                return false;
            }

            if (khmc.replace(/(^\s*)|(\s*$)/g, "").length == 0)
            {
                alert('客户名称不能为空!');
                return false;
            }
            /*
            * 房间号正则判断
            * */
            if(roomno.replace(/(^\s*)|(\s*$)/g, "").length == 0)
            {
                alert('4位数房间号码不正确！');
                return false;
            }

            if(roomno.replace(/(^\s*)|(\s*$)/g, "").length > 0 && !(/^\d{4}$/.test(roomno)))
            {
                alert('4位数房间号码不正确！');
                return false;
            }
            /*
            if (sjm.replace(/(^\s*)|(\s*$)/g, "").length ==0)
            {
              alert('检验码不能为空!');
              return;
            }*/
			if(document.getElementById('email')) {
                if (email.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
                    alert('开票方邮箱不能为空!');
                    return false;
                }
            }
            var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if(document.getElementById('email')) {
                if (!(isEmail.test(email))) {
                    alert('邮件格式不正确!');
                    return false;
                }
            }
            // if(orderno.replace(/(^\s*)|(\s*$)/g, "").length ==0)
            // {
            //   alert('车牌号不能为空');
            //   return false;
            // }
            if(null == type ||"" == type)
            {
                alert('二维码有误，请重新扫描二维码!');
                return false;
            }

            // var sdata = "";
            //   $("input[name='checkbox']:checkbox:checked").each(function() {
            //    sdata = sdata  + $(this).next().val() + "," ;
            //
            //  });
            //
            //   if(""==sdata)
            //  {
            //    alert("请勾选待开停单据！");
            //    return false;
            //  }


            //alert("sssss");
            $('#skdo').attr('disabled',"true");

            $.ajax({
                url: 'http://111.59.6.238:8090/enter.do', //ajax提交路径
                cache:false,
                data: {
                    'khmc' : khmc,
                    'roomno' : roomno,
                    'gfsh' : gfsh,
                    'gfmc' : gfmc,
                    'gfdzdh' : gfdzdh,
                    'gfyhzh' : gfyhzh,
                    'type' : type,
                    'inputMoney' : inputMoney,
                    'token' : token,
                    'email':email,
                    'fppz':fppz,
					'openid':openid
                },
                type: 'get', //提交方式
                dataType:'jsonp',
                jsonp:"callback",
                async: false,
                beforeSend:function(){
                    $('#skdo').attr('disabled',"true");
                },
                success: function(responseData) {
                    console.log(responseData.data)
                    alert("提交成功");
                    window.location.href = "/scan5.do";
                },
                error: function(error) {
                    alert("提交失败，请联系工作人员");
                    $('#skdo').removeAttr("disabled");
                },
                complete:function(){
                    $('#skdo').removeAttr("disabled");
                }
            });


        });
    });



    //提取停车信息
    function getparking(){

        var orderno=$("#orderno").val();
        if(orderno.replace(/(^\s*)|(\s*$)/g, "").length ==0)
        {
            alert('车牌号不能为空');
            return;
        }

        //	var parkstartdate=$("#parkstartdate").val();
        //var parkenddate=$("#parkenddate").val();

        //if(checkInputDate(parkstartdate,parkenddate)==false){
        //  return false;
        //}

        //alert("ok");

        var date=Date.parse(new Date());
        $.getJSON("<%=basePath%>getparking.do" +'?t='+date,
            {
                orderno:  encodeURI($('#orderno').val(),"utf-8")
                //parkstartdate: $('#parkstartdate').val(),
                //parkenddate: $('#parkenddate').val()
            }
            , function(msg){

                var checks = $('#checks').empty();


                if(msg.head==false){
                    alert(msg.body);
                    return  false;
                }
                /*
                $('<li><input  class=\'mui-checkbox mui-checkbox-anim checkbox-green\' type="checkbox" name="cb" id="sel" onclick=\"\" /> <label class="width-85">入场时间</label> | <label class="width-85">停车费用</label></li>').appendTo(checks);
                $.each(msg.body, function(i,v){

                    var startTime =timeFormatter(v.STARTTIME);
                    $("<li><input  class='mui-checkbox mui-checkbox-anim checkbox-green' type='checkbox' name='checkbox'/><input type='hidden' id='parkid"+v.ID+"' value='"+v.ID+"' style='display:none'/><label class=\"width-200\">"+startTime+
                   "</label> | <label class=\"width-200\" >"+v.ARM+"元</label></li>").appendTo(checks);
                   //alert();


               });
               */
                if(msg.body==null || msg.body==""){
                    $('<thead><th  width=\"100%\"  align="center" class="biaotou">尊敬的客户您好：</br>您的开票请求已经提交，稍后在工作人员处理后，会开具发票并推送至您的联系方式中。谢谢！</th></thead>').appendTo(checks);
                }
                else{

                    var row=0;
                    var rs='text1';
                    $('<thead><th width=\"40%\" align="left" class="biaotou">&nbsp;&nbsp;'+
                        '<input  class=\'mui-checkbox mui-checkbox-anim checkbox-green\' type="checkbox" name="cb" id="sel" onclick=\"selectAll()\"/></th>'+
                        '<th  width=\"30%\" align="center" class="biaotou">&nbsp;&nbsp;入场时间 </th>'+
                        '<th  width=\"30%\"  align="center" class="biaotou">&nbsp;&nbsp;停车费用</th></thead>').appendTo(checks);
                    $.each(msg.body, function(i,v){
                        if(row%2==0){
                            rs='text1';
                        }else{
                            rs='text2';
                        }
                        var startTime =timeFormatter(v.STARTTIME);
                        $("<tr><td width=\"40%\" class=\""+rs+"\"><input  class='mui-checkbox mui-checkbox-anim checkbox-green' type='checkbox' name='checkbox'/>"+
                            "<input  width=\"0\" type='hidden' id='parkid"+v.ID+"' value='"+v.ID+"' style='display:none'/></td>"+
                            "<td width=\"30%\" class=\""+rs+"\">"+startTime+"</td>"+
                            "<td width=\"30%\" class=\""+rs+"\">"+v.ARM+"元</td><tr>").appendTo(checks);
                        //alert();

                        row++;
                    });
                }

            });


    }



    function timeFormatter(value) {

        var da = new Date(parseInt(value));

        return da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();

    }

    /*
    //动态搞定
        $("body").on(
              'click',
              '#sel',
              function() {
    // $("#sel").click(function(){
       // alert("oko");
          if($(this).is(":checked"))
          {
            $("input[name='checkbox']").attr("checked","true");
          }
          else
          {
            $("input[name='checkbox']").removeAttr("checked");
          }
        });
     */
    /*
    var sdata = "";
          $("input[name='checkbox']:checkbox:checked").each(function() {
            sdata = sdata  + $(this).parent().next().text() + "," ;
          });
    */


    $(function () {
        var currYear = (new Date()).getFullYear();
        var opt={};
        opt.date = {preset : 'date'};

        opt.default = {
            theme: 'android-ics light', //皮肤样式
            display: 'modal', //显示方式
            mode: 'scroller', //日期选择模式
            dateFormat: 'yy-mm-dd',
            lang: 'zh',
            showNow: false,
            nowText: "今天",
            startYear: currYear - 1, //开始年份
            endYear: currYear + 1 //结束年份
        };

        //$("#parkstartdate").mobiscroll($.extend(opt['date'], opt['default']));
        //$("#parkenddate").mobiscroll($.extend(opt['date'], opt['default']));

        var nowdate = new Date();
        var y = nowdate.getFullYear();
        var m = nowdate.getMonth()+1;
        var d = nowdate.getDate();
        var formatnowdate = y+'-'+m+'-'+d;
        //$("#parkenddate").val(formatnowdate);

        //获取系统前一周的时间
        var oneweekdate = new Date(nowdate-7*24*3600*1000);
        var y = oneweekdate.getFullYear();
        var m = oneweekdate.getMonth()+1;
        var d = oneweekdate.getDate();
        var formatwdate = y+'-'+m+'-'+d;
        //  $("#parkstartdate").val(formatwdate);

        //var optDateTime = $.extend(opt['datetime'], opt['default']);
        //	var optTime = $.extend(opt['time'], opt['default']);
        //$("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
        // $("#appTime").mobiscroll(optTime).time(optTime);
    });


    function  checkInputDate(inputStartMonth,inputEndMonth){
        //1. 是两个文本框都不能为空？
        if( inputStartMonth ==null  || inputStartMonth==""){
            alert("开始日期为空");
            return false;
        }
        if( inputEndMonth ==null  || inputEndMonth==""){
            alert("结束日期为空");
            return false;
        }

        //2. 是开始时间不能大于结束时间？
        var arrStart = inputStartMonth.split("-");
        var tmpIntStartYear = parseInt(arrStart[0],10);
        var tmpIntStartMonth = parseInt(arrStart[1],10);

        var arrEnd = inputEndMonth.split("-");
        var tmpIntEndYear = parseInt(arrEnd[0],10);
        var tmpIntEndMonth = parseInt(arrEnd[1],10);

        if( tmpIntStartYear <= tmpIntEndYear ){
            return true;
        }else if(tmpIntStartYear = tmpIntStartYear ){
            if( tmpIntStartMonth < tmpIntEndMonth ){
                return true;
            }else{
                alert("开始日期不能晚于结束日期");
                return false;
            }
        }else{
            alert("开始日期不能晚于结束日期");
            return false;
        }

    }


    getCookie();

    /*
  * 全选事件
  */
    function selectAll() {
        var park_check_all=document.getElementById("sel");
        var list_check=document.getElementsByName("checkbox");
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
</script>
</body>
</html>