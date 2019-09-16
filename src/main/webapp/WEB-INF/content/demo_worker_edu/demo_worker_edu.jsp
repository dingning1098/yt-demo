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
                    <a class="mini-button" iconCls="icon-add" onclick="add('demoWorkerEduGrid')">增加</a>
                    <a class="mini-button" iconCls="icon-remove" onclick="del('demoWorkerEduGrid')">删除</a>
                    <a class="mini-button" iconCls="icon-save" onclick="gridSave('demoWorkerEduGrid','./demo_worker_edu!saveList.action')">保存</a>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="mini-fit">
    <div id="demoWorkerEduGrid" class="mini-datagrid" url="${ctx}/demo_worker_edu!searchPage.action" style="width:100%;height:100%;">
        <div property="columns">
            <div type="checkcolumn" width="25px"></div>
            <div type="indexcolumn" width="25px"></div>
                    <div field="workerId" width="50" headerAlign="center" class="mini-hidden"></div>
                    <div field="bgnDte" width="95" headerAlign="center">
                        开始日期
                        <input id="demoWorkerEduGrid_bgnDte_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="endDte" width="95" headerAlign="center">
                        结束日期
                        <input id="demoWorkerEduGrid_endDte_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="eduNam" width="80" headerAlign="center">
                        学位
                        <input id="demoWorkerEduGrid_eduNam_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="schoolNam" width="180" headerAlign="center">
                        毕业学校
                        <input id="demoWorkerEduGrid_schoolNam_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="note" width="150" headerAlign="center">
                        备注
                        <input id="demoWorkerEduGrid_note_input" property="editor" class="mini-textbox"/>
                    </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    initGlobal();
    mini.parse();
    var demoWorkerEduGrid = mini.get("demoWorkerEduGrid");
    gridSearch('demoWorkerEduGrid');
</script>
</body>
</html>