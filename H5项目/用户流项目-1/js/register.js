var email_able_click = 0;//0代表注册按钮可点击,1不可点击
var psd1_able_click = 0;//0代表注册按钮可点击,1不可点击
var psd2_able_click = 0;//0代表注册按钮可点击,1不可点击
//60s倒计时
function setTimeOutFun(){
	//验证码倒计时
	var countdown = 60; 
	function settime(val) { 
		var timeout = setTimeout(function() { 
			settime($("#send_again"))
		},1000) 
		
		if (countdown == 0) { 
			val.attr("href","javacript:;");
			val.attr("onclick","sendCaptchaAgain()");
			val.text("重新发送  "); 
			clearTimeout(timeout);
		} else { 
			val.removeAttr("href");
			val.removeAttr("onclick");
			countdown--; 
			val.text("重新发送  " + countdown); 
		} 
  	}
	settime($("#send_again"));
}

//重新发送
function sendCaptchaAgain(){
	setTimeOutFun();
	alert("已经发送，请查收。");
}

function toEmail(){
	var email = $("#reg_email").val();
	var arr = email.split("@");
	if (arr.length > 1) {
		email = "http://mail." + arr[1];
		window.open(email);
	}
}

//校验邮箱
$("#reg_email").focus(function(){
	$("#reg_email").css("border-color","#2e536c");
	$("#email_msg").hide();
	return false;
});
$("#reg_email").blur(function(){
	var email=$("#reg_email").val();
	if (email.length == 0) {
		$("#reg_email").css("border-color","#A1B9C8");
		email_able_click = 1;//注册按钮不可点击
		return;
	} else{
		if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{1,6}){1,6})$/)){
			$("#reg_email").css("border-color","#ff4848");
			$("#email_msg").text("请输入正确的邮箱地址");
			$("#email_msg").show();
			email_able_click = 1;//注册按钮不可点击
		}else{
			$("#reg_email").css("border-color","#A1B9C8");
			email_able_click = 0;//注册按钮可点击
		}
		return false;
	}
});
			
//密码框
$("#psd_1").focus(function(){
	$("#psd_1").css("border-color","#2e536c");
	$("#psd1_msg").css("color","#2e536c");
	$("#psd1_msg").show();
	return false;
});

$("#psd_1").blur(function(){
	var psd = $("#psd_1").val();
	if (psd.length == 0) {
		$("#psd_1").css("border-color","#A1B9C8");
		$("#psd1_msg").hide();
		psd1_able_click = 1;//注册按钮不可点击
		return;
	} else{
		if (psd.length < 6 || psd.length > 20) {
			$("#psd_1").css("border-color","#ff4848");
			$("#psd1_msg").css("color","#ff4848");
			$("#psd1_msg").show();
			psd1_able_click = 1;//注册按钮不可点击
		}else{
			$("#psd1_msg").hide();
			$("#psd_1").css("border-color","#A1B9C8");
			if ($("#psd_2").val().length == 0) {
				psd1_able_click = 0;//注册按钮可点击
			}else{
				if (psd == $("#psd_2").val()) {
					$("#psd_2").css("border-color","#A1B9C8");
					$("#psd2_msg").hide();
					psd2_able_click = 0;//注册按钮可点击
				}else{
					$("#psd_2").css("border-color","#ff4848");
					$("#psd2_msg").text("两次输入的密码不一致");
					$("#psd2_msg").show();
					psd2_able_click = 1;//注册按钮不可点击
				}
			}
		}
		return;
	}
});
//第二密码框
$("#psd_2").focus(function(){
	$("#psd_2").css("border-color","#2e536c");
	$("#psd2_msg").hide();
	return false;
});

$("#psd_2").blur(function(){
	var psd1 = $("#psd_1").val();
	var psd2 = $("#psd_2").val();
	if (psd2.length == 0) {
		$("#psd_2").css("border-color","#A1B9C8");
		$("#psd2_msg").hide();
		psd2_able_click = 1;//注册按钮不可点击
		return;
	} else{
		if (psd1 == psd2) {
			$("#psd_2").css("border-color","#A1B9C8");
			$("#psd2_msg").hide();
			psd2_able_click = 0;//注册按钮可点击
		}else{
			$("#psd_2").css("border-color","#ff4848");
			$("#psd2_msg").text("两次输入的密码不一致");
			$("#psd2_msg").show();
			psd2_able_click = 1;//注册按钮不可点击
		}
	}
});

//注册
function nextStep(){
	var email=$("#reg_email").val();
	var psd_1 = $("#psd_1").val();
	var psd_2 = $("#psd_2").val();
	
	if (email == "" || email.length == 0) {
		$("#email_msg").text("请输入邮箱地址");
		$("#email_msg").show();
		email_able_click = 1;
	}
	if(psd_1 == "" || psd_1.length == 0){
		$("#psd1_msg").text("请输入密码");
		$("#psd1_msg").css("color","#ff4848");
		$("#psd1_msg").show();	
		psd1_able_click = 1;
	}
	if(psd_2 == "" || psd_2.length == 0){
		$("#psd2_msg").text("请再次输入密码");
		$("#psd2_msg").show();
		psd2_able_click = 1;
	}
	if (email_able_click == 1 || psd1_able_click == 1 || psd2_able_click == 1) {
		return;
	}
	if (psd_1.length < 6 || psd_1.length > 20 || psd_2.length < 6 || psd_2.length > 20 || psd_1 != psd_2) {
		return;
	}
	 
	 //这段应该放在post请求成功回调里面，暂时放在这方便调试。
			 	$(".send_captcha").show();
				$(".register").hide();
				//更改第二步的邮箱
				$(".send_captcha h2 a").text(email);
				setTimeOutFun();
	 
//	var param={email:email,psd:psd_1};
//	alert(email);
//	$.ajax({
//      type:'POST',
//      dataType:'json',
//      contentType:'application/json',
//      url:'./register',
//      data:JSON.stringify(param),
//      success:function(msg){
//          if(msg.retcode == 0){
//				
//          }else{
//          		alert("账号或密码错误");
//          	}
//      	},
//      error:function(){
//          	
//      }
//  });
}