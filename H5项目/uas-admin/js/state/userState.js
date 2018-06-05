////////////////////////-accountList.html-////////////////////////////////
$("#header").load("../nav.html #header");
$("#nav").load("../nav.html #navbar", function(){
  //加载菜单UI
  $("#navbar ul li:first-child dd:first-child").addClass("layui-this");
});	
$("#footer").load("../nav.html #footer");

//layUI 控制区
layui.use(['element', 'form'], function() {
	var element = layui.element,
			form = layui.form;
			
			//产品code选中事件
			form.on('select(productCodeId)', function(data){
			  console.log(data);
			  var productCode = $("#productCodeId").val();
			  var appId = $("#appId").val();
			  console.log(data);	
			  initData(appId,productCode);
			});
			
			//appID选中事件
			form.on('select(appId)', function(data){
			  console.log(data);
			  var productCode = $("#productCodeId").val();
			  var appId = $("#appId").val();
			  initData(appId,productCode);
			});
});


$(function(){
	var appId = "";
	var productCode = "";
	initData(appId,productCode);
});

// 获取用户数据
function initData(appId,productCode) {
	$.post('http://getUserCount',{"appId":appId, "productCode":productCode}, function(result) {
		var count = result.Data.count;
		$("#userCountId").html(count);
	}, 'json')
};
