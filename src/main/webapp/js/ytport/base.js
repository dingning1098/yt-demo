$(document).ready(
    function () {
        //重写datagrid的默认设置
        $.extend($.fn.datagrid.defaults, {
            striped: true,
            pageSize: 20,
            selectOnCheck: false,
            pagination: true,
            singleSelect: true,
            rownumbers: true,
            fit: true,
            multiSort:true,
            pageList:[10,20,50,100],
            loader: function (param, success, error) {
                var that = $(this);
                var opts = that.datagrid("options");
                if (!opts.url) {
                    return false;
                }
                $.ajax({
                    url: opts.url,
                    dataType: "json",
                    data: param,
                    async: false,
                    success: function (data, statusText) {
                        if (data.mtype && data.mtype == "success") {
                            success(data.data);
                        } else {
                            showMsg(data.msg);
                            error();
                        }
                    },
                    error: function (data) {
                        showMsg(data.msg);
                        error();
                    }
                });
            }
        });

        //重写treegrid的默认设置
        $.extend($.fn.treegrid.defaults, {
            fit: true,
            loader: function (param, success, error) {
                var that = $(this);
                var opts = that.treegrid("options");
                if (!opts.url) {
                    return false;
                }
                that.treegrid("loading");
                $.ajax({
                    url: opts.url,
                    dataType: "json",
                    data: param,
                    async: false,
                    success: function (data, statusText) {
                        if (data.mtype && data.mtype == "success") {
                            success(data.data);
                        } else {
                            showMsg(data.msg);
                            error();
                        }
                    },
                    error: function (data) {
                        that.treegrid("loaded");
                        showMsg(data.msg);
                        error();
                    }
                });
            }
        });
        //重写combogrid的默认设置
        $.extend($.fn.combogrid.defaults, {
            /*striped:true,
             pageSize:20,
             selectOnCheck:false,
             pagination:true,
             singleSelect : true,*/
            mode:'remote',
            loader: function (param, success, error) {
                var that = $(this);
                var opts = that.datagrid("options");
                if (!opts.url) {
                    return false;
                }
                $.ajax({
                    url: opts.url,
                    dataType: "json",
                    data: param,
                    async: false,
                    success: function (data, statusText) {
                        if (data.mtype && data.mtype == "success") {
                            success(data.data);
                        } else {
                            showMsg(data.msg);
                            error();
                        }
                    },
                    error: function (data) {
                        showMsg(data.msg);
                        error();
                    }
                });
            },
            onLoadSuccess:function(data){
                var that = $(this);
                that.combogrid('textbox').attr('placeholder','双击清空');
                //设置默认显示文本
                that.combogrid('setText', that.attr('display'));
            },
            onHidePanel:function(index,row){
                var rows=$(this).combogrid('grid').datagrid('getSelections')
                //如果有被选中的行，则执行搜索，否则不执行搜索
                if(rows.length>0){
                    var gridId=$(this.form).attr("gridId");
                    if(gridId){
                        $("#" + gridId).datagrid("reload", $(this.form).serializeObject());
                    }
                }
            }
        });

        //重写combobox的默认设置
        $.extend($.fn.combobox.defaults, {
            loader: function (param, success, error) {
                var that = $(this);
                var opts = that.combobox("options");
                if (!opts.url) {
                    return false;
                }
                $.ajax({
                    url: opts.url,
                    dataType: "json",
                    data: param,
                    async: false,
                    success: function (data, statusText) {
                        if (data.mtype && data.mtype == "success") {
                            success(data.data);
                        } else {
                            showMsg(data.msg);
                            error();
                        }
                    },
                    error: function (data) {
                        showMsg(data.msg);
                        error();
                    }
                });
            },
            onSelect: function (index, row) {
                console.log('here!');
                //如果有被选中的行，则执行搜索，否则不执行搜索
                var gridId = $(this.form).attr("gridId");
                if (gridId) {
                    $("#" + gridId).datagrid("reload", $(this.form).serializeObject());
                }
            }
        });

        //重写combotree的默认设置
        $.extend($.fn.combotree.defaults, {
            mode:'remote',
            editable:true,
            selectOnNavigation:true,
            formatter:function(node){
                var opts=$(this).tree("options");
                if(opts.treeField)
                    return eval('node["'+opts.treeField+'"]');
                else
                    alert('没有定义comboTree的treeField属性！无法显示树结构！');
            },
            loader: function (param, success, error) {
                var opts = $(this).tree('options')
                if (!opts.url) {
                    return false;
                }
                $.ajax({
                    url: opts.url,
                    dataType: "json",
                    data: param,
                    async: false,
                    success: function (data, statusText) {
                        if (data.mtype && data.mtype == "success") {
                            success(data.data);
                        } else {
                            showMsg(data.msg);
                            error();
                        }
                    },
                    error: function (data) {
                        showMsg(data.msg);
                        error();
                    }
                });
            }/*,
            onLoadSuccess:function(data){
                var that = $(this);
                that.combogrid('textbox').attr('placeholder','双击清空');
            },
            onHidePanel:function(index,row){
                console.log('here!');
                var rows=$(this).combogrid('grid').datagrid('getSelections')
                //如果有被选中的行，则执行搜索，否则不执行搜索
                if(rows.length>0){
                    var gridId=$(this.form).attr("gridId");
                    if(gridId){
                        $("#" + gridId).datagrid("reload", $(this.form).serializeObject());
                    }
                }
            }*/
        });


        $("form[gridId] input:not('.textbox-text,.textbox-value'),form[gridId] select").live("focus",function(){

            //如果正在监测，则直接返回
            if($(this).attr('monitoring')=='true') {
                log('当前元素正在监听，直接返回');
                return;
            }
            else{
                stopMonitoring();
                monitoringElement=$(this);
                monitoringElement.attr('monitoring','true');
            }

            var gridId=$(this.form).attr("gridId");
            //$("#"+gridId).datagrid("reload",$(this.form).serializeObject());
            var searchForm=$(this.form);
            var init = monitoringElement.val();//初值
            var k = monitoringElement.val();

            /*设置不间断监测*/
            monitoringInterval = setInterval(function () {
                var k2=monitoringElement.val();
                log('k2='+k2);
                log('k='+k)
                /*如果输入框内容有变化且大于时间间隔，则发送一次请求*/
                if ( k2 == k&&k2!=init){
                    init=k2;

                    if(gridId.indexOf('TreeGrid')!=-1) {
                        log('execute tree search');
                        $("#" + gridId).treegrid("reload", searchForm.serializeObject());
                    }
                    else {
                        $("#" + gridId).datagrid("reload", searchForm.serializeObject());
                    }
                }else{
                    k=k2;
                }
            }, 500);
        });

        $("form[gridId] input[type=checkbox]").live("click",function(){
            var gridId=$(this.form).attr("gridId");
            if(gridId){
                $("#" + gridId).datagrid("reload", $(this.form).serializeObject());
            }
        });

        //combobox双击清空效果
        $('.textbox-text').live('dblclick',function(){
            var init=$(this).val();
            $(this).val('');
            $(this).find('+input').val('');
            if(init){
                //如果本来有值，现在清空，则重新执行搜索
                var gridId=$(this.form).attr("gridId");
                if(gridId){
                    $("#" + gridId).datagrid("reload", $(this.form).serializeObject());
                }
                $(this).keydown();
            }
        });
    });

