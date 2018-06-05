//头
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

//渲染content的高度
$('.wrapper1200').ready(function(){
	var wrapperH = $(document).height() - 180;
	$('.wrapper1200').css('min-height',wrapperH);
	
	
	// 每隔一秒检查充值是否成功
	  var param = {
	    type : "post",
		dataType:'json',
	    async : false, //同步请求
	    url : '../../getTradeStatus',
	    data : {'pramas':1},
	    success : function(data) {
	      if (data.success == 1) {
	        	if(data.isread == 0){
	        		$('#have_letter').css('display','none');
	        	}
	      }
	    }
	  };
	  var timer = window.setInterval(function() {
	  	var params = {'typeValue' : $('select').val(), 'pageNum' : 1, 'pageSize' : 20};
	    $.ajax(param);
	  }, 100000);
});

////点击下拉收起事件
//var selectId;
//function lookLetter(idStr){
//	selectId = idStr;
//	if ($('#'+idStr).hasClass('letter_unread')) {
//		$('#'+idStr).removeClass('letter_unread').addClass('letter_read');
//	}
//	$('#'+idStr).next().collapse('toggle');
//}
//$('.collapse').on('show.bs.collapse', function () {
//	$('#'+selectId).find('img').attr('src','img/public/icon_up.png');
//});
//$('.collapse').on('hide.bs.collapse', function () {
//	$('#'+selectId).find('img').attr('src','img/public/icon_down.png');
//});


//点击下拉收起事件
function lookLetter(idStr){
	if ($('#'+idStr).hasClass('open')) {
		$('#'+idStr).removeClass('open').next().collapse('hide');
		$('#'+idStr).find('img').attr('src','img/public/icon_down.png');
	} else{
		$('#'+idStr).addClass('open').next().collapse('show');
		$('#'+idStr).find('img').attr('src','img/public/icon_up.png');
	}
	
	if ($('#'+idStr).hasClass('letter_unread')) {
		$('#'+idStr).removeClass('letter_unread').addClass('letter_read');
		//上报已读
	}
}

//选择信的状态
$('select').change(function(){
	
	var params = {'typeValue' : $('select').val(), 'pageNum' : 1, 'pageSize' : 20};
	$.ajax({
        type : "post",
		dataType:'json',
	    async : false, //同步请求
	    url : '../../getTradeStatus',
	    data : JSON.stringify(params),
	    success : function(data) {
	      if (data.success == 1) {
	        	//创建表格
	      }
	    }
    });
});