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
                    <form id="demoNationGrid_searchForm" class="searchForm" gridId="demoNationGrid">
                        民族代码
                        <input id='demoNationGrid_nationCod_search' name='filter_LIKES_nationCod' class='mini-textbox' style='width:80px'/>
                        民族名称
                        <input id='demoNationGrid_nationNam_search' name='filter_LIKES_nationNam' class='mini-textbox' style='width:80px'/>

                    </form>
                    <a class="mini-button" iconCls="icon-search" onclick="gridSearch('demoNationGrid')">查询</a>
                    <a class="mini-button" iconCls="icon-cut" onclick="gridSearchClear('demoNationGrid')">清空搜索</a>
                    <a class="mini-button" iconCls="icon-add" onclick="add('demoNationGrid')">增加</a>
                    <a class="mini-button" iconCls="icon-remove" onclick="del('demoNationGrid')">删除</a>
                    <a class="mini-button" iconCls="icon-save" onclick="gridSave('demoNationGrid','./demo_nation!saveList.action')">保存</a>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="mini-fit">
    <div id="demoNationGrid" class="mini-datagrid" url="${ctx}/demo_nation!searchPage.action" style="width:100%;height:100%;">
        <div property="columns">
            <div type="checkcolumn" width="25px"></div>
            <div type="indexcolumn" width="25px"></div>
                    <div field="nationCod" width="150" headerAlign="center">
                        民族代码
                        <input id="demoNationGrid_nationCod_input" property="editor" class="mini-textbox"/></div>
                    <div field="nationNam" width="150" headerAlign="center">
                        民族名称
                        <input id="demoNationGrid_nationNam_input" property="editor" class="mini-textbox"/></div>
        </div>
    </div>
</div>

<script type="text/javascript">
    initGlobal();
    mini.parse();
    var demoNationGrid = mini.get("demoNationGrid");
    gridSearch('demoNationGrid');
</script>
</body>
</html>