var monitoringElement;//当前正在监控的元素
var monitoringInterval;//执行中的Interval操作

//停止自动搜索的监控
function stopMonitoring(){
    if(monitoringElement){
        log('将停止原来监听的元素，换为新的要监听的元素');
        clearInterval(monitoringInterval);
        monitoringElement.attr('monitoring','');
    }
}

function log(log){
    var isEnableLog=false;
    if(isEnableLog)
        console.log(log);
}
//ajax默认设置
$.ajaxSetup({
    statusCode: {
        404: function () {
            showMsg('要访问的页面没找到');
        },
        403: function () {
            showMsg('没有权限访问该页面');
        }
    }
});
//再考虑一下，是否允许按回车键
/*$(this).keydown(function (e) {
    var key = window.event ? e.keyCode : e.which;
    // alert(key.toString());
    if (key.toString() == "13") {
        return false;
    }
});*/


/**
 * 提交表单
 * @param form
 * @param action
 *        如果以#开头的，则认为是id，将刷新该id指向的datatable
 *        不以#开头的字符串，则认为是url，将打开该地址
 *        还可以是一个函数function，请求完成后将执行回调
 */
function submitForm(form, action) {

    $(form).validate({
        submitHandler: function (validatedForm) {
            $(validatedForm).ajaxSubmit({
                type: 'post',
                dataType: 'json',
                success: function (data, statusText) {
                    if (data.mtype && data.mtype == "success") {
                        handleAction(action);
                    } else {
                        showMsg(data.msg);
                    }
                },
                error: function (data) {
                    showMsg(data.msg);
                }
            });
        }
    });
}

