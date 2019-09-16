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
                    <form id="resourceTreeGrid_searchForm" class="searchForm" gridId="resourceTreeGrid">
                        名称
                        <input id='shipInfoGrid_shipNam_search'
                               name='filter_LIKES_entity.name_OR_entity2.name_OR_entity3.name_OR_entity4.name'
                               class='mini-textbox' style='width:120px'/>
                    </form>
                    <a class="mini-button" iconCls="icon-search" onclick="gridSearch('resourceTreeGrid')">查询</a>
                    <a class="mini-button" iconCls="icon-cut" onclick="gridSearchClear('resourceTreeGrid')">清空搜索</a>
                    <a class="mini-button" iconCls="icon-add" onclick="resourceTreeGrid_add">增加</a>
                    <a class="mini-button" iconCls="icon-edit" onclick="resourceTreeGrid_edit">弹出编辑</a>
                    <a class="mini-button" iconCls="icon-remove" onclick="resourceTreeGrid_del">删除</a>
                    <a class="mini-button" iconCls="icon-save" onclick="gridSave('resourceTreeGrid','./resource!saveList.action')">保存</a>
                    <a class="mini-button" iconCls="icon-downgrade" onclick="resourceGrid_expand">全部展开</a>
                    <a class="mini-button" iconCls="icon-upgrade" onclick="resourceGrid_collapse">全部折叠</a>
                    <a class="mini-button" id="resourceTreeGrid_cascade" iconCls="icon-expand" onclick="resourceGrid_cascade">级联模式</a>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="mini-fit">
    <div id="resourceTreeGrid" class="mini-treegrid" style="width:100%;height:100%;"
         allowCellEdit="true" allowCellSelect="true" cellEditAction="celldblclick" showCheckBox="true" checkRecursive="false"
         url="./resource!searchAllTree.action" showTreeIcon="true" expandOnDblClick="false" onnodeselect="resourceTreeGrid_onnodeselect"
         treeColumn="name" idField="id" resultAsTree="true" expandOnLoad="true" ondrawcell="resourceTreeGrid_ondrawcell">
        <div property="columns">
            <div type="indexcolumn" width="20px"></div>
            <div name="name" field="name" width="200" headerAlign="center">
                名称<input property="editor" class="mini-textbox"/></div>
            <div name="projectCode" field="projectCode" width="60" headerAlign="center">
                项目代码<input property="editor" class="mini-textbox"/></div>
            <div name="code" field="code" width="100" headerAlign="center">
                代码<input property="editor" class="mini-textbox"/></div>
            <div name="iconCls" field="iconCls" width="100" headerAlign="center">
                图标<input id="resourceTreeGrid_input_iconCls" property="editor" class="mini-buttonedit"
                         onbuttonclick="resourceTreeGrid_input_iconCls_onbuttonclick"/></div>
            <div name="typeFlag" field="typeFlag" width="50" headerAlign="center" type="comboboxcolumn">
                类型<input property="editor" class="mini-combobox" data="[{id:'0',text:'菜单'},{id:'1',text:'资源'}]"/></div>
            <div name="sort" field="sort" width="50" headerAlign="center">
                排序<input property="editor" class="mini-textbox"/></div>
            <div name="note" field="note" width="150" headerAlign="center">
                资源备注<input property="editor" class="mini-textbox"/></div>
            <div name="url" field="url" width="180" headerAlign="center">
                地址<input property="editor" class="mini-textbox"/></div>
            <div name="addDate" field="addDate" width="150" headerAlign="center" dateFormat="yyyy-MM-dd hh:mm:ss">
                添加时间<input property="editor" class="mini-textbox"/></div>
            <div name="modifyDate" field="modifyDate" width="150" headerAlign="center" dateFormat="yyyy-MM-dd hh:mm:ss">
                修改时间<input property="editor" class="mini-textbox"/></div>
        </div>
    </div>
</div>

