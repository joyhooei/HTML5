function isNullOrEmpty(s) {
    if(s==null||s==undefined||s=="")
    {
        return true;
    }
    else
    {
        return false;
    }
}

function isNotNullOrEmpty(s)
{
    return !IsNullOrEmpty(s);

}

function roundResult(v,len)
{
    return Math.round(v*Math.pow(10,len))/Math.pow(10,len);
}


////////////////////////////////////////////////Object扩展方法////////////////////////////////////////////////////////////////

////四舍五入，保留几位小数
//Object.prototype.round=function(len)
//{
//    //return Math.round(this*Math.pow(10,len))/Math.pow(10,len);  
//    //return Math.round(this*5)/5;
//};


////////////////////////////////////////////////String扩展方法////////////////////////////////////////////////////////////////

//把字符串两侧的空格去掉
String.prototype.trim = function()
{
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

//去掉左侧空格
String.prototype.ltrim = function()
{
    return this.replace(/(^\s*)/g, "");
};

//去掉右侧空格
String.prototype.rtrim = function()
{
    return this.replace(/(\s*$)/g, "");
};

//去掉字符串末尾的end子字符串，比如：s.TrimEnd("}}");
String.prototype.trimEnd=function(end)
{
    if (this.isEnd(end))
    {
        return this.substring(0, this.lastIndexOf(end));
    }
    else
    {
        return this;
    }
}

//判断字符串是否以end字符串结尾，比如：s.IsEnd("}}");
String.prototype.isEnd=function(end)
{
    if (this.length < end.length) return false;


    if(this.substring(this.length-end.length)==end)
    {
        return true;
    }
    else
    {
        return false;
    }
}

//判断字符串是否是字母或数字的组合，A-Za-z0-9，为空返回false；
String.prototype.isEnglishOrDigit = function () {
    var regex = /^[A-Za-z0-9]+$/;
    if (regex.test(this)) {
        return true;
    }
    else {
        return false;
    }
}

// 验证是否是中文，\u0391-\uFFE5，为空返回false。
String.prototype.isChinese=function() {
    var reg = /^[\u0391-\uFFE5]+$/;
    return reg.test(this);
}

//验证是否是身份证号码，15位或18位，会验证日期。长度不是15或18，返回false。
String.prototype.isIDCard=function() {
    var num = this.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))){
        //alert('输入的身份证号长度不对，或者号码不符合规定！/n15位号码应全为数字，18位号码末位可以为数字或X。'); 
        return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
    //下面分别分析出生日期和校验位 
    var len, re;
    len = num.length;
    if (len == 15){


            for(var i=0;i<num.length;i++){
                if(num.charAt(i)<'0'||num.charAt(i)>'9'){
                    return false;
                    break;
                }
            }
            var year=num.substr(6,2);
            var month=num.substr(8,2);
            var day=num.substr(10,2);
            var sexBit=num.substr(14);

            if(year<'01'||year >'90')return false;
            if(month<'01'||month >'12')return false;
            if(day<'01'||day >'31')return false;
            return true;
    }
    else if (len == 18){
        iW = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
        iSum = 0;
        for( i=0;i<17;i++){
            iC = num.charAt(i) ;
            iVal = parseInt(iC);
            iSum += iVal * iW[i];
        }
        iJYM = iSum % 11;
        var sJYM = '';
        if(iJYM == 0) sJYM = "1";
        else if(iJYM == 1 ) sJYM = "0";
        else if(iJYM == 2 ) sJYM = "x";
        else if(iJYM == 3 ) sJYM = "9";
        else if(iJYM == 4 ) sJYM = "8";
        else if(iJYM == 5 ) sJYM = "7";
        else if(iJYM == 6 ) sJYM = "6";
        else if(iJYM == 7 ) sJYM = "5";
        else if(iJYM == 8 ) sJYM = "4";
        else if(iJYM == 9) sJYM = "3";
        else if(iJYM == 10) sJYM = "2";
        var cCheck = num.charAt(17).toLowerCase();
        if( cCheck != sJYM ){
            return false;
        }
        return true;
    }
    else{
        return false;
    }
}

