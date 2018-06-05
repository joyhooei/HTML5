//统计数据
function countData(num) {
  var xmlHttp;
  if (window.ActiveXObject) {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
  } else {
      if (window.XMLHttpRequest) {
          xmlHttp = new XMLHttpRequest();
      }
  }
  xmlHttp.open("GET", "./CountIP?page_id=" + num + "&channel_id=10");
      xmlHttp.send();
  }

$(document).ready(function(){
	//预加载loading图片
    	preloadImg();
});


//记录三个输入框的内容是否正确
var duihuanStatus = false;
var QQStatus = false;
var yanzhengStatus = false;
var clickStatus = false;//是否能点击注册


//显示灰色 jQuery 遮罩层 
function showBg() {
	openLoading();
	if (clickStatus == true) {
		var bh = $("#contentID").height(); 
		var bw = $("body").width(); 
		var qqNumber = document.getElementById("inputQQ").value;
		//改变QQ号
		document.getElementById("qqNumber").innerText = qqNumber;
		
		$(".fullbg").css({ 
			height:bh, 
			width:bw, 
			display:"block" 
			}); 
		$("#dialog").show(); 
	}
	closeLoading();
} 
function showBgWithResult(msg) {
	openLoading();
	var bh = $("#contentID").height(); 
	var bw = $("body").width(); 

	$(".fullbg").css({ 
		height:bh,
		width:bw, 
		display:"block" 
		});
	if (msg == 10000) {
		document.getElementById("message").innerText = '恭喜您\n充值成功！';
		document.getElementById('chicken').src = 'img/pingan_e_QB/duihuan/chick1.png';
		countData(514);
	} else{
		document.getElementById("message").innerText = msg;
		document.getElementById('chicken').src = 'img/pingan_e_QB/duihuan/chick2.png';
		countData(515);
	}
	$("#resultMessage").show(); 
	closeLoading();
}

//关闭灰色 jQuery 遮罩 
function closeBg1() { 
	$(".fullbg,#dialog").hide(); 
}
function closeBg2() { 
	$(".fullbg,#resultMessage").hide(); 
}

//提交兑换
function submit() {
	
	closeBg1();
	openLoading();
	
	var cdkey = document.getElementById("inputDuihuan").value;
	var qq = document.getElementById("inputQQ").value;
	var security = document.getElementById("inputYanzheng").value;
		
	//post请求
	var param={cdkey:cdkey,qq:qq,security:security};                        
	$.ajax({
    type:'POST',
    dataType:'json',
    contentType:'application/json',
    url:'cd_key_servlet',
    data:JSON.stringify(param),

    success:function(retcode){
		closeLoading();
        	switch (retcode){
        		case 10000:
        			showBgWithResult(10000);
        			break;
        		case 10001:
        			showBgWithResult('QQ号不正确\n请重新输入！');
        			break;
        		case 10002:
        			showBgWithResult('兑换码已失效\n请重新输入！');
        			break;
        		case 10003:
        			showBgWithResult('该QQ号已参与活动\n不能重复参加！');
        			break;
        		case 10004:
        			showBgWithResult('兑换码不存在\n请重新输入！');
        			break;
        		case 10005:
        			showBgWithResult('兑换码存在非法字符\n请重新输入！');
        			break;
        		case 10006:
        			showBgWithResult('验证码错误\n请重新输入！');
        			break;
        		case 10007:
        			showBgWithResult('参数错误\n请重新输入！');
        			break;
        		case 20000:
        			showBgWithResult('系统出错\n请重试！');
        			break;
        		default:
        			break;
        		}
        	changeImage();
       },
    
    error:function(XMLHttpRequest){
    		closeNetworkLoading();
        //请求出错处理
		if (XMLHttpRequest.status >= 400 && XMLHttpRequest.status < 500) {
			showBgWithResult('您的网络不给力\n请重试！');
		} else if(XMLHttpRequest.status >= 500){
			showBgWithResult('服务器出错\n请重试！');
		}
       },

   });

}

