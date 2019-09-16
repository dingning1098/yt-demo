<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>${ytport_config.sysname }</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<%@ include file="/common/js.jsp"%>
<link rel="stylesheet" type="text/css" href="css/reset.css" media="all" />
<link rel="stylesheet" type="text/css" href="css/custom.css" media="all" />
<link rel="stylesheet" type="text/css" href="css/boxes.css" media="all" />
<link rel="stylesheet" type="text/css" href="css/print.css"
	media="print" />
<link rel="stylesheet" type="text/css" href="css/menu.css"
	media="screen, projection" />
<style>
input {
	height: 22px;
}
.error {
	color: red;
}
</style>
<script type="text/javascript">
$(document).ready(function() {

});

</script>
</head>
<body id="page-login"
	onload="document.forms.loginForm.username.focus();">
	<div class="login-container">
		<div class="login-box">
			<form method="post" action="${ctx}index!login.action"
				id="loginForm">
				<div class="login-form">
					<h1>Java Project Demo</h1>
					<h2></h2>
					
					<div id="messages" class="alertmessages">
					</div>
					<div class="input-box input-left">
						<label for="username">用户名：</label><br /> <input type="text"
							id="username" name="user.loginName" value=""
							class="required-entry input-text" />
					</div>
					<div class="input-box input-right">
						<label for="login">密码：</label><br /> <input type="password"
							id="login" name="user.pwd" class="required-entry input-text"
							value="" />
					</div>
					<div class="clear"></div>

					<div class="form-buttons">
						<input type="submit" class="form-button" value="登录" title="登录" />

					</div>
				</div>

			</form>
			<div class="bottom"></div>
		</div>
		<p class="legal">
			Java Project Demo Copyright © 2009-2020烟台海港信息通信有限公司 版权所有.<br />
			技术支持：© 2009-2014烟台海港信息通信有限公司 联系电话：0535-6745605<br />
		</p>
	</div>
</body>
</html>