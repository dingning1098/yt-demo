<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title></title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<%@ include file="/common/taglibs.jsp" %>
</head>
<body>
<div class="content mini-fit">
	<form id="form" method="post" action="./user!changePwd.action">
		<input id="id" name="entity.id" type="hidden" class="easyui-validatebox" value="${entity.id}">
		<table style="width:100%;">
			<tr>
				<td>新密码</td>
				<td><input class="mini-password" name="entity.plainPwd" type="text"></td>
			</tr>
			<tr>
				<td>确认新密码</td>
				<td><input name="entity.verifyPlainPwd" type="text" class="mini-password"></td>
			</tr>
		</table>
	</form>
</div>
<div class="mini-toolbar" style="text-align:center;padding-top:8px;padding-bottom:8px;" borderStyle="border:0;">
	<a class="mini-button" style="width:60px;" onclick="CloseWindow('ok');">确定</a>
	<span style="display:inline-block;width:25px;"></span>
	<a class="mini-button" style="width:60px;" onclick="CloseWindow('cancel');">取消</a>
</div>
<script type="text/javascript">
	mini.parse();
	function CloseWindow(action) {
		if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
		else window.close();
	}
</script>
</body>
</html>
