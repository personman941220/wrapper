package com.bwjf.demo.Contorller;


import com.bwjf.demo.utils.WxCardUtil;
import com.bwjf.demo.utils.configReaderUtil;

import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by cailk on 2017-09-01.
 */
@Scope("request")
@Controller
public class ScanController {
    com.bwjf.demo.utils.configReaderUtil configReaderUtil = new configReaderUtil();

    private String appid = configReaderUtil.configReader("config.properties","appid"); //HS
    private String redirect_uri = configReaderUtil.configReader("config.properties","redirect_uri"); //HS
    private String secret = configReaderUtil.configReader("config.properties","secret"); //HS




    @RequestMapping("/jump.do")
    public String jump(HttpServletResponse response, HttpServletRequest request, Model model){
        String type=request.getParameter("type");
        //String deptno=request.getParameter("deptno");
        String orderId = request.getSession().getId().replace("-","");
        //if("wanda".equals(ConfigFactory.param.getCustomer())){//万达
        return sdJJY(response,request,type,model);
        //}
        /*
        else if("sxcq".equals(ConfigFactory.param.getCustomer())){//安徽生鲜传奇项目
        	return ahSXCQ(request,deptno,model);
        }else if("hzgb".equals(ConfigFactory.param.getCustomer())){//杭州国际博览中心
        	return hzGB(request,model);
        }*/
        
        //return "error";
        
    }
    
    private String hzGB(HttpServletRequest request, Model model) {
    	String type=request.getParameter("type");
    	String orderno=request.getParameter("orderno");
    	String sjm=request.getParameter("sjm");
    	String xsf_dm=request.getParameter("xsf_dm");
    	String jshj=request.getParameter("jshj");
    	if("1".equals(type)){//餐饮类
        	model.addAttribute("type", type);
            model.addAttribute("orderno", orderno);
            model.addAttribute("xsf_dm", xsf_dm);
            model.addAttribute("jshj", jshj);
            model.addAttribute("sjm", sjm);
    		return "hzgb";
    	}
    	return "error";
	}
    
    
    //扫码停车界面
    private String sdJJY(HttpServletResponse response, HttpServletRequest request, String type, Model model){
    	//log.info("===扫码停车界面===");
    	if("1".equals(type)){//门店贴墙上的二维码
    		//log.info("===门店贴墙上的二维码===");
        	model.addAttribute("type", type);
        	return "scan1";
        }else if("2".equals(type)){//济南超级店
        	String orderno=request.getParameter("orderno");
        	model.addAttribute("type", type);
            model.addAttribute("orderno", orderno);
            return "scan2";
        }else if("3".equals(type)){
        	String orderno=request.getParameter("orderno");
        	String sjm=request.getParameter("sjm");
        	model.addAttribute("sjm", sjm);
        	model.addAttribute("type", type);
            model.addAttribute("orderno", orderno);
            return "scan3";
        }else if("4".equals(type)){
        	model.addAttribute("type",type);
        	return "scan4";
        }
        else if("5".equals(type)){
    	    String openid = request.getParameter("openid");
    	    model.addAttribute("openid", openid);
            model.addAttribute("type",type);
            return "scan5";
//            String url = "https://open.weixin.qq.com/connect/oauth2/authorize"
//                    + "?appid=" + appid
//                    + "&redirect_uri=" + redirect_uri
//                    + "&response_type=code"
//                    + "&scope=snsapi_base"
//                    + "&state=STATE"
//                    + "#wechat_redirect";
//            try {
//                response.sendRedirect(url);
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//            return null;
        }else {
        	return "error";
        }
    }

    @RequestMapping("/scan5")
    public void scan(HttpServletResponse response, HttpServletRequest request, Model model){
        try {
            redirect_uri = java.net.URLEncoder.encode(redirect_uri, "UTF-8");
            System.out.println(redirect_uri+"----------------");
        }catch (Exception e){
            e.printStackTrace();
        }
        String url = "https://open.weixin.qq.com/connect/oauth2/authorize"
                + "?appid=" + appid
                + "&redirect_uri=" + redirect_uri
                + "&response_type=code"
                + "&scope=snsapi_base"
                + "&state=STATE"
                + "#wechat_redirect";
        try {
            response.sendRedirect(url);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    /**
     * 获取微信用户openid
     * @param request
     * @param response
     * @param model
     * @return
     */
//    @ResponseBody
    @RequestMapping("/getOpenId.do")
    public String getOpenId(HttpServletRequest request, HttpServletResponse response, Model model) {
        Map<String,String> map = new HashMap<>();
        String openid = "";
        String code = request.getParameter("code");
        String url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="+ appid +"&secret=" + secret +"&code="+ code +"&grant_type=authorization_code";
        openid = sendGetRequest(url);
//        map.put("openid", openid);
//        JSONObject jsonObject = JSONObject.fromObject(map);
//        return jsonObject.toString();
//        model.addAttribute("openid", openid);
//        model.addAttribute("type", "5");
        //由于js调用的url不能直接获取。这里从域名获得相关的url作为处理办法。
        WxCardUtil wxCardUtil = new WxCardUtil();
        configReaderUtil configReaderUtil = new configReaderUtil();
        String JS_URL = configReaderUtil.configReader("config.properties","domain_name")+"jump.do?type=5&openid=" + openid;
        Map<String,Object> res = wxCardUtil.getWxConfig(JS_URL);
        String appId = res.get("appId").toString();
//        String appId = "wxa6326fcda83bd20c";
        String timestamp = res.get("timestamp").toString();
        String nonceStr = res.get("nonceStr").toString();
        String signature = res.get("signature").toString();
        request.getSession().setAttribute("appId",appId);
        request.getSession().setAttribute("timestamp",timestamp);
        request.getSession().setAttribute("nonceStr",nonceStr);
        request.getSession().setAttribute("signature",signature);
//        System.out.println("redirect:/jump.do?type=5&openid=" + openid + "&appId=" + appId +  "&timestamp=" + timestamp +  "&nonceStr=" + nonceStr +  "&signature=" + signature);
        return "redirect:/jump.do?type=5&openid=" + openid ;
        //+ "&appId=" + appId +  "&timestamp=" + timestamp +  "&nonceStr=" + nonceStr +  "&signature=" + signature
    }

    /**
     * 接getOpenId，处理返回数据
     * @param getUrl
     * @return
     */
    public String sendGetRequest(String getUrl) {
        StringBuffer sb = new StringBuffer();
        InputStreamReader isr = null;
        BufferedReader br = null;
        try
        {
            URL url = new URL(getUrl);
            URLConnection urlConnection = url.openConnection();
            urlConnection.setAllowUserInteraction(false);
            isr = new InputStreamReader(url.openStream());
            br = new BufferedReader(isr);
            String line;
            while ((line = br.readLine()) != null)
            {
                sb.append(line);
            }
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        System.out.println(sb);
        String respond = sb.toString();
        return JSONObject.fromObject(respond).getString("openid");
    }
    private String ahSXCQ(HttpServletRequest request, String deptno, Model model){
    	String orderno=request.getParameter("orderno");//订单号
    	String sjm=request.getParameter("sjm");//随机码
    	if(StringUtils.isBlank(orderno)|| StringUtils.isBlank(sjm)){
    		return "error";
    	}
    	model.addAttribute("deptno", deptno);
    	model.addAttribute("orderno", orderno);
    	model.addAttribute("sjm", sjm);
    	return "ahsxcq";
    }
}
