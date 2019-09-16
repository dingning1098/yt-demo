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
    <form id="workerRecord_input_form" action="worker_record!save.action" method="post">
        <table style="width:100%">
					<tr>
                    <td class="form_label">姓名</td>
                    <td><input  id="workerRecord_input_workerNam" class="mini-textbox" width="85%" name="workerNam"/></td>
                    <td class="form_label">参加工作日期</td>
                    <td><input  id="workerRecord_input_workDte" class="mini-textbox" width="85%" name="workDte"/></td>
                    </tr>
					<tr>
                    <td class="form_label">单位</td>
                    <td><input  id="workerRecord_input_corpCod" class="mini-textbox" width="85%" name="corpCod"/></td>
                    <td class="form_label">部门</td>
                    <td><input  id="workerRecord_input_deptCod" class="mini-textbox" width="85%" name="deptCod"/></td>
                    </tr>
					<tr>
                    <td class="form_label">职务</td>
                    <td><input  id="workerRecord_input_business" class="mini-textbox" width="85%" name="business"/></td>
                    <td class="form_label">毕业学校</td>
                    <td><input  id="workerRecord_input_gradeSch" class="mini-textbox" width="85%" name="gradeSch"/></td>
                    </tr>
					<tr>
                    <td class="form_label">专业</td>
                    <td><input  id="workerRecord_input_speciality" class="mini-textbox" width="85%" name="speciality"/></td>
                    <td class="form_label">籍贯</td>
                    <td><input  id="workerRecord_input_homeTown" class="mini-textbox" width="85%" name="homeTown"/></td>
                    </tr>
					<tr>
                    <td class="form_label">出生地</td>
                    <td><input  id="workerRecord_input_birthPlac" class="mini-textbox" width="85%" name="birthPlac"/></td>
                    <td class="form_label">到港日期</td>
                    <td><input  id="workerRecord_input_toPortTim" class="mini-textbox" width="85%" name="toPortTim"/></td>
                    </tr>
					<tr>
                    <td class="form_label">上年度收入</td>
                    <td><input  id="workerRecord_input_wageNum" class="mini-textbox" width="85%" name="wageNum"/></td>
                    <td class="form_label">健康情况</td>
                    <td><input  id="workerRecord_input_health" class="mini-textbox" width="85%" name="health"/></td>
                    </tr>
					<tr>
                    <td class="form_label">电话</td>
                    <td><input  id="workerRecord_input_phone" class="mini-textbox" width="85%" name="phone"/></td>
                    <td class="form_label">备注</td>
                    <td><input  id="workerRecord_input_note" class="mini-textbox" width="85%" name="note"/></td>
                    </tr>
					<tr>
                    <td class="form_label">缴费基数</td>
                    <td><input  id="workerRecord_input_wageBase" class="mini-textbox" width="85%" name="wageBase"/></td>
                    <td class="form_label">工龄</td>
                    <td><input  id="workerRecord_input_serviceNum" class="mini-textbox" width="85%" name="serviceNum"/></td>
                    </tr>
					<tr>
                    <td class="form_label">贡献值</td>
                    <td><input  id="workerRecord_input_contribVal" class="mini-textbox" width="85%" name="contribVal"/></td>
                    <td class="form_label"></td>
                    <td><input  id="workerRecord_input_id" class="mini-textbox" width="85%" name="id"/></td>
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