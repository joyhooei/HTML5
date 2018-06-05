/********************************************/
/****************导航栏路由*******************/
/********************************************/
$(function() { 
//	$.get("dataState/userState.html", function(data) { 
//		$("#iframeContent").html(data); //初始化加载界面
//		 
//	}); 

//	$("#iframeContent").html(../nav.html);  
	$('#indexNav dd').click(function() { //点击dd加载界面
		 
		var current = $(this),
			 target = current.find('a').attr('target'); // 找到链接a中的target的值
		 
		$.get(target, function(data) {  
			$("#iframeContent").html(data);  
		}); 
	});
});


