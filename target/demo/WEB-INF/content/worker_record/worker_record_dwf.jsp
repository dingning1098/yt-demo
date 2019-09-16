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
                    <form id="workerRecordGrid_searchForm" class="searchForm" gridId="workerRecordGrid">
                        编号
                        <input id='workerRecordGrid_workerCod_search' name='filter_STARTS_workerCod' class='mini-textbox' style='width:60px'/>
                        姓名
                        <input id='workerRecordGrid_workerNam_search' name='filter_LIKES_workerNam' class='mini-textbox' style='width:80px'/>
                    </form>
                    <a class="mini-button" iconCls="icon-search" onclick="gridSearch('workerRecordGrid')">查询</a>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="mini-fit">
    <div id="workerRecordGrid" class="mini-datagrid" url="${ctx}/worker_record!searchPage.action?order_workerCod_default_1=asc" style="width:100%;height:100%;">
        <div property="columns">
            <div type="indexcolumn" width="25px"></div>
            <div field="flag" width="40" headerAlign="center" type="checkboxcolumn" trueValue="1" falseValue="0" ReadOnly="true">有车否</div>
            <div field="workerCod" width="50" headerAlign="center">编号</div>
            <div field="workerNam" width="60" headerAlign="center">姓名</div>
            <div field="workDte" width="85" headerAlign="center" dateformat="yyyy-MM-dd">参加工作日期</div>
            <div field="corpNam" width="100" headerAlign="center">单位</div>
            <div field="deptNam" width="90" headerAlign="center">部门</div>
            <div field="toPortTim" width="85" headerAlign="center" dateformat="yyyy-MM-dd">到港日期</div>
            <div field="wageBase" width="75" headerAlign="center" align="right" dataType="currency" currencyUnit="￥" >缴费基数</div>
            <div field="gradeSch" width="110" headerAlign="center">毕业学校</div>
            <div field="homeTown" width="110" headerAlign="center">籍贯</div>
        </div>
    </div>
</div>

<script type="text/javascript">
    initGlobal();
    mini.parse();
    var workerRecordGrid = mini.get("workerRecordGrid");
    gridSearch('workerRecordGrid');
</script>
</body>
</html>