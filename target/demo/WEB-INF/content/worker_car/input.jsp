<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <%@ include file="/common/taglibs.jsp" %>
    <style>
        td.form_label{
            width:90px;
        }
    </style>
</head>
<body>

<div class="mini-fit">
    <form id="workerCar_input_form" action="worker_car!save.action" method="post">
        <table style="width:100%">
					<tr>
                    <td class="form_label">车牌号</td>
                    <td><input  id="workerCar_input_carNo" class="mini-textbox" width="85%" name="carNo"/></td>
                    <td class="form_label">车辆类型</td>
                    <td><input  id="workerCar_input_carTyp" class="mini-textbox" width="85%" name="carTyp"/></td>
                    </tr>
					<tr>
                    <td class="form_label">使用性质</td>
                    <td><input  id="workerCar_input_carUse" class="mini-textbox" width="85%" name="carUse"/></td>
                    <td class="form_label">车辆所有人</td>
                    <td><input  id="workerCar_input_carOwner" class="mini-textbox" width="85%" name="carOwner"/></td>
                    </tr>
					<tr>
                    <td class="form_label">购买日期</td>
                    <td><input  id="workerCar_input_buyDte" class="mini-textbox" width="85%" name="buyDte"/></td>
                    <td class="form_label">构成价格(万元)</td>
                    <td><input  id="workerCar_input_carPrice" class="mini-textbox" width="85%" name="carPrice"/></td>
                    </tr>
					<tr>
                    <td class="form_label">卖出单位</td>
                    <td><input  id="workerCar_input_supplierNam" class="mini-textbox" width="85%" name="supplierNam"/></td>
                    <td class="form_label">品牌型号</td>
                    <td><input  id="workerCar_input_carBrand" class="mini-textbox" width="85%" name="carBrand"/></td>
                    </tr>
					<tr>
                    <td class="form_label">发动机排量</td>
                    <td><input  id="workerCar_input_engineDisplacement" class="mini-textbox" width="85%" name="engineDisplacement"/></td>
                    <td class="form_label">邮箱容积(升)</td>
                    <td><input  id="workerCar_input_oilVol" class="mini-textbox" width="85%" name="oilVol"/></td>
                    </tr>
					<tr>
                    <td class="form_label">整备质量</td>
                    <td><input  id="workerCar_input_carTon" class="mini-textbox" width="85%" name="carTon"/></td>
                    <td class="form_label">核定载人数</td>
                    <td><input  id="workerCar_input_personNum" class="mini-textbox" width="85%" name="personNum"/></td>
                    </tr>
					<tr>
                    <td class="form_label">车体颜色</td>
                    <td><input  id="workerCar_input_bodyColor" class="mini-textbox" width="85%" name="bodyColor"/></td>
                    <td class="form_label">总质量(千克)</td>
                    <td><input  id="workerCar_input_totalWgt" class="mini-textbox" width="85%" name="totalWgt"/></td>
                    </tr>
					<tr>
                    <td class="form_label">变速箱形式</td>
                    <td><input  id="workerCar_input_transmissionForm" class="mini-textbox" width="85%" name="transmissionForm"/></td>
                    <td class="form_label">是否涡轮增压(0-否 1-是)</td>
                    <td><input  id="workerCar_input_turboId" class="mini-textbox" width="85%" name="turboId"/></td>
                    </tr>
					<tr>
                    <td class="form_label">发动机号码</td>
                    <td><input  id="workerCar_input_engineNo" class="mini-textbox" width="85%" name="engineNo"/></td>
                    <td class="form_label">保养周期</td>
                    <td><input  id="workerCar_input_maintenancePeriod" class="mini-textbox" width="85%" name="maintenancePeriod"/></td>
                    </tr>
					<tr>
                    <td class="form_label">车辆识别代码</td>
                    <td><input  id="workerCar_input_carIdcard" class="mini-textbox" width="85%" name="carIdcard"/></td>
                    <td class="form_label">注册登记日期</td>
                    <td><input  id="workerCar_input_regDte" class="mini-textbox" width="85%" name="regDte"/></td>
                    </tr>
					<tr>
                    <td class="form_label">发证日期</td>
                    <td><input  id="workerCar_input_issueDte" class="mini-textbox" width="85%" name="issueDte"/></td>
                    <td class="form_label">年检时间</td>
                    <td><input  id="workerCar_input_partTim" class="mini-textbox" width="85%" name="partTim"/></td>
                    </tr>
					<tr>
                    <td class="form_label">备注</td>
                    <td><input  id="workerCar_input_markTxt" class="mini-textbox" width="85%" name="markTxt"/></td>
                    <td class="form_label">联系人电话</td>
                    <td><input  id="workerCar_input_linkTel" class="mini-textbox" width="85%" name="linkTel"/></td>
                    </tr>
					<tr>
                    <td class="form_label">车主关系</td>
                    <td><input  id="workerCar_input_ownerRelation" class="mini-textbox" width="85%" name="ownerRelation"/></td>
                    <td class="form_label">职工代码</td>
                    <td><input  id="workerCar_input_workerCod" class="mini-textbox" width="85%" name="workerCod"/></td>
                    </tr>
					<tr>
                    <td class="form_label">职工名称</td>
                    <td><input  id="workerCar_input_workerNam" class="mini-textbox" width="85%" name="workerNam"/></td>
                    <td class="form_label">备案单位</td>
                    <td><input  id="workerCar_input_corpNam" class="mini-textbox" width="85%" name="corpNam"/></td>
                    </tr>
					<tr>
                    <td class="form_label">备案日期</td>
                    <td><input  id="workerCar_input_checkDte" class="mini-textbox" width="85%" name="checkDte"/></td>
                    <td class="form_label">操作人</td>
                    <td><input  id="workerCar_input_operMan" class="mini-textbox" width="85%" name="operMan"/></td>
                    </tr>
					<tr>
                    <td class="form_label">操作日期</td>
                    <td><input  id="workerCar_input_operDte" class="mini-textbox" width="85%" name="operDte"/></td>
                    <td class="form_label">备案类型(0-正式职工 )</td>
                    <td><input  id="workerCar_input_checkTyp" class="mini-textbox" width="85%" name="checkTyp"/></td>
                    </tr>
					<tr>
                    <td class="form_label"></td>
                    <td><input  id="workerCar_input_addCol1" class="mini-textbox" width="85%" name="addCol1"/></td>
                    <td class="form_label"></td>
                    <td><input  id="workerCar_input_addCol2" class="mini-textbox" width="85%" name="addCol2"/></td>
                    </tr>
					<tr>
                    <td class="form_label"></td>
                    <td><input  id="workerCar_input_addCol3" class="mini-textbox" width="85%" name="addCol3"/></td>
                    <td class="form_label">是否在用(0-不用 1-在用)</td>
                    <td><input  id="workerCar_input_useId" class="mini-textbox" width="85%" name="useId"/></td>
                    </tr>
        </table>
    </form>
</div>
<div class="mini-toolbar" style="text-align:center;padding-top:8px;padding-bottom:8px;" borderStyle="border:0;">
    <a class="mini-button" style="width:60px;" onclick="CloseWindow('ok');">确定</a>
    <span style="display:inline-block;width:25px;"></span>
    <a class="mini-button" style="width:60px;" onclick="CloseWindow('cancel');">取消</a>
</div>

<script type="text/javascript">

    initGlobal();
    //输入框添满上级td元素
    $("td input").each(function(){
        if(!$(this).attr("width"))
            $(this).attr("width","85%");
    });
    mini.parse();

    function CloseWindow(action) {
        if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
        else window.close();
    }
</script>
</body>
</html>