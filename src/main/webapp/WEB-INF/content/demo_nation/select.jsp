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
                    <form id="demoNationGridSelect_searchForm" class="searchForm" gridId="demoNationGridSelect">
                        民族代码
                        <input id='demoNationGridSelect_nationCod_search' name='filter_LIKES_nationCod' class='mini-textbox' style='width:80px'/>
                        民族名称
                        <input id='demoNationGridSelect_nationNam_search' name='filter_LIKES_nationNam' class='mini-textbox' style='width:80px'/>

                    </form>
                    <a class="mini-button" iconCls="icon-search" onclick="gridSearch('demoNationGridSelect')">查询</a>
                    <a class="mini-button" iconCls="icon-cut" onclick="gridSearchClear('demoNationGridSelect')">清空搜索</a>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="mini-fit">
    <div id="demoNationGridSelect" class="mini-datagrid" url="${ctx}/demo_nation!search.action" style="width:100%;height:100%;">
        <div property="columns">
            <div type="checkcolumn" width="25px"></div>
            <div field="nationCod" width="40" headerAlign="center">民族代码</div>
            <div field="nationNam" width="100" headerAlign="center">民族名称</div>
        </div>
    </div>
</div>
<div class="mini-toolbar" style="text-align:center;padding-top:8px;padding-bottom:8px;" borderStyle="border:0;">
    <a class="mini-button" style="width:60px;" onclick="CloseWindow('ok');">确定</a>
    <span style="display:inline-block;width:25px;"></span>
    <a class="mini-button" style="width:60px;" onclick="CloseWindow('cancel');">取消</a>
</div>
<script type="text/javascript">
    initGlobal();
    mini.parse();
    var demoNationGridSelect = mini.get("demoNationGridSelect");
    gridSearch('demoNationGridSelect');

    function GetData() {
        var rows = demoNationGridSelect.getSelecteds();
        return rows;
    }
    function CloseWindow(action) {
        if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
        else window.close();
    }
</script>
</body>
</html>