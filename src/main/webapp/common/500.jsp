<%@ page language="java" contentType="text/html; charset=UTF-8"
	isErrorPage="true" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ page import="java.io.*,java.util.*"%>
发生异常: <%=exception.getClass()%>:<%=exception.getMessage()%>
<%
	exception.printStackTrace();
	ByteArrayOutputStream ostr = new ByteArrayOutputStream();
	exception.printStackTrace(new PrintStream(ostr));
%>