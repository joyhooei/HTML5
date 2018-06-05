//--------------------------editAccount-------------------------------//
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
//			            if (result.userInfo.status = 1){
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
			var provinceName = result.companyInfo.province;
			$("#provinceId option[value='"+provinceName+"']").attr("selected", "selected");
			var cityName = result.companyInfo.city;
			$("#city option[value='"+cityName+"']").attr("selected", "selected");
            
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
	layui.use(['element','form', 'upload'], function() {
		var element = layui.element
		,form = layui.form
		,upload = layui.upload
		,$ = layui.jquery;
		
		//监听提交
		form.on('submit(formDemo)', function(data){
		   layer.msg(JSON.stringify(data.field));
		   location.href = "accountList.html"
		   return false;
		});
		
		form.render('select'); //刷新select选择框渲染
		
		//普通图片上传
		var uploadInst = upload.render({
			elem: '#test1',
			url: '/upload/',
			before: function(obj) {
				//预读本地文件示例，不支持ie8
				obj.preview(function(index, file, result) {
					$('#demo1').attr('src', result); //图片链接（base64）
				});
			},
			done: function(res) {
				//如果上传失败
				if(res.code > 0) {
					return layer.msg('上传失败');
				}
				//上传成功
			},
			error: function() {
				//演示失败状态，并实现重传
				var demoText = $('#demoText');
				demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
				demoText.find('.demo-reload').on('click', function() {
					uploadInst.upload();
				});
			}
		});

	});
   
};
