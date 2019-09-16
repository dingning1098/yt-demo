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
    <div size="60%">
        <div class="mini-toolbar" style="border-bottom:0;padding:0px;">
            <table style="width:100%;">
                <tr>
                    <td style="width:100%;">
                        <form id="userGrid_searchForm" class="searchForm" gridId="userGrid">
                            模糊
                            <input name='filter_LIKES_ytguser.name_OR_ytguser.loginName_OR_ytguser.note_OR_ytguser.tel' class='mini-textbox'
                                   style='width:80px'/>
                            角色
                            <input id="userGrid_searchForm_roleId" name='filter_INS_userrole.roleId' class="mini-buttonedit"
                                   allowInput="false" onbuttonclick="userGrid_searchForm_roleId_onbuttonclick"/>
                            权限
                            <input id="userGrid_searchForm_resourceId" name='filter_INS_roleresource.resourceId'
                                   class="mini-buttonedit" allowInput="false"
                                   onbuttonclick="userGrid_searchForm_resourceId_onbuttonclick"/>
                        </form>
                        <a class="mini-button" iconCls="icon-search" onclick="gridSearch('userGrid')">查询</a>
                        <a class="mini-button" iconCls="icon-cut" onclick="gridSearchClear('userGrid')">清空搜索</a>
                        <br/>
                        <a class="mini-button" iconCls="icon-add" onclick="add('userGrid');">增加</a>
                        <a class="mini-button" iconCls="icon-remove" onclick="del('userGrid');">删除</a>
                        <a class="mini-button" iconCls="icon-save"
                           onclick="gridSave('userGrid','./user!saveList.action')">保存</a>
                    </td>
                </tr>
            </table>
        </div>
        <div class="mini-fit">
            <div id="userGrid" class="mini-datagrid" style="width:100%;height:100%;" selectOnLoad="true"
                 url="./user!searchUser.action" onselect="userGrid_onselect">
                <div property="columns">
                    <div type="checkcolumn" width="25px"></div>
                    <div type="indexcolumn" width="20px"></div>
                    <div name="name" field="name" width="80" headerAlign="center">
                        用户昵称<input property="editor" class="mini-textbox"/></div>
                    <div name="loginName" field="loginName" width="80" headerAlign="center">
                        用户名<input property="editor" class="mini-textbox"/></div>
                    <div name="plainPwd" field="plainPwd" width="80" headerAlign="center">
                        密码<input property="editor" class="mini-textbox"/></div>
                    <%--某项目附加单独的属性时，可以在下面单独写--%>
                    <%--
                    <% if(AppCfg.getAppCode().equals("asset")){ %>
                        <div name="assetDeptCod" field="assetDeptCod" width="70" headerAlign="center">
                            部门代码<input property="editor" class="mini-textbox"/></div>
                    <% }%>
                    --%>
                    <%--<div name="workerCode" field="workerCode" displayField="workerInfo" width="60" headerAlign="center">--%>
                        <%--关联职工<input property="editor" class="mini-buttonedit"--%>
                                   <%--onbuttonclick="workerCode_input_onbuttonclick"/></div>--%>
                    <%--<div name="corpName" field="corpName" width="100" headerAlign="center">--%>
                        <%--职工单位</div>--%>
                    <div name="stateFlag" field="stateFlag" width="50" headerAlign="center">
                        状态<input property="editor" class="mini-textbox"/></div>
                    <div name="tel" field="tel" width="70" headerAlign="center">
                        电话<input property="editor" class="mini-textbox"/></div>
                    <div name="note" field="note" width="100" headerAlign="center">
                        备注<input property="editor" class="mini-textbox"/></div>
                    <div name="email" field="email" width="50" headerAlign="center">
                        邮箱<input property="editor" class="mini-textbox"/></div>
                    <div name="addDate" field="addDate" width="130" headerAlign="center"
                         dateFormat="yyyy-MM-dd hh:mm:ss">
                        添加时间<input property="editor" class="mini-textbox"/></div>
                    <div name="modifyDate" field="modifyDate" width="130" headerAlign="center"
                         dateFormat="yyyy-MM-dd hh:mm:ss">
                        修改时间<input property="editor" class="mini-textbox"/></div>
                </div>
            </div>
        </div>
    </div>
    <div showCollapseButton="true">
        <div class="mini-splitter" style="width:100%;height:100%;" vertical="true">
            <div size="40%" showCollapseButton="true">
                <div class="mini-toolbar" style="border-bottom:0;padding:0px;">
                    <table style="width:100%;">
                        <tr>
                            <td style="width:100%;">
                                <form id="userRoleGrid_searchForm" class="searchForm" gridId="userRoleGrid">
                                </form>
                                <a class="mini-button" iconCls="icon-add" onclick="userRoleGrid_add">增加</a>
                                <a class="mini-button" iconCls="icon-remove" onclick="del('userRoleGrid');">删除</a>
                                <a class="mini-button" iconCls="icon-save"
                                   onclick="gridSave('userRoleGrid','./user_role!saveList.action')">保存</a>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="mini-fit">
                    <div id="userRoleGrid" class="mini-datagrid" style="width:100%;height:100%;"
                         url="./user_role!search.action" showPager="false">
                        <div property="columns">
                            <div type="checkcolumn" width="25px"></div>
                            <div type="indexcolumn" width="20px"></div>
                            <div name="code" field="code" displayField="code" width="100" headerAlign="center">
                                代码<input property="editor" class="mini-buttonedit"
                                         onbuttonclick="userRole_input_onbuttonclick"/></div>
                            <div name="name" field="name" displayField="name" width="150" headerAlign="center">
                                名称
                            </div>
                            <div name="note" field="note" displayField="note" width="100" headerAlign="center">
                                备注
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div showCollapseButton="true">
                <div class="mini-fit">
                    <div id="resourceTreeGrid" class="mini-treegrid" style="width:100%;height:100%;"
                         showTreeIcon="true" parentField="parentId"
                         treeColumn="name" idField="id" resultAsTree="false" expandOnLoad="true">
                        <div property="columns">
                            <div type="indexcolumn" width="20px"></div>
                            <div name="name" field="name" width="200" headerAlign="center">
                                名称
                            </div>
                            <div name="projectCode" field="projectCode" width="60" headerAlign="center">
                                项目代码
                            </div>
                            <div name="origin" field="origin" width="150" headerAlign="center">
                                来源
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
    </div>
