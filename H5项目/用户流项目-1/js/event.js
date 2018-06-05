//头
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

//渲染content的高度
$('.wrapper1200').ready(function(){
	var wrapperH = $(document).height() - 180;
	$('.wrapper1200').css('min-height',wrapperH);
});
//点击下拉收起事件
var selectId;
function lookLetter(idStr){
	selectId = idStr;
	if ($('#'+idStr).hasClass('letter_unread')) {
		$('#'+idStr).removeClass('letter_unread').addClass('letter_read');
	}
	$('#'+idStr).next().collapse('toggle');
}
$('.collapse').on('show.bs.collapse', function () {
  	$('#'+selectId).find('img').attr('src','img/public/icon_up.png');
});
$('.collapse').on('hide.bs.collapse', function () {
  	$('#'+selectId).find('img').attr('src','img/public/icon_down.png');
});

//产品资料页
function openOrCloseMarketBox(stasus_id,data_id,btn_id,box_id,boxH){
	if ($("#"+stasus_id).hasClass('hide')) {
		//显示资料状态，隐藏提交数据box
		$('#'+stasus_id).removeClass('hide');
		$('#'+data_id).addClass('hide');
		$('#'+box_id).css('height','197px');
		$('#'+btn_id).children('span').text('查看详情');
		$('#'+btn_id).children('img').attr('src','img/market/icon_down.png')
	} else{
		//显示提交数据box，隐藏资料状态
		$('#'+data_id).removeClass('hide');
		$('#'+stasus_id).addClass('hide');
		$('#'+box_id).css('height',boxH);
		$('#'+btn_id).children('span').text('收起详情');
		$('#'+btn_id).children('img').attr('src','img/market/icon_up.png');
	}
}

//保存按钮事件
$('#market_save').click(function(){
	alert("保存");
});
//本部分提交审核事件
$('#market_submit').click(function(){
	alert("本部分提交审核");
});

//魅族-已经绑定按钮事件
function alreadyLink(idStr,status,sub_status){
	//提示层
	layer.msg('提交成功');
	$('#'+idStr).css('opacity','0.5').attr("disabled",'disabled');
	//改变状态为审核中
	$('#'+status).text('审核中').removeClass('color_gray_bg').addClass('color_blue_bg');
	$('#'+sub_status).find('h4').text('审核中');
}
//OPPO承诺函模板下载
function downloadOppoData(){
	
}
//vivo授权确认函下载
function downloadVivoData(){
	
}