/**
 * 向服务器提交数据
 * @param url  目标地址
 * @param param 要提交的数据
 * @param action
 *        如果以#开头的，则认为是id，将刷新该id指向的datatable
 *        不以#开头的字符串，则认为是url，将打开该地址
 *        还可以是一个函数function，请求完成后将执行回调
 *
 */
function request(opts) {
    opts = $.extend({isConfirm: true}, opts);
    var data = "";
    if (opts.param) {
        for (var key in opts.param) {
            var value = opts.param[key];
            if ($.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    if ($.isPlainObject(value[i])) {
                        for (var subKey in value[i]) {
                            data += key + "[" + i + "]." + subKey + "=" + value[i][subKey] + "&";
                        }
                    } else {
                        //data += key + "[" + i + "]" + "=" + value[i] + "&";
                        //基本类型不必添加[i]这样的数组参数
                        data += key + "=" + value[i] + "&";
                    }
                }
            } else {
                data += key + "=" + value + "&";
            }
        }
    }

    if (opts.isConfirm) {
        $.messager.confirm('提示', '确定执行该操作吗?', function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    url: opts.url,
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                        if (data.mtype && data.mtype == "success") {
                            hint(data.msg);
                            handleAction(opts.action);
                        } else {
                            showMsg(data.msg);
                        }
                    },
                    error: function (data) {
                        showMsg(data.msg);
                    }
                });
            }
        });
    } else {
        $.ajax({
            type: "POST",
            url: opts.url,
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.mtype && data.mtype == "success") {
                    hint(data.msg);
                    handleAction(action);
                } else {
                    showMsg(data.msg);
                }
            },
            error: function (data) {
                showMsg(data.msg);
            }
        });
    }
}

//显示提示消息
function showMsg(msg, callback) {
    $.messager.alert('提示', msg, 'info', callback);
}

//显示提示消息
function hint(msg, callback) {
    $.messager.show({
        title: '提示',
        msg: msg,
        showType: 'fade',
        showSpeed: 200,
        timeout: 1500,
        style: {
            right: '',
            bottom: ''
        }
    });
}

/**
 * 增加信息窗口
 */
function add(source, title, href, height, width, cb) {
    var action = source;
    if (cb) {
        action = function (data) {
            try {
                $(source).datagrid("reload");
                $(source).treegrid("reload");
            } catch (e) {//ignore

            }
            cb(data);
        };
    }
    showFormDlg(title, href, height, width, action);
}

/**
 * 打开一个与用户交互的对话框,对话框内包含确定按钮,点击确定后,将提交页面内容中的表单
 */
