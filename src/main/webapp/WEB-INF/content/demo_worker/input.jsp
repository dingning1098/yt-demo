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
    <form id="demoWorker_input_form" action="demo_worker!save.action" method="post">
        <table style="width:100%">
					<tr>
                    <td class="form_label">职工编号</td>
                    <td><input  id="demoWorker_input_workerNo" class="mini-textbox" width="85%" name="workerNo"/></td>
                    <td class="form_label">职工名称</td>
                    <td><input  id="demoWorker_input_workerNam" class="mini-textbox" width="85%" name="workerNam"/></td>
                    </tr>
					<tr>
                    <td class="form_label">出生日期</td>
                    <td><input  id="demoWorker_input_birthDte" class="mini-textbox" width="85%" name="birthDte"/></td>
                    <td class="form_label">性别(1-男 0-女)</td>
                    <td><input  id="demoWorker_input_sexCod" class="mini-textbox" width="85%" name="sexCod"/></td>
                    </tr>
					<tr>
                    <td class="form_label">民族</td>
                    <td><input  id="demoWorker_input_nationCod" class="mini-textbox" width="85%" name="nationCod"/></td>
                    <td class="form_label">省份代码</td>
                    <td><input  id="demoWorker_input_provinceCod" class="mini-textbox" width="85%" name="provinceCod"/></td>
                    </tr>
					<tr>
                    <td class="form_label">地市代码</td>
                    <td><input  id="demoWorker_input_areaCod" class="mini-textbox" width="85%" name="areaCod"/></td>
                    <td class="form_label">工作单位代码</td>
                    <td><input  id="demoWorker_input_corpCod" class="mini-textbox" width="85%" name="corpCod"/></td>
                    </tr>
					<tr>
                    <td class="form_label">工龄</td>
                    <td><input  id="demoWorker_input_serviceNum" class="mini-textbox" width="85%" name="serviceNum"/></td>
                    <td class="form_label">基本工资</td>
                    <td><input  id="demoWorker_input_baseNum" class="mini-textbox" width="85%" name="baseNum"/></td>
                    </tr>
					<tr>
                    <td class="form_label">备注</td>
                    <td><input  id="demoWorker_input_note" class="mini-textbox" width="85%" name="note"/></td>
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