//适用于mini框架的base
$(document).ready(
    function () {

    });
//初始化全局设定
function initGlobal(){
    //设置datagrid的全局参数
    $(".mini-datagrid").each(function(){
        //分页时，切换每页数据列表
        if(!$(this).attr("sizeList")){
            $(this).attr("sizeList","[10,20,50,100]");
        }
        //每页显示记录数
        if(!$(this).attr("pageSize")){
            $(this).attr("pageSize","50");
        }
        //显示表头菜单
        /*if(!$(this).attr("showColumnsMenu")){
         $(this).attr("showColumnsMenu","true");
         }*/
        //隔行变色
        if(!$(this).attr("allowAlternating")){
            $(this).attr("allowAlternating","true");
        }
        //返回json数据中，数据列表的字段
        if(!$(this).attr("dataField")){
            $(this).attr("dataField","rows");
        }
        //数据表的id字段
        if(!$(this).attr("idField")){
            $(this).attr("idField","id");
        }
        //允许多选
        if(!$(this).attr("multiSelect")){
            $(this).attr("multiSelect","true");
        }
        //设置编辑模式为单元格编辑
        if(!$(this).attr("allowCellEdit")){
            $(this).attr("allowCellEdit","true");
        }
        //设置编辑模式为单元格编辑
        if(!$(this).attr("cellEditAction")){
            $(this).attr("cellEditAction","celldblclick");
        }
        //允许单元格选中，进行单元格编辑时，必须设置此选择项
        if(!$(this).attr("allowCellSelect")){
            $(this).attr("allowCellSelect","true");
        }
        //行选中时，完成其他行的编辑
        if(!$(this).attr("onbeforeselect")){
            $(this).attr("onbeforeselect","onbeforeselectGlobal");
        }
        //关闭默认的列排序
        if(!$(this).attr('allowSortColumn')){
            $(this).attr("allowSortColumn","false");
        }
        //自定义表头点击事件，进行列排序
        if(!$(this).attr('onheadercellclick')){
            $(this).attr("onheadercellclick","onheadercellclickGlobal");
        }
        //列变化事件，为解决列宽变化时，却引发排序事件的问题
        if(!$(this).attr('oncolumnschanged')){
            $(this).attr("oncolumnschanged","oncolumnschangedGlobal");
        }
        //修正全局汇总表格的样式和数据格式
        if(!$(this).attr('ondrawsummarycell')){
            $(this).attr("ondrawsummarycell","ondrawsummarycellGlobal");
        }
        //数据加载前，把搜索参数保存到grid变量中，以在表格排序中再次使用
        if(!$(this).attr('onbeforeload')){
            $(this).attr("onbeforeload","onbeforeloadGlobal");
        }

    });

    //自动搜索监测，暂时先屏蔽
    //$('.searchForm .mini-textbox-input').live('focus',textboxAutoSearch);
    //$('.searchForm input').live('focus',textboxAutoSearch);//获得焦点后，就不断轮询式的执行搜索，这种方法在处理日期控件时有问题

    //失去焦点时，把新值与旧值比对，不同时执行搜索
    $('.searchForm input').live('keyup',inputSearch);

    $('.searchForm').each(function(){
        if(!$(this).attr('onsubmit')){
            $(this).attr('onsubmit',"return false;");
        }
    });
}

//数据加载前，把搜索参数保存到grid变量中，以在表格排序中再次使用
function onbeforeloadGlobal(e){
    var grid= e.sender;
    var data= e.data;
    //删除原来的参数中，所有形如order_aaa_1的数据
    var pat=new RegExp("order\\_(.+)\\_(\\d+)");
    for(var key in data) {
        if(pat.test(key))
            delete data[key];
    }
    data= $.extend(data,grid.sortParam);
}
//绘制合计行，summaryType=server时，从服务器返回的数据中，读取合计行数据
function ondrawsummarycellGlobal(e) {
    e.cellStyle = "text-align:right";
    if (e.column.summaryType) {
        if(e.column.summaryType=='server'){

            var fieldName= e.column.field;
            if(fieldName) {
                var value= eval('try{e.result.sum.' + fieldName+';}catch(e){"";}');
                if('n'==e.column.numberFormat&&value&&!isNaN(value)) {
                    temp=parseFloat(value);
                    if(!isNaN(temp))
                        value = temp.toFixed(2);
                }
                e.cellHtml=value;
            }
            return;
        }

        if (e.column.summaryType != 'count' && e.column.summaryType != 'min'
            && e.column.summaryType != 'max' && e.column.summaryType != 'sum'
            && e.column.summaryType != 'avg') {
            e.cellHtml=e.column.summaryType;
        }
    }
}

