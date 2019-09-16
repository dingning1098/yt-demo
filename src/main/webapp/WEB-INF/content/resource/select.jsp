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
                    <form id="resourceGrid_searchForm" class="searchForm" gridId="resourceGrid">
                    </form>
                    <a class="mini-button" iconCls="icon-downgrade" onclick="resourceGrid_expand">全部展开</a>
                    <a class="mini-button" iconCls="icon-upgrade" onclick="resourceGrid_collapse">全部折叠</a>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="mini-fit">
    <div id="resourceGrid" class="mini-treegrid" style="width:100%;height:100%;"
         url="./resource!searchAllTree.action"  showTreeIcon="true" showCheckBox="true"
         treeColumn="name" idField="id" resultAsTree="true" expandOnLoad="0" checkRecursive="false"
         autoCheckParent="${param.autoCheckParent}">
        <div property="columns">
            <div type="indexcolumn" width="20px"></div>
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
    var resourceGrid = mini.get("resourceGrid");
    gridSearch('resourceGrid');

    function GetData() {
        var rows = resourceGrid.getCheckedNodes();
        return rows;
    }

    function SetData(init) {
        resourceGrid.setCheckRecursive(false);
        resourceGrid.setAutoCheckParent(false);
        var selected = resourceGrid.findNodes(function(row){
            for(var i=0;i<init.length;i++){
                if(init[i].id&&(init[i].id==row.id)){
                    return true;
                }
            }
            return false;
        });
        resourceGrid.checkNodes(selected);
        resourceGrid.setCheckRecursive(false);
        resourceGrid.setAutoCheckParent(${param.autoCheckParent});
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

    function resourceGrid_expand(){
        resourceGrid.expandAll();
    }

    function resourceGrid_collapse(){
        resourceGrid.collapseAll();
    }
</script>

</body>
</html>
