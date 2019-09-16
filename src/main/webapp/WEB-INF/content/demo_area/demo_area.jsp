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
                    <form id="demoAreaGrid_searchForm" class="searchForm" gridId="demoAreaGrid">
                        城市代码
                        <input id='demoAreaGrid_areaCod_search' name='filter_LIKES_areaCod' class='mini-textbox' style='width:80px'/>
                        城市名称
                        <input id='demoAreaGrid_areaNam_search' name='filter_LIKES_areaNam' class='mini-textbox' style='width:80px'/>

                    </form>
                    <a class="mini-button" iconCls="icon-search" onclick="gridSearch('demoAreaGrid')">查询</a>
                    <a class="mini-button" iconCls="icon-cut" onclick="gridSearchClear('demoAreaGrid')">清空搜索</a>
                    <a class="mini-button" iconCls="icon-add" onclick="add('demoAreaGrid')">增加</a>
                    <a class="mini-button" iconCls="icon-remove" onclick="del('demoAreaGrid')">删除</a>
                    <a class="mini-button" iconCls="icon-save" onclick="gridSave('demoAreaGrid','./demo_area!saveList.action')">保存</a>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="mini-fit">
    <div id="demoAreaGrid" class="mini-datagrid" url="${ctx}demo_area!searchPage.action" style="width:100%;height:100%;">
        <div property="columns">
            <div type="checkcolumn" width="25px"></div>
            <div type="indexcolumn" width="25px"></div>
                <div field="provinceCod" width="80" headerAlign="center" type="comboboxcolumn">
                    省份代码
                    <input id="demoAreaGrid_provinceCod_input" property="editor" class="mini-combobox"
                           url="./demo_province!search.action"
                           valueField="provinceCod"
                           textField="provinceNam"/>
                </div>
                <div field="areaCod" width="60" headerAlign="center">
                    城市代码
                    <input id="demoAreaGrid_areaCod_input" property="editor" class="mini-textbox"/>
                </div>
                <div field="areaNam" width="120" headerAlign="center">
                    城市名称
                    <input id="demoAreaGrid_areaNam_input" property="editor" class="mini-textbox"/>
                </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    initGlobal();
    mini.parse();
    var demoAreaGrid = mini.get("demoAreaGrid");
    gridSearch('demoAreaGrid');
</script>
</body>
</html>