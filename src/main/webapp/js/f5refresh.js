var check=function(e){  
      
    e=e||window.event; //alert(e.which||e.keyCode);  
    if((e.which||e.keyCode)==116){  
        if(e.preventDefault){  
            e.preventDefault();  
            window.location.reload();   
        } else{  
            event.keyCode = 0;   
            e.returnValue=false;  
            window.location.reload();  
        }  
    }  
}  
  
if(document.addEventListener){   
    document.addEventListener("keydown",check,false);   
} else{   
    document.attachEvent("onkeydown",check);   
}  