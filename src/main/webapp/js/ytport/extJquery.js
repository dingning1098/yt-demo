/**
 * Create a cookie with the given key and value and other optional parameters.
 * 
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain used when the cookie was set.
 * 
 * @param String
 *            key The key of the cookie.
 * @param String
 *            value The value of the cookie.
 * @param Object
 *            options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object. If a negative value is specified (e.g. a date in the past), the cookie will be deleted. If set to null or omitted, the cookie will be a session cookie and will not be retained when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will require a secure protocol (like HTTPS).
 * @type undefined
 * 
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 * 
 * Get the value of a cookie with the given key.
 * 
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 * 
 * @param String
 *            key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 * 
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
$.cookie = function(key, value, options) {
	if (arguments.length > 1 && (value === null || typeof value !== "object")) {
		options = $.extend({}, options);
		if (value === null) {
			options.expires = -1;
		}
		if (typeof options.expires === 'number') {
			var days = options.expires, t = options.expires = new Date();
			t.setDate(t.getDate() + days);
		}
		return (document.cookie = [ encodeURIComponent(key), '=', options.raw ? String(value) : encodeURIComponent(String(value)), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : '' ].join(''));
	}
	options = value || {};
	var result, decode = options.raw ? function(s) {
		return s;
	} : decodeURIComponent;
	return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

/**
 * 
 * @requires jQuery
 * 
 * 将form表单元素的值序列化成对象
 * 
 * @returns object
 */
$.fn.serializeObject = function() {
	var o = {};
	$.each(this.serializeArray(), function(index) {
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] = this['value'];
		}
	});
	return o;
};

/**
 * 将object对象转化为以$间隔的url参数的形式，对参数无限递归
 * @param param
 * @param key
 * @returns {string}
 */
function parseParamRecursion(param, pre){
	if(!pre)
		pre='';
	var result='';
	if ($.isPlainObject(param)) {
		if(pre)
			pre+='.';
		for (var key in param) {
			var value = param[key];
			result+=parseParamRecursion(value,pre+key);
		}
	} else if($.isArray(param)) {
		for (var i = 0; i < param.length; i++) {
			result+=parseParamRecursion(param[i],pre+'['+i+']');
		}
	}else{
		if(param instanceof Date){
			result += encodeURIComponent(pre) + "=" + param.format('yyyy-MM-dd HH:mm:ss') + "&";
		}else {
			if(param==null)
				param='';
			result += encodeURIComponent(pre) + "=" + encodeURIComponent(param) + "&";
		}
	}
	return result;
}

/**
 * 将object对象转化为以&间隔的url参数的形式，
 * 对参数不进行无限递归
 * @param param
 * @param key
 * @returns {string}
 */
function parseParam(param, pre){
	if(!pre) {
		pre = '';
		//在最顶级，如果传入参数是一个普通字符串，则直接返回
		if(typeof param=='string')
			return param;
	}

	var result='';
	if ($.isPlainObject(param)) {
		if(pre.indexOf('.')==-1) {
			if (pre)
				pre += '.';
			for (var key in param) {
				var value = param[key];
				result += parseParam(value, pre + key);
			}
		}
	} else if($.isArray(param)) {
		if(pre.indexOf('.')==-1) {
			for (var i = 0; i < param.length; i++) {
				result += parseParam(param[i], pre + '[' + i + ']');
			}
		}
	}else{
		if(param instanceof Date){
			result += encodeURIComponent(pre) + "=" + param.format('yyyy-MM-dd HH:mm:ss') + "&";
		}else {
			if(param==null)
				param='';
			result += encodeURIComponent(pre) + "=" + encodeURIComponent(param) + "&";
		}
	}
	return result;
}

/**
 * 将object对象转化为以&间隔的url参数的形式，
 * 对参数不进行无限递归
 * @param param
 * @param key
 * @returns {string}
 */
function parseParamObj(param,pre,result){

	if(!result){
		result=new Object();
	}

	if(!pre) {
		pre = '';
		//在最顶级，如果传入参数是一个普通字符串，则直接返回
		if(typeof param=='string')
			return param;
	}

	if ($.isPlainObject(param)) {
		if(pre.indexOf('.')==-1) {
			if (pre)
				pre += '.';
			for (var key in param) {
				var value = param[key];
				parseParamObj(value, pre + key,result);
			}
		}
	} else if($.isArray(param)) {
		if(pre.indexOf('.')==-1) {
			for (var i = 0; i < param.length; i++) {
				parseParamObj(param[i], pre + '[' + i + ']',result);
			}
		}
	}else{
		if(param instanceof Date){
			result [pre] = param.format('yyyy-MM-dd HH:mm:ss');
		}else {
			if(param==null)
				param='';
			result [pre]= param;
		}
	}
	return result;
}