//列宽调整时，为了解决列宽调整时，会触发表头点击事件的问题
function oncolumnschangedGlobal(e){
    var grid=e.sender;
    grid.columnschangedGlobal=true;
    setTimeout(function(){
        grid.columnschangedGlobal=false;
    },100);
}

//响应点击表头事件，对表格进行排序
function onheadercellclickGlobal(e){
    if(e.column.type=='checkcolumn'||e.column.type=='indexcolumn')
        return;
    var grid= e.sender;
    if(grid.columnschangedGlobal){
        //说明当前正在调整列宽
        return;
    }
    var column= e.column;
    if(!column.sortable){
        if(!grid.sortable)
            return;
    }

    if(!grid.sortInfo)
        grid.sortInfo=[];
    //排序信息
    var sortInfo=grid.sortInfo;
    var columnField=column.field;
    var columnSortInfo;
    var columnIndex=-1;
    $.each(sortInfo,function(i,val){
        if(val.column.field==columnField) {
            columnSortInfo = val;
            columnIndex=i;
        }
    });

    if(columnSortInfo&&columnSortInfo.order!='REMOVE'){
        if(columnSortInfo.order=='ASC')
            columnSortInfo.order='DESC';//原来为升序，则改为降序
        else if(columnSortInfo.order=='DESC') {
            sortInfo.splice(columnIndex,1);//将该列的排序信息删除
            column.headerCls='';//移除排序列样式
            if(column.isHaveSortIndex) {
                column.header = column.header.substr(0, column.header.lastIndexOf('_'));//移除排序序号
                column.isHaveSortIndex=false;
            }
        }
    }else{
        columnSortInfo={};
        //默认为升序
        columnSortInfo.order='ASC';
        columnSortInfo.column=column;
        sortInfo.push(columnSortInfo);
    }

    var param={};
    var i=1;
    $.each(sortInfo,function(index,val){
        var paramName="order";
        paramName+="_"+val.column.field+"_"+i;
        param[paramName]=val.order;
        var col=val.column;
        if(val.order=='ASC') {
            col.headerCls = 'datagrid-sort-asc-header';
        }
        else if(val.order=='DESC') {
            col.headerCls = 'datagrid-sort-desc-header';
        }
        if(col.isHaveSortIndex)
            col.header=col.header.substr(0,col.header.lastIndexOf('_'));//移除原来的排序序号
        col.header=col.header+"_"+i++;
        col.isHaveSortIndex=true;
    });

    //设置排序参数，在beforeload事件中，会把排序参数合并至最终要上传到服务器的请求参数中
    grid.sortParam=param;
    //重新加载表格
    grid.reload();
}

//文本框自动搜索
var monitoringElement;//当前正在监控的元素
var monitoringInterval;//被延迟的搜索任务
function textboxAutoSearch(){
    //如果正在监测，则直接返回
    if($(this).attr('monitoring')=='true') {
        log('当前元素正在监听，直接返回');
        return;
    }
    else{
        if(monitoringElement){
            log('将停止原来监听的元素，换为新的要监听的元素');
            clearInterval(monitoringInterval);
            monitoringElement.attr('monitoring','');
        }
        monitoringElement=$(this);
        monitoringElement.attr('monitoring','true');
    }

    var form=$(this).parents('.searchForm')[0];
    var gridId=$(form).attr('gridId');
    var formId=$(form).attr('id');
    var init = monitoringElement.val();//初值
    var k = monitoringElement.val();//旧值

    /*设置不间断监测*/
    monitoringInterval = setInterval(function () {
        var k2=monitoringElement.val();
        log('k2='+k2);
        log('k='+k)
        /*如果输入框内容有变化且大于时间间隔，则发送一次请求*/
        if ( k2 == k&&k2!=init){
            init=k2;
            //搜索前对表单进行验证
            var miniForm=new mini.Form('#'+formId);
            miniForm.validate();
            if(miniForm.isValid()) {
                var formData = $(form).serializeObject();//获取表单多个控件的数据
                var grid = mini.get(gridId);
                grid.load(formData);
            }
        }else{
            k=k2;
        }
    }, 500);
}

function inputSearch(event){
    if (event.keyCode == "13") {
        var form=$(this).parents('.searchForm')[0];
        var gridId=$(form).attr('gridId');
        if($(form).attr('onEnter')){
            var func=$(form).attr('onEnter');
            eval(func+'();');
        }else {
            var formId = $(form).attr('id');
            var formData = $(form).serializeObject();//获取表单多个控件的数据
            var grid = mini.get(gridId);
            grid.load(formData);
        }
    }
}