function showFormDlg(title, href, height, width, action) {

    var dlg = $('<div style="overflow:auto;"/>');
    dlg.dialog({
        width: width = width == undefined ? 800 : width,
        height: height = height == undefined ? 550 : height,
        href: href,
        modal: true,
        title: title,
        resizable: true,
        maximizable: true,
        buttons: [
            {
                text: '确定',
                iconCls: 'icon-ok',
                handler: function () {
                    var btn = $(this);
                    $("form:first", dlg)
                        .ajaxSubmit({
                            dataType: 'json',
                            beforeSubmit: function () {
                                /*var options = btn.linkbutton("options");
                                 result = $("form:first",dlg).valid();
                                 if (!result) {
                                 return false;
                                 }
                                 if (!options.disabled) {
                                 btn.linkbutton({disabled : true});
                                 } else {
                                 return false;
                                 }*/
                            },
                            success: function (data, statusText) {
                                if (data.mtype == "success") {
                                    hint('操作成功！');
                                    if (!handleAction(action)) {
                                        //handleAction返回false时,将关闭对话窗体
                                        $(dlg).dialog('destroy');
                                    }
                                } else
                                    $.messager.alert('提示信息', data.msg, 'error');
                                btn.linkbutton({disabled: false});
                            },
                            error: function (data) {
                                $.messager.alert('提示信息', data, 'error');
                                btn.linkbutton({disabled: false});
                            }
                        });
                }
            }, {
                iconCls: 'icon-cancel',
                text: '取消',
                handler: function () {
                    dlg.dialog('destroy');
                }
            }],
        onBeforeClose: function () {
            $("form:first input:first", dlg).trigger("focus");
        },
        onClose: function () {
            dlg.dialog("destroy");
        },
        onOpen: function () {
            dlg.find(":input").keypress(function (event) {
                if (event.keyCode == 13) {
                    return false;
                }
            });
        }
    });
}

/**
 * 打开一个与用户交互的对话框
 * title:对话框标题
 * href:对话框地址
 * height:对话框高度
 * width:对话框宽度
 * cb:点击确定后的回调函数
 */
function showDlg(title, href, height, width, cb,opts) {

    if(opts&&opts.dlgId){
        var dlg = $("#dlg-show-"+opts.dlgId);
        if (!dlg.length) {
            var dlg = $('<div id="dlg-show-'+opts.dlgId+'" style="overflow:auto;"/>').appendTo('body');
            dlg.dialog({
                width: width = width == undefined ? 800 : width,
                height: height = height == undefined ? 550 : height,
                href: href+"&dlgId="+opts.dlgId,
                modal: true,
                title: title,
                resizable: true,
                maximizable: true,
                buttons: [
                    {
                        text: '确定',
                        iconCls: 'icon-ok',
                        handler: function () {
                            if (cb) {
                                //回调函数返回true则不关闭对话框，什么都不返回或者返回false则关闭对话框
                                if (!cb(dlg)) {
                                    dlg.dialog('close');
                                }
                            } else {
                                dlg.dialog('close');
                            }
                        }
                    }, {
                        text: '完成',
                        handler: function () {
                            dlg.dialog('close');
                        }
                    }],
                onClose: function () {
                },
                onOpen: function () {
                    dlg.find(":input").keypress(function (event) {
                        if (event.keyCode == 13) {
                            return false;
                        }
                    });
                }
            });
        }else{
            dlg.dialog("open");
        }
    }else{
        //对话框ID不存在时，不进行缓存
        var dlg = $('<div style="overflow:auto;"/>');
        dlg.dialog({
            width: width = width == undefined ? 800 : width,
            height: height = height == undefined ? 550 : height,
            href: href,
            modal: true,
            title: title,
            resizable: true,
            maximizable: true,
            buttons: [
                {
                    text: '确定',
                    iconCls: 'icon-ok',
                    handler: function () {
                        if (cb) {
                            //回调函数返回true则不关闭对话框，什么都不返回或者返回false则关闭对话框
                            if (!cb(dlg)) {
                                dlg.dialog('destroy');
                            }
                        } else {
                            dlg.dialog('destroy');
                        }
                    }
                }, {
                    text: '完成',
                    handler: function () {
                        dlg.dialog('destroy');
                    }
                }],
            onClose: function () {
                dlg.dialog('destroy');
            },
            onOpen: function () {
                dlg.find(":input").keypress(function (event) {
                    if (event.keyCode == 13) {
                        return false;
                    }
                });
            }
        });
    }
}

