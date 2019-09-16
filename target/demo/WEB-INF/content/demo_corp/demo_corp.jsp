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
                    <form id="demoCorpGrid_searchForm" class="searchForm" gridId="demoCorpGrid">
                    单位代码
<input id='demoCorpGrid_corpCod_search' name='filter_LIKES_corpCod' class='mini-textbox' style='width:80px'/>
单位名称
<input id='demoCorpGrid_corpNam_search' name='filter_LIKES_corpNam' class='mini-textbox' style='width:80px'/>

                    </form>
                    <a class="mini-button" iconCls="icon-search" onclick="gridSearch('demoCorpGrid')">查询</a>
                    <a class="mini-button" iconCls="icon-cut" onclick="gridSearchClear('demoCorpGrid')">清空搜索</a>
                    <a class="mini-button" iconCls="icon-add" onclick="add('demoCorpGrid')">增加</a>
                    <a class="mini-button" iconCls="icon-remove" onclick="del('demoCorpGrid')">删除</a>
                    <a class="mini-button" iconCls="icon-save" onclick="gridSave('demoCorpGrid','./demo_corp!saveList.action')">保存</a>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="mini-fit">
    <div id="demoCorpGrid" class="mini-datagrid" url="${ctx}/demo_corp!searchPage.action" style="width:100%;height:100%;">
        <div property="columns">
            <div type="checkcolumn" width="25px"></div>
            <div type="indexcolumn" width="25px"></div>
                    <div field="corpCod" width="150" headerAlign="center">
                        单位代码
                        <input id="demoCorpGrid_corpCod_input" property="editor" class="mini-textbox"/></div>
                    <div field="corpNam" width="150" headerAlign="center">
                        单位名称
                        <input id="demoCorpGrid_corpNam_input" property="editor" class="mini-textbox"/></div>
        </div>
    </div>
</div>

<script type="text/javascript">
    initGlobal();
    mini.parse();
    var demoCorpGrid = mini.get("demoCorpGrid");
    gridSearch('demoCorpGrid');
</script>
</body>
</html>