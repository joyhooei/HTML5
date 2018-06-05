

/**
 * Created with IntelliJ IDEA.
 * User: mingxianjun
 * Date: 16-5-16
 * Time: 下午8:55
 */
;(function(){
    //load html
    $('.load-template-html').each(function(i){
        var self=$(this);
        var _src=self.attr('data-src');
        if(_src){
            $.ajax({
                dataType:'html',
                url:_src,
                success:function(data){
                    console.log('%c load html template success','color:green');
                    self.html(data);
                    if(_src == 'template/top.html'){
		                	$('#admin_user_name').text(getCookie('admin_user_name'));
		                    }else if(_src == 'template/nav.html'){
		                        Feelwx.selectNavIndex();
		                        //权限控制
//		                        Feelwx.authority();
		                    }
		                },
                error:function(){
                    console.log('%c load template error','color:red');
                }
            });
        }
    });
})();
//error message prompt
var errorCode={
    "login": {'0': '登录成功', '1': '用户名不存在', '2': '密码错误', '3': '验证码错误'},
    "common": {'-1': '超时，重新登录','1': '系统错误', '400': '接口错误', '-4008': '接口错误'},
    "password": {'0': '修改成功', '1': '系统错误', '2': '密码错误'},
    "developer": {'0': '修改成功', '1': '系统错误'},
    "adddeveloper": {"-1": '超时，重新登录', '0': '添加成功', '1': '无权限', '2': '系统错误'}
};
function show_msg(key, value) {
    return (errorCode[key] && errorCode[key][value]) ? errorCode[key][value] : errorCode['common'][value];
}
//util function
window.Feelwx = window.Feelwx || {};
Feelwx.post=function(url,param,call){
    //open loading
    $('.loading_img').removeClass('hide');
    $.ajax({
        url:''+url,
        type:'POST',
        data: $.toJSONString(param),
        contentType:'application/json',
        dataType:'json',
        success:function(msg){
            //close loading
            $('.loading_img').addClass('hide');
            if(msg.retcode == 0){
                call && call(msg);
            }else if(msg.retcode == '-1'){
        	    alert('登录超时，请重新登录');
                location.href='login.html';
            }else{
                alert(show_msg('common',msg.retcode));
            }
        },
        error:function(error){
            //close loading
            $('.loading_img').addClass('hide');
        }
    });
};
Feelwx.get_pre_month_date = function(date) {
    var m = date.getMonth();
    var y = date.getFullYear();
    if (m == 0) {
        y = y - 1;
        m = 11;
    } else {
        m = m - 1;
    }
    return new Date(y, m, 1);
};
Feelwx.init_select=function(){
    //初始化li事件
    $('.input_bg2_ul li').click(function() {
        var a = $(this).parent().siblings('a');
        $(this).parent().hide();
        //是否有改变值
        if ($(this).attr('value') != a.attr('value')) {
            //是否绑定change事件
            a.text($(this).text()).attr('value', $(this).attr('value'));
            if ($(this).parents('.input_bg2_box').data("events")['change']) {
                $(this).parents('.input_bg2_box').change();
            }
        }
    });
    $('.input_bg2 a').click(function() {
        var ul = $(this).siblings('.input_bg2_ul');
        if (ul.is(':hidden')) {
            var len = ul.children().length;
            if (len > 10) {
                ul.height(31 * 10);
                ul.children().width(101);
            } else {
                ul.height(31 * len);
                ul.children().width(117);
            }
            ul.show();
            ul.focus();
        } else {
            ul.height(0);
            ul.hide();
        }
    });
    $('.input_bg2_ul').blur(function() {
        $(this).height(0);
        $(this).hide();
    });
};
Feelwx.get_selected_value=function(id){
    return $(id + ' .input_bg2 a').attr('value');
};
Feelwx.get_selected_text=function(id){
    return $(id + ' .input_bg2 a').text();
};
Feelwx.chooseTimeType={
    time_type:null,
    callback:null,
    _do: function(e, type) {
        this.time_type = type;
        $(e).parent().find("a").each(function(i, _e) {
            if (_e === e) {
                $(_e).addClass("a_ononon");
            } else {
                $(_e).removeClass("a_ononon");
            }
        });
        if (this.callback !== null) {
            this.callback(e,type);
        }
    }
};
Feelwx.logoutLink=function(){
    $.get('logout',function(){
        //清掉所有cookie
        delCookie('ubk_admin_user');
        delCookie('admin_user_name');
        delCookie('product_id');
        delCookie('product_name');
        delCookie('dev_id');
        delCookie('dev_name');
        delCookie('admin_captcha');
        location.href='login.html';
    });
};
