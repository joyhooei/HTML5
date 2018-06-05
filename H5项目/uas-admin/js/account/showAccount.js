/////////////////////////////-showAccount.html-///////////////////////////////
$("#header").load("../nav.html #header");
$("#nav").load("../nav.html #navbar", function(){
  //加载菜单UI
  $("#navbar ul li:nth-child(3) dd:first-child").addClass("layui-this");
});	
$("#footer").load("../nav.html #footer");

window.onload=function(){
	initData();
	// 初始化开通数据
    function initData() {
        $.get('http://getAccountList', function (result) {
            $('input[name="accountNo"]').val(result.userInfo.accountNo);
            $('input[name="email"]').val(result.userInfo.email);
            $('input[name="userName"]').val(result.userInfo.userName);
//			            if (result.userInfo.status == 1){
//			            	$('div[name="divStatus"] .layui-unselect').addClass("layui-form-onswitch");
//			            	//$('div[name="divStatus"] .layui-form-switch i').attr("disabled",true);
//			            }
			if(result.userInfo.status = 1){
				$('input[name="status"]').attr('checked',"checked");	
			}
//			            if(result.companyInfo.province="广东省"){
//			            	$("#province option[value='1']").attr("selected", "selected");
//			            }
			$("#demo1").attr('src',result.companyInfo.logoPath);
			$("#province option[value='"+result.companyInfo.province+"']").attr("selected", "selected");
			$("#city option[value='"+result.companyInfo.city+"']").attr("selected", "selected");
            
            $('input[name="companyName"]').val(result.companyInfo.companyName);
            $('input[name="companyName"]').val(result.companyInfo.companyName);
            $('input[name="address"]').val(result.companyInfo.address);
            $('input[name="phoneNo"]').val(result.companyInfo.phoneNo);
            $('input[name="contactPerson"]').val(result.companyInfo.contactPerson);
            $('input[name="QQ"]').val(result.companyInfo.QQ);
            $('input[name="wechat"]').val(result.companyInfo.wechat);
        }, 'json')
   };
   	//JavaScript代码区域
	layui.use(['element','form'], function() {
		var element = layui.element
		,form = layui.form;
		form.render('select'); //刷新select选择框渲染
	});
};
		