// 验证是否是email地址。为空返回false。
String.prototype.isEmail = function () {
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return reg.test(this);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 验证控件
$.fn.vc = function (title, isRequire, minLength, maxLength, type, hintName) {

    var result = true;
    var message = '正确';

    this.each(function (e) {

        var value = this.value;
        if (isRequire && value == '') {
            message = title + '必须填写';
            result = false;
        }
        else {
            if (type == 'number') {

                if (value != '' && isNaN(value)) {
                    message = title + "只能输入数字。";
                    result = false;
                }

                if (minLength != null) {
                    if (value != '' && parseFloat(value) < minLength) {
                        message = title + '的值不能小于' + minLength;
                        result = false;
                    }
                }

                if (maxLength != null) {
                    if (value != '' && parseFloat(value) > maxLength) {
                        message = title + '的值不能大于' + maxLength;
                        result = false;
                    }
                }
            }
            else {

                // 判断输入的电话是否正确
                if (value != '' && type != null && type == 'phone' && !isPhone(value)) {
                    message = "请正确的输入您的" + title + "号码。";
                    result = false;
                }

                // 判断输入的电子邮件是否正确
                if (value != '' && type != null && type == 'email' && !isEMail(value)) {
                    message = "请正确的输入您的" + title;
                    result = false;
                }

                // 判断日期格式
                if (value != '' && type != null && type == 'date' && !isDate(value)) {
                    message = "请输入正确的日期格式。（例如2010-10-01）。";
                    result = false;
                }

                if (value != '' && minLength != 0 && getByteCount(value) < minLength) {
                    message = title + '至少要填写' + minLength + '个字符（注意：一个汉字视为2两个字符）。';
                    result = false;
                }

                if (value != '' && maxLength != 0 && getByteCount(value) > maxLength) {
                    message = title + '至多能填写' + maxLength + '个字符（注意：一个汉字视为2两个字符）。';
                    result = false;
                }
            }
        }

        if (hintName != null) {
            $('#' + hintName).html(message);
        }
        else {
            if (!result) {
                try {
                    this.select();
                    this.focus();
                    alert(message);
                }
                catch (err)
                { }
            }
        }
    });
    return result;
}

// 获取字节总数
function getByteCount(str) {
    var count = 0
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i).charCodeAt() <= 255) {
            count++;
        }
        else {
            count = count + 2;
        }
    }
    return count;
}

// 验证是否是中文
function isChinese(str) {
    var reg = /^[\u0391-\uFFE5]+$/;
    return reg.test(str);
}

// 验证日期是否合法
function isDate(value) {
    if (value == '')
        return false;

    var regex = /^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    if (!regex.test(value)) {
        return false;
    }
    else {
        var r = value.match(regex);
        var d = new Date(r[1], r[3] - 1, r[4]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
    }
}

// 验证电话（手机）号码是否正确
function isPhone(str) {
    var reg = /(^[0-9]{3,4}\-[0-9]{7,8}(-[0-9]{1,4})$)|(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}(-[0-9]{1,4})$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}(-[0-9]{1,4})$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}1[8,3,5][0-9]{9}$)/;
    return reg.test(str);
}

// 验证邮件地址是否合法
function isEMail(str) {
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return reg.test(str);
}

// 更换验证码
function switchCode(control) {
    control.src = '../validatecode.aspx?' + Math.random();
}

// 获取单选框的值
function getRadio(controlName) {
    return $("input[name='" + controlName + "']:checked").val();
}

// 设置单选框的值
function setRadio(controlName, value) {
    $("input[name='" + controlName + "'][value='" + value + "']").attr('checked', true);
}

// 获取复选框的值
function getCheckBox(controlName) {
    var temp = new Array();
    $("input[name='" + controlName + "']:checked").each(function (e) {
        temp.push(this.value);
        return true;
    });
    return temp.join(',');
}