//处理操作后行为
function handleAction(action) {
    if (action) {
        if (typeof(action) == 'string') {
            if (action.startWith("#"))
                try {
                    $(action).datagrid("reload");
                    $(action).treegrid("reload");
                } catch (e) {

                }
        } else if (typeof(action) == 'function') {
            return action();
        }
    }
    return false;
}

/**
 * 删除记录
 */
function del(source, href, cb) {
    var action = function () {
        try {
            $(source).datagrid("reload");
            $(source).datagrid("clearChecked");
            $(source).treegrid("reload");
            $(source).treegrid("clearChecked");
        } catch (e) {
        }
        if(cb)
            cb();
    };

    var rows = $(source).datagrid("getChecked");
    if (rows.length == 0) {
        $.messager.show({
            timeout: 4000,
            title: '提示',
            msg: '未选中任何项目，请选择需要操作的项目',
            showType: 'show'
        });
    } else {
        $.messager.confirm('提示', '	确定要执行该操作么?', function (r) {
            if (r) {

                var opts = $(source).datagrid("options");
                var idField = "id";
                if (opts.idField) {
                    idField = opts.idField;
                }
                var param ="";

                if(href.indexOf('items')==-1)
                    param = $(rows).map(function () {
                        return "items=" + this[idField];
                    }).get().join("&");

                $.ajax({
                    url: href,
                    dataType: 'json',
                    data: param,
                    async: false,
                    success: function (data, statusText) {
                        hint(data.msg);
                        handleAction(action);
                    },
                    error: function (data) {
                        $.messager.alert('提示信息', data, 'error');
                    }
                });
            }
        });

    }
}

function report(source, href) {
    var rows = $(source).Grid("getSelectedNum");
    if (rows == 0) {
        $.Messager.show({
            title: '提示',
            msg: '未选中任何项目，请选择需要操作的项目',
            showType: 'show'
        });
        return false;
    }
    if (rows > 1) {
        $.Messager.show({
            title: '提示',
            msg: '只能操作一个项目',
            showType: 'show'
        });
        return false;
    }
    $.Messager.confirm('提示', '	确定要执行该操作么?', function (r) {
        if (r) {
            window.open(href, "_blank");
        }
    });
}

/**
 * 导出某个grid的excel
 * @param href
 * @param id grid的id
 */
function toExcel(href, id) {

   /* var values = "";
    if (href.indexOf("?") < 0) {
        href += "?"
    }
    if (id != undefined) {
        var grid = $(id).Grid("getGrid");
        var toolbars = $(grid).find(".datagrid-toolbar");
        var length = toolbars.length;
        for (i = 0; i < length; i++) {
            var toolbar_inputs = $(toolbars[i]).find("input:not([type=submit]),select");
            var ti_length = toolbar_inputs.length;
            for (j = 0; j < ti_length; j++) {
                var input = toolbar_inputs[j];
                var name = $(input).attr("name");
                var val = $(input).attr("value");
                values += name + "=" + val + "&";
            }
        }

        var searchbars = $(grid).find(".datagrid-search");
        var search_length = searchbars.length;
        for (i = 0; i < search_length; i++) {
            var toolbar_inputs = $(searchbars[i]).find("input:not([type=submit]),select");
            var ti_length = toolbar_inputs.length;
            for (j = 0; j < ti_length; j++) {
                var input = toolbar_inputs[j];
                var name = $(input).attr("name");
                var val = $(input).attr("value");
                values += name + "=" + val + "&";
            }
        }
    }

    href += values;*/
    //log(href);
    $.messager.confirm('提示', '	确定要执行该操作么?', function (r) {
        if (r) {
            window.open(href, "_blank");
        }
    });
}

function toPublic(href) {
    $.Messager.confirm('提示', '	确定要执行该操作么?', function (r) {
        if (r) {
            window.open(href, "_blank");
        }
    });
}
/**
 * 编辑记录窗口。注意：将自动在href加上id参数
 */
