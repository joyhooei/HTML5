//-------------------page
function Paginated(page, count, eachPageNum, click) {
	this.page = page;
	this.count = count;
	this.eachPageNum = eachPageNum;
	this._num = 8;
	this.maxNum = -1;
	this.url = "";
	this.geUrl = function(page) {
		return this.url + (this.url.indexOf("?") > 0 ? "&" : "?") + "page=" + page;
	};
	this.html = function() {
		var _s = [];
		_s.push("<div class=\"pagination\">");
		if (this.getTotalPage() > 1) {
			if (this.page == 1) {
				_s.push("<span class=\"disabled prev_page\">&laquo; 上一页</span>");
				_s.push(this.pagebar());
				_s.push("<a class=\"next_page\" href='javascript:;'  " + click(this.getNextPage()) + ">&raquo; 下一页</a>&nbsp;");
			} else if (this.page > 1 && this.page < this.getTotalPage()) {
				_s.push("<a class=\"prev_page\" href='javascript:;' " + click(this.getPrePage()) + ">&laquo; 上一页</a>");
				_s.push(this.pagebar());
				_s.push("<a class=\"next_page\" href='javascript:;' " + click(this.getNextPage()) + ">&raquo; 下一页</a>&nbsp;");
			} else {
				_s.push("<a class=\"prev_page\" href='javascript:;' " + click(this.getPrePage()) + ">&laquo; 上一页</a>&nbsp;");
				_s.push(this.pagebar());
				_s.push("<span class=\"disabled next_page\">&raquo; 下一页</span>");
			}
			_s.push("&nbsp;跳转至&nbsp;<span><input type='text' size='4' id='turn_page' onkeydown=\"if(event.keyCode==13){document.getElementById('__turn_page').click();}\" onkeyup=\"this.value=this.value.replace(/\\D/g,'');\" onafterpaste=\"this.value=this.value.replace(/\\D/g,'');\" /></span>");
			_s.push("&nbsp;<a class=\"a_no\" href='javascript:;' id=\"__turn_page\" >确定</a>");
		}
		//_s.push("<script></script>");
		_s.push("</div>");
		return _s.join('');
	};
	this.turn = function(func) {
		var button = document.getElementById('__turn_page')
		if (button != null) {
			if (button.addEventListener) {
				button.addEventListener("click", func, false);
			} else if (button.attachEvent) {
				button.attachEvent("onclick", func);
			}
		}

	};
	this.getInputValue = function() {
		//判断是否有超出最大页码
		var _el = document.getElementById('turn_page');
		if (_el.value.trim() != '') {
			if (parseInt(_el.value) > this.getTotalPage()) {
				_el.value = this.getTotalPage();
			}
		}
		return _el.value.trim();
	}
	this.getTotalPage = function() {
		return Math.floor((this.count + this.eachPageNum - 1) / this.eachPageNum);
	};

	this.pagebar = function() {
		var _bar = [];
		var _startPos = this.page - (this._num / 2) > 0 ? this.page - (this._num / 2) : 1;
		if (_startPos > 1) {
			_bar.push("<a href='javascript:;' " + click(1) + ">" + 1 + " ..." + "</a>");
		}
		var _endPos = (_startPos + this._num) > this.getTotalPage() ? this.getTotalPage() : (_startPos + this._num);
		if (_endPos - this._num > 0)
			_startPos = _endPos - this._num;
		for (; _startPos <= _endPos; _startPos++) {
			if (_startPos == this.page) {
				_bar.push("<span class=\"current\">" + _startPos + "</span>");
			} else {
				_bar.push("<a href='javascript:;' " + click(_startPos) + ">" + _startPos + "</a>");
			}
		}
		if (_endPos < this.getTotalPage()) {
			_bar.push("<a href='javascript:;' " + click(this.getTotalPage()) + ">" + " ..." + this.getTotalPage() + "</a>");
		}
		return _bar.join('');
	};

	this.getNextPage = function() {
		return this.page + 1;
	};

	this.getPrePage = function() {
		return this.page - 1;
	};
}
jQuery.extend({
	toJSONString: function(object) {
		var type = typeof object;
		if ('object' == type) {
			if (Array == object.constructor)
				type = 'array';
			else if (RegExp == object.constructor)
				type = 'regexp';
			else
				type = 'object';
		}
		switch (type) {
			case 'undefined':
			case 'unknown':
				return;
				break;
			case 'function':
			case 'boolean':
			case 'regexp':
				return object.toString();
				break;
			case 'number':
				return isFinite(object) ? object.toString() : 'null';
				break;
			case 'string':
				return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function() {
					var a = arguments[0];
					return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : ""
				}) + '"';
				break;
			case 'object':
				if (object === null)
					return 'null';
				var results = [];
				for (var property in object) {
					var value = jQuery.toJSONString(object[property]);
					if (value !== undefined)
						results.push(jQuery.toJSONString(property) + ':' + value);
				}
				return '{' + results.join(',') + '}';
				break;
			case 'array':
				var results = [];
				for (var i = 0; i < object.length; i++) {
					var value = jQuery.toJSONString(object[i]);
					if (value !== undefined)
						results.push(value);
				}
				return '[' + results.join(',') + ']';
				break;
		}
	}
});
//--------------------Date extend
Date.prototype.format = function(format) {
	var o =
			{
				"M+": this.getMonth() + 1, //month
				"d+": this.getDate(), //day
				"h+": this.getHours(), //hour
				"m+": this.getMinutes(), //minute
				"s+": this.getSeconds(), //second
				"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
				"S": this.getMilliseconds() //millisecond
			}
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	return format;
};
Date.prototype.toStr = function() {
	return this.getFullYear() + "-" + ((this.getMonth() + 1) < 10 ? ("0" + (this.getMonth() + 1)) : (this.getMonth() + 1))
		+ "-" + (this.getDate() < 10 ? ("0" + this.getDate()) : this.getDate());
}
String.prototype.toDate = function() {
	var _tmp = this.split("-");
	return new Date(parseInt(_tmp[0], 10), parseInt(_tmp[1], 10) - 1, parseInt(
			_tmp[2], 10))
}
//------------------------get location url param
function get_query_string(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return  unescape(r[2]);
	return null;
}
function get_query_string_zh(name)
{
	var LocString=String(window.document.location.href);
	var rs = new RegExp("(^|)"+name+"=([^/&]*)(/&|$)","gi").exec(LocString), tmp;
	if(tmp=rs){
		return tmp[2];
	}
	return "";
}
//------------------------cookie
function setCookie(name,value,time){
    var exp  = new Date();
    exp.setTime(exp.getTime() + (typeof(time)=='undefined'?(360*24*60*60*1000):time));
    document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
}
function getCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) {
        var tmp = unescape(arr[2]);
        if(tmp.indexOf('"') == 0){
            tmp = tmp.substr(1,tmp.length-2);
        }
        return tmp;
    }
    return null;
}
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";path=/;expires="+exp.toGMTString();
}
function format_number(pnumber, decimals) {
    	return pnumber.toFixed(decimals);
	if (isNaN(pnumber)) {
		return 0
	}
	if (pnumber == '') {
		return 0
	}
	var snum = new String(pnumber);
	var sec = snum.split('.');
	var whole = parseFloat(sec[0]);
	var result = '';

	if (sec.length > 1) {
		var dec = new String(sec[1]);
		dec = String(parseFloat(sec[1]) / Math.pow(10, (dec.length - decimals)));
		dec = String(whole + Math.round(parseFloat(dec)) / Math.pow(10, decimals));
		var dot = dec.indexOf('.');
		if (dot == -1) {
			dec += '.';
			dot = dec.indexOf('.');
		}
		while (dec.length <= dot + decimals) {
			dec += '0';
		}
		result = dec;
	} else {
		var dot;
		var dec = new String(whole);
		dec += '.';
		dot = dec.indexOf('.');
		while (dec.length <= dot + decimals) {
			dec += '0';
		}
		result = dec;
	}
	return result;
}
function AForm($e) {
	this.$e = $e;
	var params = {};
	$e.find("input[type='hidden']").each(function(i, e) {
		params[$e.attr("name")] = "";
	});
	this.params = params;
}
AForm.prototype.go = function() {
	for (var k in this.params) {
		this.$e.find("input[name='" + k + "']").val((this.params[k]+'').replace(/ /g,'%20'));
	}
	this.$e.submit();
};
AForm.prototype.click = function() {
	this.go();
};
function AAction(text) {
	this.text = text;
}
AAction.prototype.appendTo = function(e) {
	$(e).html('<a href="javascript:;" class="font_color_green_2">' + this.text + '</a>');
	if (this.clickable !== undefined) {
		var _this = this;
		$(e).find("a").click(function() {
			_this.clickable.click();
		});
	}
};
