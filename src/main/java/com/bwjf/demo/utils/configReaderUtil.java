package com.bwjf.demo.utils;


import java.io.FileInputStream;
import java.util.Properties;

/*
* 配置信息读取方式
* */
public class configReaderUtil {
    //通过配置文件名称以及配置名称获得值
    public String configReader(String FileName, String PropertiesName){
        String res = null;
        try {
            String path= PropertyUtil.class.getClassLoader().getResource(FileName).getPath();
            FileInputStream in = new FileInputStream(path);
            Properties properties = new Properties();
            properties.load(in);
            System.out.println(properties.getProperty(PropertiesName));
            res = properties.getProperty(PropertiesName);
        }catch (Exception e){
            e.printStackTrace();
        }
        return  res;
    }
}