//兑换码输入框：每输入一个字符验证是否为字母
function inputDuihuanChange(){
	var duihuanNumber = document.getElementById("inputDuihuan").value;
	if (duihuanNumber.length) {
		for (var i = 0; i < duihuanNumber.length; i++) {
			var charSet = duihuanNumber.charCodeAt(i);
			if ((charSet >= 65 && charSet <= 90) || (charSet >= 97 && charSet <= 122)) {
				//输入正常
				document.getElementById("warnImg").style.display = "none";
				document.getElementById("warnWord").textContent = "";
			} else{
				document.getElementById("warnImg").style.display = "inline-block";
				document.getElementById("warnWord").textContent = "请输入正确的兑换码";
				break;
			}
		}
	} else{
		document.getElementById("warnWord").textContent = "请输入兑换码";
		document.getElementById("warnImg").style.display = "inline-block";
	}
	changeSubmitButtonStatus();
}
//兑换码输入框：失焦后检查输入的位数
function checkDuihuanLength(){
	var duihuanNumber = document.getElementById("inputDuihuan").value;
	if (duihuanNumber.length == 0) {
		document.getElementById("warnWord").textContent = "请输入兑换码";
		document.getElementById("warnImg").style.display = "inline-block";
		duihuanStatus = false;
	}else if (duihuanNumber.length != 0 && duihuanNumber.length < 16){
		document.getElementById("warnWord").textContent = "请输入正确的兑换码";
		document.getElementById("warnImg").style.display = "inline-block";
		duihuanStatus = false;
				
	}else{
		for (var i = 0; i < duihuanNumber.length; i++) {
			var charSet = duihuanNumber.charCodeAt(i);
			if ((charSet >= 65 && charSet <= 90) || (charSet >= 97 && charSet <= 122)) {
				//输入正常
				document.getElementById("warnImg").style.display = "none";
				document.getElementById("warnWord").textContent = "";
				if (i == 15) {
					//兑换状态正常
					duihuanStatus = true;
				}else{
					duihuanStatus = false;
				}
			} else{
				document.getElementById("warnImg").style.display = "inline-block";
				document.getElementById("warnWord").textContent = "请输入正确的兑换码";
				duihuanStatus = false;
				break;
			}
		}
	}
//	console.dir("duihuanStatus = " + duihuanStatus);
	changeSubmitButtonStatus();
}

//QQ输入框：每输入一个字符验证是否为数字
function inputQQChange(){
	var QQNumber = document.getElementById("inputQQ").value;
	if (QQNumber.length) {
		for (var i = 0; i < QQNumber.length; i++) {
			var charSet = QQNumber.charCodeAt(i);
			if (charSet >= 48 && charSet <= 57) {
				//输入正常
				document.getElementById("warnImg2").style.display = "none";
				document.getElementById("warnWord2").textContent = "";

			} else{
				document.getElementById("warnImg2").style.display = "inline-block";
				document.getElementById("warnWord2").textContent = "格式错误";
				break;
			}
		}
	} else{
		document.getElementById("warnImg2").style.display = "inline-block";
		document.getElementById("warnWord2").textContent = "请输入QQ号";
	}
	changeSubmitButtonStatus();
}

//QQ输入框：失焦后检查QQ的位数
function checkQQLength(){
	var QQNumber = document.getElementById("inputQQ").value;
	if (QQNumber.length == 0) {
		document.getElementById("warnImg2").style.display = "inline-block";
		document.getElementById("warnWord2").textContent = "请输入QQ号";
		QQStatus = false;
	}else if (QQNumber.length <= 4){
		
		for (var i = 0; i < QQNumber.length; i++) {
			var charSet = QQNumber.charCodeAt(i);
			if (charSet >= 48 && charSet <= 57) {
				//输入正常
				document.getElementById("warnImg2").style.display = "inline-block";
				document.getElementById("warnWord2").textContent = "请输入正确QQ号";
			} else{
				document.getElementById("warnImg2").style.display = "inline-block";
				document.getElementById("warnWord2").textContent = "格式错误";
				break;
			}
		}
		QQStatus = false;
	}else{
		for (var i = 0; i < QQNumber.length; i++) {
			var charSet = QQNumber.charCodeAt(i);
			if (charSet >= 48 && charSet <= 57) {
				//输入正常
				document.getElementById("warnImg2").style.display = "none";
				document.getElementById("warnWord2").textContent = "";
				if (i == QQNumber.length - 1) {
					//QQ号状态正常
					QQStatus = true;
				}else{
					QQStatus = false;
				}
			} else{
				document.getElementById("warnImg2").style.display = "inline-block";
				document.getElementById("warnWord2").textContent = "格式错误";
				QQStatus = false;
				break;
			}
		}
	}
//	console.dir("QQStatus = " + QQStatus);
	changeSubmitButtonStatus();
}

//刷新验证码
function changeImage(){
	var imageUrl = "get_security";
	document.getElementById("image").src= imageUrl +'?'+ Math.random();
	//?"+Math.random() 后面加一个随机参数刷新时就会再次请求验证码，否则会从缓存中取
}

//验证码输入框：去掉数字以外的其他字符
function inputYanzhengChange(){
	//去掉数字以外的其他字符
	document.getElementById("inputYanzheng").value = document.getElementById("inputYanzheng").value.replace(/\D/g,'');
	//如果验证码四位数就记下状态
	if (document.getElementById("inputYanzheng").value.length == 4) {
		yanzhengStatus = true;
	}else{
		yanzhengStatus = false;
	}
//	console.dir("yanzhengStatus = " + yanzhengStatus);
	changeSubmitButtonStatus();
}

function changeSubmitButtonStatus(){
	if (duihuanStatus && QQStatus && yanzhengStatus) {
		clickStatus = true;
	}else{
		clickStatus = false;
	}
//	console.dir("clickStatus = " + clickStatus);
}

function openLoading(){
	$("#network_loading").show();
}

function closeLoading(){
	$("#network_loading").hide();
}

//loading图片预加载
function preloadImg() {
    var img = new Image();
    img.src = "img/pingan_e_QB/loading_bg.gif";
}