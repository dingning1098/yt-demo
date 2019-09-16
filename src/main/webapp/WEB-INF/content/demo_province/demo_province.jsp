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
                    <form id="demoProvinceGrid_searchForm" class="searchForm" gridId="demoProvinceGrid">
                        省份代码
                        <input id='demoProvinceGrid_provinceCod_search' name='filter_LIKES_provinceCod' class='mini-textbox' style='width:80px'/>
                        省份名称
                        <input id='demoProvinceGrid_provinceNam_search' name='filter_LIKES_provinceNam' class='mini-textbox' style='width:80px'/>

                    </form>
                    <a class="mini-button" iconCls="icon-search" onclick="gridSearch('demoProvinceGrid')">查询</a>
                    <a class="mini-button" iconCls="icon-cut" onclick="gridSearchClear('demoProvinceGrid')">清空搜索</a>
                    <a class="mini-button" iconCls="icon-add" onclick="add('demoProvinceGrid')">增加</a>
                    <a class="mini-button" iconCls="icon-remove" onclick="del('demoProvinceGrid')">删除</a>
                    <a class="mini-button" iconCls="icon-save" onclick="gridSave('demoProvinceGrid','./demo_province!saveList.action')">保存</a>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="mini-fit">
    <div id="demoProvinceGrid" class="mini-datagrid" url="${ctx}/demo_province!searchPage.action" style="width:100%;height:100%;">
        <div property="columns">
            <div type="checkcolumn" width="25px"></div>
            <div type="indexcolumn" width="25px"></div>
                    <div field="provinceCod" width="150" headerAlign="center">
                        省份代码
                        <input id="demoProvinceGrid_provinceCod_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="provinceNam" width="150" headerAlign="center">
                        省份名称
                        <input id="demoProvinceGrid_provinceNam_input" property="editor" class="mini-textbox"/>
                    </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    initGlobal();
    mini.parse();
    var demoProvinceGrid = mini.get("demoProvinceGrid");
    gridSearch('demoProvinceGrid');
</script>
</body>
</html>