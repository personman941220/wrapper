package com.bwjf.demo.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;


/**
 * @author 张恭雨
 *properties文件读取工具
 */
public class PropertyUtil {
	//日志记录
	private static final Logger logger = LoggerFactory.getLogger(PropertyUtil.class);
	private static Properties props;
	
	static{
		loadProps();
	}
	
	synchronized static private void loadProps(){
        logger.info("开始加载properties文件内容.......");
        props = new Properties();
        FileInputStream in = null;
        try {        	
        	//通过类加载器获得资源文件的路径，可以防止更新后数据读取的是之前加载的数据
    		String path=PropertyUtil.class.getClassLoader().getResource("file.properties").getPath();
    		in=new FileInputStream(path);
            props.load(in);
        } catch (FileNotFoundException e) {
            logger.error("file.properties文件未找到");
        } catch (IOException e) {
            logger.error("加载file.properties出现IOException");
        } finally {
            try {
                if(null != in) {
                    in.close();
                }
            } catch (IOException e) {
                logger.error("file.properties文件流关闭出现异常");
            }
        }
        logger.info("加载properties文件内容完成...........");
        logger.info("properties文件内容：" + props);
    }
	
	 public static String getProperty(String key){
	        if(null == props) {
	            loadProps();
	        }
	        return props.getProperty(key);
	   }
	 
	 public static Map<String,String> getPropertys(){
		 	if(null == props) {
	            loadProps();
	        }
	        Enumeration<String> enumeration=(Enumeration<String>) props.propertyNames();
	        Map<String,String> map=new HashMap<String,String>();
	        //遍历枚举类型
	       while (enumeration.hasMoreElements()) {
			String key = (String) enumeration.nextElement();
			map.put(key, props.getProperty(key));	
			
	       } 
	       return map;
	 }
}
