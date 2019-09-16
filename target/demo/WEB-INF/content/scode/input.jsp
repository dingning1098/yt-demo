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
    <form id="scode_input_form" action="scode!save.action" method="post">
        <table style="width:100%">
					<tr>
                    <td class="form_label"></td>
                    <td><input  id="scode_input_fldChi" class="mini-textbox" width="85%" name="fldChi"/></td>
                    <td class="form_label"></td>
                    <td><input  id="scode_input_name" class="mini-textbox" width="85%" name="name"/></td>
                    </tr>
					<tr>
                    <td class="form_label"></td>
                    <td><input  id="scode_input_defVal" class="mini-textbox" width="85%" name="defVal"/></td>
                    <td class="form_label"></td>
                    <td><input  id="scode_input_id_1" class="mini-textbox" width="85%" name="id_1"/></td>
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