/**
 * 添加一行数据
 * @param gridId 添加数据的数据表ID
 * @param row  添加的默认数据
 * @param index  在哪一条之后添加行，默认为添加到第0行
 */
function add(gridId,row,index){
    row = row?row:{};
    index = index?index:0;
    var grid=mini.get(gridId);
    if(grid) {
        if(validateAndHint(grid)){

            //数据验证通过，允许添加行
            grid.addRow(row, index);
            grid.deselectAll();
            grid.select(row);

            //使第一个可编辑单元格获得焦点
            var columns=grid.getColumns();
            for(var i in columns){
                var column=columns[i];
                if(column.type=='checkcolumn'||column.type=='indexcolumn'){
                    continue;
                }
                var cellEditor=grid.getCellEditor(column,row);
                if(cellEditor){
                    grid.setCurrentCell([row,column]);
                    grid.beginEditCell();
                    setTimeout(function(){
                        $(cellEditor.el).find('input').focus();
                    },300);
                    return;
                }
            }
        }
    }
}
//删除数据表中的数据
function del(gridId){
    var grid=mini.get(gridId);
    if(grid){
        var rows=grid.getSelecteds();
        if(rows.length>0) {
            if(rows.length==1) {
                grid.selectNext(rows[0]);
                if (grid.getSelected()._id == rows[0]._id) {
                    //选中不成功，说明是最后一行，则尝试选择前一行
                    grid.selectPrev(rows[0]);
                }
                grid.removeRows(rows);
            }else{
                grid.removeRows(rows);
                //多行删除时，自动选中第一行
                var firstRow=grid.getRow(0);
                if(firstRow)
                    grid.select(grid.getRow(0));
            }
        }
    }
}
//保存数据表中修改过的数据
//opts.cb:保存操作完成后，将要执行的回调
//opts.recursion:将参数无限递归
//opts.isReload:加载完成后，是否重新reload表格
function gridSave(gridId,url,opts){
    opts=$.extend({
        recursion:false,
        isReload:true
    },opts);

    var grid = mini.get(gridId);
    if(grid&&validateAndHint(grid)){
        //验证成功时，才继续提交操作
        var changes=grid.getChanges();
        if(changes.length==0){
            hint('没有要保存的修改！');
            return;
        }

        for(var i in changes){
            if(changes[i]._state=='added')
                changes[i].editState=0;
            if(changes[i]._state=='modified')
                changes[i].editState=1;
            if(changes[i]._state=='removed')
                changes[i].editState=2;
        }

        request({
            url:url,
            isConfirm:false,
            recursion:opts.recursion,
            param:{entityList:changes},
            action:function(ajaxResult){
                if(opts.isReload)
                    grid.reload();
                if(opts&&opts.cb)
                    opts.cb(ajaxResult);
            }
        });
    }
}
//对数据表格进行搜索操作，对应的form为gridId_searchForm
function gridSearch(gridId,searchFormId,success){
    var grid=mini.get(gridId);
    if(grid){

        noConfirmGridSearch=function (){
            var searchForm;
            if(searchFormId)
                searchForm = new mini.Form("#"+searchFormId);
            else {
                try {
                    searchForm = new mini.Form("#" + gridId + "_searchForm");
                }catch(e){
                    //忽略找不到form的情况
                }
            }
            if(searchForm){
                var data = searchForm.getData(true,false);
                //格式化日期型的数据
                for(var key in data){
                    var value=data[key];
                    if(value instanceof Date){
                        //如果name中包含_LED_，则将该日期的时间设置为当天的最后时刻
                        if(key.indexOf('_LED_')!=-1)
                            data[key]=value.format('yyyy-MM-dd 23:59:59');
                        else
                            data[key]=value.format('yyyy-MM-dd HH:mm:ss');
                    }
                }
                grid.load(data,success);
            }else{
                grid.load({},success);
            }
        } ;

        if(grid.getChanges().length>0){
            mini.showMessageBox({
                title: '确认操作',
                message: '表格数据有修改，确定放弃修改，执行查询吗？',
                buttons: ["ok", "no"],
                iconCls: "mini-messagebox-question",
                callback: function(action){
                    if(action == 'ok'){
                        noConfirmGridSearch();
                    }else{
                        hint('放弃查询操作！');
                    }
                }
            });
        }else{
            noConfirmGridSearch();
        }
    }
}

