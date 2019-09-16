<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <%@ include file="/common/taglibs.jsp" %>
</head>

<body>
<div class="mini-toolbar" style="border-bottom:0;padding:0px;">
    <table style="width:100%;">
        <tr>
            <td style="width:100%;">
                <form id="userGrid_searchForm" class="searchForm" gridId="userGrid">
                    模糊
                    <input name='filter_LIKES_userinfo.name_OR_loginName_OR_userinfo.note_OR_tel' class='mini-textbox'
                           style='width:80px'/>
                    角色
                    <input id="userGrid_searchForm_roleId" name='filter_INS_roleCode' class="mini-buttonedit"
                           allowInput="false" onbuttonclick="userGrid_searchForm_roleId_onbuttonclick" value="${param.roleCode}"/>
                    权限
                    <input id="userGrid_searchForm_resourceId" name='filter_INS_resourceId' class="mini-buttonedit"
                           allowInput="false" onbuttonclick="userGrid_searchForm_resourceId_onbuttonclick"/>
                </form>
                <a class="mini-button" iconCls="icon-search" onclick="gridSearch('userGrid')">查询</a>
                <a class="mini-button" iconCls="icon-cut" onclick="gridSearchClear('userGrid')">清空搜索</a>
            </td>
        </tr>
    </table>
</div>
<div class="mini-fit">
    <div id="userGrid" class="mini-datagrid" style="width:100%;height:100%;"
         url="./user!searchUser.action">
        <div property="columns">
            <div type="checkcolumn" width="25px"></div>
            <div type="indexcolumn" width="20px"></div>
            <div name="name" field="name" width="80" headerAlign="center">
                用户昵称</div>
            <div name="loginName" field="loginName" width="80" headerAlign="center">
                用户名</div>
            <div name="plainPwd" field="plainPwd" width="80" headerAlign="center">
                密码</div>
            <div name="workerCode" field="workerCode" displayField="workerInfo" width="60" headerAlign="center">
                关联职工</div>
            <div name="stateFlag" field="stateFlag" width="50" headerAlign="center">
                状态</div>
            <div name="tel" field="tel" width="70" headerAlign="center">
                电话</div>
            <div name="note" field="note" width="100" headerAlign="center">
                备注</div>
            <div name="email" field="email" width="50" headerAlign="center">
                用户邮箱</div>
            <div name="addDate" field="addDate" width="130" headerAlign="center" dateFormat="yyyy-MM-dd hh:mm:ss">
                添加时间</div>
            <div name="modifyDate" field="modifyDate" width="130" headerAlign="center" dateFormat="yyyy-MM-dd hh:mm:ss">
                修改时间</div>
        </div>
    </div>
</div>
<div class="mini-toolbar" style="text-align:center;padding-top:8px;padding-bottom:8px;" borderStyle="border:0;">
    <a class="mini-button" style="width:60px;" onclick="onOk()">确定</a>
    <span style="display:inline-block;width:25px;"></span>
    <a class="mini-button" style="width:60px;" onclick="onCancel()">取消</a>
</div>

<script type="text/javascript">
    initGlobal();
    mini.parse();
    var userGrid = mini.get("userGrid");
    gridSearch('userGrid');

    function GetData() {
        var rows = userGrid.getSelecteds();
        return rows;
    }

    function SetData(rows) {
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            userGrid.select(row);
        }
    }

    function userGrid_searchForm_roleId_onbuttonclick() {
        var btnEdit = this;
        selectRoleDlg({
            multi: true,
            cb: function (rows) {
                var value = $(rows).map(function () {
                    return this.code;
                }).get().join(",");
                btnEdit.setValue(value);
                var name = $(rows).map(function () {
                    return this.name;
                }).get().join(",");
                btnEdit.setText(name);
            }
        });
    }
    //弹出选择框，以便用户按资源搜索
    function userGrid_searchForm_resourceId_onbuttonclick() {
        var btnEdit = this;
        selectResourceDlg({
            multi: true,
            autoCheckParent: false,
            cb: function (rows) {
                var value = $(rows).map(function () {
                    return this.id;
                }).get().join(",");
                btnEdit.setValue(value);
                var name = $(rows).map(function () {
                    return this.name;
                }).get().join(",");
                btnEdit.setText(name);
            }
        });
    }

    function CloseWindow(action) {
        if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
        else window.close();
    }

    function onOk() {
        CloseWindow("ok");
    }

    function onCancel() {
        CloseWindow("cancel");
    }

</script>

</body>
</html>
