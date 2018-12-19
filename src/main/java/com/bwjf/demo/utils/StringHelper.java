package com.bwjf.demo.utils;

public class StringHelper {
    public static String null2String(Object value,String defaultvalue)
    {
        return value == null?defaultvalue:(String)value;
    }
}
