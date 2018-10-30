//|------------------------------------------------------------------------------------  
//|  
//| 说明：JS弹出全屏遮盖的对话框(弹出层后面有遮盖效果，兼容主流浏览器)  
//|       实现了在最大化、拖动改变窗口大小和拖动滚动条时都可居中显示。  
//|  
//| 注意：主要使用EV_modeAlert和EV_closeAlert这两个函数行了；  
//|       (EV_modeAlert-弹出对话框，EV_closeAlert-关闭对话框)；  
//|       注意：使用时，请在body标签内(不要在其它元素内)写一div，  
//|       再给这div赋一id属性，如：id="myMsgBox"，  
//|       然后就可以调用EV_modeAlert('myMsgBox')来显示了。  
//|       还有，请给你这div设置css：display:none让它在开始时不显示。  
//|-----------------------------------------------------------
//用来记录要显示的DIV的ID值  
var EV_MsgBox_ID=""; //重要  

//弹出对话窗口(msgID-要显示的div的id)  
function EV_modeAlert(msgID){  
	var text = $('#envon').find('p').html();
	if(text == undefined||text==null){
	    //创建大大的背景框  
	    var bgObj=document.createElement("div");
	    bgObj.setAttribute('id','EV_bgModeAlertDiv');
	    document.body.appendChild(bgObj);
	    var html = [];
	    
		html[html.length] = "<div id='envon'>  ";
		html[html.length] = "<p style='font-size:48px; text-align:center;font-family:Microsoft yahei; color: #fff; position: relative; top: -48%; z-index: 99999;'>加载中...</p>";
		html[html.length] = "</div>";
		$('body').append(html.join(''));
	    //背景框满窗口显示  
	    EV_Show_bgDiv();  
	}
}  

//关闭对话窗口  
function EV_closeAlert(){
	$('#envon').find('p').html('');
    var bgObj=document.getElementById("EV_bgModeAlertDiv");
    document.body.removeChild(bgObj);  
    EV_MsgBox_ID="";  
}  
  
//把要显示的div居中显示  
function EV_Show_msgDiv(){  
    var msgObj   = document.getElementById(EV_MsgBox_ID);  
    msgObj.style.display  = "block";  
    var msgWidth = msgObj.scrollWidth;  
    var msgHeight= msgObj.scrollHeight;  
    var bgTop=EV_myScrollTop();  
    var bgLeft=EV_myScrollLeft();  
    var bgWidth=EV_myClientWidth();  
    var bgHeight=EV_myClientHeight();  
    var msgTop=bgTop+Math.round((bgHeight-msgHeight)/2);  
    var msgLeft=bgLeft+Math.round((bgWidth-msgWidth)/2);  
    msgObj.style.position = "absolute";  
    msgObj.style.top      = msgTop+"px";  
    msgObj.style.left     = msgLeft+"px";  
    msgObj.style.zIndex   = "10001";  
      
}  
//背景框满窗口显示  
function EV_Show_bgDiv(){  
    var bgObj=document.getElementById("EV_bgModeAlertDiv");  
    var bgTop=EV_myScrollTop();  
    var bgLeft=EV_myScrollLeft();  
    bgObj.style.position   = "absolute";  
    bgObj.style.top        = bgTop+"px";  
    bgObj.style.left       = bgLeft+"px";  
    bgObj.style.width      = "100%";  
    bgObj.style.height     = "100%";
    bgObj.style.zIndex     = "10000";
    bgObj.style.background = "#333";
    bgObj.style.filter     = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=80,finishOpacity=80);";  
    bgObj.style.opacity    = "0.8";
    
}  
//网页被卷去的上高度  
function EV_myScrollTop(){
    var n=window.pageYOffset   
    || document.documentElement.scrollTop   
    || document.body.scrollTop || 0;  
    return n;  
}  
//网页被卷去的左宽度  
function EV_myScrollLeft(){  
    var n=window.pageXOffset   
    || document.documentElement.scrollLeft   
    || document.body.scrollLeft || 0;  
    return n;  
}  
