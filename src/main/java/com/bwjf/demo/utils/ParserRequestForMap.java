package com.bwjf.demo.utils;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

public class ParserRequestForMap {
    public static Map parserRequest(HttpServletRequest request){
        Map map = new HashMap();
        Enumeration pNames = request.getParameterNames();
        while (pNames.hasMoreElements()) {
            String kname = (String) pNames.nextElement();

            if (request.getParameter(kname) != null) {
                map.put(kname, request.getParameter(kname));

            }
        }
        return map;
    }
}
