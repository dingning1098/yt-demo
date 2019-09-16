<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <%@ include file="/common/taglibs.jsp" %>
    <style type="text/css">
        #iconDiv .mini-button
        {
            margin-right:10px;
            margin-bottom:10px;
        }
    </style>
</head>
<body>
<div class="mini-fit">
    <div id="iconDiv" style="margin:20px;">
    </div>
</div>

<div class="mini-toolbar" style="text-align:center;padding-top:8px;padding-bottom:8px;" borderStyle="border:0;">
    <a class="mini-button" style="width:60px;" onclick="CloseWindow('ok');">确定</a>
    <span style="display:inline-block;width:25px;"></span>
    <a class="mini-button" style="width:60px;" onclick="CloseWindow('cancel');">取消</a>
</div>

<script type="text/javascript">
    var data;//最终选择的数据
    var icons = ["icon-add", "icon-addnew", "icon-edit", "icon-remove", "icon-save", "icon-close", "icon-cut", "icon-ok",
        "icon-no", "icon-cancel", "icon-reload", "icon-search", "icon-print", "icon-help", "icon-undo", "icon-redo",
        "icon-tip", "icon-zoomin", "icon-zoomout", "icon-goto", "icon-date", "icon-filter", "icon-find",
        "icon-folder", "icon-folderopen", "icon-lock", "icon-unlock", "icon-new", "icon-node", "icon-nowait",
        "icon-sort", "icon-wait", "icon-upgrade", "icon-downgrade", "icon-download", "icon-upload", "icon-user",
        "icon-split", "icon-addfolder", "icon-expand", "icon-collapse"
    ];

    function createButtons(id) {
        var el = document.getElementById(id);
        var html = "";
        for (var i = 0, l = icons.length; i < l; i++) {
            var icon = icons[i];
            html += '<a class="mini-button"  checkOnClick="true" groupName="iconCls" oncheckedchanged="onCheckedChanged" iconCls="' + icon + '">' + icon + '</a>';
        }
        el.innerHTML = html;
        mini.parse();
    }

    createButtons("iconDiv");

    mini.parse();
    var resourceGrid = mini.get("resourceGrid");
    gridSearch('resourceGrid');

    function GetData() {
        return data;
    }

    function CloseWindow(action) {
        if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
        else window.close();
    }

    function onCheckedChanged(e){
        var btn = e.sender;
        var checked = btn.getChecked();
        var text = btn.getText();

        if(checked){
            data=text;
        }else{
            data="";
        }
    }

</script>

</body>
</html>
