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
                    <form id="scodeGrid_searchForm" class="searchForm" gridId="scodeGrid">
                    null
<input id='scodeGrid_fldChi_search' name='filter_LIKES_fldChi' class='mini-textbox' style='width:80px'/>
null
<input id='scodeGrid_name_search' name='filter_LIKES_name' class='mini-textbox' style='width:80px'/>
null
<input id='scodeGrid_defVal_search' name='filter_LIKES_defVal' class='mini-textbox' style='width:80px'/>
null
<input id='scodeGrid_id_1_search' name='filter_LIKES_id_1' class='mini-textbox' style='width:80px'/>

                    </form>
                    <a class="mini-button" iconCls="icon-search" onclick="gridSearch('scodeGrid')">查询</a>
                    <a class="mini-button" iconCls="icon-cut" onclick="gridSearchClear('scodeGrid')">清空搜索</a>
                    <a class="mini-button" iconCls="icon-add" onclick="add('scodeGrid')">增加</a>
                    <a class="mini-button" iconCls="icon-remove" onclick="del('scodeGrid')">删除</a>
                    <a class="mini-button" iconCls="icon-save" onclick="gridSave('scodeGrid','./scode!saveList.action')">保存</a>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="mini-fit">
    <div id="scodeGrid" class="mini-datagrid" url="${ctx}/scode!searchPage.action" style="width:100%;height:100%;">
        <div property="columns">
            <div type="checkcolumn" width="25px"></div>
            <div type="indexcolumn" width="25px"></div>
                    <div field="fldChi" width="150" headerAlign="center">
                        
                        <input id="scodeGrid_fldChi_input" property="editor" class="mini-textbox"/></div>
                    <div field="name" width="150" headerAlign="center">
                        
                        <input id="scodeGrid_name_input" property="editor" class="mini-textbox"/></div>
                    <div field="defVal" width="150" headerAlign="center">
                        
                        <input id="scodeGrid_defVal_input" property="editor" class="mini-textbox"/></div>
                    <div field="id_1" width="150" headerAlign="center">
                        
                        <input id="scodeGrid_id_1_input" property="editor" class="mini-textbox"/></div>
        </div>
    </div>
</div>

<script type="text/javascript">
    initGlobal();
    mini.parse();
    var scodeGrid = mini.get("scodeGrid");
    gridSearch('scodeGrid');
</script>
</body>
</html>