function edit(source, title, href, height, width, callfunction) {
    var rows = $(source).datagrid("getSelections");
    if (rows.length == 0) {
        hint('未选中任何项目，请选择需要操作的项目!');
    }
    else if (rows.length > 1) {
        hint('只允许操作一条记录！');
    }
    else {
        if(href.indexOf('?')!=-1) {
            if(href.indexOf('?id')==-1&&href.indexOf('&id')==-1){
                //参数中没有id参数时，则自动附加上id参数
                href=href+"&id="+rows[0].id;
            }
        }
        else {
            href = href + "?id="+rows[0].id;;
        }

        add(source, title, href, height, width, callfunction);
    }
}

function select(source, gridtarget, title, href, height, width) {
    var dlg = $("#dlg-select");
    if (!dlg.length) {
        dlg = $('<div id="dlg-select"></div>').appendTo('body');
        dlg.Dialog({
            width: width = width == undefined ? 600 : width,
            height: height = height == undefined ? 400 : height,
            href: href,
            modal: true,
            title: title,
            buttons: [{
                text: '确定',
                iconCls: 'icon-ok',
                handler: function () {
                    var rows = $(gridtarget).Grid("getSelected");
                    $(source).Grid("insertSelected", rows);
                    $(source).Grid("summary");
                    dlg.Dialog('destroy');
                }
            }, {
                text: '取消',
                handler: function () {
                    dlg.Dialog('destroy');
                }
            }]
        });
    } else {
        dlg.Dialog("open");
    }
}


/**
 * 查看
 *
 * @param source
 * @param title
 * @param href
 * @param height
 * @param width
 * @param isnew
 * @param btn
 */
function show(source, title, href, height, width, btn) {
    var dlg = $('<div/>');
    dlg.dialog({
        id: source + "-showDialog",
        width: width = width == undefined ? 800 : width,
        height: height = height == undefined ? 550 : height,
        href: href,
        modal: true,
        title: title,
        resizable: true,
        buttons: btn = btn == undefined ? [{
            text: '返回',
            handler: function () {
                dlg.Dialog('destroy');
            }
        }] : btn,
        onClose: function () {
            dlg.dialog("destroy");
        },
        onOpen: function () {
            dlg.keypress(function (event) {
                if (event.keyCode == 13) {
                    return false;
                }
            });
        }
    });
}

/**
 * 查看
 *
 * @param source
 * @param title
 * @param href
 * @param height
 * @param width
 * @param isnew
 * @param btn
 */
function showDialog(source, title, href, height, width) {

    var dlg = $("#dlg-show");
    if (!dlg.length) {
        dlg = $('<div id="dlg-show"></div>').appendTo('body');
        dlg.Dialog({
            width: width = width == undefined ? 800 : width,
            height: height = height == undefined ? 550 : height,
            href: href,
            modal: true,
            title: title,
            resizable: true,
            buttons: [{
                text: '返回',
                handler: function () {
                    dlg.Dialog('destroy');
                }
            }],
            onClose: function () {
                dlg.Dialog("destroy");
            },
            onOpen: function () {
                dlg.keypress(function (event) {
                    if (event.keyCode == 13) {
                        return false;
                    }
                });
            }
        });
    } else {
        dlg.Dialog("open");
        dlg.Dialog("refresh", href);
    }
}

/**
 * 打印查询结果
 * @param id
 */
