
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Java Project Demo</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <%@ include file="/common/taglibs.jsp" %>
    <style type="text/css">
        html, body{
            margin:0;padding:0;border:0;width:100%;height:100%;overflow:hidden;
        }

        .logo
        {
            font-family:"微软雅黑",	"Helvetica Neue",​Helvetica,​Arial,​sans-serif;
            font-size:20px;font-weight:bold;color:#444;
            cursor:default;
            position:absolute;top:0px;left:15px; line-height:28px;
        }
        .mini-layout-region-south img
        {
            vertical-align:top;
        }
        .box {
        	position:absolute;
        	top:3px;
        	right:330px; 
        	line-height:20px;
        	
			font-size:2.5px;
		  	background-color:#fff;
			width:140px;
			height:20px;
			border:2px solid #40AA54;			
			box-shadow:0px 0px 15px rgba(64, 170, 84, .6);
			border-radius:8px;
		}
		
		.name {
			font-size:6em;
			line-height:1.3em;
			font-weight:bold;
			font-family:"微软雅黑";
			color:#40AA53;
		}
		.name span {
			color:#000;
		}
		
    </style>

</head>
<body>
<noscript>
    <div class="noscript">
        <div class="noscript-inner">
            <p>
                <strong>我们检测到你可能禁止了JavaScript.</strong>
            </p>

            <p>您须开启浏览器的JavaScript来运行此网站的功能.</p>
        </div>
    </div>
</noscript>
<div class="mini-layout" style="width:100%;height:100%;">
    <div title="north" region="north" class="app-header" bodyStyle="overflow:hidden;" height="30" showHeader="false" showSplit="false">
        <div class="logo">Java Project Demo</div>

        <div style="position:absolute;right:12px;bottom:2px;font-size:12px;line-height:25px;font-weight:normal;">
	        <table >
	        	<tr>	        	    
	        		<td>选择皮肤：
			            <select id="selectSkin" onchange="onSkinChange(this.value)" style="width:100px;" >
			                <option value="blue">Blue</option>
			                <option value="default">Default</option>
			                <option value="gray">Gray</option>
			                <option value="olive2003">Olive2003</option>
			                <option value="blue2003">Blue2003</option>
			                <option value="blue2010">Blue2010</option>
			                <option value="bootstrap">Bootstrap</option>
			
			                <option value="metro">metro</option>
			                <option value="metro-green">metro-green</option>
			                <option value="metro-orange">metro-orange</option>
			
			                <option value="jqueryui-uilightness">jqueryui-uilightness</option>
			                <option value="jqueryui-humanity">jqueryui-humanity</option>
			                <option value="jqueryui-excitebike">jqueryui-excitebike</option>
			                <option value="jqueryui-cupertino">jqueryui-cupertino</option>
			            </select>
			        </td>
	        		<td>
	        			<shiro:user>  
							欢迎[<shiro:principal property="name" />] 登录，<a href="${pageContext.request.contextPath}/logout">退出</a>
						</shiro:user>
					</td>
	        	</tr>
	        </table>
             
        </div>
    </div>
   <div region="west" title="菜单"  bodyStyle="padding-left:1px;" showSplitIcon="true" width="200" minWidth="100" maxWidth="350">
        <div id="menu" name="menu" class="mini-outlookmenu" url="index!menus.action" style="width:100%;height:100%;"
             idField="id" parentField="parentId" textField="name" resultAsTree="true" onitemclick="onMenuItemSelect">

        </div>
    </div>
    <div title="center" region="center" style="border:0;">
        <div id="mainTabs" class="mini-tabs" activeIndex="0" style="width:100%;height:100%;" plain="false" bodyStyle="padding:0px;">

        </div>
    </div>
</div>
<script type="text/javascript">
    initGlobal();
    mini.parse();


    function onSkinChange(skin) {
        mini.Cookie.set('miniuiSkin', skin);
        //mini.Cookie.set('miniuiSkin', skin, 100);//100天过期的话，可以保持皮肤切换
        window.location.reload()
    }

    function onMenuItemSelect(e){
        var node= e.item;
        var tabs=mini.get("mainTabs");

        var id = "mainTabs$" + node.name;
        var tab = tabs.getTab(id);
        if (!tab) {
            tab = {};
            tab._nodeid = node.id;
            tab.name = id;
            tab.title = node.name;
            tab.showCloseButton = true;

            //这里拼接了url，实际项目，应该从后台直接获得完整的url地址
            tab.url = node.url;

            tabs.addTab(tab);
        }
        tabs.activeTab(tab);

    }

    window.onload = function () {
        var skin = mini.Cookie.get("miniuiSkin");
        if (skin) {
            var selectSkin = document.getElementById("selectSkin");
            selectSkin.value = skin;
        }

        /*var frame = document.getElementById("mainframe");
        var demoTree = mini.get("demoTree");

        var url = window.location.href;

        var params = GetParams(location.href, "#");
        if (params.ui) {
            var url = URLS[params.ui];
            if (url) {
                frame.src = url;
            }
        } else if (params.app) {

            var node = demoTree.getNode(params.app);
            if (node) {
                demoTree.expandNode(node);
                demoTree.selectNode(node);

                var url = URLS[params.app];
                if (url) {
                    frame.src = url;
                }
            }

        } else if (params.src) {

            frame.src = params.src;
        }
        CanSet = true;*/
    }
    //退出系统
    $('#logout').click(function(){
    	
    });
</script>
</body>
</html>