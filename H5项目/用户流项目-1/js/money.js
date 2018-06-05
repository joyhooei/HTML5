$(document).ready(function(){
	$('.money').addClass("active_header");
	
});


//点击提交汇款信息按钮事件
function clickSubmitMoneyMsgBtn(){
	layer.open({
	  type: 2,
	  title: "提交汇款信息",
	  closeBtn: 1,
	  shadeClose: true,
	  skin: 'yourclass',
	  area: ['700px', '480px'],
	  content: ['moneyLayer.html', 'no'],//iframe的url，no代表不显示滚动条
	});
};

//鼠标移入问号时tips小提示框交互
$('.icon_question').mouseenter(function(){
	layer.tips('充值后推广顾问将联系您确认发票信息，并在3个工作日内寄出。', '.icon_question', {tips: [2, '#FFF'],time:222220});
	$('.layui-layer-content').css({'color':"#777","width":"500px","height":"80px","lineHeight":"73px","box-shadow": "0px 3px 25px rgba(0,0,0,0.2)","text-align": "center"});
}).mouseleave(function(){layer.close(layer.index)});

$(".company").hover(function(){
	$(".company ul").slideToggle();
});
$(".ubk-person").hover(function(){
	$(".ubk_per_card").slideToggle();
});

function toMoneyCenter(){
	window.location.href = "money.html";
	$(".data").removeClass("active");
	$('.money').addClass("active");
}
function toDataCenter(){
	window.location.href = "data.html";
	$(".money").removeClass("active");
	$('.data').addClass("active");
}


var price = 2600;
function choicePrice(money,idStr){
	$(".other_money_box").addClass("hide");
	$('#pay_btn_box').css('margin-top','35px');
	$("#price1").removeClass("price_item_active");
	$("#price2").removeClass("price_item_active");
	$("#price3").removeClass("price_item_active");
	$("#"+idStr).addClass("price_item_active");
	$('.pay_btn').removeClass('pay_btn_disabled');
	price = money;
}

function choiceOtherPrice(money){
	if(money > 0){
		price = money;
		$('.pay_btn').removeClass('pay_btn_disabled');
	}
	
}

function chioceOtherPriceBtn(){
	$("#price1").removeClass("price_item_active");
	$("#price2").removeClass("price_item_active");
	$(".other_money_box").removeClass("hide");
	$("#price3").addClass("price_item_active");
	$('.pay_btn').addClass('pay_btn_disabled');
	$('#pay_btn_box').css('margin-top','10px');
}

//点击支付宝充值
function doPay(){
	if ($('.pay_btn').hasClass('pay_btn_disabled')) {
		return;
	} else{
		var param={num:price};
	    $('.loading_img').removeClass('hide');
	        
		$.ajax({
	        type:'POST',
	        dataType:'json',
	        contentType:'application/json',
	        url:'./pay',
	        data:JSON.stringify(param),
	        success:function(msg){
	            if(msg.retcode == 0){
					$('.loading_img').addClass('hide');
	            		$('#form_data').html(msg.form);
	            }else{
	            		alert("支付发生错误");
	            	}
	        	},
	        error:function(){
	            	$('.loading_img').addClass('hide');
	            	alert("支付发生错误");
	        }
	    });
	}
	    
}

//点击微信充值
function doWepay(){
	if ($('.pay_btn').hasClass('pay_btn_disabled')) {
		return;
	} else{
	    var param={appid:10000,num:price};
	    $('.loading_img').removeClass('hide');
	
	    $.ajax({
	        type:'POST',
	        dataType:'json',
	        contentType:'application/json',
	        url:'./pay',
	        data:JSON.stringify(param),
	        success:function(msg){
	            if(msg.retcode == 0){
					$('.loading_img').addClass('hide');
	            		location.href = './views/wepay.html?codeUrl='+msg.codeUrl+'&outTradeNo='+msg.outTradeNo+'&fee='+msg.fee;
	            }else{
	            		alert("支付发生错误");
	            	}
	        	},
	        error:function(){
	            	$('.loading_img').addClass('hide');
	            	alert("支付发生错误");
	        }
	    });
	}
};

//图片上传
var imgSrc;
var imgH;
//图片上传预览    IE是用了滤镜。
function previewImage(file)
{
  var MAXWIDTH  = 285; 
  var MAXHEIGHT = 130;
  var div = document.getElementById('preview');
  
  if (file.files && file.files[0])
  {
      div.innerHTML ="<img id=imghead>";
      var img = document.getElementById('imghead');             
      var reader = new FileReader();
      reader.onload = function(evt){
      	img.src = evt.target.result;
      	imgSrc = evt.target.result;
      	imgH = img.height;
      	img.height = MAXHEIGHT;
      }
      
      reader.readAsDataURL(file.files[0]);
		
  }
}

//查看原图
function lookFullImg(imgSrc){
	$('.look_full_img img').attr('src',imgSrc);
	var winH = $(window).height();
	var marginTop;
	if (imgH >= winH) {
		marginTop = 0;
		$('.look_full_img img').css('height',winH);
	}else{
		marginTop = (winH - imgH) / 2 - 100;
	}
	
	$('.look_full_img img').css('margin-top',marginTop);
	$('.look_full_img').show();
}
function closeFullImg(){
	$('.look_full_img').hide();
}

//公对公充值页面
$('.huikuan_alert_box').ready(function(){
	$(".select_no_msg").css('display','none');
});
//选择是
function selectTrue(){
	$(".select_no_msg").css('display','none');
	$('#company_card_layer').css('display','inline-block');
	$('.huikuan_demo_jpg').css('display','inline-block');
}
//选择否
function selectFalse(){
	$(".select_no_msg").css('display','block');
	$('#company_card_layer').css('display','none');
	$('.huikuan_demo_jpg').css('display','none');
}

function layerSubmit(){
//	alert($('#huikuan_number').val()+100);
	var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	parent.layer.close(index);
}
function layerCancel(){
	var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	parent.layer.close(index);
}

//删除汇款底单
function deleteImg(){
	$('#preview').html("<img src='img/account/up.png'/><p>点击上传营业执照<br />（有年检章,.jpg/.png格式，小于5M）</p>");
}