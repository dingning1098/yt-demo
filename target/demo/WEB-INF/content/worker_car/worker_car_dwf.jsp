<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <%@ include file="/common/taglibs.jsp" %>
    <style>
        .abox{
            width:305px!important;
        }
        .bbox{
            width:100px!important;
        }
        .cbox{
            width:200px!important;
        }
        .ebox{
            width:80px!important;
        }
        .fbox{
            width:140px!important;
        }
        .gbox{
            width:815px!important;
        }
        .notnull-column{
            color:red;
        }

        h{
            color:red;
        }

    </style>
</head>
<body>
<div style="width:100%;">

</div>
<div class="mini-fit">
    <div class="mini-splitter" style="width:100%;height:100%;">
        <div size="26%" showCollapseButton="true">
            <div class="mini-fit" style="width:100%;height: 100%">
            <div class="mini-toolbar" style="border-bottom:0;padding:0px;">
                <table style="width:100%;">
                    <tr>
                        <td style="width:100%;">
                            <form id="workerRecordGrid_searchForm" class="searchForm" gridId="workerRecordGrid">
                                编码
                                <input id='workerRecordGrid_workerCod_search' name='filter_STARTS_workerCod' class='mini-textbox' style='width:60px'/>
                                姓名
                                <input id='workerRecordGrid_workerNam_search' name='filter_LIKES_workerNam' class='mini-textbox' style='width:60px'/>
                            </form>
                            <a class="mini-button" iconCls="icon-search" onclick="gridSearch('workerRecordGrid')">查询</a>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="workerRecordGrid" class="mini-datagrid"
                 url="${ctx}/worker_record!searchPage.action?order_workerCod_default_1=asc"
                 style="width:100%;height:100%;" showPager="true"
                 onselect="workerRecordOnSelect">
                <div property="columns">
                    <div type="indexcolumn" width="25px"></div>
                    <div field="flag" width="40" headerAlign="center" type="checkboxcolumn" trueValue="1" falseValue="0" ReadOnly="true">有车</div>
                    <div field="workerCod" width="60" headerAlign="center">职工编号</div>
                    <div field="workerNam" width="60" headerAlign="center">职工姓名</div>
                    <div field="corpNam" width="120" headerAlign="center">单位</div>
                    <div field="deptNam" width="90" headerAlign="center">部门</div>
                    <div field="toPortTim" width="85" headerAlign="center" dateformat="yyyy-MM-dd">到港日期</div>
                    <div field="wageBase" width="75" headerAlign="center" align="right" dataType="currency" currencyUnit="￥" >缴费基数</div>
                    <div field="gradeSch" width="110" headerAlign="center">毕业学校</div>
                </div>
            </div>
                </div>
        </div>
        <div showCollapseButton="true">
            <div class="mini-toolbar" style="border-bottom:0;padding:0px;">
                <table style="width:100%;">
                    <tr>
                        <td style="width:100%;">
                            <form id="workerCarGrid_searchForm" class="searchForm" gridId="workerCarGrid">
                                车牌号
                                <input id='workerCarGrid_carNo_search' name='filter_LIKES_carNo' class='mini-textbox' style='width:60px'/>
                                车辆类型
                                <div id="workerCarGrid_carTyp_search" name='filter_LIKES_carTyp' property="editor" allowInput="true"
                                     popupwidth="150" class="mini-combobox"
                                     valueField="code" textField="fldChi"
                                     url="${ctx}/scode!search.action?filter_EQS_fldEng=CAR_TYP&order_code_default_1=asc">
                                    <div property="columns">
                                        <div header="代码" field="code" width="30%"></div>
                                        <div header="名称" field="fldChi" width="70%"></div>
                                    </div>
                                </div>
                            </form>
                            <a class="mini-button" iconCls="icon-search" onclick="gridSearch('workerCarGrid')">查询</a>
                            <a class="mini-button" iconCls="icon-add" onclick="workerCarGrid_add">增加</a>
                            <a class="mini-button" iconCls="icon-remove" onclick="del('workerCarGrid')">删除</a>
                            <a class="mini-button" iconCls="icon-save" onclick="gridSave('workerCarGrid','./worker_car!saveList.action')">保存</a>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="workerCarGrid" class="mini-datagrid" url="${ctx}/worker_car!search.action" style="width:100%;height:100%;"
                 showpager="false" oncellvalidation="oncellvalidation">
                <div property="columns">
                    <div type="indexcolumn" width="25px"></div>
                    <div field="carNo" width="80" headerAlign="center" vtype="required">
                        <span class="notnull-column">车牌号</span>
                        <input id="workerCarGrid_carNo_input" property="editor" class="mini-textbox"  />
                    </div>
                    <div field="carTyp" width="90" headerAlign="center" type="comboboxcolumn">
                        车辆类型
                        <div id="workerCarGrid_carTyp_input" property="editor" allowInput="true"
                             popupwidth="170" class="mini-combobox"
                             valueField="code" textField="fldChi"
                             url="${ctx}/scode!search.action?filter_EQS_fldEng=CAR_TYP&order_code_default_1=asc">
                            <div property="columns">
                                <div header="代码" field="code" width="30%"></div>
                                <div header="名称" field="fldChi" width="70%"></div>
                            </div>
                        </div>
                    </div>
                    <div field="carUse" width="70" headerAlign="center" type="comboboxcolumn">
                        使用性质
                        <div id="workerCarGrid_carUse_input" property="editor" allowInput="true"
                             popupwidth="150" class="mini-combobox"
                             valueField="code" textField="fldChi"
                             url="${ctx}/scode!search.action?filter_EQS_fldEng=CAR_USE&order_code_default_1=asc">
                            <div property="columns">
                                <div header="代码" field="code" width="30%"></div>
                                <div header="名称" field="fldChi" width="70%"></div>
                            </div>
                        </div>
                    </div>
                    <div field="carOwner" width="65" headerAlign="center">
                        车辆所有人
                        <input id="workerCarGrid_carOwner_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="ownerRelation" width="65" headerAlign="center">
                        车主关系
                        <input id="workerCarGrid_ownerRelation_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="buyDte" width="75" headerAlign="center" dateFormat="yyyy-MM-dd">
                        购买日期
                        <input id="workerCarGrid_buyDte_input" property="editor" class="mini-datepicker"/>
                    </div>
                    <div field="carPrice" width="60" headerAlign="center" align="right" numberFormat="n" vtype="float">
                        价格(万元)
                        <input id="workerCarGrid_carPrice_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="carBrand" width="65" headerAlign="center">
                        品牌型号
                        <input id="workerCarGrid_carBrand_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="personNum" width="45" headerAlign="center" align="right" vtype="int">
                        载人数
                        <input id="workerCarGrid_personNum_input" property="editor" class="mini-textbox"/>
                    </div>

                    <div field="turboId" width="45" headerAlign="center" type="checkboxcolumn" trueValue="1" falseValue="0">
                        涡轮否
                    </div>
                    <div field="bodyColor" width="55" headerAlign="center">
                        车体颜色
                        <input id="workerCarGrid_bodyColor_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="markTxt" width="150" headerAlign="center">
                        备注
                        <input id="workerCarGrid_markTxt_input" property="editor" class="mini-textbox"/>
                    </div>
                    <div field="workerCod" width="60" headerAlign="center">
                        职工编码
                    </div>
                    <div field="workerNam" width="60" headerAlign="center">
                        职工名称
                    </div>
                    <div field="corpNam" width="180" headerAlign="center">
                        备案单位
                    </div>
                    <div field="checkDte" width="75" dateFormat="yyyy-MM-dd" headerAlign="center">
                        备案日期
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    initGlobal();
    mini.parse();
    var workerCarGrid = mini.get("workerCarGrid");
    var workerRecordGrid = mini.get("workerRecordGrid");
    var carForm = mini.get("workerCarGrid_searchForm");
    gridSearch('workerRecordGrid');
    gridSearch('workerCarGrid');

    function workerRecordOnSelect(e){
        var row = e.record;
        workerCarGrid.clearRows();
        if(row.workerCod){
            workerCarGrid.load({'filter_EQS_workerCod':row.workerCod});
        }
    }
    /**
     * 增加车辆信息
     */
    function workerCarGrid_add(){
        var getRow = workerRecordGrid.getSelected();
        if(getRow){
            //判断是否已经录入车辆信息
            var rowCnt = workerCarGrid.getData().length;
            if(rowCnt > 0){
                hint('职工:' + getRow.workerNam + ' 已经录入车辆信息！系统要求每位职工只能录入一辆车');
                return;
            }
            //录入车辆信息，赋值默认值
            var newRow = {
                'workerCod': getRow.workerCod,
                'workerNam': getRow.workerNam,
                'carOwner': getRow.workerNam,
                'ownerRelation': '本人',
                'corpNam': getRow.corpNam + '.' + getRow.deptNam,
                'checkDte': '${today}',
                'carTyp':'03',
                'carUse':'01'
            };
            add("workerCarGrid", newRow);

        }else{
            hint('请选择左边职工信息!');
        }
    }

    function oncellvalidation(e){

        if(e.field=="carNo"){
            request({
                url: "${ctx}/worker_car!search.action?filter_EQS_carNo=" + e.value,
                isConfirm: false,
                action: function (data) {
                    if(data.length>0){
                        workerCarGrid.isValid = false;
                    }
                }
            });
        }
    }
</script>
</body>
</html>