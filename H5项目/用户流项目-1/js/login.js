var email_able_click = 0;//0代表注册按钮不可点击,1可点击
var psd_able_click = 0;//0代表注册按钮不可点击,1可点击

$(document).ready(function(){
	//自动填充密码
	if ($.cookie("UBKrmbUser") == "true") { 
		//对于HTML元素本身就带有的固有属性，在处理时，使用prop方法。
		//对于HTML元素我们自己自定义的DOM属性，在处理时，使用attr方法。
		$("#UBKremember").prop("checked", true); 
		$("#email").val($.cookie("UBKusername")); 
		$("#psd").val($.cookie("UBKpassword")); 
	}
});

//记住用户名密码
function save() {
	if ($("#UBKremember").prop("checked")) { 
		var email = $("#email").val(); 
		var psd = $("#psd").val(); 
		$.cookie("UBKrmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie 
		$.cookie("UBKusername", email, { expires: 7 }); 
		$.cookie("UBKpassword", psd, { expires: 7 }); 
	}else{
		$.cookie("UBKrmbUser", "false", { expire: -1 });
		$.cookie("UBKusername", "", { expires: -1 });
		$.cookie("UBKpassword", "", { expires: -1 });
	}
};

//登录
function login(){
	//校验是否为邮箱
	 if($("#email").val()=="" || $("#email").val().length == 0)
	  {
	   	$(".email_error").text("请输入账户ID或注册邮箱");
		$(".email_error").show();
		$("#email").css("background","url(img/login/wrong2.png) no-repeat left");
		email_able_click = 0;
	  }
	  if($("#psd").val()=="" || $("#psd").val().length == 0)
	  {
		$(".psd_error").text("请输入密码");
		$(".psd_error").show();
		$("#psd").css("background","url(img/login/wrong2.png) no-repeat left");
		email_able_click = 0;
	  }
	 
	var email = $("#email").val();
	var psd = $("#psd").val();
	if ((email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{1,5}){1,5})$/) || email.match(/^[A-Za-z0-9]{10}$/)) && (psd.length > 5 && psd.length < 21)) {
		email_able_click = 1;
	}
	if (email_able_click){
		alert(1);
		var email=$("#email").val();
	  	//发送请求登录
	  	var param={email:$("#email").val(),psd:$("#psd").val()};
		$.ajax({
            type:'POST',
            dataType:'json',
            contentType:'application/json',
            url:'./login',
            data:JSON.stringify(param),
            success:function(msg){
                if(msg.retcode == 0){
					//保存用户名和密码
					save();
                }else{
                		$("#login_error").css('visibility','visible');
                	}
            	},
            error:function(){
                	
            }
        });
	} else{
		alert("不可登录");
	}
}

//账号输入框
$("#email").focus(function(){
	$("#email").css("background","url(img/login/enter.png) no-repeat left");
	$(".email_error").hide();
});
$("#email").blur(function(){
	var email=$("#email").val();
	if (email.length == 0) {
		$("#email").css("background","url(img/login/user.png) no-repeat left");
		email_able_click = 0;
		return;
	} else{
		if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{1,5}){1,5})$/) && !email.match(/^[A-Za-z0-9]{10}$/)){
			$("#email").css("background","url(img/login/wrong.png) no-repeat left");
			$(".email_error").show();
			email_able_click = 0;
		}else{
			$("#email").css("background","url(img/login/user.png) no-repeat left");
			email_able_click = 1;
		}
		return false;
	}
});

//密码输入框
$("#psd").focus(function(){
	$("#psd").css("background","url(img/login/enter2.png) no-repeat left");
	$(".psd_error").hide();
});
$("#psd").blur(function(){
	var psd = $("#psd").val();
	if (psd.length == 0){
		$("#psd").css("background","url(img/login/user2.png) no-repeat left");
		$(".psd_error").hide();
		psd_able_click = 0;
		return;
	} else{
		if (psd.length < 6 || psd.length > 20) {
			$("#psd").css("background","url(img/login/wrong2.png) no-repeat left");
			$(".psd_error").show();
			psd_able_click = 0;
		}else{
			$("#psd").css("background","url(img/login/user2.png) no-repeat left");
			$(".psd_error").hide();
			psd_able_click = 1;
		}
		return false;
	}
});