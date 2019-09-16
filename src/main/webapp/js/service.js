/**
 * 选择角色对话框
 * @param opts
 */
function selectRoleDlg(opts){

    opts= $.extend({
        multi:false,//是否允许多选
        selectedRows:[],//被选中的行
        cb:function(rows){}//选中后的回调函数
    },opts);
    mini.open({
        url: "./role!selectHtml.action",
        title: "选择角色",
        width: 900,
        height: 380,
        onload: function () {
            var iframe = this.getIFrameEl();
            iframe.contentWindow.SetData(opts.selectedRows);
        },
        ondestroy: function (action) {
            //if (action == "close") return false;
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.GetData();
                data = mini.clone(data);    //必须
                console.log(data);
                if(opts.multi){
                    opts.cb(data);
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

/**
 * 选择用户对话框
 * @param opts
 */
function selectUserDlg(opts){

    opts= $.extend({
        multi:false,//是否允许多选
        selectedRows:[],//被选中的行
        roleCode:'',
        cb:function(rows){}//选中后的回调函数
    },opts);
    mini.open({
        url: "./user!selectHtml.action?roleCode="+opts.roleCode,
        title: "选择用户",
        width: 900,
        height: 380,
        onload: function () {
            var iframe = this.getIFrameEl();
            iframe.contentWindow.SetData(opts.selectedRows);
        },
        ondestroy: function (action) {
            //if (action == "close") return false;
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.GetData();
                data = mini.clone(data);    //必须
                console.log(data);
                if(opts.multi){
                    opts.cb(data);
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

/**
 * 选择资源对话框
 * @param opts
 */
function selectResourceDlg(opts){

    opts= $.extend({
        autoCheckParent:true,
        multi:true,//是否允许多选
        selectedRows:[],//被选中的行
        cb:function(rows){}//选中后的回调函数
    },opts);
    mini.open({
        url: "./resource!selectHtml.action?autoCheckParent="+opts.autoCheckParent,
        title: "选择资源",
        width: 900,
        height: 380,
        onload: function () {
            var iframe = this.getIFrameEl();
            iframe.contentWindow.SetData(opts.selectedRows);
        },
        ondestroy: function (action) {
            //if (action == "close") return false;
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.GetData();
                data = mini.clone(data);    //必须
                console.log(data);
                if(opts.multi){
                    opts.cb(data);
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

/**
 * 选择资源图标对话框
 * @param opts
 */
function selectResourceIconClsDlg(opts){

    opts= $.extend({
        cb:function(iconCls){}//选中后的回调函数
    },opts);
    mini.open({
        url: "./resource.action?name=selectIconCls",
        title: "选择图标",
        width: 900,
        height: 380,
        onload: function () {
        },
        ondestroy: function (action) {
            //if (action == "close") return false;
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.GetData();
                data = mini.clone(data);    //必须
                if(!data){
                    iframe.contentWindow.hint("未选择数据数据！");
                    return false;
                }else{
                    opts.cb(data);
                }
            }

        }
    });
}

/**
 * 下拉列表选择资源
 * @param id 控件ID
 * @param opts 选择参数
 */
function selectResource(id, opts) {
    opts=$.extend({},opts);

    var url="resource!searchAllTree.action?";
    if(opts.param){
        url+=parseParam(opts.param);
    }

    var name=$(id).attr("name");
    var value=$(id).attr("value");

    var el="<input class='mini-treeselect' property='editor' textField='name' valueField='id' popupWidth='300'" +
        " id='{0}' url='{1}' name='{2}' value='{3}'  resultAsTree='true' expandOnLoad='true'/>";
    $(id).replaceWith($.formatString(el,id,url,name,value));
}
/**
 * 以弹出对话框的形式选择公司
 */
function selectCorpDlg(opts){
    opts= $.extend({
        multi:false,//是否允许多选
        cb:function(rows){}//选中后的回调函数
    },opts);
    mini.open({
        url: "./corp.action?name=select",
        title: "选择公司",
        width: 650,
        height: 380,
        ondestroy: function (action) {
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.GetData();
                data = mini.clone(data);    //必须
                console.log(data);
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

/**
 * 以下拉列表的形式选择公司
 * @param id 控件ID
 * @param opts 选择参数
 */
function selectCorp(id, opts) {
    opts=$.extend({
        deptId:''
    },opts);

    //选择单位的时候，默认只选择未被删除的单位
    var url="corp!tree.action?filter_CUSTOMS_delId=0&";
    //var url="corp!tree.action";
    if(opts.param){
        url+=parseParam(opts.param);
    }

    $(id).removeClass();
    $(id).addClass('mini-treeselect');
    $(id).attr('resultAsTree','true');
    $(id).attr('allowInput','true');
    $(id).attr('showPopupOnClick','true');
    $(id).attr('expandOnLoad','true');


    if(!$(id).attr('textField'))
        $(id).attr('textField','name');
    if(!$(id).attr('valueField'))
        $(id).attr('valueField','code');

    if(!$(id).attr('popupWidth'))
        $(id).attr('popupWidth','220px');

    if(!$(id).attr('popupHeight'))
        $(id).attr('popupHeight','500px');

    if(!$(id).attr('url'))
        $(id).attr('url',url);
    //按拼音搜索
    if(!$(id).attr('onkeyup'))
        $(id).attr('onkeyup','selectCorp_onkeyup');

    if(!$(id).attr('onvaluechanged'))
        $(id).attr('onvaluechanged','selectCorp_valuechanged');

    /*if(!$(id).attr('onhidepopup'))
     $(id).attr('onhidepopup','selectCorp_valuechanged');*/

    if(!$(id).attr('valueFromSelect'))
        $(id).attr('valueFromSelect','true');

    if(!$(id).attr('multiSelect'))
        $(id).attr('multiSelect','false');

    if(!$(id).attr('style'))
        $(id).attr('style','width:150px;');


    if(opts.deptId){
        $(id).attr('data-options','{deptId:\"'+opts.deptId+'\"}');
    }



    /*var elId=$(id).attr("id");
     var name=$(id).attr("name");
     var value=$(id).attr("value");
     var style=$(id).attr("style");

     var el="<input class='mini-treeselect' property='editor' textField='name' valueField='code'" +
     " popupWidth='220px'  popupHeight='500px' onkeyup='selectCorp_onkeyup'" +
     " id='{0}' url='{1}' name='{2}' value='{3}' onvaluechanged='{4}' data-options='{deptId:\"{5}\"}' resultAsTree='true'" +
     " allowInput='true' showPopupOnClick='true' expandOnLoad='true' valueFromSelect='false' multiSelect='{6}' style='{7}'/>";
     $(id).replaceWith($.formatString(el,elId,url,name,value,opts.onvaluechanged,opts.deptId,opts.multi,style));*/

    //设置部门联动
    if(opts.deptId){
        selectDept(opts.deptId,{corpCode:$(id).attr('value')});

        /*var deptElId=$(opts.deptId).attr("id");
         var name=$(opts.deptId).attr("name");
         var value=$(opts.deptId).attr("value");

         var el="<input class='mini-treeselect' property='editor' textField='name' valueField='code'" +
         " popupWidth='220px'  popupHeight='500px'" +
         " id='{0}' name='{1}' value='{2}' resultAsTree='true'" +
         " allowInput='true' showPopupOnClick='true' expandOnLoad='true' valueFromSelect='false'/>";
         $(opts.deptId).replaceWith($.formatString(el,deptElId,name,value));*/
    }
}

//用于选择公司时，进行拼音搜索
function selectCorp_onkeyup(e){
    var val=$(e.sender.getTextEl()).val();
    e.sender.load('corp!tree.action?filter_LIKES_entity.name_OR_entity.code_OR_entity.pinYinCap_OR_entity2.name_OR_entity2.code_OR_entity2.pinYinCap_OR_entity3.name_OR_entity3.code_OR_entity3.pinYinCap='+val);
    $(e.sender.getTextEl()).val(val);
}
//公司值改变时，部门联动改变
function selectCorp_valuechanged(e){
    var deptElId=$(e.sender.deptId).attr("id");
    var deptTree=mini.get(deptElId);
    if(deptTree) {
        deptTree.setValue(null);
        deptTree.setData([]);
        deptTree.load('dept!tree.action?corp.code=' + e.sender.getValue());
    }
}

/**
 * 选择部门
 * 有两种数据加载方式：
 *      一、opts中传入corpCode参数，显示该公司下的部门
 *      二、手动调用var deptTree=mini.get(deptElId);
 *                deptTree.load('dept!tree.action?corp.code='+ 公司编码);
 *
 * @param id
 * @param opts
 */
function selectDept(id, opts) {
    opts=$.extend({
        corpCode:''
    },opts);

    $(id).removeClass();
    $(id).addClass('mini-treeselect');
    $(id).attr('resultAsTree','true');
    $(id).attr('allowInput','true');
    $(id).attr('showPopupOnClick','true');
    $(id).attr('expandOnLoad','true');
    $(id).attr('valueFromSelect','true');
    if(!$(id).attr('textField'))
        $(id).attr('textField','name');

    if(!$(id).attr('valueField'))
        $(id).attr('valueField','code');

    if(opts.corpCode)
        $(id).attr('url','dept!tree.action?corp.code='+opts.corpCode);

    if(!$(id).attr('textField'))
        $(id).attr('textField','name');

    if(!$(id).attr('textField'))
        $(id).attr('textField','name');

    if(!$(id).attr('textField'))
        $(id).attr('textField','name');

    if(!$(id).attr('popupWidth'))
        $(id).attr('popupWidth','220px');

    if(!$(id).attr('popupHeight'))
        $(id).attr('popupHeight','500px');

    if(!$(id).attr('style'))
        $(id).attr('style','width:150px;');

    /*var url=opts.url;
     var elId=$(opts.id).attr("id");
     var name=$(opts.id).attr("name");
     var value=$(opts.id).attr("value");

     var el="<input class='mini-treeselect' property='editor' textField='name' valueField='code'" +
     " popupWidth='220px'  popupHeight='500px'" +
     " id='{0}' url='{1}' name='{2}' value='{3}' resultAsTree='true'" +
     " allowInput='true' showPopupOnClick='true' expandOnLoad='true' valueFromSelect='false'/>";
     $(id).replaceWith($.formatString(el,elId,url,name,value));*/
}

//传入用户ID，修改用户密码
function changePwd(userId){
    showFormDlg('修改密码','user.action?name=changePwd&id='+userId,200,300);
}