function print(id) {
    var grid = $(id).Grid("getGrid");
    var options = grid.options;
    var frozenColumns = $(id).Grid("options").frozenColumns;  // 得到frozenColumns对象
    var columns = $(id).Grid("options").columns;    // 得到columns对象

    var head = grid.find(".datagrid-view2 .datagrid-header table:eq(0)");
    var head_html = $(head).html();

    var body = grid.find(".datagrid-view2 .datagrid-body table:eq(0)");
    var body_html = $(body).html();

    var foot = grid.find(".datagrid-view2 .datagrid-footer table:eq(0)");
    var foot_html = $(foot).html();

    var title = grid.find(".datagrid-title");
    var fc_length = $(body).find("tr:eq(0) td").length;
    var _title = $(title).html();
    var title_html = "<thead class='title'><tr><th colspan='" + fc_length + "'>" + _title + "</td></th></thead>";

    var pt = $("#pt-show");
    if (!pt.length) {
        pt = $('<div id="pt-view" style="display:none;"></div>').appendTo('body');
    }
    $("<table border=1 cellpadding=0 cellspacing=0 style='border-collapse: collapse ' bordercolor= '#111111'>" + title_html + "" + head_html + "" + body_html + "" + foot_html + "</table>").appendTo(pt);


    var print = "<input type='button' value='打印' onclick='window.print()' class='noprint'/>";

    var pt_html = $(pt).html();
    alert(pt_html);
    return pt_html;
    /*
     var win=window.open('','','width=800,height=600,scrollbars=yes');
     win.document.open("text/html","replace");
     win.document.writeln('<link type="text/css" href="css/print.css" rel="stylesheet" />');
     win.document.write("<object ID='WebBrowser' WIDTH=0 HEIGHT=0 CLASSID='CLSID:8856F961-340A-11D0-A96B-00C04FD705A2'></object> ");

     win.document.write(print);
     win.document.write(pt_html);
     win.document.close();
     */
//	document.open("",pt_html);
}

/**
 * 打印预览窗口，支持带参数 Lodop
 * @param
 * @param id grid的id,必须
 * @param title 必须
 * @param href 必须
 */
function printView(id, title, href) {

    var values = "";
    if (href.indexOf("?") < 0) {
        href += "?"
    }
    if (id != undefined) {
        var grid = $(id).Grid("getGrid");
        var toolbars = $(grid).find(".datagrid-toolbar");
        var length = toolbars.length;
        for (i = 0; i < length; i++) {
            var toolbar_inputs = $(toolbars[i]).find("input:not([type=submit]),select");
            var ti_length = toolbar_inputs.length;
            for (j = 0; j < ti_length; j++) {
                var input = toolbar_inputs[j];
                var name = $(input).attr("name");
                var val = $(input).attr("value");
                values += name + "=" + val + "&";
            }
        }

        var searchbars = $(grid).find(".datagrid-search");
        var search_length = searchbars.length;
        for (i = 0; i < search_length; i++) {
            var toolbar_inputs = $(searchbars[i]).find("input:not([type=submit]),select");
            var ti_length = toolbar_inputs.length;
            for (j = 0; j < ti_length; j++) {
                var input = toolbar_inputs[j];
                var name = $(input).attr("name");
                var val = $(input).attr("value");
                values += name + "=" + val + "&";
            }
        }
    }

    href += values;

    showDialog(id, title, href);
}

/**
 * 选择单个条目，返回参数对象和选中行集合
 * @param id datagrid的Id
 * @param cb
 * @param noSelectCb
 */
/**
 * 选择单个条目，返回参数对象和选中行集合
 * @param id datagrid的Id
 * @param cb 选中一条记录时的回调
 * @param noSelectCb 未选中记录时的回调
 */
function selectOne(id, cb,noSelectCb) {
    var rows = $(id).datagrid("getSelections");
    if (rows.length == 0) {
        if(noSelectCb)
            noSelectCb();
        else
            hint('未选中任何项目，请选择需要操作的记录！');
    }
    else if (rows.length > 1) {
        hint('只允许操作一条记录！');
    }
    else {
        if(cb)
           cb(rows[0]);
    }
}

//选择多个条目，返回参数对象和选中行集合
function selectMulti(id, cb) {
    var rows = $(id).datagrid("getChecked");
    if (rows.length == 0) {
        hint('未选中任何项目，请选择需要操作的项目');
    } else {
        var ids = $(rows).map(function () {
            return this.id;
        }).get();
        cb(ids, rows);
    }
}

//列格式化函数，保留两位小数
function decimalFormatter(value){
    if(value)
        return value.toFixed(2);
    else
        return '';
}