<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <%@ include file="/common/taglibs.jsp" %>
</head>

<body>

<div style="width:100%;">
    <div class="mini-toolbar" style="border-bottom:0;padding:0px;">
        <table style="width:100%;">
            <tr>
                <td style="width:100%;">
                    <form id="roleGrid_searchForm" class="searchForm" gridId="roleGrid">
                        代码
                        <input name='filter_LIKES_entity.code' class='mini-textbox' style='width:80px'/>
                        名称
                        <input name='filter_LIKES_entity.name' class='mini-textbox' style='width:80px'/>
                    </form>
                    <a class="mini-button" iconCls="icon-search" onclick="gridSearch('roleGrid')">查询</a>
                    <a class="mini-button" iconCls="icon-cut" onclick="gridSearchClear('roleGrid')">清空搜索</a>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="mini-fit">
    <div id="roleGrid" class="mini-datagrid" style="width:100%;height:100%;"
         url="${ctx}role!searchPage.action">
        <div property="columns">
            <div type="checkcolumn" width="25px"></div>
            <div type="indexcolumn" width="20px"></div>
            <div name="code" field="code" width="150" headerAlign="center">
                代码<input property="editor" class="mini-textbox"/></div>
            <div name="name" field="name" width="150" headerAlign="center">
                名称<input property="editor" class="mini-textbox"/></div>
            <div name="note" field="note" width="150" headerAlign="center">
                备注<input property="editor" class="mini-textbox"/></div>
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
    var roleGrid = mini.get("roleGrid");
    gridSearch('roleGrid');

    function GetData() {
        var rows = roleGrid.getSelecteds();
        return rows;
    }

    function SetData(rows) {
        for(var i=0;i<rows.length;i++){
            var row=rows[i];
            roleGrid.select(row);
        }
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
