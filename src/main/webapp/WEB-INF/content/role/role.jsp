<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <%@ include file="/common/taglibs.jsp" %>
</head>

<body>

<div class="mini-splitter" style="width:100%;height:100%;" vertical="false">
    <div size="50%" showCollapseButton="true">
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
                            <a class="mini-button" iconCls="icon-add" onclick="add('roleGrid');">增加</a>
                            <a class="mini-button" iconCls="icon-remove" onclick="del('roleGrid');">删除</a>
                            <a class="mini-button" iconCls="icon-save"
                               onclick="gridSave('roleGrid','./role!saveList.action')">保存</a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="mini-fit">
            <div id="roleGrid" class="mini-datagrid" style="width:100%;height:100%;"
                 url="./role!searchPage.action" onselect="roleGrid_onselect">
                <div property="columns">
                    <div type="checkcolumn" width="25px"></div>
                    <div type="indexcolumn" width="20px"></div>
                    <div name="code" field="code" width="100" headerAlign="center">
                        代码<input property="editor" class="mini-textbox"/></div>
                    <div name="name" field="name" width="120" headerAlign="center">
                        名称<input property="editor" class="mini-textbox"/></div>
                    <div name="note" field="note" width="120" headerAlign="center">
                        备注<input property="editor" class="mini-textbox"/></div>
                </div>
            </div>
        </div>
    </div>
    <div showCollapseButton="true">
        <div style="width:100%;">
            <div class="mini-toolbar" style="border-bottom:0;padding:0px;">
                <table style="width:100%;">
                    <tr>
                        <td style="width:100%;">
                            <form id="rresourceTreeGrid_searchForm" class="searchForm" gridId="resourceTreeGrid">
                            </form>
                            <a class="mini-button" iconCls="icon-add" onclick="resourceTreeGrid_add">增加</a>
                            <a class="mini-button" iconCls="icon-remove" onclick="resourceTreeGrid_delete">删除</a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="mini-fit">
            <div id="resourceTreeGrid" class="mini-treegrid" style="width:100%;height:100%;"
                 showTreeIcon="true" parentField="parentId" showCheckBox="true" allowSelect="false"
                 treeColumn="name" idField="id" resultAsTree="false" expandOnLoad="true">
                <div property="columns">
                    <div type="indexcolumn" width="20px"></div>
                    <div name="name" field="name" width="200" headerAlign="center">
                        名称
                    </div>
                    <div name="code" field="code" width="100" headerAlign="center">
                        代码
                    </div>
                    <div name="typeFlag" field="typeFlag" width="50" headerAlign="center">
                        类型
                    </div>
                    <div name="note" field="note" width="150" headerAlign="center">
                        资源备注
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    initGlobal();
    mini.parse();
    var roleGrid = mini.get("roleGrid");
    gridSearch('roleGrid');
    var resourceTreeGrid = mini.get("resourceTreeGrid");

    function roleGrid_onselect(e) {
        if (roleGrid.getSelecteds().length == 1) {
            var row = e.record;
            resourceTreeGrid.setUrl("./role_resource!search.action?order_resource.sort_default=asc&filter_EQS_entity.roleId=" + row.id);
        } else {
            resourceTreeGrid.clearRows();
        }
    }

    //添加角色资源对应关系
    function resourceTreeGrid_add(){
        selectMulti('roleGrid', function (roles) {
            selectResourceDlg({
                multi: true,
                cb: function (rows) {
                    var param = new Array();
                    for (var i = 0; i < roles.length; i++) {
                        for (var j = 0; j < rows.length; j++) {
                            param.push({roleId: roles[i].id, resourceId: rows[j].id, editState: 0});
                        }
                    }
                    request({
                        isConfirm: false,
                        param: {entityList: param},
                        url: './role_resource!saveList.action',
                        action: 'resourceTreeGrid'
                    });
                }
            });
        });
    }

    //删除角色资源关系
    function resourceTreeGrid_delete(){
        selectOne('roleGrid', function (role) {
            var rows=resourceTreeGrid.getCheckedNodes();
            if(rows.length>0){
                var param = new Array();
                for (var j = 0; j < rows.length; j++) {
                    param.push({roleId: role.id, resourceId: rows[j].id, editState: 2});
                }
                request({
                    param: {entityList: param},
                    url: './role_resource!saveList.action',
                    action: 'resourceTreeGrid'
                });
            }
        });
    }

</script>
</body>
</html>
