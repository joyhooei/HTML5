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

 //回车时，默认是登陆
 function on_return(){
	if(window.event.keyCode == 13){
		$("#login").click();
	}
}



//登录
function login(){
	//校验是否为邮箱
	 if($("#email").val()=="" || $("#email").val().length == 0)
	  {
	   	$(".email_error").text("请输入注册邮箱").show();
		$("#email").css({'border': '1px solid #ff4848','border-left':' none'}).prev().css({'border': '1px solid #ff4848','background':'url(img/login/wrong.png) no-repeat center'});
		email_able_click = 0;
	  }
	  if($("#psd").val()=="" || $("#psd").val().length == 0)
	  {
		$(".psd_error").text("请输入密码").show();
		$("#psd").css({'border': '1px solid #ff4848','border-left':' none'}).prev().css({'border': '1px solid #ff4848','background':'url(img/login/wrong2.png) no-repeat center'});
		email_able_click = 0;
	  }
	 
	var email = $("#email").val();
	var psd = $("#psd").val();
	if ((email.match(/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{1,5}){1,5})$/) || email.match(/^[A-Za-z0-9]{10}$/)) && (psd.length > 5 && psd.length < 21)) {
		email_able_click = 1;
	}
	if (email_able_click){
		var email=$("#email").val();
		var psd = $("#psd").val();
	  	if (email == "admin@feelwx.com" && psd == "Flwx.1118") {
	  		location.href = "sensitiveList.html";
	  	} else{
	  		alert("注册邮箱或密码错误");
	  	}
	} else{
		alert("不可登录");
	}
}

//账号输入框
$("#email").focus(function(){
	$("#email").css({'border': '1px solid #2e536c','border-left':' none'}).prev().css({'border': '1px solid #2e536c','background':'url(img/login/enter.png) no-repeat center'});
	$(".email_error").hide();
});
$("#email").blur(function(){
	var email=$("#email").val();
	if (email.length == 0) {
		$("#email").css({'border': '1px solid #a0b9c9','border-left':' none'}).prev().css({'border': '1px solid #a0b9c9','background':'url(img/login/user.png) no-repeat center'});
		email_able_click = 0;
		return;
	} else{
		if(!email.match(/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{1,6}){1,6})$/)){
			$("#email").css({'border': '1px solid #ff4848','border-left':' none'}).prev().css({'border': '1px solid #ff4848','background':'url(img/login/wrong.png) no-repeat center'});
			$(".email_error").text("请输入正确的邮箱地址").show();
			email_able_click = 0;
		}else{
			$("#email").css({'border': '1px solid #a0b9c9','border-left':' none'}).prev().css({'border': '1px solid #a0b9c9','background':'url(img/login/user.png) no-repeat center'});
			email_able_click = 1;
		}
		return false;
	}
});

//密码输入框
$("#psd").focus(function(){
	$("#psd").css({'border': '1px solid #2e536c','border-left':' none'}).prev().css({'border': '1px solid #2e536c','background':'url(img/login/enter2.png) no-repeat center'});
	$(".psd_error").hide();
});
$("#psd").blur(function(){
	var psd = $("#psd").val();
	if (psd.length == 0){
		$("#psd").css({'border': '1px solid #a0b9c9','border-left':' none'}).prev().css({'border': '1px solid #a0b9c9','background':'url(img/login/user2.png) no-repeat center'});
		$(".psd_error").hide();
		psd_able_click = 0;
		return;
	} else{
		if (psd.length < 6 || psd.length > 20) {
			$("#psd").css({'border': '1px solid #ff4848','border-left':' none'}).prev().css({'border': '1px solid #ff4848','background':'url(img/login/wrong2.png) no-repeat center'});
			$(".psd_error").text('请输入6-20位密码').show();
			psd_able_click = 0;
		}else{
			$("#psd").css({'border': '1px solid #a0b9c9','border-left':' none'}).prev().css({'border': '1px solid #a0b9c9','background':'url(img/login/user2.png) no-repeat center'});
			$(".psd_error").hide();
			psd_able_click = 1;
		}
		return false;
	}
});