/**
 * 
 * 增加formatString功能
 * 
 * 使用方法：$.formatString('字符串{0}字符串{1}字符串','第一个变量','第二个变量');
 * 			$.formatString('字符串{aa}字符串{bb}字符串','{aa:'example',bb:'test'});
 * @returns 格式化后的字符串
 */
$.formatString = function(str) {
	if(arguments[1]&&$.isPlainObject(arguments[1])){
		var param=arguments[1];
		for (var key in param) {
			str = str.replace("{" + key + "}", param[key]);
		}
		//替换掉剩余的大括号包括的内容，这些变量在参数对象中不存在
		str=str.replace(/\{[^\{,^:,^;]*\}/g,'');
	}else {
		for (var i = 0; i < arguments.length - 1; i++) {
			str = str.replace("{" + i + "}", arguments[i + 1]);
		}
	}
	return str;
};

/**
 * 
 * 接收一个以逗号分割的字符串，返回List，list里每一项都是一个字符串
 * 
 * @returns list
 */
$.stringToList = function(value) {
	if (value != undefined && value != '') {
		var values = [];
		var t = value.split(',');
		for ( var i = 0; i < t.length; i++) {
			values.push('' + t[i]);/* 避免他将ID当成数字 */
		}
		return values;
	} else {
		return [];
	}
};

/**
 * 
 * 去字符串空格
 * 
 * @returns
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, '');
};
String.prototype.ltrim = function() {
	return this.replace(/(^\s*)/g, '');
};
String.prototype.rtrim = function() {
	return this.replace(/(\s*$)/g, '');
};


/**
 * 为字符串类型增加endWith方法
 */
String.prototype.endWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
		return false;
	if(this.substr(this.length-str.length)==str)
		return true;
	else
		return false;
	return true;
}

/**
 * 为字符串类型增加startWith方法
 */
String.prototype.startWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
		return false;
	if(this.substr(0,str.length)==str)
		return true;
	else
		return false;
	return true;
}

$(function() {
	/*  在textarea处插入文本--Start */
	(function($) {
		$.fn.extend({
					insertContent : function(myValue, t) {
						var $t = $(this)[0];
						if (document.selection) { // ie
							this.focus();
							var sel = document.selection.createRange();
							sel.text = myValue;
							this.focus();
							sel.moveStart('character', -l);
							var wee = sel.text.length;
							if (arguments.length == 2) {
								var l = $t.value.length;
								sel.moveEnd("character", wee + t);
								t <= 0 ? sel.moveStart("character", wee - 2 * t
										- myValue.length) : sel.moveStart(
										"character", wee - t - myValue.length);
								sel.select();
							}
						} else if ($t.selectionStart
								|| $t.selectionStart == '0') {
							var startPos = $t.selectionStart;
							var endPos = $t.selectionEnd;
							var scrollTop = $t.scrollTop;
							$t.value = $t.value.substring(0, startPos)
									+ myValue
									+ $t.value.substring(endPos,
											$t.value.length);
							this.focus();
							$t.selectionStart = startPos + myValue.length;
							$t.selectionEnd = startPos + myValue.length;
							$t.scrollTop = scrollTop;
							if (arguments.length == 2) {
								$t.setSelectionRange(startPos - t,
										$t.selectionEnd + t);
								this.focus();
							}
						} else {
							this.value += myValue;
							this.focus();
						}
					}
				})
	})(jQuery);
	/* 在textarea处插入文本--Ending */
});

//---------------------------------------------------
// 日期格式化
// 格式 YYYY/yyyy/YY/yy 表示年份
// MM/M 月份
// W/w 星期
// dd/DD/d/D 日期
// hh/HH/h/H 时间
// mm/m 分钟
// ss/SS/s/S 秒
//---------------------------------------------------
Date.prototype.format = function(formatStr)
{
	var str = formatStr;
	var Week = ['日','一','二','三','四','五','六'];

	str=str.replace(/yyyy|YYYY/,this.getFullYear());
	str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

	var month=this.getMonth()+1;//月份是从0开始的，所以要加上1
	str=str.replace(/MM/,month>9?month.toString():'0' + month);
	str=str.replace(/M/g,month);

	str=str.replace(/w|W/g,Week[this.getDay()]);

	str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
	str=str.replace(/d|D/g,this.getDate());

	str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
	str=str.replace(/h|H/g,this.getHours());
	str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
	str=str.replace(/m/g,this.getMinutes());

	str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
	str=str.replace(/s|S/g,this.getSeconds());

	return str;
}

/**
 * 为元素id添加#
 * @param id
 */
function addHash(id){
	if(id.startWith('#'))
		return id;
	else
		return '#'+id;
}

/**
 * 取消元素前的#
 * @param id
 */
function removeHash(id){
	if(id.startsWith('#'))
		return id.substr(1);
	else
		return id;
}
