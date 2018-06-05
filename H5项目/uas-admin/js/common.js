/**
 * Created by BobyCo on 2017/10/17 0017.
 */
var sevenDays = [];
// 同步获取服务器7天内起止日期
function initNow() {
    $.ajax({
        type: 'GET',
        async: false,
        url: 'http://getNow',
        dataType: 'json',
        success: function(result) {
            for (var i=6; i>=0; i--) {
                sevenDays.push(getBeforeDate(result.now, i, '.'));
            }
            validToken(result.tokenId); // 模拟token验证
        }
    });
}
// 获取n天前的日期
function getBeforeDate(now, n, sep){
    sep = sep?sep:'-';
    var n = n,
        d = new Date(now),
        year = d.getFullYear(),
        mon=d.getMonth()+1,
        day=d.getDate();
    d.setDate(d.getDate()-n);
    year = d.getFullYear();
    mon=d.getMonth()+1;
    day=d.getDate();
    s = year+sep+(mon<10?('0'+mon):mon)+sep+(day<10?('0'+day):day);
    return s;
}

// 初始化线性图
function initLineCharts(container, options) {
    var chart= {
        type: 'spline',
        backgroundColor: 'rgba(0,0,0,0)'
    };
    var title = {
        text: ''
    };
    var xAxis = {
        categories: sevenDays,
        lineColor: '#f0f0f0', // 轴线颜色
        tickLength: 0, // 刻度线长度
        labels: {
            style: {
                color: '#e9dbd2'
            },
            formatter: function() {
                return this.value.substr(-2);
            }
        }
    };

    var yAxis = {
        title: {
            text: ''
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }],
        labels: {
            style: {
                color: '#e9dbd2'
            }
        }
    };

    var tooltip = {
        // valueSuffix: '\xB0C'
    };

    var legend = {
        enabled: false
    };

    var plotOptions = {
        spline: {
            lineWidth: 2,
            states: {
                hover: {
                    lineWidth: 3
                }
            },
            marker: {
                enabled: false
            }
        }
    };
    options.chart = chart;
    options.title = title;
    options.xAxis = options.xAxis ? options.xAxis : xAxis;
    options.yAxis = yAxis;
    options.plotOptions = plotOptions;
    options.tooltip = options.tooltip ? options.tooltip : tooltip;
    options.legend = options.legend ? options.legend : legend;
    $(container).highcharts(options);
}
// 验证token
function validToken(serverTokenId) {
    if ('f9ea0023-1be3-4f18-b6ec-e585af305b91' != serverTokenId) {
        window.location.href = '/20171018/login.html';
    }
}

// 菜单鼠标滑动
$('#gNavi .firstMenu>li').hover(function (e) {
    $(this).find('a').addClass('on').parent().siblings().children().removeClass('on');
    $(this).find('a').siblings().show();
}, function (e) {
    $(this).find('a').removeClass('on').siblings().hide();
})


Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//根据时间区间来取时间数组

 /**
  * getXAxis（）方法作用：获取开始日期和结束日期之间（包含开始日期和结束日期）的日期数组，可作为时间轴坐标等
  * @param  filters: {tab:0/1/2, startTime:开始日期, endTime:结束日期}
  * 说明： tab：取值0或1或2，分别表示日、月、年，对应的startTime和endTime的格式分别为'yyyy-MM-dd'、'yyyy-MM'、'yyyy'
  */
function getXAxis(filters) {
        var tab = filters.tab;
        var startTime = new Date(filters.startTime);
        var endTime = new Date(filters.endTime);
        var length = 0;   //日期跨度变量

        if( 0 == tab ) {
            length = (endTime.getTime() - startTime.getTime()) / (1000*24*60*60) + 1;
        } else if( 1 == tab ) {
            length = (endTime.getFullYear() - startTime.getFullYear()) * 12 + (endTime.getMonth() - startTime.getMonth()) + 1;
        } else {
            length = endTime.getFullYear() - startTime.getFullYear() + 1;
        }

        var xAxis = new Array(length);
        xAxis[0] = filters.startTime;
        for( var i = 1; i < length; i++ ) {
            if( 0 == tab ) {
                startTime.setDate( startTime.getDate() + 1 );
                xAxis[i] = startTime.Format("yyyy-MM-dd");
            } else if( 1 == tab ) {
                startTime.setMonth( startTime.getMonth() + 1 );
                xAxis[i] = startTime.Format("yyyy-MM");
            } else {
                startTime.setFullYear( startTime.getFullYear() + 1 );
                xAxis[i] = startTime.Format("yyyy");
            }
        }

        return xAxis;

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
//跳转的url
var LOGIN_NAME='abc';
var PASSWORD='abc';