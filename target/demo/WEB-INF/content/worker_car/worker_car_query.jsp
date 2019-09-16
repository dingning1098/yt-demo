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
    <div class="mini-toolbar" style="border-bottom:0;padding:0px;">
        <table style="width:100%;">
            <tr>
                <td style="width:100%;">
                    <form id="workerCarGridQuery_searchForm" class="searchForm" gridId="workerCarGridQuery">
                        车号
                        <input id='workerCarGridQuery_workerCar_search' name='filter_LIKES_lower(carNo)' class='mini-textbox' style='width:80px'/>
                        职工编码
                        <input id='workerCarGridQuery_workerCod_search' name='filter_STARTS_workerCod' class='mini-textbox' style='width:60px'/>
                        职工姓名
                        <input id='workerCarGridQuery_workerNam_search' name='filter_LIKES_workerNam' class='mini-textbox' style='width:80px'/>
                    </form>
                    <a class="mini-button" iconCls="icon-search" onclick="gridSearch('workerCarGridQuery')">查询</a>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="mini-fit">
            <div id="workerCarGridQuery" class="mini-datagrid" url="${ctx}/worker_car!search.action" style="width:100%;height:100%;" showpager="false">
                <div property="columns">
                    <div type="indexcolumn" width="25px"></div>
                    <div field="carNo" width="80" headerAlign="center" vtype="required">
                        <span class="notnull-column">车牌号</span>
                    </div>
                    <div field="carTyp" width="90" headerAlign="center" type="comboboxcolumn" readonly="true">
                        车辆类型
                        <div id="workerCarGridQuery_carTyp_input" property="editor"
                             popupwidth="170" class="mini-combobox"
                             valueField="code" textField="fldChi"
                             url="${ctx}/scode!search.action?filter_EQS_fldEng=CAR_TYP&order_code_default_1=asc">
                            <div property="columns">
                                <div header="代码" field="code" width="30%"></div>
                                <div header="名称" field="fldChi" width="70%"></div>
                            </div>
                        </div>
                    </div>
                    <div field="carUse" width="70" headerAlign="center" type="comboboxcolumn" readonly="true">
                        使用性质
                        <div id="workerCarGridQuery_carUse_input" property="editor" allowInput="true"
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
                    </div>
                    <div field="ownerRelation" width="65" headerAlign="center">
                        车主关系
                    </div>
                    <div field="buyDte" width="75" headerAlign="center" dateFormat="yyyy-MM-dd">
                        购买日期
                    </div>
                    <div field="carPrice" width="60" headerAlign="center" align="right" numberFormat="n" vtype="float">
                        价格(万元)
                    </div>
                    <div field="carBrand" width="65" headerAlign="center">
                        品牌型号
                    </div>
                    <div field="personNum" width="45" headerAlign="center" align="right" vtype="int">
                        载人数
                    </div>

                    <div field="turboId" width="45" headerAlign="center" type="checkboxcolumn" trueValue="1" falseValue="0" readonly="true">
                        涡轮否
                    </div>
                    <div field="bodyColor" width="55" headerAlign="center">
                        车体颜色
                    </div>
                    <div field="markTxt" width="150" headerAlign="center">
                        备注
                    </div>
                    <div field="workerCod" width="60" headerAlign="center">职工编码</div>
                    <div field="workerNam" width="60" headerAlign="center">职工姓名</div>
                    <div field="corpNam" width="180" headerAlign="center">备案单位</div>
                    <div field="checkDte" width="75" dateFormat="yyyy-MM-dd" headerAlign="center">备案日期</div>
                </div>
    </div>
</div>

<script type="text/javascript">
    initGlobal();
    mini.parse();
    var workerCarGridQuery = mini.get("workerCarGridQuery");
    gridSearch('workerCarGridQuery');
</script>
</body>
</html>