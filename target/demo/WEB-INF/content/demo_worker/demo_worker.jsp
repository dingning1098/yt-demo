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
                    <form id="demoWorkerGrid_searchForm" class="searchForm" gridId="demoWorkerGrid">
                        编号
                        <input id='demoWorkerGrid_workerNo_search' name='filter_STARTS_workerNo' class='mini-textbox' style='width:60px'/>
                        名称
                        <input id='demoWorkerGrid_workerNam_search' name='filter_LIKES_workerNam' class='mini-textbox' style='width:60px'/>
                        出生日期
                        <input id='demoWorkerGrid_birthDte_searchBgn' name='filter_GED_birthDte' class='mini-datepicker' style='width:90px'/>
                        ~
                        <input id='demoWorkerGrid_birthDte_searchEnd' name='filter_LED_birthDte' class='mini-datepicker' style='width:90px'/>
                        性别
                        <input id='demoWorkerGrid_sexCod_search' name='filter_EQS_sexCod' class='mini-textbox' style='width:20px'/>
                        民族
                        <input id='demoWorkerGrid_nationCod_search' name='filter_EQS_nationCod' class='mini-textbox' style='width:40px'/>
                        工龄
                        <input id='demoWorkerGrid_serviceNum_search' name='filter_NEI_serviceNum' class='mini-textbox' style='width:40px'/>
                        基本工资
                        <input id='demoWorkerGrid_baseNum_search' name='filter_GEB_baseNum' class='mini-textbox' style='width:40px'/>

                    </form>
                    <a class="mini-button" iconCls="icon-search" onclick="gridSearch('demoWorkerGrid')">查询</a>
                    <%--<a class="mini-button" iconCls="icon-cut" onclick="gridSearchClear('demoWorkerGrid')">清空搜索</a>--%>
                    <a class="mini-button" iconCls="icon-add" onclick="add('demoWorkerGrid')">增加</a>
                    <a class="mini-button" iconCls="icon-remove" onclick="del('demoWorkerGrid')">删除</a>
                    <a class="mini-button" iconCls="icon-save" onclick="gridSave('demoWorkerGrid','./demo_worker!saveList.action')">保存</a>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="mini-fit">
    <div id="demoWorkerGrid" class="mini-datagrid" url="${ctx}/demo_worker!searchPage.action" style="width:100%;height:100%;"
         oncellcommitedit="OnCellCommitEdit"
         oncellbeginedit="OnCellBeginEdit"
         allowSortColumn="true"
         sortMode="client"
    >
        <div property="columns">
            <div type="checkcolumn" width="25px"></div>
            <div type="indexcolumn" width="25px"></div>
                    <div field="workerNo" width="70" headerAlign="center" allowSort="true">
                        职工编号
                        <input id="demoWorkerGrid_workerNo_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="workerNam" width="70" headerAlign="center" allowSort="true">
                        职工名称
                        <input id="demoWorkerGrid_workerNam_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="birthDte" width="90" headerAlign="center" dateFormat="yyyy-MM-dd" allowSort="true">
                        出生日期
                        <input id="demoWorkerGrid_birthDte_input" property="editor" class="mini-datepicker"/>
                    </div>
                    <div field="sexCod"  width="40" headerAlign="center" type="comboboxcolumn" allowSort="true">
                        性别
                        <input id="demoWorkerGrid_sexCod_input" property="editor" class="mini-combobox" data="[{id:'1',text:'男'},{id:'0',text:'女'}]"/>
                    </div>
                    <div field="nationCod" displayField="nationNam" width="80" headerAlign="center" allowSort="true">
                        民族
                        <input id="demoWorkerGrid_nationCod_input" property="editor"
                               class="mini-buttonedit"
                               onbuttonclick="demoWorkerGrid_nationCod_input_edit"
                        />
                    </div>
                    <div field="provinceCod" width="60" headerAlign="center" type="comboboxcolumn">
                        省份
                        <input id="demoWorkerGrid_provinceCod_input" property="editor" class="mini-combobox"
                               url="./demo_province!search.action"
                               valueField="provinceCod"
                               textField="provinceNam"
                        />
                    </div>
                    <div field="areaCod" width="90" displayField="areaNam" headerAlign="center" >
                        地市
                        <input id="demoWorkerGrid_areaCod_input" property="editor" class="mini-combobox"
                               valueField="areaCod"
                               textField="areaNam"
                        />
                    </div>
                    <div field="corpCod" width="180" headerAlign="center" type="comboboxcolumn">
                        工作单位
                        <input id="demoWorkerGrid_corpCod_input" property="editor" class="mini-combobox"
                               url="./demo_corp!search.action"
                               valueField="corpCod"
                               textField="corpNam"
                        />
                    </div>
                    <div field="serviceNum" width="40" headerAlign="center" align="right">
                        工龄
                        <input id="demoWorkerGrid_serviceNum_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="baseNum" width="60" headerAlign="center" align="right">
                        基本工资
                        <input id="demoWorkerGrid_baseNum_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="note" width="150" headerAlign="center">
                        备注
                        <input id="demoWorkerGrid_note_input" property="editor" class="mini-textbox"/>
                    </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    initGlobal();
    mini.parse();
    var demoWorkerGrid = mini.get("demoWorkerGrid");
    gridSearch('demoWorkerGrid');

    /**
     * 省份发生改变,带到城市发生改变
     */
    function OnCellCommitEdit(e) {
        var grid = e.sender;
        var record = e.record;
        var field = e.field;
        if (field == "provinceCod") {
            grid.updateRow(record, { areaCod: "", areaNam: "" });
        }
    }
    function OnCellBeginEdit(e) {
        var record = e.record;
        var field = e.field;
        var editor = e.editor;
        if (field == "areaCod") {
            var provinceCod = record.provinceCod;
            if (provinceCod) {
                var url = "./demo_area!search.action?filter_EQS_provinceCod=" + provinceCod;
                editor.setUrl(url);
            } else {
                e.cancel = true;
            }
        }
    }

    /**
     * 点击民族，弹出选择
     */
    function demoWorkerGrid_nationCod_input_edit(e){
        var btnEdit = this;
        //调用选择民族对话框
        selectNationDlg({
            cb:function(row){
                var editingRow=demoWorkerGrid.getEditorOwnerRow(btnEdit);
                demoWorkerGrid.updateRow(editingRow,{nationCod:row.nationCod,nationNam:row.nationNam});
                demoWorkerGrid.cancelEdit();
            }
        });
    }
    /**
     * 选择民族数据对话框
     */
    function selectNationDlg(opts){
        opts= $.extend({
            multi:false,//是否允许多选
            cb:function(rows){}//选中后的回调函数
        },opts);
        mini.open({
            url: "./demo_nation.action?name=select",
            title: "选择民族代码",
            width: 900,
            height: 380,
            ondestroy: function (action) {
                //if (action == "close") return false;
                if (action == "ok") {
                    var iframe = this.getIFrameEl();
                    var data = iframe.contentWindow.GetData();
                    data = mini.clone(data);    //必须
                    if(opts.multi){
                        opts.cb(rows);
                    }else{
                        if(data.length==0){
                            iframe.contentWindow.hint("未选择数据数据！");
                            return false;
                        }else if(data.length>1){
                            iframe.contentWindow.hint("只允许选择一条数据！");
                            return false;
                        }else{
                            opts.cb(data[0]);
                        }
                    }
                }
            }
        });
    }
</script>
</body>
</html>