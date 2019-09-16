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
	<form id="form" method="post" action="./resource!save.action">
		<input id="id" name="entity.id" type="hidden" class="easyui-validatebox" value="${entity.id}">
		<table style="width:90%;">
			<tr>
				<td>上级资源</td>
				<td><input id="resource_input_resource" name="entity.parentId" type="text" value="${entity.parentId}" display="${entity.parent.name}"></td>
			</tr>
			<tr>
				<td>所属项目代码</td>
				<td><input id="resource_input_project" name="entity.projectCode" type="text" class="" value="${entity.projectCode}"></td>
			</tr>
			<tr>
				<td>资源名称</td>
				<td><input id="resource_input_name" name="entity.name" type="text" class="" value="${entity.name}"></td>
			</tr>
			<tr>
				<td>代码</td>
				<td><input id="resource_input_code" name="entity.code" type="text" class="" value="${entity.code}"></td>
			</tr>
			<tr>
				<td>图标</td>
				<td><input id="resourceTreeGrid_input_iconCls" name="entity.iconCls" class="mini-buttonedit"
						   onbuttonclick="resourceTreeGrid_input_iconCls_onbuttonclick"/></td>
			</tr>
			<tr>
				<td>类型</td>
				<td><input placeholder="0表示菜单，1表示资源" id="resource_input_typeFlag" name="entity.typeFlag" type="text" class="" value="${entity.typeFlag}"></td>
			</tr>
			<tr>
				<td>层级</td>
				<td><input id="resource_input_levelCode" name="entity.levelCode" type="text" class="easyui-validatebox" value="${entity.levelCode}"></td>
			</tr>
			<tr>
				<td>排序</td>
				<td><input id="resource_input_sort" name="entity.sort" type="text" class="easyui-validatebox" value="${entity.sort}"></td>
			</tr>
			<tr>
				<td>资源备注</td>
				<td><input id="resource_input_note" name="entity.note" type="text" class="easyui-validatebox" value="${entity.note}"></td>
			</tr>
			<tr>
				<td>资源链接地址</td>
				<td><input id="resource_input_url" name="entity.url" type="text" class="easyui-validatebox" value="${entity.url}"></td>
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
	selectResource('#resource_input_resource');
	//输入框添满上级td元素
	$("td input").each(function(){
		if(!$(this).attr("width"))
			$(this).attr("width","85%");
	});
	mini.parse();
	function CloseWindow(action) {
		if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
		else window.close();
	}

	//选择图标
	function resourceTreeGrid_input_iconCls_onbuttonclick(e) {
		var btnEdit=this;
		selectResourceIconClsDlg({cb: function(iconCls)
		{
			btnEdit.setText(iconCls);
			btnEdit.setValue(iconCls);
		}});
	}
</script>
</body>
</html>