// 获取复选框的值
function getCheckBoxList(controlName) {
    var temp = new Array();
    $(controlName + " input:checked").each(function (e) {
        temp.push(this.value);
        return true;
    });
    return temp.join(',');
}

// 设置复选框的值
function setCheckBox(controlName, ids) {
    if (ids == null || ids == "") {
        $("input[name='" + controlName + "']:checked").attr('checked', false);
    }
    else {
        ids = ',' + ids + ',';
        $("input[name='" + controlName + "']").each(function (e) { this.checked = ids.indexOf(',' + this.value + ',') != -1 });
    }
}

// 设置选中行的颜色
function setColor(control, isSelect) {
    var color = "#FFFFFF";
    var tds = control.childNodes;

    if (isSelect)
        color = "#FFFFCC";

    //    for (i = 0; i < tds.length; i++)
    //        tds[i].style.backgroundColor = color;
}

// 全选列表
function selectAll(checked) {
    var chkSelecteds = document.getElementsByName('chkSelected');

    for (i = 0; i < chkSelecteds.length; i++) {
        if (checked == null)
            chkSelecteds[i].checked = !chkSelecteds[i].checked;
        else
            chkSelecteds[i].checked = checked;
    }
}

// 前补0操作
function pad(number, length) {
    var str = '' + number;
    while (str.length < length)
        str = '0' + str;
    return str;
}

// 设置搜索
function getSearchValues(o) {
    var tmp = new Array();
    for (var i = 0; i < o.length; i++) {
        tmp.push($('#' + o[i]).val());
    }

    return tmp.join('\n');
}

// 设置审核权限
function _setFeature(result) {
    //ajaxLoading = true;
    var val = result.value;
    var args = result.request.args;

    var img = '../../images/' + args.state + '.gif';
    if (errors(val)) {
        img = '../../images/' + val.Tag[0] + '.gif';
    }

    $('#bool' + args.category + '_' + args.id).attr('src', img);
}

function $F(str) {
    return str.replace(/</g, '&lt;').replace(/ /g, '&nbsp;').replace(/\n/g, '<br />');
}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

// 转换为日期
function parseDate(str) {
    if (typeof str == 'string') {
        var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
        if (results && results.length > 3)
            return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]));
        results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
        if (results && results.length > 6)
            return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]), parseInt(results[6]));
        results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
        if (results && results.length > 7)
            return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]), parseInt(results[6]), parseInt(results[7]));
    }
    return null;
}

function formatDateTime(s) {
    if (s == null || s == '')
        return '0:0:0';
    s = parseInt(s);
    hours = Math.floor((s % 86400) / 3600);
    minutes = Math.floor(((s % 86400) % 3600) / 60);
    seconds = Math.floor(((s % 86400) % 3600) % 60);

    return hours + ':' + minutes + ':' + seconds;
}

function getDate(str, format) {
    if (str == null || str == "")
        return '';

    if (format == null || format == "")
        format = "yyyy-MM-dd";

    return parseDate(str).format(format);
}

function parseNum(str, digits) {
    if (digits == null)
        digits = 2;

    if (str == null || str == '')
        str = '0';

    str = str.toString().replace(/,/, '');
    return isNaN(str) ? parseFloat('0').toFixed(digits) : parseFloat(str).toFixed(digits);
}

function getCity(asynchronism, provinceName, cityName) {
    if (asynchronism == null)
        asynchronism = true;

    var province = $('#' + provinceName).val();
    if (province == '') {
        $('#' + cityName).html('<option value="">请选择</option>');
        return;
    }

    if (asynchronism)
        ajaxClass.GetCity(province, cityName, _getCity);
    else
        _getCity(ajaxClass.GetCity(province, cityName), cityName);
}

function filePreview(guid) {
    window.open('../../fileview.aspx?g=' + guid, 'filePreview', 'resizable=yes');
}

function filePreview2(guid,b) {
    showDialog('../../fileview.aspx?g=' + guid, 900, 624, "<h2>查看</h2>", b);
}