function isGridChanged(gridId){
    var grid=mini.get(gridId);
    if(grid){
        if(grid.getChanges().length>0){
            var title=grid.getTitle();
            if(!title)
                title="父级数据";
            hint(title+"存在未保存的修改！请检查。");
            return true;
        }
    }
    return false;
}

//将gridId_searchForm清空，并刷新数据表格
//data-options="{keep:true}",当具有此项设置时，不进行清空
function gridSearchClear(gridId,searchFormId){
    var grid=mini.get(gridId);
    if(grid){
        var searchForm;
        if(searchFormId)
            searchForm = new mini.Form("#"+searchFormId);
        else
            searchForm = new mini.Form("#"+gridId+"_searchForm");
        if(searchForm){
            var fields=searchForm.getFields();
            for(var i=0;i<fields.length;i++){
                var field=fields[i];
                if(!field.keep){
                    field.setValue("");
                    if(field.setText)
                        field.setText("");
                }
            }
        }
        //如果正在监听控件值改变，则停止监听，由清空搜索的行为来执行查询，避免刷新两遍
        /*if(monitoringInterval&&monitoringElement) {
         clearInterval(monitoringInterval);
         monitoringElement.attr('monitoring', '');
         }*/
        gridSearch(gridId,searchFormId);
    }
}
//提交表格数据，并对表格数据进行验证，如果验证不通过，自动定位到第一个验证失败的单元格上
function validateAndHint(grid){
    grid.commitEdit();
    grid.validate();
    if(!grid.isValid()){
        var cellError=grid.getCellErrors()[0];
        log(cellError);
        hint(cellError.column.header+cellError.errorText);

        grid.setCurrentCell([cellError.record,cellError.column]);
        grid.deselectAll();
        grid.select(cellError.record);
        grid.beginEditCell();

        log('获得焦点执行完毕');
        return false;
    }else
        return true;
}

//全局响应选择事件函数
function onbeforeselectGlobal(e){
    log('这是选中之前事件');
    var grid= e.sender;
    if(!grid.isEditingRow(e.record)) {
        //如果选中不是当前正在编辑的行
        if(grid.isEditing()){
            //说明有其他的行正在编辑，提交其他的行编辑，并进行验证
            if(!validateAndHint(grid)){
                e.cancel=true;//验证不成功，取消当前行选中事件
            }
        }
    }
}

//打印mini-ui的datagrid
function gridPrint(opts){

    var grid=mini.get(opts.gridId);
    var div=$(opts.divId).clone();

    //生成表头
    var tbody=div.find("tbody");
    var dataColumns=[];
    genColumnHeader(grid.getColumns());
    function genColumnHeader(columns){
        for(var i=0;i<columns.length;i++){
            var column=columns[i];
            if(column.type=='checkcolumn')
                continue;
            var tr=tbody.find("tr:eq("+column._level+")");
            if(tr.length==0){
                tr=$("<tr></tr>");
                tr.appendTo(tbody);
            }else{
                tr=tr[0];
            }

            var td=$("<td></td>");
            if(column.rowspan)
                td.attr("rowspan",column.rowspan);
            if(column.colspan)
                td.attr("colspan",column.colspan);
            if(column.header)
                td.html(column.header.trim());
            td.appendTo(tr);
            if(column.columns) {
                genColumnHeader(column.columns);
            }else{
                //没有子的数据列是真正的要进行数据显示的列
                dataColumns.push(column);
            }
        }
    }

    //生成表格数据
    var rows=grid.getData();
    for(var i=0;i<rows.length;i++){
        var row=rows[i];
        var tableRow=$("<tr></tr>");
        for(var j=0;j<dataColumns.length;j++){
            var dataColumn=dataColumns[j];
            var value;
            var field;
            if(dataColumn.displayField)
                field=dataColumn.displayField;
            else
                field=dataColumn.field;
            if(field) {
                value = eval("try{var result=row['" + field.replace(/\./g, "']['") + "'];if(result) result;else '';}catch(e){'';}");
                if(dataColumn.numberFormat&&value)
                    value=value.toFixed(2);
            }
            var td=$("<td>"+value+"</td>");
            td.appendTo(tableRow);
        }
        tableRow.appendTo(tbody);
    }



    /*var rows=feePayedGrid.getData();
     for(var i=0;i<rows.length;i++){
     var feePayed=rows[i];
     var tableRow=$.formatString("<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td><td>{7}</td></tr>",
     +1,feePayed.payDte.format('yyyy-MM-dd'),feePayed.countDte.format('yyyy-MM-dd'),feePayed.shipper.shipperDoc,feePayed.dept.shipperDoc,feePayed.feeName.feeName,feePayed.totalMoney,feePayed.markTxt);
     $('#feeBillHeadGrid_print tr:last').after(tableRow);
     }*/

    LODOP = getLodop();
    LODOP.PRINT_INIT("打印运费实付记录");
    //添加打印表格内容
    LODOP.ADD_PRINT_TABLE("10%", "5%", "90%", "84%", div.html());

    LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");//设置页面横向打印
    LODOP.SET_PREVIEW_WINDOW(2, 0, 0, 0, 0, ""); //按适宽模式显示预览窗口
    LODOP.PREVIEW();
}

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
    if(isEnableLog) {
        log('变量信息为：');
        console.log(log);
        console.log('堆栈信息为：');
        console.trace();
    }
}
//ajax默认设置
$.ajaxSetup({
    //ajax数据进行全局过滤处理，判断ajax请求是否返回异常
    dataFilter:function(dataStr,type){
        try{
            var data= $.parseJSON(dataStr);
            if (data.mtype && data.mtype == "success") {
                //如果有消息则返回消息，如果有数据则返回数据
                if(type=='json') {
                    //json请求把原始字符串信息返回
                    return dataStr;
                }
                else {
                    //mini-ui只需要data.data里面的数据,这种情况下，type='text'
                    return data.data;
                    //要不要考虑type还有其他值的情况？？
                }
            } else {
                showMsg(data.msg);
                return dataStr;
            }
        }catch(e){
            //console.log(e);
            //抛出异常时，直接返回dataStr
            return dataStr;
        }
    },
    statusCode: {
        404: function () {
            showMsg('要访问的页面没找到');
        },
        403: function () {
            showMsg('没有权限访问该页面');
        }
    }
});

