package com.bwjf.demo.utils;

import net.sf.json.JSONObject;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import sun.misc.BASE64Encoder;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.bwjf.demo.utils.HttpClientUtil.postJson;

/**
 * @author:dengcongbin
 * @create：- --
 **/
public class WxCardUtil {
    configReaderUtil configReaderUtil = new configReaderUtil();

    private String appid = configReaderUtil.configReader("config.properties","appid"); //HS
    private String redirect_uri = "";
    private String secret = configReaderUtil.configReader("config.properties","secret"); //HS//HS
    private String msg_template = "8hHp8uD64o8cGUsQB55Q73dzLcJj_y5VJ3vlZ6HV6E0"; //HS
    private String msgUrl = "www.baidu.com";
    private String logo_url = "http://mmbiz.qpic.cn/mmbiz_jpg/WIK7v5n1NRolxZO9FhRGKbVtIfjL4ktUo2GFG87hzA8MibEKGmOBmYI54aJzpncNRiaia9RPt4K4t8XBEftAslBKQ/0"; //HS

    /**
     * 获取access_token
     * @return
     */
    public String getAccess_token() {
        JSONObject jsonObject;
        String access_token = "";
        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + secret;
        jsonObject = sendGetRequest(url);
        try {
            access_token = jsonObject.getString("access_token");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return access_token;
    }

    /**
     * 获取s_pappid
     * @return
     */
    public String getPappid(String access_token) {
        JSONObject jsonObject;
        String s_pappid = "";
        String url = "https://api.weixin.qq.com/card/invoice/seturl?access_token=" + access_token;
        try {
            s_pappid = getParam(JSONObject.fromObject(postJson(url, "{}")).getString("invoice_url"), "s_pappid");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return s_pappid;
    }

    public String getParam(String url, String key) {
        String pappid = getQueryParams(url).get(key).toString().replace("[", "").replace("]", "");
        return pappid;
    }

    /**
     * 解析url获取参数值
     * @param url
     * @return
     */
    public Map<String, List<String>> getQueryParams(String url) {
        try {
            Map<String, List<String>> params = new HashMap<String, List<String>>();
            String[] urlParts = url.split("\\?");
            if (urlParts.length > 1) {
                String query = urlParts[1];
                for (String param : query.split("&")) {
                    String[] pair = param.split("=");
                    String key = URLDecoder.decode(pair[0], "UTF-8");
                    String value = "";
                    if (pair.length > 1) {
                        value = URLDecoder.decode(pair[1], "UTF-8");
                    }

                    List<String> values = params.get(key);
                    if (values == null) {
                        values = new ArrayList<String>();
                        params.put(key, values);
                    }
                    values.add(value);
                }
            }
            return params;
        } catch (UnsupportedEncodingException ex) {
            throw new AssertionError(ex);
        }
    }

    public String getTicket(String access_token) {
        JSONObject jsonObject;
        String ticket = "";
        String url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=wx_card";
        jsonObject = sendGetRequest(url);
        try {
            ticket = jsonObject.getString("ticket");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ticket;
    }

    public String getjsapi_ticket(String access_token){
        JSONObject jsonObject;
        String ticket = "";
        String url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+ access_token + "&type=jsapi";
        jsonObject = sendGetRequest(url);
        try{
            ticket = jsonObject.getString("ticket");
        }catch (Exception e){
            e.printStackTrace();
        }
        return  ticket;
    }

    /**
     * 获取授权链接
     * @param access_token
     * @param pappid
     * @param orderId 订单号
     * @param money 金额，以分为单位，如200 = 2元
     * @param pdf_url
     * @param ticket
     * @return
     */
    public String getAuthUrl(String cardId, String MediaId, String access_token, String pappid, String orderId, int money, String pdf_url, String ticket) {
        String auth_url = "";
        String domain_name_url = "";
        try{
            configReaderUtil configReaderUtil = new configReaderUtil();
            domain_name_url = configReaderUtil.configReader("config.properties","domain_name");
//            domain_name_url = java.net.URLEncoder.encode(domain_name_url+"WxCallback.do?fpqqlsh="+orderId+"&access_token="+access_token+"&MediaId="+MediaId+"&cardId="+cardId,"UTF-8");
            domain_name_url = domain_name_url+"WxCallback.do?fpqqlsh="+orderId+"&access_token="+access_token+"&MediaId="+MediaId+"&cardId="+cardId ;
        }catch (Exception e){
            e.printStackTrace();
        }
        String authBody = "{" +
                "    \"s_pappid\": \"" + pappid + "\"," +
                "    \"order_id\": \"" + orderId + "\"," +
                "    \"money\": " + money + "," +
                "    \"timestamp\": " + System.currentTimeMillis() + "," +
                "    \"source\": \"web\"," +
                "    \"redirect_url\": \"" + domain_name_url + "\"," +
                "    \"ticket\": \"" + ticket +"\"," +
                "    \"type\": 2" +
                "}";
        String url = "https://api.weixin.qq.com/card/invoice/getauthurl?access_token="+access_token;
        try {
            //构造推送微信模版文件返回链接。
            auth_url = JSONObject.fromObject(postJson(url, authBody)).getString("auth_url");
//            configReaderUtil configReaderUtil = new configReaderUtil();
//            String domain_name_url = configReaderUtil.configReader("config.properties","domain_name");
////            domain_name_url = java.net.URLEncoder.encode(domain_name_url+"WxCallback.do?fpqqlsh="+orderId+"&access_token="+access_token+"&MediaId="+MediaId+"&cardId="+cardId,"UTF-8");
//            domain_name_url = domain_name_url+"WxCallback.do?fpqqlsh="+orderId+"&access_token="+access_token+"&MediaId="+MediaId+"&cardId="+cardId ;
//            auth_url = domain_name_url;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return auth_url;
    }

    /**
     * 获取模板卡片id
     * @param access_token
     * @param title 发票抬头
     * @param fptype 发票类型
     * @param payee 收款方
     * @return
     */
    public String getCardId(String access_token, String title, String fptype, String payee) {
        String cardId = "";
        String url = "https://api.weixin.qq.com/card/invoice/platform/createcard?access_token=" + access_token;
        String body = "{" +
                "    \"invoice_info\": {" +
                "        \"base_info\": {" +
                "            \"logo_url\": \"" + logo_url + "\"," +
                "            \"title\": \" " + title + " \"" +
                "        }," +
                "        \"type\": \" " + fptype + " \"," +
                "        \"payee\": \" " + payee + " \"" +
                "    }" +
                "}";
        try {
            cardId = JSONObject.fromObject(postJson(url, body)).getString("card_id");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cardId;
    }

    /**
     * 下载pdf,上传pdf，返回s_media_id
     * @param urlStr
     * @param fileName
     * @param savePath
     * @throws Exception
     *
     * String uploadPath = httpServletRequest.getSession().getServletContext().getRealPath("") + "\\uploads\\";
     */
    public String getMediaId(String access_token, String urlStr, String fileName, String savePath) throws Exception {
        String mediaId = "";
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();
        //设置超时间为3秒
        conn.setConnectTimeout(3*1000);
        //防止屏蔽程序抓取而返回403错误
        conn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");

        //得到输入流
        InputStream inputStream = conn.getInputStream();
        //获取自己数组
        byte[] getData = readInputStream(inputStream);

        //文件保存位置
        File saveDir = new File(savePath);
        if(!saveDir.exists()){
            saveDir.mkdir();
        }
        String filePath = saveDir+ File.separator+fileName;
        File file = new File(filePath);
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(getData);
        if(fos!=null){
            fos.close();
        }
        if(inputStream!=null){
            inputStream.close();
        }
        mediaId = upload(access_token, fileName, filePath);
        return mediaId;
    }

    /**
     * 取得pdf的url
     * @param access_token
     * @param s_media_id
     * @return
     */
    public String getPdfUrl(String access_token, String s_media_id) {
        JSONObject jsonObject = new JSONObject();
        String pdf_url = "";
        String url = "https://api.weixin.qq.com/card/invoice/platform/getpdf?action=get_url&access_token=" + access_token;
        jsonObject.put("action", "get_url");
        jsonObject.put("s_media_id", s_media_id);
        try {
            pdf_url = JSONObject.fromObject(postJson(url, jsonObject.toString())).getString("pdf_url");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return pdf_url;
    }

    /**
     * 插入卡包，返回值为用户的openid
     * @param access_token
     * @param orderId 订单号，必须与授权链接中的订单号一致
     * @param price 价格，以分为单位 如 240 = 2.4元
     * @param num 购买数量
     * @param name 商品名称
     * @param billing_no 发票代码
     * @param billing_code 发票号码
     * @param tax 税额，以分为单位
     * @param s_pdf_media_id
     * @param fee 发票的金额，以分为单位
     * @param title 发票抬头
     * @param fee_without_tax 不含税金额，以分为单位
     * @param check_code 校验码，发票pdf右上角，开票日期下的校验码
     * @param cardId
     * @return
     */
    public String insertCard(String access_token, String orderId, int price, int num, String name, String billing_no, String billing_code,
                             int tax, String s_pdf_media_id, int fee, String title, String fee_without_tax, String check_code, String cardId) {
        String openid = "";
        String fapiaoBody = "{" +
                "    \"order_id\": \"" + orderId + "\"," +
                "    \"card_ext\": {" +
                "        \"nonce_str\": \"" + getRandomString(10) + "\"," +
                "        \"user_card\": {" +
                "            \"invoice_user_data\": {" +
                "                \"info\": [" +
                "                    {" +
                "                        \"price\": " + price + "," +
                "                        \"num\": " + num + "," +
                "                        \"name\": \"" + name + "\"," +
                "                        \"unit\": \"个\"" +
                "                    }" +
                "                ]," +
                "                \"billing_no\": \"" + billing_no + "\"," +
                "                \"billing_code\": \"" + billing_code + "\"," +
                "                \"billing_time\": \"" + (int) (System.currentTimeMillis() / 1000) + "\"," +
                "                \"tax\": " + tax + "," +
                "                \"s_pdf_media_id\": \"" + s_pdf_media_id + "\"," +
                "                \"fee\": " + fee + "," +
                "                \"title\": \"" + title + "\"," +
                "                \"fee_without_tax\": " + fee_without_tax + "," +
                "                \"check_code\": \"" + check_code + "\"" +
                "            }" +
                "        }" +
                "    }," +
                "    \"card_id\": \"" + cardId + "\"," +
                "    \"appid\": \"" + appid + "\"" +
                "}";
        String url = "https://api.weixin.qq.com/card/invoice/insert?access_token=" + access_token;
        try {
            openid = JSONObject.fromObject(postJson(url, fapiaoBody)).getString("openid");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return openid;
    }

    /**
     *
     * @param access_token
     * @param openid openid
     * @param auth_url
     * @param orderId 订单号
     * @param money 金额
     * @param title 发票抬头
     * @param shuifei 核定税费
     *
     * @return
     */
    public String sendMeg(String access_token, String openid, String auth_url, String orderId, String money, String title, String shuifei) {
        SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
        Date date=new Date();
        String msgBody = "{" +
                "           \"touser\":\"" + openid + "\"," +
                "           \"template_id\":\"" + msg_template + "\"," +
                "           \"url\":\"" + auth_url + "\",  " +
                "           \"data\":{" +
                "                   \"first\": {" +
                "                       \"value\":\"您的发票已开具,点击将发票放入卡包！\"," +
                "                       \"color\":\"#173177\"" +
                "                   }," +
                "                   \"keyword1\":{" +
                "                       \"value\":\"" + orderId + "\"," +
                "                       \"color\":\"#173177\"" +
                "                   }," +
                "                   \"keyword2\": {" +
                "                       \"value\":\"" + title + "\"," +
                "                       \"color\":\"#173177\"" +
                "                   }," +
                "                   \"keyword3\": {" +
                "                       \"value\":\"" + money + "\"," +
                "                       \"color\":\"#173177\"" +
                "                   }," +
                "                   \"keyword4\": {" +
                "                       \"value\":\"" + shuifei + "\"," +
                "                       \"color\":\"#173177\"" +
                "                   },\n" +
                "                   \"remark\":{" +
                "                       \"value\":\"感谢您的使用，祝您生活愉快！\"," +
                "                       \"color\":\"#173177\"" +
                "                   }" +
                "           }" +
                "       }";
        String respond = "";
        String url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + access_token;
        try {
            respond = JSONObject.fromObject(postJson(url, msgBody)).getString("msgid");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return respond;
    }

    /**
     * 上传pdf
     * @param access_token
     * @param fileName
     * @param filePath
     * @return
     */
    public String upload(String access_token, String fileName, String filePath) {
        String line = "";
        try {

            // 换行符
            final String newLine = "\r\n";
            final String boundaryPrefix = "--";
            // 定义数据分隔线
            String BOUNDARY = "========7d4a6d158c9";
            // 服务器的域名
            URL url = new URL("https://api.weixin.qq.com/card/invoice/platform/setpdf?access_token=" + access_token);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            // 设置为POST情
            conn.setRequestMethod("POST");
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setUseCaches(false);
            // 设置请求头参数
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("Charsert", "UTF-8");
            conn.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + BOUNDARY);
            OutputStream out = new DataOutputStream(conn.getOutputStream());

            // 上传文件
            File file = new File(filePath);
            System.out.println(file.length());
            StringBuilder sb = new StringBuilder();
            sb.append(boundaryPrefix);
            sb.append(BOUNDARY);
            sb.append(newLine);
            // 文件参数,photo参数名可以随意修改
            sb.append("Content-Disposition: form-data;name=\"pdf\";filename=\"" + fileName
                    + "\"" + newLine);
            sb.append("Content-Type:application/octet-stream");
            // 参数头设置完以后需要两个换行，然后才是参数内容
            sb.append(newLine);
            sb.append(newLine);

            // 将参数头的数据写入到输出流中
            out.write(sb.toString().getBytes());

            // 数据输入流,用于读取文件数据
            DataInputStream in = new DataInputStream(new FileInputStream(
                    file));
            byte[] bufferOut = new byte[1024];
            int bytes = 0;
            // 每次读1KB数据,并且将文件数据写入到输出流中
            while ((bytes = in.read(bufferOut)) != -1) {
                out.write(bufferOut, 0, bytes);
            }
            // 最后添加换行
            out.write(newLine.getBytes());
            in.close();

            // 定义最后数据分隔线，即--加上BOUNDARY再加上--。
            byte[] end_data = (newLine + boundaryPrefix + BOUNDARY + boundaryPrefix + newLine)
                    .getBytes();
            // 写上结尾标识
            out.write(end_data);
            out.flush();
            out.close();

//          定义BufferedReader输入流来读取URL的响应
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    conn.getInputStream()));
            line = reader.readLine().toString();
//            System.out.println(reader.readLine());
//            while ((reader.readLine()) != null) {
//                line += reader.readLine();
//            }
        } catch (Exception e) {
            System.out.println("发送POST请求出现异常！" + e);
            e.printStackTrace();
        }
        return JSONObject.fromObject(line).getString("s_media_id");
    }

    /**
     * 从输入流中获取字节数组
     * @param inputStream
     * @return
     * @throws IOException
     */
    public   byte[] readInputStream(InputStream inputStream) throws IOException {
        byte[] buffer = new byte[1024];
        int len = 0;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        while((len = inputStream.read(buffer)) != -1) {
            bos.write(buffer, 0, len);
        }
        bos.close();
        return bos.toByteArray();
    }

    /**
     * 发送GET请求
     * @param getUrl
     * @return
     */
    public JSONObject sendGetRequest(String getUrl) {
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
        String respond = sb.toString();
        return JSONObject.fromObject(respond);
    }

    /**
     * 随机字符串
     * @param length
     * @return
     */
    public String getRandomString(int length) { //length表示生成字符串的长度
        String base = "abcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < length; i++) {
            int number = random.nextInt(base.length());
            sb.append(base.charAt(number));
        }
        return sb.toString();
    }
    /*
    * 获取Wx配置信息 HttpServletRequest request*/
    public Map<String, Object> getWxConfig(String url) {
        Map<String, Object> ret = new HashMap<String, Object>();
        configReaderUtil configReaderUtil = new configReaderUtil();
        String appId =  configReaderUtil.configReader("config.properties","appid"); // 必填，公众号的唯一标识
        /**
         * 添加这几句代码是为了避免 config:invalid signature
         */
//        StringBuffer  requestUrl = request.getRequestURL();
//        if (request.getQueryString() != null) {
//            requestUrl.append('?');
//            requestUrl.append(request.getQueryString());
//        }
        String jsUrl = url;
        String timestamp = Long.toString(System.currentTimeMillis() / 1000); // 必填，生成签名的时间戳
        String nonceStr = UUID.randomUUID().toString(); // 必填，生成签名的随机串
        String signature = "";
        // 注意这里参数名必须全部小写，且必须有序
        String access_token = getAccess_token();
        String sign = "jsapi_ticket=" + getjsapi_ticket(access_token) + "&noncestr=" + nonceStr+ "&timestamp=" + timestamp + "&url=" + jsUrl;
        System.out.println(sign);
        try {
            MessageDigest crypt = MessageDigest.getInstance("SHA-1");
            crypt.reset();
            crypt.update(sign.getBytes("UTF-8"));
            signature = byteToHex(crypt.digest());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        ret.put("appId", appId);
        ret.put("timestamp", timestamp);
        ret.put("nonceStr", nonceStr);
        ret.put("signature", signature);
        return ret;
    }
    private String byteToHex(final byte[] hash) {
        Formatter formatter = new Formatter();
        for (byte b : hash) {
            formatter.format("%02x", b);
        }
        String result = formatter.toString();
        formatter.close();
        return result;

    }
    //整个推送卡包的调用代码
    public String sendState_WXMSG(Map invoice, String url, String openid){

        System.out.println(url);
        String access_token = getAccess_token();

        String s_pappid = getPappid(access_token);

        String cardId = getCardId(access_token, invoice.get("GMF_MC").toString(), "增值税电子普通发票", invoice.get("XSF_MC").toString());
        String mediaId = null;
        try{
            mediaId = getMediaId(access_token,url,
                    String.valueOf(System.currentTimeMillis()) +  ".pdf",
                    "F:\\temp");
        }catch (Exception e){
            return "推送失败:msgId未获得";
        }

        String pdfUrl = getPdfUrl(access_token, mediaId);


        //以上步骤已经完成卡票开具和上传，下面步骤是推送发票开具成功的信息并附带插入卡包的授权链接
        String ticket = getTicket(access_token);
        String auth_url = getAuthUrl(cardId,mediaId,access_token, s_pappid, invoice.get("DDHM").toString(), Integer.parseInt(invoice.get("JSHJ").toString()), pdfUrl, ticket);
        String msgId = sendMeg(access_token,openid , auth_url, invoice.get("DDHM").toString(), invoice.get("JSHJ").toString(), invoice.get("GMF_MC").toString(), invoice.get("HJSE").toString());
        if(msgId==null||msgId==""){
            return "推送失败:msgId未获得";
        }
        return null;

    }
    /**
     * 调用顺序看这个
     * @throws Exception
     */

}