function filePreviewFullScreen(guid) {
    var fulls = "left=0,screenX=0,top=0,screenY=0,scrollbars=1";    //定义弹出窗口的参数
    if (window.screen) {
        var ah = screen.availHeight - 30;
        var aw = screen.availWidth - 10;
        fulls += ",height=" + ah;
        fulls += ",innerHeight=" + ah;
        fulls += ",width=" + aw;
        fulls += ",innerWidth=" + aw;
        fulls += ",resizable"
    } else {
        fulls += ",resizable"; // 对于不支持screen属性的浏览器，可以手工进行最大化。 manually
    }
    window.open("../../fileview.aspx?g=" + guid, "查看", fulls);
}

function _getCity(result, cityName) {

    var val = result.value;
    cityName = result.request == null ? cityName : result.request.args.cityName;

    $('#' + cityName).html('<option value="">请选择</option>');

    if (val == null)
        return;

    var dt = $.parseJSON(val)[0];
    for (var i = 0; i < dt.length; i++) {
        $('#' + cityName).append('<option value="' + dt[i].value + '">' + dt[i].name + '</option>');
    }
}

function formatFileLength(length) {
    if (length < 1024)
        return length + "字节";

    if (length >= 1024 && length < 1048576)
        return (length / 1024).toFixed("2") + "KB";

    if (length >= 1048576 && length < 1073741824)
        return (length / 1048576).toFixed("2") + "MB";

    if (length >= 1073741824 && length < 1099511627776)
        return (length / 1073741824).toFixed("2") + "GB";

    return "";
}

function ib(url) {
    window.open('../../../../imagebrowse.aspx?url=' + encodeURIComponent(url), 'imagebrowse', 'width=550, height=400');
}

function ib2(url,b) {
    showDialog('../../../../imagebrowse.aspx?url=' + encodeURIComponent(url), 900, 535, "<h2>查看</h2>", b);
}

function msgbox(msg) {
    alert(msg);
}

function errors(value) {
    if (value == null) {
        alert('系统正忙，请稍候再试。');
        return false;
    }

    switch (value.Code) {
        case -1:
            return true;
        case -2:
            alert('验证码填写错误。');
            $('.validatecode').click();
            $('#validate').select();
            return false;
        case -3:
            alert('登录已超时，请重新登录。');
            return false;
        case -4:
            alert('你不具备添加权限，请联系网站高级管理员。');
            return false;
        case -5:
            alert('你不具备修改权限，请联系网站高级管理员。');
            return false;
        case -6:
            alert('你不具备删除权限，请联系网站高级管理员。');
            return false;
        case -7:
            alert('你不具备审核权限，请联系网站高级管理员。');
            return false;
        case -8:
            alert('你不具备对操作记录的删除权限，请联系网站高级管理员。');
            return false;
        case -20:
            alert('删除数据失败，请联系管理员。');
            return false;
        case -21:
            alert('数据不存在，可能已经被删除。请联系高级管理员。');
            return false;
        case -22:
            alert('系统中已经存在用户名“' + value.Tag[0] + '”，请重新选择。');
            return false;
        case -23:
            alert('系统中已经存在值“' + value.Tag[0] + '”，请重新填写。');
            return false;
        case -24:
            alert('获取SMTP信息失败。');
            return false;
        case -25:
            alert('获取邮件信息失败。');
            return false;
        case -26:
            alert('请选择群发群体。');
            return false;
        case -40:
            alert('用户名或密码填写错误。');
            return false;
        case -41:
            alert('该帐户已被超级管理员停用。请联系超级管理员。');
            return false;
        case -42:
            alert('此IP被限制为禁止登陆。');
            return false;
        case -43:
            alert('加密锁登录失败，请联系管理员或用其它方式登录。');
            return false;
        case -50:
            alert('笔录文件错误。');
            return false;
        case -60:
            alert('图书不存在。');
            return false;
        case -61:
            alert('图书处于借出状态，不能再借。');
            return false;
        case -62:
            alert('图书处于在馆状态，不能进行还书操作。');
            return false;
        case -64:
            alert('档案号在系统中已经存在。');
            return false;
        case -65:
            alert('档案不存在。');
            return false;
        case -66:
            alert('档案处于借出状态，不能再借。');
            return false;
        case -67:
            alert('档案处于在馆状态，不能进行还档操作。');
            return false;
        case -100:
            alert('系统正忙，请稍候再试。');
            return false;
        default:
            alert(value.Tag[0]);
            return false;
    }
}

