
(function(jQuery){  
if(jQuery.browser) return;  
jQuery.browser = {};  
jQuery.browser.mozilla = false;  
jQuery.browser.webkit = false;  
jQuery.browser.opera = false;  
jQuery.browser.msie = false;  
var nAgt = navigator.userAgent;  
jQuery.browser.name = navigator.appName;  
jQuery.browser.fullVersion = ''+parseFloat(navigator.appVersion);  
jQuery.browser.majorVersion = parseInt(navigator.appVersion,10);  
var nameOffset,verOffset,ix;  
// In Opera, the true version is after "Opera" or after "Version"  
if ((verOffset=nAgt.indexOf("Opera"))!=-1) {  
jQuery.browser.opera = true;  
jQuery.browser.name = "Opera";  
jQuery.browser.fullVersion = nAgt.substring(verOffset+6);  
if ((verOffset=nAgt.indexOf("Version"))!=-1)  
jQuery.browser.fullVersion = nAgt.substring(verOffset+8);  
}  
// In MSIE, the true version is after "MSIE" in userAgent  
else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {  
jQuery.browser.msie = true;  
jQuery.browser.name = "Microsoft Internet Explorer";  
jQuery.browser.fullVersion = nAgt.substring(verOffset+5);  
}  
// In Chrome, the true version is after "Chrome"  
else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {  
jQuery.browser.webkit = true;  
jQuery.browser.name = "Chrome";  
jQuery.browser.fullVersion = nAgt.substring(verOffset+7);  
}  
// In Safari, the true version is after "Safari" or after "Version"  
else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {  
jQuery.browser.webkit = true;  
jQuery.browser.name = "Safari";  
jQuery.browser.fullVersion = nAgt.substring(verOffset+7);  
if ((verOffset=nAgt.indexOf("Version"))!=-1)  
jQuery.browser.fullVersion = nAgt.substring(verOffset+8);  
}  
// In Firefox, the true version is after "Firefox"  
else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {  
jQuery.browser.mozilla = true;  
jQuery.browser.name = "Firefox";  
jQuery.browser.fullVersion = nAgt.substring(verOffset+8);  
}  
// In most other browsers, "name/version" is at the end of userAgent  
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <  
(verOffset=nAgt.lastIndexOf('/')) )  
{  
jQuery.browser.name = nAgt.substring(nameOffset,verOffset);  
jQuery.browser.fullVersion = nAgt.substring(verOffset+1);  
if (jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()) {  
jQuery.browser.name = navigator.appName;  
}  
}  
// trim the fullVersion string at semicolon/space if present  
if ((ix=jQuery.browser.fullVersion.indexOf(";"))!=-1)  
jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix);  
if ((ix=jQuery.browser.fullVersion.indexOf(" "))!=-1)  
jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix);  
jQuery.browser.majorVersion = parseInt(''+jQuery.browser.fullVersion,10);  
if (isNaN(jQuery.browser.majorVersion)) {  
jQuery.browser.fullVersion = ''+parseFloat(navigator.appVersion);  
jQuery.browser.majorVersion = parseInt(navigator.appVersion,10);  
}  
jQuery.browser.version = jQuery.browser.majorVersion;  
})(jQuery);  