/**
 * 提交表单，为了向前兼容，同时支持列表式参数和对象参数
 * @param formId
 * @param action
 *        如果以#开头的，则认为是id，将刷新该id指向的datatable
 *        不以#开头的字符串，则认为是url，将打开该地址
 *        还可以是一个函数function，请求完成后将执行回调
 */
function submitForm(formId, action) {
    var opts={
        formId:'',//要提交的表单Id
        formType:'',//如果表单类型为mini，则按照mini-ui的api汇集提交参数
        errorShowLevel:'parent'//提交表单如果发生错误时， 错误信息的提示层级，parent：在父窗体提示，top:在最顶层窗体提示，self：在当前窗体提示
    };
    if(typeof(formId)=='object'){
        opts= $.extend(opts,formId);
    }else{
        opts.formId=formId;
        opts.action=action;
    }

    var miniForm = new mini.Form(opts.formId)
    miniForm.validate();
    opts.formId=addHash(opts.formId);
    if(miniForm.isValid()) {
        var loadingId=mini.loading("数据处理中，请稍候。。。", "提示");

        if(opts.formType=='mini'){
            var url = $(opts.formId).attr("action");
            $.ajax({
                url: url,
                type: "post",
                dataType: 'json',
                data: miniForm.getData(true, false),
                success: function (data) {
                    mini.hideMessageBox(loadingId);
                    if (typeof(opts.action) != 'function') {
                        if (data.mtype == 'success')
                            hint(data.msg ? data.msg : '');
                    }
                    if (data.mtype == 'success')
                        handleAction(opts.action, data);
                    else {
                        if (opts.errorShowLevel == 'parent' && window.parent)
                            window.parent.showMsg(data.msg);
                        else if (opts.errorShowLevel == 'top' && window.top)
                            window.top.showMsg(data.msg);
                        else
                            showMsg(data.msg);
                    }
                },
                error: function (data) {
                    mini.hideMessageBox(loadingId);
                    //showMsg(data.msg);
                }
            });
        }else{
            $(opts.formId).ajaxSubmit({
                type: 'post',
                dataType: 'json',
                dataFilter: null,
                success: function (data) {
                    mini.hideMessageBox(loadingId);
                    if (typeof(opts.action) != 'function') {
                        if (data.mtype == 'success')
                            hint(data.msg ? data.msg : '');
                    }
                    if (data.mtype == 'success')
                        handleAction(opts.action, data);
                    else {
                        if(opts.errorShowLevel=='parent'&&window.parent)
                            window.parent.showMsg(data.msg);
                        else if(opts.errorShowLevel=='top'&&window.top)
                            window.top.showMsg(data.msg);
                        else
                            showMsg(data.msg);
                    }
                },
                error: function (data) {
                    mini.hideMessageBox(loadingId);
                    //showMsg(data.msg);
                }
            });
        }

    }else{
        hint(miniForm.getErrorTexts()[0]);
        miniForm.getErrors()[0].focus();
    }
}