// 跳转页面到指定位置
function go(url, isparent) {
    if (isparent) {
        window.parent.location.href = url;
    }
    else {
        document.location.href = url;
    }
}


///////////////////////////////////////////////界面控制////////////////////////////////////////////////////
function SupportWindowsKey() {
    $(document).keydown(function (event) {
        if(event.which==91||event.which==92){
            go("/MainFrame.aspx");
        }
    });
}


var isRightMenu = false;
function SupportRightMenu() {
    var menu = "<div class='right' style='display:none;' id='divRightMenu'><div><a id='btnSearch' href='#' class='search'>搜索</a> <a id='btnTask' href='#' class='task'>任务</a> <a id='btnHome' href='/MainFrame.aspx' class='home'>首页</a> <a id='btnMsg' href='#' class='infor'>消息</a> <a id='btnSetting' href='#' class='set'>设置</a></div></div>";
    if($("#divRightMenu").length<=0){
        $("body").append(menu);
    }

    $(document).mousemove(function (event) {
        if (!isRightMenu && event.pageY <= 40 && event.pageX >= $(window).width() - 40) {
            $("#divRightMenu").show();
            $("#divRightMenu").animate({ "right": "+=86px" }, "slow");
            isRightMenu = true;
        }

        if (isRightMenu && event.pageX < $(window).width() - 86) {
            $("#divRightMenu").animate({ "right": "-=86px" }, "slow", function () {
                $("#divRightMenu").hide();
            });
            isRightMenu = false;
        }

    });
}


$(document).ready(function () {
    $("#btnBackDesktop").attr("title", "关闭");
    $("#btnBackDesktop").click(function () {
        go("/MainFrame.aspx");
    });

    $("#ckbItemAll").click(function () {
        var checked = $(this).prop("checked");
        if (checked) {
            $("input[CheckItem]").each(function () {
                $(this).prop("checked", true);
            });
        }
        else {
            $("input[CheckItem]").each(function () {
                $(this).prop("checked", false);
            });
        }

    });
});

function GetCheckItem() {
    var ary = new Array();


    $("input[CheckItem]:checked").each(function () {
        ary.push($(this).attr("CheckItem"));

    });

    return ary.join();
}

function refreshData() {
    $("#btnRefreshData").click();
}


function showDialog(url, width, height, title, isdialog) {

    if (isdialog) {
        window.ymPrompt.win(url, width, height, title, null, null, null, true, null, null, true, false, true,false,true,false);
    }
    else {
        top.window.ymPrompt.win(url, width, height, title, null, null, null, true, null, null, true, false, true);
    }
}

function getInnerHeight() {
    return $(window).innerHeight();
}


/////////////////////////////////////////////////////列表///////////////////////////////////////////////////////
function senfe(o, a, b, c, d) {
    var t = document.getElementById(o).getElementsByTagName("tr");
    for (var i = 0; i < t.length; i++) {
        t[i].style.backgroundColor = (t[i].sectionRowIndex % 2 == 0) ? a : b;
        t[i].onclick = function () {
            if (this.x != "1") {
                this.x = "1"; //本来打算直接用背景色判断，FF获取到的背景是RGB值，不好判断
                this.style.backgroundColor = d;
                this.style.fontWeight = "bold";
            } else {
                this.x = "0";
                this.style.backgroundColor = (this.sectionRowIndex % 2 == 0) ? a : b;
                this.style.fontWeight = "normal";
            }
        }
        t[i].onmouseover = function () {
            if (this.x != "1") this.style.backgroundColor = c;
        }
        t[i].onmouseout = function () {
            if (this.x != "1") this.style.backgroundColor = (this.sectionRowIndex % 2 == 0) ? a : b;
        }
    }
}