</div>

<script type="text/javascript">
    initGlobal();
    mini.parse();
    var userGrid = mini.get("userGrid");
    gridSearch('userGrid');
    var userRoleGrid = mini.get("userRoleGrid");
    var resourceTreeGrid = mini.get("resourceTreeGrid");

    function workerCode_input_onbuttonclick() {
        userGrid.cancelEdit();
        var editingRow = userGrid.getEditorOwnerRow(this);
        selectWorkerDlg({
            cb: function (row) {
                userGrid.updateRow(editingRow, {workerCode: row.code, workerInfo: row.name});
            }
        });
    }

    function userRole_input_onbuttonclick() {
        userRoleGrid.cancelEdit();
        var editingRow = userRoleGrid.getEditorOwnerRow(this);
        selectRoleDlg({
            cb: function (row) {
                userRoleGrid.updateRow(editingRow, {roleId: row.id, name: row.name, code: row.code, note: row.note});
            }
        });
    }
    //弹出选择框，以便用户按角色搜索
    function userGrid_searchForm_roleId_onbuttonclick() {
        var btnEdit = this;
        selectRoleDlg({
            multi: true,
            cb: function (rows) {
                var value = $(rows).map(function () {
                    return this.id;
                }).get().join(",");
                btnEdit.setValue(value);
                var name = $(rows).map(function () {
                    return this.name;
                }).get().join(",");
                btnEdit.setText(name);
            }
        });
    }
    //弹出选择框，以便用户按资源搜索
    function userGrid_searchForm_resourceId_onbuttonclick() {
        var btnEdit = this;
        selectResourceDlg({
            multi: true,
            autoCheckParent: false,
            cb: function (rows) {
                var value = $(rows).map(function () {
                    return this.id;
                }).get().join(",");
                btnEdit.setValue(value);
                var name = $(rows).map(function () {
                    return this.name;
                }).get().join(",");
                btnEdit.setText(name);
            }
        });
    }

    function userGrid_onselect(e) {
        if (userGrid.getSelecteds().length == 1) {
            var row = e.record;
            if(row.id) {
                userRoleGrid.load({'filter_EQS_entity.userId': row.id});
                resourceTreeGrid.setUrl('./resource!searchUserResList.action?userId=' + row.id);
            }else{
                userRoleGrid.clearRows();
                resourceTreeGrid.clearRows();
            }
        } else {
            userRoleGrid.clearRows();
            resourceTreeGrid.clearRows();
        }
    }

    function userRoleGrid_add() {
        if(userGrid.getChanges().length!=0){
            hint('用户表有未保存的修改！');
            return;
        }

        selectMulti('userGrid', function (users) {
            selectRoleDlg({
                multi: true,
                cb: function (rows) {
                    var param = new Array();
                    for (var i = 0; i < users.length; i++) {
                        for (var j = 0; j < rows.length; j++) {
                            param.push({userId: users[i].id, roleId: rows[j].id, editState: 0});
                        }
                    }
                    request({
                        isConfirm: false,
                        param: {entityList: param},
                        url: './user_role!saveList.action',
                        action: 'resourceTreeGrid'
                    });
                }
            });
        });
    }
</script>
</body>
</html>
