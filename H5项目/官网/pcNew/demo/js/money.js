$(document).ready(function(){
	$('.money').addClass("active_header_red");
	
});


//点击提交汇款信息按钮事件
function clickSubmitMoneyMsgBtn(){
	//接受后端返回的今日提交次数
	        		var submitTimes = 2;
	        		
	   			layer.open({
				  type: 2,
				  title: "提交汇款信息",
				  closeBtn: 1,
				  shadeClose: true,
				  skin: 'yourclass',
				  area: ['700px', '510px'],
				  content: ['moneyLayer.html#'+submitTimes, 'no'],//iframe的url，no代表不显示滚动条
				});
	
};

//鼠标移入问号时tips小提示框交互
$('.icon_question').mouseenter(function(){
	layer.tips('充值后推广顾问将联系您确认发票信息，并在3个工作日内寄出。', '.icon_question', {tips: [2, '#FFF'],time:222220});
	$('.layui-layer-content').css({'color':"#777","width":"500px","height":"80px","lineHeight":"73px","box-shadow": "0px 3px 25px rgba(0,0,0,0.2)","text-align": "center"});
}).mouseleave(function(){layer.close(layer.index)});

$(".company").hover(function(){
	$(".company ul").stop(true, false).slideToggle();
});
$(".ubk-person").hover(function(){
	$(".ubk_per_card").stop(true, false).slideToggle();
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
	$('#price').val('');
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

function checkInputNumber(money){
	var re = /^\d+(?=\.{0,1}\d+$|$)/;
	money = returnFloat(money);
	$('#price').val(money);
	if (re.test(money) && money != 0) {
		$('.pay_btn').removeClass('pay_btn_disabled');
	}else{
		$('.pay_btn').addClass('pay_btn_disabled');
	}
}
//截取小数点后两位
function returnFloat(value){
 	var xsd=value.toString().split(".");
	if(xsd.length>1){
		 if(xsd[1].length>2){
			var b = xsd[1].substring(0,2);
		  	value=xsd[0].toString() + '.' + b.toString();
			return parseFloat(value);
		 }
	 }
	return value;
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
	            		layer.msg("此Demo不支持充值操作");
	            	}
	        	},
	        error:function(){
	            	$('.loading_img').addClass('hide');
	            	layer.msg("此Demo不支持充值操作");
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
	            		layer.msg("此Demo不支持充值操作");
	            	}
	        	},
	        error:function(){
	            	$('.loading_img').addClass('hide');
	            	layer.msg("此Demo不支持充值操作");
	        }
	    });
	}
};

//公对公充值页面
$('.huikuan_layer.msg_box').ready(function(){
	$(".select_no_msg").css('display','none');
});