/**
 * 向服务器提交数据
 * @param url  目标地址
 * @param data 要提交的数据
 * @param action
 *        如果以#开头的，则认为是id，将刷新该id指向的datatable
 *        不以#开头的字符串，则认为是url，将打开该地址
 *        还可以是一个函数function，请求完成后将执行回调
 *
 */
function request(opts) {
    opts = $.extend({
        isConfirm: true,
        action:null,
        param:{},
        url:'',
        title:'提示',
        isHint:true,
        message:'确定执行该操作吗?',
        recursion:false//是否将所传参数无限递归，然后提交
    }, opts);
    var data;
    if(opts.recursion){
        data=parseParamRecursion(opts.param);
    }else{
        data=parseParam(opts.param);
    }


    if (opts.isConfirm) {
        mini.confirm(opts.message, opts.title, function (e) {
            if(e=="ok") {
                $.ajax({
                    type: "POST",
                    url: opts.url,
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                        if (data.mtype && data.mtype == "success") {
                            if(opts.isHint)
                                hint(data.msg);
                            handleAction(opts.action,data);
                        }
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
                if(data.mtype && data.mtype == "success") {
                    if(opts.isHint)
                        hint(data.msg);
                    handleAction(opts.action,data);
                }
            }
        });
    }
}

//显示提示消息
/*function showMsg(msg, callback) {
 var content='<div style="text-align:left;width:240px;max-height:120px;overflow: auto;;white-space: normal;word-wrap: break-word; word-break: normal;">'+msg+'</div>';
 mini.alert(content);
 *//*mini.showMessageBox({ title: '提示',
 //message: content,
 buttons: ["ok"],
 iconCls: "mini-messagebox-warning",
 html: content,
 callback: function(action){
 }});*//*
 }*/

//显示提示消息
function showMsg(msg, callback) {
    if(!msg)
        msg="";
    var id=Math.ceil(Math.random()*1000000);
    $('body').append("<div id='miniui_showMsg_window_"+id+"' class='mini-window' title='提示' style='' showMaxButton='true' showFooter='true'"
        +"showMaxButton='true' showCollapseButton='true' showShadow='true' allowResize='true' allowDrag='true' width='300px' style='z-index:10000'>"
        +"<div property='footer' style='text-align:center;padding:5px;padding-right:15px;'>"
        +"<input type='button' value='关闭' onclick='mini.get(\"miniui_showMsg_window_"+id+"\").destroy();' style='vertical-align:middle;'/>"
        +"</div>"
        +"<table class='mini-messagebox-table' style='width: 100%;' cellspacing='0' cellpadding='0'>"
        +"<tbody>"
        +"<tr>"
        +"<td><div class='mini-messagebox-warning' style=''></div></td>"
        +"<td class='mini-messagebox-content-text' style='width: 100%;'>"
        +'<div style="text-align:left;width:200px;white-space: normal;word-wrap: break-word; word-break: normal;">'
        +msg
        +'</div>'
        +"</td></tr></tbody></table>"
        +"</div>");
    mini.parse();
    var showMsgWindow=mini.get('miniui_showMsg_window_'+id);
    showMsgWindow.show('center','middle');
}

//显示提示消息
function hint(msg) {
    mini.showTips({
        content: msg,
        state: 'danger',
        x: 'center',
        y: 'center',
        timeout: 3000
    });
}

/**
 * 打开一个与用户交互的对话框,对话框内包含确定按钮,点击确定后,将提交页面内容中的表单
 */
function showFormDlg(title, href, height, width, action) {
    //open型的对话框将覆盖整个页面，使用起来有缺点，例如：如果某个操作报出了异常，必须关掉对话框才能操作
    mini.open({
        url: href,        //页面地址
        title: title,      //标题
        //iconCls: String,    //标题图标
        width: width,      //宽度
        height: height,     //高度
        allowResize: true,       //允许尺寸调节
        allowDrag: true,         //允许拖拽位置
        showCloseButton: true,   //显示关闭按钮
        showMaxButton: true,     //显示最大化按钮
        showModal: true,         //显示遮罩
        loadOnRefresh: false,       //true每次刷新都激发onload事件
        onload: function () {       //弹出页面加载完成

        },
        ondestroy: function (result) {
            if (result == "ok") {       //如果点击“确定”
                var iframe = this.getIFrameEl();
                var form=iframe.contentDocument.forms[0];
                var that=this;
                if(form){
                    var formId=$(form).attr('id');
                    if(!formId){
                        formId='formDlg_'+Math.round(Math.random()*1000000);
                        $(form).attr('id',formId);
                    }

                    var miniForm=new iframe.contentWindow.mini.Form('#'+formId)
                    miniForm.validate();
                    if(miniForm.isValid()) {
                        var loadingId = iframe.contentWindow.mini.loading("数据处理中，请稍候。。。", "提示");
                        $(form).ajaxSubmit({
                            type: 'post',
                            dataType: 'json',
                            dataFilter: null,
                            success: function (data) {
                                iframe.contentWindow.mini.hideMessageBox(loadingId);
                                if (typeof(action) != 'function') {
                                    if (data.mtype == 'success')
                                        hint(data.msg ? data.msg : '');
                                }
                                if (data.mtype == 'success') {
                                    handleAction(action, data);
                                    that.destroy();//提交成功时，destroy，失败时，不关闭
                                }
                                else{
                                    if(window.top){
                                        window.top.showMsg(data.msg);
                                    }else
                                        showMsg(data.msg);
                                }
                            },
                            error: function (data) {
                                iframe.contentWindow.mini.hideMessageBox(loadingId);
                            }
                        });
                    }else{
                        iframe.contentWindow.hint(miniForm.getErrorTexts()[0]);
                        miniForm.getErrors()[0].focus();
                    }
                }
                return false;
            }
        }
    });
}

/**
 * 打开一个与用户交互的对话框,对话框内包含确定按钮,点击确定后,将提交页面内容中的表单
 * open型的对话框将覆盖整个页面，使用起来有缺点，例如：如果某个操作报出了异常，必须关掉对话框才能操作
 * 使用opt的方式传参，利于灵活地传递参数
 */
function showFormDlgOpt(opt) {
    opt= $.extend({
        title:'提示',
        href:'',
        height:300,
        width:400,
        top:false,
        action:function(){

        }
    },opt);

    if(opt.top){
        opt.top=false;
        opt.oriWin=window;
        return window.top.showFormDlgOpt(opt);
    }else {
        var style = "width:" + opt.width + "px;";
        style += "height:" + opt.height + "px;";

        /* 为了在当前iframe显示对话框，使用构建window的方式来显示 */
        var id = 'miniui_showDlg_window_' + Math.ceil(Math.random() * 1000000);
        var html = "<div id='" + id + "' class='mini-window' title='" + opt.title + "' style='" + style + "' bodyStyle='padding:0px;' showMaxButton='true' showFooter='true'"
            + "showMaxButton='true' showCollapseButton='true' showShadow='true' allowResize='true' allowDrag='true' width='300px' url='" + opt.href + "'>"
            + "<div property='footer' style='text-align:center;padding-top:8px;padding-bottom:8px;' borderStyle='border:0;'>"
            + "<a class='mini-button' style='width:60px;' onclick='mini.get(\"" + id + "\").fire(\"confirmClick\")'>确定</a>"
            + "<span style='display:inline-block;width:25px;'></span>"
            + "<a class='mini-button' style='width:60px;' onclick='mini.get(\"" + id + "\").destroy();'>取消</a>"
            + "</div>"
            + "</div>";

        $('body').append(html);
        mini.parse();
        var formDlgWindow = mini.get(id);
        formDlgWindow.show('center', 'middle');
        formDlgWindow.on("confirmClick", function (result) {
            var iframe = formDlgWindow.getIFrameEl();
            var form = iframe.contentDocument.forms[0];
            var that = this;
            if (form) {
                var formId = $(form).attr('id');
                if (!formId) {
                    formId = 'formDlg_' + Math.round(Math.random() * 1000000);
                    $(form).attr('id', formId);
                }

                var miniForm = new iframe.contentWindow.mini.Form('#' + formId)
                miniForm.validate();
                if (miniForm.isValid()) {
                    var loadingId = iframe.contentWindow.mini.loading("数据处理中，请稍候。。。", "提示");
                    $(form).ajaxSubmit({
                        type: 'post',
                        dataType: 'json',
                        dataFilter: null,
                        success: function (data) {
                            iframe.contentWindow.mini.hideMessageBox(loadingId);
                            if (typeof(action) != 'function') {
                                if (data.mtype == 'success')
                                    hint(data.msg ? data.msg : '');
                            }
                            if (data.mtype == 'success') {
                                if( opt.oriWin)
                                    opt.oriWin.handleAction(opt.action, data);
                                else
                                    handleAction(opt.action, data);
                                that.destroy();//提交成功时，destroy，失败时，不关闭
                            }
                            else
                                showMsg(data.msg);
                        },
                        error: function (data) {
                            iframe.contentWindow.mini.hideMessageBox(loadingId);
                        }
                    });
                } else {
                    iframe.contentWindow.hint(miniForm.getErrorTexts()[0]);
                    miniForm.getErrors()[0].focus();
                }
            }
        });
        return formDlgWindow;
    }
}

/**
 * 打开一个与用户交互的对话框,此方法将覆盖整个窗口
 * title:对话框标题
 * href:对话框地址
 * height:对话框高度
 * width:对话框宽度
 * cb:点击确定后的回调函数
 */
function showDlg(title, href, height, width, cb) {
    mini.open({
        url: href,        //页面地址
        title: title,      //标题
        width: width,      //宽度
        height: height,     //高度
        allowResize: true,       //允许尺寸调节
        allowDrag: true,         //允许拖拽位置
        showCloseButton: true,   //显示关闭按钮
        showMaxButton: true,     //显示最大化按钮
        showModal: true,         //显示遮罩
        loadOnRefresh: false,       //true每次刷新都激发onload事件
        onload: function () {       //弹出页面加载完成
            /*var iframe = this.getIFrameEl();
             var data = {};
             //调用弹出页面方法进行初始化
             iframe.contentWindow.SetData(data);*/

        },
        ondestroy: function (action) {  //弹出页面关闭前
            if (action == "ok") {       //如果点击“确定”
                handleAction(cb);
            }
        }
    });
}

/**
 * 入参为opt形式的显示交互对话框函数，此方法默认在当前iframe内构建窗口
 * @param opt
 */
function showDlgOpt(opt) {

    opt= $.extend({
        title:'提示',
        href:'',
        height:300,
        width:400,
        action:function(){

        }
    },opt);

    var style="width:"+opt.width+"px;";
    style+="height:"+opt.height+"px;";

    /* 为了在当前iframe显示对话框，使用构建window的方式来显示 */
    var id = 'miniui_showDlg_window_' + Math.ceil(Math.random() * 1000000);
    var html="<div id='" + id + "' class='mini-window' title='"+opt.title+"' style='"+style+"' bodyStyle='padding:0px;' showMaxButton='true' showFooter='false'"
        + "showMaxButton='true' showCollapseButton='true' showShadow='true' allowResize='true' allowDrag='true' width='300px' url='"+opt.href+"'>"
        + "<div property='footer' style='text-align:center;padding:5px;padding-right:15px;'>"
        + "<input type='button' value='关闭' onclick='mini.get(\"" + id + "\").destroy();' style='vertical-align:middle;'/>"
        + "</div>"
        + "</div>";

    $('body').append(html);
    mini.parse();
    var showDlgWindow = mini.get(id);
    showDlgWindow.show('center', 'middle');
    showDlgWindow.on('destroy',function(result){
        if(result.sender.__HideAction=='ok')
            handleAction(opt.action);
    });
    return showDlgWindow;
}

//处理操作后行为
function handleAction(action,data) {
    if (action) {
        if (typeof(action) == 'string') {
            try {
                var grid=mini.get(action);
                grid.reload();
            } catch (e) {

            }
        } else if (typeof(action) == 'function') {
            return action(data);
        }
    }
    return false;
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
 * 下载一个文件
 * @param href
 */
function download(href){
    window.open(href);
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
function selectOne(gridId, cb,noSelectCb) {

    var grid=mini.get(gridId);
    var rows = grid.getSelecteds();
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
function selectMulti(gridId, cb) {
    var grid=mini.get(gridId);
    var rows = grid.getSelecteds();
    if (rows.length == 0) {
        hint('未选中任何项目，请选择需要操作的项目');
    } else {
        /*var ids = $(rows).map(function () {
         return this.id;
         }).get();*/
        cb(rows);
    }
}

function selectDlg(opts){
    opts= $.extend({
        url:'',
        title:'请选择数据',
        width:650,
        height:380,
        multi:false,//是否允许多选
        cb:function(rows){}//选中后的回调函数
    },opts);
    mini.open({
        url: opts.url,
        title: opts.title,
        width: opts.width,
        height: opts.height,
        ondestroy: function (action) {
            //if (action == "close") return false;
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.GetData();
                data = mini.clone(data);    //必须
                if(opts.multi){
                    opts.cb(data);
                }else{
                    if(data.length==0){
                        iframe.contentWindow.hint("未选择数据！");
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