jQuery.extend({

	 handleError : function(s, xhr, status, e) {
         // If a local callback was specified, fire it
         if (s.error) {
             s.error.call(s.context || s, xhr, status, e);
         }

         // Fire the global callback
         if (s.global) {
             (s.context ? jQuery(s.context) : jQuery.event).trigger(
                     "ajaxError", [ xhr, s, e ]);
         }
     },
     
     
    createUploadIframe: function(id, uri)
    {
        //create frame
        var frameId = 'jUploadFrame' + id;

        if(window.ActiveXObject) {
        	/*
            var io = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" />');
            if(typeof uri== 'boolean'){
                io.src = 'javascript:false';
            }
            else if(typeof uri== 'string'){
                io.src = uri;
            }*/
        	if(jQuery.browser.version=="9.0" || jQuery.browser.version=="10.0"){  
                var io = document.createElement('iframe');  
                io.id = frameId;  
                io.name = frameId;  
            }else if(jQuery.browser.version=="6.0" || jQuery.browser.version=="7.0" || jQuery.browser.version=="8.0"){  
                var io = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" />');  
                if(typeof uri== 'boolean'){  
                    io.src = 'javascript:false';  
                }  
                else if(typeof uri== 'string'){  
                    io.src = uri;  
                }  
            }  
        }
        else {
            var io = document.createElement('iframe');
            io.id = frameId;
            io.name = frameId;
        }
        io.style.position = 'absolute';
        io.style.top = '-1000px';
        io.style.left = '-1000px';

        document.body.appendChild(io);

        return io
    },
    createUploadForm: function(id, fileElementId)
    {
        //create form
        var formId = 'jUploadForm' + id;
        var fileId = 'jUploadFile' + id;
        var form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
        var oldElement = $('#' + fileElementId);
        var newElement = $(oldElement).clone();
        $(oldElement).attr('id', fileId);
        $(oldElement).before(newElement);
        $(oldElement).appendTo(form);
        //set attributes
        $(form).css('position', 'absolute');
        $(form).css('top', '-1200px');
        $(form).css('left', '-1200px');
        $(form).appendTo('body');
        return form;
    },
    addOtherRequestsToForm: function(form,data)
    {
        // add extra parameter
        var originalElement = $('<input type="hidden" name="" value="">');
        for (var key in data) {
            name = key;
            value = data[key];
            var cloneElement = originalElement.clone();
            cloneElement.attr({'name':name,'value':value});
            $(cloneElement).appendTo(form);
        }
        return form;
    },

    ajaxFileUpload: function(s) {
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime()
        var form = jQuery.createUploadForm(id, s.fileElementId);
        if ( s.data ) form = jQuery.addOtherRequestsToForm(form,s.data);
        var io = jQuery.createUploadIframe(id, s.secureuri);
        var frameId = 'jUploadFrame' + id;
        var formId = 'jUploadForm' + id;
        // Watch for a new set of requests
        if ( s.global && ! jQuery.active++ )
        {
            jQuery.event.trigger( "ajaxStart" );
        }
        var requestDone = false;
        // Create the request object
        var xml = {}
        if ( s.global )
            jQuery.event.trigger("ajaxSend", [xml, s]);
        // Wait for a response to come back
        var uploadCallback = function(isTimeout)
        {
            var io = document.getElementById(frameId);
            try
            {
                if(io.contentWindow)
                {
                    xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
                    xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;

                }else if(io.contentDocument)
                {
                    xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
                    xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
                }
            }catch(e)
            {
                jQuery.handleError(s, xml, null, e);
            }
            if ( xml || isTimeout == "timeout")
            {
                requestDone = true;
                var status;
               
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified
                   
                    if ( status != "error" )
                    {
                        // process the data (runs the xml through httpData regardless of callback)
                        var data = jQuery.uploadHttpData( xml, s.dataType );
                        // If a local callback was specified, fire it and pass it the data
                        if ( s.success )
                            s.success( data, status );

                        // Fire the global callback
                        if( s.global )
                            jQuery.event.trigger( "ajaxSuccess", [xml, s] );

                    } else
                        jQuery.handleError(s, xml, status);
                } catch(e)
                {
                    status = "error";        
                    jQuery.handleError(s, xml, status, e);
                }

                // The request was completed
                if( s.global )
                    jQuery.event.trigger( "ajaxComplete", [xml, s] );

                // Handle the global AJAX counter
                if ( s.global && ! --jQuery.active )
                    jQuery.event.trigger( "ajaxStop" );

                // Process result
                if ( s.complete )
                    s.complete(xml, status);

                jQuery(io).unbind()

                setTimeout(function()
                {	try
                    {
                        $(io).remove();
                        $(form).remove();

                    } catch(e)
                    {
                        jQuery.handleError(s, xml, null, e);
                    }

                }, 100)

                xml = null

            }
        }
        // Timeout checker
        if ( s.timeout > 0 )
        {
            setTimeout(function(){
                // Check to see if the request is still happening
                if( !requestDone ) uploadCallback( "timeout" );
            }, s.timeout);
        }
        try
        {
            // var io = $('#' + frameId);
            var form = $('#' + formId);
            $(form).attr('action', s.url);
            $(form).attr('method', 'POST');
            $(form).attr('target', frameId);
            if(form.encoding)
            {
                form.encoding = 'multipart/form-data';
            }
            else
            {
                form.enctype = 'multipart/form-data';
            }
            $(form).submit();

        } catch(e)
        {
            jQuery.handleError(s, xml, null, e);
        }
        if(window.attachEvent){
            document.getElementById(frameId).attachEvent('onload', uploadCallback);
        }
        else{
            document.getElementById(frameId).addEventListener('load', uploadCallback, false);
        }
        return {abort: function () {}};

    },
/*
    uploadHttpData: function( r, type ) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        // If the type is "script", eval it in global context
        if ( type == "script" )
            jQuery.globalEval( data );
        // Get the JavaScript object, if JSON is used.
        if ( type == "json" )
        {
            // If you add mimetype in your response,
            // you have to delete the '<pre></pre>' tag.
            // The pre tag in Chrome has attribute, so have to use regex to remove
            var data = r.responseText;
            var rx = new RegExp("<pre.*?>(.*?)</pre>","i");
            var am = rx.exec(data);
            //this is the desired data extracted
            var data = (am) ? am[1] : "";    //the only submatch or empty
            eval( "data = " + data );
            //eval("data = \" "+data+" \" ");
        }
        // evaluate scripts within html
        if ( type == "html" )
            jQuery("<div>").html(data).evalScripts();
        //alert($('param', data).each(function(){alert($(this).attr('value'));}));
        return data;
    }*/
    
    uploadHttpData: function( r, type ) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        // If the type is "script", eval it in global context
        if ( type == "script" )
            jQuery.globalEval( data );
        // Get the JavaScript object, if JSON is used.
        if ( type == "json" )
           
        	 eval( "data = " + data );
 
        	//eval("data = \" "+data+" \" ");
        	//data=JQuery.parseJSON(JQuery(data).text());
        // evaluate scripts within html
        if ( type == "html" )
            jQuery("<div>").html(data).evalScripts();

        return data;
    }
    
    
})

