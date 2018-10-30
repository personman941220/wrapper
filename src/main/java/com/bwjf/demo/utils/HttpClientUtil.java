package com.bwjf.demo.utils;

import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.*;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.CodingErrorAction;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class HttpClientUtil {

	/**
	 * 设置连接超市时间
	 */
	public final static int CONNECT_TIMEOUT = 50000;

	private static PoolingHttpClientConnectionManager connManager = null;
	private static CloseableHttpClient httpclient = null;

	static {
		try {

			// SSLContext sslContext = SSLContexts.custom().useTLS().build();
			SSLContext sslContext = SSLContext.getInstance("TLS");
			sslContext.init(null, new TrustManager[] { new X509TrustManager() {

				public X509Certificate[] getAcceptedIssuers() {
					return null;
				}

				public void checkClientTrusted(X509Certificate[] certs,
                                               String authType) {
				}

				public void checkServerTrusted(X509Certificate[] certs,
                                               String authType) {
				}
			} }, null);
			Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder
					.<ConnectionSocketFactory> create()
					.register("http", PlainConnectionSocketFactory.INSTANCE)
					.register(
							"https",
							new SSLConnectionSocketFactory(
									sslContext,
									SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER))
					.build();

			connManager = new PoolingHttpClientConnectionManager(
					socketFactoryRegistry);
			httpclient = HttpClients.custom().setConnectionManager(connManager)
					.build();
			// Create socket configuration
			SocketConfig socketConfig = SocketConfig.custom()
					.setTcpNoDelay(true).build();
			connManager.setDefaultSocketConfig(socketConfig);
			// Create message constraints
			MessageConstraints messageConstraints = MessageConstraints.custom()
					.setMaxHeaderCount(200).setMaxLineLength(2000).build();
			// Create connection configuration
			ConnectionConfig connectionConfig = ConnectionConfig.custom()
					.setMalformedInputAction(CodingErrorAction.IGNORE)
					.setUnmappableInputAction(CodingErrorAction.IGNORE)
					.setCharset(Consts.UTF_8)
					.setMessageConstraints(messageConstraints).build();
			connManager.setDefaultConnectionConfig(connectionConfig);
			connManager.setMaxTotal(200);
			connManager.setDefaultMaxPerRoute(20);
		} catch (KeyManagementException e) {
			//LOGGER.error("KeyManagementException", e);
		} catch (NoSuchAlgorithmException e) {
			//LOGGER.error("NoSuchAlgorithmException", e);
		}
	}


	/**
	 * HTTPS请求，默认超时为1S
	 * 
	 * @param reqURL
	 * @param params
	 * @return
	 */
	public static String connectGetHttps(String reqURL, Map<String, String> params) {

		String responseContent = null;

		HttpGet httpGet = new HttpGet(reqURL);
		try {
			RequestConfig requestConfig = RequestConfig.custom()
					.setSocketTimeout(CONNECT_TIMEOUT)
					.setConnectTimeout(CONNECT_TIMEOUT)
					.setConnectionRequestTimeout(CONNECT_TIMEOUT).build();

			List<NameValuePair> formParams = new ArrayList<NameValuePair>();
			// 绑定到请求 Entry
			for (Entry<String, String> entry : params.entrySet()) {
				formParams.add(new BasicNameValuePair(entry.getKey(), entry
						.getValue()));
			}
//			httpGet.setEntity(new UrlEncodedFormEntity(formParams,
//					Consts.UTF_8));
			httpGet.setConfig(requestConfig);
			CloseableHttpResponse response = httpclient.execute(httpGet);
			try {
				// 执行POST请求
				HttpEntity entity = response.getEntity(); // 获取响应实体
				try {
					if (null != entity) {
						responseContent = EntityUtils.toString(entity,
								Consts.UTF_8);
					}
				} finally {
					if (entity != null) {
						entity.getContent().close();
					}
				}
			} finally {
				if (response != null) {
					response.close();
				}
			}

		} catch (ClientProtocolException e) {
		} catch (IOException e) {
		} finally {
			httpGet.releaseConnection();
		}
		return responseContent;

	}


	/**
	 * application/json 传输格式
	 * 
	 * @param strurl
	 * @param jsonstr
	 * @return
	 */
	public static String postJson(String strurl, String jsonstr) {
		String responseContent = null;
		try {
			// 创建url资源
			URL url = new URL(strurl);
			// 建立http连接
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			// 设置允许输出
			conn.setDoOutput(true);
			conn.setDoInput(true);
			// 设置不用缓存
			conn.setUseCaches(false);
			// 设置传递方式
			conn.setRequestMethod("POST");
			// 设置维持长连接
			conn.setRequestProperty("Connection", "Keep-Alive");
			// 设置文件字符集:
			conn.setRequestProperty("Charset", "UTF-8");
			// 转换为字节数组

			byte[] data = jsonstr.getBytes("UTF-8");
			// 设置文件长度
			conn.setRequestProperty("Content-Length",
					String.valueOf(data.length));
			// 设置文件类型:
			conn.setRequestProperty("Content-Type", "application/json");
			// 开始连接请求
			conn.connect();
			OutputStream out = conn.getOutputStream();
			// 写入请求的字符串
			out.write(jsonstr.getBytes("UTF-8"));
			out.flush();
			out.close();
			// 请求返回的状态
			if (conn.getResponseCode() == 200) {
				// 请求返回的数据
				InputStream in = conn.getInputStream();
				try {
					byte[] data1 = new byte[in.available()];
					in.read(data1);
					// 转成字符串
					responseContent = new String(data1, "utf-8");
				} catch (Exception e1) {
					e1.printStackTrace();
				}
			} else {
				System.out.println("no++");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return responseContent;
	}
	
	
	/**
	 * HTTPS请求，默认超时为1S
	 * 
	 * @param reqURL
	 * @param params
	 * @return
	 */
	public static String connectPostHttps(String reqURL, Map<String, String> params) {

		String responseContent = null;
		HttpPost httpPost = new HttpPost(reqURL);
		try {
			RequestConfig requestConfig = RequestConfig.custom()
					.setSocketTimeout(CONNECT_TIMEOUT)
					.setConnectTimeout(CONNECT_TIMEOUT)
					.setConnectionRequestTimeout(CONNECT_TIMEOUT).build();
			
			List<NameValuePair> formParams = new ArrayList<NameValuePair>();
			// 绑定到请求 Entry
			for (Entry<String, String> entry : params.entrySet()) {
				formParams.add(new BasicNameValuePair(entry.getKey(), entry
						.getValue()));
			}
			UrlEncodedFormEntity ue = new UrlEncodedFormEntity(formParams,Consts.UTF_8);
			//ue.setContentType("application/json");
			ue.setContentType("application/x-www-form-urlencoded");
			httpPost.setEntity(ue);
			httpPost.setConfig(requestConfig);
			CloseableHttpResponse response = httpclient.execute(httpPost);
			try {
				// 执行POST请求
				HttpEntity entity = response.getEntity(); // 获取响应实体
				try {
					if (null != entity) {
						responseContent = EntityUtils.toString(entity,
								Consts.UTF_8);
					}
				} finally {
					if (entity != null) {
						entity.getContent().close();
					}
				}
			} finally {
				if (response != null) {
					response.close();
				}
			}

		} catch (ClientProtocolException e) {
		} catch (IOException e) {
		} finally {
			httpPost.releaseConnection();
		}
		return responseContent;

	}
}