<script type="text/javascript">

    initGlobal();
    mini.parse();
    var resourceTreeGrid = mini.get("resourceTreeGrid");
    resourceTreeGrid.load();

    function resourceTreeGrid_add() {
        selectOne('resourceTreeGrid', function (parentNode) {

            //console.log(parentNode);

            if (!parentNode.expanded)
                resourceTreeGrid.expandNode(parentNode);

            if(!parentNode.id){
                hint('请首先保存父节点！');
                return;
            }

            var insertIndex=0;
            var sort=20;
            if(parentNode.children&&parentNode.children.length>0){
                insertIndex=parentNode.children.length;
                var lastNode=parentNode.children[insertIndex-1];
                if(lastNode.sort){
                    sort=lastNode.sort+20;
                }
            }

            var newNode={
                'parentId': parentNode.id,
                'levelCode': (parentNode.levelCode + 1),
                'projectCode': parentNode.projectCode,
                'typeFlag':'0',
                'sort':sort,
                'iconCls':''
            };
            resourceTreeGrid.addNode(newNode
                    , insertIndex, parentNode);

            resourceTreeGrid.scrollIntoView(newNode);

        }, function () {
            var newNode={
                'levelCode': 1,
                'typeFlag':'1'
            };
            resourceTreeGrid.addNode(newNode
                    , 0);
            resourceTreeGrid.scrollIntoView(newNode);
        });
    }

    function resourceTreeGrid_edit() {
        selectOne('resourceTreeGrid', function (row) {
            showFormDlg('编辑', 'resource!update.action?id=' + row.id, 400, 600, 'resourceTreeGrid');
        });
    }

    function resourceTreeGrid_del() {
        var nodes=resourceTreeGrid.getCheckedNodes();
        var isHaveServer=false;
        for(var i=0;i<nodes.length;i++ ){
            var node=nodes[i];
            if(node.id){
                isHaveServer=true;
                break;
            }
        }
        if(isHaveServer){
            if(resourceTreeGrid.getChanges().length>0){
                hint('删除前请先保存添加和编辑的数据！');
            }

            var idParam=$(nodes).map(function () {
                return 'items='+this.id;
            }).get().join('&');

            request({
                isConfirm: true,
                action: 'resourceTreeGrid',
                title: '提示',
                url: './resource!delete.action',
                param: idParam
            });
        }else{
            resourceTreeGrid.removeNodes(nodes);
        }

        /*selectOne('resourceTreeGrid', function (row) {
            request({
                isConfirm: true,
                action: 'resourceTreeGrid',
                title: '提示',
                url: './resource!delete.action',
                param: 'items=' + row.id
            });
        });*/
    }

    function resourceGrid_expand() {
        resourceTreeGrid.expandAll();
    }

    function resourceGrid_collapse() {
        resourceTreeGrid.collapseAll();
    }

    //选择图标
    function resourceTreeGrid_input_iconCls_onbuttonclick(e) {
        var btnEdit=this;
        var node=resourceTreeGrid.getEditorOwnerRow(btnEdit);
        selectResourceIconClsDlg({cb: function(iconCls)
        {
            resourceTreeGrid.cancelEdit();
            resourceTreeGrid.updateNode(node,{iconCls:iconCls});
        }});
    }

    //新建的行设置背景色
    function resourceTreeGrid_ondrawcell(e){
        if(!e.node.id){
            e.rowStyle="background-color:rgb(213, 89, 212);";
        }
    }


    function resourceGrid_cascade(){
        var btn=mini.get("resourceTreeGrid_cascade");
        if(resourceTreeGrid.getCheckRecursive()){
            resourceTreeGrid.setCheckRecursive(false);
            btn.setText("级联模式");
        }else{
            resourceTreeGrid.setCheckRecursive(true);
            btn.setText("取消级联");
        }
    }

    function resourceTreeGrid_onnodeselect(e){
        resourceTreeGrid.uncheckAllNodes();
        resourceTreeGrid.checkNode(e.node);
    }
</script>
</body>
</html>
